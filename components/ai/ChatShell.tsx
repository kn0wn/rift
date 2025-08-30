"use client";

import { useCallback, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type ChatShellProps = {
  children: React.ReactNode;
  className?: string;
  sidebar?: React.ReactNode;
};

export default function ChatShell({ children, className, sidebar }: ChatShellProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  const sidebarWidth = 280; // px

  const sidebarStyle = useMemo<React.CSSProperties>(
    () => ({ width: isOpen ? sidebarWidth : 0 }),
    [isOpen]
  );

  return (
    <div className="h-screen w-full overflow-hidden">
      <div className="flex h-full w-full">
        <aside
          className={cn(
            "relative hidden shrink-0 border-r bg-background transition-[width] duration-200 ease-in-out md:block",
          )}
          style={sidebarStyle}
        >
          <div className="absolute inset-0 overflow-y-auto">
            {isOpen ? sidebar : null}
          </div>
        </aside>

        <main className={cn("flex h-full flex-1 flex-col", className)}>
          <div className="flex items-center gap-2 p-3">
            <button
              type="button"
              onClick={toggle}
              aria-pressed={isOpen}
              className={cn(
                "inline-flex h-9 items-center rounded-md border px-3 text-sm transition-colors",
                "hover:bg-muted"
              )}
            >
              {isOpen ? "Hide sidebar" : "Show sidebar"}
            </button>
          </div>

          <div className={cn("flex-1 overflow-hidden")}> 
            {/* Full-width scroll container; pages/components will center content */}
            <div className="flex h-full flex-col px-4">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 