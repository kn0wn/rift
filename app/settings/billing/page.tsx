import { Suspense } from "react";
import { withAuth } from "@workos-inc/authkit-nextjs";
import { hasPermissions } from "@/lib/permissions";
import { redirect } from "next/navigation";
import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { SettingsSection } from "@/components/settings/SettingsSection";
import { BillingContent } from "./BillingContent";
import { BillingSkeleton } from "./BillingSkeleton";

// Async server component that preloads data (Vercel best practice: async-suspense-boundaries)
// This allows the page shell to render immediately while data loads
async function BillingDataLoader() {
  const session = await withAuth();
  
  const preloadedBillingInfo = session?.accessToken
    ? await preloadQuery(
        api.organizations.getOrganizationBillingInfo,
        {},
        { token: session.accessToken }
      )
    : null;

  return <BillingContent preloadedBillingInfo={preloadedBillingInfo} />;
}

export default async function BillingPage() {
  // Permission check must happen before rendering (affects layout/redirect)
  const permissions = await hasPermissions(["MANAGE_BILLING"]);
  
  if (!permissions.MANAGE_BILLING) {
    redirect("/settings/profile");
  }

  return (
    <div className="py-6 px-4 md:py-12 md:px-12 flex flex-col max-w-4xl min-w-0 md:min-w-[520px] w-full min-h-full box-border">
      <SettingsSection
        title="Suscripción y Facturación"
        description="Gestiona el plan de tu organización y revisa tu historial de facturación."
      >
        <Suspense fallback={<BillingSkeleton />}>
          <BillingDataLoader />
        </Suspense>
      </SettingsSection>
    </div>
  );
}

