"use server";

import { withAuth } from "@workos-inc/authkit-nextjs";

import { workos } from "@/app/api/workos";

type UpdateCurrentUserProfileArgs = {
  firstName: string | null;
  lastName: string | null;
};

export async function updateCurrentUserProfile(
  args: UpdateCurrentUserProfileArgs,
): Promise<
  | {
      success: true;
      user: {
        id: string;
        email: string;
        firstName?: string | null;
        lastName?: string | null;
        profilePictureUrl?: string | null;
      };
    }
  | { success: false; error: string }
> {
  try {
    const { user } = await withAuth({ ensureSignedIn: true });

    const updated = await workos.userManagement.updateUser({
      userId: user.id,
      firstName: args.firstName ?? undefined,
      lastName: args.lastName ?? undefined,
    });

    return {
      success: true,
      user: {
        id: updated.id,
        email: updated.email,
        firstName: (updated as any).firstName ?? null,
        lastName: (updated as any).lastName ?? null,
        profilePictureUrl: (updated as any).profilePictureUrl ?? null,
      },
    };
  } catch (error: any) {
    console.error("Error updating current user profile:", error);
    return {
      success: false,
      error: error?.message ?? "Error desconocido",
    };
  }
}

