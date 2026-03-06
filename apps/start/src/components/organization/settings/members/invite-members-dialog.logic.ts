'use client'

import { useState } from 'react'
import { authClient } from '@/lib/auth/auth-client'

export const INVITE_BATCH_MAX = 10

export const INVITE_ROLES = [
  { value: 'member', label: 'Member' },
  { value: 'admin', label: 'Admin' },
] as const

export type InviteEntry = { id: string; email: string; role: string }

type InviteRole = 'member' | 'admin'

function createEntry(overrides?: Partial<InviteEntry>): InviteEntry {
  return {
    id: crypto.randomUUID(),
    email: '',
    role: 'member',
    ...overrides,
  }
}

export type InviteMembersDialogLogicResult = {
  inviteDialogOpen: boolean
  onDialogOpenChange: (open: boolean) => void
  inviteEntries: InviteEntry[]
  setInviteEntryEmail: (entryId: string, email: string) => void
  setInviteEntryRole: (entryId: string, role: string) => void
  addInviteEntry: () => void
  submitButtonDisabled: boolean
  submitError: string | null
  submitSuccess: string | null
  handleSubmit: () => Promise<void>
}


export function useInviteMembersDialogLogic(): InviteMembersDialogLogicResult {
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false)
  const [inviteEntries, setInviteEntries] = useState<InviteEntry[]>(() => [
    createEntry(),
  ])
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null)

  const resetEntries = () => setInviteEntries([createEntry()])

  const clearFeedback = () => {
    setSubmitError(null)
    setSubmitSuccess(null)
  }

  const onDialogOpenChange = (open: boolean) => {
    setInviteDialogOpen(open)
    if (!open) {
      resetEntries()
      clearFeedback()
    }
  }

  const setInviteEntryEmail = (entryId: string, email: string) => {
    setInviteEntries((prev) =>
      prev.map((v) => (v.id === entryId ? { ...v, email } : v)),
    )
  }

  const setInviteEntryRole = (entryId: string, role: string) => {
    setInviteEntries((prev) =>
      prev.map((v) => (v.id === entryId ? { ...v, role } : v)),
    )
  }

  const addInviteEntry = () => {
    setInviteEntries((prev) =>
      prev.length < INVITE_BATCH_MAX ? [...prev, createEntry()] : prev,
    )
  }

  const submitButtonDisabled = !inviteEntries.some(
    (e) => e.email.trim().length > 0,
  )

  const handleSubmit = async () => {
    clearFeedback()

    const toInvite: Array<{ email: string; role: InviteRole }> = []
    for (const e of inviteEntries) {
      const email = e.email.trim()
      if (email.length > 0) {
        toInvite.push({ email, role: e.role as InviteRole })
      }
    }

    if (toInvite.length === 0) {
      setSubmitError('Enter at least one email address.')
      return
    }

    const results = await Promise.allSettled(
      toInvite.map(({ email, role }) =>
        authClient.organization.inviteMember({ email, role }),
      ),
    )

    const errors: string[] = []
    let invited = 0
    for (let i = 0; i < results.length; i++) {
      const result = results[i]
      const { email } = toInvite[i]!
      if (result.status === 'fulfilled' && result.value.error) {
        errors.push(
          `${email}: ${result.value.error.message ?? String(result.value.error)}`,
        )
      } else if (result.status === 'rejected') {
        errors.push(
          `${email}: ${result.reason?.message ?? String(result.reason)}`,
        )
      } else {
        invited += 1
      }
    }

    if (errors.length > 0) {
      const message =
        errors.length === toInvite.length
          ? errors[0]
          : `${invited} invited; ${errors.length} failed. ${errors[0]}`
      setSubmitError(message)
      return
    }

    setSubmitSuccess(
      toInvite.length === 1
        ? 'Invitation sent.'
        : `${toInvite.length} invitations sent.`,
    )
    setInviteDialogOpen(false)
    resetEntries()
  }

  return {
    inviteDialogOpen,
    onDialogOpenChange,
    inviteEntries,
    setInviteEntryEmail,
    setInviteEntryRole,
    addInviteEntry,
    submitButtonDisabled,
    submitError,
    submitSuccess,
    handleSubmit,
  }
}
