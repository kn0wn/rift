import type { LanguageModelUsage } from 'ai'

type BranchUsageMessage = {
  readonly role: 'user' | 'assistant' | 'system'
  readonly inputTokens?: number | null
  readonly outputTokens?: number | null
  readonly totalTokens?: number | null
  readonly reasoningTokens?: number | null
  readonly textTokens?: number | null
  readonly cacheReadTokens?: number | null
  readonly cacheWriteTokens?: number | null
  readonly noCacheTokens?: number | null
}

function addDefined(
  left: number | undefined,
  right: number | undefined,
): number | undefined {
  return left == null && right == null ? undefined : (left ?? 0) + (right ?? 0)
}

/**
 * Assistant rows store the provider accounting for each completed request. The
 * token usage menu wants a branch-level total, so we sum those per-request
 * analytics across the active branch while ignoring user rows to avoid
 * double-counting prompt tokens that are already included in assistant turns.
 */
export function buildBranchUsage(
  messages: readonly BranchUsageMessage[],
): LanguageModelUsage | undefined {
  let inputTokens: number | undefined
  let outputTokens: number | undefined
  let totalTokens: number | undefined
  let reasoningTokens: number | undefined
  let textTokens: number | undefined
  let cacheReadTokens: number | undefined
  let cacheWriteTokens: number | undefined
  let noCacheTokens: number | undefined
  let hasAnyUsage = false

  for (const message of messages) {
    if (message.role !== 'assistant') continue

    const messageTotalTokens =
      message.totalTokens ??
      addDefined(message.inputTokens ?? undefined, message.outputTokens ?? undefined)

    const messageHasUsage =
      message.inputTokens != null ||
      message.outputTokens != null ||
      message.totalTokens != null ||
      message.reasoningTokens != null ||
      message.textTokens != null ||
      message.cacheReadTokens != null ||
      message.cacheWriteTokens != null ||
      message.noCacheTokens != null

    if (!messageHasUsage) continue

    hasAnyUsage = true
    inputTokens = addDefined(inputTokens, message.inputTokens ?? undefined)
    outputTokens = addDefined(outputTokens, message.outputTokens ?? undefined)
    totalTokens = addDefined(totalTokens, messageTotalTokens ?? undefined)
    reasoningTokens = addDefined(
      reasoningTokens,
      message.reasoningTokens ?? undefined,
    )
    textTokens = addDefined(textTokens, message.textTokens ?? undefined)
    cacheReadTokens = addDefined(
      cacheReadTokens,
      message.cacheReadTokens ?? undefined,
    )
    cacheWriteTokens = addDefined(
      cacheWriteTokens,
      message.cacheWriteTokens ?? undefined,
    )
    noCacheTokens = addDefined(noCacheTokens, message.noCacheTokens ?? undefined)
  }

  if (!hasAnyUsage) return undefined

  return {
    inputTokens,
    inputTokenDetails: {
      noCacheTokens,
      cacheReadTokens,
      cacheWriteTokens,
    },
    outputTokens,
    outputTokenDetails: {
      textTokens,
      reasoningTokens,
    },
    totalTokens,
    reasoningTokens,
    cachedInputTokens: cacheReadTokens,
  }
}
