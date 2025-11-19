import Image from "next/image";
import HeroAuthButton from "./hero-auth-button";

export default function HeroSection() {
  return (
    <section>
      <div>
        <div className="flex flex-col ">
          <div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight font-bold">
              <span className="inline-flex items-center flex-wrap gap-2">
                La mejor manera para usar
                <span className="text-amber-600 px-2 py-1 bg-amber-100 dark:bg-amber-900/60 rounded-md inline-block">
                  Inteligencia Artificial
                </span>
              </span>
            </h1>
          </div>

          <div className="flex gap-3 mt-6">
            <HeroAuthButton />
          </div>

          <div className="flex flex-col gap-4 mt-16">
            <div className="w-full flex justify-center">
              <Image
                src="/shot.png"
                alt="AI Chat Interface Screenshot"
                width={1200}
                height={800}
                className="w-full h-auto shadow-container border border-gray-300"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
