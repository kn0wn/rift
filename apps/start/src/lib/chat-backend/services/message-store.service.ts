import type { UIMessage } from 'ai'
import { Effect, Layer, ServiceMap } from 'effect'
import { getCatalogModel } from '@/lib/ai-catalog'
import type { AiReasoningEffort } from '@/lib/ai-catalog/types'
import type {
  ChatAttachment,
  ChatAttachmentInput,
} from '@/lib/chat-contracts/attachments'
import { MessagePersistenceError } from '../domain/errors'
import type { IncomingUserMessage } from '../domain/schemas'
import { getUserMessageText } from '../domain/schemas'
import { getMemoryState } from '../infra/memory/state'
import { getZeroDatabase, zql } from '../infra/zero/db'

/**
 * Message persistence adapter backed by Zero + upstream Postgres.
 * Responsible for loading thread history and persisting user/assistant turns.
 */
export type MessageStoreServiceShape = {
  readonly loadThreadMessages: (input: {
    readonly threadId: string
    readonly model: string
    readonly requestId: string
  }) => Effect.Effect<UIMessage[], MessagePersistenceError>
  readonly appendUserMessage: (input: {
    readonly threadDbId: string
    readonly threadId: string
    readonly message: IncomingUserMessage
    readonly attachments?: readonly ChatAttachmentInput[]
    readonly userId: string
    readonly model: string
    readonly reasoningEffort?: AiReasoningEffort
    readonly modelParams?: {
      readonly reasoningEffort?: AiReasoningEffort
    }
    readonly requestId: string
  }) => Effect.Effect<UIMessage, MessagePersistenceError>
  readonly finalizeAssistantMessage: (input: {
    readonly threadDbId: string
    readonly threadModel: string
    readonly threadId: string
    readonly userId: string
    readonly assistantMessageId: string
    readonly ok: boolean
    readonly finalContent: string
    readonly reasoning?: string
    readonly errorMessage?: string
    readonly modelParams?: {
      readonly reasoningEffort?: AiReasoningEffort
    }
    readonly requestId: string
  }) => Effect.Effect<void, MessagePersistenceError>
}

export class MessageStoreService extends ServiceMap.Service<
  MessageStoreService,
  MessageStoreServiceShape
>()('chat-backend/MessageStoreService') {}

/** Converts validated inbound payload into UIMessage shape expected by AI SDK. */
const toUserMessage = (
  message: IncomingUserMessage,
  attachments: readonly ChatAttachment[] = [],
): UIMessage => ({
  id: message.id,
  role: 'user',
  parts: [{ type: 'text', text: getUserMessageText(message) }],
  metadata: attachments.length > 0 ? { attachments } : undefined,
})

function buildAttachmentContextBlock(
  attachments: readonly {
    fileName: string
    mimeType: string
    fileContent: string
  }[],
): string {
  const sections = attachments
    .map(
      (attachment) =>
        `## File: ${attachment.fileName} (${attachment.mimeType})\n\n${attachment.fileContent}`,
    )
    .join('\n\n')
  return [
    'Use this extracted file content as supporting context for the next user request.',
    'If the user question is unrelated, ignore this context.',
    '',
    sections,
  ].join('\n')
}

function isImageMimeType(mimeType: string): boolean {
  return mimeType.toLowerCase().startsWith('image/')
}

function isPdfMimeType(mimeType: string): boolean {
  const normalized = mimeType.toLowerCase()
  return normalized === 'application/pdf' || normalized === 'application/x-pdf'
}

function supportsNativeAttachment(input: {
  readonly mimeType: string
  readonly capabilities: {
    readonly supportsImageInput: boolean
    readonly supportsPdfInput: boolean
    readonly supportsFileInput: boolean
  }
}): boolean {
  const { mimeType, capabilities } = input
  if (isImageMimeType(mimeType)) return capabilities.supportsImageInput
  if (isPdfMimeType(mimeType)) return capabilities.supportsPdfInput
  // Generic file support is intentionally ignored here:
  // non-image/PDF files should always use markdown fallback context.
  return false
}

