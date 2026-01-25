"use client";

import { MembersListWithShell } from "./MembersListWithShell";
import { PaginatedOrganizationData } from "@/actions/getOrganizationMembers";

interface MembersContentProps {
  initialData: PaginatedOrganizationData;
  organizationId: string;
  currentUserId: string;
  totalMemberCount: number;
  seatQuantity: number | null;
  plan: "free" | "plus" | "pro" | "enterprise" | null;
}

export function MembersContent({
  initialData,
  organizationId,
  currentUserId,
  totalMemberCount,
  seatQuantity,
  plan,
}: MembersContentProps) {
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
