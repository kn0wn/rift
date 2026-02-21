import { cn } from '@rift/utils'
import type { HTMLAttributes } from 'react'

export type PromptInputToolbarProps = HTMLAttributes<HTMLDivElement>

/**
 * Bottom toolbar row
 */
export function PromptInputToolbar({
  className,
  ...props
}: PromptInputToolbarProps) {
  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-between gap-2 pt-1',
        'pb-[max(env(safe-area-inset-bottom),0.25rem)]',
        className
      )}
      {...props}
    />
  )
}
