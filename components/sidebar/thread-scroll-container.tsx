"use client";

import { useRef, useEffect } from "react";

interface ThreadScrollContainerProps {
  children: React.ReactNode;
}

export function ThreadScrollContainer({ children }: ThreadScrollContainerProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const hideScrollbarTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle scrollbar auto-hide
  const handleScrollContainerMouseEnter = () => {
    if (hideScrollbarTimeoutRef.current) {
      clearTimeout(hideScrollbarTimeoutRef.current);
      hideScrollbarTimeoutRef.current = null;
    }

    if (scrollContainerRef.current) {
      scrollContainerRef.current.classList.remove("scrollbar-hidden");
    }
  };

  const handleScrollContainerMouseLeave = () => {
    if (scrollContainerRef.current) {
      // Hide scrollbar after 2 seconds
      hideScrollbarTimeoutRef.current = setTimeout(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.classList.add("scrollbar-hidden");
        }
      }, 2000);
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hideScrollbarTimeoutRef.current) {
        clearTimeout(hideScrollbarTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={scrollContainerRef}
      className="flex-1 overflow-y-auto sidebar-scroll-container scrollbar-hidden"
      onMouseEnter={handleScrollContainerMouseEnter}
      onMouseLeave={handleScrollContainerMouseLeave}
    >
      {children}
    </div>
  );
}
