"use client";

import { create } from "zustand";
import { useEffect, useState } from "react";

// Only enable in development
const IS_DEV = process.env.NODE_ENV === "development";

interface TimingEvent {
  label: string;
  timestamp: number;
  delta: number; // ms since navigation started
  duration?: number; // for events that measure duration
}

interface DebugState {
  navigationStartTime: number | null;
  events: TimingEvent[];
  loadSource: "memory-cache" | "indexeddb-cache" | "convex" | "none" | null;
  threadId: string | null;
  convexQueryStart: number | null;
  
  // Actions
  startNavigation: (threadId: string) => void;
  addEvent: (label: string, duration?: number) => void;
  setLoadSource: (source: DebugState["loadSource"]) => void;
  startConvexQuery: () => void;
  endConvexQuery: (messageCount: number) => void;
  reset: () => void;
}

export const useDebugStore = create<DebugState>((set, get) => ({
  navigationStartTime: null,
  events: [],
  loadSource: null,
  threadId: null,
  convexQueryStart: null,

  startNavigation: (threadId: string) => {
    if (!IS_DEV) return;
    const now = performance.now();
    set({
      navigationStartTime: now,
      events: [{ label: "🚀 Navigation started", timestamp: now, delta: 0 }],
      loadSource: null,
      threadId,
      convexQueryStart: null,
    });
  },

  addEvent: (label: string, duration?: number) => {
    if (!IS_DEV) return;
    const state = get();
    if (!state.navigationStartTime) return;
    
    const now = performance.now();
    const delta = Math.round(now - state.navigationStartTime);
    
    set((s) => ({
      events: [...s.events, { label, timestamp: now, delta, duration }],
    }));
  },

  setLoadSource: (source) => {
    if (!IS_DEV) return;
    set({ loadSource: source });
  },

  startConvexQuery: () => {
    if (!IS_DEV) return;
    set({ convexQueryStart: performance.now() });
  },

  endConvexQuery: (messageCount: number) => {
    if (!IS_DEV) return;
    const state = get();
    if (!state.convexQueryStart || !state.navigationStartTime) return;
    
    const now = performance.now();
    const queryDuration = Math.round(now - state.convexQueryStart);
    const delta = Math.round(now - state.navigationStartTime);
    
    set((s) => ({
      events: [...s.events, { 
        label: `📡 Convex query complete: ${messageCount} msgs`, 
        timestamp: now, 
        delta,
        duration: queryDuration 
      }],
      convexQueryStart: null,
    }));
  },

  reset: () => {
    set({
      navigationStartTime: null,
      events: [],
      loadSource: null,
      threadId: null,
      convexQueryStart: null,
    });
  },
}));

export function DebugOverlay() {
  // Don't render anything in production
  if (!IS_DEV) return null;

  return <DebugOverlayContent />;
}

function DebugOverlayContent() {
  const { navigationStartTime, events, loadSource, threadId, reset } = useDebugStore();
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);

  // Find the content rendered event to get final time
  const contentRenderedEvent = events.find(e => e.label.includes("Content rendered"));
  const finalTime = contentRenderedEvent?.delta;
  const isComplete = !!contentRenderedEvent;

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 z-[9999] bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-50 hover:opacity-100"
      >
        🔍 Debug
      </button>
    );
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-[9999] bg-gray-900/95 text-white px-3 py-2 rounded-lg shadow-xl font-mono text-sm flex items-center gap-3">
        <span className={isComplete ? "text-green-400" : "text-yellow-400"}>
          {finalTime !== undefined ? `${finalTime}ms` : "..."}
        </span>
        {loadSource && (
          <span className={`text-xs px-1.5 py-0.5 rounded ${
            loadSource === "memory-cache" ? "bg-green-600" :
            loadSource === "indexeddb-cache" ? "bg-blue-600" :
            loadSource === "convex" ? "bg-orange-600" :
            "bg-gray-600"
          }`}>
            {loadSource}
          </span>
        )}
        <button onClick={() => setIsMinimized(false)} className="text-gray-400 hover:text-white">
          ↑
        </button>
        <button onClick={() => setIsVisible(false)} className="text-gray-400 hover:text-white">
          ✕
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-[9999] bg-gray-900/95 text-white p-4 rounded-lg shadow-xl max-w-sm max-h-80 overflow-auto font-mono text-xs">
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold text-sm">⚡ Thread Load Debug</span>
        <div className="flex gap-2">
          <button onClick={reset} className="text-gray-400 hover:text-white text-xs">
            Reset
          </button>
          <button onClick={() => setIsMinimized(true)} className="text-gray-400 hover:text-white">
            ↓
          </button>
          <button onClick={() => setIsVisible(false)} className="text-gray-400 hover:text-white">
            ✕
          </button>
        </div>
      </div>

      {threadId && (
        <div className="text-gray-500 mb-2 truncate text-[10px]">
          {threadId}
        </div>
      )}

      {/* Main metrics */}
      <div className="flex items-center gap-3 mb-3 pb-2 border-b border-gray-700">
        <div className={`text-xl font-bold ${isComplete ? "text-green-400" : "text-yellow-400"}`}>
          {finalTime !== undefined ? `${finalTime}ms` : "..."}
          {isComplete && <span className="ml-1 text-sm">✓</span>}
        </div>
        {loadSource && (
          <span className={`text-xs px-2 py-1 rounded ${
            loadSource === "memory-cache" ? "bg-green-600" :
            loadSource === "indexeddb-cache" ? "bg-blue-600" :
            loadSource === "convex" ? "bg-orange-600" :
            "bg-gray-600"
          }`}>
            {loadSource === "memory-cache" ? "💾 Memory" :
             loadSource === "indexeddb-cache" ? "💿 IndexedDB" :
             loadSource === "convex" ? "☁️ Convex" :
             "None"}
          </span>
        )}
      </div>

      {/* Events timeline */}
      <div className="space-y-1">
        {events.length === 0 ? (
          <div className="text-gray-500">
            Click a thread to start...
          </div>
        ) : (
          events.map((event, i) => (
            <div key={i} className="flex justify-between gap-2">
              <span className="text-gray-300 truncate flex-1">{event.label}</span>
              <div className="flex gap-2 flex-shrink-0">
                {event.duration !== undefined && (
                  <span className="text-purple-400">({event.duration}ms)</span>
                )}
                <span className={`${
                  event.delta < 50 ? "text-green-400" :
                  event.delta < 150 ? "text-yellow-400" :
                  "text-red-400"
                }`}>
                  +{event.delta}ms
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
