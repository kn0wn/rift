import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/_layout/settings/')({
  component: SettingsAccountPage,
})

function SettingsAccountPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-content-emphasis">Account</h2>
      <p className="text-sm text-content-muted">
        Account settings will go here.
      </p>
    </div>
  )
}
