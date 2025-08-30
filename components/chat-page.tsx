"use client";

import ChatInterface from "@/components/chat-interface";
import { useChatCache } from "@/contexts/chat-cache";

export default function ChatPage({ id }: { id: string }) {
  const { getMessages } = useChatCache();
  const initialMessages = getMessages(id);
  return <ChatInterface id={id} initialMessages={initialMessages} />;
} 