import { NextRequest, NextResponse } from "next/server";

const CONVEX_SITE_URL = process.env.CONVEX_SITE_URL || process.env.NEXT_PUBLIC_CONVEX_URL!.replace('.convex.cloud', '.convex.site');
const CONVEX_ADMIN_TOKEN = process.env.CONVEX_ADMIN_TOKEN!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { organizationId, cancelType, subscriptionStatus } = body;

    if (!organizationId || !cancelType || !subscriptionStatus) {
      return NextResponse.json(
        { error: "Missing organizationId, cancelType, or subscriptionStatus" },
        { status: 400 }
      );
    }

    if (cancelType !== "now" && cancelType !== "end_of_cycle") {
      return NextResponse.json(
        { error: "Invalid cancelType. Must be 'now' or 'end_of_cycle'" },
        { status: 400 }
      );
    }

    const validStatuses = ["active", "canceled", "incomplete", "incomplete_expired", "past_due", "trialing", "unpaid", "none"];
    if (!validStatuses.includes(subscriptionStatus)) {
      return NextResponse.json(
        { error: "Invalid subscriptionStatus" },
        { status: 400 }
      );
    }

    // Choose the appropriate endpoint based on cancelType
    const endpoint = cancelType === "now" 
      ? "/admin/organizations/cancel-now"
      : "/admin/organizations/cancel-at-cycle-end";

    const response = await fetch(`${CONVEX_SITE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${CONVEX_ADMIN_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ organizationId, subscriptionStatus }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.error || "Failed to cancel subscription" },
        { status: response.status }
      );
    }

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Admin cancel subscription API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
