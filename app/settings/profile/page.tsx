import { Suspense } from "react";
import { SettingsSection, SettingsDivider } from "@/components/settings";
import { AdvancedDebugWidget } from "@/components/settings/widgets/AdvancedDebugWidget";
import { ProfileFormServer } from "@/components/settings/ProfileFormServer";
import { ProfileDisplay, ProfileFormContent } from "@/components/settings/ProfileFormClient";
import { Skeleton } from "@/components/ai/ui/skeleton";
import { Button } from "@/components/ai/ui/button";

const profileSkeleton = (
  <div className="p-6 bg-white dark:bg-popover-secondary rounded-lg border border-gray-200 dark:border-border shadow-sm">
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Skeleton className="h-16 w-16 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Button
          type="button"
          disabled
          variant="accent"
          className="gap-2 border border-border/60 shadow-sm shadow-black/5 dark:shadow-black/30 text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Editar perfil
        </Button>
      </div>
    </div>
  </div>
);

export default function ProfilePage() {
  return (
    <div className="py-6 px-4 md:py-12 md:px-12 flex flex-col max-w-4xl min-w-0 md:min-w-[520px] w-full min-h-full box-border">
      <SettingsSection
        title="Gestión de Perfil"
        description="Gestiona tu información personal y preferencias."
      >
        <Suspense fallback={profileSkeleton}>
          <ProfileFormServer>
            <div className="p-6 bg-white dark:bg-popover-secondary rounded-lg border border-gray-200 dark:border-border shadow-sm">
              <div className="space-y-4">
                <ProfileDisplay />
                <ProfileFormContent />
              </div>
            </div>
          </ProfileFormServer>
        </Suspense>
      </SettingsSection>

      <SettingsDivider />

      {process.env.NODE_ENV !== "production" && (
        <SettingsSection
          title="Avanzado"
          description="Información de depuración."
        >
          <AdvancedDebugWidget />
        </SettingsSection>
      )}
    </div>
  );
}
