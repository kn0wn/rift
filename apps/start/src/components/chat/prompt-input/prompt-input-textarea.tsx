'use client'

import { Textarea } from '@rift/ui/textarea'
import { cn } from '@rift/utils'
import type { ComponentProps, KeyboardEventHandler } from 'react'
import { useRef, useCallback, useEffect } from 'react'
import { TEXTAREA_MAX_HEIGHT } from './constants'

export type PromptInputTextareaProps = ComponentProps<typeof Textarea>

const isMobileLike = () =>
  typeof window !== 'undefined' &&
  (window.matchMedia('(max-width: 768px)').matches ||
    'ontouchstart' in window ||
    (navigator.maxTouchPoints != null && navigator.maxTouchPoints > 0))

/**
 * Auto-growing textarea with Enter to submit (desktop) / Shift+Enter newline.
 * Presentational; value/onChange controlled by parent.
 */
export function PromptInputTextarea({
  onChange,
  className,
  placeholder = 'Outline your product, flow, or idea…',
  ...props
}: PromptInputTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const adjustHeight = useCallback(() => {
    const textarea = textareaRef.current
    if (!textarea) return
    textarea.style.height = 'auto'
    const newHeight = Math.min(textarea.scrollHeight, TEXTAREA_MAX_HEIGHT)
    textarea.style.height = `${newHeight}px`
  }, [])

  useEffect(() => {
    adjustHeight()
  }, [adjustHeight, props.value])

  const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key !== 'Enter') return
    if (e.nativeEvent.isComposing) return

    if (isMobileLike()) return

    if (e.shiftKey) return

    e.preventDefault()
    const form = e.currentTarget.form
    if (form) form.requestSubmit()
  }

  return (
    <Textarea
      ref={textareaRef}
      className={cn(
        'flex-1 min-h-[40px] w-full resize-none rounded-none border-none p-0 shadow-none outline-none ring-0',
        'field-sizing-content bg-transparent max-h-[200px] overflow-y-auto',
        'text-base leading-[1.4] tracking-[-0.01em] proportional-nums whitespace-pre-wrap',
        'focus-visible:ring-0 placeholder:text-content-muted/50 text-content-emphasis',
        className
      )}
      name="message"
      onChange={(e) => {
        onChange?.(e)
        adjustHeight()
      }}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      {...props}
    />
  )
}
