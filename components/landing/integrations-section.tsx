import { Google, Microsoft, Okta, Scim } from "@/components/ui/icons/svg-icons";

export default function IntegrationsSection() {
  return (
    <section className="" id="integrations">
      <div className="gap-8 flex flex-col">
        <div className="gap-2 w-full flex flex-col -mb-4">
          <span className="transition-opacity duration-150 ease-out text-orange-400 font-semibold gap-1.5 items-center flex">
            Integraciones
          </span>
          <h4 className="text-4xl leading-[54.4px] tracking-[-0.5px] font-bold m-0">
            Conecta RIFT con tu organización
          </h4>
        </div>
        <div className="flex flex-col">
          <p className="text-landing-text-secondary mb-5">
            Implementación instantánea sin fricción. Sincroniza usuarios y grupos automáticamente con las herramientas que ya utilizas.
          </p>

          <div className="w-full max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
              <div className="w-full h-24 flex items-center justify-center p-4 bg-white dark:bg-card border border-border rounded-2xl shadow-sm hover:shadow-md transition-all grayscale hover:grayscale-0">
                <Google className="h-8 w-auto" />
              </div>
              <div className="w-full h-24 flex items-center justify-center p-4 bg-white dark:bg-card border border-border rounded-2xl shadow-sm hover:shadow-md transition-all grayscale hover:grayscale-0">
                <Microsoft className="h-8 w-auto" />
              </div>
              <div className="w-full h-24 flex items-center justify-center p-4 bg-white dark:bg-card border border-border rounded-2xl shadow-sm hover:shadow-md transition-all grayscale hover:grayscale-0">
                <Okta className="h-8 w-auto dark:invert" />
              </div>
              <div className="w-full h-24 flex items-center justify-center p-4 bg-white dark:bg-card border border-border rounded-2xl shadow-sm hover:shadow-md transition-all grayscale hover:grayscale-0">
                <Scim className="h-8 w-auto text-gray-700 dark:text-gray-300" />
              </div>
            </div>
            <p className="text-center text-sm text-muted-foreground mt-8">
              Soporte para SCIM, JIT, Directory Sync, SSO (SAML/OIDC) y logs de auditoría avanzados.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
