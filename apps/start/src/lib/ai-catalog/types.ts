/**
 * Tags used by policy/compliance rules to deny groups of models without listing
 * every model ID explicitly.
 */
export type AiModelTag =
  | 'collects_data'
  | 'reasoning'
  | 'multimodal'
  | 'fast'
  | 'economical'

/**
 * Runtime capabilities exposed to UI/policy consumers so behavior can be gated
 * by feature support instead of provider-specific conditionals.
 */
export type AiModelCapabilities = {
  readonly supportsTools: boolean
  readonly supportsStreaming: boolean
  readonly supportsReasoning: boolean
  readonly supportsImageInput: boolean
}

/**
 * Provider/model-specific constraints that callers may need to satisfy before
 * executing a request (for example, API flags or prompt requirements).
 */
export type AiModelRequirement = {
  readonly key: string
  readonly value: string | boolean | number
}

/**
 * Canonical catalog row used across policy evaluation, admin settings, and
 * chat runtime model selection.
 */
export type AiModelCatalogEntry = {
  readonly id: string
  readonly providerId: string
  readonly name: string
  readonly description: string
  readonly contextWindow: number
  readonly tags: readonly AiModelTag[]
  readonly capabilities: AiModelCapabilities
  readonly requirements?: readonly AiModelRequirement[]
}
