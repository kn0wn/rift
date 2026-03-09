import { createFileRoute } from '@tanstack/react-router'
import { ContentPage } from '@/components/layout'
import { OrganizationFeatureLockedPage } from '@/components/organization/settings/feature-locked-page'
import { ToolsPage } from '@/components/organization/settings/tools'
import { useAppAuth } from '@/lib/auth/use-auth'
import { useOrgFeatureAccess } from '@/lib/billing/use-org-billing'
import { m } from '@/paraglide/messages.js'

/**
 * Organization settings: tools configuration (built-in, external, provider tools).
 * Path: /organization/settings/tools
 */
export const Route = createFileRoute(
  '/(app)/_layout/organization/settings/tools',
)({
  component: ToolsRoutePage,
})

function ToolsRoutePage() {
  const { activeOrganizationId } = useAppAuth()
  const { allowed, loading } = useOrgFeatureAccess('toolPolicy')

  if (!activeOrganizationId) {
    return (
      <ContentPage
        title={m.org_tools_page_title()}
        description={m.org_route_select_org_tools_description()}
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
        title={m.org_tools_page_title()}
        description={m.org_tools_page_description()}
        requiredPlan="Pro"
      />
    )
  }

  return <ToolsPage />
}
