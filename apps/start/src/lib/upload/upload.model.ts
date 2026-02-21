export const MAX_UPLOAD_SIZE_BYTES = 10 * 1024 * 1024
export const MAX_UPLOAD_SIZE = '10m'

export const ALLOWED_UPLOAD_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
  'application/pdf',
] as const

export type UploadResponseBody = {
  key: string
  url: string
  name: string
  size: number
  contentType: string
}
