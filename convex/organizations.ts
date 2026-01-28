import {
  query,
  internalQuery,
  internalMutation,
  internalAction,
} from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";
import { Id } from "./_generated/dataModel";
import { getAuthUserIdentity } from "./helpers/getUser";
import { extractOrganizationIdFromJWT } from "./helpers/quota";
import { PermissionQuery, AuthOrgQuery } from "./helpers/authenticated";
import { serverSecretArg, ensureServerSecret } from "./helpers/auth";

// Plan quota configuration // Could remove and use stripe metadata to fetch plan details
const PLAN_QUOTAS = {
  free: {
    standardQuotaLimit: 20,
    premiumQuotaLimit: 1,
  },
  plus: {
    standardQuotaLimit: 1000,
    premiumQuotaLimit: 100,
  },
  pro: {
    standardQuotaLimit: 2700,
    premiumQuotaLimit: 270,
  },
} as const;

type PlanType = keyof typeof PLAN_QUOTAS;

// Get plan from lookup key
function getPlanFromLookupKey(lookupKey: string | null): PlanType | null {
  if (!lookupKey) return null;

  if (lookupKey === "free") return "free";
  if (lookupKey === "plus") return "plus";
  if (lookupKey === "pro") return "pro";

  return null;
}

export const createOrganization = internalMutation({
  args: { 
    workos_id: v.string(), 
    name: v.string(),
    stripeCustomerId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("organizations")
      .withIndex("by_workos_id", (q) => q.eq("workos_id", args.workos_id))
      .first();

    if (existing) {
      const patch: { name: string; stripeCustomerId?: string } = { name: args.name };
      if (args.stripeCustomerId !== undefined) {
        patch.stripeCustomerId = args.stripeCustomerId;
      }
      await ctx.db.patch(existing._id, patch);
      return existing._id;
    }

    return await ctx.db.insert("organizations", {
      workos_id: args.workos_id,
      name: args.name,
      ...(args.stripeCustomerId !== undefined && { stripeCustomerId: args.stripeCustomerId }),
    });
  },
});

export const updateOrganization = internalMutation({
  args: {
    id: v.id("organizations"),
    patch: v.object({
      workos_id: v.optional(v.string()),
      name: v.optional(v.string()),
      stripeCustomerId: v.optional(v.string()),
      billingCycleStart: v.optional(v.number()),
      billingCycleEnd: v.optional(v.number()),
      plan: v.optional(v.union(v.literal("free"), v.literal("plus"), v.literal("pro"), v.literal("enterprise"))),
      standardQuotaLimit: v.optional(v.number()),
      premiumQuotaLimit: v.optional(v.number()),
      seatQuantity: v.optional(v.number()),
    }),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.id, args.patch);
  },
});

export const deleteOrganization = internalMutation({
  args: { id: v.id("organizations") },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});

export const getOrganizationSeats = query({
  args: { workos_id: v.string(), ...serverSecretArg },
  handler: async (ctx, args) => {
    ensureServerSecret(args.secret);
    const organization = await ctx.db
      .query("organizations")
      .withIndex("by_workos_id", (q) => q.eq("workos_id", args.workos_id))
      .first();
    return organization?.seatQuantity ?? null;
  },
});

export const getOrganizationPlan = query({
  args: { workos_id: v.string(), ...serverSecretArg },
  handler: async (ctx, args) => {
    ensureServerSecret(args.secret);
    const organization = await ctx.db
      .query("organizations")
      .withIndex("by_workos_id", (q) => q.eq("workos_id", args.workos_id))
      .first();
    return organization?.plan ?? null;
  },
});

export const getOrganizationSeatsAndPlan = query({
  args: { workos_id: v.string(), ...serverSecretArg },
  handler: async (ctx, args) => {
    ensureServerSecret(args.secret);
    const organization = await ctx.db
      .query("organizations")
      .withIndex("by_workos_id", (q) => q.eq("workos_id", args.workos_id))
      .first();
    return {
      seatQuantity: organization?.seatQuantity ?? null,
      plan: organization?.plan ?? null,
    };
  },
});

