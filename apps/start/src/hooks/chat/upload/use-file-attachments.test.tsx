// @vitest-environment jsdom
import { act, fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useFileAttachments } from './use-file-attachments'

const { uploadFileToServerMock } = vi.hoisted(() => ({
  uploadFileToServerMock: vi.fn(),
}))

vi.mock('../../../lib/frontend/chat/upload', async () => {
  const actual = await vi.importActual<
    typeof import('../../../lib/frontend/chat/upload')
  >('../../../lib/frontend/chat/upload')

  return {
    ...actual,
    uploadFileToServer: uploadFileToServerMock,
  }
})

describe('useFileAttachments programmatic ingestion', () => {
  beforeEach(() => {
    uploadFileToServerMock.mockReset()
    uploadFileToServerMock.mockImplementation(async (file: File) => ({
      id: `uploaded-${file.name}`,
      key: `key-${file.name}`,
      url: `https://example.com/${file.name}`,
      name: file.name,
      size: file.size,
      contentType: file.type,
    }))
  })

  it('uploads synthetic txt files through the shared addFiles path', async () => {
    render(
      <HookHarness
        options={{ enabled: true }}
        file={new File(['hello world'], 'pasted.txt', {
          type: 'text/plain',
        })}
      />,
    )

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'add-file' }))
    })

    expect(screen.getByTestId('state').textContent).toContain('pasted.txt')
    await waitForAssertion(() => {
      expect(uploadFileToServerMock).toHaveBeenCalledTimes(1)
      expect(screen.getByTestId('state').textContent).toContain(
        '"uploaded":"pasted.txt"',
      )
    })
  })

  it('uses the same disabled-plan behavior for programmatically added files', async () => {
    render(
      <HookHarness
        options={{
          enabled: false,
          disabledMessage: 'Uploads are locked.',
        }}
        file={new File(['hello world'], 'pasted.txt', {
          type: 'text/plain',
        })}
      />,
    )

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'add-file' }))
    })

    await waitForAssertion(() => {
      expect(uploadFileToServerMock).not.toHaveBeenCalled()
      expect(screen.getByTestId('state').textContent).toContain(
        'Uploads are locked.',
      )
    })
  })

  it('respects the max file limit for programmatically added files', async () => {
    const firstFile = new File(['one'], 'first.txt', { type: 'text/plain' })
    const secondFile = new File(['two'], 'second.txt', { type: 'text/plain' })

    const view = render(
      <HookHarness options={{ enabled: true, maxFiles: 1 }} file={firstFile} />,
    )

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'add-file' }))
    })

    await waitForAssertion(() => {
      expect(uploadFileToServerMock).toHaveBeenCalledTimes(1)
      expect(screen.getByTestId('state').textContent).toContain('first.txt')
    })

    view.rerender(
      <HookHarness options={{ enabled: true, maxFiles: 1 }} file={secondFile} />,
    )

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'add-file' }))
    })

    await waitForAssertion(() => {
      expect(uploadFileToServerMock).toHaveBeenCalledTimes(1)
      expect(screen.getByTestId('state').textContent).not.toContain('second.txt')
    })
  })
})

function HookHarness({
  options,
  file,
}: {
  options: Parameters<typeof useFileAttachments>[0]
  file: File
}) {
  const attachments = useFileAttachments(options)

  return (
    <div>
      <button type="button" onClick={() => attachments.addFiles([file])}>
        add-file
      </button>
      <output data-testid="state">
        {JSON.stringify(
          attachments.files.map((item) => ({
            name: item.name,
            isUploading: !!item.isUploading,
            uploadError: item.uploadError ?? null,
            uploaded: item.uploaded?.name ?? null,
          })),
        )}
      </output>
    </div>
  )
}

async function waitForAssertion(assertion: () => void): Promise<void> {
  for (let attempt = 0; attempt < 20; attempt += 1) {
    try {
      await act(async () => {
        await Promise.resolve()
      })
      assertion()
      return
    } catch (error) {
      if (attempt === 19) throw error
    }
  }
}
