import { v } from "convex/values";
import { mutation } from "./_generated/server";

// Use a default guest user ID for all users since we removed authentication
const GUEST_USER_ID = "guest-user";

// Store paused messages (for when streaming is stopped)
export const storePausedMessages = mutation({
  args: {
    chatId: v.id("chats"),
    responseMessage: v.object({
      id: v.string(),
      role: v.string(),
      parts: v.any(),
    }),
    modelId: v.string(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const annotations = [
      {
        hasStopped: true,
        modelId: args.modelId,
      },
    ];

    await ctx.db.insert("messages", {
      chatId: args.chatId,
      role: args.responseMessage.role,
      parts: args.responseMessage.parts,
      annotations,
    });

    return null;
  },
});

// Create or get chat and save user message
export const createOrGetChat = mutation({
  args: {
    title: v.string(),
  },
  returns: v.id("chats"),
  handler: async (ctx, args) => {
    // Try to find existing chat by title and user
    const existingChats = await ctx.db
      .query("chats")
      .filter((q) => 
        q.and(
          q.eq(q.field("userId"), GUEST_USER_ID),
          q.eq(q.field("title"), args.title)
        )
      )
      .collect();

    if (existingChats.length > 0) {
      return existingChats[0]._id;
    }

    // Create new chat
    return await ctx.db.insert("chats", {
      title: args.title,
      userId: GUEST_USER_ID,
      pinned: false,
    });
  },
});
