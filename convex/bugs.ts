import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { getAuthUserId, getAuthUserIdentity } from "./helpers/getUser";
import { extractOrganizationIdFromJWT } from "./helpers/quota";

export const report = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    stepsToReproduce: v.optional(v.string()),
    priority: v.union(v.literal("low"), v.literal("medium"), v.literal("high"), v.literal("critical")),
    browserDetails: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    const identity = await getAuthUserIdentity(ctx);
    if (!identity) {
      throw new Error("Unauthenticated");
    }
    const orgId = extractOrganizationIdFromJWT(identity);
    if (!orgId) {
      throw new Error("No organization found in auth identity");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_workos_id", (q) => q.eq("workos_id", userId))
      .unique();
    const userEmail = user?.email || identity.email || "";

    const now = Date.now();
    await ctx.db.insert("bugs", {
      userId,
      orgId,
      userEmail,
      title: args.title,
      description: args.description,
      stepsToReproduce: args.stepsToReproduce,
      priority: args.priority,
      browserDetails: args.browserDetails,
      reportedAt: now,
    });

    return { ok: true } as const;
  },
});


