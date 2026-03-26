'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { AttachedFile } from '../../../components/chat/prompt-input'
import {
  CHAT_ATTACHMENT_UPLOAD_POLICY,
  getUploadValidationError,
} from '../../../lib/shared/upload/upload-validation'
import {
  createAttachedFile,
  uploadFileToServer,
} from '../../../lib/frontend/chat/upload'

export type UseFileAttachmentsOptions = {
  /** Maximum number of files allowed (default 10). */
  maxFiles?: number
  /** Whether uploads are enabled for the current user/context. */
  enabled?: boolean
  /** Message surfaced when the upload UI is intentionally disabled. */
  disabledMessage?: string
}

/**
 * Hook for managing file attachments in the chat input.
 * Handles validation, upload orchestration, and object URL cleanup so every
 * ingestion source behaves the same once it becomes a File object.
 */
export function useFileAttachments(options: UseFileAttachmentsOptions = {}) {
  const {
    maxFiles = 10,
    enabled = true,
    disabledMessage = 'File uploads are not available.',
  } = options
  const [files, setFiles] = useState<AttachedFile[]>([])
  const filesRef = useRef<AttachedFile[]>([])

  useEffect(() => {
    filesRef.current = files
  }, [files])

  const markUploadSuccess = useCallback(
    (id: string, uploaded: NonNullable<AttachedFile['uploaded']>) => {
      setFiles((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, isUploading: false, uploadError: undefined, uploaded }
            : item,
        ),
      )
    },
    [],
  )

  const markUploadFailure = useCallback((id: string, message: string) => {
    setFiles((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, isUploading: false, uploadError: message }
          : item,
      ),
    )
  }, [])

  const uploadAttachment = useCallback(
    async (id: string, file: File) => {
      try {
        const uploaded = await uploadFileToServer(file)
        markUploadSuccess(id, uploaded)
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Failed to upload file'
        markUploadFailure(id, message)
      }
    },
    [markUploadFailure, markUploadSuccess],
  )

  /**
   * Shared ingestion path for picker, drag/drop, and synthetic files such as
   * long pasted text converted into a `.txt` attachment.
   */
  const addFiles = useCallback(
    (incomingFiles: readonly File[]) => {
      if (incomingFiles.length === 0) {
        return
      }

      if (!enabled) {
        const selected = incomingFiles.slice(0, 1)
        setFiles((current) => [
          ...current,
          ...selected.map((file) => ({
            ...createAttachedFile(file),
            isUploading: false,
            uploadError: disabledMessage,
          })),
        ])
        return
      }

      const currentFiles = filesRef.current
      const remaining = maxFiles - currentFiles.length
      const toConsider = incomingFiles.slice(0, Math.max(0, remaining))
      if (toConsider.length === 0) {
        return
      }

      const queue: Array<{ id: string; file: File }> = []
      const nextItems = toConsider.map((file) => {
        const base = createAttachedFile(file)
        const validationError = getUploadValidationError(
          file,
          CHAT_ATTACHMENT_UPLOAD_POLICY,
        )
        if (validationError) {
          return {
            ...base,
            isUploading: false,
            uploadError: validationError,
          } satisfies AttachedFile
        }
        queue.push({ id: base.id, file })
        return {
          ...base,
          isUploading: true,
        } satisfies AttachedFile
      })

      const nextFiles = [...currentFiles, ...nextItems]
      filesRef.current = nextFiles
      setFiles(nextFiles)

      for (const item of queue) {
        void uploadAttachment(item.id, item.file)
      }
    },
    [disabledMessage, enabled, maxFiles, uploadAttachment],
  )

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      addFiles(Array.from(e.target.files ?? []))
      e.target.value = ''
    },
    [addFiles],
  )

  /**
   * Drop handling follows the exact same validation and upload path as the
   * hidden file input so the composer behaves the same regardless of how the
   * file reaches it.
   */
  const handleFilesDrop = useCallback(
    (filesToUpload: readonly File[]) => {
      addFiles(filesToUpload)
    },
    [addFiles],
  )

  const handleRemoveFile = useCallback((id: string) => {
    setFiles((prev) => {
      const item = prev.find((f) => f.id === id)
      if (item?.preview) URL.revokeObjectURL(item.preview)
      return prev.filter((f) => f.id !== id)
    })
  }, [])

  /**
   * Clears all attachments from the composer and releases any preview object URLs.
   * This is used after a successful send so the UI reflects that files were consumed.
   */
  const clearFiles = useCallback(() => {
    setFiles((prev) => {
      for (const item of prev) {
        if (item.preview) URL.revokeObjectURL(item.preview)
      }
      return []
    })
  }, [])

  return {
    files,
    addFiles,
    handleFileSelect,
    handleFilesDrop,
    handleRemoveFile,
    clearFiles,
    canAddMore: enabled && files.length < maxFiles,
    maxFiles,
  }
}
