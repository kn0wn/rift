'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useServerFn } from '@tanstack/react-start'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { PricingSection } from './pricing-section'
import { PricingComparisonTable } from './pricing-comparison-table'
import { BillingChangeDialog } from '@/components/organization/settings/billing/billing-change-dialog'
import { resolveBillingPlanCardActionState } from '@/components/organization/settings/billing/billing-page.logic'
import {
  markBillingReconcileOnReturnIfNeeded,
} from '@/lib/frontend/billing/billing-return-reconcile'
import {
  changeWorkspaceSubscription,
} from '@/lib/frontend/billing/billing.functions'
import { coerceWorkspacePlanId, getWorkspacePlan, isStripeManagedWorkspacePlan } from '@/lib/shared/access-control'
import type { StripeManagedWorkspacePlanId } from '@/lib/shared/access-control'
import { useOrgBillingSummary } from '@/lib/frontend/billing/use-org-billing'
import { useAppAuth } from '@/lib/frontend/auth/use-auth'
import { isAdminRole } from '@/lib/shared/auth/roles'
import type { PricingPlanActionOverride } from './pricing-card'
import type { LandingPlan } from '@/lib/shared/pricing'
import { m } from '@/paraglide/messages.js'

function formatUnixDate(timestampMs?: number): string | null {
  if (timestampMs == null || !Number.isFinite(timestampMs)) return null
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(timestampMs))
}

function resolveStripeManagedWorkspacePlanId(input: {
  workspacePlanId?: LandingPlan['workspacePlanId']
}): StripeManagedWorkspacePlanId | null {
  if (!input.workspacePlanId) {
    return null
  }

  const workspacePlan = getWorkspacePlan(input.workspacePlanId)
  return isStripeManagedWorkspacePlan(workspacePlan) ? workspacePlan.id : null
}

type PricingCheckoutIntent = {
  checkoutPlan?: StripeManagedWorkspacePlanId
  checkoutSeats?: number
  resumeCheckout?: '1'
}

/**
 * Pricing page content. Renders the pricing cards followed by the comparative
 * matrix so users can scan plan differences without leaving the pricing view.
 */
