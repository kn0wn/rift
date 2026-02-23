import { Layer } from 'effect'
import { ChatOrchestratorLive } from '../services/chat-orchestrator.service'
import { MessageStoreZero } from '../services/message-store.service'
import { ModelGatewayLive } from '../services/model-gateway.service'
import { ModelPolicyLive } from '../services/model-policy.service'
import { RateLimitMemory } from '../services/rate-limit.service'
import { StreamResumeLive } from '../services/stream-resume.service'
import { ThreadServiceZero } from '../services/thread.service'
import { ToolRegistryLive } from '../services/tool-registry.service'

/**
 * Production dependency graph for chat runtime.
 * Persistence uses Zero/Postgres, stream resume uses Redis, and rate limiting
 * is temporarily in-memory until distributed limiter is introduced.
 */
export const ChatLiveLayer = ChatOrchestratorLive.pipe(
  Layer.provideMerge(ThreadServiceZero),
  Layer.provideMerge(MessageStoreZero),
  Layer.provideMerge(RateLimitMemory),
  Layer.provideMerge(ModelPolicyLive),
  Layer.provideMerge(ToolRegistryLive),
  Layer.provideMerge(ModelGatewayLive),
  Layer.provideMerge(StreamResumeLive),
)
