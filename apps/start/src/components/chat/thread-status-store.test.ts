import { describe, expect, it } from 'vitest'
import {
  getThreadGenerationStatus,
  setThreadGenerationStatus,
  syncThreadGenerationStatuses,
} from './thread-status-store'

describe('thread-status-store', () => {
  it('preserves focused thread status updates when a virtualized batch syncs another slice', () => {
    setThreadGenerationStatus('deep-linked-thread', 'generation')

    syncThreadGenerationStatuses([
      { threadId: 'visible-thread', generationStatus: 'pending' },
    ])

    expect(getThreadGenerationStatus('deep-linked-thread')).toBe('generation')
    expect(getThreadGenerationStatus('visible-thread')).toBe('pending')
  })
})
