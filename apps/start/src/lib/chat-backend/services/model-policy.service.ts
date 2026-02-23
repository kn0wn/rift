import { Effect, Layer, ServiceMap } from 'effect'
import { CHAT_FIXED_MODEL_ID } from '@/lib/ai-catalog'
import {
  evaluateModelAvailability,
  getCatalogModelById,
} from '@/lib/model-policy/policy-engine'
import { getOrgAiPolicy } from '@/lib/model-policy/repository'
import type {
  EffectiveModelResolution,
  OrgAiPolicy,
} from '@/lib/model-policy/types'
import { MessagePersistenceError, ModelPolicyDeniedError } from '../domain/errors'

/**
 * Runtime currently supports only OpenAI IDs on the chat execution path.
 * This guard prevents selecting catalog models that the gateway cannot execute.
 */
function isRuntimeSupportedModel(modelId: string): boolean {
  return modelId.startsWith('openai/')
}

/** Maps policy/runtime selection failures into a chat-domain denied error. */
function toPolicyDenied(input: {
  readonly modelId: string
  readonly threadId: string
  readonly requestId: string
  readonly reason: string
}) {
  return new ModelPolicyDeniedError({
    message: 'Selected model is not allowed for this request',
    requestId: input.requestId,
    modelId: input.modelId,
    threadId: input.threadId,
    reason: input.reason,
  })
}

/**
 * Service contract for reading org policy and resolving the effective runtime model.
 * The resolution path must be deterministic for a given request.
 */
export type ModelPolicyServiceShape = {
  readonly getOrgPolicy: (input: {
    readonly orgWorkosId?: string
    readonly requestId: string
  }) => Effect.Effect<OrgAiPolicy | undefined, MessagePersistenceError>
  readonly resolveThreadModel: (input: {
    readonly threadId: string
    readonly orgWorkosId?: string
    readonly requestId: string
  }) => Effect.Effect<EffectiveModelResolution, ModelPolicyDeniedError | MessagePersistenceError>
}

/** Dependency-injected model policy service used by chat orchestration. */
export class ModelPolicyService extends ServiceMap.Service<
  ModelPolicyService,
  ModelPolicyServiceShape
>()('chat-backend/ModelPolicyService') {}

/**
 * Production implementation:
 * 1) load org policy,
 * 2) resolve fixed model,
 * 3) verify runtime support,
 * 4) enforce org deny rules.
 */
export const ModelPolicyLive = Layer.succeed(ModelPolicyService, {
  getOrgPolicy: ({ orgWorkosId, requestId }) =>
    Effect.tryPromise({
      try: async () => {
        if (!orgWorkosId) return undefined
        return getOrgAiPolicy(orgWorkosId)
      },
      catch: (error) =>
        new MessagePersistenceError({
          message: 'Failed to load organization model policy',
          requestId,
          threadId: 'policy',
          cause: String(error),
        }),
    }),
  resolveThreadModel: ({
    threadId,
    orgWorkosId,
    requestId,
  }) =>
    Effect.gen(function* () {
      const policy = yield* Effect.tryPromise({
        try: async () => {
          if (!orgWorkosId) return undefined
          return getOrgAiPolicy(orgWorkosId)
        },
        catch: (error) =>
          new MessagePersistenceError({
            message: 'Failed to load organization model policy',
            requestId,
            threadId,
            cause: String(error),
          }),
      })

      const requestedModel = getCatalogModelById(CHAT_FIXED_MODEL_ID)
      if (!requestedModel) {
        return yield* Effect.fail(
          toPolicyDenied({
            modelId: CHAT_FIXED_MODEL_ID,
            threadId,
            requestId,
            reason: 'unknown_model',
          }),
        )
      }

      if (!isRuntimeSupportedModel(requestedModel.id)) {
        return yield* Effect.fail(
          toPolicyDenied({
            modelId: requestedModel.id,
            threadId,
            requestId,
            reason: 'runtime_unsupported',
          }),
        )
      }

      const availability = evaluateModelAvailability({
        model: requestedModel,
        policy,
      })

      if (!availability.allowed) {
        return yield* Effect.fail(
          toPolicyDenied({
            modelId: requestedModel.id,
            threadId,
            requestId,
            reason: `policy_denied:${availability.deniedBy.join(',')}`,
          }),
        )
      }

      return {
        modelId: requestedModel.id,
        source: 'fixed',
      } satisfies EffectiveModelResolution
    }),
})

/** Test/local implementation with policy bypass and fixed model resolution. */
export const ModelPolicyMemory = Layer.succeed(ModelPolicyService, {
  getOrgPolicy: () => Effect.succeed(undefined),
  resolveThreadModel: () =>
    Effect.succeed({
      modelId: CHAT_FIXED_MODEL_ID,
      source: 'fixed',
    } satisfies EffectiveModelResolution),
})
