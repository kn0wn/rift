import { useLocation } from '@tanstack/react-router'
import type { ComponentType, PropsWithChildren } from 'react'
import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { cn } from '@rift/utils'
import { useMediaQuery } from '@rift/ui/hooks/useMediaQuery'

import { AppRightSidebar } from '@/components/layout/app-right-sidebar'
import { useRightSidebar } from '@/components/layout/right-sidebar-context'

type SideNavContextValue = {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export const SideNavContext = createContext<SideNavContextValue>({
  isOpen: false,
  setIsOpen: () => {},
})

type MainNavProps = PropsWithChildren<{
  sidebar: ComponentType
}>

export function MainNav({ children, sidebar: Sidebar }: MainNavProps) {
  const { pathname } = useLocation()
  const { isMobile } = useMediaQuery()
  const [isOpen, setIsOpen] = useState(false)
  const { content: rightSidebarContent } = useRightSidebar()

  const contextValue = useMemo<SideNavContextValue>(
    () => ({ isOpen, setIsOpen }),
    [isOpen],
  )

  useEffect(() => {
    document.body.style.overflow = isOpen && isMobile ? 'hidden' : 'auto'
  }, [isOpen, isMobile])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const showRightSidebar = rightSidebarContent != null
  const gridCols = showRightSidebar
    ? 'md:grid-cols-[min-content_minmax(0,1fr)_min-content]'
    : 'md:grid-cols-[min-content_minmax(0,1fr)]'

  return (
    <div className={cn('min-h-screen md:grid', gridCols)}>
      <div
        className={cn(
          'fixed left-0 z-50 w-screen transition-[background-color,backdrop-filter] md:sticky md:z-auto md:w-full md:bg-transparent',
          isOpen
            ? 'bg-bg-inverted/20 backdrop-blur-sm'
            : 'bg-transparent max-md:pointer-events-none',
          'top-0 h-dvh',
        )}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            e.stopPropagation()
            setIsOpen(false)
          }
        }}
      >
        <div
          className={cn(
            'relative h-full w-min max-w-full bg-bg-emphasis transition-transform md:translate-x-0',
            !isOpen && '-translate-x-full',
          )}
        >
          <Sidebar />
        </div>
      </div>
      <div className="bg-bg-emphasis pb-[var(--page-bottom-margin)] pt-[var(--page-top-margin)] [--page-bottom-margin:0px] [--page-top-margin:0px] h-screen md:pr-2 md:pl-0 md:[--page-top-margin:0.5rem] min-w-0">
        <div className="relative h-full overflow-y-auto border-x border-t border-border-muted pt-px md:rounded-t-xl md:bg-bg-default">
          <SideNavContext.Provider value={contextValue}>
            {children}
          </SideNavContext.Provider>
        </div>
      </div>
      {showRightSidebar ? (
        <div className="hidden lg:block sticky top-0 h-dvh min-h-0 w-min shrink-0 bg-bg-emphasis pl-0 pr-2 pt-[var(--page-top-margin)] [--page-top-margin:0.5rem]">
          <AppRightSidebar>{rightSidebarContent}</AppRightSidebar>
        </div>
      ) : null}
    </div>
  )
}
