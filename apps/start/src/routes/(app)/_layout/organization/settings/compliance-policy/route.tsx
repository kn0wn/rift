import { createFileRoute } from '@tanstack/react-router'
import { ContentPage } from '@/components/layout'
import { CompliancePolicyPage } from '@/components/organization/settings/compliance-policy'
import { OrganizationFeatureLockedPage } from '@/components/organization/settings/feature-locked-page'
import { useAppAuth } from '@/lib/auth/use-auth'
import { useOrgFeatureAccess } from '@/lib/billing/use-org-billing'
import { m } from '@/paraglide/messages.js'

/**
 * Organization settings: compliance and policy configuration.
 * Path: /organization/settings/compliance-policy
 */
export const Route = createFileRoute(
  '/(app)/_layout/organization/settings/compliance-policy',
)({
  component: CompliancePolicyRoutePage,
})

function CompliancePolicyRoutePage() {
  const { activeOrganizationId } = useAppAuth()
  const { allowed, loading } = useOrgFeatureAccess('compliancePolicy')

  if (!activeOrganizationId) {
    return (
      <ContentPage
        title={m.org_compliance_page_title()}
        description={m.org_route_select_org_compliance_description()}
      >
        <p className="text-sm text-content-muted">
          {m.org_route_select_org_body()}
        </p>
      </ContentPage>
    )
  }

  if (!loading && !allowed) {
    return (
      <OrganizationFeatureLockedPage
        title={m.org_compliance_page_title()}
        description={m.org_compliance_page_description()}
        requiredPlan="Pro"
      />
    )
  }

  return <CompliancePolicyPage />
}
