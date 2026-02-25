import { createFileRoute } from '@tanstack/react-router'
import { getAuth } from '@workos/authkit-tanstack-react-start'
import { MAX_UPLOAD_SIZE_BYTES } from '@/lib/upload/upload.model'
import { R2UploadServiceError, r2UploadService } from '@/lib/upload/upload.service'
import { getZeroDatabase } from '@/lib/chat-backend/infra/zero/db'

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

function readRequiredEnv(name: string): string | null {
  const raw = process.env[name]
  if (!raw) return null
  const trimmed = raw.trim()
  return trimmed.length > 0 ? trimmed : null
}

function resolveWorkerConvertUrl(workerUrl: string): string {
  const normalized = workerUrl.trim()
  if (normalized.endsWith('/convert')) return normalized
  return `${normalized.replace(/\/$/, '')}/convert`
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
          const workerUrl = readRequiredEnv('CF_MARKDOWN_WORKER_URL')
          const workerToken = readRequiredEnv('CF_MARKDOWN_WORKER_TOKEN')
          if (!workerUrl || !workerToken) {
            return jsonResponse(
              {
                error:
                  'Markdown conversion is not configured. Missing CF_MARKDOWN_WORKER_URL or CF_MARKDOWN_WORKER_TOKEN.',
              },
              500,
            )
          }

          const timeoutMs = Number.parseInt(
            process.env.CF_MARKDOWN_WORKER_TIMEOUT_MS ?? '',
            10,
          )
          const effectiveTimeoutMs = Number.isFinite(timeoutMs)
            ? Math.max(1_000, timeoutMs)
            : 20_000
          const controller = new AbortController()
          const timeoutId = setTimeout(
            () => controller.abort(),
            effectiveTimeoutMs,
          )
          let convertResponse: Response
          try {
            convertResponse = await fetch(resolveWorkerConvertUrl(workerUrl), {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${workerToken}`,
              },
              body: JSON.stringify({
                fileUrl: uploaded.url,
                fileName: uploaded.name,
              }),
              signal: controller.signal,
            })
          } catch (error) {
            clearTimeout(timeoutId)
            if (error instanceof Error && error.name === 'AbortError') {
              return jsonResponse({ error: 'Markdown conversion timed out' }, 504)
            }
            return jsonResponse({ error: 'Failed to convert uploaded file' }, 502)
          }
          clearTimeout(timeoutId)
          const workerPayload = (await convertResponse
            .json()
            .catch(() => null)) as { markdown?: unknown; error?: unknown } | null
          if (!convertResponse.ok) {
            const message =
              workerPayload && typeof workerPayload.error === 'string'
                ? workerPayload.error
                : 'Failed to convert uploaded file'
            return jsonResponse({ error: message }, convertResponse.status)
          }
          const markdown =
            workerPayload && typeof workerPayload.markdown === 'string'
              ? workerPayload.markdown
              : ''
          if (!markdown) {
            return jsonResponse(
              { error: 'Conversion response did not include markdown' },
              502,
            )
          }

          const db = getZeroDatabase()
          if (!db) {
            return jsonResponse(
              { error: 'ZERO_UPSTREAM_DB is not configured' },
              500,
            )
          }

          const now = Date.now()
          const attachmentId = crypto.randomUUID()
          await db.transaction(async (tx) => {
            await tx.mutate.attachment.insert({
              id: attachmentId,
              messageId: undefined,
              threadId: undefined,
              userId: user.id,
              fileKey: uploaded.key,
              attachmentUrl: uploaded.url,
              fileName: uploaded.name,
              mimeType: uploaded.contentType,
              fileSize: uploaded.size,
              fileContent: markdown,
              status: 'uploaded',
              createdAt: now,
              updatedAt: now,
            })
          })

          return jsonResponse(
            {
              id: attachmentId,
              key: uploaded.key,
              url: uploaded.url,
              name: uploaded.name,
              size: uploaded.size,
              contentType: uploaded.contentType,
            },
            200,
          )
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
