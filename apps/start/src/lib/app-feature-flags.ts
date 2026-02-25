/**
 * App-level feature flags.
 */
type AppFeatureFlags = {
  readonly enableEmbedding: boolean
  readonly enableReasoningControls: boolean
  readonly enableAdvancedProviderTools: boolean
}

function readBooleanEnv(
  key: string,
  defaultValue: boolean,
  env: NodeJS.ProcessEnv = process.env,
): boolean {
  const value = env[key]
  if (value === 'true') return true
  if (value === 'false') return false
  return defaultValue
}

const APP_FEATURE_FLAGS: AppFeatureFlags = Object.freeze({
  enableEmbedding: readBooleanEnv('ENABLE_EMBEDDING', true),
  enableReasoningControls: true,
  enableAdvancedProviderTools: true,
})

export function getAppFeatureFlags(): AppFeatureFlags {
  return APP_FEATURE_FLAGS
}

export function isEmbeddingFeatureEnabled(): boolean {
  return APP_FEATURE_FLAGS.enableEmbedding
}

export function canUseReasoningControls(): boolean {
  return APP_FEATURE_FLAGS.enableReasoningControls
}

export function canUseAdvancedProviderTools(): boolean {
  return APP_FEATURE_FLAGS.enableAdvancedProviderTools
}

