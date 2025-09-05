export default function ArchitectureSection() {
  return (
    <section>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2 w-full -mb-4">
          <span className="text-[rgb(1,202,69)] font-semibold gap-1.5 flex items-center transition-opacity duration-150">
            Arquitectura
          </span>
          <h4 className="text-[40px] leading-[54.4px] tracking-[-0.5px] font-bold m-0">
            Por que somos diferentes
          </h4>
        </div>
        <div className="flex flex-col gap-2 w-full mt-4 -mb-6">
          <h4 className="tracking-[-0.5px] font-semibold text-xl leading-7 m-0">
            Respuestas Rápidas
          </h4>
        </div>
        <p className="text-[rgb(92,92,92)] m-0">
          Cuando tu mandas un mensaje, LOOP se encarga de contrar el servidor de
          IA mas rapido disponible en el momento para responder a tu mensaje en
          question de milisegundos.
        </p>

        <div className="flex flex-col gap-2 w-full mt-4 -mb-6">
          <h4 className="tracking-[-0.5px] font-semibold text-xl leading-7 m-0">
            Todos los Modelos de IA en un solo lugar
          </h4>
        </div>

        <p className="text-[rgb(92,92,92)] m-0">
          Con LOOP no necesitar preocuparte por tener que pagar, administrar y
          configurar varias paginas de IA, simplemente usa LOOP y disfruta de la
          experiencia de IA sin preocupaciones.
        </p>

        <div className="flex flex-col gap-2 w-full mt-4 -mb-6">
          <h4 className="tracking-[-0.5px] font-semibold text-xl leading-7 m-0">
            Centro de Conocimiento incluido
          </h4>
        </div>
        <p className="text-[rgb(92,92,92)] m-0">
          En tu subscripcion, incluimos un centro de conocimiento donde
          encontraras recursos para aprender y mejorar tus habilidades de IA,
          incluyendo tutoriales, cursos, guias y explicaciones de como realmente
          funciona la inteligencia artificial permitiendote conocer las
          limitaciones, tecnicas y estrategias para obtener los mejores
          resultados.
        </p>

        <div className="flex flex-col gap-2 w-full mt-4 -mb-6">
          <h4 className="tracking-[-0.5px] font-semibold text-xl leading-7 m-0">
            Listo para Organizaciones
          </h4>
        </div>
        <p className="text-[rgb(92,92,92)] m-0">
          Da acceso a los miembros de tu organizacion en cuestion de minutos
          vinculando tu Google Workspace, Microsoft Teams y muchas plataformas,
          mediante guias y tutoriales
        </p>
        <div className="flex flex-col gap-2 w-full mt-4 -mb-6">
          <h4 className="tracking-[-0.5px] font-semibold text-xl leading-7 m-0">
            Integraciones Avanzadas
          </h4>
        </div>
        <p className="text-[rgb(92,92,92)] m-0">
          contamos con SCIM, JIT, Directory Sync, SSO/SAML/OIDC, audit logs y
          muchas mas funcionalidades para organizaciones
        </p>
      </div>
    </section>
  );
}
