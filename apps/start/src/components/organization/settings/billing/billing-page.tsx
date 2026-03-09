'use client'

import { useServerFn } from '@tanstack/react-start'
import { startTransition, useEffect, useState } from 'react'
import { ContentPage } from '@/components/layout'
import { reconcileActiveWorkspaceBilling } from '@/lib/billing/billing-reconcile.functions'
import {
  openWorkspaceBillingPortal,
  startWorkspaceSubscriptionCheckout,
} from '@/lib/billing/billing.functions'
import { isPaidWorkspacePlan, WORKSPACE_PLANS } from '@/lib/billing/plan-catalog'
import { useOrgBillingSummary, useOrgTopupProducts } from '@/lib/billing/use-org-billing'

function formatUsdMinor(amountMinor: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amountMinor / 100)
}

function formatUnixDate(timestampMs?: number): string | null {
  if (!timestampMs) {
    return null
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(timestampMs))
}

/**
 * Minimal billing surface for the first pass of workspace-owned subscriptions
 * and top-up grants. It intentionally focuses on visibility rather than
 * mutating controls so the org-scoped data model is exercised end-to-end
 * before checkout and admin workflows are layered on top.
 */
export function BillingPage() {
  const { subscription, entitlement, grants, loading } = useOrgBillingSummary()
  const { products, loading: productsLoading } = useOrgTopupProducts()
  const startCheckout = useServerFn(startWorkspaceSubscriptionCheckout)
  const openPortal = useServerFn(openWorkspaceBillingPortal)
  const reconcileBilling = useServerFn(reconcileActiveWorkspaceBilling)
  const [seatCount, setSeatCount] = useState<number>(subscription?.seatCount ?? 1)
  const [submittingPlanId, setSubmittingPlanId] = useState<string | null>(null)
  const [portalLoading, setPortalLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const renewalDate = formatUnixDate(subscription?.currentPeriodEnd)
  const scheduledChangeDate = formatUnixDate(subscription?.scheduledChangeEffectiveAt)

  useEffect(() => {
    if (subscription?.seatCount) {
      setSeatCount(subscription.seatCount)
    }
  }, [subscription?.seatCount])

  useEffect(() => {
    void reconcileBilling().catch(() => {
      // The UI can still render from the last synced snapshot if reconciliation fails.
    })
  }, [reconcileBilling])

  async function handleSubscribe(planId: 'plus' | 'pro') {
    setSubmittingPlanId(planId)
    setErrorMessage(null)

    try {
      const result = await startCheckout({
        data: {
          planId,
          seats: seatCount,
        },
      })

      window.location.assign(result.url)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Checkout failed')
      setSubmittingPlanId(null)
    }
  }

  async function handleOpenPortal() {
    setPortalLoading(true)
    setErrorMessage(null)

    try {
      const result = await openPortal({
        data: {},
      })
      window.location.assign(result.url)
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Billing portal could not be opened',
      )
      setPortalLoading(false)
    }
  }

  return (
    <ContentPage
      title="Billing"
      description="Subscriptions and top-up credits for the current workspace."
    >
      <section className="rounded-2xl border border-border-muted bg-bg-subtle p-6">
        <h2 className="text-base font-semibold text-content-emphasis">
          Current subscription
        </h2>
        <p className="mt-1 text-sm text-content-muted">
          {loading
            ? 'Loading subscription state...'
            : subscription
              ? `${subscription.planId} · ${subscription.status}${subscription.seatCount != null ? ` · ${subscription.seatCount} seats` : ''}`
              : 'Free plan · 1 seat included until this workspace upgrades.'}
        </p>
        {entitlement ? (
          <dl className="mt-4 grid gap-3 text-sm text-content-default sm:grid-cols-3">
            <div>
              <dt className="text-content-muted">Active members</dt>
              <dd className="font-medium">{entitlement.activeMemberCount}</dd>
            </div>
            <div>
              <dt className="text-content-muted">Pending invites</dt>
              <dd className="font-medium">{entitlement.pendingInvitationCount}</dd>
            </div>
            <div>
              <dt className="text-content-muted">Seat status</dt>
              <dd className="font-medium">
                {entitlement.isOverSeatLimit ? 'Over limit' : 'Within limit'}
              </dd>
            </div>
            <div>
              <dt className="text-content-muted">Billing cycle</dt>
              <dd className="font-medium">
                {subscription?.billingInterval ?? 'month'}
              </dd>
            </div>
            <div>
              <dt className="text-content-muted">Renews on</dt>
              <dd className="font-medium">{renewalDate ?? 'Not scheduled'}</dd>
            </div>
            <div>
              <dt className="text-content-muted">Effective plan</dt>
              <dd className="font-medium">{entitlement.planId}</dd>
            </div>
          </dl>
        ) : null}
        {subscription?.scheduledPlanId ? (
          <div className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-800 dark:text-amber-300">
            Scheduled change: {subscription.scheduledPlanId}
            {subscription.scheduledSeatCount != null
              ? ` · ${subscription.scheduledSeatCount} seats`
              : ''}
            {scheduledChangeDate ? ` · effective ${scheduledChangeDate}` : ''}
          </div>
        ) : null}
        {subscription ? (
          <div className="mt-4">
            <button
              type="button"
              className="inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60"
              disabled={portalLoading}
              onClick={() => {
                startTransition(() => {
                  void handleOpenPortal()
                })
              }}
            >
              {portalLoading ? 'Opening portal...' : 'Manage subscription'}
            </button>
          </div>
        ) : null}
      </section>

      <section className="mt-6 rounded-2xl border border-border-muted bg-bg-subtle p-6">
        <h2 className="text-base font-semibold text-content-emphasis">
          Upgrade workspace
        </h2>
        <p className="mt-1 text-sm text-content-muted">
          Checkout is always scoped to the current workspace and seat count.
        </p>
        <label className="mt-4 block text-sm text-content-default">
          Seats
          <input
            type="number"
            min={1}
            max={500}
            value={seatCount}
            onChange={(event) =>
              setSeatCount(Math.max(1, Number.parseInt(event.target.value || '1', 10) || 1))
            }
            className="mt-2 w-full rounded-xl border border-border-default bg-bg-default px-3 py-2 text-sm outline-none sm:w-40"
          />
        </label>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {WORKSPACE_PLANS.filter(isPaidWorkspacePlan).map((plan) => (
            <div
              key={plan.id}
              className="rounded-xl border border-border-default bg-bg-default p-4"
            >
              <div className="font-medium text-content-emphasis">{plan.name}</div>
              <div className="mt-1 text-sm text-content-muted">
                ${plan.monthlyPriceUsd}/seat monthly
              </div>
              <div className="mt-2 text-sm text-content-muted">
                {plan.description}
              </div>
              {subscription?.planId === plan.id ? (
                <div className="mt-3 text-sm font-medium text-primary">
                  Current subscription
                </div>
              ) : null}
              <button
                type="button"
                className="mt-4 inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60"
                disabled={submittingPlanId != null || subscription?.planId === plan.id}
                onClick={() => {
                  startTransition(() => {
                    void handleSubscribe(plan.id)
                  })
                }}
              >
                {subscription?.planId === plan.id
                  ? 'Current plan'
                  : submittingPlanId === plan.id
                    ? 'Redirecting...'
                    : `Choose ${plan.name}`}
              </button>
            </div>
          ))}
        </div>
        {errorMessage ? (
          <p className="mt-4 text-sm text-danger">{errorMessage}</p>
        ) : null}
      </section>

      <section className="mt-6 rounded-2xl border border-border-muted bg-bg-subtle p-6">
        <h2 className="text-base font-semibold text-content-emphasis">
          Your active top-up grants
        </h2>
        {loading ? (
          <p className="mt-2 text-sm text-content-muted">Loading credit grants...</p>
        ) : grants.length === 0 ? (
          <p className="mt-2 text-sm text-content-muted">
            No org-scoped top-up grants are available for your user in this workspace.
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {grants.map((grant) => (
              <li
                key={grant.id}
                className="rounded-xl border border-border-default bg-bg-default px-4 py-3 text-sm"
              >
                <div className="font-medium text-content-emphasis">
                  {grant.product?.displayName ?? 'Workspace credit grant'}
                </div>
                <div className="mt-1 text-content-muted">
                  Remaining:{' '}
                  {formatUsdMinor(grant.remainingAmountMinor, grant.currency)} of{' '}
                  {formatUsdMinor(grant.grantedAmountMinor, grant.currency)}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-6 rounded-2xl border border-border-muted bg-bg-subtle p-6">
        <h2 className="text-base font-semibold text-content-emphasis">
          Available top-up products
        </h2>
        {productsLoading ? (
          <p className="mt-2 text-sm text-content-muted">Loading catalog...</p>
        ) : (
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {products.map((product) => (
              <li
                key={product.id}
                className="rounded-xl border border-border-default bg-bg-default px-4 py-3"
              >
                <div className="font-medium text-content-emphasis">
                  {product.displayName}
                </div>
                <div className="mt-1 text-sm text-content-muted">
                  {formatUsdMinor(product.priceMinor, product.currency)} for{' '}
                  {formatUsdMinor(product.creditAmountMinor, product.currency)} in workspace
                  credits.
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </ContentPage>
  )
}
