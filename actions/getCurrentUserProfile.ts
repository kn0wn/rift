"use server";

import { Effect } from "effect";
import {
  callWorkosApiEffect,
  getAuthenticatedUserEffect,
  workos,
} from "@/actions/settings/security/security-effect";

export type CurrentUserProfile = {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  profilePictureUrl?: string | null;
};

export type GetCurrentUserProfileResult =
  | {
      success: true;
      user: CurrentUserProfile;
    }
  | { success: false; error: string };

export async function getCurrentUserProfile(): Promise<GetCurrentUserProfileResult> {
  const effect = Effect.gen(function* () {
    const { user } = yield* getAuthenticatedUserEffect();

    const workosUser = yield* callWorkosApiEffect(
      "userManagement.getUser",
      () => workos.userManagement.getUser(user.id),
    );

    return {
      success: true as const,
      user: {
        id: workosUser.id,
        email: workosUser.email,
        firstName: (workosUser as any).firstName ?? null,
        lastName: (workosUser as any).lastName ?? null,
        profilePictureUrl: (workosUser as any).profilePictureUrl ?? null,
      },
    } satisfies GetCurrentUserProfileResult;
  }).pipe(
    Effect.catchAll((error) =>
      Effect.sync(() => {
        console.error("[profile] getCurrentUserProfile failed", { error });
        return {
          success: false as const,
          error:
            error instanceof Error
              ? error.message
              : "No se pudo cargar el perfil",
        } satisfies GetCurrentUserProfileResult;
      }),
    ),
  );

  return Effect.runPromise(effect);
}
