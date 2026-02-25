import { createFileRoute } from '@tanstack/react-router'
import { getAuth } from '@workos/authkit-tanstack-react-start'
import { z } from 'zod'

type WorkerMarkdownSuccess = {
  markdown?: unknown
  name?: unknown
  tokens?: unknown
}

const SUPPORTED_MIME_TYPES = new Set([
  'application/pdf',
  'application/x-pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/svg+xml',
  'text/html',
  'application/xml',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-excel.sheet.macroenabled.12',
  'application/vnd.ms-excel.sheet.binary.macroenabled.12',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.oasis.opendocument.spreadsheet',
  'application/vnd.oasis.opendocument.text',
  'text/csv',
  'application/vnd.apple.numbers',
])
const SUPPORTED_EXTENSIONS = new Set([
  'pdf',
  'jpeg',
  'jpg',
  'png',
  'webp',
  'svg',
  'html',
  'htm',
  'xml',
  'xlsx',
  'xlsm',
  'xlsb',
  'xls',
  'et',
  'docx',
  'ods',
  'odt',
  'csv',
  'numbers',
])
const DEFAULT_MAX_MARKDOWN_CHARS = 120_000
const DEFAULT_WORKER_TIMEOUT_MS = 20_000

const MarkdownRequestSchema = z.object({
  key: z.string().trim().min(1),
  url: z.string().trim().min(1),
  name: z.string().trim().min(1),
  contentType: z.string().trim().optional().default(''),
})

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

function sanitizeSegment(segment: string): string {
  return segment.replace(/[^a-zA-Z0-9._-]/g, '_')
}

function isSupportedUpload(fileName: string, contentType: string): boolean {
  const normalizedType = contentType.trim().toLowerCase()
  if (SUPPORTED_MIME_TYPES.has(normalizedType)) return true

  const normalizedName = fileName.trim().toLowerCase()
  const dot = normalizedName.lastIndexOf('.')
  if (dot <= 0 || dot === normalizedName.length - 1) return false
  return SUPPORTED_EXTENSIONS.has(normalizedName.slice(dot + 1))
}

function readRequiredEnv(name: string): string | null {
  const raw = process.env[name]
  if (!raw) return null
  const trimmed = raw.trim()
  return trimmed.length > 0 ? trimmed : null
}

/**
 * Supports either:
 * - full endpoint in CF_MARKDOWN_WORKER_URL (ending with /convert), or
 * - worker base URL, where /convert is appended automatically.
 */
function resolveWorkerConvertUrl(workerUrl: string): string {
  const normalized = workerUrl.trim()
  if (normalized.endsWith('/convert')) return normalized
  return `${normalized.replace(/\/$/, '')}/convert`
}

export const Route = createFileRoute('/api/files/markdown')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { user } = await getAuth()
        if (!user) return jsonResponse({ error: 'Unauthorized' }, 401)

        let rawBody: unknown
        try {
          rawBody = await request.json()
        } catch {
          return jsonResponse({ error: 'Invalid JSON body' }, 400)
        }
        const parsedBody = MarkdownRequestSchema.safeParse(rawBody)
        if (!parsedBody.success) {
          return jsonResponse(
            { error: 'Validation failed for markdown conversion request' },
            400,
          )
        }
        const body = parsedBody.data

        const { key, url, name, contentType } = body

        if (!isSupportedUpload(name, contentType)) {
          return jsonResponse(
            { error: 'File type is not supported for markdown conversion' },
            400,
          )
        }

        // File keys are namespaced by sanitized user id in upload.service.ts.
        const userPrefix = `uploads/${sanitizeSegment(user.id)}/`
        if (!key.startsWith(userPrefix)) {
          return jsonResponse({ error: 'File key is not owned by the user' }, 403)
        }

        const publicBaseUrl = readRequiredEnv('R2_PUBLIC_BASE_URL')
        if (publicBaseUrl && !url.startsWith(publicBaseUrl.replace(/\/$/, ''))) {
          return jsonResponse(
            { error: 'File URL does not match configured storage domain' },
            403,
          )
        }

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

        const maxMarkdownChars = Number.parseInt(
          process.env.CF_MARKDOWN_MAX_CHARS ?? '',
          10,
        )
        const markdownLimit = Number.isFinite(maxMarkdownChars)
          ? Math.max(1_000, maxMarkdownChars)
          : DEFAULT_MAX_MARKDOWN_CHARS

        const timeoutMs = Number.parseInt(
          process.env.CF_MARKDOWN_WORKER_TIMEOUT_MS ?? '',
          10,
        )
        const effectiveTimeoutMs = Number.isFinite(timeoutMs)
          ? Math.max(1_000, timeoutMs)
          : DEFAULT_WORKER_TIMEOUT_MS
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), effectiveTimeoutMs)
        let convertResponse: Response
        try {
          convertResponse = await fetch(resolveWorkerConvertUrl(workerUrl), {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${workerToken}`,
            },
            body: JSON.stringify({
              fileUrl: url,
              fileName: name,
            }),
            signal: controller.signal,
          })
        } catch (error) {
          clearTimeout(timeoutId)
          if (error instanceof Error && error.name === 'AbortError') {
            return jsonResponse(
              { error: 'Markdown conversion timed out' },
              504,
            )
          }
          return jsonResponse(
            { error: 'Worker markdown conversion failed' },
            502,
          )
        }
        clearTimeout(timeoutId)

        const workerPayload = (await convertResponse
          .json()
          .catch(() => null)) as WorkerMarkdownSuccess | null

        if (!convertResponse.ok) {
          const message =
            workerPayload &&
            typeof workerPayload === 'object' &&
            'error' in workerPayload &&
            typeof (workerPayload as { error?: unknown }).error === 'string'
              ? (workerPayload as { error: string }).error
              : 'Worker markdown conversion failed'
          return jsonResponse({ error: message }, convertResponse.status)
        }

        const markdown =
          workerPayload &&
          typeof workerPayload === 'object' &&
          typeof workerPayload.markdown === 'string'
            ? workerPayload.markdown
            : null
        if (!markdown) {
          return jsonResponse(
            { error: 'Worker response did not contain markdown content' },
            502,
          )
        }

        const boundedMarkdown =
          markdown.length > markdownLimit
            ? `${markdown.slice(0, markdownLimit)}\n\n[Truncated due to context size limit]`
            : markdown

        const tokenCount =
          workerPayload &&
          typeof workerPayload === 'object' &&
          typeof workerPayload.tokens === 'number'
            ? workerPayload.tokens
            : 0

        return jsonResponse(
          {
            key,
            name,
            markdown: boundedMarkdown,
            tokenCount,
          },
          200,
        )
      },
    },
  },
})
