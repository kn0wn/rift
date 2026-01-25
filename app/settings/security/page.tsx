import { SettingsSection, SettingsDivider } from "@/components/settings";
import { withAuth } from "@workos-inc/authkit-nextjs";
import { SecuritySettingsCard, SecuritySessionsClient } from "@/components/settings/security";

export default async function SecurityPage() {
  const { sessionId } = await withAuth({ ensureSignedIn: true });

  return (
    <div className="py-6 px-4 md:py-12 md:px-12 flex flex-col max-w-4xl min-w-0 md:min-w-[520px] w-full min-h-full box-border">
      <SettingsSection
        title="Configuración de Seguridad"
        description="Gestiona tu contraseña y métodos de autenticación."
      >
        <SecuritySettingsCard />
      </SettingsSection>

      <SettingsDivider />

      <SettingsSection
        title="Sesiones Activas"
        description="Gestiona tus preferencias de seguridad y configuración de autenticación."
      >
        <div className="p-6 bg-white dark:bg-popover-secondary rounded-lg border border-gray-200 dark:border-border shadow-sm">
          <SecuritySessionsClient initialCurrentSessionId={sessionId} />
        </div>
      </SettingsSection>
    </div>
  );
}