/** Production message store implementation. */
export const MessageStoreZero = Layer.succeed(MessageStoreService, {
  loadThreadMessages: ({ threadId, model, requestId }) =>
    Effect.tryPromise({
      try: async () => {
        const db = getZeroDatabase()
        if (!db) {
          throw new Error('ZERO_UPSTREAM_DB is not configured')
        }

        const messageRows = await db.run(
          zql.message.where('threadId', threadId).orderBy('created_at', 'asc'),
        )
        const attachmentRows = await db.run(
          zql.attachment.where('threadId', threadId).orderBy('createdAt', 'asc'),
        )
        const attachmentsById = new Map(
          attachmentRows.map((attachment) => [attachment.id, attachment]),
        )
        const modelCapabilities = getCatalogModel(model)?.capabilities

        return messageRows.map((message) => {
          const attachmentIds = Array.isArray(message.attachmentsIds)
            ? message.attachmentsIds
            : []
          const linkedAttachments = attachmentIds
            .map((id) => attachmentsById.get(id))
            .filter((attachment) => !!attachment)
          const attachmentMetadata: ChatAttachment[] = linkedAttachments.map(
            (attachment) => ({
              id: attachment.id,
              key: attachment.fileKey,
              url: attachment.attachmentUrl,
              name: attachment.fileName,
              size: attachment.fileSize,
              contentType: attachment.mimeType,
            }),
          )
          const nativeAttachments =
            message.role === 'user'
              ? linkedAttachments.filter((attachment) =>
                  modelCapabilities
                    ? supportsNativeAttachment({
                        mimeType: attachment.mimeType,
                        capabilities: modelCapabilities,
                      })
                    : false,
                )
              : []
          const fallbackAttachments =
            message.role === 'user'
              ? linkedAttachments.filter((attachment) =>
                  modelCapabilities
                    ? !supportsNativeAttachment({
                        mimeType: attachment.mimeType,
                        capabilities: modelCapabilities,
                      })
                    : true,
                )
              : []
          const modelText =
            message.role === 'user' && fallbackAttachments.length > 0
              ? `${message.content}\n\n${buildAttachmentContextBlock(fallbackAttachments)}`
              : message.content
          const messageParts: UIMessage['parts'] = [
            { type: 'text', text: modelText },
            ...nativeAttachments.map((attachment) => ({
              type: 'file' as const,
              mediaType: attachment.mimeType,
              filename: attachment.fileName,
              url: attachment.attachmentUrl,
            })),
          ]

          return {
            id: message.messageId,
            role: message.role,
            parts: messageParts,
            metadata: {
              ...(message.role === 'assistant' ? { model: message.model } : {}),
              ...(attachmentMetadata.length > 0
                ? { attachments: attachmentMetadata }
                : {}),
            },
          }
        })
      },
      catch: (error) =>
        new MessagePersistenceError({
          message: 'Failed to load messages',
          requestId,
          threadId,
          cause: String(error),
        }),
    }),
  appendUserMessage: ({
    threadDbId,
    threadId,
    message,
    attachments,
    userId,
    model,
    reasoningEffort,
    modelParams,
    requestId,
  }) =>
    Effect.tryPromise({
      try: async () => {
        const db = getZeroDatabase()
        if (!db) {
          throw new Error('ZERO_UPSTREAM_DB is not configured')
        }

        const now = Date.now()
        const linkedAttachmentsForReturn: ChatAttachment[] = []
        await db.transaction(async (tx) => {
          try {
            const existing = await tx.run(
              zql.message.where('id', message.id).where('userId', userId).one(),
            )
            if (existing) return

            const attachmentIds = (attachments ?? [])
              .map((attachment) => attachment.id)
              .filter((id) => id.trim().length > 0)
            const linkedAttachments: ChatAttachment[] = []
            for (const attachmentId of attachmentIds) {
              const existingAttachment = await tx.run(
                zql.attachment
                  .where('id', attachmentId)
                  .where('userId', userId)
                  .one(),
              )
              if (!existingAttachment) continue

              linkedAttachments.push({
                id: existingAttachment.id,
                key: existingAttachment.fileKey,
                url: existingAttachment.attachmentUrl,
                name: existingAttachment.fileName,
                size: existingAttachment.fileSize,
                contentType: existingAttachment.mimeType,
              })

              await tx.mutate.attachment.update({
                id: existingAttachment.id,
                messageId: message.id,
                threadId,
                updatedAt: now,
              })
            }
            linkedAttachmentsForReturn.push(...linkedAttachments)

            await tx.mutate.message.insert({
              // Deterministic key makes retries naturally idempotent.
              id: message.id,
              messageId: message.id,
              threadId,
              userId,
              content: getUserMessageText(message),
              status: 'done',
              role: 'user',
              created_at: now,
              updated_at: now,
              model,
              modelParams,
              sources: linkedAttachments.map((attachment) => ({
                sourceId: attachment.id,
                url: attachment.url,
                title: attachment.name,
              })),
              attachmentsIds: linkedAttachments.map((attachment) => attachment.id),
            })
          } catch {
            // Duplicate insert on retry; row already exists.
            return
          }

          await tx.mutate.thread.update({
            id: threadDbId,
            model,
            reasoningEffort,
            generationStatus: 'generation',
            updatedAt: now,
            lastMessageAt: now,
          })
        })

        return toUserMessage(
          message,
          linkedAttachmentsForReturn,
        )
      },
      catch: (error) =>
        new MessagePersistenceError({
          message: 'Failed to append user message',
          requestId,
          threadId,
          cause: String(error),
        }),
    }),
  finalizeAssistantMessage: ({
    threadDbId,
    threadModel,
    threadId,
    userId,
    assistantMessageId,
    ok,
    finalContent,
    reasoning,
    errorMessage,
    modelParams,
    requestId,
  }) =>
    Effect.tryPromise({
      try: async () => {
        const db = getZeroDatabase()
        if (!db) {
          throw new Error('ZERO_UPSTREAM_DB is not configured')
        }

        const now = Date.now()
        await db.transaction(async (tx) => {
          const existing = await tx.run(
            zql.message
              .where('id', assistantMessageId)
              .where('userId', userId)
              .one(),
          )

          if (existing) {
            // Update path is idempotent: retries finalize the same assistant row.
            const update: {
              id: string
              content: string
              reasoning?: string
              status: 'done' | 'error'
              updated_at: number
              modelParams?: { readonly reasoningEffort?: AiReasoningEffort }
              serverError?: { type: string; message: string }
            } = {
              id: existing.id,
              content: finalContent,
              reasoning,
              status: ok ? 'done' : 'error',
              updated_at: now,
              modelParams,
            }

            if (!ok) {
              update.serverError = {
                type: 'stream_error',
                message: errorMessage ?? 'Assistant stream failed',
              }
            }

            await tx.mutate.message.update(update)
          } else {
            // Insert path handles first successful finalize for this assistant message.
            const insert: {
              id: string
              messageId: string
              threadId: string
              userId: string
              content: string
              reasoning?: string
              status: 'done' | 'error'
              role: 'assistant'
              created_at: number
              updated_at: number
              model: string
              modelParams?: { readonly reasoningEffort?: AiReasoningEffort }
              attachmentsIds: readonly string[]
              serverError?: { type: string; message: string }
            } = {
              id: assistantMessageId,
              messageId: assistantMessageId,
              threadId,
              userId,
              content: finalContent,
              reasoning,
              status: ok ? 'done' : 'error',
              role: 'assistant',
              created_at: now,
              updated_at: now,
              model: threadModel,
              modelParams,
              attachmentsIds: [],
            }
            if (!ok) {
              insert.serverError = {
                type: 'stream_error',
                message: errorMessage ?? 'Assistant stream failed',
              }
            }
            await tx.mutate.message.insert(insert)
          }

          await tx.mutate.thread.update({
            id: threadDbId,
            generationStatus: ok ? 'completed' : 'failed',
            updatedAt: now,
            lastMessageAt: now,
          })
        })
      },
      catch: (error) =>
        new MessagePersistenceError({
          message: 'Failed to finalize assistant message',
          requestId,
          threadId,
          cause: String(error),
        }),
    }),
})

