import { NextRequest, NextResponse } from "next/server";
import { stripe } from '@/app/api/stripe';
import { workos } from '@/app/api/workos';

const CONVEX_SITE_URL = process.env.CONVEX_SITE_URL || process.env.NEXT_PUBLIC_CONVEX_URL!.replace('.convex.cloud', '.convex.site');
const CONVEX_ADMIN_TOKEN = process.env.CONVEX_ADMIN_TOKEN!;

// Map internal features to Stripe feature lookup keys
const FEATURE_LOOKUP_KEYS = {
  domainVerification: "domain-verification",
  directorySync: "directory-sync",
  sso: "sso",
  auditLogs: "audit-logs",
} as const;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { organizationId, plan, workos_id, customStandardQuotaLimit, customPremiumQuotaLimit, seatQuantity, features } = body;

    if (!organizationId || !plan) {
      return NextResponse.json(
        { error: "Missing organizationId or plan" },
        { status: 400 }
      );
    }

    if (plan !== "plus" && plan !== "pro" && plan !== "enterprise") {
      return NextResponse.json(
        { error: "Invalid plan. Must be 'plus', 'pro' or 'enterprise'" },
        { status: 400 }
      );
    }

    // Handle Enterprise Stripe Subscription
    if (plan === 'enterprise') {
        if (!workos_id) {
             return NextResponse.json({ error: "Missing workos_id for enterprise plan" }, { status: 400 });
        }
        
        // 1. Get WorkOS Org to check for Stripe Customer
        const workosOrg = await workos.organizations.getOrganization(workos_id);
        let customerId = workosOrg.stripeCustomerId;

        // 2. Create Stripe Customer if needed
        if (!customerId) {
            const customer = await stripe.customers.create(
                {
                    name: workosOrg.name,
                    metadata: {
                        workOSOrganizationId: workos_id,
                    },
                },
                {
                    idempotencyKey: `create_stripe_customer_${workos_id}`,
                },
            );
            customerId = customer.id;
            
            await workos.organizations.updateOrganization({
                organization: workos_id,
                stripeCustomerId: customerId,
            });
        }
        
        // 3. Handle Subscription (Create or Update)
        const priceId = process.env.ENTERPRISE_PRICE_ID;
        if (!priceId) {
             return NextResponse.json({ error: "ENTERPRISE_PRICE_ID not configured" }, { status: 500 });
        }

        // Check for existing active subscriptions
        const existingSubscriptions = await stripe.subscriptions.list({
            customer: customerId,
            status: 'active',
            limit: 1,
        });

        const existingSubscription = existingSubscriptions.data[0];
        let subscriptionId = existingSubscription?.id;

        if (existingSubscription) {
            // Check if it's the same price
            const isSamePrice = existingSubscription.items.data.some(item => item.price.id === priceId);

            if (isSamePrice) {
                // Update quantity if needed
                if (existingSubscription.items.data[0].quantity !== (seatQuantity || 1)) {
                    await stripe.subscriptions.update(existingSubscription.id, {
                        items: [{
                            id: existingSubscription.items.data[0].id,
                            quantity: seatQuantity || 1,
                        }],
                    });
                }
            } else {
                // Cancel old subscription and create new one (Upgrade/Switch)
                const itemId = existingSubscription.items.data[0].id;
                await stripe.subscriptions.update(existingSubscription.id, {
                    items: [{
                        id: itemId,
                        price: priceId,
                        quantity: seatQuantity || 1,
                    }],
                    payment_behavior: 'default_incomplete',
                    expand: ['latest_invoice.payment_intent'],
                });
            }
        } else {
            // No active subscription, create new one
            const subscriptionParams: any = {
                customer: customerId,
                items: [{ price: priceId, quantity: seatQuantity || 1 }],
                payment_behavior: 'default_incomplete',
                payment_settings: { save_default_payment_method: 'on_subscription' },
                expand: ['latest_invoice.payment_intent'],
            };

            const subscription = await stripe.subscriptions.create(subscriptionParams);
            subscriptionId = subscription.id;
        }

        // 4. Handle Entitlements (Features)
        if (subscriptionId && features) {
            // Fetch all product features first to map lookup keys to feature IDs
            // In a real app, you might cache this or fetch by specific ID if known
            // Here we assume we need to find them by lookup key.
            // Since Stripe Entitlements API is feature-centric, we need to ensure features exist or find them.
            // However, the 'features' input is boolean flags.
            // We need to add these features to the *Product* if they aren't already, OR
            // if we are using the new Entitlements API, we might just need to make sure the subscription has access.
            // BUT Stripe Entitlements are attached to Products. If the Enterprise Product has these features, 
            // all subscribers get them. If we want per-subscriber features, we might need separate products or 
            // use the Entitlements API to grant specific access if supported (Stripe Entitlements usually map Feature -> Product).
            
            // If the requirement is "attached entitlements manually to each enterprise plan", and since 
            // "Enterprise" is likely a single Product in Stripe, attaching a feature to the Product gives it to EVERYONE.
            
            // To achieve per-customer entitlements on the same base product, you usually need to:
            // a) Use different Products for different feature sets (e.g. Enterprise Tier 1, Tier 2)
            // b) Or, if these are add-ons, they should be separate Price items in the subscription.
            
            // However, the prompt implies we want to use the Entitlements API.
            // "Attach features to corresponding Stripe Products" -> This implies Product level.
            
            // If we want to toggle features PER ORGANIZATION, we should probably use separate Prices (add-ons) 
            // for each feature if they are billable, or if they are just flags, we might need to use metadata 
            // if Stripe Entitlements doesn't support per-subscription granularity on the same product yet (it's Product-Feature mapping).
            
            // WAIT: "Determine when you can grant or revoke product feature access to customers."
            // "Stripe notifies you about when to provision... according to your customer’s subscription status"
            
            // If we attach a feature to a Product, ALL active subscribers to that Product get the feature.
            // If we want mix-and-match, we technically need a Product/Price for "Enterprise Base" 
            // and separate Products/Prices for "SSO Add-on", "Audit Logs Add-on", etc.
            
            // Let's assume for this implementation that we will handle this by creating/adding line items 
            // for these features if they are modeled as separate prices/products, OR 
            // if the user just wants to store it in Stripe Metadata for now as a fallback if true Entitlements 
            // requires a complex Product catalog change.
            
            // BUT, the prompt says: "instead of having a fixed plan with all the entitlements already set, we need to attached this entitlements manually to each enterprice plan"
            // This strongly suggests handling them as Add-ons (separate line items) in the subscription.
            
            // Let's try to find Prices for these features by lookup key. 
            // Assumes you have created Prices for these features with lookup_keys matching:
            // 'domain_verification', 'directory_sync', 'sso', 'audit_logs'
            
            const activeItems = existingSubscription?.items.data || [];
            
            for (const [key, enabled] of Object.entries(features)) {
                if (enabled) {
                    const lookupKey = FEATURE_LOOKUP_KEYS[key as keyof typeof FEATURE_LOOKUP_KEYS];
                    if (!lookupKey) continue;

                    // Check if already has this item
                    const hasItem = activeItems.some(item => item.price.lookup_key === lookupKey);
                    
                    if (!hasItem) {
                        // Find price for this feature
                        const prices = await stripe.prices.list({
                            lookup_keys: [lookupKey],
                            limit: 1,
                        });
                        
                        if (prices.data.length > 0) {
                            await stripe.subscriptionItems.create({
                                subscription: subscriptionId,
                                price: prices.data[0].id,
                                quantity: 1,
                            });
                        } else {
                            console.warn(`No price found for feature lookup key: ${lookupKey}`);
                        }
                    }
                } else {
                    // If disabled, remove the item if it exists
                    const lookupKey = FEATURE_LOOKUP_KEYS[key as keyof typeof FEATURE_LOOKUP_KEYS];
                    const itemToRemove = activeItems.find(item => item.price.lookup_key === lookupKey);
                    if (itemToRemove) {
                        await stripe.subscriptionItems.del(itemToRemove.id);
                    }
                }
            }
        }
        
        // Sync to Convex
        try {
            const secret = process.env.CONVEX_SYNC_SECRET;
            if (CONVEX_SITE_URL && secret) {
                await fetch(`${CONVEX_SITE_URL}/sync-stripe-customer`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${secret}`,
                    },
                    body: JSON.stringify({
                        workos_id: workos_id,
                        stripeCustomerId: customerId,
                    }),
                });
            }
        } catch (e) {
            console.error("Failed to sync stripe customer", e);
        }
    }

    const response = await fetch(`${CONVEX_SITE_URL}/admin/organizations/set-plan`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${CONVEX_ADMIN_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ organizationId, plan, customStandardQuotaLimit, customPremiumQuotaLimit, seatQuantity }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.error || "Failed to set organization plan" },
        { status: response.status }
      );
    }

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Admin set plan API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
