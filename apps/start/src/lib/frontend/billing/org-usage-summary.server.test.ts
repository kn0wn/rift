import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Effect } from 'effect'

const mockGetRequestHeaders = vi.fn(() => new Headers())
const mockRequireUserAuth = vi.fn()
const mockIsOrgMember = vi.fn()
const mockMaterializeOrgUserUsageSummaryRecord = vi.fn()
const mockResolveAccessContextEffect = vi.fn()
const mockResolveChatAccessPolicy = vi.fn()
const mockResolveBillingSqlClient = vi.fn()
const mockSqlClient = vi.fn()

vi.mock('@tanstack/react-start/server', () => ({
  getRequestHeaders: mockGetRequestHeaders,
}))

vi.mock('@/lib/backend/server-effect/http/server-auth', () => ({
  requireUserAuth: mockRequireUserAuth,
}))

vi.mock('@/lib/backend/auth/services/organization-member-role.service', () => ({
  isOrgMember: mockIsOrgMember,
}))

vi.mock('@/lib/backend/billing/runtime/workspace-billing-runtime', () => ({
  WorkspaceBillingRuntime: {
    run: (effect: Effect.Effect<unknown, unknown>) => Effect.runPromise(effect),
  },
}))

vi.mock('@/lib/backend/billing/services/workspace-usage/usage-summary-store', () => ({
  materializeOrgUserUsageSummaryRecord: mockMaterializeOrgUserUsageSummaryRecord,
}))

vi.mock('@/lib/backend/access-control', () => ({
  resolveAccessContextEffect: mockResolveAccessContextEffect,
  resolveChatAccessPolicy: mockResolveChatAccessPolicy,
}))

vi.mock('@/lib/backend/billing/services/sql', () => ({
  resolveBillingSqlClient: mockResolveBillingSqlClient,
}))

