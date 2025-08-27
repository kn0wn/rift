"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function SignOutButton() {
  const handleSignOut = () => {
    // Since we removed authentication, this just clears local data
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  };

  return (
    <Button
      onClick={handleSignOut}
      variant="outline"
      size="sm"
      className="w-full"
    >
      <LogOut className="mr-2 h-4 w-4" />
      Clear Data & Restart
    </Button>
  );
}
