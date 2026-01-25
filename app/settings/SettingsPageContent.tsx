"use client";

import {
  SettingsSection,
  StatusBadge,
  SettingRow,
  SettingsDivider,
} from "@/components/settings";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useEffect, startTransition } from "react";
import { useRouter } from "next/navigation";

interface SettingsPageContentProps {}

export default function SettingsPageContent({}: SettingsPageContentProps) {
  const router = useRouter();

  useEffect(() => {
    // Redirect to /settings/usage when accessing /settings (non-urgent update)
    startTransition(() => {
      router.push("/settings/usage");
    });
  }, [router]);

  return null;
}
