import { describe, expect, it } from 'vitest'
import { Effect } from 'effect'
import { DEFAULT_ORG_TOOL_POLICY } from '@/lib/model-policy/types'
import { ToolPolicyService } from './tool-policy.service'

describe('ToolPolicyService', () => {
  it('returns model tool keys by default', async () => {
    const result = await Effect.runPromise(
      Effect.gen(function* () {
        const service = yield* ToolPolicyService
        return yield* service.resolveForThread({
          threadId: 'thread-default',
          userId: 'user-default',
          requestId: 'req-default',
          modelId: 'openai/gpt-5-mini',
        })
      }).pipe(Effect.provide(ToolPolicyService.layer)),
    )

    expect(result.activeToolKeys).toContain('openai.web_search')
    expect(result.activeToolKeys).toContain('openai.code_interpreter')
  })

  it('removes an exact org-disabled tool without affecting siblings', async () => {
    const result = await Effect.runPromise(
      Effect.gen(function* () {
        const service = yield* ToolPolicyService
        return yield* service.resolveForThread({
          threadId: 'thread-org-disable',
          userId: 'user-org-disable',
          requestId: 'req-org-disable',
          modelId: 'xai/grok-4-fast-reasoning',
          orgPolicy: {
            organizationId: 'org-1',
            disabledProviderIds: [],
            disabledModelIds: [],
            complianceFlags: {},
            toolPolicy: {
              ...DEFAULT_ORG_TOOL_POLICY,
              disabledToolKeys: ['xai.code_execution'],
            },
            updatedAt: Date.now(),
          },
        })
      }).pipe(Effect.provide(ToolPolicyService.layer)),
    )

    expect(result.activeToolKeys).not.toContain('xai.code_execution')
    expect(result.activeToolKeys).toContain('xai.web_search')
  })

  it('blocks all provider-native tools when the org master switch is off', async () => {
    const result = await Effect.runPromise(
      Effect.gen(function* () {
        const service = yield* ToolPolicyService
        return yield* service.resolveForThread({
          threadId: 'thread-org-master-off',
          userId: 'user-org-master-off',
          requestId: 'req-org-master-off',
          modelId: 'openai/gpt-5-mini',
          orgPolicy: {
            organizationId: 'org-2',
            disabledProviderIds: [],
            disabledModelIds: [],
            complianceFlags: {},
            toolPolicy: {
              ...DEFAULT_ORG_TOOL_POLICY,
              providerNativeToolsEnabled: false,
            },
            updatedAt: Date.now(),
          },
        })
      }).pipe(Effect.provide(ToolPolicyService.layer)),
    )

    expect(result.activeToolKeys).toHaveLength(0)
    expect(
      result.toolEntries.every((entry) =>
        entry.reasons.includes('blocked_by_org_master_switch'),
      ),
    ).toBe(true)
  })
})
