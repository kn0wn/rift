'use client'

import { cn } from '@rift/utils'
import type { HTMLAttributes, ReactNode } from 'react'

export type AttachedFile = {
  id: string
  name: string
  size?: number
}

export type PromptInputAttachmentsProps = HTMLAttributes<HTMLDivElement> & {
  files?: AttachedFile[]
  onRemove?: (id: string) => void
  renderFile?: (file: AttachedFile) => ReactNode
}

/**
 * Attachments preview slot. Renders above the input when files are attached.
 */
export function PromptInputAttachments({
  className,
  files = [],
  onRemove,
  renderFile,
  ...props
}: PromptInputAttachmentsProps) {
  if (files.length === 0) return null

  return (
    <div
      className={cn(
        'flex flex-wrap gap-1.5 border-b border-border-muted/60 px-2 py-1.5 pb-2',
        className
      )}
      {...props}
    >
      {files.map((file) =>
        renderFile ? (
          renderFile(file)
        ) : (
          <span
            key={file.id}
            className="inline-flex items-center gap-1.5 rounded-md bg-bg-subtle px-2 py-1 text-xs text-content-default"
          >
            {file.name}
            {onRemove && (
              <button
                type="button"
                onClick={() => onRemove(file.id)}
                className="text-content-muted hover:text-content-default"
                aria-label={`Remove ${file.name}`}
              >
                ×
              </button>
            )}
          </span>
        )
      )}
    </div>
  )
}
