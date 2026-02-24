// Prompt input container with named slots for error/attachments/thinking UI.
'use client'

import { cn } from '@rift/utils'
import type { HTMLAttributes, ReactNode } from 'react'

export type PromptInputSlots = {
  /** Rendered in the outer illusion wrapper, above the input. Grows the frame when shown. */
  top?: ReactNode
  /** Reserved for future use (e.g. suggested replies below input). */
  bottom?: ReactNode
}

export type PromptInputRootProps = Omit<
  HTMLAttributes<HTMLFormElement>,
  'children'
> & {
  /** Named slots for extensible content. Use slots.top for thinking, attachments, etc. */
  slots?: PromptInputSlots
  /** When provided, clicking anywhere in the content area focuses the input. */
  onFocusInput?: () => void
  children: ReactNode
}

/** Elements that should not trigger focus when clicked (e.g. buttons, selects). */
const INTERACTIVE_SELECTORS =
  'button, input, select, textarea, [role="button"], [data-slot="popover-content"], [data-slot="select-content"]'

/**
 * Root form with layered illusion. Slots render in the outer wrapper so the
 * frame grows when slot content is shown.
 */
export function PromptInputRoot({
  className,
  slots,
  onFocusInput,
  children,
  ...props
}: PromptInputRootProps) {
  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!onFocusInput) return
    const target = e.target as HTMLElement
    if (!target.closest(INTERACTIVE_SELECTORS)) {
      onFocusInput()
    }
  }

  const contentClickProps = onFocusInput
    ? { onClick: handleContentClick, className: 'cursor-text' as const }
    : {}

  return (
    <form className={cn('relative w-full', className)} {...props}>
      <div
        className={cn(
          'flex flex-col overflow-hidden rounded-t-2xl bg-bg-emphasis/75 px-1.5 pt-1.5',
          contentClickProps.className
        )}
        onClick={contentClickProps.onClick}
      >
        {slots?.top}
        <div
          className={cn(
            'flex min-h-[72px] shrink-0 flex-col gap-1.5 rounded-t-xl bg-bg-emphasis p-3',
            contentClickProps.className
          )}
          onClick={contentClickProps.onClick}
        >
          {children}
        </div>
        {slots?.bottom}
      </div>
    </form>
  )
}
