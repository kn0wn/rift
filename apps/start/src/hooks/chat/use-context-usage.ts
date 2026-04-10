'use client'

import { useMemo } from 'react'
import type { LanguageModelUsage, UIMessage } from 'ai'
import type { ChatMessageMetadata } from '@/lib/shared/chat-contracts/message-metadata'
import { estimatePromptTokens } from '@/lib/shared/chat-contracts'

/**
 * The composer exposes two related but different token concepts:
 * 1) the resendable prompt footprint for deciding whether another turn can fit,
 * 2) the provider-reported usage aggregated across the active branch.
 *
 * When authoritative provider usage is available we prefer it for the visible
 * "used / max" display so the summary bar matches the detailed breakdown.
 * While a thread is still purely local or the assistant response has not been
 * persisted yet, we fall back to the prompt estimator so the UI remains useful.
 */
function computeContextUsage(
  messages: UIMessage<ChatMessageMetadata>[],
  usage?: LanguageModelUsage,
): number {
  return usage?.totalTokens ?? estimatePromptTokens(messages)
}

/**
 * Hook that computes context window usage from chat messages.
 * Used by the thread context indicator in the composer bar.
 */
export function useContextUsage(
  messages: UIMessage<ChatMessageMetadata>[],
  usage?: LanguageModelUsage,
): {
  usedTokens: number
} {
  return useMemo(
    () => ({ usedTokens: computeContextUsage(messages, usage) }),
    [messages, usage],
  )
}