describe('getOrgUsageSummaryAction', () => {
  beforeEach(() => {
    mockGetRequestHeaders.mockReset()
    mockGetRequestHeaders.mockReturnValue(new Headers())
    mockRequireUserAuth.mockReset()
    mockIsOrgMember.mockReset()
    mockMaterializeOrgUserUsageSummaryRecord.mockReset()
    mockResolveAccessContextEffect.mockReset()
    mockResolveChatAccessPolicy.mockReset()
    mockResolveBillingSqlClient.mockReset()
    mockSqlClient.mockReset()
    vi.restoreAllMocks()
  })

  it('fails when org auth is missing', async () => {
    const { WorkspaceBillingUnauthorizedError } = await import(
      '@/lib/backend/billing/domain/errors'
    )
    const { getOrgUsageSummaryAction } = await import('./org-usage-summary.server')

    mockRequireUserAuth.mockImplementation((input: { onUnauthorized: () => unknown }) =>
      Effect.fail(input.onUnauthorized()),
    )

    await expect(getOrgUsageSummaryAction()).rejects.toBeInstanceOf(
      WorkspaceBillingUnauthorizedError,
    )
  })

  it('fails when a regular user has no active organization', async () => {
    const { WorkspaceBillingMissingOrgContextError } = await import(
      '@/lib/backend/billing/domain/errors'
    )
    const { getOrgUsageSummaryAction } = await import('./org-usage-summary.server')

    mockRequireUserAuth.mockImplementation(() =>
      Effect.succeed({
        userId: 'user-1',
        organizationId: undefined,
        isAnonymous: false,
      }),
    )

    await expect(getOrgUsageSummaryAction()).rejects.toBeInstanceOf(
      WorkspaceBillingMissingOrgContextError,
    )
  })

  it('fails when the user is no longer an organization member', async () => {
    const { WorkspaceBillingForbiddenError } = await import(
      '@/lib/backend/billing/domain/errors'
    )
    const { getOrgUsageSummaryAction } = await import('./org-usage-summary.server')

    mockRequireUserAuth.mockImplementation(() =>
      Effect.succeed({
        userId: 'user-1',
        organizationId: 'org-1',
        isAnonymous: false,
      }),
    )
    mockIsOrgMember.mockResolvedValue(false)

    await expect(getOrgUsageSummaryAction()).rejects.toBeInstanceOf(
      WorkspaceBillingForbiddenError,
    )
    expect(mockMaterializeOrgUserUsageSummaryRecord).not.toHaveBeenCalled()
  })

  it('bubbles membership lookup failures as retriable server errors', async () => {
    const { getOrgUsageSummaryAction } = await import('./org-usage-summary.server')

    mockRequireUserAuth.mockImplementation(() =>
      Effect.succeed({
        userId: 'user-1',
        organizationId: 'org-1',
        isAnonymous: false,
      }),
    )
    mockIsOrgMember.mockRejectedValue(new Error('db unavailable'))

    await expect(getOrgUsageSummaryAction()).rejects.toThrow('db unavailable')
    expect(mockMaterializeOrgUserUsageSummaryRecord).not.toHaveBeenCalled()
  })

  it('materializes and returns the current usage summary for active members', async () => {
    const { getOrgUsageSummaryAction } = await import('./org-usage-summary.server')

    mockRequireUserAuth.mockImplementation(() =>
      Effect.succeed({
        userId: 'user-1',
        organizationId: 'org-1',
        isAnonymous: false,
      }),
    )
    mockIsOrgMember.mockResolvedValue(true)
    mockMaterializeOrgUserUsageSummaryRecord.mockResolvedValue({
      kind: 'paid',
      monthlyUsedPercent: 35,
      monthlyRemainingPercent: 65,
      monthlyResetAt: 1_710_000_000_000,
      updatedAt: 1_709_000_000_000,
    })

    const result = await getOrgUsageSummaryAction()

    expect(mockIsOrgMember).toHaveBeenCalledWith({
      organizationId: 'org-1',
      userId: 'user-1',
    })
    expect(mockMaterializeOrgUserUsageSummaryRecord).toHaveBeenCalledWith({
      organizationId: 'org-1',
      userId: 'user-1',
    })
    expect(result).toEqual({
      kind: 'paid',
      monthlyUsedPercent: 35,
      monthlyRemainingPercent: 65,
      monthlyResetAt: 1_710_000_000_000,
      updatedAt: 1_709_000_000_000,
    })
  })

  it('returns the anonymous free-allowance summary for anonymous sessions', async () => {
    const { getOrgUsageSummaryAction } = await import('./org-usage-summary.server')

    vi.spyOn(Date, 'now').mockReturnValue(Date.UTC(2026, 3, 9, 12, 30))
    mockRequireUserAuth.mockImplementation(() =>
      Effect.succeed({
        userId: 'anon-user',
        organizationId: undefined,
        isAnonymous: true,
      }),
    )
    mockResolveAccessContextEffect.mockImplementation(() =>
      Effect.succeed({
        userId: 'anon-user',
        organizationId: undefined,
        isAnonymous: true,
        planId: 'free',
      }),
    )
    mockResolveChatAccessPolicy.mockReturnValue({
      allowance: {
        policyKey: 'free-chat-v1',
        windowMs: 24 * 60 * 60 * 1000,
        maxRequests: 100,
      },
    })
    mockSqlClient.mockImplementation(() =>
      Effect.succeed([{ hits: 25 }]),
    )
    mockResolveBillingSqlClient.mockImplementation(() =>
      Effect.succeed(mockSqlClient),
    )

    const result = await getOrgUsageSummaryAction()

    expect(mockIsOrgMember).not.toHaveBeenCalled()
    expect(mockMaterializeOrgUserUsageSummaryRecord).not.toHaveBeenCalled()
    expect(result).toEqual({
      kind: 'free',
      monthlyUsedPercent: 25,
      monthlyRemainingPercent: 75,
      monthlyResetAt: Date.UTC(2026, 3, 10, 0, 0),
      updatedAt: Date.UTC(2026, 3, 9, 12, 30),
    })
  })
})
