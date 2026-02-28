'use client'

import { Button } from '@rift/ui/button'
import { X } from 'lucide-react'
import { useRightSidebar } from '@/components/layout/right-sidebar-context'

type ReasoningTriggerProps = {
  reasoningText: string
  isStreaming: boolean
}

/**
 * Panel shown in the right sidebar when the user opens reasoning from a message.
 * Renders title, close button, and scrollable reasoning text. Owned by the chat feature.
 */
function ReasoningPanel({
  text,
  isStreaming,
  onClose,
}: {
  text: string
  isStreaming: boolean
  onClose: () => void
}) {
  return (
    <>
      <div className="mb-2 flex shrink-0 items-center justify-between gap-2 border-b border-border-muted px-3 py-2">
        <span className="text-lg font-semibold text-content-emphasis">
          Reasoning
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          aria-label="Close sidebar"
          className="size-8 shrink-0"
        >
          <X className="size-4" />
        </Button>
      </div>
      <div
        className="mt-3 min-h-0 flex-1 overflow-y-auto whitespace-pre-wrap break-words text-content-muted text-xs leading-5"
        aria-live={isStreaming ? 'polite' : 'off'}
      >
        {text}
      </div>
    </>
  )
}

/**
 * Text-only trigger that opens the right sidebar with this message's AI reasoning.
 * Used by assistant message decorators; keeps the message row minimal.
 */
export function ReasoningTrigger({
  reasoningText,
  isStreaming,
}: ReasoningTriggerProps) {
  const { open, close } = useRightSidebar()

  if (!reasoningText.trim()) return null

  return (
    <button
      type="button"
      onClick={() =>
        open(
          <ReasoningPanel
            text={reasoningText}
            isStreaming={isStreaming}
            onClose={close}
          />,
        )
      }
      className="group text-secondary-text flex w-full cursor-pointer items-center justify-start gap-1 text-sm transition-colors"
      aria-label={isStreaming ? 'Show reasoning (streaming)' : 'Show reasoning'}
    >
      Reasoning
    </button>
  )
}
