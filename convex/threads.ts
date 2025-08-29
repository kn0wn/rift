import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "./helpers/getUser";
import { paginationOptsValidator } from "convex/server";

/**
 * Create a new thread with an initial message.
 * This mutation is secure and only allows authenticated users to create threads.
 */
export const createThread = mutation({
  args: {
    threadId: v.string(), // Client-generated thread ID
    content: v.string(), // Initial message content
    model: v.string(),
    messageId: v.string(), // Client-generated message ID
    modelParams: v.optional(
      v.object({
        temperature: v.optional(v.number()),
        topP: v.optional(v.number()),
        topK: v.optional(v.number()),
        reasoningEffort: v.optional(
          v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
        ),
        includeSearch: v.optional(v.boolean()),
      }),
    ),
    userSetTitle: v.optional(v.boolean()),
    branchParentThreadId: v.optional(v.id("threads")),
    branchParentPublicMessageId: v.optional(v.string()),
  },
  returns: v.object({
    threadId: v.string(),
    messageId: v.string(),
    threadDocId: v.id("threads"),
    messageDocId: v.id("messages"),
  }),
  handler: async (ctx, args) => {
    // Get the authenticated user ID using the helper
    const userId = await getAuthUserId(ctx);

    // Get current timestamp
    const now = Date.now();

    // Create the thread
    const threadDocId = await ctx.db.insert("threads", {
      threadId: args.threadId,
      title: "Nuevo Chat", // Default title set server-side
      createdAt: now,
      updatedAt: now,
      lastMessageAt: now,
      generationStatus: "pending" as const,
      visibility: "visible", // Default visibility
      userSetTitle: args.userSetTitle ?? false,
      userId: userId,
      model: args.model,
      pinned: false, // Default pinned status
      branchParentThreadId: args.branchParentThreadId,
      branchParentPublicMessageId: args.branchParentPublicMessageId,
      backfill: false,
    });

    // Create the initial message
    const messageDocId = await ctx.db.insert("messages", {
      messageId: args.messageId,
      threadId: args.threadId,
      userId: userId,
      content: args.content,
      status: "done" as const,
      role: "user" as const,
      created_at: now,
      model: args.model,
      attachmentsIds: [], // Empty array for initial message
      modelParams: args.modelParams,
      backfill: false,
    });

    return {
      threadId: args.threadId,
      messageId: args.messageId,
      threadDocId,
      messageDocId,
    };
  },
});

/**
 * Get thread information (without messages).
 * This query is secure and only returns data for the authenticated user.
 */
export const getThreadInfo = query({
  args: {
    threadId: v.string(),
  },
  returns: v.union(
    v.object({
      _id: v.id("threads"),
      _creationTime: v.number(),
      threadId: v.string(),
      title: v.string(),
      createdAt: v.number(),
      updatedAt: v.number(),
      lastMessageAt: v.number(),
      generationStatus: v.union(
        v.literal("pending"),
        v.literal("generation"),
        v.literal("compleated"),
        v.literal("failed"),
      ),
      visibility: v.union(v.literal("visible"), v.literal("archived")),
      userSetTitle: v.optional(v.boolean()),
      userId: v.string(),
      model: v.string(),
      pinned: v.boolean(),
      branchParentThreadId: v.optional(v.id("threads")),
      branchParentPublicMessageId: v.optional(v.string()),
      backfill: v.optional(v.boolean()),
    }),
    v.null()
  ),
  handler: async (ctx, args) => {
    // Get the authenticated user ID using the helper
    const userId = await getAuthUserId(ctx);

    // Get the thread, ensuring it belongs to the authenticated user
    const thread = await ctx.db
      .query("threads")
      .withIndex("by_user_and_threadId", (q) =>
        q.eq("userId", userId).eq("threadId", args.threadId)
      )
      .unique();

    return thread;
  },
});

/**
 * Get all messages for a thread.
 * This query is secure and only returns data for the authenticated user.
 */
