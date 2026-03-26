import { describe, expect, it } from 'vitest'
import { resolveQuotaExhaustion } from './reservation-store'
import type { SeatQuotaState } from './types'

function buildSeatState(overrides: Partial<SeatQuotaState> = {}): SeatQuotaState {
  return {
    seatSlotId: 'seat-1',
    seatIndex: 0,
    cycleStartAt: Date.UTC(2026, 2, 1, 0, 0, 0),
    cycleEndAt: Date.UTC(2026, 3, 1, 0, 0, 0),
    currentAssigneeUserId: 'user-1',
    seatCycle: {
      bucketType: 'seat_cycle',
      totalNanoUsd: 1_000_000_000,
      remainingNanoUsd: 0,
    },
    ...overrides,
  }
}

describe('resolveQuotaExhaustion', () => {
  it('uses the billing cycle reset for seat cycle exhaustion', () => {
    const now = Date.UTC(2026, 2, 18, 10, 15, 0)

    expect(
      resolveQuotaExhaustion({
        seatState: buildSeatState(),
        now,
      }),
    ).toEqual({
      retryAfterMs: Date.UTC(2026, 3, 1, 0, 0, 0) - now,
      reasonCode: 'seat_quota_exhausted',
    })
  })

  it('never returns a zero retry delay', () => {
    const now = Date.UTC(2026, 3, 1, 0, 0, 0)

    expect(
      resolveQuotaExhaustion({
        seatState: buildSeatState({
          cycleEndAt: now,
        }),
        now,
      }),
    ).toEqual({
      retryAfterMs: 1,
      reasonCode: 'seat_quota_exhausted',
    })
  })
})
