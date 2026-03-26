import type { PoolClient } from 'pg'
import { selectSeatSlotCandidate } from './shared'
import type { SeatSlotCandidate, UsagePolicySnapshot } from './shared'
import {
  asNumber,
  asOptionalNumber,
  cycleBounds,
  prorateCycleBudget,
} from './core'
import type {
  BucketBalanceRow,
  CurrentUsageSubscription,
  SeatSlotRow,
} from './core'
import type {
  SeatQuotaBucketSnapshot,
  SeatQuotaState,
} from './types'

export async function readSeatSlotsForCycle(
  client: PoolClient,
  input: {
    readonly organizationId: string
    readonly cycleStartAt: number
    readonly cycleEndAt: number
    readonly forUpdate?: boolean
  },
): Promise<SeatSlotRow[]> {
  const result = await client.query<SeatSlotRow>(
    `select
       slot.id,
       slot.organization_id as "organizationId",
       slot.seat_index as "seatIndex",
       slot.cycle_start_at as "cycleStartAt",
       slot.cycle_end_at as "cycleEndAt",
       case
         when slot.current_assignee_user_id is null then null
         when member.id is null then null
         else slot.current_assignee_user_id
       end as "currentAssigneeUserId",
       slot.first_assigned_at as "firstAssignedAt"
     from org_seat_slot slot
     left join member
       on member."organizationId" = slot.organization_id
      and member."userId" = slot.current_assignee_user_id
     where slot.organization_id = $1
       and slot.cycle_start_at = $2
       and slot.cycle_end_at = $3
       and slot.status = 'active'
     order by slot.seat_index asc
     ${input.forUpdate ? 'for update of slot' : ''}`,
    [input.organizationId, input.cycleStartAt, input.cycleEndAt],
  )

  return result.rows.map((row) => ({
    ...row,
    seatIndex: asNumber(row.seatIndex, 0),
    cycleStartAt: asNumber(row.cycleStartAt),
    cycleEndAt: asNumber(row.cycleEndAt),
    firstAssignedAt: asOptionalNumber(row.firstAssignedAt),
  }))
}

export async function readBucketBalances(
  client: PoolClient,
  seatSlotId: string,
): Promise<BucketBalanceRow[]> {
  const result = await client.query<BucketBalanceRow>(
    `select
       id,
       bucket_type as "bucketType",
       total_nano_usd as "totalNanoUsd",
       remaining_nano_usd as "remainingNanoUsd"
     from org_seat_bucket_balance
     where seat_slot_id = $1`,
    [seatSlotId],
  )

  return result.rows.map((row) => ({
    ...row,
    totalNanoUsd: asNumber(row.totalNanoUsd),
    remainingNanoUsd: asNumber(row.remainingNanoUsd),
  }))
}

export async function releaseActiveSeatAssignmentsForSlot(
  client: PoolClient,
  input: {
    readonly seatSlotId: string
    readonly now: number
    readonly nextUserId: string
  },
): Promise<void> {
  await client.query(
    `update org_seat_slot_assignment
     set assignment_status = 'released',
         released_at = coalesce(released_at, $3),
         updated_at = $3
     where seat_slot_id = $1
       and user_id <> $2
       and assignment_status = 'active'`,
    [input.seatSlotId, input.nextUserId, input.now],
  )
}

export async function createSeatSlot(
  client: PoolClient,
  input: {
    readonly organizationId: string
    readonly subscriptionId: string
    readonly planId: string
    readonly seatIndex: number
    readonly cycleStartAt: number
    readonly cycleEndAt: number
    readonly usagePolicy: UsagePolicySnapshot
    readonly now: number
  },
): Promise<void> {
  const slotId = `seat_slot_${input.organizationId}_${input.cycleStartAt}_${input.seatIndex}`

  await client.query(
    `insert into org_seat_slot (
       id,
       organization_id,
       org_subscription_id,
       plan_id,
       cycle_start_at,
       cycle_end_at,
       seat_index,
       status,
       created_at,
       updated_at
     )
     values ($1, $2, $3, $4, $5, $6, $7, 'active', $8, $8)
     on conflict (id) do update
     set organization_id = excluded.organization_id,
         org_subscription_id = excluded.org_subscription_id,
         plan_id = excluded.plan_id,
         cycle_start_at = excluded.cycle_start_at,
         cycle_end_at = excluded.cycle_end_at,
         seat_index = excluded.seat_index,
         status = 'active',
         updated_at = excluded.updated_at`,
    [
      slotId,
      input.organizationId,
      input.subscriptionId,
      input.planId,
      input.cycleStartAt,
      input.cycleEndAt,
      input.seatIndex,
      input.now,
    ],
  )

  await ensureSeatSlotBalanceRows(client, {
    organizationId: input.organizationId,
    seatSlotId: slotId,
    cycleStartAt: input.cycleStartAt,
    cycleEndAt: input.cycleEndAt,
    usagePolicy: input.usagePolicy,
    now: input.now,
  })
}

