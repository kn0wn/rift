"use client";

import ScrollRiveAnimation from "./scroll-rive-animation";

export default function WhatIsLoopSection() {
  return (
    <section className="py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8">
          <div className="select-none cursor-default gap-8 flex flex-col">
            <div className="select-none cursor-default gap-2 w-full flex flex-col -mb-4">
              <span className="select-none cursor-default transition-opacity duration-150 ease-out text-blue-500 font-semibold gap-1.5 items-center flex">
                Que nos hace diferentes?
              </span>
              <h4 className="text-4xl leading-[54.4px] tracking-[-0.5px] select-none cursor-default font-bold m-0">
                Que es LOOP?
              </h4>
            </div>
            <p className="select-text cursor-default text-gray-600 text-pretty m-0">
              LOOP es nuestra solucion a los constantes cambios en el mundo de
              la inteligencia artificial, unificando en una sola plataforma
              todos los modelos de IA, brindando la oportunidad a los usuarios
              de no unicamente usar un modelo, sino de tener acceso a decenas de
              modelos, permitiendo al usuario crecer, tener mejores resultados y
              mejorar su experiencia.
            </p>
            <p className="select-text cursor-default text-gray-600 text-pretty m-0">
              {/*Customize the design, add your branding, and share via a simple
              link. No account required for viewers.*/}
            </p>
            <div className="select-none cursor-default gap-8 flex flex-col">
              {/*<div className="select-none cursor-default gap-7 justify-center items-center flex-col w-full flex mb-3">
                <span className="select-none cursor-default text-gray-400 text-xs leading-[15.84px]">
                  Share meeting notes with anyone via a simple link
                </span>
              </div>*/}
            </div>
          </div>
        </div>
      </div>

      {/* Full-width animation container */}
      <div className="relative w-full h-[200vh] overflow-hidden mt-16">
        <ScrollRiveAnimation
          src="https://xasvboifh2.ufs.sh/f/Eq6vxXhJeSPAgR6Z0wume20czI7oxdH5PkjOsNVKXy6FZB4i"
          stateMachineName="State Machine 1"
          inputName="scroll"
          className="absolute inset-0 w-[250vw] h-[250vh] -left-[75vw] -top-[25vh] flex items-center justify-center"
          style={{
            transform: "scale(1.8)",
            transformOrigin: "center center",
          }}
        />
      </div>
    </section>
  );
}
