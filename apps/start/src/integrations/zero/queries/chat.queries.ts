import {
  defineQuery,
} from '@rocicorp/zero'
import { z } from 'zod'
import { zql } from '../zql'

const orgScopedThreadArgs = z.object({
  organizationId: z.string().trim().min(1),
})

const orgScopedThreadByIdArgs = z.object({
  threadId: z.string(),
  organizationId: z.string().trim().min(1),
})

/**
 * Chat query definitions are grouped here to keep thread/message read models
 * cohesive and avoid coupling to organization settings queries.
 */
export const chatQueryDefinitions = {
  threads: {
    /** Threads for the current user in the active organization. */
    byUser: defineQuery(orgScopedThreadArgs, ({ args, ctx }) =>
      zql.thread
        .where('userId', ctx.userID)
        .where('ownerOrgId', args.organizationId)
        .where('visibility', 'visible')
        .orderBy('updatedAt', 'desc'),
    ),
    byId: defineQuery(
      orgScopedThreadByIdArgs,
      ({ args, ctx }) =>
        zql.thread
          .where('threadId', args.threadId)
          .where('userId', ctx.userID)
          .where('ownerOrgId', args.organizationId)
          .one(),
    ),
  },
  messages: {
    /** Messages in a thread, always scoped to the authenticated user context. */
    byThread: defineQuery(
      z.object({ threadId: z.string() }),
      ({ args, ctx }) =>
        zql.message
          .where('threadId', args.threadId)
          .where('userId', ctx.userID)
          .orderBy('created_at', 'asc'),
    ),
  },
}
