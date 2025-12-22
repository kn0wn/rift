"use client";

import * as React from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import * as LucideIcons from "lucide-react";
import { MessageSquare, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function SelectedInstructionPill({
  instructionId,
  className,
}: {
  instructionId: string | undefined;
  className?: string;
}) {
  const instruction = useQuery(
    api.customInstructions.get,
    instructionId
      ? { id: instructionId as Id<"customInstructions"> }
      : "skip",
  );

  if (!instructionId) return null;
  if (instruction === undefined) return null;
  if (instruction === null) return null;

  const Icon =
    ((LucideIcons as any)[instruction.icon] as LucideIcon) ?? MessageSquare;

  return (
    <div
      className={cn(
        // Match ModelSelector trigger styling
        "text-secondary hover:bg-popover-main hover:text-popover-text data-[placeholder]:text-muted-foreground flex w-fit items-center justify-between gap-2 rounded-md bg-transparent px-3 py-2 text-sm whitespace-nowrap outline-none disabled:cursor-not-allowed disabled:opacity-50 h-9 dark:hover:bg-hover/60",
        "max-w-[220px]",
        className,
      )}
      title={`Instrucción: ${instruction.title}`}
    >
      <Icon
        className="size-4 shrink-0"
        style={{ color: instruction.iconColor || "currentColor" }}
      />
      <span className="font-medium truncate">{instruction.title}</span>
    </div>
  );
}

