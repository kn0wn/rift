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
  changeWorkspaceSubscription,
} from '@/lib/frontend/billing/billing.functions'
import { coerceWorkspacePlanId } from '@/lib/shared/access-control'
import type { StripeManagedWorkspacePlanId } from '@/lib/shared/access-control'
import { useOrgBillingSummary } from '@/lib/frontend/billing/use-org-billing'
import { isAdminRole } from '@/lib/shared/auth/roles'
import { useAppAuth } from '@/lib/frontend/auth/use-auth'
import { authClient } from '@/lib/frontend/auth/auth-client'
import type { PricingPlanActionOverride } from './pricing-card'
import { m } from '@/paraglide/messages.js'

function formatUnixDate(timestampMs?: number): string | null {
  if (timestampMs == null || !Number.isFinite(timestampMs)) return null
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(timestampMs))
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
  const { user, activeOrganizationId } = useAppAuth()
  const { subscription, entitlement } = useOrgBillingSummary()
  const mutateSubscription = useServerFn(changeWorkspaceSubscription)
  const [dialogPlanId, setDialogPlanId] = useState<StripeManagedWorkspacePlanId | null>(null)
  const [dialogErrorMessage, setDialogErrorMessage] = useState<string | null>(null)
  const [dialogDefaultSeatCount, setDialogDefaultSeatCount] = useState<number | null>(null)
  const [pendingActionKey, setPendingActionKey] = useState<string | null>(null)
  const [canManageBilling, setCanManageBilling] = useState(false)
  const [billingRoleLoading, setBillingRoleLoading] = useState(false)
  const attemptedCheckoutResumeRef = useRef<string | null>(null)

  useEffect(() => {
    let cancelled = false

    if (!user || !activeOrganizationId) {
      setCanManageBilling(false)
      setBillingRoleLoading(false)
      return
    }

    setBillingRoleLoading(true)
    void authClient.organization
      .getActiveMemberRole({
        query: {
          organizationId: activeOrganizationId,
        },
      })
      .then(({ data, error }) => {
        if (cancelled) return
        if (error || !data?.role) {
          setCanManageBilling(false)
          return
        }

        setCanManageBilling(isAdminRole(data.role))
      })
      .finally(() => {
        if (!cancelled) {
          setBillingRoleLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [activeOrganizationId, user])

  const currentPlanId = coerceWorkspacePlanId(entitlement?.planId ?? subscription?.planId)
  const currentSeatCount = subscription?.seatCount ?? entitlement?.seatCount ?? 1
  const activeMembers = entitlement?.activeMemberCount ?? 0
  const currentPeriodEndLabel = formatUnixDate(subscription?.currentPeriodEnd)
  const hasManagedSubscription = Boolean(subscription?.providerSubscriptionId)

  async function runSubscriptionChange(input: {
    targetPlanId: StripeManagedWorkspacePlanId
    seats: number
    actionKey: string
    source?: 'dialog' | 'resume'
  }) {
    setDialogErrorMessage(null)
    setPendingActionKey(input.actionKey)

    try {
      const result = await mutateSubscription({
        data: {
          targetPlanId: input.targetPlanId,
          seats: input.seats,
        },
      })
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
      !user
      || !activeOrganizationId
      || pendingActionKey != null
      || billingRoleLoading
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
    billingRoleLoading,
    canManageBilling,
    pendingActionKey,
    props.checkoutIntent?.checkoutPlan,
    props.checkoutIntent?.checkoutSeats,
    props.checkoutIntent?.resumeCheckout,
    user,
  ])

  const resolvePlanAction = useMemo(() => {
    const hasActiveWorkspace = Boolean(activeOrganizationId)
    const isSignedIn = Boolean(user)
    const stripePlanByName: Record<string, StripeManagedWorkspacePlanId> = {
      Plus: 'plus',
      Pro: 'pro',
      Scale: 'scale',
    }
    const hasStripeManagedSubscription =
      Boolean(subscription?.providerSubscriptionId) &&
      (subscription?.planId === 'plus' ||
        subscription?.planId === 'pro' ||
        subscription?.planId === 'scale')

    return (planName: string): PricingPlanActionOverride | undefined => {
      const stripePlanId = stripePlanByName[planName]
      const isStripeManagedPlan = Boolean(stripePlanId)
      const isEnterprisePlan = planName === 'Enterprise'
      const isFreePlan = planName === 'Free'
      const isCurrentPlan =
        (hasStripeManagedSubscription &&
          subscription?.planId === stripePlanId) ||
        (isEnterprisePlan && subscription?.planId === 'enterprise') ||
        (isFreePlan &&
          (!subscription?.planId || subscription.planId === 'free'))

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
        if (billingRoleLoading || !canManageBilling) {
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
        if (billingRoleLoading || !canManageBilling) {
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
    billingRoleLoading,
    currentPlanId,
    hasManagedSubscription,
    pendingActionKey,
    subscription,
    user,
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
