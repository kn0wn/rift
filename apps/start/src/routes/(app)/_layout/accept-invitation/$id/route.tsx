import { createFileRoute, useNavigate, Navigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { authClient } from '@/lib/auth/auth-client'
import { useAppAuth } from '@/lib/auth/use-auth'
import { Button } from '@rift/ui/button'

export const Route = createFileRoute('/(app)/_layout/accept-invitation/$id')({
  component: AcceptInvitationPage,
})

/**
 * Page shown when a user opens an organization invitation link from email.
 * If not signed in, redirects to sign-up with return URL. If signed in,
 * fetches invitation details and shows Accept / Reject actions.
 */
function AcceptInvitationPage() {
  const { id } = Route.useParams()
  const navigate = useNavigate()
  const { user, loading: authLoading } = useAppAuth()
  /** Invitation payload from getInvitation; shape comes from Better Auth organization plugin. */
  const [invitation, setInvitation] = useState<{
    organization?: { name?: string }
    inviter?: { user?: { name?: string; email?: string } }
  } | null>(null)
  const [invitationError, setInvitationError] = useState<string | null>(null)
  const [actionLoading, setActionLoading] = useState<'accept' | 'reject' | null>(
    null,
  )
  const [actionError, setActionError] = useState<string | null>(null)

  // Load invitation details once user is known (effect runs unconditionally to satisfy rules of hooks)
  useEffect(() => {
    if (!user || !id) return
    let cancelled = false
    setInvitationError(null)
    authClient.organization
      .getInvitation({ query: { id } })
      .then(({ data, error }) => {
        if (cancelled) return
        if (error) {
          setInvitationError(error.message ?? 'Failed to load invitation')
          return
        }
        if (data) {
          setInvitation({
            organization: (data as { organization?: { name?: string } }).organization,
            inviter: (data as { inviter?: { user?: { name?: string; email?: string } } }).inviter,
          })
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setInvitationError(err instanceof Error ? err.message : 'Failed to load invitation')
        }
      })
    return () => {
      cancelled = true
    }
  }, [user, id])

  // Redirect unauthenticated users to sign-up so they can create an account, then return here
  if (!authLoading && !user) {
    return (
      <Navigate
        to="/auth/sign-up"
        search={{ redirect: `/accept-invitation/${id}` }}
      />
    )
  }

  const handleAccept = async () => {
    if (!id) return
    setActionError(null)
    setActionLoading('accept')
    try {
      const { data, error } = await authClient.organization.acceptInvitation({
        invitationId: id,
      })
      if (error) {
        setActionError(error.message ?? 'Failed to accept invitation')
        return
      }
      // Set the joined org as active when present (acceptInvitation returns { invitation, member })
      const res = data as {
        invitation?: { organizationId?: string }
        member?: { organizationId?: string }
      }
      const orgId = res?.invitation?.organizationId ?? res?.member?.organizationId
      if (orgId) {
        await authClient.organization.setActive({ organizationId: orgId })
      }
      navigate({ to: '/organization/settings' })
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Failed to accept invitation')
    } finally {
      setActionLoading(null)
    }
  }

  const handleReject = async () => {
    if (!id) return
    setActionError(null)
    setActionLoading('reject')
    try {
      const { error } = await authClient.organization.rejectInvitation({
        invitationId: id,
      })
      if (error) {
        setActionError(error.message ?? 'Failed to reject invitation')
        return
      }
      navigate({ to: '/chat' })
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Failed to reject invitation')
    } finally {
      setActionLoading(null)
    }
  }

  if (authLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center p-8">
        <p className="text-content-muted">Loading…</p>
      </div>
    )
  }

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-6">
      <h1 className="text-2xl font-semibold text-content-emphasis">
        Organization invitation
      </h1>

      {invitationError && (
        <p className="mt-4 text-sm text-content-error">{invitationError}</p>
      )}

      {invitation && !invitationError && (
        <>
          <p className="mt-3 text-content-muted">
            You have been invited to join{' '}
            <span className="font-medium text-content-default">
              {invitation.organization?.name ?? 'an organization'}
            </span>
            {invitation.inviter?.user?.name || invitation.inviter?.user?.email
              ? ` by ${invitation.inviter.user.name ?? invitation.inviter.user.email}`
              : ''}
            .
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              variant="default"
              onClick={handleAccept}
              disabled={!!actionLoading}
            >
              {actionLoading === 'accept' ? 'Accepting…' : 'Accept'}
            </Button>
            <Button
              variant="ghost"
              onClick={handleReject}
              disabled={!!actionLoading}
            >
              {actionLoading === 'reject' ? 'Rejecting…' : 'Decline'}
            </Button>
          </div>
        </>
      )}

      {!invitation && !invitationError && user && (
        <p className="mt-4 text-content-muted">Loading invitation…</p>
      )}

      {actionError && (
        <p className="mt-4 text-sm text-content-error">{actionError}</p>
      )}
    </main>
  )
}
