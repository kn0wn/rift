'use client'

import { useEffect, useMemo, useState } from 'react'
import { useServerFn } from '@tanstack/react-start'
import { PricingSection } from './pricing-section'
import { PricingComparisonTable } from './pricing-comparison-table'
import { BillingChangeDialog } from '@/components/organization/settings/billing/billing-change-dialog'
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

/**
 * Pricing page content. Renders the pricing cards followed by the comparative
 * matrix so users can scan plan differences without leaving the pricing view.
 */
export function PricingPage() {
  const { user, activeOrganizationId } = useAppAuth()
  const { subscription, entitlement } = useOrgBillingSummary()
  const mutateSubscription = useServerFn(changeWorkspaceSubscription)
  const [billingActionError, setBillingActionError] = useState<string | null>(
    null,
  )
  const [dialogPlanId, setDialogPlanId] = useState<StripeManagedWorkspacePlanId | null>(null)
  const [pendingActionKey, setPendingActionKey] = useState<string | null>(null)
  const [canManageBilling, setCanManageBilling] = useState(false)
  const [billingRoleLoading, setBillingRoleLoading] = useState(false)

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
  }) {
    setBillingActionError(null)
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
      setBillingActionError(
        error instanceof Error
          ? error.message
          : m.org_billing_error_change_subscription(),
      )
    } finally {
      setPendingActionKey(null)
    }
  }

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

      if (!isSignedIn || !hasActiveWorkspace) return undefined

      if (!isStripeManagedPlan && !isEnterprisePlan) return undefined

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

        return {
          disabled: pendingActionKey != null,
          onSelect: () => {
            setBillingActionError(null)
            setDialogPlanId(stripePlanId)
          },
        }
      }
    }
  }, [
    activeOrganizationId,
    canManageBilling,
    billingRoleLoading,
    pendingActionKey,
    subscription,
    user,
  ])

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4">
      {billingActionError ? (
        <div className="mb-4 rounded-lg border border-border-faint bg-surface-raised px-4 py-3 text-sm text-foreground-secondary">
          {billingActionError}
        </div>
      ) : null}
      <PricingSection resolvePlanAction={resolvePlanAction} />
      <PricingComparisonTable resolvePlanAction={resolvePlanAction} />
      <BillingChangeDialog
        open={dialogPlanId != null}
        onOpenChange={(open) => {
          if (!open && pendingActionKey == null) {
            setDialogPlanId(null)
            setBillingActionError(null)
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
        billingCycleEndLabel={currentPeriodEndLabel}
        submitError={billingActionError}
        submitting={pendingActionKey != null}
        onConfirm={runSubscriptionChange}
      />
    </div>
  )
}
