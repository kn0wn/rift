export const SINGULARITY_ORG_ID = '9sLfcUtUR3kZluCpt4CJkZnpopeJO9Po'

export function isSingularityOrganizationId(
  organizationId: string | null | undefined,
): boolean {
  return organizationId?.trim() === SINGULARITY_ORG_ID
}
