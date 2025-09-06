import Link from "next/link";
import { Button } from "@/components/ai/ui/button";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden">
      {/* Blue gradient background */}
      <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 relative">
        {/* Cloud decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Left cloud */}
          <div className="absolute top-8 left-8 w-32 h-20 bg-white/20 rounded-full blur-sm opacity-80"></div>
          <div className="absolute top-12 left-12 w-24 h-16 bg-white/15 rounded-full blur-sm opacity-60"></div>
          <div className="absolute top-6 left-16 w-20 h-12 bg-white/25 rounded-full blur-sm opacity-70"></div>

          {/* Right cloud */}
          <div className="absolute top-16 right-8 w-40 h-24 bg-white/20 rounded-full blur-sm opacity-75"></div>
          <div className="absolute top-20 right-12 w-28 h-18 bg-white/15 rounded-full blur-sm opacity-65"></div>
          <div className="absolute top-12 right-20 w-24 h-14 bg-white/25 rounded-full blur-sm opacity-80"></div>

          {/* Bottom clouds */}
          <div className="absolute bottom-4 left-1/4 w-36 h-22 bg-white/15 rounded-full blur-sm opacity-50"></div>
          <div className="absolute bottom-8 right-1/3 w-32 h-20 bg-white/20 rounded-full blur-sm opacity-60"></div>
        </div>

        {/* Content */}
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            ¿Listo para comenzar?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Descarga LOOP gratis. No se requiere tarjeta de crédito.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 shadow-lg font-semibold px-8 py-4 min-w-[160px]"
            >
              <Link href="/sign-up" className="flex items-center gap-2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-blue-600"
                >
                  <path
                    d="M21 16V8C21 6.89543 20.1046 6 19 6H5C3.89543 6 3 6.89543 3 8V16C3 17.1046 3.89543 18 5 18H19C20.1046 18 21 17.1046 21 16Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M7 18V16C7 14.8954 7.89543 14 9 14H15C16.1046 14 17 14.8954 17 16V18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Aplicación Web
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-4 min-w-[160px]"
            >
              <Link href="#demo" className="flex items-center gap-2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 5V19L19 12L8 5Z"
                    fill="currentColor"
                  />
                </svg>
                Ver demo
              </Link>
            </Button>
          </div>

          <div className="mt-8 text-blue-100 text-sm">
            <p>Más de 10,000 usuarios confían en LOOP para sus conversaciones con IA</p>
          </div>
        </div>
      </div>
    </section>
  );
}
