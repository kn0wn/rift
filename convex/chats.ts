import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Use a default guest user ID for all users since we removed authentication
const GUEST_USER_ID = "guest-user";

// Create a new chat
export const createChat = mutation({
  args: {
    title: v.string(),
  },
  returns: v.id("chats"),
  handler: async (ctx, args) => {
    return await ctx.db.insert("chats", {
      title: args.title,
      userId: GUEST_USER_ID,
      pinned: false,
    });
  },
});

// Delete a chat
export const deleteChat = mutation({
  args: {
    id: v.id("chats"),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    // Delete all messages in the chat first
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_chat", (q) => q.eq("chatId", args.id))
      .collect();
    
    for (const message of messages) {
      await ctx.db.delete(message._id);
    }
    
    // Delete the chat
    await ctx.db.delete(args.id);
    return null;
  },
});

// Get a chat by ID
export const getChatById = query({
  args: {
    id: v.id("chats"),
  },
  returns: v.union(
    v.object({
      _id: v.id("chats"),
      _creationTime: v.number(),
      title: v.string(),
      userId: v.string(),
      pinned: v.boolean(),
    }),
    v.null()
  ),
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Get chat history for the guest user
export const getChatHistory = query({
  args: {
    userId: v.string(),
  },
  returns: v.array(
    v.object({
      _id: v.id("chats"),
      _creationTime: v.number(),
      title: v.string(),
      userId: v.string(),
      pinned: v.boolean(),
    })
  ),
  handler: async (ctx, args) => {
    return await ctx.db
      .query("chats")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();
  },
});

// Toggle chat pin status
export const toggleChatPin = mutation({
  args: {
    id: v.id("chats"),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const chat = await ctx.db.get(args.id);
    if (!chat) {
      throw new Error("Chat not found");
    }
    
    await ctx.db.patch(args.id, {
      pinned: !chat.pinned,
    });
    return null;
  },
});
