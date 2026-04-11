import { describe, expect, it, vi } from 'vitest'
import { Effect } from 'effect'
import { makeLoadThreadMessagesOperation } from './load-thread-messages'

describe('makeLoadThreadMessagesOperation', () => {
  it('attempts org knowledge lookup whenever org knowledge is enabled', async () => {
    const listActiveAttachmentIds = vi.fn(() =>
      Effect.succeed<readonly string[]>([]),
    )
    const run = vi
      .fn()
      .mockResolvedValueOnce([
        {
          messageId: 'user-1',
          role: 'user',
          parentMessageId: null,
          branchIndex: 0,
          created_at: Date.now(),
          content: 'How does this work?',
          userId: 'user-1',
          attachmentsIds: [],
        },
      ])
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce([])

    const loadThreadMessages = makeLoadThreadMessagesOperation({
      zeroDatabase: {
        getOrFail: Effect.succeed({
          run,
        } as never),
        withDatabase: (withDatabaseRun: (db: { run: typeof run }) => unknown) =>
          withDatabaseRun({
            run,
          } as never),
      } as never,
      attachmentRecord: {
        listAttachmentContentRowsByThread: () => Effect.succeed([]),
      } as never,
      attachmentRag: {
        searchThreadAttachments: () => Effect.succeed([]),
      } as never,
      orgKnowledgeRag: {
        searchOrgKnowledge: () => Effect.succeed([]),
      } as never,
      orgKnowledgeRepository: {
        listActiveAttachmentIds,
      } as never,
    })

    const messages = await Effect.runPromise(
      loadThreadMessages({
        threadId: 'thread-1',
        model: 'openai/gpt-5-mini',
        organizationId: 'org-1',
        orgPolicy: {
          organizationId: 'org-1',
          disabledProviderIds: [],
          disabledModelIds: [],
          complianceFlags: {},
          toolPolicy: {
            providerNativeToolsEnabled: true,
            externalToolsEnabled: true,
            disabledToolKeys: [],
          },
          orgKnowledgeEnabled: true,
          providerKeyStatus: {
            syncedAt: 0,
            hasAnyProviderKey: false,
            providers: {
              openai: false,
              anthropic: false,
            },
          },
          updatedAt: Date.now(),
        },
        requestId: 'req-org-skip',
      }),
    )

    expect(messages).toHaveLength(1)
    expect(messages[0]).toMatchObject({
      id: 'user-1',
      role: 'user',
    })
    expect(listActiveAttachmentIds).toHaveBeenCalledOnce()
  })

  it('limits attachment fallback retrieval to canonical branch attachments', async () => {
    const searchThreadAttachments = vi.fn(() => Effect.succeed([]))
    const run = vi
      .fn()
      .mockResolvedValueOnce([
        {
          messageId: 'user-root',
          role: 'user',
          parentMessageId: null,
          branchIndex: 0,
          created_at: 1,
          content: 'Initial question',
          userId: 'user-1',
          attachmentsIds: ['att-root'],
          model: 'openai/gpt-5-mini',
        },
        {
          messageId: 'assistant-root',
          role: 'assistant',
          parentMessageId: 'user-root',
          branchIndex: 1,
          created_at: 2,
          content: 'Initial answer',
          userId: 'user-1',
          attachmentsIds: [],
          model: 'openai/gpt-5-mini',
        },
        {
          messageId: 'user-canonical',
          role: 'user',
          parentMessageId: 'assistant-root',
          branchIndex: 1,
          created_at: 3,
          content: 'Use the canonical file',
          userId: 'user-1',
          attachmentsIds: ['att-canonical'],
          model: 'openai/gpt-5-mini',
        },
        {
          messageId: 'user-branch',
          role: 'user',
          parentMessageId: 'assistant-root',
          branchIndex: 2,
          created_at: 4,
          content: 'Use the alternate file',
          userId: 'user-1',
          attachmentsIds: ['att-branch'],
          model: 'openai/gpt-5-mini',
        },
      ])
      .mockResolvedValueOnce({
        activeChildByParent: {
          'user-root': 'assistant-root',
          'assistant-root': 'user-canonical',
        },
      })
      .mockResolvedValueOnce([
        {
          id: 'att-root',
          messageId: 'user-root',
          threadId: 'thread-1',
          userId: 'user-1',
          fileKey: 'root.txt',
          attachmentUrl: 'https://example.com/root.txt',
          fileName: 'root.txt',
          mimeType: 'text/plain',
          fileSize: 10,
          createdAt: 1,
          updatedAt: 1,
        },
        {
          id: 'att-canonical',
          messageId: 'user-canonical',
          threadId: 'thread-1',
          userId: 'user-1',
          fileKey: 'canonical.txt',
          attachmentUrl: 'https://example.com/canonical.txt',
          fileName: 'canonical.txt',
          mimeType: 'text/plain',
          fileSize: 10,
          createdAt: 2,
          updatedAt: 2,
        },
        {
          id: 'att-branch',
          messageId: 'user-branch',
          threadId: 'thread-1',
          userId: 'user-1',
          fileKey: 'branch.txt',
          attachmentUrl: 'https://example.com/branch.txt',
          fileName: 'branch.txt',
          mimeType: 'text/plain',
          fileSize: 10,
          createdAt: 3,
          updatedAt: 3,
        },
      ])

    const loadThreadMessages = makeLoadThreadMessagesOperation({
      zeroDatabase: {
        getOrFail: Effect.succeed({
          run,
        } as never),
        withDatabase: (withDatabaseRun: (db: { run: typeof run }) => unknown) =>
          withDatabaseRun({
            run,
          } as never),
      } as never,
      attachmentRecord: {
        listAttachmentContentRowsByThread: () =>
          Effect.succeed([
            {
              id: 'att-root',
              fileContent: 'root attachment content',
            },
            {
              id: 'att-canonical',
              fileContent: 'canonical attachment content',
            },
            {
              id: 'att-branch',
              fileContent: 'branch attachment content',
            },
          ]),
      } as never,
      attachmentRag: {
        searchThreadAttachments,
      } as never,
      orgKnowledgeRag: {
        searchOrgKnowledge: () => Effect.succeed([]),
      } as never,
      orgKnowledgeRepository: {
        listActiveAttachmentIds: () => Effect.succeed([]),
      } as never,
    })

    const messages = await Effect.runPromise(
      loadThreadMessages({
        threadId: 'thread-1',
        model: 'openai/gpt-5-mini',
        requestId: 'req-canonical-attachments',
      }),
    )

    const latestUserMessage = messages[messages.length - 1]
    const latestUserText = latestUserMessage?.parts
      .filter(
        (part): part is { type: 'text'; text: string } =>
          part.type === 'text' && typeof (part as { text?: unknown }).text === 'string',
      )
      .map((part) => part.text)
      .join('\n')

    expect(searchThreadAttachments).not.toHaveBeenCalled()
    expect(latestUserText).toContain('root attachment content')
    expect(latestUserText).toContain('canonical attachment content')
    expect(latestUserText).not.toContain('branch attachment content')
  })
})
