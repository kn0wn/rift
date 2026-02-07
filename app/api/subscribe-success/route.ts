import { withAuth } from "@workos-inc/authkit-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { trackDubSale } from "@/lib/dub-tracking";
import { getAllowedReturnUrl } from "@/lib/allowed-return-url";

/** Plan amounts in cents (MXN) */
const PLAN_AMOUNTS: Record<string, number> = {
  plus: 19000,
  pro: 49000,
};

/**
 * GET /api/subscribe-success
 *
 * Intermediate route that Autumn redirects to after a successful checkout.
 * Fires a "Subscription Completed" sale event in Dub and then redirects
 * to the original success URL (e.g. /chat).
 *
 * Query params:
 *  - plan: the plan slug (plus | pro)
 *  - redirect: the final destination URL
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const plan = searchParams.get("plan")?.toLowerCase() ?? null;
  const redirectUrl = getAllowedReturnUrl(
    searchParams.get("redirect") ?? "/chat",
  );

  try {
    const session = await withAuth();
    const userId = session?.user?.id;

    if (userId && plan) {
      const amount = PLAN_AMOUNTS[plan] ?? 0;
      await trackDubSale({
        userId,
        eventName: "Subscription Completed",
        amount,
        currency: "MXN",
        metadata: {
          plan,
          orgId: session.organizationId ?? "",
        },
      });
    }
  } catch (err) {
    // Never block the redirect — just log the error
    console.error("[subscribe-success] Dub tracking error:", err);
  }

  return NextResponse.redirect(redirectUrl);
}
