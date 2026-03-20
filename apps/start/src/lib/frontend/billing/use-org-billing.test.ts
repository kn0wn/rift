import { describe, expect, it } from 'vitest'
import { toOrgBillingSummary } from './use-org-billing'

describe('toOrgBillingSummary', () => {
  it('normalizes the first subscription and entitlement rows', () => {
    const summary = toOrgBillingSummary({
      id: 'org-b',
      name: 'Org B',
      slug: 'org-b',
      subscriptions: [
        {
          id: 'sub-b',
          planId: 'pro',
          status: 'active',
        },
      ],
      entitlementSnapshots: [
        {
          planId: 'pro',
          subscriptionStatus: 'active',
          activeMemberCount: 7,
          pendingInvitationCount: 1,
          isOverSeatLimit: false,
        },
      ],
      members: [],
    })

    expect(summary.organizationId).toBe('org-b')
    expect(summary.subscription?.planId).toBe('pro')
    expect(summary.entitlement?.activeMemberCount).toBe(7)
  })

  it('returns null sub-objects when related rows are missing', () => {
    const summary = toOrgBillingSummary({
      id: 'org-a',
      name: 'Org A',
      slug: 'org-a',
    })

    expect(summary.subscription).toBeNull()
    expect(summary.entitlement).toBeNull()
    expect(summary.currentMemberAccess).toBeNull()
  })
})
