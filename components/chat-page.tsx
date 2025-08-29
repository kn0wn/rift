"use client";

import { useQuery, usePaginatedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import ChatInterface from "@/components/chat-interface";
import ErrorMessage from "@/components/error-message";
import { UIMessage } from "ai";
import { useEffect } from "react";

interface ChatPageProps {
  id: string;
}

type ConvexMessage = {
  messageId: string;
  content: string;
  role: UIMessage["role"];
  created_at: number;
};

export default function ChatPage({ id }: ChatPageProps) {
  // Load thread info
  const threadInfo = useQuery(api.threads.getThreadInfo, { threadId: id });

  // Load messages with pagination (newest first)
  const { results, status, loadMore } = usePaginatedQuery(
    api.threads.getThreadMessagesPaginated,
    { threadId: id },
    { initialNumItems: 10 },
  );

  // Auto-load older messages when scrolling near the top of the viewport
  useEffect(() => {
    const viewport = document.querySelector(
      '[data-slot="scroll-area-viewport"]',
    ) as HTMLElement | null;
    if (!viewport) return;

    const handleScroll = () => {
      if (viewport.scrollTop < 80 && status === "CanLoadMore") {
        loadMore(10);
      }
    };

    viewport.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      viewport.removeEventListener("scroll", handleScroll);
    };
  }, [status, loadMore]);

  // Handle loading states
  if (threadInfo === undefined || results === undefined) {
    return (
      <div className="relative mx-auto flex h-full w-full max-w-3xl flex-col px-2 pt-14">
        <div className="flex items-center justify-center h-full">
          <div>Loading...</div>
        </div>
      </div>
    );
  }

  // Handle errors - thread not found
  if (threadInfo === null) {
    return (
      <ErrorMessage 
        chatError="Thread not found" 
        error="The requested thread could not be found." 
      />
    );
  }

  // Convert Convex messages to UI messages (reverse to chronological order)
  function convertToUIMessages(convexMessages: Array<ConvexMessage>): Array<UIMessage> {
    if (!convexMessages) return [];

    return convexMessages.map((message) => ({
      id: message.messageId,
      parts: [{ type: "text", text: message.content }],
      role: message.role,
      content: message.content,
      createdAt: new Date(message.created_at),
    }));
  }

  // Results come newest-first; reverse to oldest-first for display
  const initialMessages = convertToUIMessages((results as Array<ConvexMessage> | undefined || []).slice().reverse());

  return (
    <ChatInterface
      id={id}
      initialMessages={initialMessages}
    />
  );
}
