import { createServerFn } from '@tanstack/react-start'
import { getRequestHeaders } from '@tanstack/react-start/server'
import { Effect } from 'effect'
import { getSessionFromHeaders } from '@/lib/auth/server-session.server'
import { WorkspaceBillingRuntime } from '@/lib/billing-backend/runtime/workspace-billing-runtime'
import { WorkspaceBillingService } from '@/lib/billing-backend/services/workspace-billing.service'

/**
 * The billing page can force a lightweight server-side reconciliation so the
 * UI reflects the latest Stripe-normalized subscription state without waiting
 * for a later org mutation.
 */
export const reconcileActiveWorkspaceBilling = createServerFn({ method: 'POST' })
  .handler(async () => {
    const headers = getRequestHeaders()
    const session = await getSessionFromHeaders(headers)

    if (!session || session.user.isAnonymous) {
      throw new Error('Unauthorized')
    }

    const organizationId = session.session.activeOrganizationId
    if (!organizationId) {
      throw new Error('No active workspace selected')
    }

    return WorkspaceBillingRuntime.run(
      Effect.gen(function* () {
        const service = yield* WorkspaceBillingService
        return yield* service.recomputeEntitlementSnapshot({ organizationId })
      }),
    )
  })
