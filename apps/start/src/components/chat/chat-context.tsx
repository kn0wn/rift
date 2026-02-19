'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from 'react'
import { useChat as useAIChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'

type ChatContextValue = Pick<
  ReturnType<typeof useAIChat>,
  'messages' | 'status' | 'error' | 'sendMessage' | 'stop' | 'setMessages'
> & {
  clear: () => void
}

const ChatContext = createContext<ChatContextValue | null>(null)

export function ChatProvider({ children }: { children: ReactNode }) {
  const { messages, status, error, sendMessage, stop, setMessages } = useAIChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  })

  const clear = useCallback(() => setMessages([]), [setMessages])

  const value = useMemo<ChatContextValue>(
    () => ({ messages, status, error, sendMessage, stop, setMessages, clear }),
    [messages, status, error, sendMessage, stop, setMessages, clear]
  )

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

export function useChat() {
  const ctx = useContext(ChatContext)
  if (!ctx) {
    throw new Error('useChat must be used within ChatProvider')
  }
  return ctx
}
