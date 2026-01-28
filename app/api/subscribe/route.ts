import { workos } from '@/app/api/workos';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  const productionDomain = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  const baseUrl = productionDomain ? `https://${productionDomain}` : "http://localhost:3000";

  const {
    userId,
    orgName,
    subscriptionLevel,
    organizationId: providedOrgId,
    cancelAllExistingSubscriptions,
    idempotencyKey,
  } = await req.json();

  try {
    let targetOrganizationId = providedOrgId;
    let isExistingOrg = false;

    // If no organization ID provided, try to find one or create one (WorkOS only, no Stripe)
    if (!targetOrganizationId) {
      const memberships = await workos.userManagement.listOrganizationMemberships({
        userId,
      });

      if (memberships.data.length > 0) {
        targetOrganizationId = memberships.data[0].organizationId;
        isExistingOrg = true;
      } else {
        if (!orgName) {
          return NextResponse.json({ error: 'Organization Name is required to create a new organization' }, { status: 400 });
        }
        if (orgName.length > 50) {
          return NextResponse.json({ error: 'Organization Name must be at most 50 characters' }, { status: 400 });
        }
        const organization = await workos.organizations.createOrganization({
          name: orgName,
        });

        await workos.userManagement.createOrganizationMembership({
          organizationId: organization.id,
          userId,
          roleSlug: 'admin',
        });

        targetOrganizationId = organization.id;
      }
    } else {
      isExistingOrg = true;
    }

    // --- STRIPE (removed): pseudocode for subscription/checkout flow. Replace with new provider when migrating. ---
    //
    // STRIPE: priceId = env[FREE_PRICE_ID | PLUS_PRICE_ID | PRO_PRICE_ID] by subscriptionLevel. Return 500 if missing.
    //
    // STRIPE: user = workos.userManagement.getUser(userId). workosOrg = workos.organizations.getOrganization(targetOrganizationId).
    // STRIPE: customerId = workosOrg.stripeCustomerId
    // STRIPE: if !customerId: customer = stripe.customers.create({ email: user.email, metadata: { workOSOrganizationId: targetOrganizationId } }, { idempotencyKey: `create_stripe_customer_${targetOrganizationId}` })
    // STRIPE:   customerId = customer.id; workos.organizations.updateOrganization({ organization: targetOrganizationId, stripeCustomerId: customerId })
    //
    // STRIPE: POST /sync-stripe-customer { workos_id: targetOrganizationId, stripeCustomerId: customerId } (Convex HTTP). Log and continue on failure.
    //
    // STRIPE: Handle FREE plan:
    // STRIPE:   if cancelAllExistingSubscriptions && customerId: getPermissions; if !checkPermission(MANAGE_BILLING) return 403.
    // STRIPE:     stripe.subscriptions.list({ customer: customerId, limit: 100 }); for each non-canceled: stripe.subscriptions.cancel(sub.id)
    // STRIPE:   stripe.subscriptions.list({ customer: customerId, price: priceId, status: 'active', limit: 1 }); if exists return { success, organizationId, subscriptionId, url: /chat }
    // STRIPE:   stripe.subscriptions.create({ customer: customerId, items: [{ price: priceId }], payment_behavior: 'default_incomplete', payment_settings: { save_default_payment_method: 'on_subscription' }, expand: ['latest_invoice.payment_intent'] }, { idempotencyKey })
    // STRIPE:   return { success, organizationId, subscriptionId, url: /chat }
    //
    // STRIPE: For paid plans (plus/pro): if isExistingOrg: getPermissions; if !checkPermission(MANAGE_BILLING) return 403.
    // STRIPE: if customerId && (plus|pro):
    // STRIPE:   stripe.subscriptions.list({ customer: customerId, status: 'all', limit: 100, expand: ['data.items.data.price'] })
    // STRIPE:   activeSubscription = find non-canceled and !cancel_at_period_end
    // STRIPE:   if same plan (currentPriceId===priceId or lookup_key===subscriptionLevel): return 400 alreadySubscribed
    // STRIPE:   if currentLookupKey in (plus|pro): stripe.subscriptions.update(subscriptionItemId, { items: [{ id, price: priceId }], proration_behavior: 'always_invoice', expand: ['latest_invoice'] })
    // STRIPE:     if invoice.status==='paid' return { success, organizationId, subscriptionId, url: /chat, message }
    // STRIPE:     if invoice.status==='open': return { url: hosted_invoice_url } or stripe.billingPortal.sessions.create and return { url: portalSession.url }
    // STRIPE:     else: stripe.billingPortal.sessions.create, return { url: portalSession.url, organizationId }
    // STRIPE:   if free→paid: fall through to checkout (webhook cancels free sub later)
    //
    // STRIPE: session = stripe.checkout.sessions.create({ customer: customerId, billing_address_collection: 'auto', line_items: [{ price: priceId, quantity: 1 }], mode: 'subscription', allow_promotion_codes: true, success_url: baseUrl/chat, cancel_url: baseUrl/ })
    // STRIPE: return { url: session.url, organizationId: targetOrganizationId }
    //
    // --- End STRIPE pseudocode ---

    return NextResponse.json(
      { error: "Billing temporarily unavailable (Stripe removed). See pseudocode in route." },
      { status: 501 }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An error occurred';
    console.error(errorMessage, error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
};
