"use server";

import { workos } from "@/app/api/workos";
import { getOrganizationMemberCount } from "./getOrganizationMembers";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

export async function inviteUser(organizationId: string, email: string, roleSlug?: string) {
  try {
    // Verify seat limits
    const seatQuantity = await fetchQuery(api.organizations.getOrganizationSeats, {
      workos_id: organizationId,
      secret: process.env.CONVEX_SECRET_TOKEN!,
    });
    
    if (seatQuantity !== null && seatQuantity !== undefined) {
        const currentCount = await getOrganizationMemberCount(organizationId);
        // Check if adding 1 more would exceed limit (currentCount includes active + pending)
        // So if currentCount >= seatQuantity, we cannot add more.
        if (currentCount >= seatQuantity) {
            return { success: false, error: `Has alcanzado el límite de ${seatQuantity} asientos de tu organización.` };
        }
    }

    await workos.userManagement.sendInvitation({
      email,
      organizationId,
      roleSlug,
    });
    return { success: true };
  } catch (error: any) {
    const errorMessage = error.message || "Error desconocido al enviar invitación";
    
    if (errorMessage.includes("already invited") || error.code === "invitation_already_exists") {
       return { success: false, error: "El correo electrónico ya ha sido invitado." };
    }
    
    console.error("Error sending invitation:", error);
    return { success: false, error: errorMessage };
  }
}
