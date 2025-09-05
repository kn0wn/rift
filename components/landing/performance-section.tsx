export default function PerformanceSection() {
  return (
    <>
      {/* Summaries & Action Items Section */}
      <section>
        <div className="select-none cursor-default gap-8 flex flex-col">
          <div className="select-none cursor-default gap-2 w-full flex flex-col -mb-4">
            <span className="select-none cursor-default transition-opacity duration-150 ease-out text-blue-500 font-semibold gap-1.5 items-center flex">
              Rendimiento
            </span>
            <h4 className="text-4xl leading-[54.4px] tracking-[-0.5px] select-none cursor-default font-bold m-0">
              Velocidad Inigualable
            </h4>
          </div>
          <div className="flex flex-col">
            <div className="bg-[rgba(235,235,235,0.5)] w-full h-px"></div>
            <p className="text-[rgb(92,92,92)] mb-3">
              Desde la creacion de LOOP, sabiamos que la velocidad era un factor
              clave para la eficiencia de los equipos. Por eso, hemos
              desarrollado una plataforma que permite a los equipos trabajar más
              rápido y eficientemente.
            </p>
            <p className="text-[rgb(92,92,92)] mb-6">
              Las respuestas mediante nuestra plataforma son mas rapidas en
              muchas ocaciones que las respuestas en la pagina oficial de
              chatgpt, gemeini, y otras plataformas de IA. Todo esto gracias a
              nuestra arquitectura optimizada y nuestra experiencia en el
              desarrollo de soluciones de IA.
            </p>

            <div className="flex flex-col items-center justify-center gap-7 w-full mb-8">
              <iframe
                src="http://192.168.0.160:3000/chat/"
                width="100%"
                height="600px"
              ></iframe>
              <span className="text-xs leading-4 text-[rgb(160,160,160)]">
                Prueba a enviar un mensaje
              </span>
            </div>

            <div className="flex flex-col gap-2 w-full mt-4">
              <h4 className="tracking-[-0.5px] font-semibold text-xl leading-7 m-0">
                Todos los modelos, una suscripción
              </h4>
            </div>

            <p className="text-[rgb(92,92,92)] m-0">
              Acceso a todos los modelos de IA disponibles en el mercado, desde
              ChatGPT, Gemini, Grok, Anthropic, DeepSeek, Mistral, y muchos
              otros modelos especiales.
            </p>

            <div className="mt-4">
              <div className="flex items-start">
                <div className="bg-[rgb(204,244,218)] rounded-full flex justify-center items-center flex-shrink-0 w-5 h-5 mt-0.5">
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="text-[rgb(16,161,66)] w-3 h-3 block"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="text-[rgb(92,92,92)] text-base leading-[25.6px] ml-3">
                  Una Sola Suscripción
                </div>
              </div>
              <div className="flex items-start mt-3">
                <div className="bg-[rgb(204,244,218)] rounded-full flex justify-center items-center flex-shrink-0 w-5 h-5 mt-0.5">
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="text-[rgb(16,161,66)] w-3 h-3 block"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="text-[rgb(92,92,92)] text-base leading-[25.6px] ml-3">
                  Eligente entre decenas de modelos
                </div>
              </div>
              <div className="flex items-start mt-3">
                <div className="bg-[rgb(204,244,218)] rounded-full flex justify-center items-center flex-shrink-0 w-5 h-5 mt-0.5">
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="text-[rgb(16,161,66)] w-3 h-3 block"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="text-[rgb(92,92,92)] text-base leading-[25.6px] ml-3">
                  No te limitamos a usar unicamente una empresa de IA
                </div>
              </div>
              <div className="flex items-start mt-3 mb-0">
                <div className="bg-[rgb(204,244,218)] rounded-full flex justify-center items-center flex-shrink-0 w-5 h-5 mt-0.5">
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="text-[rgb(16,161,66)] w-3 h-3 block"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="text-[rgb(92,92,92)] text-base leading-[25.6px] ml-3">
                  Mejores resultados, más rapidez y más seguridad.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
