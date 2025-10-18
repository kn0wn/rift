import { internalQuery, internalMutation, query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId, getAuthUserIdentity } from "./helpers/getUser";
import {
  extractOrganizationIdFromJWT,
  checkQuotaLimit,
  getOrganizationBillingCycle,
  incrementQuotaUsage,
} from "./helpers/quota";
import { ensureServerSecret } from "./helpers/auth";

export const createUser = internalMutation({
  args: { 
    email: v.string(), 
    workos_id: v.string(),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    profilePictureUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("users", args);
  },
});

export const updateUser = internalMutation({
  args: {
    id: v.id("users"),
    patch: v.object({
      email: v.optional(v.string()),
      workos_id: v.optional(v.string()),
      firstName: v.optional(v.string()),
      lastName: v.optional(v.string()),
      profilePictureUrl: v.optional(v.string()),
      standardQuotaUsage: v.optional(v.number()),
      premiumQuotaUsage: v.optional(v.number()),
      lastQuotaResetAt: v.optional(v.number()),
    }),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.id, args.patch);
  },
});

export const deleteUser = internalMutation({
  args: { id: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});

export const getByWorkOSId = internalQuery({
  args: { workos_id: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_workos_id", (q) => q.eq("workos_id", args.workos_id))
      .unique();
    return user;
  },
});

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);

    const user = await ctx.db
      .query("users")
      .withIndex("by_workos_id", (q) => q.eq("workos_id", userId))
      .unique();

    return user;
  },
});

export const resetQuota = internalMutation({
  args: {
    userWorkosId: v.string(),
    quotaType: v.optional(
      v.union(v.literal("standard"), v.literal("premium"), v.literal("both")),
    ),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_workos_id", (q) => q.eq("workos_id", args.userWorkosId))
      .unique();

    if (!user) {
      throw new Error("User not found");
    }

    const quotaType = args.quotaType || "both";
    const updateData: {
      lastQuotaResetAt: number;
      standardQuotaUsage?: number;
      premiumQuotaUsage?: number;
    } = {
      lastQuotaResetAt: Date.now(),
    };

    if (quotaType === "standard" || quotaType === "both") {
      updateData.standardQuotaUsage = 0;
    }
    if (quotaType === "premium" || quotaType === "both") {
      updateData.premiumQuotaUsage = 0;
    }

    await ctx.db.patch(user._id, updateData);

    return { success: true, resetAt: Date.now() };
  },
});

export const getUserQuotaInfo = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);

    const user = await ctx.db
      .query("users")
      .withIndex("by_workos_id", (q) => q.eq("workos_id", userId))
      .unique();

    if (!user) {
      return null;
    }

    return {
      standardQuotaUsage: user.standardQuotaUsage || 0,
      premiumQuotaUsage: user.premiumQuotaUsage || 0,
      lastQuotaResetAt: user.lastQuotaResetAt,
    };
  },
});

export const getUserFullQuotaInfo = query({
  args: {},
  returns: v.object({
    standard: v.object({
      currentUsage: v.number(),
      limit: v.number(),
      quotaConfigured: v.boolean(),
    }),
    premium: v.object({
      currentUsage: v.number(),
      limit: v.number(),
      quotaConfigured: v.boolean(),
    }),
    nextResetDate: v.optional(v.number()),
  }),
  handler: async (ctx) => {
    const userWorkosId = await getAuthUserId(ctx);
    const identity = await getAuthUserIdentity(ctx);

    if (!identity || !identity.org_id) {
      throw new Error("No organization found in auth identity");
    }

    const orgWorkosId = extractOrganizationIdFromJWT(identity);

    if (!orgWorkosId) {
      throw new Error("Could not extract organization ID");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_workos_id", (q) => q.eq("workos_id", userWorkosId))
      .unique();

    if (!user) {
      throw new Error("User not found");
    }

    const organization = await ctx.db
      .query("organizations")
      .withIndex("by_workos_id", (q) => q.eq("workos_id", orgWorkosId))
      .first();

    if (!organization) {
      throw new Error("Organization not found");
    }

    const billingCycle = await getOrganizationBillingCycle(ctx, orgWorkosId);

    const standardQuota = await checkQuotaLimit(
      ctx,
      userWorkosId,
      orgWorkosId,
      "standard",
      billingCycle?.billingCycleStart,
    );

    const premiumQuota = await checkQuotaLimit(
      ctx,
      userWorkosId,
      orgWorkosId,
      "premium",
      billingCycle?.billingCycleStart,
    );

    return {
      standard: {
        currentUsage: standardQuota.currentUsage,
        limit: standardQuota.limit,
        quotaConfigured: standardQuota.quotaConfigured,
      },
      premium: {
        currentUsage: premiumQuota.currentUsage,
        limit: premiumQuota.limit,
        quotaConfigured: premiumQuota.quotaConfigured,
      },
      nextResetDate: organization.billingCycleEnd || billingCycle?.billingCycleEnd,
    };
  },
});


/**
 * SERVER-ONLY VARIANTS (require shared secret and explicit userId/orgId)
 */

export const serverCheckUserQuota = query({
  args: {
    secret: v.string(),
    userId: v.string(),
    orgId: v.string(),
    quotaType: v.union(v.literal("standard"), v.literal("premium")),
  },
  returns: v.object({
    allowed: v.boolean(),
    currentUsage: v.number(),
    limit: v.number(),
    quotaConfigured: v.boolean(),
  }),
  handler: async (ctx, args) => {
    ensureServerSecret(args.secret);
    const billingCycle = await getOrganizationBillingCycle(ctx, args.orgId);
    const quotaCheck = await checkQuotaLimit(
      ctx,
      args.userId,
      args.orgId,
      args.quotaType,
      billingCycle?.billingCycleStart,
    );
    return quotaCheck;
  },
});

export const serverGetUserBothQuotas = query({
  args: {
    secret: v.string(),
    userId: v.string(),
    orgId: v.string(),
  },
  returns: v.object({
    standard: v.object({
      allowed: v.boolean(),
      currentUsage: v.number(),
      limit: v.number(),
      quotaConfigured: v.boolean(),
    }),
    premium: v.object({
      allowed: v.boolean(),
      currentUsage: v.number(),
      limit: v.number(),
      quotaConfigured: v.boolean(),
    }),
  }),
  handler: async (ctx, args) => {
    ensureServerSecret(args.secret);
    const billingCycle = await getOrganizationBillingCycle(ctx, args.orgId);
    const standardQuota = await checkQuotaLimit(
      ctx,
      args.userId,
      args.orgId,
      "standard",
      billingCycle?.billingCycleStart,
    );
    const premiumQuota = await checkQuotaLimit(
      ctx,
      args.userId,
      args.orgId,
      "premium",
      billingCycle?.billingCycleStart,
    );
    return { standard: standardQuota, premium: premiumQuota };
  },
});

export const serverIncrementUserQuota = mutation({
  args: {
    secret: v.string(),
    userId: v.string(),
    orgId: v.string(),
    quotaType: v.union(v.literal("standard"), v.literal("premium")),
  },
  returns: v.object({ newUsage: v.number() }),
  handler: async (ctx, args) => {
    ensureServerSecret(args.secret);
    const billingCycle = await getOrganizationBillingCycle(ctx, args.orgId);
    const newUsage = await incrementQuotaUsage(
      ctx,
      args.userId,
      args.quotaType,
      billingCycle?.billingCycleStart,
    );
    return { newUsage };
  },
});
