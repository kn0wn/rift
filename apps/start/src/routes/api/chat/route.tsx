import { createFileRoute } from '@tanstack/react-router'
import { chatBodySchema } from '@/lib/chat/chat.schema'
import { handleChatStream } from '@/lib/chat/chat.handler'

export const Route = createFileRoute('/api/chat')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown
        try {
          body = await request.json()
        } catch {
          return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          })
        }
        const parsed = chatBodySchema.safeParse(body)
        if (!parsed.success) {
          return new Response(
            JSON.stringify({ error: 'Validation failed', issues: parsed.error.issues }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
          )
        }
        return handleChatStream(parsed.data)
      },
    },
  },
})