export const getAllThreadMessages = query({
  args: {
    threadId: v.string(),
  },
  returns: v.array(
    v.object({
      _id: v.id("messages"),
      _creationTime: v.number(),
      messageId: v.string(),
      threadId: v.string(),
      userId: v.string(),
      reasoning: v.optional(v.string()),
      content: v.string(),
      status: v.union(
        v.literal("waiting"),
        v.literal("thinking"),
        v.literal("streaming"),
        v.literal("done"),
        v.literal("error"),
        v.literal("error.rejected"),
        v.literal("deleted"),
        v.literal("cancelled"),
      ),
      updated_at: v.optional(v.number()),
      branches: v.optional(v.array(v.id("threads"))),
      role: v.union(
        v.literal("user"),
        v.literal("assistant"),
        v.literal("system"),
      ),
      created_at: v.number(),
      serverError: v.optional(
        v.object({
          type: v.string(),
          message: v.string(),
        }),
      ),
      model: v.string(),
      attachmentsIds: v.array(v.id("attachments")),
      modelParams: v.optional(
        v.object({
          temperature: v.optional(v.number()),
          topP: v.optional(v.number()),
          topK: v.optional(v.number()),
          reasoningEffort: v.optional(
            v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
          ),
          includeSearch: v.optional(v.boolean()),
        }),
      ),
      providerMetadata: v.optional(v.record(v.string(), v.any())),
      backfill: v.optional(v.boolean()),
    }),
  ),
  handler: async (ctx, args) => {
    // Get the authenticated user ID using the helper
    const userId = await getAuthUserId(ctx);

    // Verify the thread exists and belongs to the authenticated user
    const thread = await ctx.db
      .query("threads")
      .withIndex("by_user_and_threadId", (q) =>
        q.eq("userId", userId).eq("threadId", args.threadId)
      )
      .unique();

    if (!thread) {
      throw new Error("Thread not found or access denied");
    }

    // Get all messages for this thread, ordered by creation time (oldest first)
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_treadId", (q) =>
        q.eq("threadId", args.threadId)
      )
      .order("asc") // Oldest messages first for chronological display
      .collect();

    return messages;
  },
});

/**
 * Send a message to an existing thread.
 * This mutation is secure and only allows authenticated users to send messages to their own threads.
 */
export const sendMessage = mutation({
  args: {
    threadId: v.string(), // Client-generated thread ID
    content: v.string(), // Message content
    model: v.string(),
    messageId: v.string(), // Client-generated message ID
    modelParams: v.optional(
      v.object({
        temperature: v.optional(v.number()),
        topP: v.optional(v.number()),
        topK: v.optional(v.number()),
        reasoningEffort: v.optional(
          v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
        ),
        includeSearch: v.optional(v.boolean()),
      }),
    ),
  },
  returns: v.object({
    messageId: v.string(),
    messageDocId: v.id("messages"),
  }),
  handler: async (ctx, args) => {
    // Get the authenticated user ID using the helper
    const userId = await getAuthUserId(ctx);

    // Get current timestamp
    const now = Date.now();

    // Verify the thread exists and belongs to the authenticated user
    const thread = await ctx.db
      .query("threads")
      .withIndex("by_user_and_threadId", (q) =>
        q.eq("userId", userId).eq("threadId", args.threadId)
      )
      .unique();

    if (!thread) {
      throw new Error("Thread not found or access denied");
    }

    // Create the message
    const messageDocId = await ctx.db.insert("messages", {
      messageId: args.messageId,
      threadId: args.threadId,
      userId: userId,
      content: args.content,
      status: "done" as const,
      role: "user" as const,
      created_at: now,
      model: args.model,
      attachmentsIds: [], // Empty array for new message
      modelParams: args.modelParams,
      backfill: false,
    });

    // Update the thread's lastMessageAt timestamp
    await ctx.db.patch(thread._id, {
      lastMessageAt: now,
      updatedAt: now,
    });

    return {
      messageId: args.messageId,
      messageDocId,
    };
  },
});

/**
 * Paginated messages for a thread (newest-first pages).
 * Returns PaginationResult so clients can load older messages incrementally.
 */
export const getThreadMessagesPaginated = query({
  args: {
    threadId: v.string(),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    // Ensure the thread belongs to the current user
    const thread = await ctx.db
      .query("threads")
      .withIndex("by_user_and_threadId", (q) =>
        q.eq("userId", userId).eq("threadId", args.threadId)
      )
      .unique();

    if (!thread) {
      throw new Error("Thread not found or access denied");
    }

    return await ctx.db
      .query("messages")
      .withIndex("by_treadId", (q) => q.eq("threadId", args.threadId))
      .order("desc") // Newest first; client can reverse for display
      .paginate(args.paginationOpts);
  },
});