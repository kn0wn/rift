'use client'

import { isAdminRole } from '@/lib/shared/auth/roles'

/**
 * Session role data is a UI hint, not the security boundary. If the current
 * session does not expose the active org role yet, billing surfaces stay
 * permissive and let the server enforce authorization on submit.
 */
export function resolveBillingManagementUiState(input: {
  activeOrganizationId?: string | null
  activeOrganizationRole?: string | null
}) {
  const hasActiveOrganization =
    typeof input.activeOrganizationId === 'string'
    && input.activeOrganizationId.trim().length > 0
  const hasResolvedRole =
    typeof input.activeOrganizationRole === 'string'
    && input.activeOrganizationRole.trim().length > 0
  const hasExplicitNonAdminRole =
    hasResolvedRole && !isAdminRole(input.activeOrganizationRole ?? '')

  return {
    canManageBilling:
      hasActiveOrganization && !hasExplicitNonAdminRole,
    showAdminOnlyNotice:
      hasActiveOrganization && hasExplicitNonAdminRole,
  }
}
