"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";

export interface UseStickToBottomOptions {
  /**
   * Offset in pixels from the bottom to consider "at bottom"
   * @default 50
   */
  offset?: number;
}

export interface UseStickToBottomReturn {
  /** Ref to attach to the scroll container */
  scrollRef: RefObject<HTMLElement | null>;
  /** Ref to attach to the content container (for ResizeObserver) */
  contentRef: RefObject<HTMLElement | null>;
  /** Whether the user is currently at/near the bottom */
  isAtBottom: boolean;
  /** Whether the user has manually scrolled up (escaped) */
  escapedFromLock: boolean;
  /** Scroll to bottom with specified behavior */
  scrollToBottom: (behavior?: "instant" | "smooth") => void;
  /** Mark that initial scroll has been done (call after instant scroll on load) */
  markInitialScrollDone: () => void;
  /** Reset state for a new thread/content */
  reset: () => void;
}

const DEFAULT_OFFSET = 50;

/**
 * Custom hook for stick-to-bottom behavior in chat interfaces.
 * 
 * Features:
 * - Instant scroll on initial load (caller must call scrollToBottom('instant') then markInitialScrollDone())
 * - Smooth scroll as content grows (during streaming) - only after initial scroll is done
 * - Escape detection when user scrolls up
 * - Auto re-engage when user scrolls back to bottom
 */
export function useStickToBottom(
  options: UseStickToBottomOptions = {}
): UseStickToBottomReturn {
  const { offset = DEFAULT_OFFSET } = options;

  const scrollRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLElement | null>(null);

  // State
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [escapedFromLock, setEscapedFromLock] = useState(false);

  // Use refs to avoid recreating ResizeObserver when state changes
  const isAtBottomRef = useRef(true);
  const escapedFromLockRef = useRef(false);

  // Keep refs in sync with state
  isAtBottomRef.current = isAtBottom;
  escapedFromLockRef.current = escapedFromLock;

  // Track last scroll position to detect scroll direction
  const lastScrollTopRef = useRef<number>(0);
  // Track if we're programmatically scrolling (to ignore those events)
  const isProgrammaticScrollRef = useRef(false);
  // Track if initial scroll has been done - ResizeObserver should not scroll until this is true
  const initialScrollDoneRef = useRef(false);

  /**
   * Calculate if we're at/near the bottom
   */
  const checkIsAtBottom = useCallback(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return true;

    const { scrollTop, scrollHeight, clientHeight } = scrollEl;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
    return distanceFromBottom <= offset;
  }, [offset]);

  /**
   * Mark that the initial scroll has been done
   * This allows the ResizeObserver to start smooth-scrolling on content growth
   */
  const markInitialScrollDone = useCallback(() => {
    initialScrollDoneRef.current = true;
  }, []);

  /**
   * Reset state for a new thread
   */
  const reset = useCallback(() => {
    initialScrollDoneRef.current = false;
    setIsAtBottom(true);
    setEscapedFromLock(false);
  }, []);

  /**
   * Scroll to the bottom of the container
   */
  const scrollToBottom = useCallback((behavior: "instant" | "smooth" = "smooth") => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    isProgrammaticScrollRef.current = true;
    setEscapedFromLock(false);
    setIsAtBottom(true);

    const targetScrollTop = scrollEl.scrollHeight - scrollEl.clientHeight;

    if (behavior === "instant") {
      scrollEl.scrollTop = targetScrollTop;
      // Update lastScrollTop so we don't detect this as user scroll
      lastScrollTopRef.current = targetScrollTop;
      isProgrammaticScrollRef.current = false;
    } else {
      scrollEl.scrollTo({
        top: targetScrollTop,
        behavior: "smooth",
      });
      // Reset flag after smooth scroll completes (estimate)
      setTimeout(() => {
        isProgrammaticScrollRef.current = false;
        lastScrollTopRef.current = scrollEl.scrollTop;
      }, 500);
    }
  }, []);

  /**
   * Handle scroll events to detect user escape
   */
  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    const handleScroll = () => {
      // Ignore programmatic scrolls
      if (isProgrammaticScrollRef.current) {
        lastScrollTopRef.current = scrollEl.scrollTop;
        return;
      }

      const currentScrollTop = scrollEl.scrollTop;
      const lastScrollTop = lastScrollTopRef.current;
      const isScrollingUp = currentScrollTop < lastScrollTop;
      const atBottom = checkIsAtBottom();

      // User scrolled up - escape from lock
      if (isScrollingUp && !atBottom) {
        setEscapedFromLock(true);
        setIsAtBottom(false);
      }

      // User scrolled back to bottom - re-engage
      if (atBottom) {
        setEscapedFromLock(false);
        setIsAtBottom(true);
      } else {
        setIsAtBottom(false);
      }

      lastScrollTopRef.current = currentScrollTop;
    };

    // Also handle wheel events for immediate escape detection
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY < 0 && !isProgrammaticScrollRef.current) {
        // User is scrolling up with wheel
        const atBottom = checkIsAtBottom();
        if (!atBottom) {
          setEscapedFromLock(true);
          setIsAtBottom(false);
        }
      }
    };

    scrollEl.addEventListener("scroll", handleScroll, { passive: true });
    scrollEl.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      scrollEl.removeEventListener("scroll", handleScroll);
      scrollEl.removeEventListener("wheel", handleWheel);
    };
  }, [checkIsAtBottom]);

  /**
   * ResizeObserver to auto-scroll when content grows
   * Only scrolls AFTER initial scroll is done (to avoid overriding instant with smooth)
   * Uses refs to avoid recreating observer when state changes
   */
  useEffect(() => {
    const contentEl = contentRef.current;
    const scrollEl = scrollRef.current;
    if (!contentEl || !scrollEl) return;

    let previousHeight = contentEl.offsetHeight;

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;

      const currentHeight = entry.contentRect.height;
      const heightDifference = currentHeight - previousHeight;

      // Only auto-scroll if:
      // 1. Content grew (positive difference)
      // 2. User is at bottom (not escaped) - use refs for current values
      if (heightDifference > 0) {
        if (isAtBottomRef.current && !escapedFromLockRef.current) {
          // Use instant scroll during initial load phase, smooth after
          const behavior = initialScrollDoneRef.current ? "smooth" : "instant";
          scrollToBottom(behavior);
        }
      }

      previousHeight = currentHeight;
    });

    resizeObserver.observe(contentEl);

    return () => {
      resizeObserver.disconnect();
    };
  }, [scrollToBottom]); // Only depends on scrollToBottom which is stable

  return {
    scrollRef,
    contentRef,
    isAtBottom,
    escapedFromLock,
    scrollToBottom,
    markInitialScrollDone,
    reset,
  };
}
