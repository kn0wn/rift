import {
  getAnthropicProviderToolDefinition,
  type AnthropicProviderToolId,
} from './anthropic'
import { GOOGLE_PROVIDER_TOOLS } from './google'
import { OPENAI_PROVIDER_TOOLS } from './openai'
import type { GoogleProviderToolId } from './google'
import type { OpenAiProviderToolId } from './openai'
import type { ProviderToolDefinition } from './types'

export const PROVIDER_TOOLS = {
  openai: OPENAI_PROVIDER_TOOLS,
  google: GOOGLE_PROVIDER_TOOLS,
} as const

export type CatalogProviderId = 'openai' | 'anthropic' | 'google'

export type ProviderToolIdByProvider = {
  readonly openai: OpenAiProviderToolId
  readonly anthropic: AnthropicProviderToolId
  readonly google: GoogleProviderToolId
}

export type CatalogProviderToolId = ProviderToolIdByProvider[CatalogProviderId]

export function getProviderToolDefinition<TProviderId extends CatalogProviderId>(
  providerId: TProviderId,
  toolId: ProviderToolIdByProvider[TProviderId],
): ProviderToolDefinition | undefined {
  if (providerId === 'anthropic') {
    return getAnthropicProviderToolDefinition(toolId as AnthropicProviderToolId)
  }

  if (providerId === 'openai') {
    return OPENAI_PROVIDER_TOOLS.find(
      (tool) => tool.id === toolId,
    ) as ProviderToolDefinition | undefined
  }

  if (providerId === 'google') {
    return GOOGLE_PROVIDER_TOOLS.find(
      (tool) => tool.id === toolId,
    ) as ProviderToolDefinition | undefined
  }

  return undefined
}
