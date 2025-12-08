"use client";

import { useCallback, useRef } from "react";
import type { UIMessage } from "@ai-sdk-tools/store";
import type { RefObject } from "react";
import { Data, Effect, Fiber, Schedule } from "effect";

type Role = "user" | "assistant" | "system";

// ============================================================================
// Error Types
// ============================================================================

/**
 * Error during message regeneration.
 */
export class RegenerationError extends Data.TaggedError("RegenerationError")<{
  readonly message: string;
  readonly messageId: string;
  readonly cause?: unknown;
}> {}

/**
 * Error during message editing.
 */
export class EditError extends Data.TaggedError("EditError")<{
  readonly message: string;
  readonly messageId: string;
  readonly cause?: unknown;
}> {}

// ============================================================================
// Retry Schedule - exponential backoff with jitter
// ============================================================================

const retrySchedule = Schedule.exponential("500 millis").pipe(
  Schedule.jittered,
  Schedule.compose(Schedule.recurs(2)) // Max 2 retries (3 total attempts)
);

// ============================================================================
// Hook
// ============================================================================

type UseRegenerationParams = {
  setMessages: (updater: (curr: UIMessage[]) => UIMessage[]) => void;
  status: string;
  stop: () => void;
  regenerate: (opts: { messageId: string }) => Promise<void> | void;
  onError?: (error: RegenerationError | EditError) => void;
};

export function useRegeneration({
  setMessages,
  status,
  stop,
  regenerate,
  onError,
}: UseRegenerationParams) {
  const regenerateAnchorRef = useRef<{ id: string; role: Role } | null>(null);
  const hiddenIdsRef = useRef<Set<string>>(new Set());
  // Track current fiber for cancellation
  const currentFiberRef = useRef<Fiber.RuntimeFiber<void, RegenerationError> | null>(null);

  const pruneAt = useCallback(
    (list: UIMessage[], anchorId: string, role: Role) => {
      const idx = list.findIndex((m) => m.id === anchorId);
      if (idx === -1) return list;
      if (role === "user") return list.slice(0, idx + 1);
      return list.slice(0, idx);
    },
    []
  );

  // Create regeneration effect with retry
  const createRegenerateEffect = useCallback(
    (messageId: string): Effect.Effect<void, RegenerationError> =>
      Effect.tryPromise({
        try: () => Promise.resolve(regenerate({ messageId })),
        catch: (error) =>
          new RegenerationError({
            message: "Regeneration failed",
            messageId,
            cause: error,
          }),
      }).pipe(
        Effect.retry(retrySchedule),
        Effect.catchAll((error) =>
          Effect.gen(function* () {
            console.error("Regeneration failed after retries:", error);
            onError?.(error);
            return yield* Effect.fail(error);
          })
        )
      ),
    [regenerate, onError]
  );

  // Run regeneration with automatic cancellation of previous
  const runRegenerationWithCancellation = useCallback(
    (messageId: string) => {
      // Cancel previous if still running
      const previousFiber = currentFiberRef.current;
      if (previousFiber) {
        Effect.runFork(Fiber.interrupt(previousFiber));
      }

      const program = Effect.gen(function* () {
        const fiber = yield* Effect.fork(createRegenerateEffect(messageId));
        currentFiberRef.current = fiber;
        
        // Wait for completion, ignoring interruption
        yield* Fiber.join(fiber).pipe(
          Effect.catchAll(() => Effect.void)
        );
        
        // Clear ref when done
        if (currentFiberRef.current === fiber) {
          currentFiberRef.current = null;
        }
      });

      Effect.runFork(program);
    },
    [createRegenerateEffect]
  );

  const handleRegenerateAssistant = useCallback(
    (messageId: string, renderedMessages: UIMessage[]) => {
      const target = renderedMessages.find((m) => m.id === messageId);
      const role = (target?.role ?? "assistant") as Role;

      // Hide the anchor and everything after it
      const idx = renderedMessages.findIndex((m) => m.id === messageId);
      if (idx !== -1) {
        hiddenIdsRef.current = new Set(
          renderedMessages.slice(idx).map((m) => m.id)
        );
      }

      // Force re-render
      setMessages((curr) => [...curr]);
      regenerateAnchorRef.current = { id: messageId, role };

      if (status === "streaming") stop();

      runRegenerationWithCancellation(messageId);
    },
    [status, stop, setMessages, runRegenerationWithCancellation]
  );

  const handleRegenerateAfterUser = useCallback(
    (messageId: string, renderedMessages: UIMessage[]) => {
      const target = renderedMessages.find((m) => m.id === messageId);
      const role = (target?.role ?? "user") as Role;

      regenerateAnchorRef.current = { id: messageId, role };

      if (status === "streaming") stop();

      // Optimistic prune
      setMessages((curr) => pruneAt(curr, messageId, role));

      runRegenerationWithCancellation(messageId);
    },
    [status, stop, setMessages, pruneAt, runRegenerationWithCancellation]
  );

  const handleEditUserMessage = useCallback(
    async (
      messageId: string,
      newContent: string,
      renderedMessages: UIMessage[],
      persistEdit: (messageId: string, newContent: string) => Promise<void>
    ) => {
      const program = Effect.gen(function* () {
        // Persist edit first
        yield* Effect.tryPromise({
          try: () => persistEdit(messageId, newContent),
          catch: (error) =>
            new EditError({
              message: "Failed to persist edit",
              messageId,
              cause: error,
            }),
        });

        // Setup regeneration state
        const target = renderedMessages.find((m) => m.id === messageId);
        const role = (target?.role ?? "user") as Role;
        regenerateAnchorRef.current = { id: messageId, role };

        if (status === "streaming") stop();
        setMessages((curr) => pruneAt(curr, messageId, role));

        // Regenerate with retry
        yield* Effect.tryPromise({
          try: () => Promise.resolve(regenerate({ messageId })),
          catch: (error) =>
            new RegenerationError({
              message: "Regeneration after edit failed",
              messageId,
              cause: error,
            }),
        }).pipe(Effect.retry(retrySchedule));
      }).pipe(
        Effect.tapError((error) =>
          Effect.sync(() => {
            console.error("Edit and regenerate failed:", error);
            onError?.(error);
          })
        ),
        Effect.catchAll(() => Effect.void)
      );

      await Effect.runPromise(program);
    },
    [status, stop, setMessages, pruneAt, regenerate, onError]
  );

  // Cancel current regeneration
  const cancelCurrentRegeneration = useCallback(() => {
    const fiber = currentFiberRef.current;
    if (fiber) {
      Effect.runFork(Fiber.interrupt(fiber));
      currentFiberRef.current = null;
    }
  }, []);

  return {
    regenerateAnchorRef,
    hiddenIdsRef,
    pruneAt,
    handleRegenerateAssistant,
    handleRegenerateAfterUser,
    handleEditUserMessage,
    cancelCurrentRegeneration,
  } as const;
}

export function filterHiddenForRender(
  messages: UIMessage[],
  hiddenIdsRef: RefObject<Set<string>>,
): UIMessage[] {
  const hidden = hiddenIdsRef.current;
  if (!hidden || hidden.size === 0) return messages;
  return messages.filter((m) => !hidden.has(m.id));
}


