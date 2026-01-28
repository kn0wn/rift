"use server";

// STRIPE: stripe.billingPortal.sessions.create({ customer: stripeCustomerId, return_url: origin/settings/billing })
// STRIPE: return { url: session.url }

export async function createStripePortalSession(stripeCustomerId: string) {
  throw new Error("Billing portal unavailable (Stripe removed). See pseudocode above.");
}