/** Test-only adapter retained for deterministic unit tests. */
export const MessageStoreMemory = Layer.succeed(MessageStoreService, {
  loadThreadMessages: ({ threadId, model: _model, requestId }) =>
    Effect.sync(() => {
      const existing = getMemoryState().messages.get(threadId)
      if (!existing) {
        throw new Error('missing thread message store')
      }
      return existing.slice()
    }).pipe(
      Effect.catch((error) =>
        Effect.fail(
          new MessagePersistenceError({
            message: 'Failed to load messages',
            requestId,
            threadId,
            cause: String(error),
          }),
        ),
      ),
    ),
  appendUserMessage: ({ threadId, message, requestId }) =>
    Effect.sync(() => {
      const existing = getMemoryState().messages.get(threadId)
      if (!existing) {
        throw new Error('missing thread message store')
      }
      const uiMessage = toUserMessage(message, [])
      existing.push(uiMessage)
      return uiMessage
    }).pipe(
      Effect.catch((error) =>
        Effect.fail(
          new MessagePersistenceError({
            message: 'Failed to append user message',
            requestId,
            threadId,
            cause: String(error),
          }),
        ),
      ),
    ),
  finalizeAssistantMessage: ({
    threadId,
    assistantMessageId,
    finalContent,
    reasoning,
    requestId,
  }) =>
    Effect.sync(() => {
      const existing = getMemoryState().messages.get(threadId)
      if (!existing) {
        throw new Error('missing thread message store')
      }
      const target = existing.find((message) => message.id === assistantMessageId)
      if (!target) {
        const parts: UIMessage['parts'] = []
        if (reasoning && reasoning.trim().length > 0) {
          parts.push({ type: 'reasoning', text: reasoning, state: 'done' })
        }
        parts.push({ type: 'text', text: finalContent })
        existing.push({
          id: assistantMessageId,
          role: 'assistant',
          parts,
        })
        return
      }
      const parts: UIMessage['parts'] = []
      if (reasoning && reasoning.trim().length > 0) {
        parts.push({ type: 'reasoning', text: reasoning, state: 'done' })
      }
      parts.push({ type: 'text', text: finalContent })
      target.parts = parts
    }).pipe(
      Effect.catch((error) =>
        Effect.fail(
          new MessagePersistenceError({
            message: 'Failed to finalize assistant message',
            requestId,
            threadId,
            cause: String(error),
          }),
        ),
      ),
    ),
})
