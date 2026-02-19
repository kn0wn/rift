import { Avatar, AvatarFallback } from '@rift/ui/avatar'
import { Button } from '@rift/ui/button'
import { Link, useLocation } from '@tanstack/react-router'
import { Compass, Moon, Network, Sun } from 'lucide-react'
import type { ComponentType } from 'react'
import { useTheme } from '@rift/ui/hooks/useTheme'

const SIDEBAR_WIDTH = 64


export const AppSidebar: ComponentType = () => {
  const { pathname } = useLocation()
  const { resolvedTheme, setTheme, mounted } = useTheme()
  const shortLinksActive = pathname === '/' || pathname.startsWith('/links')
  const partnerProgramActive = pathname.startsWith('/program')
  const isDark = mounted && resolvedTheme === 'dark'

  return (
    <div
      className="h-full w-[var(--sidebar-width)] bg-neutral-200"
      style={{ '--sidebar-width': `${SIDEBAR_WIDTH}px` } as React.CSSProperties}
    >
      <nav className="flex size-full flex-col items-center justify-between p-2">
        <div className="flex flex-col items-center gap-3">
          <div className="pb-1 pt-2">
          </div>
          <Button variant="sidebarIcon" size="iconSidebar" aria-label="Workspace">
            <Avatar size="xs">
              <AvatarFallback className="bg-neutral-400" />
            </Avatar>
          </Button>
          <Button
            asChild
            variant="sidebarIcon"
            size="iconSidebar"
            data-active={shortLinksActive}
          >
            <Link to="/" aria-label="Short Links">
              <Compass className="size-5 text-neutral-900" />
            </Link>
          </Button>
          <Button
            asChild
            variant="sidebarIcon"
            size="iconSidebar"
            data-active={partnerProgramActive}
          >
            <Link to="/" aria-label="Partner Program">
              <Network className="size-5 text-neutral-900" />
            </Link>
          </Button>
          <Button
            variant="sidebarIcon"
            size="iconSidebar"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
          >
            {isDark ? (
              <Sun className="size-5 text-neutral-900 dark:text-neutral-100" />
            ) : (
              <Moon className="size-5 text-neutral-900 dark:text-neutral-100" />
            )}
          </Button>
        </div>
        <Button variant="sidebarIcon" size="iconSidebar" aria-label="User menu">
          <Avatar size="xs">
            <AvatarFallback className="bg-neutral-300" />
          </Avatar>
        </Button>
      </nav>
    </div>
  )
}
