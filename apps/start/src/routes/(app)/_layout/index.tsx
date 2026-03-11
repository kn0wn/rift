import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/_layout/')({
  beforeLoad: () => {
    throw redirect({ to: '/chat' })
  },
})
