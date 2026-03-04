import { redirect, type ParsedLocation } from '@tanstack/react-router'
import { getSession, type BetterAuthSession } from './auth.server'

type RequireNonAnonymousAuthInput = {
  readonly location: Pick<ParsedLocation, 'pathname' | 'searchStr' | 'hash'>
  readonly signInPath?: '/auth/sign-in'
}

/**
 * Narrow Better Auth session payloads to users that should be treated as fully authenticated.
 * Anonymous sessions are intentionally excluded for protected app areas (for example org settings),
 * even though they have a valid Better Auth session cookie.
 */
function isNonAnonymousSession(session: BetterAuthSession): boolean {
  if (!session?.user) return false
  const isAnonymous = (session.user as { isAnonymous?: unknown }).isAnonymous
  return isAnonymous !== true
}

/**
 * Route guard utility for TanStack Start `beforeLoad`.
 * Ensures the request has a non-anonymous authenticated session; otherwise redirects to sign-in
 * and preserves the full destination URL for post-login return.
 */
export async function requireNonAnonymousAuthOrRedirect(
  input: RequireNonAnonymousAuthInput,
): Promise<void> {
  const session = await getSession()

  if (isNonAnonymousSession(session)) return

  const target = `${input.location.pathname}${input.location.searchStr}${input.location.hash}`
  throw redirect({
    to: input.signInPath ?? '/auth/sign-in',
    search: { redirect: target },
  })
}
