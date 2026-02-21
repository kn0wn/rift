import { createFileRoute } from '@tanstack/react-router'
import { getAuth } from '@workos/authkit-tanstack-react-start'
import { MAX_UPLOAD_SIZE_BYTES } from '@/lib/upload/upload.model'
import { R2UploadServiceError, r2UploadService } from '@/lib/upload/upload.service'

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

export const Route = createFileRoute('/api/files/upload')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { user } = await getAuth()
        if (!user) {
          return jsonResponse({ error: 'Unauthorized' }, 401)
        }

        let formData: FormData
        try {
          formData = await request.formData()
        } catch {
          return jsonResponse({ error: 'Invalid multipart form data' }, 400)
        }

        const input = formData.get('file')
        if (!(input instanceof File)) {
          return jsonResponse({ error: 'Missing file field' }, 400)
        }

        // Early guard before hitting storage client.
        if (input.size > MAX_UPLOAD_SIZE_BYTES) {
          return jsonResponse(
            { error: `File exceeds limit of ${Math.floor(MAX_UPLOAD_SIZE_BYTES / (1024 * 1024))}MB` },
            400,
          )
        }

        try {
          const uploaded = await r2UploadService.upload({
            userId: user.id,
            file: input,
          })
          return jsonResponse(uploaded, 200)
        } catch (error) {
          if (error instanceof R2UploadServiceError) {
            return jsonResponse({ error: error.message }, error.statusCode)
          }
          console.error('File upload failed', error)
          return jsonResponse({ error: 'Failed to upload file' }, 500)
        }
      },
    },
  },
})
