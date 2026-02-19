import type { ReactNode } from 'react'

import { MainNav } from '@/components/layout/MainNav'
import { AppSidebar } from '@/components/layout/AppSidebar'

export function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="min-h-screen w-full bg-white">
        <MainNav sidebar={AppSidebar}>{children}</MainNav>
      </div>
      <div className="fixed bottom-0 right-0 z-40 m-5">
        <div className="flex items-center gap-3" />
      </div>
    </>
  )
}
