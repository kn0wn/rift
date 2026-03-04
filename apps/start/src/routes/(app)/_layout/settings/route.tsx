import { Outlet, createFileRoute } from '@tanstack/react-router'
import { requireNonAnonymousAuthOrRedirect } from '@/lib/auth/route-guards'

export const Route = createFileRoute('/(app)/_layout/settings')({
  beforeLoad: async ({ location }) => {
    await requireNonAnonymousAuthOrRedirect({ location })
  },
  component: SettingsLayout,
})

function SettingsLayout() {
  return (
    <div className="min-h-full flex flex-col">
      <Outlet />
    </div>
  )
}
