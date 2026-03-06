'use client'

import * as React from 'react'
import { useTransition } from 'react'
import { useQuery } from '@rocicorp/zero/react'
import { queries } from '@/integrations/zero'

export type MemberRow = {
  id: string
  name: string
  email: string
  role: string
  status: 'active' | 'inactive' | 'pending'
  avatarUrl?: string
}

export type OrgMemberDirectoryEntry = {
  id: string
  organizationId: string
  userId: string
  role: string
  user?: {
    id: string
    name: string
    email: string
    image?: string | null
  } | null
}

export type OrgDirectoryRow = {
  id: string
  members?: Array<OrgMemberDirectoryEntry>
}

const ROLE_PRIORITY: Record<string, number> = {
  owner: 0,
  admin: 1,
  member: 2,
}

function sortMembers(left: MemberRow, right: MemberRow): number {
  const leftPriority = ROLE_PRIORITY[left.role.toLowerCase()] ?? Number.MAX_SAFE_INTEGER
  const rightPriority = ROLE_PRIORITY[right.role.toLowerCase()] ?? Number.MAX_SAFE_INTEGER

  if (leftPriority !== rightPriority) {
    return leftPriority - rightPriority
  }

  return left.name.localeCompare(right.name)
}

/**
 * Transforms raw directory entries into table rows and sorts them.
 */
function toMemberRows(members: Array<OrgMemberDirectoryEntry>): Array<MemberRow> {
  return members
    .map((member) => {
      const user = member.user
      const fallbackName = user?.email?.trim() || 'Unknown user'
      const name = user?.name?.trim() || fallbackName

      return {
        id: member.id,
        name,
        email: user?.email?.trim() || 'Unknown email',
        role: member.role,
        status: 'active' as const,
        avatarUrl: user?.image ?? undefined,
      } satisfies MemberRow
    })
    .sort(sortMembers)
}

export type MembersPageLogicResult = {
  data: Array<MemberRow>
  isLoading: boolean
  hasNextPage: boolean
  hasPreviousPage: boolean
  nextPage: () => void
  previousPage: () => void
}

export function useMembersPageLogic(): MembersPageLogicResult {
  const [isPending, startTransition] = useTransition()
  const [pageIndex, setPageIndex] = React.useState(0)
  const [cursors, setCursors] = React.useState<Array<string>>([])
  const nextCursorRef = React.useRef<string | null>(null)

  const queryArgs = React.useMemo(() => {
    if (pageIndex === 0) return {}
    const cursorId = cursors[pageIndex - 1] ?? nextCursorRef.current
    return cursorId ? { cursor: { id: cursorId } } : {}
  }, [pageIndex, cursors])

  const [directory, directoryResult] = useQuery(
    queries.orgSettings.membersDirectory(queryArgs),
  )

  const rawMembers = React.useMemo(
    () => (directory as OrgDirectoryRow | undefined | null)?.members ?? [],
    [directory],
  )

  const data = React.useMemo(() => toMemberRows(rawMembers), [rawMembers])
  const isLoading = directoryResult.type !== 'complete' || isPending

  const hasNextPage = rawMembers.length >= 50
  const hasPreviousPage = pageIndex > 0

  if (rawMembers.length >= 50) {
    const lastId = rawMembers[rawMembers.length - 1]?.id ?? null
    nextCursorRef.current = lastId
  }

  React.useEffect(() => {
    if (rawMembers.length >= 50 && cursors.length === pageIndex) {
      const lastId = rawMembers[rawMembers.length - 1]?.id
      if (lastId) {
        setCursors((c) => [...c, lastId])
      }
    }
  }, [rawMembers, pageIndex, cursors.length])

  const nextPage = React.useCallback(() => {
    if (hasNextPage) {
      startTransition(() => setPageIndex((p) => p + 1))
    }
  }, [hasNextPage, startTransition])

  const previousPage = React.useCallback(() => {
    if (hasPreviousPage) {
      startTransition(() => setPageIndex((p) => p - 1))
    }
  }, [hasPreviousPage, startTransition])

  return {
    data,
    isLoading,
    hasNextPage,
    hasPreviousPage,
    nextPage,
    previousPage,
  }
}
