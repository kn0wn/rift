'use client'

import * as React from 'react'
import { Form } from '@rift/ui/form'
import { m } from '@/paraglide/messages.js'
import type { PolicyPayload } from './types'
import type { useProviderPolicy } from './use-provider-policy'

type BuiltInToolsSectionProps = {
  payload: PolicyPayload
  updating: boolean
  update: ReturnType<typeof useProviderPolicy>['update']
}

/**
 * Organization-wide master switch for provider-native tools. This control sits
 * above per-tool toggles so admins can quickly shut off all built-in provider
 * tools without editing each individual provider/tool row.
 */
export function BuiltInToolsSection({
  payload,
  updating,
  update,
}: BuiltInToolsSectionProps) {
  const handleToggle = React.useCallback(
    (enabled: boolean) => {
      void update({
        action: 'toggle_provider_native_tools',
        enabled,
      })
    },
    [update],
  )

  return (
    <Form
      title={m.org_built_in_tools_title()}
      description={m.org_built_in_tools_description()}
      helpText={m.org_built_in_tools_help()}
      toggleSection={{
        items: [
          {
            id: 'provider-native-tools',
            title: m.org_built_in_tools_toggle_title(),
            description: m.org_built_in_tools_toggle_description(),
            checked: payload.policy.toolPolicy.providerNativeToolsEnabled,
            onCheckedChange: handleToggle,
            disabled: updating,
          },
        ],
      }}
    />
  )
}
