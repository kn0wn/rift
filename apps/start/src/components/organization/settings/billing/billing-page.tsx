'use client'

import { useServerFn } from '@tanstack/react-start'
import { useEffect, useState } from 'react'
import { Button } from '@rift/ui/button'
import { Form } from '@rift/ui/form'
import { ContentPage } from '@/components/layout'
import { PricingCard } from '@/components/pricing/pricing-card'
import type { PricingPlanActionOverride } from '@/components/pricing/pricing-card'
import { DashedBorderFrame } from '@/components/pricing/pricing-decorative'
import { enterprisePlan, mainPlans } from '@/lib/shared/pricing'
import { authClient } from '@/lib/frontend/auth/auth-client'
import { useAppAuth } from '@/lib/frontend/auth/use-auth'
import { reconcileActiveWorkspaceBilling } from '@/lib/frontend/billing/billing-reconcile.functions'
import {
  changeWorkspaceSubscription,
  openWorkspaceBillingPortal,
} from '@/lib/frontend/billing/billing.functions'
import { useOrgBillingSummary } from '@/lib/frontend/billing/use-org-billing'
import { coerceWorkspacePlanId, getWorkspacePlan } from '@/lib/shared/access-control'
import type {
  StripeManagedWorkspacePlanId,
  WorkspacePlanId,
} from '@/lib/shared/access-control'
import { isAdminRole } from '@/lib/shared/auth/roles'
import { m } from '@/paraglide/messages.js'
import { BillingChangeDialog } from './billing-change-dialog'
import { BillingCancelDialog } from './billing-cancel-dialog'
import {
  isScheduledCancelToFree,
  resolveBillingPlanCardActionState,
} from './billing-page.logic'

function formatUnixDate(timestampMs?: number): string | null {
  if (timestampMs == null || !Number.isFinite(timestampMs)) return null
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(timestampMs))
}

function formatBillingCycleDateRange(
  periodStartMs?: number,
  periodEndMs?: number,
): string {
  const start = formatUnixDate(periodStartMs)
  const end = formatUnixDate(periodEndMs)
  if (start && end) return `${start} – ${end}`
  if (end) return `Through ${end}`
  if (start) return `From ${start}`
  return ''
}

function SeatUsageProgressBar(props: {
  activeMembers: number
  seatCount: number
}) {
  const coveredMembers = Math.min(props.activeMembers, props.seatCount)
  const overSeatMembers = Math.max(0, props.activeMembers - props.seatCount)
  const isOverSeatLimit = overSeatMembers > 0
  const coveredPercent = isOverSeatLimit
    ? props.activeMembers > 0
      ? (coveredMembers / props.activeMembers) * 100
      : 0
    : props.seatCount > 0
      ? (coveredMembers / props.seatCount) * 100
      : 0
  const overSeatPercent = isOverSeatLimit && props.activeMembers > 0
    ? (overSeatMembers / props.activeMembers) * 100
    : 0

  return (
    <div
      className="bg-surface-overlay relative flex h-1.5 w-full items-center overflow-x-hidden rounded-full"
      role="progressbar"
      aria-label={m.org_billing_seat_allocation_label()}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={isOverSeatLimit ? 100 : coveredPercent}
      aria-valuetext={m.org_billing_seat_allocation_value({
        activeMembers: String(props.activeMembers),
        seatCount: String(props.seatCount),
      })}
    >
      {coveredPercent > 0 ? (
        <div
          className="bg-accent-primary h-full rounded-full"
          style={{ width: `${coveredPercent}%` }}
        />
      ) : null}
      {overSeatPercent > 0 ? (
        <div
          className="bg-rose-500 h-full"
          style={{ width: `${overSeatPercent}%` }}
        />
      ) : null}
    </div>
  )
}

function formatScheduledChangeLabel(input: {
  scheduledPlanId?: WorkspacePlanId | null
  scheduledSeatCount?: number | null
  effectiveAtLabel?: string | null
}): string | null {
  if (!input.scheduledPlanId) {
    return null
  }

  if (input.scheduledPlanId === 'free') {
    if (input.effectiveAtLabel) {
      return m.org_billing_scheduled_cancel_banner({
        effectiveDate: input.effectiveAtLabel,
      })
    }

    return m.org_billing_scheduled_cancel_button()
  }

  const planName = getWorkspacePlan(input.scheduledPlanId).name
  const seatCount = input.scheduledSeatCount ?? 1

  if (input.effectiveAtLabel) {
    return m.org_billing_scheduled_change_banner({
      planName,
      seatCount: String(seatCount),
      effectiveDate: input.effectiveAtLabel,
    })
  }

  return m.org_billing_scheduled_change_button({
    planName,
    seatCount: String(seatCount),
  })
}