export const getByWorkOSId = internalQuery({
  args: { workos_id: v.string() },
  handler: async (ctx, args) => {
    const organization = await ctx.db
      .query("organizations")
      .withIndex("by_workos_id", (q) => q.eq("workos_id", args.workos_id))
      .first();
    return organization;
  },
});

export const getByWorkOSIdPublic = internalQuery({
  args: { workos_id: v.string() },
  handler: async (ctx, args) => {
    const organization = await ctx.db
      .query("organizations")
      .withIndex("by_workos_id", (q) => q.eq("workos_id", args.workos_id))
      .first();
    return organization;
  },
});

export const getOrganizationInfo = internalQuery({
  args: { workos_id: v.string() },
  handler: async (ctx, args) => {
    const organization = await ctx.db
      .query("organizations")
      .withIndex("by_workos_id", (q) => q.eq("workos_id", args.workos_id))
      .first();

    if (!organization) {
      return null;
    }

    return {
      id: organization._id,
      workos_id: organization.workos_id,
      name: organization.name,
      plan: organization.plan,
      standardQuotaLimit: organization.standardQuotaLimit,
      premiumQuotaLimit: organization.premiumQuotaLimit,
      seatQuantity: organization.seatQuantity,
      billingCycleStart: organization.billingCycleStart,
      billingCycleEnd: organization.billingCycleEnd,
      hasBillingCycle: !!(
        organization.billingCycleStart && organization.billingCycleEnd
      ),
    };
  },
});

// Previously set Stripe customer ID. Reuse for new provider's customer ID when migrating.
export const setStripeCustomerIdByWorkOSId = internalMutation({
  args: { workos_id: v.string(), stripeCustomerId: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("organizations")
      .withIndex("by_workos_id", (q) => q.eq("workos_id", args.workos_id))
      .first();

    if (existing?._id) {
      await ctx.db.patch(existing._id, {
        stripeCustomerId: args.stripeCustomerId,
      });
      return existing._id;
    }

    return await ctx.db.insert("organizations", {
      workos_id: args.workos_id,
      name: "",
      stripeCustomerId: args.stripeCustomerId,
    });
  },
});

// Lookup org by payment-provider customer ID (was Stripe). Reuse index for new provider.
export const getOrganizationByStripeCustomerId = internalQuery({
  args: { stripeCustomerId: v.string() },
  handler: async (ctx, args) => {
    const organization = await ctx.db
      .query("organizations")
      .withIndex("by_stripe_customer_id", (q) =>
        q.eq("stripeCustomerId", args.stripeCustomerId),
      )
      .first();
    return organization;
  },
});

