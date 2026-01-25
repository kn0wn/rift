import { Suspense } from "react";
import { withAuth } from "@workos-inc/authkit-nextjs";
import { hasPermission } from "@/lib/permissions";
import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { SettingsSection } from "@/components/settings/SettingsSection";
import { MembersData } from "./MembersData";
import { MembersSkeleton } from "./MembersSkeleton";
import { AuditLogsButton } from "./AuditLogsButton";
import "./table.css";

async function AuditLogsButtonContent({ organizationId, accessToken }: { organizationId: string; accessToken: string }) {
  // Preload plan query for reactivity
  const preloadedPlan = await preloadQuery(
    api.organizations.getCurrentOrganizationPlan,
    {},
    { token: accessToken }
  ).catch(() => null);

  return <AuditLogsButton organizationId={organizationId} preloadedPlan={preloadedPlan} />;
}

export default async function MembersPage() {
  const { user, accessToken, organizationId } = await withAuth({
    ensureSignedIn: true,
  });

  if (!organizationId) {
    return (
      <div className="py-6 px-4 md:py-12 md:px-12 flex flex-col max-w-4xl min-w-0 md:min-w-[520px] w-full min-h-full box-border">
        <SettingsSection
          title="Gestión de Miembros"
          description="Gestiona los miembros de tu organización."
        >
          <div className="p-6 bg-white dark:bg-popover-secondary rounded-lg border border-gray-200 dark:border-border shadow-sm">
            <p className="text-sm text-gray-500 dark:text-text-muted">
              No se encontró organización
            </p>
          </div>
        </SettingsSection>
      </div>
    );
  }

  const userHasPermission = await hasPermission("WIDGETS_USERS_TABLE_MANAGE");
  const canViewAuditLogs = await hasPermission("AUDIT_LOGS");

  // If the user has NEITHER permission, show access denied
  if (!userHasPermission && !canViewAuditLogs) {
    return (
      <div className="py-6 px-4 md:py-12 md:px-12 flex flex-col max-w-4xl min-w-0 md:min-w-[520px] w-full min-h-full box-border">
        <SettingsSection
          title="Gestión de Miembros"
          description="Gestiona los miembros de tu organización."
        >
          <div className="p-6 bg-white dark:bg-popover-secondary rounded-lg border border-gray-200 dark:border-border shadow-sm">
            <p className="text-sm text-gray-500 dark:text-text-muted">
              No tienes autorización para acceder a esta página
            </p>
          </div>
        </SettingsSection>
      </div>
    );
  }

  return (
    <div className="py-6 px-4 md:py-12 md:px-12 flex flex-col max-w-4xl min-w-0 md:min-w-[520px] w-full min-h-full box-border">
      <SettingsSection
        title="Gestión de Miembros"
        description="Gestiona los miembros de tu organización."
      >
        {userHasPermission ? (
          <MembersData
            organizationId={organizationId}
            currentUserId={user.id}
            accessToken={accessToken}
          />
        ) : (
          <div className="p-6 bg-white dark:bg-popover-secondary rounded-lg border border-gray-200 dark:border-border shadow-sm">
            <p className="text-sm text-gray-500 dark:text-text-muted">
              No tienes permisos para ver la lista de miembros.
            </p>
          </div>
        )}
      </SettingsSection>

      {canViewAuditLogs && (
        <SettingsSection
          title="Audit Logs"
          description="Accede al historial de eventos de tu organización."
          className="mt-8"
        >
          <Suspense fallback={null}>
            <AuditLogsButtonContent organizationId={organizationId} accessToken={accessToken} />
          </Suspense>
        </SettingsSection>
      )}
    </div>
  );
}
