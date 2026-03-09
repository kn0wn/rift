import { createFileRoute } from '@tanstack/react-router'
import { ContentPage } from '@/components/layout'
import { OrganizationFeatureLockedPage } from '@/components/organization/settings/feature-locked-page'
import { ProviderPolicyPage } from '@/components/organization/settings/model-policy'
import { useAppAuth } from '@/lib/auth/use-auth'
import { useOrgFeatureAccess } from '@/lib/billing/use-org-billing'
import { m } from '@/paraglide/messages.js'

/** Organization settings: provider and model policy. Path: /organization/settings/provider-policy */
export const Route = createFileRoute(
  '/(app)/_layout/organization/settings/provider-policy',
)({
  component: ProviderPolicyRoutePage,
})

function ProviderPolicyRoutePage() {
  const { activeOrganizationId } = useAppAuth()
  const { allowed, loading } = useOrgFeatureAccess('providerPolicy')

  if (!activeOrganizationId) {
    return (
      <ContentPage
        title={m.org_provider_policy_page_title()}
        description={m.org_route_select_org_provider_models_description()}
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
        title={m.org_provider_policy_page_title()}
        description={m.org_provider_policy_page_description()}
        requiredPlan="Pro"
      />
    )
  }

  return <ProviderPolicyPage />
}