// Writes subscription fields (plan, status, billing cycle, payment method, etc.) from payment-provider. Was driven by Stripe data.
export const syncStripeSubscriptionData = internalMutation({
  args: {
    stripeCustomerId: v.string(),
    subscriptionData: v.object({
      subscriptionId: v.optional(v.string()),
      status: v.string(),
      priceId: v.optional(v.union(v.string(), v.null())),
      lookupKey: v.optional(v.union(v.string(), v.null())),
      billingCycleStart: v.optional(v.union(v.number(), v.null())),
      billingCycleEnd: v.optional(v.union(v.number(), v.null())),
      cancelAtPeriodEnd: v.optional(v.boolean()),
      paymentMethodBrand: v.optional(v.union(v.string(), v.null())),
      paymentMethodLast4: v.optional(v.union(v.string(), v.null())),
      seatQuantity: v.optional(v.union(v.number(), v.null())),
    }),
  },
  handler: async (ctx, args) => {
    const organization = await ctx.db
      .query("organizations")
      .withIndex("by_stripe_customer_id", (q) =>
        q.eq("stripeCustomerId", args.stripeCustomerId),
      )
      .first();

    if (!organization) {
      throw new Error(
        `Organization not found for Stripe customer ID: ${args.stripeCustomerId}`,
      );
    }

    // Determine plan from lookup key
    const newPlan = getPlanFromLookupKey(
      args.subscriptionData.lookupKey || null,
    );

    // Check if plan changed or quotas need to be set for the first time
    const shouldUpdateQuotas =
      !organization.plan || organization.plan !== newPlan;

    const updateData: {
      subscriptionId?: string;
      subscriptionStatus?:
        | "active"
        | "canceled"
        | "incomplete"
        | "incomplete_expired"
        | "past_due"
        | "trialing"
        | "unpaid"
        | "none";
      priceId?: string;
      cancelAtPeriodEnd?: boolean;
      paymentMethodBrand?: string;
      paymentMethodLast4?: string;
      billingCycleStart?: number;
      billingCycleEnd?: number;
      plan?: "free" | "plus" | "pro" | "enterprise";
      standardQuotaLimit?: number;
      premiumQuotaLimit?: number;
      seatQuantity?: number;
    } = {
      subscriptionId: args.subscriptionData.subscriptionId,
      subscriptionStatus: args.subscriptionData.status as
        | "active"
        | "canceled"
        | "incomplete"
        | "incomplete_expired"
        | "past_due"
        | "trialing"
        | "unpaid"
        | "none",
      priceId: args.subscriptionData.priceId || undefined,
      cancelAtPeriodEnd: args.subscriptionData.cancelAtPeriodEnd,
      paymentMethodBrand: args.subscriptionData.paymentMethodBrand || undefined,
      paymentMethodLast4: args.subscriptionData.paymentMethodLast4 || undefined,
      billingCycleStart: args.subscriptionData.billingCycleStart || undefined,
      billingCycleEnd: args.subscriptionData.billingCycleEnd || undefined,
      seatQuantity:
        typeof args.subscriptionData.seatQuantity === "number"
          ? args.subscriptionData.seatQuantity
          : undefined,
    };

    // Update plan and quotas only if plan changed
    if (shouldUpdateQuotas && newPlan) {
      updateData.plan = newPlan;
      updateData.standardQuotaLimit = PLAN_QUOTAS[newPlan].standardQuotaLimit;
      updateData.premiumQuotaLimit = PLAN_QUOTAS[newPlan].premiumQuotaLimit;
    }

    await ctx.db.patch(organization._id, updateData);
    return organization._id;
  },
});

// STRIPE: 1) org = getOrganizationByStripeCustomerId(stripeCustomerId). If !org: customer = stripe.customers.retrieve(stripeCustomerId), workOSOrganizationId = customer.metadata.workOSOrganizationId; getOrCreate org by workos_id, set stripeCustomerId.
// STRIPE: 2) subscriptions = stripe.subscriptions.list({ customer, limit: 1, status: 'all', expand: [default_payment_method, items.data.price] })
// STRIPE: 3) If none: subscriptionData = { status: 'none', billingCycleStart: billingPeriod?.start, billingCycleEnd: billingPeriod?.end }. Else: subscriptionData = { subscriptionId, status, priceId, lookupKey, billingCycleStart/End, cancelAtPeriodEnd, paymentMethodBrand/Last4, seatQuantity } from subscription and first item.
// STRIPE: 4) await syncStripeSubscriptionData(stripeCustomerId, subscriptionData). Return subscriptionData.
export const syncStripeDataWithPeriod = internalAction({
  args: {
    stripeCustomerId: v.string(),
    billingPeriod: v.optional(
      v.object({
        start: v.number(),
        end: v.number(),
      }),
    ),
  },
  handler: async (_ctx, _args) => {
    throw new Error("Stripe removed. Replace with new provider sync. See pseudocode above.");
  },
});

