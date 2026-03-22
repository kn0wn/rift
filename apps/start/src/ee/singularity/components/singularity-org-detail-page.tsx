'use client'

import { useMemo } from 'react'
import { DataTable } from '@rift/ui/data-table'
import type { DataTableColumnDef } from '@rift/ui/data-table'
import { Avatar, AvatarFallback, AvatarImage } from '@rift/ui/avatar'
import { Badge } from '@rift/ui/badge'
import { Button } from '@rift/ui/button'
import { Input } from '@rift/ui/input'
import { Label } from '@rift/ui/label'
import { ContentPage } from '@/components/layout'
import { WORKSPACE_PLANS } from '@/lib/shared/access-control'
import type { SingularityOrganizationDetail } from '@/ee/singularity/shared/singularity-admin'
import { useSingularityOrgDetailPageLogic } from './singularity-org-detail-page.logic'

type SingularityMemberRow = SingularityOrganizationDetail['members'][number]
type SingularityInvitationRow = SingularityOrganizationDetail['invitations'][number]

export function SingularityOrgDetailPage({
  organization,
}: {
  organization: SingularityOrganizationDetail
}) {
  const {
    inviteEmail,
    inviteRole,
    selectedPlan,
    isPending,
    activePlanName,
    setInviteEmail,
    setInviteRole,
    setSelectedPlan,
    handleInvite,
    handleRoleChange,
    handleRemoveMember,
    handleCancelInvitation,
    handleSetPlan,
  } = useSingularityOrgDetailPageLogic(organization)
  const memberColumns = useMemo<Array<DataTableColumnDef<SingularityMemberRow>>>(
    () => [
      {
        accessorKey: 'name',
        header: () => <span className="pl-11">User</span>,
        cell: ({ row }) => {
          const member = row.original
          return (
            <div className="flex items-center gap-3">
              <Avatar className="size-9">
                <AvatarImage src={member.image ?? undefined} alt={member.name} />
                <AvatarFallback>{member.name.slice(0, 1)}</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <div className="truncate font-medium text-foreground-primary">
                  {member.name}
                </div>
                <div className="truncate text-sm text-foreground-tertiary">
                  {member.email}
                </div>
              </div>
            </div>
          )
        },
      },
      {
        accessorKey: 'role',
        header: 'Role',
        cell: ({ row }) => {
          const member = row.original
          const canEditRole = member.role !== 'owner'
          return (
            <div className="flex items-center gap-2">
              <Badge variant="outline">{member.role}</Badge>
              {canEditRole ? (
                <select
                  className="h-8 rounded-md border border-border-base bg-surface-base px-2 text-sm"
                  value={member.role === 'admin' ? 'admin' : 'member'}
                  onChange={(event) =>
                    handleRoleChange(
                      member.memberId,
                      event.target.value === 'admin' ? 'admin' : 'member',
                    )
                  }
                  disabled={isPending}
                >
                  <option value="member">Member</option>
                  <option value="admin">Admin</option>
                </select>
              ) : null}
            </div>
          )
        },
      },
      {
        accessorKey: 'accessStatus',
        header: 'Status',
        cell: ({ row }) => {
          const member = row.original
          return (
            <Badge variant="outline">
              {member.accessStatus}
              {member.accessReason ? ` (${member.accessReason})` : ''}
            </Badge>
          )
        },
      },
      {
        id: 'actions',
        header: () => null,
        /**
         * Reserve action-column width so row content remains aligned regardless
         * of which rows render enabled/disabled controls.
         */
        meta: {
          headerClassName: 'w-28 whitespace-nowrap text-right pr-2',
          cellClassName: 'w-28 whitespace-nowrap text-right pr-2',
        },
        cell: ({ row }) => (
          <div className="flex justify-end">
            <Button
              variant="ghost"
              onClick={() => handleRemoveMember(row.original.memberId)}
              disabled={isPending || row.original.role === 'owner'}
            >
              Remove
            </Button>
          </div>
        ),
      },
    ],
    [handleRemoveMember, handleRoleChange, isPending],
  )
  const invitationColumns = useMemo<
    Array<DataTableColumnDef<SingularityInvitationRow>>
  >(
    () => [
      {
        accessorKey: 'email',
        header: 'Email',
        cell: ({ row }) => (
          <span className="font-medium text-foreground-primary">
            {row.original.email}
          </span>
        ),
      },
      {
        accessorKey: 'role',
        header: 'Role',
        cell: ({ row }) => <Badge variant="outline">{row.original.role}</Badge>,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => <Badge variant="outline">{row.original.status}</Badge>,
      },
      {
        id: 'actions',
        header: () => null,
        /** Keep invitation action controls visually consistent with members table. */
        meta: {
          headerClassName: 'w-44 whitespace-nowrap text-right pr-2',
          cellClassName: 'w-44 whitespace-nowrap text-right pr-2',
        },
        cell: ({ row }) => (
          <div className="flex justify-end">
            <Button
              variant="ghost"
              onClick={() => handleCancelInvitation(row.original.invitationId)}
              disabled={isPending}
            >
              Cancel invitation
            </Button>
          </div>
        ),
      },
    ],
    [handleCancelInvitation, isPending],
  )

  return (
    <ContentPage
      title={organization.name}
      description={`Organization profile for ${organization.organizationId}.`}
    >
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          <section className="rounded-xl border border-border-light bg-surface-base p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="size-14">
                  <AvatarImage
                    src={organization.logo ?? undefined}
                    alt={organization.name}
                  />
                  <AvatarFallback>{organization.name.slice(0, 1)}</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <div className="text-lg font-semibold text-foreground-primary">
                    {organization.name}
                  </div>
                  <div className="text-sm text-foreground-tertiary">
                    {organization.slug}
                  </div>
                  <div className="text-xs text-foreground-tertiary">
                    {organization.organizationId}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">{activePlanName}</Badge>
                <Badge variant="outline">{organization.memberCount} users</Badge>
                <Badge variant="outline">
                  {organization.pendingInvitationCount} pending invites
                </Badge>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-border-light bg-surface-base p-5">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-foreground-primary">
                Members
              </h2>
              <p className="text-sm text-foreground-tertiary">
                Invite users, remove access, and adjust roles.
              </p>
            </div>

            <div className="mb-6 grid gap-3 rounded-xl border border-border-light/80 bg-surface-overlay p-4 md:grid-cols-[minmax(0,1fr)_160px_120px]">
              <div className="space-y-2">
                <Label htmlFor="singularity-invite-email">Invite email</Label>
                <Input
                  id="singularity-invite-email"
                  value={inviteEmail}
                  onChange={(event) => setInviteEmail(event.target.value)}
                  placeholder="person@company.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="singularity-invite-role">Role</Label>
                <select
                  id="singularity-invite-role"
                  className="h-10 w-full rounded-md border border-border-base bg-surface-base px-3 text-sm"
                  value={inviteRole}
                  onChange={(event) =>
                    setInviteRole(event.target.value === 'admin' ? 'admin' : 'member')
                  }
                >
                  <option value="member">Member</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex items-end">
                <Button
                  className="w-full"
                  onClick={handleInvite}
                  disabled={isPending || inviteEmail.trim().length === 0}
                >
                  Invite user
                </Button>
              </div>
            </div>

            <DataTable
              data={organization.members}
              columns={memberColumns}
              pageSize={50}
              filterColumn="name"
              filterPlaceholder="Filter members..."
              messages={{
                columns: 'Columns',
                noResults: 'No members found.',
                loading: 'Loading members...',
                previous: 'Previous',
                next: 'Next',
                rowsSelected: 'row(s) selected.',
              }}
              tableWrapperClassName="border-border-base bg-surface-base/95"
            />
          </section>

          <section className="rounded-xl border border-border-light bg-surface-base p-5">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-foreground-primary">
                Pending invitations
              </h2>
              <p className="text-sm text-foreground-tertiary">
                Review the invitations that have not been accepted yet.
              </p>
            </div>
            <DataTable
              data={organization.invitations}
              columns={invitationColumns}
              pageSize={50}
              filterColumn="email"
              filterPlaceholder="Filter invitations..."
              messages={{
                columns: 'Columns',
                noResults: 'No pending invitations.',
                loading: 'Loading invitations...',
                previous: 'Previous',
                next: 'Next',
                rowsSelected: 'row(s) selected.',
              }}
              tableWrapperClassName="border-border-base bg-surface-base/95"
            />
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-xl border border-border-light bg-surface-base p-5">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-foreground-primary">
                Manual plan override
              </h2>
              <p className="text-sm text-foreground-tertiary">
                Apply a manual billing plan and recompute entitlement snapshots.
              </p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="singularity-plan">Plan</Label>
                <select
                  id="singularity-plan"
                  className="h-10 w-full rounded-md border border-border-base bg-surface-base px-3 text-sm"
                  value={selectedPlan}
                  onChange={(event) =>
                    setSelectedPlan(event.target.value as typeof selectedPlan)
                  }
                >
                  {WORKSPACE_PLANS.map((plan) => (
                    <option key={plan.id} value={plan.id}>
                      {plan.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg border border-border-light p-3">
                  <div className="text-foreground-tertiary">Current plan</div>
                  <div className="font-medium text-foreground-primary">
                    {activePlanName}
                  </div>
                </div>
                <div className="rounded-lg border border-border-light p-3">
                  <div className="text-foreground-tertiary">Seats</div>
                  <div className="font-medium text-foreground-primary">
                    {organization.seatCount}
                  </div>
                </div>
              </div>
              <Button
                className="w-full"
                onClick={handleSetPlan}
                disabled={isPending || selectedPlan === organization.planId}
              >
                Apply override
              </Button>
            </div>
          </section>
        </aside>
      </div>
    </ContentPage>
  )
}
