"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@workos-inc/authkit-nextjs/components";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const { signOut } = useAuth();

  useEffect(() => {
    const handleLogoutAndRedirect = async () => {
      try {
        // Sign out the user to force entitlements and roles to reload
        await signOut();
        // Redirect to sign-in page
        router.push("/sign-in");
      } catch (error) {
        console.error("Error during logout:", error);
        // Still redirect to sign-in even if logout fails
        router.push("/sign-in");
      }
    };

    handleLogoutAndRedirect();
  }, [router, signOut]);

  // Return minimal loading state while logout happens
  return null;
}
