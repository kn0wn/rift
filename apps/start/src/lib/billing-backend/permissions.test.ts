import { describe, expect, it } from 'vitest'
import { isWorkspaceBillingManagerRole } from './permissions'

describe('isWorkspaceBillingManagerRole', () => {
  it('allows owners and admins to manage billing', () => {
    expect(isWorkspaceBillingManagerRole('owner')).toBe(true)
    expect(isWorkspaceBillingManagerRole('admin')).toBe(true)
    expect(isWorkspaceBillingManagerRole('member,admin')).toBe(true)
  })

  it('keeps regular members out of billing controls', () => {
    expect(isWorkspaceBillingManagerRole('member')).toBe(false)
  })
})
