/**
 * Create API route to refresh WorkOS session explicitly after Stripe return
 *
 * This endpoint forces an immediate session refresh using AuthKit's refreshSession.
 * It’s useful right after returning from Stripe so the new JWT reflects updated
 * roles/entitlements without signing the user out and back in.
 *
 * Usage (client):
 *   await fetch('/api/auth/refresh', { method: 'POST' })
 *   // optionally pass an organization to switch context on refresh:
 *   await fetch('/api/auth/refresh?organization_id=org_123', { method: 'POST' })
 *   // or in request body: { "organizationId": "org_123" }
 */

import { NextResponse } from "next/server";
import { refreshSession } from "@workos-inc/authkit-nextjs";

type RefreshBody = {
  organizationId?: string | null;
};

export async function POST(req: Request) {
  try {
    // Prefer body payload, fall back to query param
    let body: RefreshBody | null = null;
    try {
      body = await req.json();
    } catch {
      // ignore JSON parse errors (no body sent)
    }

    const url = new URL(req.url);
    const organizationIdFromQuery =
      url.searchParams.get("organization_id") || url.searchParams.get("orgId");

    const organizationId =
      body?.organizationId ?? organizationIdFromQuery ?? undefined;

    // This will:
    // - validate the current session
    // - refresh the access token
    // - rotate cookies as needed
    // - optionally switch org if organizationId is provided
    const session = await refreshSession({
      ensureSignedIn: true,
      organizationId,
    });

    // Return minimal info; UI can refetch user/entitlements as needed
    return NextResponse.json(
      {
        ok: true,
        user: session.user
          ? {
              id: session.user.id,
              email: session.user.email,
              firstName: session.user.firstName,
              lastName: session.user.lastName,
            }
          : null,
        organizationId: session.organizationId ?? null,
        role: session.role ?? null,
        permissions: session.permissions ?? [],
      },
      {
        status: 200,
        headers: {
          "cache-control": "no-store",
        },
      },
    );
  } catch (err: unknown) {
    // When there is no valid session or refresh fails, respond 401
    const message =
      err instanceof Error ? err.message : "Failed to refresh session";
    return NextResponse.json(
      { ok: false, error: message },
      {
        status: 401,
        headers: {
          "cache-control": "no-store",
        },
      },
    );
  }
}
