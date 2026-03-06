'use client'

import { ContentPage } from '@/components/layout'
import { m } from '@/paraglide/messages.js'

/**
 * Organization security settings page.
 * Manages organization-level security configuration and access controls.
 */
export function OrgSecurityPage() {
  return (
    <ContentPage
      title={m.org_security_page_title()}
      description={m.org_security_page_description()}
    >
      <p className="text-sm text-content-muted">{m.org_security_coming_soon()}</p>
    </ContentPage>
  )
}