export const getSubscriptionData = internalQuery({
  args: { workos_id: v.string() },
  handler: async (ctx, args) => {
    const organization = await ctx.db
      .query("organizations")
      .withIndex("by_workos_id", (q) => q.eq("workos_id", args.workos_id))
      .first();

    if (!organization) {
      return null;
    }

    return {
      subscriptionId: organization.subscriptionId,
      subscriptionStatus: organization.subscriptionStatus || "none",
      priceId: organization.priceId,
      plan: organization.plan,
      standardQuotaLimit: organization.standardQuotaLimit,
      premiumQuotaLimit: organization.premiumQuotaLimit,
      seatQuantity: organization.seatQuantity,
      billingCycleStart: organization.billingCycleStart,
      billingCycleEnd: organization.billingCycleEnd,
      cancelAtPeriodEnd: organization.cancelAtPeriodEnd,
      paymentMethodBrand: organization.paymentMethodBrand,
      paymentMethodLast4: organization.paymentMethodLast4,
      stripeCustomerId: organization.stripeCustomerId,
    };
  },
});

export const getCurrentOrganizationPlan = AuthOrgQuery({
  args: {},
  handler: async (ctx) => {
    try {
      const organization = await ctx.db
        .query("organizations")
        .withIndex("by_workos_id", (q) => q.eq("workos_id", ctx.orgId))
        .first();

      if (!organization) {
        return null;
      }

      return {
        plan: organization.plan || null,
        subscriptionStatus: organization.subscriptionStatus || "none",
      };
    } catch (error) {
      console.error("Error getting current organization plan:", error);
      return null;
    }
  },
});

// Get current organization information for display
export const getCurrentOrganizationInfo = AuthOrgQuery({
  args: {},
  handler: async (ctx) => {
    try {
      const organization = await ctx.db
        .query("organizations")
        .withIndex("by_workos_id", (q) => q.eq("workos_id", ctx.orgId))
        .first();

      if (!organization) {
        return null;
      }

      return {
        name: organization.name,
        plan: organization.plan || null,
        subscriptionStatus: organization.subscriptionStatus || "none",
      };
    } catch (error) {
      console.error("Error getting current organization info:", error);
      return null;
    }
  },
});

export const getOrganizationBillingInfo = PermissionQuery({
  args: {},
  permissions: ["MANAGE_BILLING"],
  handler: async (ctx) => {
    const organization = await ctx.db
      .query("organizations")
      .withIndex("by_workos_id", (q) => q.eq("workos_id", ctx.orgId))
      .first();

    if (!organization) {
      return null;
    }

    return {
      subscriptionId: organization.subscriptionId,
      subscriptionStatus: organization.subscriptionStatus || "none",
      priceId: organization.priceId,
      plan: organization.plan,
      standardQuotaLimit: organization.standardQuotaLimit,
      premiumQuotaLimit: organization.premiumQuotaLimit,
      seatQuantity: organization.seatQuantity,
      billingCycleStart: organization.billingCycleStart,
      billingCycleEnd: organization.billingCycleEnd,
      cancelAtPeriodEnd: organization.cancelAtPeriodEnd,
      paymentMethodBrand: organization.paymentMethodBrand,
      paymentMethodLast4: organization.paymentMethodLast4,
      stripeCustomerId: organization.stripeCustomerId,
      name: organization.name,
    };
  },
});

// Get total user count for organization
export const getOrganizationUserCount = AuthOrgQuery({
  args: {},
  handler: async (ctx) => {
    try {
      // Count users in the organization by checking all users with the same org_id
      // Note: This is a simple count based on the assumption that users belong to organizations
      // In a real WorkOS setup, you might need to query WorkOS API for accurate user counts
      const allUsers = await ctx.db.query("users").collect();

      // For now, return a placeholder count since we don't have org association in users table
      // You might need to implement proper org-user relationship or query WorkOS API
      return { totalUsers: allUsers.length };
    } catch (error) {
      console.error("Error getting organization user count:", error);
      return null;
    }
  },
});
