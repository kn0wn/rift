import { SettingsSection } from "@/components/settings";
import { SecurityWidget } from "@/components/settings/widgets/SecurityWidget";
import { withAuth } from "@workos-inc/authkit-nextjs";
import { workos } from "@/app/api/workos";

export default async function SecurityPage() {
  const { user, organizationId } = await withAuth({ ensureSignedIn: true });

  // Show section header immediately, load WorkOS widget asynchronously
  const authTokenPromise = organizationId 
    ? workos.widgets.getToken({
        organizationId,
        userId: user.id,
      }).catch((error) => {
        console.error("Error al obtener el token:", error);
        return null;
      })
    : Promise.resolve(null);

  return (
    <div className="pt-12 pb-12 pl-12 pr-12 flex flex-col max-w-4xl min-w-[520px] w-full min-h-full box-border">
      <SettingsSection
        title="Configuración de Seguridad"
        description="Gestiona tu contraseña y metodos de autenticación."
      >
        <SecurityWidget authTokenPromise={authTokenPromise} userId={user.id} />
      </SettingsSection>
    </div>
  );
}
