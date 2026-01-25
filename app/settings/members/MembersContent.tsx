"use client";

import { usePreloadedQuery, Preloaded } from "convex/react";
import { api } from "@/convex/_generated/api";
import { MembersListWithShell } from "./MembersListWithShell";
import { PaginatedOrganizationData } from "@/actions/getOrganizationMembers";

interface MembersContentProps {
  preloadedSeats: Preloaded<typeof api.organizations.getOrganizationSeats> | null;
  preloadedPlan: Preloaded<typeof api.organizations.getOrganizationPlan> | null;
  initialData: PaginatedOrganizationData;
  organizationId: string;
  currentUserId: string;
  totalMemberCount: number;
}

export function MembersContent({
  preloadedSeats,
  preloadedPlan,
  initialData,
  organizationId,
  currentUserId,
  totalMemberCount,
}: MembersContentProps) {
  // Use preloaded queries for reactivity
  const seatQuantity = preloadedSeats
    ? usePreloadedQuery(preloadedSeats)
    : null;
  const plan = preloadedPlan
    ? usePreloadedQuery(preloadedPlan)
    : null;

  return (
    <MembersListWithShell
      initialData={initialData}
      organizationId={organizationId}
      currentUserId={currentUserId}
      seatQuantity={seatQuantity}
      totalMemberCount={totalMemberCount}
      plan={plan}
    />
  );
}
