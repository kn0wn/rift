import { getWorkspacePlanRank } from '@/lib/shared/access-control'
import type {
  SelfServeWorkspacePlanId,
  StripeManagedWorkspacePlanId,
  WorkspacePlanId,
} from '@/lib/shared/access-control'

export type BillingPlanCardActionState =
  | 'manage'
  | 'scheduled'
  | 'subscribe'
  | 'upgrade'
  | 'downgrade'

export type BillingPlanChangeActionState =
  | 'current'
  | 'scheduled'
  | 'upgrade'
  | 'downgrade'

export function isDowngradeSelection(input: {
  currentPlanId: WorkspacePlanId
  currentSeatCount: number
  targetPlanId: StripeManagedWorkspacePlanId
  selectedSeatCount: number
}): boolean {
  const currentPlanRank = getWorkspacePlanRank(input.currentPlanId)
  const targetPlanRank = getWorkspacePlanRank(input.targetPlanId)

  return targetPlanRank < currentPlanRank
    || (targetPlanRank === currentPlanRank
      && input.selectedSeatCount < input.currentSeatCount)
}

export function resolveBillingPlanCardActionState(input: {
  targetPlanId: StripeManagedWorkspacePlanId
  currentPlanId: WorkspacePlanId
  hasManagedSubscription: boolean
  scheduledPlanId?: SelfServeWorkspacePlanId | null
}): BillingPlanCardActionState {
  if (input.targetPlanId === input.currentPlanId) {
    return 'manage'
  }

  if (input.scheduledPlanId === input.targetPlanId) {
    return 'scheduled'
  }

  if (!input.hasManagedSubscription || input.currentPlanId === 'free') {
    return 'subscribe'
  }

  return getWorkspacePlanRank(input.targetPlanId) > getWorkspacePlanRank(input.currentPlanId)
    ? 'upgrade'
    : 'downgrade'
}

/**
 * Once the user picks a seat count in the dialog, the action collapses to the
 * final transition that will actually be submitted to billing.
 */
export function resolveBillingPlanChangeActionState(input: {
  targetPlanId: StripeManagedWorkspacePlanId
  selectedSeatCount: number
  currentPlanId: WorkspacePlanId
  currentSeatCount: number
  scheduledPlanId?: SelfServeWorkspacePlanId | null
  scheduledSeatCount?: number | null
}): BillingPlanChangeActionState {
  if (
    input.scheduledPlanId === input.targetPlanId
    && input.scheduledSeatCount === input.selectedSeatCount
  ) {
    return 'scheduled'
  }

  if (
    input.currentPlanId === input.targetPlanId
    && input.currentSeatCount === input.selectedSeatCount
  ) {
    return 'current'
  }

  return isDowngradeSelection({
    currentPlanId: input.currentPlanId,
    currentSeatCount: input.currentSeatCount,
    targetPlanId: input.targetPlanId,
    selectedSeatCount: input.selectedSeatCount,
  })
    ? 'downgrade'
    : 'upgrade'
}

export function isScheduledCancelToFree(input: {
  scheduledPlanId?: SelfServeWorkspacePlanId | null
  cancelAtPeriodEnd?: boolean
}): boolean {
  return input.scheduledPlanId === 'free' || input.cancelAtPeriodEnd === true
}
