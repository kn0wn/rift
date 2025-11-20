"use server";

import { workos } from "@/app/api/workos";

export async function inviteUser(organizationId: string, email: string, roleSlug?: string) {
  try {
    await workos.userManagement.sendInvitation({
      email,
      organizationId,
      roleSlug,
    });
    return { success: true };
  } catch (error: any) {
    console.error("Error sending invitation:", error);
    return { success: false, error: error.message };
  }
}
