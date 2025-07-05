/**
 * Utility functions for image handling and validation
 */

// Maximum file size in bytes (5MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024;

// Allowed image MIME types
const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/heic',
  'image/heif',
];

/**
 * Validates if the file is an acceptable image
 */
export const validateImage = (file: File): { valid: boolean; error?: string } => {
  // Check if file exists
  if (!file) {
    return { valid: false, error: 'No file selected' };
  }

  // Check file type
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return { 
      valid: false, 
      error: 'Invalid file type. Please upload a JPEG, PNG, WEBP, HEIC, or HEIF image' 
    };
  }

  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return { 
      valid: false, 
      error: `File size exceeds ${MAX_FILE_SIZE / (1024 * 1024)}MB limit` 
    };
  }

  return { valid: true };
};

/**
 * Creates a preview URL for an image file
 */
export const createImagePreview = (file: File): string => {
  return URL.createObjectURL(file);
};

/**
 * Revokes a previously created object URL to free up memory
 */
export const revokeImagePreview = (previewUrl: string): void => {
  URL.revokeObjectURL(previewUrl);
};

/**
 * Compresses an image if needed
 * @param file - The image file to compress
 * @returns Promise<File> - The compressed file or original if compression not needed
 */
export const compressImageIfNeeded = async (file: File): Promise<File> => {
  // Import dynamically to avoid SSR issues
  const { optimizeForOCR } = await import('./imageCompression');
  
  try {
    // Optimize the image for OCR processing
    return await optimizeForOCR(file);
  } catch (error) {
    console.error('Image compression failed:', error);
    // Return original file if compression fails
    return file;
  }
};