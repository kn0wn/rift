import { describe, expect, it } from 'vitest'
import type Stripe from 'stripe'
import { resolveScheduledWorkspaceChangeFromStripe } from './subscription-sync'

function buildStripeSubscription(input: {
  cancelAtPeriodEnd?: boolean
  currentPeriodEnd?: number
  schedule?: string | null
}): Stripe.Subscription {
  return {
    cancel_at_period_end: input.cancelAtPeriodEnd ?? false,
    schedule: input.schedule ?? null,
    items: {
      data: [
        {
          current_period_end: input.currentPeriodEnd ?? 1_800_000_000,
        },
      ],
    },
  } as unknown as Stripe.Subscription
}

function buildStripeSchedule(input: {
  startDate: number
  priceId: string
  quantity: number
  status?: Stripe.SubscriptionSchedule.Status
}): Stripe.SubscriptionSchedule {
  return {
    status: input.status ?? 'active',
    phases: [
      {
        start_date: input.startDate,
        items: [
          {
            price: input.priceId,
            quantity: input.quantity,
          },
        ],
      },
    ],
  } as unknown as Stripe.SubscriptionSchedule
}

describe('resolveScheduledWorkspaceChangeFromStripe', () => {
  it('mirrors cancel-at-period-end as a scheduled move to free', () => {
    const scheduledChange = resolveScheduledWorkspaceChangeFromStripe({
      stripeSubscription: buildStripeSubscription({
        cancelAtPeriodEnd: true,
        currentPeriodEnd: 1_800_000_000,
      }),
    })

    expect(scheduledChange).toEqual({
      scheduledPlanId: 'free',
      scheduledSeatCount: null,
      scheduledChangeEffectiveAt: 1_800_000_000_000,
      pendingChangeReason: 'scheduled_cancel',
    })
  })

  it('mirrors future schedule phases as a scheduled paid downgrade', () => {
    process.env.STRIPE_PRICE_PLUS_MONTHLY = 'price_plus_scheduled'

    const scheduledChange = resolveScheduledWorkspaceChangeFromStripe({
      stripeSubscription: buildStripeSubscription({
        currentPeriodEnd: 1_800_000_000,
        schedule: 'sub_sched_123',
      }),
      stripeSchedule: buildStripeSchedule({
        startDate: 1_800_000_000,
        priceId: 'price_plus_scheduled',
        quantity: 3,
      }),
    })

    expect(scheduledChange).toEqual({
      scheduledPlanId: 'plus',
      scheduledSeatCount: 3,
      scheduledChangeEffectiveAt: 1_800_000_000_000,
      pendingChangeReason: 'scheduled_downgrade',
    })
  })

  it('returns null when Stripe has no pending cancel or future schedule phase', () => {
    const scheduledChange = resolveScheduledWorkspaceChangeFromStripe({
      stripeSubscription: buildStripeSubscription({
        currentPeriodEnd: 1_800_000_000,
      }),
    })

    expect(scheduledChange).toBeNull()
  })
})
