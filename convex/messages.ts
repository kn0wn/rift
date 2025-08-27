import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get messages by chat ID
export const getMessagesByChatId = query({
  args: {
    chatId: v.id("chats"),
  },
  returns: v.array(
    v.object({
      _id: v.id("messages"),
      _creationTime: v.number(),
      chatId: v.id("chats"),
      role: v.string(),
      parts: v.any(),
      annotations: v.any(),
    })
  ),
  handler: async (ctx, args) => {
    return await ctx.db
      .query("messages")
      .withIndex("by_chat", (q) => q.eq("chatId", args.chatId))
      .order("asc")
      .collect();
  },
});

// Save messages to a chat
export const saveMessages = mutation({
  args: {
    messages: v.array(
      v.object({
        chatId: v.id("chats"),
        role: v.string(),
        parts: v.any(),
        annotations: v.any(),
      })
    ),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    for (const message of args.messages) {
      await ctx.db.insert("messages", message);
    }
    return null;
  },
});

// Get a message by ID
export const getMessageById = query({
  args: {
    id: v.id("messages"),
  },
  returns: v.union(
    v.object({
      _id: v.id("messages"),
      _creationTime: v.number(),
      chatId: v.id("chats"),
      role: v.string(),
      parts: v.any(),
      annotations: v.any(),
    }),
    v.null()
  ),
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Delete messages by chat ID after a timestamp
export const deleteMessagesByChatIdAfterTimestamp = mutation({
  args: {
    chatId: v.id("chats"),
    timestamp: v.number(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_chat", (q) => q.eq("chatId", args.chatId))
      .collect();
    
    for (const message of messages) {
      if (message._creationTime > args.timestamp) {
        await ctx.db.delete(message._id);
      }
    }
    return null;
  },
});

// Delete trailing messages after a specific message
export const deleteTrailingMessages = mutation({
  args: {
    messageId: v.id("messages"),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const message = await ctx.db.get(args.messageId);
    if (!message) {
      throw new Error("Message not found");
    }
    
    await ctx.db
      .query("messages")
      .withIndex("by_chat", (q) => q.eq("chatId", message.chatId))
      .collect()
      .then((messages) => {
        for (const msg of messages) {
          if (msg._creationTime > message._creationTime) {
            ctx.db.delete(msg._id);
          }
        }
      });
    
    return null;
  },
});
