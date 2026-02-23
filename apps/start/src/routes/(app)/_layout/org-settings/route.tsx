import { Outlet, createFileRoute } from '@tanstack/react-router'

/** Parent layout route for organization settings subsections. */
export const Route = createFileRoute('/(app)/_layout/org-settings')({
  component: OrgSettingsLayout,
})

function OrgSettingsLayout() {
  // Child org settings screens render here.
  return <Outlet />
}
