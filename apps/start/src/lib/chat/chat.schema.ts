import { z } from 'zod'

const messagePartSchema = z.union([
  z.object({ type: z.literal('text'), text: z.string() }),
  z.object({ type: z.string(), text: z.string().optional() }).passthrough(),
])

export const chatBodySchema = z.object({
  messages: z.array(
    z.object({
      id: z.string(),
      role: z.enum(['system', 'user', 'assistant']),
      parts: z.array(messagePartSchema).default([]),
    })
  ),
})

export type ChatBody = z.infer<typeof chatBodySchema>
