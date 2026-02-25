/**
 * Persisted attachment metadata stored with user messages.
 * URLs point to files uploaded to object storage and can be used by clients for previews.
 */
export type ChatAttachment = {
  id: string
  key: string
  url: string
  name: string
  size: number
  contentType: string
}

/**
 * Attachment reference submitted with a user message.
 * The upload route already persisted file metadata and markdown content.
 */
export type ChatAttachmentInput = {
  id: string
}
