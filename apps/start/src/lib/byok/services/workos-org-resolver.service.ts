import { ServiceMap } from 'effect'
import type { Effect } from 'effect'
import type {
  ByokMissingOrgContextError,
  ByokUnauthorizedError,
} from '../domain/errors'

/**
 * Resolves the current organization's WorkOS ID from
 */
export type WorkOsOrgResolverServiceShape = {
  readonly getOrgWorkosId: () => Effect.Effect<
    string,
    ByokUnauthorizedError | ByokMissingOrgContextError
  >
}

export class WorkOsOrgResolverService extends ServiceMap.Service<
  WorkOsOrgResolverService,
  WorkOsOrgResolverServiceShape
>()('byok/WorkOsOrgResolverService') {}
