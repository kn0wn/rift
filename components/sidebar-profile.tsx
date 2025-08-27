"use client";

import { Avatar, AvatarImage } from "./ui/avatar";

export default function SidebarProfile() {
  return (
    <button className="border-t">
      <div className="hover:bg-sidebar-border-light mb-2 flex cursor-pointer items-center gap-3 rounded-lg px-3 py-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src="/avatar.png" />
        </Avatar>

        <div className="flex flex-col items-start justify-center">
          <h4 className="text-sidebar-logo text-sm font-semibold">
            Guest User
          </h4>
          <span className="text-sidebar-text-muted text-xs">Free</span>
        </div>
      </div>
    </button>
  );
}
