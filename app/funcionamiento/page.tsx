import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftIcon, PlayIcon, ImageIcon, BookOpenIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Cómo Funciona la IA",
  description: "Descubre cómo funciona la inteligencia artificial, desde el procesamiento del lenguaje natural hasta la generación de respuestas inteligentes.",
};

export default function FuncionamientoPage() {
  return (
    <div className="h-full overflow-y-auto bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/info-ia" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeftIcon className="size-4 mr-2" />
            Volver a Información sobre IA
          </Link>
          
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Cómo Funciona la Inteligencia Artificial
          </h1>
          <p className="text-lg text-muted-foreground">
            Una guía completa para entender el fascinante mundo de la IA y cómo estos sistemas 
            procesan información para generar respuestas inteligentes.
          </p>
        </div>

        {/* Table of Contents */}
        <div className="bg-card border rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-card-foreground flex items-center">
            <BookOpenIcon className="size-5 mr-2" />
            Índice de Contenidos
          </h2>
          <ul className="space-y-2 text-sm">
            <li><a href="#introduccion" className="text-primary hover:text-primary/80 transition-colors">1. Introducción a la IA</a></li>
            <li><a href="#procesamiento" className="text-primary hover:text-primary/80 transition-colors">2. Procesamiento del Lenguaje Natural</a></li>
            <li><a href="#transformers" className="text-primary hover:text-primary/80 transition-colors">3. Arquitectura Transformer</a></li>
            <li><a href="#entrenamiento" className="text-primary hover:text-primary/80 transition-colors">4. Entrenamiento de Modelos</a></li>
            <li><a href="#generacion" className="text-primary hover:text-primary/80 transition-colors">5. Generación de Respuestas</a></li>
            <li><a href="#aplicaciones" className="text-primary hover:text-primary/80 transition-colors">6. Aplicaciones Prácticas</a></li>
          </ul>
        </div>

        {/* Blog Content */}
        <article className="prose prose-gray dark:prose-invert max-w-none">
          
          {/* Section 1: Introducción */}
          <section id="introduccion" className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">1. Introducción a la Inteligencia Artificial</h2>
            
            <div className="bg-card border rounded-lg p-6 mb-6">
              <div className="flex items-center mb-4">
                <ImageIcon className="size-6 text-primary mr-3" />
                <h3 className="text-xl font-semibold text-card-foreground">¿Qué es la IA?</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                La inteligencia artificial es una rama de la informática que se enfoca en crear sistemas 
                capaces de realizar tareas que tradicionalmente requieren inteligencia humana. Estos sistemas 
                pueden aprender, razonar, percibir y tomar decisiones basadas en datos.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-card border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-card-foreground">Tipos de IA</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• <strong>IA Débil:</strong> Especializada en tareas específicas</li>
                  <li>• <strong>IA Fuerte:</strong> Capacidades humanas generales</li>
                  <li>• <strong>Machine Learning:</strong> Aprende de datos</li>
                  <li>• <strong>Deep Learning:</strong> Redes neuronales profundas</li>
                </ul>
              </div>
              
              <div className="bg-card border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-card-foreground">Componentes Clave</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• <strong>Algoritmos:</strong> Reglas de procesamiento</li>
                  <li>• <strong>Datos:</strong> Información de entrenamiento</li>
                  <li>• <strong>Computación:</strong> Potencia de procesamiento</li>
                  <li>• <strong>Modelos:</strong> Representaciones aprendidas</li>
                </ul>
              </div>
            </div>

            {/* Placeholder for video */}
            <div className="bg-muted/50 border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center mb-6">
              <PlayIcon className="size-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-foreground">Video Explicativo</h3>
              <p className="text-muted-foreground">
                Aquí se incluirá un video explicativo sobre los fundamentos de la IA
              </p>
            </div>
          </section>

          {/* Section 2: Procesamiento del Lenguaje Natural */}
          <section id="procesamiento" className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">2. Procesamiento del Lenguaje Natural (NLP)</h2>
            
            <div className="bg-card border rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold mb-4 text-card-foreground">¿Cómo entiende el lenguaje?</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                El procesamiento del lenguaje natural permite a las máquinas entender, interpretar y 
                generar texto humano. Este proceso involucra múltiples etapas de análisis y transformación.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-background/50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2 text-foreground">1. Tokenización</h4>
                  <p className="text-sm text-muted-foreground">División del texto en unidades más pequeñas (palabras, caracteres)</p>
                </div>
                <div className="bg-background/50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2 text-foreground">2. Análisis Semántico</h4>
                  <p className="text-sm text-muted-foreground">Comprensión del significado y contexto de las palabras</p>
                </div>
                <div className="bg-background/50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2 text-foreground">3. Generación</h4>
                  <p className="text-sm text-muted-foreground">Creación de respuestas coherentes y contextualmente apropiadas</p>
                </div>
              </div>
            </div>

            {/* Placeholder for diagram */}
            <div className="bg-muted/50 border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center mb-6">
              <ImageIcon className="size-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-foreground">Diagrama de Procesamiento</h3>
              <p className="text-muted-foreground">
                Aquí se incluirá un diagrama visual del proceso de NLP
              </p>
            </div>
          </section>

          {/* Section 3: Arquitectura Transformer */}
          <section id="transformers" className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">3. Arquitectura Transformer</h2>
            
            <div className="bg-card border rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold mb-4 text-card-foreground">La Revolución de los Transformers</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                La arquitectura Transformer es la base de los modelos de IA más avanzados actualmente, 
                incluyendo GPT, BERT, y muchos otros. Esta innovación revolucionó el procesamiento del 
                lenguaje natural y es fundamental para entender cómo funcionan los modelos modernos.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold mb-3 text-foreground">Componentes Clave</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• <strong>Attention Mechanism:</strong> Enfoque en partes relevantes del texto</li>
                    <li>• <strong>Self-Attention:</strong> Relaciones entre palabras en una secuencia</li>
                    <li>• <strong>Multi-Head Attention:</strong> Múltiples perspectivas simultáneas</li>
                    <li>• <strong>Feed-Forward Networks:</strong> Procesamiento no lineal</li>
                    <li>• <strong>Layer Normalization:</strong> Estabilización del entrenamiento</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3 text-foreground">Ventajas de los Transformers</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• <strong>Paralelización:</strong> Procesamiento simultáneo de secuencias</li>
                    <li>• <strong>Contexto Largo:</strong> Comprensión de dependencias distantes</li>
                    <li>• <strong>Escalabilidad:</strong> Mejora con más datos y parámetros</li>
                    <li>• <strong>Transferencia:</strong> Aprendizaje reutilizable entre tareas</li>
                    <li>• <strong>Eficiencia:</strong> Menos tiempo de entrenamiento</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* YouTube Video Section */}
            <div className="bg-card border rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold mb-4 text-card-foreground flex items-center">
                <PlayIcon className="size-6 text-primary mr-3" />
                Video Explicativo: ¿Qué son los Transformers?
              </h3>
              <p className="text-muted-foreground mb-4">
                Este video explica de manera clara y visual cómo funciona la arquitectura Transformer, 
                el corazón de los modelos de IA modernos como GPT y ChatGPT.
              </p>
              
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  src="https://www.youtube.com/embed/wjZofJX0v4M"
                  title="¿Qué son los Transformers? - Explicación de la Arquitectura Transformer"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
              
              <p className="text-sm text-muted-foreground mt-3">
                <strong>Fuente:</strong> <a 
                  href="https://www.youtube.com/watch?v=wjZofJX0v4M" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  YouTube - ¿Qué son los Transformers?
                </a>
              </p>
            </div>

            <div className="bg-card border rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold mb-4 text-card-foreground">Impacto en la IA Moderna</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Los Transformers han transformado completamente el campo de la inteligencia artificial. 
                Modelos como GPT-3, GPT-4, BERT, T5 y muchos otros están construidos sobre esta arquitectura, 
                permitiendo capacidades que antes eran imposibles.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-background/50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2 text-foreground">Generación de Texto</h4>
                  <p className="text-sm text-muted-foreground">Creación de texto coherente y contextualmente apropiado</p>
                </div>
                <div className="bg-background/50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2 text-foreground">Comprensión</h4>
                  <p className="text-sm text-muted-foreground">Análisis profundo del significado y contexto del lenguaje</p>
                </div>
                <div className="bg-background/50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2 text-foreground">Traducción</h4>
                  <p className="text-sm text-muted-foreground">Conversión precisa entre diferentes idiomas</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Entrenamiento de Modelos */}
          <section id="entrenamiento" className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">4. Entrenamiento de Modelos</h2>
            
            <div className="bg-card border rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold mb-4 text-card-foreground">El Proceso de Aprendizaje</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Los modelos de IA aprenden a través de un proceso llamado entrenamiento, donde se exponen 
                a grandes cantidades de datos y ajustan sus parámetros para mejorar su rendimiento.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-foreground">Recolección de Datos</h4>
                    <p className="text-muted-foreground text-sm">
                      Se recopilan millones de ejemplos de texto, conversaciones y documentos para entrenar el modelo.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-foreground">Preprocesamiento</h4>
                    <p className="text-muted-foreground text-sm">
                      Los datos se limpian, normalizan y estructuran para el entrenamiento.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-foreground">Entrenamiento</h4>
                    <p className="text-muted-foreground text-sm">
                      El modelo ajusta sus parámetros para minimizar errores y mejorar predicciones.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-foreground">Validación</h4>
                    <p className="text-muted-foreground text-sm">
                      Se prueba el modelo con datos nuevos para evaluar su rendimiento.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Placeholder for training visualization */}
            <div className="bg-muted/50 border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center mb-6">
              <ImageIcon className="size-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-foreground">Visualización del Entrenamiento</h3>
              <p className="text-muted-foreground">
                Aquí se incluirá una animación o gráfico del proceso de entrenamiento
              </p>
            </div>
          </section>

          {/* Section 5: Generación de Respuestas */}
          <section id="generacion" className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">5. Generación de Respuestas</h2>
            
            <div className="bg-card border rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold mb-4 text-card-foreground">¿Cómo genera respuestas?</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Cuando recibes una respuesta de la IA, el proceso involucra múltiples pasos de análisis, 
                razonamiento y generación de texto coherente.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-foreground">Proceso de Generación</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• <strong>Análisis:</strong> Comprende tu pregunta</li>
                    <li>• <strong>Contexto:</strong> Recupera información relevante</li>
                    <li>• <strong>Razonamiento:</strong> Procesa y conecta ideas</li>
                    <li>• <strong>Generación:</strong> Crea respuesta coherente</li>
                    <li>• <strong>Refinamiento:</strong> Mejora la calidad del texto</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3 text-foreground">Características de las Respuestas</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• <strong>Contextual:</strong> Relevante a tu pregunta</li>
                    <li>• <strong>Coherente:</strong> Lógicamente estructurada</li>
                    <li>• <strong>Completa:</strong> Aborda todos los aspectos</li>
                    <li>• <strong>Natural:</strong> Lenguaje humano</li>
                    <li>• <strong>Útil:</strong> Proporciona valor</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Placeholder for interactive demo */}
            <div className="bg-muted/50 border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center mb-6">
              <PlayIcon className="size-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-foreground">Demo Interactivo</h3>
              <p className="text-muted-foreground">
                Aquí se incluirá una demostración interactiva del proceso de generación
              </p>
            </div>
          </section>

          {/* Section 6: Aplicaciones Prácticas */}
          <section id="aplicaciones" className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">6. Aplicaciones Prácticas</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-card border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-card-foreground">Casos de Uso Comunes</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• <strong>Asistencia:</strong> Responder preguntas y resolver problemas</li>
                  <li>• <strong>Escritura:</strong> Crear contenido, corrección y mejora</li>
                  <li>• <strong>Análisis:</strong> Procesar y resumir información</li>
                  <li>• <strong>Traducción:</strong> Convertir entre idiomas</li>
                  <li>• <strong>Programación:</strong> Generar y depurar código</li>
                </ul>
              </div>
              
              <div className="bg-card border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-card-foreground">Beneficios</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• <strong>Eficiencia:</strong> Respuestas rápidas y precisas</li>
                  <li>• <strong>Disponibilidad:</strong> Acceso 24/7</li>
                  <li>• <strong>Escalabilidad:</strong> Maneja múltiples consultas</li>
                  <li>• <strong>Personalización:</strong> Adapta respuestas al contexto</li>
                  <li>• <strong>Mejora continua:</strong> Aprende de cada interacción</li>
                </ul>
              </div>
            </div>

            {/* Placeholder for case study */}
            <div className="bg-muted/50 border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center mb-6">
              <ImageIcon className="size-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-foreground">Estudio de Caso</h3>
              <p className="text-muted-foreground">
                Aquí se incluirá un ejemplo real de cómo la IA resuelve un problema específico
              </p>
            </div>
          </section>

        </article>

        {/* Call to Action */}
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-semibold mb-4 text-foreground">
            ¿Listo para Experimentar?
          </h3>
          <p className="text-muted-foreground mb-6">
            Ahora que entiendes cómo funciona la IA, ¡es hora de probarla por ti mismo!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/" 
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Crear Nuevo Chat
            </Link>
            <Link 
              href="/info-ia" 
              className="inline-flex items-center justify-center px-6 py-3 border border-border rounded-lg font-medium hover:bg-accent transition-colors"
            >
              Más Información
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
