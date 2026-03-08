'use client'

import * as React from 'react'
import { Form } from '@rift/ui/form'
import { m } from '@/paraglide/messages.js'
import type { PolicyPayload } from './types'
import type { useProviderPolicy } from './use-provider-policy'

type ExternalToolsSectionProps = {
  payload: PolicyPayload
  updating: boolean
  update: ReturnType<typeof useProviderPolicy>['update']
}

/**
 * External tool access is modeled separately from provider-native tools so the
 * policy contract already supports future sandbox or remote-tool integrations.
 */
export function ExternalToolsSection({
  payload,
  updating,
  update,
}: ExternalToolsSectionProps) {
  const handleToggle = React.useCallback(
    (enabled: boolean) => {
      void update({
        action: 'toggle_external_tools',
        enabled,
      })
    },
    [update],
  )

  return (
    <Form
      title={m.org_external_tools_title()}
      description={m.org_external_tools_description()}
      helpText={m.org_external_tools_help()}
      toggleSection={{
        items: [
          {
            id: 'external-tools',
            title: m.org_external_tools_toggle_title(),
            description: m.org_external_tools_toggle_description(),
            checked: payload.policy.toolPolicy.externalToolsEnabled,
            onCheckedChange: handleToggle,
            disabled: updating,
          },
        ],
      }}
    />
  )
}
