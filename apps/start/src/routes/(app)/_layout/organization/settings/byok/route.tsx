import { createFileRoute } from '@tanstack/react-router'
import { ByokPage } from '@/components/organization/settings/byok'
import { OrganizationFeatureLockedPage } from '@/components/organization/settings/feature-locked-page'
import { ContentPage } from '@/components/layout'
import { useOrgFeatureAccess } from '@/lib/billing/use-org-billing'
import { useAppAuth } from '@/lib/auth/use-auth'

export const Route = createFileRoute(
  '/(app)/_layout/organization/settings/byok',
)({
  component: ByokRoutePage,
})

function ByokRoutePage() {
  const { activeOrganizationId } = useAppAuth()
  const { allowed, loading } = useOrgFeatureAccess('byok')

  if (!activeOrganizationId) {
    return (
      <ContentPage
        title="Bring Your Own Key"
        description="Select a workspace before managing provider credentials."
      >
        <p className="text-sm text-content-muted">
          Choose a workspace in the sidebar before opening BYOK settings.
        </p>
      </ContentPage>
    )
  }

  if (!loading && !allowed) {
    return (
      <OrganizationFeatureLockedPage
        title="Bring Your Own Key"
        description="Manage workspace-owned provider credentials."
        requiredPlan="Plus"
      />
    )
  }

  return <ByokPage />
}
