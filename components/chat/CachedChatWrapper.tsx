"use client";

import { useState, useEffect, useRef } from "react";
import type { UIMessage } from "@ai-sdk-tools/store";
import ChatInterface from "@/components/chat";
import {
  loadCachedThreadMessages,
  getMemoryCachedThreadMessages,
} from "@/lib/local-first/thread-messages-cache";
import { useDebugStore } from "./DebugOverlay";

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
  const addEvent = useDebugStore((s) => s.addEvent);
  const setLoadSource = useDebugStore((s) => s.setLoadSource);

  // Synchronously get cached messages during render - this is instant for memory cache
  // We compute this during render (not in effect) for instant display
  let memoryCachedMessages: UIMessage[] | undefined;
  let hadMemoryCache = false;
  if (typeof window !== "undefined") {
    const cached = getMemoryCachedThreadMessages(threadId);
    memoryCachedMessages = cached?.messages;
    hadMemoryCache = !!(memoryCachedMessages && memoryCachedMessages.length > 0);
  }

  // Log cache status in effect (not during render)
  const lastLoggedThreadRef = useRef<string | null>(null);
  useEffect(() => {
    if (lastLoggedThreadRef.current !== threadId) {
      lastLoggedThreadRef.current = threadId;
      if (hadMemoryCache) {
        addEvent(`💾 Memory cache: ${memoryCachedMessages?.length ?? 0} msgs`);
        setLoadSource("memory-cache");
      } else {
        addEvent("💾 Memory cache: empty");
      }
    }
  }, [threadId, hadMemoryCache, memoryCachedMessages?.length, addEvent, setLoadSource]);

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
    const idbStart = performance.now();

    let cancelled = false;
    
    void (async () => {
      try {
        const record = await loadCachedThreadMessages(threadId);
        if (cancelled) return;
        
        const idbDuration = Math.round(performance.now() - idbStart);
        
        if (record?.messages && record.messages.length > 0) {
          addEvent(`💿 IndexedDB: ${record.messages.length} msgs`, idbDuration);
          setLoadSource("indexeddb-cache");
        } else {
          addEvent(`💿 IndexedDB: empty`, idbDuration);
          setLoadSource("none");
        }
        
        setAsyncLoadedMessages(record?.messages);
        setAsyncLoadedThreadId(threadId);
      } catch (e) {
        // Ignore cache errors (private browsing, etc.)
        const idbDuration = Math.round(performance.now() - idbStart);
        addEvent(`💿 IndexedDB error`, idbDuration);
        if (!cancelled) {
          setAsyncLoadedMessages(undefined);
          setAsyncLoadedThreadId(threadId);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [threadId, hadMemoryCache, asyncLoadedThreadId, addEvent, setLoadSource]);

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