/**
 * Each seat carries a single cycle-scoped balance that tracks the remaining
 * paid quota for the current subscription period.
 */
export async function ensureSeatSlotBalanceRows(
  client: PoolClient,
  input: {
    readonly organizationId: string
    readonly seatSlotId: string
    readonly cycleStartAt: number
    readonly cycleEndAt: number
    readonly usagePolicy: UsagePolicySnapshot
    readonly now: number
  },
): Promise<void> {
  const seatCycleBucketId = `seat_bucket_${input.seatSlotId}_seat_cycle`

  await client.query(
    `insert into org_seat_bucket_balance (
       id,
       organization_id,
       seat_slot_id,
       bucket_type,
       total_nano_usd,
       remaining_nano_usd,
       created_at,
       updated_at
     )
     values ($1, $2, $3, 'seat_cycle', $4, $4, $5, $5)
     on conflict (seat_slot_id, bucket_type) do nothing`,
    [
      seatCycleBucketId,
      input.organizationId,
      input.seatSlotId,
      prorateCycleBudget({
        totalNanoUsd: input.usagePolicy.seatCycleBudgetNanoUsd,
        now: input.now,
        cycleStartAt: input.cycleStartAt,
        cycleEndAt: input.cycleEndAt,
      }),
      input.now,
    ],
  )
}

async function ensureCurrentCycleBucket(
  client: PoolClient,
  input: {
    readonly bucket: BucketBalanceRow
    readonly seatCycleStartAt: number
    readonly seatCycleEndAt: number
    readonly usagePolicy: UsagePolicySnapshot
    readonly now: number
  },
): Promise<BucketBalanceRow> {
  if (input.bucket.bucketType !== 'seat_cycle') {
    return input.bucket
  }

  const nextTotal = prorateCycleBudget({
    totalNanoUsd: input.usagePolicy.seatCycleBudgetNanoUsd,
    now: input.now,
    cycleStartAt: input.seatCycleStartAt,
    cycleEndAt: input.seatCycleEndAt,
  })
  const nextRemaining = Math.min(
    nextTotal,
    input.bucket.remainingNanoUsd + (nextTotal - input.bucket.totalNanoUsd),
  )

  if (
    input.bucket.totalNanoUsd === nextTotal
    && input.bucket.remainingNanoUsd === nextRemaining
  ) {
    return input.bucket
  }

  const refreshed: BucketBalanceRow = {
    ...input.bucket,
    totalNanoUsd: nextTotal,
    remainingNanoUsd: nextRemaining,
  }

  await client.query(
    `update org_seat_bucket_balance
     set total_nano_usd = $2,
         remaining_nano_usd = $3,
         updated_at = $4
     where id = $1`,
    [
      input.bucket.id,
      refreshed.totalNanoUsd,
      refreshed.remainingNanoUsd,
      input.now,
    ],
  )

  return refreshed
}

export async function hydrateSeatQuotaState(
  client: PoolClient,
  input: {
    readonly seatSlotId: string
    readonly usagePolicy: UsagePolicySnapshot
    readonly now: number
    readonly forUpdate?: boolean
  },
): Promise<SeatQuotaState> {
  const slotResult = await client.query<SeatSlotRow>(
    `select
       id,
       organization_id as "organizationId",
       seat_index as "seatIndex",
       cycle_start_at as "cycleStartAt",
       cycle_end_at as "cycleEndAt",
       current_assignee_user_id as "currentAssigneeUserId",
       first_assigned_at as "firstAssignedAt"
     from org_seat_slot
     where id = $1
     ${input.forUpdate ? 'for update' : ''}`,
    [input.seatSlotId],
  )
  const slot = slotResult.rows[0]
  if (!slot) {
    throw new Error('seat slot not found')
  }

  const bucketQuery = `select
       id,
       bucket_type as "bucketType",
       total_nano_usd as "totalNanoUsd",
       remaining_nano_usd as "remainingNanoUsd"
     from org_seat_bucket_balance
     where seat_slot_id = $1
     ${input.forUpdate ? 'for update' : ''}`
  const bucketRows = await client.query<BucketBalanceRow>(bucketQuery, [input.seatSlotId])
  const cycleBucket = bucketRows.rows.find((bucket) => bucket.bucketType === 'seat_cycle')

  if (!cycleBucket) {
    await ensureSeatSlotBalanceRows(client, {
      organizationId: slot.organizationId ?? '',
      seatSlotId: slot.id,
      cycleStartAt: slot.cycleStartAt,
      cycleEndAt: slot.cycleEndAt,
      usagePolicy: input.usagePolicy,
      now: input.now,
    })
  }

  const refreshedBucketRows = await readBucketBalances(client, input.seatSlotId)
  const resolvedCycleBucket = refreshedBucketRows.find((bucket) => bucket.bucketType === 'seat_cycle')

  if (!resolvedCycleBucket) {
    throw new Error('seat slot balances not found')
  }

  const refreshedCycleBucket = await ensureCurrentCycleBucket(client, {
    bucket: resolvedCycleBucket,
    seatCycleStartAt: slot.cycleStartAt,
    seatCycleEndAt: slot.cycleEndAt,
    usagePolicy: input.usagePolicy,
    now: input.now,
  })

  return {
    seatSlotId: slot.id,
    seatIndex: slot.seatIndex,
    cycleStartAt: slot.cycleStartAt,
    cycleEndAt: slot.cycleEndAt,
    currentAssigneeUserId: slot.currentAssigneeUserId ?? undefined,
    seatCycle: toBucketSnapshot(refreshedCycleBucket),
  }
}

