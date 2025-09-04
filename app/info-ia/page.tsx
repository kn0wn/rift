import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Información sobre IA",
  description: "Información sobre inteligencia artificial y modelos disponibles",
};

export default function InfoIAPage() {
  return (
    <div className="h-full overflow-y-auto bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">
              Información sobre IA
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Descubre todo lo que necesitas saber sobre los modelos de inteligencia artificial 
              disponibles y cómo elegir el mejor para tus necesidades.
            </p>
          </div>

          {/* Placeholder Content */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="p-6 rounded-lg border bg-card">
              <h2 className="text-xl font-semibold mb-3 text-card-foreground">
                ¿Qué es la IA?
              </h2>
              <p className="text-muted-foreground">
                La inteligencia artificial (IA) es una tecnología que permite a las máquinas 
                realizar tareas que tradicionalmente requieren inteligencia humana, como el 
                procesamiento del lenguaje natural, el reconocimiento de patrones y la toma de decisiones.
              </p>
            </div>

            <div className="p-6 rounded-lg border bg-card">
              <h2 className="text-xl font-semibold mb-3 text-card-foreground">
                Modelos Disponibles
              </h2>
              <p className="text-muted-foreground mb-4">
                Tenemos acceso a los mejores modelos de IA del mercado, incluyendo GPT-4, 
                Claude, Gemini y más. Cada modelo tiene sus propias fortalezas y está optimizado 
                para diferentes tipos de tareas.
              </p>
              <a 
                href="/modelos-disponibles" 
                className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Ver todos los modelos →
              </a>
            </div>

            <div className="p-6 rounded-lg border bg-card">
              <h2 className="text-xl font-semibold mb-3 text-card-foreground">
                Selección Automática
              </h2>
              <p className="text-muted-foreground">
                Nuestro sistema de selección automática analiza tu consulta y elige el modelo 
                más adecuado para darte la mejor respuesta posible, optimizando tanto la calidad 
                como la velocidad.
              </p>
            </div>

            <div className="p-6 rounded-lg border bg-card">
              <h2 className="text-xl font-semibold mb-3 text-card-foreground">
                Cómo Funciona
              </h2>
              <p className="text-muted-foreground mb-4">
                Descubre el fascinante mundo de la inteligencia artificial y cómo estos modelos 
                procesan información, aprenden y generan respuestas inteligentes.
              </p>
              <a 
                href="/funcionamiento" 
                className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Explorar funcionamiento →
              </a>
            </div>
          </div>

          {/* Coming Soon Section */}
          <div className="text-center p-8 rounded-lg border-2 border-dashed border-muted-foreground/25">
            <h3 className="text-2xl font-semibold mb-4 text-foreground">
              Más información próximamente
            </h3>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Estamos trabajando en una guía completa sobre IA, comparaciones detalladas de modelos, 
              mejores prácticas y tutoriales. ¡Mantente atento a las actualizaciones!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
