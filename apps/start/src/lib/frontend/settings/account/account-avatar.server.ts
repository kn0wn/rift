import { z } from 'zod'
import { getRequestHeaders } from '@tanstack/react-start/server'
import { auth } from '@/lib/backend/auth/auth.server'
import { getSessionFromHeaders } from '@/lib/backend/auth/server-session.server'

const SaveAvatarServerSchema = z.object({
  avatarUrl: z.string().trim().url().max(2048),
})

export type SaveAvatarResult = {
  image: string
}

export async function saveUserAvatarImage(input: unknown): Promise<SaveAvatarResult> {
  const parsed = SaveAvatarServerSchema.parse(input)
  const headers = getRequestHeaders()
  const session = await getSessionFromHeaders(headers)

  if (!session || session.user.isAnonymous) {
    throw new Error('Unauthorized')
  }

  await auth.api.updateUser({
    headers,
    body: {
      image: parsed.avatarUrl,
    },
  })

  return {
    image: parsed.avatarUrl,
  }
}
