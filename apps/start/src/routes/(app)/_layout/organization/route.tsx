import { Outlet, createFileRoute } from '@tanstack/react-router'
import { requireNonAnonymousAuthOrRedirect } from '@/lib/auth/route-guards'

/** Parent layout route for /organization (e.g. organization settings). */
export const Route = createFileRoute('/(app)/_layout/organization')({
  beforeLoad: async ({ location }) => {
    await requireNonAnonymousAuthOrRedirect({ location })
  },
  component: OrganizationLayout,
})

function OrganizationLayout() {
  return <Outlet />
}
