"use client";

import { useAuth } from "@workos-inc/authkit-nextjs/components";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ai/ui/avatar";
import { Authenticated, Unauthenticated } from "convex/react";
import Link from "next/link";
import { Button } from "@/components/ai/ui/button";
import Image from "next/image";

export function UserProfileSection() {
  const { user } = useAuth();

  return (
    <div className="border-t border-border p-4 flex-shrink-0">
      <Authenticated>
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={user?.profilePictureUrl || "/avatar.png"}
              alt={user?.firstName || user?.email || "User"}
            />
            <AvatarFallback>
              <Image
                src="/avatar.png"
                alt="Default avatar"
                width={32}
                height={32}
                className="w-full h-full object-cover"
              />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">
              {user?.firstName && user?.lastName
                ? `${user.firstName} ${user.lastName}`
                : user?.firstName || user?.email || "User"}
            </p>
            <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
              pro
            </span>
          </div>
        </div>
      </Authenticated>
      
      <Unauthenticated>
        <div className="flex items-center justify-center px-2">
          <Link href="/sign-in" className="w-full">
            <Button size="sm" className="w-full h-10">
              Login
            </Button>
          </Link>
        </div>
      </Unauthenticated>
    </div>
  );
}
