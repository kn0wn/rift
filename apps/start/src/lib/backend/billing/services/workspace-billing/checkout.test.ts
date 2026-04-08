import { describe, expect, it } from 'vitest'
import {
  buildImmediateSubscriptionUpdatePayload,
  buildScheduledDowngradePhases,
} from './checkout'

describe('buildImmediateSubscriptionUpdatePayload', () => {
  it('configures Stripe to invoice prorations immediately', () => {
    expect(
      buildImmediateSubscriptionUpdatePayload({
        recurringItemId: 'si_123',
        targetPriceId: 'price_pro',
        seats: 8,
      }),
    ).toEqual({
      cancel_at_period_end: false,
      proration_behavior: 'always_invoice',
      items: [
        {
          id: 'si_123',
          price: 'price_pro',
          quantity: 8,
        },
      ],
    })
  })
})

describe('buildScheduledDowngradePhases', () => {
  it('builds a two-phase schedule that preserves the current period then downgrades', () => {
    expect(
      buildScheduledDowngradePhases({
        currentPhase: {
          start_date: 1_700_000_000,
          end_date: 1_800_000_000,
          items: [
            {
              price: 'price_pro',
              quantity: 5,
            },
          ],
        } as never,
        targetPriceId: 'price_plus',
        seats: 3,
        fallbackQuantity: 5,
      }),
    ).toEqual([
      {
        items: [
          {
            price: 'price_pro',
            quantity: 5,
          },
        ],
        start_date: 1_700_000_000,
        end_date: 1_800_000_000,
      },
      {
        items: [
          {
            price: 'price_plus',
            quantity: 3,
          },
        ],
        start_date: 1_800_000_000,
        proration_behavior: 'none',
      },
    ])
  })
})
