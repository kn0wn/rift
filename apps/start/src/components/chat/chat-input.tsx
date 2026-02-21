'use client'

import { useCallback, useEffect, useState } from 'react'
import { Mic, Plus } from 'lucide-react'
import { useChat } from './chat-context'
import {
  PromptInputRoot,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputSubmit,
  PromptInputThinking,
  PromptInputError,
} from './prompt-input'
import { cn } from '@rift/utils'

const PLACEHOLDER = 'Outline your product, flow, or idea…'

export function ChatInput() {
  const { sendMessage, status, stop, error } = useChat()
  const [input, setInput] = useState('')
  const [errorDismissed, setErrorDismissed] = useState(false)

  const isBusy = status === 'submitted' || status === 'streaming'
  const isEmpty = !input.trim()
  const errorMessage =
    error?.message ?? (typeof error === 'string' ? error : null)
  const showError = !!errorMessage && !errorDismissed

  useEffect(() => {
    if (error) setErrorDismissed(false)
  }, [error])

  const handleDismissError = useCallback(() => setErrorDismissed(true), [])
  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const text = input.trim()
      if (!text || isBusy) return
      sendMessage({ text })
      setInput('')
    },
    [input, isBusy, sendMessage]
  )

  return (
    <PromptInputRoot
      onSubmit={handleSubmit}
      className="w-full"
      slots={{
        top: showError ? (
          <PromptInputError
            error={errorMessage}
            onDismiss={handleDismissError}
          />
        ) : (
          <PromptInputThinking isVisible={isBusy} onCancel={stop} />
        ),
      }}
    >
      <PromptInputTextarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={PLACEHOLDER}
        disabled={isBusy}
        aria-label="Message"
      />

      <PromptInputToolbar>
        <button
          type="button"
          className="flex size-9 shrink-0 items-center justify-center rounded-lg text-content-muted outline-none transition-colors hover:bg-bg-subtle hover:text-content-default focus-visible:ring-2 focus-visible:ring-border-emphasis"
          aria-label="Attach file"
        >
          <Plus className="size-4" aria-hidden />
        </button>
        <div className="flex-1" />
        <button
          type="button"
          className="flex size-9 shrink-0 items-center justify-center rounded-lg text-content-muted outline-none transition-colors hover:bg-bg-subtle hover:text-content-default focus-visible:ring-2 focus-visible:ring-border-emphasis"
          aria-label="Voice input"
        >
          <Mic className="size-4 stroke-2 text-content-muted" aria-hidden />
        </button>
        <PromptInputSubmit
          status={status}
          onStop={stop}
          disabled={isEmpty || isBusy}
          className={cn(
            'size-9 shrink-0 rounded-lg border-0 !bg-bg-muted !text-content-emphasis',
            'shadow-sm hover:!bg-bg-muted/90 focus-visible:ring-2 focus-visible:ring-border-emphasis',
            '[&_svg]:size-4'
          )}
        />
      </PromptInputToolbar>
    </PromptInputRoot>
  )
}
