import { SettingsSection } from "@/components/settings";
import { FilesClient } from "@/components/settings/files-client";
import { getAccessToken } from "@/lib/auth";

export default async function ArchivosPage() {
  await getAccessToken();

  return (
    <div className="pt-12 pb-12 pl-12 pr-12 flex flex-col max-w-4xl min-w-[520px] w-full min-h-full box-border bg-background dark:bg-popover-main">
      <SettingsSection
        title="Archivos Adjuntos"
        description="Accede a la lista de archivos que has subido en tus conversaciones."
      >
        <FilesClient />
      </SettingsSection>
    </div>
  );
}
