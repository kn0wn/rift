'use client'

import { ContentPage } from '@/components/layout'
import { m } from '@/paraglide/messages.js'
import { BuiltInToolsSection } from './built-in-tools-section'
import { ExternalToolsSection } from './external-tools-section'
import { ProviderControlsSection } from './provider-controls-section'
import { ProviderToolsSection } from './provider-tools-section'
import { useProviderPolicy } from './use-provider-policy'

/**
 * Models settings page: provider list plus organization-level tool controls.
 * These sections live on the existing Models route because that is the page
 * already linked from organization settings navigation.
 */
export function ModelsPage() {
  const { payload, loading, error, updating, update } = useProviderPolicy()
  const busy = loading || updating

  return (
    <ContentPage
      title={m.org_models_page_title()}
      description={m.org_models_page_description()}
    >
      {loading && (
        <p className="text-sm text-content-muted" role="status">
          {m.org_models_loading()}
        </p>
      )}

      {error && (
        <div
          className="rounded-md border border-border-default bg-bg-subtle px-3 py-2 text-sm text-content-error"
          role="alert"
        >
          {error}
        </div>
      )}

      {!loading && (
        <>
          <BuiltInToolsSection payload={payload} updating={busy} update={update} />
          <ExternalToolsSection payload={payload} updating={busy} update={update} />
          <ProviderToolsSection payload={payload} updating={busy} update={update} />
          <ProviderControlsSection
            payload={payload}
            updating={busy}
            update={update}
          />
        </>
      )}
    </ContentPage>
  )
}
