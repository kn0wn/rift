import type { ReactNode } from 'react'

const RIGHT_SIDEBAR_WIDTH = 280

export type AppRightSidebarProps = {
  children?: ReactNode
}

export function AppRightSidebar({ children }: AppRightSidebarProps) {
  return (
    <aside
      className="hidden lg:flex h-full min-w-0 flex-col shrink-0"
      style={{ width: `${RIGHT_SIDEBAR_WIDTH}px` }}
      aria-label="Right sidebar"
    >
      <div className="scrollbar-hide flex h-full min-h-0 w-full flex-col overflow-y-auto overflow-x-hidden rounded-t-xl border-x border-t border-border-muted bg-bg-subtle">
        <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden p-3 text-content-muted">
          {children}
        </div>
      </div>
    </aside>
  )
}
