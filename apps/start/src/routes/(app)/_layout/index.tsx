import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/_layout/')({
  component: Home,
})

function Home() {
  return (
    <div className="min-h-full flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full space-y-6 text-center">
        <h1 className="text-3xl font-bold text-content-emphasis">Rift</h1>
        <p className="text-content-muted">
          <Link to="/chat" className="text-content-emphasis underline hover:no-underline">
            Go to Chat
          </Link>
          {' '}to get started.
        </p>
      </div>
    </div>
  )
}
