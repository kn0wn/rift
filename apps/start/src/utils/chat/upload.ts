/**
 * Chat file upload: accepted types and helpers for building attachment entries.
 * Used by hooks/chat/upload and the chat input UI.
 */

/** Accept string for <input accept=""> (images and PDF). */
export const ACCEPTED_FILE_TYPES = 'image/*,application/pdf'
export const MAX_UPLOAD_SIZE_BYTES = 10 * 1024 * 1024

export type UploadedFile = {
  key: string
  url: string
  name: string
  size: number
  contentType: string
}

export function isAcceptedFile(file: File): boolean {
  const type = file.type.trim().toLowerCase()
  if (type.startsWith('image/')) return true
  if (type === 'application/pdf' || type === 'application/x-pdf') return true
  if (
    (type === '' || type === 'application/octet-stream') &&
    file.name.trim().toLowerCase().endsWith('.pdf')
  ) {
    return true
  }
  return false
}

export function getFileValidationError(file: File): string | null {
  if (!isAcceptedFile(file)) {
    return 'Only image and PDF files are allowed'
  }
  if (file.size <= 0) {
    return 'File is empty'
  }
  if (file.size > MAX_UPLOAD_SIZE_BYTES) {
    return `File exceeds limit of ${Math.floor(MAX_UPLOAD_SIZE_BYTES / (1024 * 1024))}MB`
  }
  return null
}

/**
 * Builds an attachment entry from a raw File (id, name, size, file, optional object URL for images).
 * Caller must call URL.revokeObjectURL(entry.preview) when removing the file.
 */
export function createAttachedFile(file: File): {
  id: string
  name: string
  size: number
  file: File
  preview?: string
} {
  return {
    id: crypto.randomUUID(),
    name: file.name,
    size: file.size,
    file,
    preview:
      file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
  }
}

export async function uploadFileToServer(file: File): Promise<UploadedFile> {
  const formData = new FormData()
  formData.set('file', file)

  const response = await fetch('/api/files/upload', {
    method: 'POST',
    body: formData,
    credentials: 'same-origin',
  })

  const payload = await response.json().catch(() => null)
  if (!response.ok) {
    const message =
      payload &&
      typeof payload === 'object' &&
      'error' in payload &&
      typeof payload.error === 'string'
        ? payload.error
        : `Upload failed with status ${response.status}`
    throw new Error(message)
  }

  return payload as UploadedFile
}
