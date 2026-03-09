import { defineQuery } from '@rocicorp/zero'
import { z } from 'zod'
import {
  missingOrganizationQuery,
  readScopedOrgViewerContext,
  whereViewerIsMember,
} from '../org-access'
import { zql } from '../zql'

const emptyArgs = z.object({}).optional()

/**
 * Billing queries are scoped to the active organization and exposed to any
 * member because grant visibility is already user-filtered inside the query.
 */
export const orgBillingQueryDefinitions = {
  orgBilling: {
    currentSummary: defineQuery(emptyArgs, ({ ctx }) => {
      const scoped = readScopedOrgViewerContext(ctx)

      if (!scoped) {
        return missingOrganizationQuery()
      }

      return zql.organization
        .where('id', scoped.organizationId)
        .whereExists('members', whereViewerIsMember(scoped.userID))
        .related('subscriptions', (subscriptions) =>
          subscriptions.orderBy('updatedAt', 'desc').limit(1),
        )
        .related('entitlementSnapshots', (snapshots) =>
          snapshots.orderBy('computedAt', 'desc').limit(1),
        )
        .related('grants', (grants) =>
          grants
            .where('userId', scoped.userID)
            .where(({ cmp, or }) =>
              or(
                cmp('status', 'active'),
                cmp('status', 'exhausted'),
              ),
            )
            .orderBy('createdAt', 'asc')
            .related('product'),
        )
        .one()
    }),
    catalog: defineQuery(emptyArgs, () =>
      zql.topupProduct.where('active', true).orderBy('priceMinor', 'asc'),
    ),
  },
}
