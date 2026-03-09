import { describe, expect, it } from 'vitest'
import { getPlanEffectiveFeatures } from './plan-catalog'

describe('getPlanEffectiveFeatures', () => {
  it('keeps free workspaces out of gated organization settings', () => {
    expect(getPlanEffectiveFeatures('free')).toEqual({
      byok: false,
      providerPolicy: false,
      compliancePolicy: false,
      toolPolicy: false,
    })
  })

  it('enables BYOK on plus without unlocking advanced policy settings', () => {
    expect(getPlanEffectiveFeatures('plus')).toEqual({
      byok: true,
      providerPolicy: false,
      compliancePolicy: false,
      toolPolicy: false,
    })
  })

  it('enables all gated organization settings on pro', () => {
    expect(getPlanEffectiveFeatures('pro')).toEqual({
      byok: true,
      providerPolicy: true,
      compliancePolicy: true,
      toolPolicy: true,
    })
  })
})
