import { PgClient } from '@effect/sql-pg'
import { Effect } from 'effect'
import type { Subscription as BetterAuthStripeSubscription } from '@better-auth/stripe'
import type Stripe from 'stripe'
import { resolveWorkspacePlanIdFromStripePriceId } from '@/lib/shared/access-control'
import { runBillingSqlEffect, withBillingTransactionEffect } from '../sql'
import { recomputeEntitlementSnapshotEffect } from './entitlement'
import {
  markOrgBillingAccountStatusEffect,
  markOrgSubscriptionCanceledEffect,
  updateSubscriptionMirrorEffect,
  upsertOrgBillingAccountEffect,
  upsertOrgSubscriptionEffect,
} from './persistence'
import {
  normalizePlanId,
  requireStripeClient,
} from './shared'
import type { ScheduledWorkspaceChangeReason } from './shared'

type ScheduledWorkspaceChange = {
  scheduledPlanId: 'free' | 'plus' | 'pro' | 'scale'
  scheduledSeatCount: number | null
  scheduledChangeEffectiveAt: number
  pendingChangeReason: ScheduledWorkspaceChangeReason
}

function getRecurringStripeItem(
  stripeSubscription: Stripe.Subscription,
): Stripe.SubscriptionItem | null {
  return stripeSubscription.items.data[0] ?? null
}

/**
 * Stripe period-end cancellations remain on the current subscription until the
 * renewal boundary. The mirror records that as a scheduled move to the free
 * plan so the billing page can explain what will happen next.
 */
function resolveScheduledCancelFromStripe(
  stripeSubscription: Stripe.Subscription,
): ScheduledWorkspaceChange | null {
  if (!stripeSubscription.cancel_at_period_end) {
    return null
  }

  const recurringItem = getRecurringStripeItem(stripeSubscription)
  const effectiveAt = recurringItem?.current_period_end
  if (!effectiveAt) {
    return null
  }

  return {
    scheduledPlanId: 'free',
    scheduledSeatCount: null,
    scheduledChangeEffectiveAt: effectiveAt * 1000,
    pendingChangeReason: 'scheduled_cancel',
  }
}

/**
 * Subscription schedules expose the future plan/seat state that will take over
 * after the current billing phase. The billing page reads that mirror instead
 * of attempting to interpret Stripe schedule payloads on the client.
 */
function resolveScheduledDowngradeFromStripe(input: {
  stripeSubscription: Stripe.Subscription
  stripeSchedule?: Stripe.SubscriptionSchedule | null
}): ScheduledWorkspaceChange | null {
  const stripeSchedule = input.stripeSchedule
  if (
    !stripeSchedule
    || stripeSchedule.status === 'released'
    || stripeSchedule.status === 'canceled'
    || stripeSchedule.status === 'completed'
  ) {
    return null
  }

  const currentPeriodEnd = getRecurringStripeItem(input.stripeSubscription)?.current_period_end
  const nextPhase = stripeSchedule.phases.find((phase) =>
    typeof phase.start_date === 'number'
    && typeof currentPeriodEnd === 'number'
    && phase.start_date >= currentPeriodEnd
    && phase.items.length > 0
  )

  const nextItem = nextPhase?.items[0]
  const nextPriceId
    = typeof nextItem?.price === 'string' ? nextItem.price : nextItem?.price?.id
  const nextPlanId = nextPriceId
    ? resolveWorkspacePlanIdFromStripePriceId(nextPriceId)
    : null

  if (!nextPhase?.start_date || !nextPlanId) {
    return null
  }

  return {
    scheduledPlanId: nextPlanId,
    scheduledSeatCount: nextItem?.quantity ?? 1,
    scheduledChangeEffectiveAt: nextPhase.start_date * 1000,
    pendingChangeReason: 'scheduled_downgrade',
  }
}

export function resolveScheduledWorkspaceChangeFromStripe(input: {
  stripeSubscription?: Stripe.Subscription
  stripeSchedule?: Stripe.SubscriptionSchedule | null
}): ScheduledWorkspaceChange | null {
  const stripeSubscription = input.stripeSubscription
  if (!stripeSubscription) {
    return null
  }

  return (
    resolveScheduledCancelFromStripe(stripeSubscription)
    ?? resolveScheduledDowngradeFromStripe({
      stripeSubscription,
      stripeSchedule: input.stripeSchedule,
    })
  )
}

async function hydrateStripeSchedule(
  stripeSubscription: Stripe.Subscription,
): Promise<Stripe.SubscriptionSchedule | null> {
  const scheduleRef = stripeSubscription.schedule
  const scheduleId = typeof scheduleRef === 'string' ? scheduleRef : scheduleRef?.id
  if (!scheduleId) {
    return null
  }

  return requireStripeClient().subscriptionSchedules.retrieve(scheduleId)
}

async function hydrateStripeStateForSync(input: {
  subscription: BetterAuthStripeSubscription
  stripeSubscription?: Stripe.Subscription
  stripeSchedule?: Stripe.SubscriptionSchedule | null
  billingProvider?: 'stripe' | 'manual'
}): Promise<{
  subscription: BetterAuthStripeSubscription
  stripeSubscription?: Stripe.Subscription
  stripeSchedule?: Stripe.SubscriptionSchedule | null
  billingProvider?: 'stripe' | 'manual'
}> {
  if (input.billingProvider === 'manual') {
    return input
  }

  if (input.stripeSubscription) {
    return {
      ...input,
      stripeSchedule:
        input.stripeSchedule
        ?? await hydrateStripeSchedule(input.stripeSubscription),
    }
  }

  const stripeSubscriptionId = input.subscription.stripeSubscriptionId?.trim()
  if (!stripeSubscriptionId) {
    return input
  }

  const stripeClient = requireStripeClient()
  const stripeSubscription = await stripeClient.subscriptions.retrieve(stripeSubscriptionId)

  return {
    ...input,
    stripeSubscription,
    stripeSchedule: await hydrateStripeSchedule(stripeSubscription),
  }
}

