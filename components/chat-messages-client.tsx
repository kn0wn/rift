"use client";

import { useConvexAuth, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import ChatInterface from "@/components/chat";

export function ChatMessagesClient({ threadId }: { threadId: string }) {
  const { isAuthenticated } = useConvexAuth();

  const hasValidThreadId = typeof threadId === "string" && threadId.length > 0;

  const threadInfo = useQuery(
    api.threads.getThreadInfo,
    isAuthenticated && hasValidThreadId ? { threadId } : "skip",
  );

  // Keep the shell visible immediately; only data-driven parts should appear later.
  if (!hasValidThreadId) return null;

  return (
    <ChatInterface
      id={threadId}
      customInstructionId={threadInfo?.customInstructionId}
    />
  );
}


