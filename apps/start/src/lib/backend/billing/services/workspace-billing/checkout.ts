import type { Subscription as BetterAuthStripeSubscription } from '@better-auth/stripe'
import type Stripe from 'stripe'
import { WorkspaceBillingConfigurationError, WorkspaceBillingForbiddenError } from '../../domain/errors'
import { resolveStripePlanPriceId } from '@/lib/shared/access-control'
import type {
  SelfServeWorkspacePlanId,
  StripeManagedWorkspacePlanId,
} from '@/lib/shared/access-control'
import { isOrgAdmin } from '@/lib/backend/auth/services/organization-member-role.service'
import { readCurrentWorkspaceSubscription } from './persistence'
import { classifyWorkspaceSubscriptionChange, requireStripeClient } from './shared'
import { syncWorkspaceSubscriptionRecord } from './subscription-sync'
import type { WorkspaceSubscriptionRow } from './types'

const BILLING_RETURN_URL = '/organization/settings/billing'

async function assertActiveOrgAdmin(input: {
  headers: Headers
  organizationId: string
  userId: string
}): Promise<void> {
  const allowed = await isOrgAdmin({
    headers: input.headers,
    organizationId: input.organizationId,
  })

  if (!allowed) {
    throw new WorkspaceBillingForbiddenError({
      message: 'Only workspace owners or admins can manage billing.',
      organizationId: input.organizationId,
      userId: input.userId,
    })
  }
}

function getRecurringStripeItem(
  stripeSubscription: Stripe.Subscription,
): Stripe.SubscriptionItem {
  const recurringItem = stripeSubscription.items.data[0]
  if (!recurringItem) {
    throw new WorkspaceBillingConfigurationError({
      message: 'Stripe subscription has no recurring items to update',
    })
  }

  return recurringItem
}

export function buildImmediateSubscriptionUpdatePayload(input: {
  recurringItemId: string
  targetPriceId: string
  seats: number
}): Stripe.SubscriptionUpdateParams {
  return {
    cancel_at_period_end: false,
    proration_behavior: 'always_invoice',
    items: [
      {
        id: input.recurringItemId,
        price: input.targetPriceId,
        quantity: input.seats,
      },
    ],
  }
}

export function buildScheduledDowngradePhases(input: {
  currentPhase: Stripe.SubscriptionSchedule.Phase & {
    start_date: number
    end_date: number
  }
  targetPriceId: string
  seats: number
  fallbackQuantity: number
}): Stripe.SubscriptionScheduleUpdateParams.Phase[] {
  return [
    {
      items: input.currentPhase.items.map((item) => ({
        price: typeof item.price === 'string' ? item.price : item.price.id,
        quantity: item.quantity ?? input.fallbackQuantity,
      })),
      start_date: input.currentPhase.start_date,
      end_date: input.currentPhase.end_date,
    },
    {
      items: [
        {
          price: input.targetPriceId,
          quantity: input.seats,
        },
      ],
      start_date: input.currentPhase.end_date,
      proration_behavior: 'none',
    },
  ]
}

/**
 * Direct Stripe mutations bypass Better Auth's webhook-owned mirror update, so
 * the billing domain reconstructs the equivalent subscription shape and writes
 * both local mirrors immediately.
 */
function toMirrorSubscription(input: {
  currentSubscription: WorkspaceSubscriptionRow
  stripeSubscription: Stripe.Subscription
  planId: string
  seatCount: number
}): BetterAuthStripeSubscription {
  const recurringItem = getRecurringStripeItem(input.stripeSubscription)

  return {
    id: input.currentSubscription.id,
    plan: input.planId,
    referenceId: input.currentSubscription.referenceId,
    status: input.stripeSubscription.status,
    seats: input.seatCount,
    billingInterval: recurringItem.price.recurring?.interval ?? 'month',
    periodStart: new Date(recurringItem.current_period_start * 1000),
    periodEnd: new Date(recurringItem.current_period_end * 1000),
    stripeCustomerId:
      input.currentSubscription.stripeCustomerId
      ?? (typeof input.stripeSubscription.customer === 'string'
        ? input.stripeSubscription.customer
        : input.stripeSubscription.customer?.id),
    stripeSubscriptionId: input.currentSubscription.stripeSubscriptionId ?? undefined,
    cancelAtPeriodEnd: input.stripeSubscription.cancel_at_period_end,
    cancelAt: input.stripeSubscription.cancel_at
      ? new Date(input.stripeSubscription.cancel_at * 1000)
      : undefined,
    canceledAt: input.stripeSubscription.canceled_at
      ? new Date(input.stripeSubscription.canceled_at * 1000)
      : undefined,
    endedAt: input.stripeSubscription.ended_at
      ? new Date(input.stripeSubscription.ended_at * 1000)
      : undefined,
    stripeScheduleId:
      typeof input.stripeSubscription.schedule === 'string'
        ? input.stripeSubscription.schedule
        : input.stripeSubscription.schedule?.id,
  }
}