export const syncWorkspaceSubscriptionRecordEffect = Effect.fn(
  'WorkspaceBillingSubscriptionSync.syncWorkspaceSubscriptionRecord',
)(
  (input: {
    subscription: BetterAuthStripeSubscription
    stripeSubscription?: Stripe.Subscription
    stripeSchedule?: Stripe.SubscriptionSchedule | null
    billingProvider?: 'stripe' | 'manual'
  }): Effect.Effect<void, unknown, PgClient.PgClient> => {
    const organizationId = input.subscription.referenceId
    const provider = input.billingProvider ?? 'stripe'
    const now = Date.now()
    const billingAccountId = `billing_${organizationId}`
    const subscriptionId = `workspace_subscription_${organizationId}`
    const seatCount = input.subscription.seats ?? 1
    const periodStart
      = input.subscription.periodStart instanceof Date
        ? input.subscription.periodStart.getTime()
        : null
    const periodEnd
      = input.subscription.periodEnd instanceof Date
        ? input.subscription.periodEnd.getTime()
        : null
    const scheduledChange = resolveScheduledWorkspaceChangeFromStripe({
      stripeSubscription: input.stripeSubscription,
      stripeSchedule: input.stripeSchedule,
    })

    return withBillingTransactionEffect((client) =>
      Effect.gen(function* () {
        yield* upsertOrgBillingAccountEffect({
          billingAccountId,
          organizationId,
          provider,
          providerCustomerId: input.subscription.stripeCustomerId ?? null,
          status: input.subscription.status,
          now,
          client,
        })

        yield* upsertOrgSubscriptionEffect({
          subscriptionId,
          organizationId,
          billingAccountId,
          providerSubscriptionId: input.subscription.stripeSubscriptionId ?? null,
          planId: input.subscription.plan,
          billingInterval: input.subscription.billingInterval ?? 'month',
          seatCount,
          status: input.subscription.status,
          periodStart,
          periodEnd,
          cancelAtPeriodEnd: input.subscription.cancelAtPeriodEnd ?? false,
          scheduledPlanId: scheduledChange?.scheduledPlanId ?? null,
          scheduledSeatCount: scheduledChange?.scheduledSeatCount ?? null,
          scheduledChangeEffectiveAt:
            scheduledChange?.scheduledChangeEffectiveAt ?? null,
          pendingChangeReason: scheduledChange?.pendingChangeReason ?? null,
          metadata: {
            stripeSubscriptionStatus: input.stripeSubscription?.status ?? null,
          },
          now,
          client,
        })

        yield* updateSubscriptionMirrorEffect({
          id: input.subscription.id,
          planId: normalizePlanId(input.subscription.plan),
          seats: seatCount,
          status: input.subscription.status,
          periodStart,
          periodEnd,
          cancelAtPeriodEnd: input.subscription.cancelAtPeriodEnd ?? false,
          billingInterval: input.subscription.billingInterval ?? 'month',
          stripeScheduleId:
            input.stripeSubscription?.schedule
              ? typeof input.stripeSubscription.schedule === 'string'
                ? input.stripeSubscription.schedule
                : input.stripeSubscription.schedule.id
              : null,
          client,
        })

        yield* recomputeEntitlementSnapshotEffect({
          organizationId,
          client,
        })
      }),
    )
  },
)

export async function syncWorkspaceSubscriptionRecord(input: {
  subscription: BetterAuthStripeSubscription
  stripeSubscription?: Stripe.Subscription
  stripeSchedule?: Stripe.SubscriptionSchedule | null
  billingProvider?: 'stripe' | 'manual'
}): Promise<void> {
  await runBillingSqlEffect(
    syncWorkspaceSubscriptionRecordEffect(await hydrateStripeStateForSync(input)),
  )
}

export const markWorkspaceSubscriptionCanceledRecordEffect = Effect.fn(
  'WorkspaceBillingSubscriptionSync.markWorkspaceSubscriptionCanceledRecord',
)(
  (input: {
    subscription: BetterAuthStripeSubscription
  }): Effect.Effect<void, unknown, PgClient.PgClient> => {
    const organizationId = input.subscription.referenceId
    const now = Date.now()

    return withBillingTransactionEffect((client) =>
      Effect.gen(function* () {
        yield* markOrgSubscriptionCanceledEffect({
          organizationId,
          status: input.subscription.status,
          cancelAtPeriodEnd: input.subscription.cancelAtPeriodEnd ?? false,
          now,
          client,
        })

        yield* markOrgBillingAccountStatusEffect({
          organizationId,
          status: input.subscription.status,
          now,
          client,
        })

        yield* recomputeEntitlementSnapshotEffect({
          organizationId,
          client,
        })
      }),
    )
  },
)

export async function markWorkspaceSubscriptionCanceledRecord(input: {
  subscription: BetterAuthStripeSubscription
}): Promise<void> {
  await runBillingSqlEffect(markWorkspaceSubscriptionCanceledRecordEffect(input))
}
