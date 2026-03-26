function normalizeMimeType(type: string): string {
  return type
    .trim()
    .toLowerCase()
    .split(';', 1)[0] ?? ''
}

function getFileExtension(fileName: string): string {
  const normalized = fileName.trim().toLowerCase()
  const dotIndex = normalized.lastIndexOf('.')
  if (dotIndex < 0 || dotIndex === normalized.length - 1) return ''
  return normalized.slice(dotIndex + 1)
}

/**
 * Detects attachments whose uploaded bytes already represent plain text. These
 * files do not benefit from a markdown-conversion worker round-trip and can be
 * indexed directly from their original content.
 */
export function isDirectTextExtractionFile(
  file: Pick<File, 'name' | 'type'>,
): boolean {
  const mimeType = normalizeMimeType(file.type)
  if (mimeType === 'text/plain' || mimeType === 'text/markdown') return true

  const extension = getFileExtension(file.name)
  return extension === 'txt' || extension === 'md' || extension === 'markdown'
}

/**
 * Reads text-like uploads directly from the File object so upload pipelines can
 * persist and index them without invoking external conversion infrastructure.
 */
export async function readDirectTextFileContent(
  file: File,
): Promise<string | null> {
  if (!isDirectTextExtractionFile(file)) return null
  return file.text()
}
