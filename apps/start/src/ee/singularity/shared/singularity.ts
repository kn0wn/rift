export const SINGULARITY_ORG_ID = 'lDjmlu12ycytMbkK1Oi4t3GYTruUV4bO'

export function isSingularityOrganizationId(
  organizationId: string | null | undefined,
): boolean {
  return organizationId?.trim() === SINGULARITY_ORG_ID
}
