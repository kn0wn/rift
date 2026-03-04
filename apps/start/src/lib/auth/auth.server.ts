import { createServerFn } from '@tanstack/react-start'
import { getRequestHeaders } from '@tanstack/react-start/server'
import { auth } from './auth'

export type BetterAuthSession = Awaited<ReturnType<typeof auth.api.getSession>>

/**
 * Reads the current Better Auth session in TanStack Start server contexts.
 * Intended for route `beforeLoad` and other server-side auth gates.
 */
export const getSession = createServerFn({ method: 'GET' }).handler(async () => {
  const headers = getRequestHeaders()
  return auth.api.getSession({ headers })
})

/**
 * Enforces an authenticated session for server-side workflows that require it.
 * Throws an explicit error so callers can translate to redirect/401 as needed.
 */
export const ensureSession = createServerFn({ method: 'GET' }).handler(async () => {
  const headers = getRequestHeaders()
  const session = await auth.api.getSession({ headers })

  if (!session) {
    throw new Error('Unauthorized')
  }

  return session
})
