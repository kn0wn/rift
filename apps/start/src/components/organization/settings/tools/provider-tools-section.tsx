'use client'

import * as React from 'react'
import { Form } from '@rift/ui/form'
import { getProviderIcon } from '@/lib/ai-catalog'
import { getLocalizedToolCopy } from '@/lib/ai-catalog/tool-ui'
import type { CatalogProviderId } from '@/lib/ai-catalog/provider-tools'
import { PROVIDER_NAMES } from '@/components/organization/settings/model-policy/provider-constants'
import { m } from '@/paraglide/messages.js'
import type { PolicyPayload } from '@/components/organization/settings/model-policy/types'
import type { useProviderPolicy } from '@/components/organization/settings/model-policy/use-provider-policy'

type ProviderToolsSectionProps = {
  payload: PolicyPayload
  updating: boolean
  update: ReturnType<typeof useProviderPolicy>['update']
}

/**
 * Exact provider-tool controls. Tools are grouped by provider with subsection
 * headers (provider name + icon). Each row shows tool name and toggle; no per-row icon.
 */
export function ProviderToolsSection({
  payload,
  updating,
  update,
}: ProviderToolsSectionProps) {
  const groupedTools = React.useMemo(() => {
    const groups = new Map<string, PolicyPayload['tools']>()
    for (const tool of payload.tools) {
      const current = groups.get(tool.providerId) ?? []
      current.push(tool)
      groups.set(tool.providerId, current)
    }
    return [...groups.entries()]
  }, [payload.tools])

  const subsections = React.useMemo(
    () =>
      groupedTools.map(([providerId, tools]) => {
        const ProviderIcon = getProviderIcon(providerId as CatalogProviderId)
        const providerName = PROVIDER_NAMES[providerId] ?? providerId
        return {
          title: providerName,
          titleIcon: ProviderIcon ? (
            <ProviderIcon className="size-5 text-content-default" />
          ) : (
            <div className="size-5 rounded-full bg-bg-inverted" />
          ),
          items: tools.map((tool) => {
            const localizedCopy = getLocalizedToolCopy(tool.key)
            return {
              id: tool.key,
              title: localizedCopy.label,
              description: localizedCopy.description,
              checked: !tool.disabled,
              onCheckedChange: (enabled: boolean) =>
                void update({
                  action: 'toggle_tool',
                  toolKey: tool.key,
                  disabled: !enabled,
                }),
              disabled:
                updating ||
                !(
                  tool.source === 'provider-native'
                    ? payload.policy.toolPolicy.providerNativeToolsEnabled
                    : payload.policy.toolPolicy.externalToolsEnabled
                ),
            }
          }),
        }
      }),
    [
      groupedTools,
      payload.policy.toolPolicy.externalToolsEnabled,
      payload.policy.toolPolicy.providerNativeToolsEnabled,
      update,
      updating,
    ],
  )

  return (
    <Form
      title={m.org_provider_tools_title()}
      description={m.org_provider_tools_description()}
      helpText={m.org_provider_tools_help()}
      toggleSection={{
        sectionTitle: m.org_provider_tools_available_tools(),
        rowHover: true,
        subsections,
      }}
    />
  )
}