function toBucketSnapshot(bucket: BucketBalanceRow): SeatQuotaBucketSnapshot {
  return {
    bucketType: bucket.bucketType,
    totalNanoUsd: bucket.totalNanoUsd,
    remainingNanoUsd: bucket.remainingNanoUsd,
  }
}

/**
 * Seat assignment runs under row locks for the current billing cycle so the
 * same purchased seat cannot be assigned twice when multiple replicas reserve
 * quota concurrently for the same organization.
 */
export async function ensureSeatAssignmentWithClient(
  client: PoolClient,
  input: {
    readonly organizationId: string
    readonly userId: string
    readonly currentSubscription: CurrentUsageSubscription | null
    readonly usagePolicy: UsagePolicySnapshot
    readonly now: number
  },
): Promise<SeatQuotaState | null> {
  if (!input.currentSubscription || !input.usagePolicy.enabled) {
    return null
  }

  const { cycleStartAt, cycleEndAt } = cycleBounds({
    now: input.now,
    currentPeriodStart: input.currentSubscription.currentPeriodStart,
    currentPeriodEnd: input.currentSubscription.currentPeriodEnd,
  })

  const existingResult = await client.query<{ seatSlotId: string }>(
    `select seat_slot_id as "seatSlotId"
     from org_seat_slot_assignment
     where organization_id = $1
       and user_id = $2
       and cycle_start_at = $3
       and cycle_end_at = $4
       and assignment_status = 'active'
     order by assigned_at desc
     limit 1`,
    [input.organizationId, input.userId, cycleStartAt, cycleEndAt],
  )
  const existingSeatSlotId = existingResult.rows[0]?.seatSlotId
  if (existingSeatSlotId) {
    return hydrateSeatQuotaState(client, {
      seatSlotId: existingSeatSlotId,
      usagePolicy: input.usagePolicy,
      now: input.now,
      forUpdate: true,
    })
  }

  const slots = await readSeatSlotsForCycle(client, {
    organizationId: input.organizationId,
    cycleStartAt,
    cycleEndAt,
    forUpdate: true,
  })
  const candidate = selectSeatSlotCandidate({
    slots: slots.map((slot) => ({
      id: slot.id,
      seatIndex: slot.seatIndex,
      currentAssigneeUserId: slot.currentAssigneeUserId,
      firstAssignedAt: slot.firstAssignedAt,
    }) satisfies SeatSlotCandidate),
  })

  if (!candidate) {
    return null
  }

  await releaseActiveSeatAssignmentsForSlot(client, {
    seatSlotId: candidate.id,
    nextUserId: input.userId,
    now: input.now,
  })

  await client.query(
    `update org_seat_slot
     set current_assignee_user_id = $2,
         first_assigned_at = coalesce(first_assigned_at, $3),
         last_assigned_at = $3,
         updated_at = $3
     where id = $1`,
    [candidate.id, input.userId, input.now],
  )

  await client.query(
    `insert into org_seat_slot_assignment (
       id,
       organization_id,
       seat_slot_id,
       user_id,
       cycle_start_at,
       cycle_end_at,
       assignment_status,
       assigned_at,
       created_at,
       updated_at
     )
     values ($1, $2, $3, $4, $5, $6, 'active', $7, $7, $7)`,
    [
      `seat_assignment_${candidate.id}_${input.userId}_${input.now}`,
      input.organizationId,
      candidate.id,
      input.userId,
      cycleStartAt,
      cycleEndAt,
      input.now,
    ],
  )

  return hydrateSeatQuotaState(client, {
    seatSlotId: candidate.id,
    usagePolicy: input.usagePolicy,
    now: input.now,
    forUpdate: true,
  })
}
