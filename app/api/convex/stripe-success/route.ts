import { NextResponse } from "next/server";

/**
 * Server-side proxy to Convex /stripe-success. Previously ran syncStripeDataWithPeriod after Stripe Checkout success.
 * Stripe removed; replace with new provider's success callback when migrating.
 * Clients POST { "workosOrganizationId": "org_123" }; we forward to Convex with Authorization.
 */
export async function POST(req: Request) {
  try {
    // Parse incoming body
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON payload" },
        { status: 400, headers: { "cache-control": "no-store" } },
      );
    }

    const workosOrganizationId =
      typeof body === "object" && body !== null
        ? // @ts-expect-error runtime validation
          body.workosOrganizationId
        : undefined;

    if (!workosOrganizationId || typeof workosOrganizationId !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid workosOrganizationId" },
        { status: 400, headers: { "cache-control": "no-store" } },
      );
    }

    // Environment variables
    const convexHttp = process.env.CONVEX_HTTP;
    const secret = process.env.CONVEX_SYNC_SECRET;

    // Fallback: derive Convex base from NEXT_PUBLIC_CONVEX_URL by stripping /api/query
    let convexBase = convexHttp;
    if (!convexBase) {
      const publicConvexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
      if (publicConvexUrl) {
        convexBase = publicConvexUrl.replace("/api/query", "");
      }
    }

    if (!convexBase) {
      return NextResponse.json(
        { error: "Server misconfiguration: CONVEX_HTTP/NEXT_PUBLIC_CONVEX_URL not set" },
        { status: 500, headers: { "cache-control": "no-store" } },
      );
    }
    if (!secret) {
      return NextResponse.json(
        { error: "Server misconfiguration: CONVEX_SYNC_SECRET not set" },
        { status: 500, headers: { "cache-control": "no-store" } },
      );
    }

    // Forward to Convex /stripe-success with Authorization header
    const res = await fetch(`${convexBase}/stripe-success`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${secret}`,
      },
      body: JSON.stringify({ workosOrganizationId }),
      cache: "no-store",
    });

    const text = await res.text();
    let data: unknown;
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      data = { raw: text };
    }

    return NextResponse.json(data, {
      status: res.status,
      headers: {
        "cache-control": "no-store",
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unexpected error";
    return NextResponse.json(
      { error: message },
      { status: 500, headers: { "cache-control": "no-store" } },
    );
  }
}

// Optional: guard non-POST methods
export async function GET() {
  return NextResponse.json(
    { error: "Method Not Allowed" },
    { status: 405, headers: { Allow: "POST", "cache-control": "no-store" } },
  );
}