export function BillingPage() {
  const { user, activeOrganizationId } = useAppAuth()
  const { subscription, entitlement, loading } = useOrgBillingSummary()
  const openPortal = useServerFn(openWorkspaceBillingPortal)
  const reconcileBilling = useServerFn(reconcileActiveWorkspaceBilling)
  const mutateSubscription = useServerFn(changeWorkspaceSubscription)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [dialogErrorMessage, setDialogErrorMessage] = useState<string | null>(null)
  const [pendingActionKey, setPendingActionKey] = useState<string | null>(null)
  const [dialogPlanId, setDialogPlanId] = useState<StripeManagedWorkspacePlanId | null>(null)
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false)
  const [canManageBilling, setCanManageBilling] = useState(false)
  const [billingRoleLoading, setBillingRoleLoading] = useState(false)

  useEffect(() => {
    void reconcileBilling().catch(() => {
      // The page can render from the latest synced subscription snapshot.
    })
  }, [reconcileBilling])

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

  const planId = coerceWorkspacePlanId(entitlement?.planId ?? subscription?.planId)
  const plan = getWorkspacePlan(planId)
  const billingCycle = formatBillingCycleDateRange(
    subscription?.currentPeriodStart,
    subscription?.currentPeriodEnd,
  )
  const currentPeriodEndLabel = formatUnixDate(subscription?.currentPeriodEnd)
  const activeMembers = entitlement?.activeMemberCount ?? 0
  const currentSeatCount = subscription?.seatCount ?? entitlement?.seatCount ?? 1
  const seatUsagePercent = currentSeatCount > 0
    ? Math.min(100, (activeMembers / currentSeatCount) * 100)
    : 0
  const scheduledChangeDate = formatUnixDate(subscription?.scheduledChangeEffectiveAt)
  const scheduledChangeLabel = formatScheduledChangeLabel({
    scheduledPlanId: subscription?.scheduledPlanId
      ? coerceWorkspacePlanId(subscription.scheduledPlanId)
      : null,
    scheduledSeatCount: subscription?.scheduledSeatCount ?? null,
    effectiveAtLabel: scheduledChangeDate,
  })
  const actionsDisabled = loading || billingRoleLoading || !canManageBilling || pendingActionKey != null
  const hasManagedSubscription = Boolean(subscription?.providerSubscriptionId)
  const scheduledCancel = isScheduledCancelToFree({
    scheduledPlanId: subscription?.scheduledPlanId ?? null,
    cancelAtPeriodEnd: subscription?.cancelAtPeriodEnd,
  })

  async function runSubscriptionChange(input: {
    targetPlanId: 'free' | StripeManagedWorkspacePlanId
    seats?: number
    actionKey: string
    source?: 'dialog' | 'page'
  }) {
    if (input.source === 'dialog') {
      setDialogErrorMessage(null)
    } else {
      setErrorMessage(null)
    }
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
        setErrorMessage(message)
      }
    } finally {
      setPendingActionKey(null)
    }
  }

  async function handleOpenPortal() {
    setErrorMessage(null)
    setPendingActionKey('portal')
    try {
      const result = await openPortal({ data: {} })
      window.location.assign(result.url)
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : m.pricing_error_billing_portal(),
      )
    } finally {
      setPendingActionKey(null)
    }
  }

  function openBillingDialog(targetPlanId: StripeManagedWorkspacePlanId) {
    setDialogErrorMessage(null)
    setDialogPlanId(targetPlanId)
  }

  function openCancelDialog() {
    setDialogErrorMessage(null)
    setCancelDialogOpen(true)
  }

  function resolvePlanAction(planName: string): PricingPlanActionOverride | undefined {
    const stripePlanByName: Record<string, StripeManagedWorkspacePlanId> = {
      Plus: 'plus',
      Pro: 'pro',
      Scale: 'scale',
    }
    const targetPlanId = stripePlanByName[planName]
    if (!targetPlanId) {
      return undefined
    }

    const actionState = resolveBillingPlanCardActionState({
      targetPlanId,
      currentPlanId: planId,
      scheduledPlanId: subscription?.scheduledPlanId ?? null,
      hasManagedSubscription,
    })

    const actionLabel = actionState === 'manage'
      ? m.org_billing_manage_seats_button()
      : actionState === 'scheduled'
        ? m.org_billing_scheduled_button()
        : actionState === 'subscribe'
          ? m.org_billing_dialog_confirm_subscribe()
        : actionState === 'downgrade'
          ? m.org_billing_open_downgrade_dialog_help()
          : m.org_billing_open_upgrade_dialog_help()
    const actionDescription = actionState === 'manage'
      ? m.org_billing_manage_seats_help()
      : actionState === 'scheduled'
        ? formatScheduledChangeLabel({
            scheduledPlanId: subscription?.scheduledPlanId
              ? coerceWorkspacePlanId(subscription.scheduledPlanId)
              : null,
            scheduledSeatCount: subscription?.scheduledSeatCount ?? null,
          }) ?? undefined
        : actionLabel

    return {
      buttonText:
        actionState === 'downgrade'
          ? m.org_billing_schedule_downgrade_button()
          : actionState === 'upgrade'
            ? m.org_billing_upgrade_now_button()
            : actionLabel,
      description: actionDescription,
      disabled:
        actionState === 'scheduled'
        || actionsDisabled,
      onSelect:
        actionState === 'scheduled'
          ? undefined
          : () => openBillingDialog(targetPlanId),
    }
  }

  const paidPlans = mainPlans.filter((pricingPlan) => pricingPlan.name !== 'Free')

  return (
    <ContentPage
      title={m.org_billing_page_title()}
      description={m.org_billing_page_description()}
    >
      {errorMessage ? (
        <div className="mb-4 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-700 dark:text-rose-300">
          {errorMessage}
        </div>
      ) : null}

      <Form
        title={m.org_billing_summary_title({ planName: plan.name })}
        description={billingCycle || m.org_billing_summary_description_fallback()}
        progressBar={
          !loading
            ? {
                value: seatUsagePercent,
                label: m.org_billing_seat_allocation_label(),
                valueLabel: m.org_billing_seat_allocation_value({
                  activeMembers: String(activeMembers),
                  seatCount: String(currentSeatCount),
                }),
                barSlot: (
                  <SeatUsageProgressBar
                    activeMembers={activeMembers}
                    seatCount={currentSeatCount}
                  />
                ),
              }
            : undefined
        }
        contentSlot={
          !loading ? (
            <div className="space-y-4">
              {scheduledChangeLabel ? (
                <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-800 dark:text-amber-300">
                  {scheduledChangeLabel}
                </div>
              ) : null}

              {!billingRoleLoading && !canManageBilling ? (
                <div className="rounded-xl border border-border-faint bg-surface-overlay px-4 py-3 text-sm text-foreground-secondary">
                  {m.org_billing_admin_only_notice()}
                </div>
              ) : null}
            </div>
          ) : undefined
        }
        forceActions
        buttonText={m.org_billing_manage_details_button()}
        buttonDisabled={loading || pendingActionKey != null || billingRoleLoading || !canManageBilling}
        helpText={m.org_billing_manage_details_help()}
        handleSubmit={handleOpenPortal}
      />

      <section className="mt-10 space-y-4" aria-labelledby="billing-plans-heading">
        <div className="space-y-1">
          <h2
            id="billing-plans-heading"
            className="text-xl font-semibold text-foreground-strong"
          >
            {m.org_billing_plans_title()}
          </h2>
          <p className="text-sm text-foreground-secondary">
            {m.org_billing_plans_description()}
          </p>
        </div>

        <div className="relative">
          <DashedBorderFrame>
            <div className="relative flex w-full items-stretch justify-center gap-6 overflow-hidden p-4 max-lg:flex-col lg:p-8">
              {paidPlans.map((pricingPlan) => (
                <PricingCard
                  key={pricingPlan.name}
                  plan={pricingPlan}
                  actionOverride={resolvePlanAction(pricingPlan.name)}
                />
              ))}
            </div>
          </DashedBorderFrame>
        </div>

        <div className="relative w-fit">
          <DashedBorderFrame>
            <div className="relative p-4 lg:p-8">
              <PricingCard
                plan={enterprisePlan}
                fixedWidth
              />
            </div>
          </DashedBorderFrame>
        </div>
      </section>

      {planId !== 'free' ? (
        <section className="mt-8 rounded-2xl border border-border-faint bg-surface-base px-6 py-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-foreground-strong">
                {m.org_billing_cancel_to_free_title()}
              </h2>
              <p className="text-sm text-foreground-secondary">
                {scheduledCancel
                  ? m.org_billing_cancel_to_free_scheduled_help({
                      effectiveDate: scheduledChangeDate ?? m.org_billing_summary_description_fallback(),
                    })
                  : m.org_billing_cancel_to_free_help()}
              </p>
            </div>
            <Button
              type="button"
              variant="dangerLight"
              size="large"
              disabled={scheduledCancel || actionsDisabled}
              onClick={openCancelDialog}
            >
              {scheduledCancel
                ? m.org_billing_scheduled_cancel_button()
                : m.org_billing_cancel_to_free_button()}
            </Button>
          </div>
        </section>
      ) : null}

      <BillingChangeDialog
        open={dialogPlanId != null}
        onOpenChange={(open) => {
          if (!open && pendingActionKey == null) {
            setDialogPlanId(null)
            setDialogErrorMessage(null)
          }
        }}
        targetPlanId={dialogPlanId}
        currentPlanId={planId}
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
        submitError={dialogErrorMessage}
        submitting={pendingActionKey != null}
        onConfirm={async ({ targetPlanId, seats, actionKey }) => {
          await runSubscriptionChange({
            targetPlanId,
            seats,
            actionKey,
            source: 'dialog',
          })
        }}
      />

      <BillingCancelDialog
        open={cancelDialogOpen}
        onOpenChange={(open) => {
          if (!open && pendingActionKey == null) {
            setCancelDialogOpen(false)
            setDialogErrorMessage(null)
          }
        }}
        effectiveDateLabel={currentPeriodEndLabel}
        submitError={dialogErrorMessage}
        submitting={pendingActionKey != null}
        onConfirm={async () => {
          await runSubscriptionChange({
            targetPlanId: 'free',
            actionKey: 'cancel-to-free',
            source: 'dialog',
          })
        }}
      />
    </ContentPage>
  )
}
