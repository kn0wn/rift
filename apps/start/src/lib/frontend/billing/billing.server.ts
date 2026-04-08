import { getRequestHeaders } from '@tanstack/react-start/server'
import { Effect } from 'effect'
import { WorkspaceBillingRuntime } from '@/lib/backend/billing/runtime/workspace-billing-runtime'
import {
  WorkspaceBillingMissingOrgContextError,
  WorkspaceBillingUnauthorizedError,
} from '@/lib/backend/billing/domain/errors'
import { WorkspaceBillingService } from '@/lib/backend/billing/services/workspace-billing.service'
import { requireOrgAuth } from '@/lib/backend/server-effect/http/server-auth'
import type {
  SelfServeWorkspacePlanId,
  StripeManagedWorkspacePlanId,
} from '@/lib/shared/access-control'

export async function startWorkspaceSubscriptionCheckoutAction(input: {
  readonly planId: StripeManagedWorkspacePlanId
  readonly seats: number
}): Promise<{ url: string }> {
  return WorkspaceBillingRuntime.run(
    Effect.gen(function* () {
      const headers = getRequestHeaders()
      const authContext = yield* requireOrgAuth({
        headers,
        onUnauthorized: () =>
          new WorkspaceBillingUnauthorizedError({
            message: 'Unauthorized',
          }),
        onMissingOrg: () =>
          new WorkspaceBillingMissingOrgContextError({
            message: 'No active workspace selected',
          }),
      })
      const service = yield* WorkspaceBillingService
      return yield* service.startCheckout({
        headers,
        organizationId: authContext.organizationId,
        userId: authContext.userId,
        planId: input.planId,
        seats: input.seats,
      })
    }),
  )
}

export async function changeWorkspaceSubscriptionAction(input: {
  readonly targetPlanId: SelfServeWorkspacePlanId
  readonly seats?: number
}): Promise<{ url: string }> {
  return WorkspaceBillingRuntime.run(
    Effect.gen(function* () {
      const headers = getRequestHeaders()
      const authContext = yield* requireOrgAuth({
        headers,
        onUnauthorized: () =>
          new WorkspaceBillingUnauthorizedError({
            message: 'Unauthorized',
          }),
        onMissingOrg: () =>
          new WorkspaceBillingMissingOrgContextError({
            message: 'No active workspace selected',
          }),
      })
      const service = yield* WorkspaceBillingService
      return yield* service.changeSubscription({
        headers,
        organizationId: authContext.organizationId,
        userId: authContext.userId,
        targetPlanId: input.targetPlanId,
        seats: input.seats,
      })
    }),
  )
}

/**
 * Opens the Stripe billing portal for the authenticated workspace manager.
 */
export async function openWorkspaceBillingPortalAction(): Promise<{
  url: string
}> {
  return WorkspaceBillingRuntime.run(
    Effect.gen(function* () {
      const headers = getRequestHeaders()
      const authContext = yield* requireOrgAuth({
        headers,
        onUnauthorized: () =>
          new WorkspaceBillingUnauthorizedError({
            message: 'Unauthorized',
          }),
        onMissingOrg: () =>
          new WorkspaceBillingMissingOrgContextError({
            message: 'No active workspace selected',
          }),
      })
      const service = yield* WorkspaceBillingService
      return yield* service.openBillingPortal({
        headers,
        organizationId: authContext.organizationId,
        userId: authContext.userId,
      })
    }),
  )
}
