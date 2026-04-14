import { Effect } from 'effect'
import { requireAppUserAuth } from './server-auth'
import { isSelfHosted } from '@/utils/app-feature-flags'
import { verifyZeroSelfHostedAccessToken } from '@/lib/backend/zero-auth/zero-self-hosted-token.service'

function readBearerToken(headers: Headers): string | null {
  const authorization = headers.get('authorization')?.trim()
  if (!authorization) return null

  const match = authorization.match(/^Bearer\s+(.+)$/i)
  if (!match) {
    throw new Error('Unsupported authorization header for Zero route.')
  }

  const token = match[1]?.trim()
  if (!token) {
    throw new Error('Missing bearer token for Zero route.')
  }

  return token
}

export const requireZeroAppUserAuth = Effect.fn(
  'ServerAuth.requireZeroAppUserAuth',
)(<TUnauthorized>(input: {
  readonly headers: Headers
  readonly onUnauthorized: () => TUnauthorized
}) => {
  if (!isSelfHosted) {
    return requireAppUserAuth(input)
  }

  const bearerToken = (() => {
    try {
      return readBearerToken(input.headers)
    } catch {
      return ''
    }
  })()

  if (bearerToken === null) {
    return requireAppUserAuth(input)
  }

  if (!bearerToken) {
    return Effect.fail(input.onUnauthorized())
  }

  return Effect.try({
    try: () => verifyZeroSelfHostedAccessToken(bearerToken),
    catch: () => input.onUnauthorized(),
  })
})
