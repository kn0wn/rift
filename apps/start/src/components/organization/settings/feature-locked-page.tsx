import { ContentPage } from '@/components/layout'

/**
 * Shared empty state for organization settings that are intentionally gated by
 * workspace plan. Keeping the wording centralized avoids page-specific drift.
 */
export function OrganizationFeatureLockedPage(input: {
  title: string
  description: string
  requiredPlan: string
}) {
  return (
    <ContentPage title={input.title} description={input.description}>
      <p className="text-sm text-content-muted">
        This setting requires the {input.requiredPlan} workspace plan.
      </p>
    </ContentPage>
  )
}
