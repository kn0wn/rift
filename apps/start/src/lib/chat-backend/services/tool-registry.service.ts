import { Effect, Layer, ServiceMap } from 'effect'

/**
 * Tool registry returns tool-calling capabilities available to a request.
 */
export type ToolRegistryResult = {
  readonly tools: Record<string, never>
}

/** Service contract for resolving per-request tool availability. */
export type ToolRegistryServiceShape = {
  readonly resolveForThread: (input: {
    readonly threadId: string
    readonly userId: string
    readonly requestId: string
  }) => Effect.Effect<ToolRegistryResult>
}

/** Injectable tool registry token. */
export class ToolRegistryService extends ServiceMap.Service<
  ToolRegistryService,
  ToolRegistryServiceShape
>()('chat-backend/ToolRegistryService') {}

/** Live tool registry (currently no tools enabled). */
export const ToolRegistryLive = Layer.succeed(ToolRegistryService, {
  resolveForThread: () =>
    Effect.succeed({
      tools: {},
    }),
})

/** Memory adapter for tests/local runs. */
export const ToolRegistryMemory = Layer.succeed(ToolRegistryService, {
  resolveForThread: () =>
    Effect.succeed({
      tools: {},
    }),
})
