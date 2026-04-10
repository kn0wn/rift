// @vitest-environment jsdom
import { render, screen } from '@testing-library/react'
import type { LanguageModelUsage, UIMessage } from 'ai'
import { describe, expect, it } from 'vitest'
import type { ChatMessageMetadata } from '@/lib/shared/chat-contracts/message-metadata'
import { useContextUsage } from './use-context-usage'

type TestMessage = UIMessage<ChatMessageMetadata>

function TestConsumer({
  messages,
  usage,
}: {
  messages: TestMessage[]
  usage?: LanguageModelUsage
}) {
  const { usedTokens } = useContextUsage(messages, usage)

  return <output>{usedTokens}</output>
}

describe('useContextUsage', () => {
  it('prefers authoritative provider totals when usage is available', () => {
    render(
      <TestConsumer
        messages={[
          {
            id: 'user-1',
            role: 'user',
            parts: [{ type: 'text', text: 'hello there' }],
          },
        ]}
        usage={{
          inputTokens: 2_410,
          inputTokenDetails: {
            cacheReadTokens: 563,
            cacheWriteTokens: 0,
            noCacheTokens: 1_847,
          },
          outputTokens: 345,
          outputTokenDetails: {
            reasoningTokens: 315,
            textTokens: 30,
          },
          totalTokens: 2_755,
        }}
      />,
    )

    expect(screen.getByText('2755')).toBeTruthy()
  })

  it('falls back to estimating the resendable prompt footprint', () => {
    render(
      <TestConsumer
        messages={[
          {
            id: 'user-1',
            role: 'user',
            parts: [{ type: 'text', text: '12345678' }],
          },
        ]}
      />,
    )

    expect(screen.getByText('2')).toBeTruthy()
  })
})
