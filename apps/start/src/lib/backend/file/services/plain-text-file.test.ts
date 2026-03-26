import { describe, expect, it } from 'vitest'
import {
  isDirectTextExtractionFile,
  readDirectTextFileContent,
} from './plain-text-file'

describe('plain-text-file helpers', () => {
  it('recognizes text files even when the mime type includes charset metadata', () => {
    const file = {
      name: 'pasted-notes.txt',
      type: 'text/plain;charset=utf-8',
    } satisfies Pick<File, 'name' | 'type'>

    expect(isDirectTextExtractionFile(file)).toBe(true)
  })

  it('recognizes txt files by extension when the mime type is generic', () => {
    const file = {
      name: 'pasted-notes.txt',
      type: 'application/octet-stream',
    } satisfies Pick<File, 'name' | 'type'>

    expect(isDirectTextExtractionFile(file)).toBe(true)
  })

  it('reads plain text file contents directly', async () => {
    const file = new File(['hello from paste'], 'pasted-notes.txt', {
      type: 'text/plain;charset=utf-8',
    })

    await expect(readDirectTextFileContent(file)).resolves.toBe('hello from paste')
  })
})
