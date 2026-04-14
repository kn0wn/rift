import { afterEach, describe, expect, it } from 'vitest'
import {
  issueZeroSelfHostedAccessToken,
  verifyZeroSelfHostedAccessToken,
} from './zero-self-hosted-token.service'

const ORIGINAL_SECRET = process.env.BETTER_AUTH_SECRET

describe('zero-self-hosted-token.service', () => {
  afterEach(() => {
    if (ORIGINAL_SECRET === undefined) {
      delete process.env.BETTER_AUTH_SECRET
    } else {
      process.env.BETTER_AUTH_SECRET = ORIGINAL_SECRET
    }
  })

  it('issues and verifies a self-hosted Zero token', () => {
    process.env.BETTER_AUTH_SECRET = 'test-secret'

    const issued = issueZeroSelfHostedAccessToken({
      userId: 'user_123',
      organizationId: 'org_456',
    })

    const verified = verifyZeroSelfHostedAccessToken(issued.token)

    expect(verified).toEqual({
      userId: 'user_123',
      organizationId: 'org_456',
      isAnonymous: false,
    })
  })

  it('rejects a tampered token', () => {
    process.env.BETTER_AUTH_SECRET = 'test-secret'

    const issued = issueZeroSelfHostedAccessToken({
      userId: 'user_123',
      organizationId: 'org_456',
    })

    const [payload] = issued.token.split('.')
    const tampered = `${payload}.different-signature`

    expect(() => verifyZeroSelfHostedAccessToken(tampered)).toThrow()
  })

  it('rejects an expired token', () => {
    process.env.BETTER_AUTH_SECRET = 'test-secret'

    const issued = issueZeroSelfHostedAccessToken({
      userId: 'user_123',
      organizationId: 'org_456',
    })

    const realNow = Date.now
    // Move time forward by more than 600s TTL + clock skew to ensure expiration
    Date.now = () => realNow() + 700_000

    try {
      expect(() => verifyZeroSelfHostedAccessToken(issued.token)).toThrow()
    } finally {
      Date.now = realNow
    }
  })
})
