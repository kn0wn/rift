"use server";

import { requireAuth } from "@/lib/auth-server";
import { workos } from "@/app/api/workos";
type WidgetScope = 'widgets:users-table:manage' | 'widgets:sso:manage' | 'widgets:domain-verification:manage' | 'widgets:api-keys:manage';

export type GetWorkOSWidgetTokenResult =
  | { success: true; token: string }
  | { success: false; error: string };

export async function getWorkOSWidgetToken(
  organizationId: string,
  userId: string,
  scopes: WidgetScope[]
): Promise<GetWorkOSWidgetTokenResult> {
  try {
    await requireAuth();
    
    const token = await workos.widgets.getToken({
      organizationId,
      userId,
      scopes,
    });
    
    return { success: true, token };
  } catch (error) {
    console.error("[widget-token] Failed to get WorkOS widget token", { error });
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to get widget token",
    };
  }
}