export function PricingPage(props: {
  checkoutIntent?: PricingCheckoutIntent
}) {
  const navigate = useNavigate()
  const { user, activeOrganizationId, activeOrganizationRole } = useAppAuth()
  const userId = user?.id ?? null
  const { subscription, entitlement } = useOrgBillingSummary()
  const mutateSubscription = useServerFn(changeWorkspaceSubscription)
  const [dialogPlanId, setDialogPlanId] = useState<StripeManagedWorkspacePlanId | null>(null)
  const [dialogErrorMessage, setDialogErrorMessage] = useState<string | null>(null)
  const [dialogDefaultSeatCount, setDialogDefaultSeatCount] = useState<number | null>(null)
  const [pendingActionKey, setPendingActionKey] = useState<string | null>(null)
  const attemptedCheckoutResumeRef = useRef<string | null>(null)
  const billingActionInFlightRef = useRef(false)
  const canManageBilling = isAdminRole(activeOrganizationRole ?? '')

  const currentPlanId = coerceWorkspacePlanId(entitlement?.planId ?? subscription?.planId)
  const currentSeatCount = subscription?.seatCount ?? entitlement?.seatCount ?? 1
  const activeMembers = entitlement?.activeMemberCount ?? 0
  const currentPeriodEndLabel = formatUnixDate(subscription?.currentPeriodEnd)
  const hasManagedSubscription = Boolean(subscription?.providerSubscriptionId)
  const isSignedIn = Boolean(user)

  async function runSubscriptionChange(input: {
    targetPlanId: StripeManagedWorkspacePlanId
    seats: number
    actionKey: string
    source?: 'dialog' | 'resume'
  }) {
    if (billingActionInFlightRef.current) {
      return
    }

    billingActionInFlightRef.current = true
    setDialogErrorMessage(null)
    setPendingActionKey(input.actionKey)

    try {
      const result = await mutateSubscription({
        data: {
          targetPlanId: input.targetPlanId,
          seats: input.seats,
        },
      })
      markBillingReconcileOnReturnIfNeeded(result.url)
      window.location.assign(result.url)
    } catch (error) {
      const message = error instanceof Error
        ? error.message
        : m.org_billing_error_change_subscription()

      if (input.source === 'dialog') {
        setDialogErrorMessage(message)
      } else {
        toast.error(message)
      }
    } finally {
      billingActionInFlightRef.current = false
      setPendingActionKey(null)
    }
  }

  useEffect(() => {
    const checkoutPlan = props.checkoutIntent?.checkoutPlan
    const checkoutSeats = props.checkoutIntent?.checkoutSeats
    const shouldResume = props.checkoutIntent?.resumeCheckout === '1'

    if (!checkoutPlan || !checkoutSeats || !shouldResume) {
      return
    }

    if (
      !userId
      || !activeOrganizationId
      || pendingActionKey != null
      || !canManageBilling
    ) {
      return
    }

    const attemptKey = `${checkoutPlan}:${checkoutSeats}:${activeOrganizationId}`
    if (attemptedCheckoutResumeRef.current === attemptKey) {
      return
    }

    attemptedCheckoutResumeRef.current = attemptKey

    void runSubscriptionChange({
      targetPlanId: checkoutPlan,
      seats: checkoutSeats,
      actionKey: `resume:${attemptKey}`,
      source: 'resume',
    })
  }, [
    activeOrganizationId,
    canManageBilling,
    pendingActionKey,
    props.checkoutIntent?.checkoutPlan,
    props.checkoutIntent?.checkoutSeats,
    props.checkoutIntent?.resumeCheckout,
    userId,
  ])

  const resolvePlanAction = useMemo(() => {
    const hasActiveWorkspace = Boolean(activeOrganizationId)
    const hasStripeManagedSubscription =
      Boolean(subscription?.providerSubscriptionId) &&
      (subscription?.planId === 'plus' ||
        subscription?.planId === 'pro' ||
        subscription?.planId === 'scale')

    return (
      plan: Pick<LandingPlan, 'name' | 'workspacePlanId'>,
    ): PricingPlanActionOverride | undefined => {
      const workspacePlanId = plan.workspacePlanId
      const isEnterprisePlan = workspacePlanId === 'enterprise'
      const isFreePlan = workspacePlanId === 'free'
      const stripePlanId = resolveStripeManagedWorkspacePlanId(plan)
      const isStripeManagedPlan = stripePlanId != null
      const isCurrentPlan =
        (hasStripeManagedSubscription &&
          subscription?.planId === stripePlanId) ||
        (isEnterprisePlan && subscription?.planId === 'enterprise') ||
        (isFreePlan && (!subscription?.planId || subscription.planId === 'free'))

      if (isFreePlan) {
        if (!isSignedIn) return undefined

        const hasPaidPlan =
          subscription?.planId && subscription.planId !== 'free'
        if (hasPaidPlan) {
          return {
            disabled: true,
          }
        }
        return {
          href: '/chat',
        }
      }

      if (!isStripeManagedPlan && !isEnterprisePlan) return undefined

      if (!isSignedIn && isStripeManagedPlan) {
        return {
          disabled: pendingActionKey != null,
          onSelect: () => {
            setDialogErrorMessage(null)
            setDialogDefaultSeatCount(1)
            setDialogPlanId(stripePlanId)
          },
        }
      }

      if (!hasActiveWorkspace) return undefined

      if (isCurrentPlan) {
        if (!canManageBilling) {
          return {
            buttonText: m.pricing_manage_billing(),
            disabled: true,
          }
        }

        return {
          buttonText: m.pricing_manage_billing(),
          href: '/organization/settings/billing',
        }
      }

      if (isStripeManagedPlan) {
        if (!canManageBilling) {
          return {
            disabled: true,
          }
        }

        const actionState = resolveBillingPlanCardActionState({
          targetPlanId: stripePlanId,
          currentPlanId,
          hasManagedSubscription,
          scheduledPlanId: subscription?.scheduledPlanId ?? null,
        })

        return {
          buttonText:
            actionState === 'scheduled'
              ? m.org_billing_scheduled_button()
              : actionState === 'downgrade'
                ? m.org_billing_schedule_downgrade_button()
                : actionState === 'upgrade'
                  ? m.org_billing_upgrade_now_button()
                  : m.pricing_subscribe(),
          disabled: actionState === 'scheduled' || pendingActionKey != null,
          onSelect: () => {
            setDialogErrorMessage(null)
            setDialogDefaultSeatCount(null)
            setDialogPlanId(stripePlanId)
          },
        }
      }
    }
  }, [
    activeOrganizationId,
    canManageBilling,
    currentPlanId,
    hasManagedSubscription,
    isSignedIn,
    pendingActionKey,
    subscription,
  ])

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4">
      <PricingSection resolvePlanAction={resolvePlanAction} />
      <PricingComparisonTable resolvePlanAction={resolvePlanAction} />
      <BillingChangeDialog
        open={dialogPlanId != null}
        onOpenChange={(open) => {
          if (!open && pendingActionKey == null) {
            setDialogPlanId(null)
            setDialogDefaultSeatCount(null)
            setDialogErrorMessage(null)
          }
        }}
        targetPlanId={dialogPlanId}
        currentPlanId={currentPlanId}
        currentSeatCount={currentSeatCount}
        activeMembers={activeMembers}
        hasManagedSubscription={hasManagedSubscription}
        scheduledPlanId={subscription?.scheduledPlanId ?? null}
        scheduledSeatCount={
          dialogPlanId != null && subscription?.scheduledPlanId === dialogPlanId
            ? subscription?.scheduledSeatCount ?? null
            : null
        }
        defaultSeatCountOverride={dialogDefaultSeatCount}
        billingCycleEndLabel={currentPeriodEndLabel}
        submitError={dialogErrorMessage}
        submitting={pendingActionKey != null}
        onConfirm={async ({ targetPlanId, seats, actionKey }) => {
          if (!user) {
            const redirectTarget =
              `/pricing?checkoutPlan=${targetPlanId}&checkoutSeats=${seats}&resumeCheckout=1`
            await navigate({
              to: '/auth/sign-up',
              search: {
                redirect: redirectTarget,
              },
            })
            return
          }

          await runSubscriptionChange({
            targetPlanId,
            seats,
            actionKey,
            source: 'dialog',
          })
        }}
      />
    </div>
  )
}
