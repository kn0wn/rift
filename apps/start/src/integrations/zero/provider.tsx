import { ZeroProvider as ZeroProviderBase } from '@rocicorp/zero/react'
import { useAuth } from '@workos/authkit-tanstack-react-start/client'
import { schema } from './schema'
import { mutators } from './mutators'
import type { ZeroContext } from './schema'

const cacheURL = import.meta.env.VITE_ZERO_CACHE_URL

/**
 * Zero userID and context from WorkOS AuthKit. Each userID gets its own client storage.
 * Uses WorkOS user id (user.id) so it matches workos_id in Convex/Postgres.
 */
function useZeroAuth(): { userID: string; context: ZeroContext } {
  const { user } = useAuth()
  const userID = user?.id ?? 'anonymous'
  return { userID, context: { userID } }
}

export default function ZeroProvider({ children }: { children: React.ReactNode }) {
  const { userID, context } = useZeroAuth()

  if (!cacheURL) {
    return <>{children}</>
  }

  return (
    <ZeroProviderBase
      userID={userID}
      context={context}
      cacheURL={cacheURL}
      schema={schema}
      mutators={mutators}
    >
      {children}
    </ZeroProviderBase>
  )
}
