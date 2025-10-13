"use client";

import { usePreloadedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState, useEffect, useMemo, useCallback } from "react";
import { Preloaded } from "convex/react";
import { ThreadItemInteractive } from "./thread-item-interactive";

interface Thread {
  threadId: string;
  title: string;
  pinned: boolean;
  _creationTime: number;
  generationStatus: "pending" | "generation" | "compleated" | "failed";
}

interface ThreadListClientProps {
  preloadedThreads?: Preloaded<typeof api.threads.getUserThreadsPaginatedSafe>;
}

const GROUP_ORDER = [
  "Fijados",
  "Hoy", 
  "Ayer",
  "Esta Semana",
  "Este Mes",
  "Anteriores",
] as const;

const getTimeClassification = (timestamp: number): string => {
  const now = new Date();
  const threadDate = new Date(timestamp);
  const diffInMs = now.getTime() - threadDate.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return "Hoy";
  if (diffInDays === 1) return "Ayer";
  if (diffInDays <= 7) return "Esta Semana";
  if (diffInDays <= 30) return "Este Mes";
  return "Anteriores";
};

export function ThreadListClient({ preloadedThreads }: ThreadListClientProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Get reactive thread data
  const result = usePreloadedQuery(preloadedThreads!);
  const threads: Thread[] = result?.page || [];

  // Memoized filtered and grouped threads
  const groupedThreads = useMemo(() => {
    const filtered = threads.filter((thread) =>
      thread.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    return filtered.reduce(
      (groups, thread) => {
        const timeClass = getTimeClassification(thread._creationTime);
        const groupKey = thread.pinned ? "Fijados" : timeClass;

        if (!groups[groupKey]) {
          groups[groupKey] = [];
        }
        groups[groupKey].push(thread);
        return groups;
      },
      {} as Record<string, Thread[]>,
    );
  }, [threads, searchQuery]);

  // Memoized thread group renderer
  const renderThreadGroup = useCallback((groupName: string, groupThreads: Thread[]) => {
    if (!groupThreads || groupThreads.length === 0) return null;

    return (
      <div key={groupName} className="mb-4">
        <div className="px-5 py-2">
          <span className="text-xs font-semibold text-black/75 dark:text-popover-text/75">
            {groupName}
          </span>
        </div>
        <div className="space-y-0.5 px-5">
          {groupThreads.map((thread) => (
            <ThreadItemInteractive key={thread.threadId} thread={thread} />
          ))}
        </div>
      </div>
    );
  }, []);

  // Memoized empty state check
  const isEmpty = useMemo(() => {
    const filteredThreads = threads.filter((thread) =>
      thread.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    return filteredThreads.length === 0;
  }, [threads, searchQuery]);

  // Memoized empty state
  const emptyState = useMemo(() => {
    if (!isEmpty) return null;

    if (searchQuery) {
      return (
        <div className="p-4 text-center text-muted-foreground">
          <p className="text-sm">
            No se encontraron chats que coincidan con &quot;{searchQuery}&quot;
          </p>
          <p className="text-xs">Intenta ajustar tus términos de búsqueda</p>
        </div>
      );
    }

    return (
      <div className="p-4 text-center text-muted-foreground">
        <p className="text-sm">Aún no hay chats</p>
        <p className="text-xs">Inicia una nueva conversación</p>
      </div>
    );
  }, [isEmpty, searchQuery]);

  // Search input handler
  const handleSearchChange = useCallback((e: Event) => {
    const target = e.target as HTMLInputElement;
    setSearchQuery(target.value);
  }, []);

  // Set up search input
  useEffect(() => {
    const searchInput = document.getElementById("thread-search-input") as HTMLInputElement;
    if (searchInput) {
      searchInput.removeAttribute("readonly");
      searchInput.value = searchQuery;
      searchInput.addEventListener("input", handleSearchChange);
      return () => searchInput.removeEventListener("input", handleSearchChange);
    }
  }, [searchQuery, handleSearchChange]);

  return (
    <>
      {emptyState || (
        <div className="w-full overflow-hidden">
          {GROUP_ORDER.map((groupName) =>
            renderThreadGroup(groupName, groupedThreads[groupName]),
          )}
        </div>
      )}
    </>
  );
}
