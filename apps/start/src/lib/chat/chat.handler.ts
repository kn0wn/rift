import { convertToModelMessages, streamText, type UIMessage } from 'ai'
import { openai } from '@ai-sdk/openai'
import type { ChatBody } from './chat.schema'

const SYSTEM_PROMPT = 'You are a helpful assistant.'

export async function handleChatStream(body: ChatBody): Promise<Response> {
  const messages = body.messages as UIMessage[]
  const modelMessages = await convertToModelMessages(messages)

  const result = streamText({
    model: openai('gpt-4o-mini'),
    system: SYSTEM_PROMPT,
    messages: modelMessages,
  })

  return result.toUIMessageStreamResponse()
}
