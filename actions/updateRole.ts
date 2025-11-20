"use server";

import { workos } from "@/app/api/workos";

export async function updateRole(membershipId: string, roleSlug: string) {
  try {
    await workos.userManagement.updateOrganizationMembership(membershipId, {
      roleSlug,
    });
    return { success: true };
  } catch (error: any) {
    console.error("Error updating role:", error);
    return { success: false, error: error.message };
  }
}