async function releaseScheduleIfPresent(input: {
  stripeClient: Stripe
  stripeScheduleId: string | null
}): Promise<void> {
  if (!input.stripeScheduleId) {
    return
  }

  try {
    await input.stripeClient.subscriptionSchedules.release(input.stripeScheduleId)
  } catch {
    // Stale schedule ids should not block a new admin action.
  }
}

async function createCheckoutSession(input: {
  headers: Headers
  organizationId: string
  userId: string
  planId: StripeManagedWorkspacePlanId
  seats: number
}): Promise<{ url: string }> {
  const authModule: typeof import('@/lib/backend/auth/services/auth.service') = await import('@/lib/backend/auth/services/auth.service')
  const result = await authModule.auth.api.upgradeSubscription({
    headers: input.headers,
    body: {
      plan: input.planId,
      seats: input.seats,
      customerType: 'organization',
      referenceId: input.organizationId,
      successUrl: BILLING_RETURN_URL,
      cancelUrl: BILLING_RETURN_URL,
      returnUrl: BILLING_RETURN_URL,
      scheduleAtPeriodEnd: false,
    },
  })

  if (!('url' in result) || !result.url) {
    throw new WorkspaceBillingConfigurationError({
      message: 'Stripe checkout did not return a redirect URL',
      organizationId: input.organizationId,
      userId: input.userId,
    })
  }

  return {
    url: result.url,
  }
}

async function syncImmediateSubscriptionUpdate(input: {
  currentSubscription: WorkspaceSubscriptionRow
  nextPlanId: StripeManagedWorkspacePlanId
  seats: number
}): Promise<{ url: string }> {
  const stripeSubscriptionId = input.currentSubscription.stripeSubscriptionId
  if (!stripeSubscriptionId) {
    throw new WorkspaceBillingConfigurationError({
      message: 'Workspace subscription is missing Stripe metadata',
      organizationId: input.currentSubscription.referenceId,
    })
  }

  const stripeClient = requireStripeClient()
  const targetPriceId = resolveStripePlanPriceId(input.nextPlanId)

  await releaseScheduleIfPresent({
    stripeClient,
    stripeScheduleId: input.currentSubscription.stripeScheduleId,
  })

  const stripeSubscription = await stripeClient.subscriptions.retrieve(stripeSubscriptionId)
  const recurringItem = getRecurringStripeItem(stripeSubscription)

  const updatedSubscription = await stripeClient.subscriptions.update(stripeSubscriptionId, {
    ...buildImmediateSubscriptionUpdatePayload({
      recurringItemId: recurringItem.id,
      targetPriceId,
      seats: input.seats,
    }),
  })

  await syncWorkspaceSubscriptionRecord({
    subscription: toMirrorSubscription({
      currentSubscription: input.currentSubscription,
      stripeSubscription: updatedSubscription,
      planId: input.nextPlanId,
      seatCount: input.seats,
    }),
    stripeSubscription: updatedSubscription,
  })

  return {
    url: BILLING_RETURN_URL,
  }
}

async function scheduleWorkspaceDowngrade(input: {
  currentSubscription: WorkspaceSubscriptionRow
  nextPlanId: StripeManagedWorkspacePlanId
  seats: number
}): Promise<{ url: string }> {
  const stripeSubscriptionId = input.currentSubscription.stripeSubscriptionId
  if (!stripeSubscriptionId) {
    throw new WorkspaceBillingConfigurationError({
      message: 'Workspace subscription is missing Stripe metadata',
      organizationId: input.currentSubscription.referenceId,
    })
  }

  const stripeClient = requireStripeClient()
  const targetPriceId = resolveStripePlanPriceId(input.nextPlanId)
  let stripeSubscription = await stripeClient.subscriptions.retrieve(stripeSubscriptionId)
  const recurringItem = getRecurringStripeItem(stripeSubscription)

  if (stripeSubscription.cancel_at_period_end) {
    stripeSubscription = await stripeClient.subscriptions.update(stripeSubscriptionId, {
      cancel_at_period_end: false,
    })
  }

  const existingScheduleId = input.currentSubscription.stripeScheduleId
  let schedule = existingScheduleId
    ? await stripeClient.subscriptionSchedules.retrieve(existingScheduleId)
    : await stripeClient.subscriptionSchedules.create({
        from_subscription: stripeSubscriptionId,
      })

  if (
    schedule.status === 'released'
    || schedule.status === 'canceled'
    || schedule.status === 'completed'
  ) {
    schedule = await stripeClient.subscriptionSchedules.create({
      from_subscription: stripeSubscriptionId,
    })
  }

  const currentPhase = schedule.phases[0]
  if (!currentPhase?.start_date || !currentPhase.end_date) {
    throw new WorkspaceBillingConfigurationError({
      message: 'Unable to determine the current Stripe billing phase',
      organizationId: input.currentSubscription.referenceId,
    })
  }

  schedule = await stripeClient.subscriptionSchedules.update(schedule.id, {
    end_behavior: 'release',
    metadata: {
      source: 'rift_workspace_downgrade',
    },
    phases: buildScheduledDowngradePhases({
      currentPhase,
      targetPriceId,
      seats: input.seats,
      fallbackQuantity: recurringItem.quantity ?? 1,
    }),
  })

  stripeSubscription = await stripeClient.subscriptions.retrieve(stripeSubscriptionId)

  await syncWorkspaceSubscriptionRecord({
    subscription: toMirrorSubscription({
      currentSubscription: input.currentSubscription,
      stripeSubscription,
      planId: input.currentSubscription.plan,
      seatCount: input.currentSubscription.seats ?? recurringItem.quantity ?? 1,
    }),
    stripeSubscription,
    stripeSchedule: schedule,
  })

  return {
    url: BILLING_RETURN_URL,
  }
}

