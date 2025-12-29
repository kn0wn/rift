"use client";

import { useState, useEffect } from "react";
import type { UIMessage } from "@ai-sdk-tools/store";
import ChatInterface from "@/components/chat";
import {
  loadCachedThreadMessages,
  getMemoryCachedThreadMessages,
} from "@/lib/local-first/thread-messages-cache";

interface CachedChatWrapperProps {
  threadId: string;
  customInstructionId?: string;
}

/**
 * CachedChatWrapper handles all cache logic separately from ChatInterface.
 * 
 * It provides instant loading by:
 * 1. Synchronously reading from memory cache during render (instant)
 * 2. Falling back to async IndexedDB load only if memory cache is empty
 * 3. Passing cached messages as initialMessages to ChatInterface
 * 
 * ChatInterface remains pure and unaware of caching.
 */
export function CachedChatWrapper({ threadId, customInstructionId }: CachedChatWrapperProps) {
  // Synchronously get cached messages during render - this is instant for memory cache
  let memoryCachedMessages: UIMessage[] | undefined;
  let hadMemoryCache = false;
  if (typeof window !== "undefined") {
    const cached = getMemoryCachedThreadMessages(threadId);
    memoryCachedMessages = cached?.messages;
    hadMemoryCache = !!(memoryCachedMessages && memoryCachedMessages.length > 0);
  }

  // Track async-loaded messages from IndexedDB (only used when memory cache is empty)
  const [asyncLoadedMessages, setAsyncLoadedMessages] = useState<UIMessage[] | undefined>(undefined);
  const [asyncLoadedThreadId, setAsyncLoadedThreadId] = useState<string | null>(null);

  // Load from IndexedDB only if memory cache is empty
  useEffect(() => {
    // If we have memory cache, no need for IndexedDB
    if (hadMemoryCache) {
      return;
    }

    // If we already async-loaded for this thread, skip
    if (asyncLoadedThreadId === threadId) {
      return;
    }

    // Reset async state for new thread
    setAsyncLoadedMessages(undefined);

    let cancelled = false;
    
    void (async () => {
      try {
        const record = await loadCachedThreadMessages(threadId);
        if (cancelled) return;
        
        setAsyncLoadedMessages(record?.messages);
        setAsyncLoadedThreadId(threadId);
      } catch {
        // Ignore cache errors (private browsing, etc.)
        if (!cancelled) {
          setAsyncLoadedMessages(undefined);
          setAsyncLoadedThreadId(threadId);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [threadId, hadMemoryCache, asyncLoadedThreadId]);

  // Use memory cache first (instant), fall back to async-loaded messages
  const initialMessages = memoryCachedMessages ?? 
    (asyncLoadedThreadId === threadId ? asyncLoadedMessages : undefined);

  // Key ChatInterface by threadId to force remount on thread change
  // This ensures clean state and prevents stale data issues
  return (
    <ChatInterface
      key={threadId}
      id={threadId}
      initialMessages={initialMessages}
      customInstructionId={customInstructionId}
    />
  );
}
