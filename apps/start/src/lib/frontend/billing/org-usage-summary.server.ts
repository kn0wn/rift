import { getRequestHeaders } from '@tanstack/react-start/server'
import { Effect } from 'effect'
import {
  resolveAccessContextEffect,
  resolveChatAccessPolicy,
} from '@/lib/backend/access-control'
import {
  WorkspaceBillingForbiddenError,
  WorkspaceBillingMissingOrgContextError,
  WorkspaceBillingUnauthorizedError,
} from '@/lib/backend/billing/domain/errors'
import { resolveBillingSqlClient } from '@/lib/backend/billing/services/sql'
import { isOrgMember } from '@/lib/backend/auth/services/organization-member-role.service'
import { WorkspaceBillingRuntime } from '@/lib/backend/billing/runtime/workspace-billing-runtime'
import { materializeOrgUserUsageSummaryRecord } from '@/lib/backend/billing/services/workspace-usage/usage-summary-store'
import { requireUserAuth } from '@/lib/backend/server-effect/http/server-auth'

export type OrgUsageSummary = {
  kind: 'free' | 'paid'
  monthlyUsedPercent: number
  monthlyRemainingPercent: number
  monthlyResetAt: number
  updatedAt: number
}

/**
 * The sidebar only renders the monthly bucket, so the frontend payload stays
 * intentionally narrow even though the backend summary row also stores seat
 * window details for quota accounting.
 */
function toOrgUsageSummary(
  summary: Awaited<ReturnType<typeof materializeOrgUserUsageSummaryRecord>>,
): OrgUsageSummary {
  return {
    kind: summary.kind,
    monthlyUsedPercent: summary.monthlyUsedPercent,
    monthlyRemainingPercent: summary.monthlyRemainingPercent,
    monthlyResetAt: summary.monthlyResetAt,
    updatedAt: summary.updatedAt,
  }
}

function clampPercent(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)))
}

function toAnonymousUsageSummary(input: {
  hits: number
  maxRequests: number
  windowMs: number
  now: number
}): OrgUsageSummary {
  const windowStartAt = Math.floor(input.now / input.windowMs) * input.windowMs
  const monthlyResetAt = windowStartAt + input.windowMs
  const remaining = Math.max(0, input.maxRequests - input.hits)
  const remainingPercent = input.maxRequests <= 0
    ? 100
    : clampPercent((remaining / input.maxRequests) * 100)
  const usedPercent = input.maxRequests <= 0
    ? 0
    : clampPercent((Math.max(0, input.hits) / input.maxRequests) * 100)

  return {
    kind: 'free',
    monthlyUsedPercent: usedPercent,
    monthlyRemainingPercent: remainingPercent,
    monthlyResetAt,
    updatedAt: input.now,
  }
}

/**
 * Usage is normalized on the server before returning to the client. The
 * fallback request also materializes the latest summary row so Zero can pick up
 * stale or missing projections without waiting for the next quota write.
 */
export async function getOrgUsageSummaryAction(): Promise<OrgUsageSummary> {
  const headers = getRequestHeaders()
  return WorkspaceBillingRuntime.run(
    Effect.gen(function* () {
      const authContext = yield* requireUserAuth({
        headers,
        onUnauthorized: () =>
          new WorkspaceBillingUnauthorizedError({
            message: 'Unauthorized',
          }),
      })

      if (authContext.isAnonymous) {
        const accessContext = yield* resolveAccessContextEffect({
          userId: authContext.userId,
          isAnonymous: true,
        })
        const accessPolicy = resolveChatAccessPolicy(accessContext)
        const allowance = accessPolicy.allowance

        if (!allowance) {
          return yield* Effect.fail(
            new Error(
              'Anonymous usage summary requires a free allowance policy',
            ),
          )
        }

        const now = Date.now()
        const windowStartAt =
          Math.floor(now / allowance.windowMs) * allowance.windowMs
        const client = yield* resolveBillingSqlClient()
        const [row] = yield* client<{ hits: number }>`
          select hits
          from chat_free_allowance_window
          where user_id = ${authContext.userId}
            and policy_key = ${allowance.policyKey}
            and window_started_at = ${windowStartAt}
          limit 1
        `

        return toAnonymousUsageSummary({
          hits: Number(row?.hits ?? 0),
          maxRequests: allowance.maxRequests,
          windowMs: allowance.windowMs,
          now,
        })
      }

      if (!authContext.organizationId) {
        return yield* Effect.fail(
          new WorkspaceBillingMissingOrgContextError({
            message: 'No active workspace selected',
          }),
        )
      }
      const organizationId = authContext.organizationId

      const allowed = yield* Effect.tryPromise({
        try: () =>
          isOrgMember({
            organizationId,
            userId: authContext.userId,
          }),
        catch: (error) => error,
      })
      if (!allowed) {
        return yield* Effect.fail(
          new WorkspaceBillingForbiddenError({
            message: 'Organization membership is required',
            organizationId,
            userId: authContext.userId,
          }),
        )
      }

      const summary = yield* Effect.tryPromise({
        try: () =>
          materializeOrgUserUsageSummaryRecord({
            organizationId,
            userId: authContext.userId,
          }),
        catch: (error) => error,
      })

      return toOrgUsageSummary(summary)
    }),
  )
}
