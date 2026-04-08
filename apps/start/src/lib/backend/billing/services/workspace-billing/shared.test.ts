import { describe, expect, it } from 'vitest'
import {
  classifyWorkspaceSubscriptionChange,
  isScheduledDowngrade,
  normalizePlanId,
} from './shared'

describe('normalizePlanId', () => {
  it('keeps paid plans intact and collapses unknown plans to free', () => {
    expect(normalizePlanId('plus')).toBe('plus')
    expect(normalizePlanId('pro')).toBe('pro')
    expect(normalizePlanId('scale')).toBe('scale')
    expect(normalizePlanId('enterprise')).toBe('enterprise')
    expect(normalizePlanId(null)).toBe('free')
  })
})

describe('isScheduledDowngrade', () => {
  it('schedules plan downgrades and seat reductions for period end', () => {
    expect(
      isScheduledDowngrade({
        currentPlan: 'pro',
        currentSeats: 5,
        nextPlanId: 'plus',
        nextSeats: 5,
      }),
    ).toBe(true)

    expect(
      isScheduledDowngrade({
        currentPlan: 'plus',
        currentSeats: 5,
        nextPlanId: 'plus',
        nextSeats: 4,
      }),
    ).toBe(true)
  })

  it('applies upgrades and seat increases immediately', () => {
    expect(
      isScheduledDowngrade({
        currentPlan: 'plus',
        currentSeats: 5,
        nextPlanId: 'pro',
        nextSeats: 5,
      }),
    ).toBe(false)

    expect(
      isScheduledDowngrade({
        currentPlan: 'plus',
        currentSeats: 5,
        nextPlanId: 'plus',
        nextSeats: 6,
      }),
    ).toBe(false)

    expect(
      isScheduledDowngrade({
        currentPlan: 'pro',
        currentSeats: 5,
        nextPlanId: 'scale',
        nextSeats: 5,
      }),
    ).toBe(false)
  })
})

describe('classifyWorkspaceSubscriptionChange', () => {
  it('classifies first-time paid plan selection as checkout', () => {
    expect(
      classifyWorkspaceSubscriptionChange({
        currentPlanId: 'free',
        currentSeats: 1,
        hasActiveSubscription: false,
        targetPlanId: 'plus',
        seats: 3,
      }),
    ).toBe('checkout')
  })

  it('classifies seat increases and plan upgrades as immediate', () => {
    expect(
      classifyWorkspaceSubscriptionChange({
        currentPlanId: 'plus',
        currentSeats: 3,
        hasActiveSubscription: true,
        targetPlanId: 'plus',
        seats: 4,
      }),
    ).toBe('apply_immediately')

    expect(
      classifyWorkspaceSubscriptionChange({
        currentPlanId: 'plus',
        currentSeats: 3,
        hasActiveSubscription: true,
        targetPlanId: 'pro',
        seats: 3,
      }),
    ).toBe('apply_immediately')
  })

  it('classifies plan downgrades and seat reductions as scheduled', () => {
    expect(
      classifyWorkspaceSubscriptionChange({
        currentPlanId: 'pro',
        currentSeats: 3,
        hasActiveSubscription: true,
        targetPlanId: 'plus',
        seats: 3,
      }),
    ).toBe('schedule_downgrade')

    expect(
      classifyWorkspaceSubscriptionChange({
        currentPlanId: 'pro',
        currentSeats: 3,
        hasActiveSubscription: true,
        targetPlanId: 'pro',
        seats: 2,
      }),
    ).toBe('schedule_downgrade')
  })

  it('classifies cancel-to-free separately from paid downgrades', () => {
    expect(
      classifyWorkspaceSubscriptionChange({
        currentPlanId: 'pro',
        currentSeats: 3,
        hasActiveSubscription: true,
        targetPlanId: 'free',
      }),
    ).toBe('schedule_cancel')
  })

  it('treats identical active selections as noop', () => {
    expect(
      classifyWorkspaceSubscriptionChange({
        currentPlanId: 'pro',
        currentSeats: 3,
        hasActiveSubscription: true,
        targetPlanId: 'pro',
        seats: 3,
      }),
    ).toBe('noop')
  })
})
