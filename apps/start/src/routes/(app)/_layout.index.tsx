import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/_layout/')({
  component: Home,
})

function Home() {
  return <div className="min-h-full" />
}
