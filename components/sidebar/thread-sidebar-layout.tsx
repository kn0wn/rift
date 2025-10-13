import { ThreadSidebarHeader } from "./thread-sidebar-header";
import { ThreadListClient } from "./thread-list-client";
import { ThreadScrollContainer } from "./thread-scroll-container";
import { UserProfileSection } from "./user-profile-section";
import { Preloaded } from "convex/react";
import { api } from "@/convex/_generated/api";

interface ThreadSidebarLayoutProps {
  preloadedThreads?: Preloaded<typeof api.threads.getUserThreadsPaginatedSafe>;
}

export function ThreadSidebarLayout({ preloadedThreads }: ThreadSidebarLayoutProps) {
  return (
    <div className="h-full w-full bg-background dark:bg-popover-main dark:backdrop-blur-sm border-r border-[#EAEAEA] dark:border-border flex flex-col">
      {/* Header and Search */}
      <ThreadSidebarHeader />

      {/* Thread List with Search */}
      <ThreadScrollContainer>
        <ThreadListClient preloadedThreads={preloadedThreads} />
      </ThreadScrollContainer>

      {/* User Profile Section */}
      <UserProfileSection />
    </div>
  );
}
