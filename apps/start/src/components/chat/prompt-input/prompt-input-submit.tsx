'use client'

import { Button } from '@rift/ui/button'
import { SentIcon, LoadingIcon, StopIcon } from '@rift/ui/icons/svg-icons'
import { cn } from '@rift/utils'
import type { ChatStatus } from 'ai'
import { AlertTriangle } from 'lucide-react'
import type { ComponentProps } from 'react'

export type PromptInputSubmitProps = ComponentProps<typeof Button> & {
  /** From useChat().status (ai.ChatStatus) */
  status?: ChatStatus
}

/** Icon and label per status. */
const statusConfig: Record<
  ChatStatus,
  {
    icon: React.ComponentType<{ className?: string }>
    label: string
    shouldSpin: boolean
  }
> = {
  ready: { icon: SentIcon, label: 'Send message', shouldSpin: false },
  submitted: { icon: LoadingIcon, label: 'Sending...', shouldSpin: true },
  streaming: { icon: StopIcon, label: 'Stop generation', shouldSpin: false },
  error: { icon: AlertTriangle, label: 'Error', shouldSpin: false },
}

/**
 * Submit button with status-driven icon and label.
 */
export function PromptInputSubmit({
  className,
  variant = 'default',
  size = 'icon',
  status = 'ready',
  children,
  ...props
}: PromptInputSubmitProps) {
  const { icon: Icon, label, shouldSpin } = statusConfig[status]

  return (
    <Button
      className={cn(
        className,
        'cursor-pointer disabled:opacity-100 disabled:pointer-events-auto',
      )}
      size={size}
      type="submit"
      variant={variant}
      title={label}
      aria-label={label}
      {...props}
    >
      {children ?? (
        shouldSpin ? (
          <Icon className="size-5 animate-spin" />
        ) : (
          <Icon className="size-5" />
        )
      )}
    </Button>
  )
}
