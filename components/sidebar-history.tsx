"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import ChatList from "./chat-list";

// Use a default guest user ID for all users since we removed authentication
const GUEST_USER_ID = "guest-user";

export default function SidebarHistory() {
  // Load chat history for the guest user
  const chatHistory = useQuery(
    api.chats.getChatHistory, 
    { userId: GUEST_USER_ID }
  );

  if (chatHistory === undefined) {
    return <div>Loading chat history...</div>;
  }

  // Transform Convex data to match the expected format
  const transformedChats = chatHistory.map(chat => ({
    id: chat._id,
    title: chat.title,
    userId: chat.userId,
    pinned: chat.pinned,
    createdAt: new Date(chat._creationTime),
  }));

  return <ChatList chats={transformedChats} />;
}
