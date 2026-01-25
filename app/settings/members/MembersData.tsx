import { Suspense, cache } from "react";
import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { getPaginatedOrganizationMembers, getOrganizationMemberCount } from "@/actions/getOrganizationMembers";
import { MembersContent } from "./MembersContent";
import { MembersSkeleton } from "./MembersSkeleton";

interface MembersDataProps {
  organizationId: string;
  currentUserId: string;
  accessToken: string;
}

const getCachedMembers = cache((organizationId: string) => 
  getPaginatedOrganizationMembers(organizationId, 50)
);

const getCachedMemberCount = cache((organizationId: string) => 
  getOrganizationMemberCount(organizationId).catch(() => 0)
);

async function MembersDataInner({ organizationId, currentUserId, accessToken }: MembersDataProps) {
  const [initialData, totalMemberCount] = await Promise.all([
    getCachedMembers(organizationId),
    getCachedMemberCount(organizationId),
  ]);

  const [preloadedSeats, preloadedPlan] = await Promise.all([
    preloadQuery(
      api.organizations.getOrganizationSeats,
      {
        workos_id: organizationId,
        secret: process.env.CONVEX_SECRET_TOKEN!,
      },
      { token: accessToken }
    ).catch(() => null),
    preloadQuery(
      api.organizations.getOrganizationPlan,
      {
        workos_id: organizationId,
        secret: process.env.CONVEX_SECRET_TOKEN!,
      },
      { token: accessToken }
    ).catch(() => null),
  ]);

  return (
    <MembersContent
      preloadedSeats={preloadedSeats}
      preloadedPlan={preloadedPlan}
      initialData={initialData}
      organizationId={organizationId}
      currentUserId={currentUserId}
      totalMemberCount={totalMemberCount}
    />
  );
}

export function MembersData(props: MembersDataProps) {
  return (
    <Suspense fallback={<MembersSkeleton />}>
      <MembersDataInner {...props} />
    </Suspense>
  );
}