async function scheduleWorkspaceCancel(input: {
  currentSubscription: WorkspaceSubscriptionRow
}): Promise<{ url: string }> {
  const stripeSubscriptionId = input.currentSubscription.stripeSubscriptionId
  if (!stripeSubscriptionId) {
    throw new WorkspaceBillingConfigurationError({
      message: 'Workspace subscription is missing Stripe metadata',
      organizationId: input.currentSubscription.referenceId,
    })
  }

  const stripeClient = requireStripeClient()
  await releaseScheduleIfPresent({
    stripeClient,
    stripeScheduleId: input.currentSubscription.stripeScheduleId,
  })

  const updatedSubscription = await stripeClient.subscriptions.update(stripeSubscriptionId, {
    cancel_at_period_end: true,
  })

  await syncWorkspaceSubscriptionRecord({
    subscription: toMirrorSubscription({
      currentSubscription: input.currentSubscription,
      stripeSubscription: updatedSubscription,
      planId: input.currentSubscription.plan,
      seatCount: input.currentSubscription.seats ?? getRecurringStripeItem(updatedSubscription).quantity ?? 1,
    }),
    stripeSubscription: updatedSubscription,
  })

  return {
    url: BILLING_RETURN_URL,
  }
}

export async function changeWorkspaceSubscriptionOperation(input: {
  headers: Headers
  organizationId: string
  userId: string
  targetPlanId: SelfServeWorkspacePlanId
  seats?: number
}): Promise<{ url: string }> {
  await assertActiveOrgAdmin(input)

  const currentSubscription = await readCurrentWorkspaceSubscription(input.organizationId)
  const nextSeats = Math.max(1, input.seats ?? currentSubscription?.seats ?? 1)
  const changeKind = classifyWorkspaceSubscriptionChange({
    currentPlanId: currentSubscription?.plan,
    currentSeats: currentSubscription?.seats,
    hasActiveSubscription: Boolean(currentSubscription?.stripeSubscriptionId),
    targetPlanId: input.targetPlanId,
    seats: nextSeats,
  })

  switch (changeKind) {
    case 'noop':
      return { url: BILLING_RETURN_URL }
    case 'checkout':
      if (input.targetPlanId === 'free') {
        return { url: BILLING_RETURN_URL }
      }
      return createCheckoutSession({
        headers: input.headers,
        organizationId: input.organizationId,
        userId: input.userId,
        planId: input.targetPlanId,
        seats: nextSeats,
      })
    case 'apply_immediately':
      if (input.targetPlanId === 'free') {
        return { url: BILLING_RETURN_URL }
      }
      return syncImmediateSubscriptionUpdate({
        currentSubscription: currentSubscription!,
        nextPlanId: input.targetPlanId,
        seats: nextSeats,
      })
    case 'schedule_downgrade':
      if (input.targetPlanId === 'free') {
        return { url: BILLING_RETURN_URL }
      }
      return scheduleWorkspaceDowngrade({
        currentSubscription: currentSubscription!,
        nextPlanId: input.targetPlanId,
        seats: nextSeats,
      })
    case 'schedule_cancel':
      return scheduleWorkspaceCancel({
        currentSubscription: currentSubscription!,
      })
  }
}

/**
 * Public pricing still calls the original paid-plan entrypoint, but the
 * billing page now owns the canonical app-managed subscription mutation flow.
 */
export async function startCheckoutOperation(input: {
  headers: Headers
  organizationId: string
  userId: string
  planId: StripeManagedWorkspacePlanId
  seats: number
}): Promise<{ url: string }> {
  return changeWorkspaceSubscriptionOperation({
    ...input,
    targetPlanId: input.planId,
    seats: input.seats,
  })
}

export async function openBillingPortalOperation(input: {
  headers: Headers
  organizationId: string
  userId: string
}): Promise<{ url: string }> {
  await assertActiveOrgAdmin(input)

  const authModule: typeof import('@/lib/backend/auth/services/auth.service') = await import('@/lib/backend/auth/services/auth.service')
  const result = await authModule.auth.api.createBillingPortal({
    headers: input.headers,
    body: {
      customerType: 'organization',
      referenceId: input.organizationId,
      returnUrl: BILLING_RETURN_URL,
    },
  })

  return {
    url: result.url,
  }
}
