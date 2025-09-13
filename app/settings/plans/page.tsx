import { SettingsSection, SettingRow } from "@/components/settings";
import Pricing from "@/components/landing/subcomponents/pricing";
import { withAuth } from "@workos-inc/authkit-nextjs";
import { BillingButton } from "@/components/billing-button";

export default async function PlansPage() {
  const { user } = await withAuth();
  return (
    <div className="pt-12 pb-12 pl-12 pr-12 flex flex-col max-w-4xl min-w-[520px] w-full min-h-full box-border">
      <h1 className="text-2xl font-semibold text-gray-900 mb-2">Planes</h1>
      <p className="text-gray-600 mb-8">
        Elige el plan que mejor funcione para tu espacio de trabajo.
      </p>

      <div className="space-y-6">
        <Pricing
          user={user}
          showComparisonTable={false}
          containerWidth="wide"
        />
      </div>

      {/* Billing Management */}
      <div className="mt-8">
        <SettingsSection
          title="Facturación"
          description="Gestiona tu información de facturación y métodos de pago."
        >
          <div className="space-y-4">
            <SettingRow label="Gestión de Facturación">
              <BillingButton path="plans">Gestionar Facturación</BillingButton>
            </SettingRow>
          </div>
        </SettingsSection>
      </div>
    </div>
  );
}
