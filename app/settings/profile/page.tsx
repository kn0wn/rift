import { SettingsSection } from "@/components/settings";
import { withAuth } from "@workos-inc/authkit-nextjs";
import { workos } from "@/app/api/workos";
import { ProfileWidget } from "@/components/settings/widgets/ProfileWidget";

export default async function ProfilePage() {
  const { user, organizationId } = await withAuth({ ensureSignedIn: true });

  // Show fallback content immediately, load WorkOS widget asynchronously
  const authTokenPromise = organizationId 
    ? workos.widgets.getToken({
        organizationId,
        userId: user.id,
        scopes: ["widgets:users-table:manage"],
      }).catch((error) => {
        console.error("Error al obtener el token:", error);
        return null;
      })
    : Promise.resolve(null);

  return (
    <div className="pt-12 pb-12 pl-12 pr-12 flex flex-col max-w-4xl min-w-[520px] w-full min-h-full box-border">
      {/* WorkOS User Profile Widget */}
      <SettingsSection
        title="Gestión de Perfil"
        description="Gestiona tu información personal y preferencias."
      >
        <ProfileWidget authTokenPromise={authTokenPromise} />
      </SettingsSection>
    </div>
  );
}
