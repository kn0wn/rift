import { useCallback } from 'react'
import { authClient } from './auth-client'
import type { AppSession } from './auth-client'

export type AppAuthSession = AppSession
export type AppAuthUser = AppSession['user']

/**
 * App-level auth hook backed entirely by Better Auth
 */
export function useAppAuth() {
  const sessionQuery = authClient.useSession()
  const user = sessionQuery.data?.user ?? null
  const activeOrganizationId = sessionQuery.data?.session?.activeOrganizationId

  const signOut = useCallback(async () => {
    await authClient.signOut()
    await sessionQuery.refetch()
  }, [sessionQuery])

  const signInAnonymously = useCallback(async () => {
    await authClient.signIn.anonymous()
    await sessionQuery.refetch()
  }, [sessionQuery])

  return {
    user,
    loading: sessionQuery.isPending,
    session: sessionQuery.data?.session,
    activeOrganizationId,
    signOut,
    signInAnonymously,
  }
}
