/**
 * File utility functions for handling file uploads and conversions
 */

export interface FileAttachment {
  type: "file";
  mediaType: string;
  url: string;
  attachmentId?: string;
  fileName?: string;
  fileSize?: number;
}

/**
 * Upload files to the server and get attachment IDs
 */
export async function uploadFiles(files: FileList): Promise<FileAttachment[]> {
  const uploadPromises = Array.from(files).map(async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || "Upload failed");
      }

      return {
        type: "file" as const,
        mediaType: file.type,
        url: result.url, // Use R2 URL from response
        attachmentId: result.attachmentId,
        fileName: file.name,
        fileSize: file.size,
      };
    } catch (error) {
      throw error;
    }
  });

  return Promise.all(uploadPromises);
}

/**
 * Check if a file type is supported
 */
export function isSupportedFileType(file: File): boolean {
  const supportedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
    "application/pdf",
  ];
  
  return supportedTypes.includes(file.type);
}

