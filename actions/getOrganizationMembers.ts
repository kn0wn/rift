import { workos } from "@/app/api/workos";
import { OrganizationMembership, User } from "@workos-inc/node";

export interface OrganizationMembershipWithUser extends OrganizationMembership {
  user: User | null;
}

export async function getOrganizationMembers(organizationId: string): Promise<OrganizationMembershipWithUser[]> {
  try {
    const [memberships, users] = await Promise.all([
      getAllMemberships(organizationId),
      getAllUsers(organizationId)
    ]);

    const userMap = new Map<string, User>();
    users.forEach(user => {
      userMap.set(user.id, user);
    });

    return memberships.map(membership => ({
      ...membership,
      user: userMap.get(membership.userId) || null
    }));

  } catch (error) {
    console.error("Error fetching organization members:", error);
    return [];
  }
}

async function getAllMemberships(organizationId: string) {
  let allMembers: OrganizationMembership[] = [];
  let after: string | undefined = undefined;

  do {
    const { data, listMetadata } = await workos.userManagement.listOrganizationMemberships({
      organizationId,
      after,
      limit: 100,
    });
    
    allMembers = allMembers.concat(data);
    after = listMetadata.after;
  } while (after);

  return allMembers;
}

async function getAllUsers(organizationId: string) {
  let allUsers: User[] = [];
  let after: string | undefined = undefined;

  do {
    const { data, listMetadata } = await workos.userManagement.listUsers({
      organizationId,
      after,
      limit: 100,
    });
    
    allUsers = allUsers.concat(data);
    after = listMetadata.after;
  } while (after);

  return allUsers;
}
