"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { AIModelsIcon } from "@/components/ui/icons/landing-icons";
import { Response } from "@/components/ai/response";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ai/ui/avatar";

const EXAMPLES = [
  {
    user: "Explica la computación cuántica brevemente",
    ai: "La **computación cuántica** es un paradigma que aprovecha fenómenos como la *superposición* y el *entrelazamiento*.\n\nDiferencias clave:\n- **Bits Clásicos**: 0 o 1.\n- **Qubits**: 0, 1 o ambos a la vez.\n\nEsto permite resolver problemas complejos (como criptografía) exponencialmente más rápido.",
  },
  {
    user: "Genera una función de Fibonacci en Python",
    ai: "Aquí tienes una implementación recursiva optimizada con memoización:\n\n```python\ndef fib(n, memo={}):\n    if n in memo: return memo[n]\n    if n <= 1: return n\n    memo[n] = fib(n-1) + fib(n-2)\n    return memo[n]\n```",
  },
  {
    user: "Plan de estudio para aprender física clásica en 1 mes",
    ai: "### Semana 1: Mecánica\n1. **Días 1-2**: Cinemática (movimiento rectilíneo y circular).\n2. **Días 3-4**: Dinámica (leyes de Newton, fuerzas).\n3. **Día 5**: Energía y trabajo.\n\n### Semana 2: Termodinámica y Ondas\n- **Termodinámica**: Calor, temperatura y leyes.\n- **Ondas**: Movimiento armónico y ondas mecánicas.\n\n### Semana 3-4: Electromagnetismo\n- **Electrostática**: Campo eléctrico y potencial.\n- **Magnetismo**: Campo magnético y fuerza de Lorentz.\n- **Inducción**: Ley de Faraday y corrientes alternas.",
  },
];

export function MockChatDemo() {
  const [exampleIndex, setExampleIndex] = useState(0);
  const [displayedResponse, setDisplayedResponse] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [phase, setPhase] = useState<"user_typing" | "thinking" | "streaming" | "done">("user_typing");
  const [userText, setUserText] = useState("");

  const currentExample = EXAMPLES[exampleIndex];

  // Cursor blinking effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let isMounted = true;

    const runSequence = async () => {
      if (!isMounted) return;
      // Reset
      setDisplayedResponse("");
      setUserText("");
      setPhase("user_typing");

      // 1. Type user message
      const userMessage = currentExample.user;
      for (let i = 0; i <= userMessage.length; i++) {
        if (!isMounted) return;
        setUserText(userMessage.slice(0, i));
        await new Promise((resolve) => setTimeout(resolve, 50)); // Typing speed
      }

      // 2. Thinking (very short to show speed)
      if (!isMounted) return;
      setPhase("thinking");
      await new Promise((resolve) => setTimeout(resolve, 400)); // 400ms latency simulation

      // 3. Stream AI response
      if (!isMounted) return;
      setPhase("streaming");
      setIsTyping(true);
      const aiMessage = currentExample.ai;
      const chunkSize = 5; // Increased characters per tick for speed
      for (let i = 0; i <= aiMessage.length; i += chunkSize) {
        if (!isMounted) return;
        setDisplayedResponse(aiMessage.slice(0, i + chunkSize));
        await new Promise((resolve) => setTimeout(resolve, 5)); // Even faster streaming
      }
      if (!isMounted) return;
      setDisplayedResponse(aiMessage); // Ensure full text
      setIsTyping(false);
      setPhase("done");

      // 4. Wait before next example
      timeout = setTimeout(() => {
        if (isMounted) {
          setExampleIndex((prev) => (prev + 1) % EXAMPLES.length);
        }
      }, 4000);
    };

    runSequence();

    return () => {
      isMounted = false;
      clearTimeout(timeout);
    };
  }, [exampleIndex]);

  return (
    <div className="w-full max-w-2xl mx-auto bg-background border rounded-xl shadow-xl overflow-hidden flex flex-col h-[400px]">
      {/* Chat Area */}
      <div className="flex-1 p-6 flex flex-col gap-6 overflow-hidden bg-background/50 relative">
        {/* User Message */}
        <div className={cn(
          "flex items-start gap-3 justify-end transition-opacity duration-500",
          phase === "user_typing" && userText.length === 0 ? "opacity-0" : "opacity-100"
        )}>
          <div className="bg-primary text-primary-foreground px-4 py-2 rounded-2xl rounded-tr-sm max-w-[80%] text-sm">
            {userText}
            <span className={cn(
              "ml-1 inline-block w-1.5 h-4 bg-primary-foreground align-middle",
              phase === "user_typing" && showCursor ? "opacity-100" : "opacity-0"
            )} />
          </div>
          <Avatar className="size-8 shrink-0">
            <AvatarImage src="/avatar.png" alt="User avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>

        {/* AI Message */}
        {(phase === "thinking" || phase === "streaming" || phase === "done") && (
           <div className="flex items-start gap-3 max-w-[90%]">
             <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-1">
               <AIModelsIcon className="w-4 h-4 text-emerald-600" />
             </div>
             <div className="flex flex-col gap-1 min-w-0 w-full">
               <span className="text-xs font-medium text-emerald-600">Rift AI</span>
               <div className="text-sm text-foreground leading-relaxed">
                 <Response className="text-sm leading-relaxed">{displayedResponse}</Response>
                 {phase === "streaming" && (
                   <span className="inline-block w-1.5 h-4 bg-emerald-500 ml-0.5 align-middle animate-pulse" />
                 )}
               </div>
               {phase === "thinking" && (
                  <div className="flex gap-1 mt-2">
                    <div className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce" />
                  </div>
               )}
             </div>
           </div>
        )}
      </div>
    </div>
  );
}

