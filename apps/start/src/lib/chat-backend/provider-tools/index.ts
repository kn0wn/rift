import type { ToolSet } from 'ai'
import type {
  CatalogProviderId,
  ProviderToolIdByProvider,
} from '@/lib/ai-catalog/provider-tools'
import { ANTHROPIC_PROVIDER_TOOL_REGISTRY } from './anthropic'
import { GOOGLE_PROVIDER_TOOL_REGISTRY } from './google'
import { OPENAI_PROVIDER_TOOL_REGISTRY } from './openai'
import type { ProviderToolFactoryContext, ProviderToolRegistry } from './types'

type ProviderToolRegistries = {
  [P in CatalogProviderId]: ProviderToolRegistry<P>
}

const PROVIDER_TOOL_REGISTRIES: ProviderToolRegistries = {
  openai: OPENAI_PROVIDER_TOOL_REGISTRY,
  anthropic: ANTHROPIC_PROVIDER_TOOL_REGISTRY,
  google: GOOGLE_PROVIDER_TOOL_REGISTRY,
}

/**
 * Resolves catalog tool ids into concrete AI SDK provider tool instances.
 * Unknown ids and tools without runtime configuration are skipped safely.
 */
export function resolveProviderToolSet<TProviderId extends CatalogProviderId>(input: {
  readonly providerId: TProviderId
  readonly providerToolIds: readonly ProviderToolIdByProvider[TProviderId][]
  readonly context: ProviderToolFactoryContext
}): ToolSet {
  const registry = PROVIDER_TOOL_REGISTRIES[input.providerId]
  const tools: ToolSet = {}

  for (const toolId of input.providerToolIds) {
    const buildTool = registry.byId?.[toolId]
    const tool = buildTool
      ? buildTool(input.context)
      : registry.resolve?.(toolId, input.context)
    if (!tool) continue

    tools[toolId] = tool
  }

  return tools
}
