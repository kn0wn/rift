import { defineMutatorsWithType, defineMutator } from '@rocicorp/zero'
import { z } from 'zod'
import type { Schema } from './schema'

/** Minimal create payload; client generates id (e.g. nanoid). */
const createThreadArgs = z.object({
  id: z.string(),
  threadId: z.string(),
  title: z.string(),
  createdAt: z.number(),
  updatedAt: z.number(),
  lastMessageAt: z.number(),
  generationStatus: z.enum([
    'pending',
    'generation',
    'completed',
    'failed',
  ]),
  visibility: z.enum(['visible', 'archived']),
  userId: z.string(),
  model: z.string(),
  pinned: z.boolean(),
})

const createMessageArgs = z.object({
  id: z.string(),
  messageId: z.string(),
  threadId: z.string(),
  userId: z.string(),
  content: z.string(),
  status: z.enum([
    'waiting',
    'thinking',
    'streaming',
    'done',
    'error',
    'error.rejected',
    'deleted',
    'cancelled',
  ]),
  role: z.enum(['user', 'assistant', 'system']),
  created_at: z.number(),
  model: z.string(),
  attachmentsIds: z.array(z.string()),
})

export const mutators = defineMutatorsWithType<Schema>()({
  threads: {
    create: defineMutator(createThreadArgs, async ({ tx, args, ctx }) => {
      if (args.userId !== ctx.userID) {
        throw new Error('Forbidden: thread userId must match context userID')
      }
      await tx.mutate.thread.insert({
        id: args.id,
        threadId: args.threadId,
        title: args.title,
        createdAt: args.createdAt,
        updatedAt: args.updatedAt,
        lastMessageAt: args.lastMessageAt,
        generationStatus: args.generationStatus,
        visibility: args.visibility,
        userId: args.userId,
        model: args.model,
        pinned: args.pinned,
      })
    }),
  },
  messages: {
    create: defineMutator(createMessageArgs, async ({ tx, args, ctx }) => {
      if (args.userId !== ctx.userID) {
        throw new Error('Forbidden: message userId must match context userID')
      }
      await tx.mutate.message.insert({
        id: args.id,
        messageId: args.messageId,
        threadId: args.threadId,
        userId: args.userId,
        content: args.content,
        status: args.status,
        role: args.role,
        created_at: args.created_at,
        model: args.model,
        attachmentsIds: args.attachmentsIds,
      })
    }),
  },
})
