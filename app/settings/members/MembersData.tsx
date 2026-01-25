"use client";

import { useState, useEffect } from "react";
import { getPaginatedOrganizationMembers, getOrganizationMemberCount, getOrganizationSeatsAndPlan } from "@/actions/getOrganizationMembers";
import { MembersContent } from "./MembersContent";
import { MembersSkeleton } from "./MembersSkeleton";

interface MembersDataProps {
  organizationId: string;
  currentUserId: string;
}

export function MembersData({ organizationId, currentUserId }: MembersDataProps) {
  const [initialData, setInitialData] = useState<Awaited<ReturnType<typeof getPaginatedOrganizationMembers>> | null>(null);
  const [totalMemberCount, setTotalMemberCount] = useState<number | null>(null);
  const [seatQuantity, setSeatQuantity] = useState<number | null>(null);
  const [plan, setPlan] = useState<"free" | "plus" | "pro" | "enterprise" | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      setIsLoading(true);
      try {
        const [data, count, seatsAndPlan] = await Promise.all([
          getPaginatedOrganizationMembers(organizationId, 50),
          getOrganizationMemberCount(organizationId).catch(() => 0),
          getOrganizationSeatsAndPlan(organizationId).catch(() => ({ seatQuantity: null, plan: null })),
        ]);
        
        if (!cancelled) {
          setInitialData(data);
          setTotalMemberCount(count);
          setSeatQuantity(seatsAndPlan.seatQuantity);
          setPlan(seatsAndPlan.plan);
        }
      } catch (error) {
        console.error("Failed to load members data:", error);
        if (!cancelled) {
          setInitialData({ members: [], invitations: [], nextCursor: null, prevCursor: null });
          setTotalMemberCount(0);
          setSeatQuantity(null);
          setPlan(null);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadData();

    return () => {
      cancelled = true;
    };
  }, [organizationId]);

  if (isLoading || initialData === null || totalMemberCount === null) {
    return <MembersSkeleton />;
  }

  return (
    <MembersContent
      initialData={initialData}
      organizationId={organizationId}
      currentUserId={currentUserId}
      totalMemberCount={totalMemberCount}
      seatQuantity={seatQuantity}
      plan={plan}
    />
  );
}
