import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { PricingPageLayout } from '@/components/pricing/pricing-page-layout'
import { PricingPage } from '@/components/pricing/pricing-page'

/**
 * Pricing page route. Renders outside the dashboard layout at /pricing.
 */
export const Route = createFileRoute('/pricing')({
  validateSearch: z.object({
    checkoutPlan: z.enum(['plus', 'pro', 'scale']).optional(),
    checkoutSeats: z.coerce.number().int().min(1).max(500).optional(),
    resumeCheckout: z.literal('1').optional(),
  }),
  component: PricingRouteComponent,
})

function PricingRouteComponent() {
  const search = Route.useSearch()

  return (
    <PricingPageLayout>
      <PricingPage checkoutIntent={search} />
    </PricingPageLayout>
  )
}
