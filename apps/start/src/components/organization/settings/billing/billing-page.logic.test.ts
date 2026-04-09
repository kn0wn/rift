import { describe, expect, it } from 'vitest'
import { resolveBillingManagementUiState } from './billing-ui-policy'
import {
  isScheduledCancelToFree,
  resolveBillingPlanChangeActionState,
  resolveBillingPlanCardActionState,
} from './billing-page.logic'

describe('resolveBillingPlanCardActionState', () => {
  it('returns manage for the current plan card so seat-only changes remain accessible', () => {
    expect(
      resolveBillingPlanCardActionState({
        targetPlanId: 'pro',
        currentPlanId: 'pro',
        hasManagedSubscription: true,
      }),
    ).toBe('manage')
  })

  it('returns scheduled when the card already matches a pending future plan', () => {
    expect(
      resolveBillingPlanCardActionState({
        targetPlanId: 'plus',
        currentPlanId: 'pro',
        hasManagedSubscription: true,
        scheduledPlanId: 'plus',
      }),
    ).toBe('scheduled')
  })

  it('returns subscribe for free workspaces without an active paid subscription', () => {
    expect(
      resolveBillingPlanCardActionState({
        targetPlanId: 'plus',
        currentPlanId: 'free',
        hasManagedSubscription: false,
      }),
    ).toBe('subscribe')
  })

  it('returns upgrade and downgrade for non-current paid plan cards', () => {
    expect(
      resolveBillingPlanCardActionState({
        targetPlanId: 'scale',
        currentPlanId: 'pro',
        hasManagedSubscription: true,
      }),
    ).toBe('upgrade')

    expect(
      resolveBillingPlanCardActionState({
        targetPlanId: 'plus',
        currentPlanId: 'pro',
        hasManagedSubscription: true,
      }),
    ).toBe('downgrade')
  })
})

describe('resolveBillingPlanChangeActionState', () => {
  it('returns current for the effective plan and seats', () => {
    expect(
      resolveBillingPlanChangeActionState({
        targetPlanId: 'pro',
        selectedSeatCount: 5,
        currentPlanId: 'pro',
        currentSeatCount: 5,
      }),
    ).toBe('current')
  })

  it('returns scheduled when the dialog matches a pending future selection', () => {
    expect(
      resolveBillingPlanChangeActionState({
        targetPlanId: 'plus',
        selectedSeatCount: 3,
        currentPlanId: 'pro',
        currentSeatCount: 5,
        scheduledPlanId: 'plus',
        scheduledSeatCount: 3,
      }),
    ).toBe('scheduled')
  })

  it('returns upgrade for higher plans and seat increases', () => {
    expect(
      resolveBillingPlanChangeActionState({
        targetPlanId: 'scale',
        selectedSeatCount: 5,
        currentPlanId: 'pro',
        currentSeatCount: 5,
      }),
    ).toBe('upgrade')

    expect(
      resolveBillingPlanChangeActionState({
        targetPlanId: 'pro',
        selectedSeatCount: 6,
        currentPlanId: 'pro',
        currentSeatCount: 5,
      }),
    ).toBe('upgrade')
  })

  it('returns downgrade for lower plans and seat reductions', () => {
    expect(
      resolveBillingPlanChangeActionState({
        targetPlanId: 'plus',
        selectedSeatCount: 5,
        currentPlanId: 'pro',
        currentSeatCount: 5,
      }),
    ).toBe('downgrade')

    expect(
      resolveBillingPlanChangeActionState({
        targetPlanId: 'pro',
        selectedSeatCount: 4,
        currentPlanId: 'pro',
        currentSeatCount: 5,
      }),
    ).toBe('downgrade')
  })
})

describe('isScheduledCancelToFree', () => {
  it('treats either the mirror plan or cancel flag as a scheduled free cancel', () => {
    expect(
      isScheduledCancelToFree({
        scheduledPlanId: 'free',
      }),
    ).toBe(true)

    expect(
      isScheduledCancelToFree({
        cancelAtPeriodEnd: true,
      }),
    ).toBe(true)
  })
})

describe('resolveBillingManagementUiState', () => {
  it('stays permissive when the session has an active org but no resolved role yet', () => {
    expect(
      resolveBillingManagementUiState({
        activeOrganizationId: 'org_123',
        activeOrganizationRole: null,
      }),
    ).toEqual({
      canManageBilling: true,
      showAdminOnlyNotice: false,
    })
  })

  it('shows the non-admin UI only for explicit non-admin roles', () => {
    expect(
      resolveBillingManagementUiState({
        activeOrganizationId: 'org_123',
        activeOrganizationRole: 'member',
      }),
    ).toEqual({
      canManageBilling: false,
      showAdminOnlyNotice: true,
    })
  })
})
