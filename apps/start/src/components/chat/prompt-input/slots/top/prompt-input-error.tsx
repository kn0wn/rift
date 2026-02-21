'use client'

import { cn } from '@rift/utils'
import type { HTMLAttributes } from 'react'

export type PromptInputErrorProps = HTMLAttributes<HTMLDivElement> & {
  message?: string
}

/**
 * Error message slot. Renders above the input when an error occurs.
 */
export function PromptInputError({
  className,
  message,
  children,
  ...props
}: PromptInputErrorProps) {
  if (!message && !children) return null

  return (
    <div
      className={cn(
        'border-b border-border-muted/60 px-2 py-1.5 pb-2 text-sm text-content-error',
        className
      )}
      role="alert"
      {...props}
    >
      {children ?? message}
    </div>
  )
}
