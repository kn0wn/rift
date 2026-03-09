/**
 * Billing mutations are intentionally limited to workspace operators who can
 * already administer the organization. Better Auth stores multiple roles as a
 * comma-separated string, so this helper normalizes the value once.
 */
export function isWorkspaceBillingManagerRole(role: string): boolean {
  return role
    .split(',')
    .map((value) => value.trim().toLowerCase())
    .some((value) => value === 'owner' || value === 'admin')
}
