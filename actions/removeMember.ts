"use server";

import { workos } from "@/app/api/workos";

export async function removeMember(membershipId: string) {
  try {
    await workos.userManagement.deleteOrganizationMembership(membershipId);
    return { success: true };
  } catch (error: any) {
    console.error("Error removing member:", error);
    return { success: false, error: error.message };
  }
}

