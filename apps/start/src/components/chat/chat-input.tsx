import { useRef, useState, useCallback } from 'react'
import { useChat } from './chat-context'

export function ChatInput() {
  const { sendMessage, status, stop } = useChat()
  const [input, setInput] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const isBusy = status === 'submitted' || status === 'streaming'

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      const value = input.trim()
      if (!value || isBusy) return
      sendMessage({ text: value })
      setInput('')
    },
    [input, isBusy, sendMessage]
  )

  const isEmpty = !input.trim()

  return (
    <form onSubmit={handleSubmit} className="w-full">
      {/* Orchid-style composer: outer rounded container with inner white box */}
      <div
        data-orchid-flip="prompt-composer"
        className="overflow-hidden rounded-[14px] bg-bg-muted p-0.5 transition-shadow duration-300 hover:ring-2 hover:ring-border-default"
      >
        {/* Optional "thinking" status row (Orchid-style) */}
        <div
          className={[
            'grid overflow-hidden transition-all duration-300 ease-out',
            isBusy ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
          ].join(' ')}
        >
          <div className="min-h-0">
            <div className="overflow-visible px-2 py-1">
              <div className="flex items-center justify-between gap-2">
                <div className="flex flex-1 items-center gap-2 px-1.5 py-1">
                  <div
                    className="size-2 shrink-0 animate-pulse rounded-full bg-content-emphasis"
                    aria-hidden
                  />
                  <span className="text-sm leading-[21px] text-content-muted">
                    Thinking…
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => stop()}
                  className="group/button relative inline-flex h-7 shrink-0 cursor-pointer items-center rounded-lg px-1.5 py-0 text-sm leading-[21px] text-content-muted outline-none transition-transform hover:text-content-emphasis focus-visible:ring-2 focus-visible:ring-content-muted"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Input area: inner white box (Orchid rounded-orchid-prompt-inner + shadow) */}
        <div className="rounded-[10px] bg-bg-default shadow-[0_0_10px_3px_rgb(0_0_0/0.08)]">
          <div className="pl-1.5">
            <div className="flex w-full items-center pr-2">
              <div className="relative flex flex-1 cursor-text pl-1.5">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSubmit(e)
                    }
                  }}
                  placeholder="Ask anything..."
                  disabled={isBusy}
                  rows={1}
                  aria-label="Ask anything..."
                  className={[
                    'min-h-[2.5rem] w-full max-h-40 resize-none overflow-y-auto bg-transparent p-2',
                    'text-sm leading-[21px] text-content-emphasis',
                    'whitespace-pre-wrap break-words outline-none',
                    'placeholder:text-content-muted',
                    'disabled:opacity-60',
                  ].join(' ')}
                />
              </div>
            </div>
          </div>

          {/* Actions row (Orchid-style): Send on the right */}
          <div className="flex items-center justify-end gap-2 p-2">
            <button
              type="submit"
              disabled={isEmpty || isBusy}
              className={[
                'relative inline-flex h-7 flex-none items-center rounded-[8px] px-1.5 py-0 text-sm leading-[21px] outline-none select-none focus-visible:ring-2 focus-visible:ring-content-muted',
                !isEmpty && !isBusy
                  ? 'cursor-pointer text-content-emphasis'
                  : 'cursor-not-allowed opacity-50',
              ].join(' ')}
            >
              {!isEmpty && !isBusy && (
                <div
                  className="absolute inset-0 rounded-[8px] border border-border-default bg-bg-default shadow-[0_1px_1px_0_rgb(0_0_0/0.1)]"
                  aria-hidden
                />
              )}
              <span className="relative z-10 inline-flex items-center gap-1 px-[2px]">
                Send
                <span className="hidden h-4 items-center rounded border border-border-default bg-bg-muted px-1 text-[12px] leading-[17.6px] text-content-muted md:inline-flex">
                  ↵
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
