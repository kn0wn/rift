'use client'

import * as React from 'react'
import { Form } from '@rift/ui/form'
import { getProviderIcon } from '@/lib/ai-catalog'
import {
  getLocalizedToolCopy,
  getToolDisplayLabel,
} from '@/lib/ai-catalog/tool-ui'
import type { CatalogProviderId } from '@/lib/ai-catalog/provider-tools'
import { m } from '@/paraglide/messages.js'
import type { PolicyPayload } from './types'
import type { useProviderPolicy } from './use-provider-policy'

type ProviderToolsSectionProps = {
  payload: PolicyPayload
  updating: boolean
  update: ReturnType<typeof useProviderPolicy>['update']
}

/**
 * Exact provider-tool controls. These rows are keyed by the unified catalog's
 * provider tool key so admins can disable a single provider's implementation
 * without affecting the same capability on another provider.
 */
export function ProviderToolsSection({
  payload,
  updating,
  update,
}: ProviderToolsSectionProps) {
  const duplicateLabels = React.useMemo(
    () =>
      new Set(
        Object.entries(
          payload.tools.reduce<Record<string, number>>((acc, tool) => {
            const label = getLocalizedToolCopy(tool.key).label
            acc[label] = (acc[label] ?? 0) + 1
            return acc
          }, {}),
        )
          .filter(([, count]) => count > 1)
          .map(([label]) => label),
      ),
    [payload.tools],
  )

  const groupedTools = React.useMemo(() => {
    const groups = new Map<string, PolicyPayload['tools']>()
    for (const tool of payload.tools) {
      const current = groups.get(tool.providerId) ?? []
      current.push(tool)
      groups.set(tool.providerId, current)
    }
    return [...groups.entries()]
  }, [payload.tools])

  const items = React.useMemo(
    () =>
      groupedTools.flatMap(([providerId, tools]) =>
        tools.map((tool) => {
          const ProviderIcon = getProviderIcon(providerId as CatalogProviderId)
          const localizedCopy = getLocalizedToolCopy(tool.key)
          return {
            id: tool.key,
            title: getToolDisplayLabel({
              toolKey: tool.key,
              providerId,
              duplicateLabels,
            }),
            icon: ProviderIcon ? (
              <ProviderIcon className="size-5 text-content-default" />
            ) : (
              <div className="size-5 rounded-full bg-bg-inverted" />
            ),
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
      ),
    [
      duplicateLabels,
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
        items,
      }}
    />
  )
}
