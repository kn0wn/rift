import { Layer } from 'effect'
import { AttachmentRagLive } from '@/lib/chat-backend/services/rag'
import { FileUploadOrchestratorLive } from '../services/file-upload-orchestrator.service'

export const FileLiveLayer = FileUploadOrchestratorLive.pipe(
  Layer.provideMerge(AttachmentRagLive),
)
