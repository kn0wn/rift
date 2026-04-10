import { describe, expect, it } from 'vitest'
import { buildBranchUsage } from './branch-usage'

describe('buildBranchUsage', () => {
  it('sums assistant request usage across the active branch', () => {
    const usage = buildBranchUsage([
      {
        role: 'user',
        inputTokens: 20,
        totalTokens: 20,
      },
      {
        role: 'assistant',
        inputTokens: 2_410,
        outputTokens: 345,
        totalTokens: 2_755,
        reasoningTokens: 315,
        textTokens: 30,
        cacheReadTokens: 563,
        cacheWriteTokens: 0,
        noCacheTokens: 1_847,
      },
      {
        role: 'assistant',
        inputTokens: 100,
        outputTokens: 40,
        reasoningTokens: 10,
        textTokens: 30,
        cacheReadTokens: 25,
        noCacheTokens: 75,
      },
    ])

    expect(usage?.inputTokens).toBe(2_510)
    expect(usage?.outputTokens).toBe(385)
    expect(usage?.totalTokens).toBe(2_895)
    expect(usage?.outputTokenDetails.reasoningTokens).toBe(325)
    expect(usage?.outputTokenDetails.textTokens).toBe(60)
    expect(usage?.inputTokenDetails.cacheReadTokens).toBe(588)
    expect(usage?.inputTokenDetails.noCacheTokens).toBe(1_922)
  })

  it('returns undefined when the branch has no assistant usage yet', () => {
    const usage = buildBranchUsage([
      {
        role: 'user',
      },
    ])

    expect(usage).toBeUndefined()
  })
})
