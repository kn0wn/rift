import type { ToolSet } from 'ai'
import { Effect, Layer, ServiceMap } from 'effect'
import { AI_CATALOG_BY_ID } from '@/lib/ai-catalog'
import { TOOL_CATALOG_BY_KEY } from '@/lib/ai-catalog/tool-catalog'
import type { AiReasoningEffort } from '@/lib/ai-catalog/types'
import { resolveProviderToolSet } from '../provider-tools'

/**
 * Tool registry returns tool-calling capabilities available to a request.
 */
export type ToolRegistryResult = {
  readonly tools: ToolSet
  readonly activeTools: readonly string[]
  readonly defaultProviderOptions?: Record<string, unknown>
  readonly providerOptionsByReasoning: Partial<
    Record<AiReasoningEffort, Record<string, unknown>>
  >
}

/** Service contract for resolving per-request tool availability. */
export type ToolRegistryServiceShape = {
  readonly resolveForModel: (input: {
    readonly modelId: string
    readonly resolvedToolKeys: readonly string[]
  }) => Effect.Effect<ToolRegistryResult>
}

function emptyToolRegistryResult(): ToolRegistryResult {
  return {
    tools: {},
    activeTools: [],
    providerOptionsByReasoning: {},
  }
}

/** Injectable tool registry token. */
export class ToolRegistryService extends ServiceMap.Service<
  ToolRegistryService,
  ToolRegistryServiceShape
>()('chat-backend/ToolRegistryService') {
  /** Live tool registry resolving provider-specific tool capabilities. */
  static readonly layer = Layer.succeed(this, {
    resolveForModel: Effect.fn('ToolRegistryService.resolveForModel')(
      ({
        modelId,
        resolvedToolKeys,
      }: {
        readonly modelId: string
        readonly resolvedToolKeys: readonly string[]
      }) => {
        const model = AI_CATALOG_BY_ID.get(modelId)
        if (!model) {
          return Effect.succeed(emptyToolRegistryResult())
        }

        const enabledProviderTools = resolvedToolKeys
          .map((toolKey) => TOOL_CATALOG_BY_KEY.get(toolKey))
          .filter(
            (entry): entry is NonNullable<typeof entry> =>
              !!entry && entry.providerId === model.providerId,
          )
          .map(
            (entry) =>
              entry.providerToolId as (typeof model.providerToolIds)[number],
          )
        const tools =
          enabledProviderTools.length > 0
            ? resolveProviderToolSet({
                providerId: model.providerId,
                providerToolIds: enabledProviderTools,
                context: { modelId: model.id },
              })
            : {}
        const activeTools = Object.keys(tools)

        return Effect.succeed({
          tools,
          activeTools,
          defaultProviderOptions: model?.defaultProviderOptions,
          providerOptionsByReasoning: model?.providerOptionsByReasoning ?? {},
        })
      },
    ),
  })

  /** Memory adapter for tests/local runs. */
  static readonly layerMemory = Layer.succeed(this, {
    resolveForModel: Effect.fn('ToolRegistryService.resolveForModelMemory')(
      () => Effect.succeed(emptyToolRegistryResult()),
    ),
  })
}
