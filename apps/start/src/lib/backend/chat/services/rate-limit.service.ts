import { Effect, Layer, ServiceMap } from 'effect'
import { RateLimitExceededError, RateLimitPersistenceError } from '../domain/errors'
import { getMemoryState } from '../infra/memory/state'
import { authPool } from '@/lib/backend/auth/auth-pool'

/**
 * Fixed-window request throttling. The live implementation is database-backed
 * so multiple server replicas share the same counters, while memory remains
 * available for deterministic unit tests.
 */
const RATE_LIMIT_RETENTION_WINDOWS = 2

/** Service contract for per-user chat request throttling. */
export type RateLimitServiceShape = {
  readonly assertAllowed: (input: {
    readonly userId: string
    readonly requestId: string
    readonly windowMs: number
    readonly maxRequests: number
  }) => Effect.Effect<
    { readonly allowed: true; readonly remaining: number },
    RateLimitExceededError | RateLimitPersistenceError
  >
}

/** Injectable rate-limit service token. */
export class RateLimitService extends ServiceMap.Service<
  RateLimitService,
  RateLimitServiceShape
>()('chat-backend/RateLimitService') {
  /** Shared Postgres-backed limiter used in production runtimes. */
  static readonly layer = Layer.succeed(this, {
    assertAllowed: Effect.fn('RateLimitService.assertAllowedLive')(
      ({ userId, requestId, windowMs, maxRequests }) =>
        Effect.tryPromise({
          try: async () => {
            const now = Date.now()
            const windowStartMs = Math.floor(now / windowMs) * windowMs
            const result = await authPool.query<{ hits: number }>(
              `insert into chat_request_rate_limit_window (
                 user_id,
                 window_started_at,
                 hits,
                 updated_at
               )
               values ($1, $2, 1, $3)
               on conflict (user_id, window_started_at) do update
               set hits = chat_request_rate_limit_window.hits + 1,
                   updated_at = excluded.updated_at
               returning hits`,
              [userId, windowStartMs, now],
            )
            const hits = result.rows[0]?.hits ?? 1

            await authPool.query(
              `delete from chat_request_rate_limit_window
               where user_id = $1
                 and window_started_at < $2`,
              [
                userId,
                windowStartMs - (windowMs * RATE_LIMIT_RETENTION_WINDOWS),
              ],
            )

            if (hits > maxRequests) {
              throw new RateLimitExceededError({
                message: 'Rate limit exceeded',
                requestId,
                userId,
                retryAfterMs: windowMs - (now - windowStartMs),
              })
            }

            return { allowed: true as const, remaining: maxRequests - hits }
          },
          catch: (error) =>
            error instanceof RateLimitExceededError
              ? error
              : new RateLimitPersistenceError({
                  message: 'Failed to evaluate chat rate limit',
                  requestId,
                  userId,
                  cause: error instanceof Error ? error.message : String(error),
                }),
        }),
    ),
  })

  /** In-memory limiter retained for deterministic tests. */
  static readonly layerMemory = Layer.succeed(this, {
    assertAllowed: Effect.fn('RateLimitService.assertAllowed')(
      function* ({
        userId,
        requestId,
        windowMs,
        maxRequests,
      }: {
        readonly userId: string
        readonly requestId: string
        readonly windowMs: number
        readonly maxRequests: number
      }) {
        const now = Date.now()
        const bucket = getMemoryState().rateLimits.get(userId)

        if (!bucket || now - bucket.windowStartMs >= windowMs) {
          getMemoryState().rateLimits.set(userId, { windowStartMs: now, hits: 1 })
          return { allowed: true as const, remaining: maxRequests - 1 }
        }

        if (bucket.hits >= maxRequests) {
          const retryAfterMs = windowMs - (now - bucket.windowStartMs)
          return yield* Effect.fail(
            new RateLimitExceededError({
              message: 'Rate limit exceeded',
              requestId,
              userId,
              retryAfterMs,
            }),
          )
        }

        bucket.hits += 1
        getMemoryState().rateLimits.set(userId, bucket)
        return { allowed: true as const, remaining: maxRequests - bucket.hits }
      },
    ),
  })
}
