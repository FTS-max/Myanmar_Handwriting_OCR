/**
 * Utility functions for image compression and optimization
 */

/**
 * Compresses an image file to reduce size while maintaining quality
 * @param file - The image file to compress
 * @param maxSizeMB - Maximum size in MB (default: 1)
 * @param quality - Compression quality (0-1, default: 0.8)
 * @returns Promise<File> - Compressed image file
 */
export const compressImage = async (
  file: File,
  maxSizeMB: number = 1,
  quality: number = 0.8
): Promise<File> => {
  // If file is already smaller than max size, return it as is
  if (file.size / 1024 / 1024 < maxSizeMB) {
    return file;
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        // Create canvas for compression
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }

        // Calculate dimensions while maintaining aspect ratio
        let width = img.width;
        let height = img.height;
        
        // If image is very large, scale it down
        const MAX_DIMENSION = 2048; // Max width/height in pixels
        if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
          if (width > height) {
            height = Math.round((height * MAX_DIMENSION) / width);
            width = MAX_DIMENSION;
          } else {
            width = Math.round((width * MAX_DIMENSION) / height);
            height = MAX_DIMENSION;
          }
        }

        // Set canvas dimensions
        canvas.width = width;
        canvas.height = height;

        // Draw image on canvas with compression
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to blob with quality setting
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Could not compress image'));
              return;
            }

            // Create new file from blob
            const compressedFile = new File([blob], file.name, {
              type: 'image/jpeg', // Convert to JPEG for better compression
              lastModified: Date.now(),
            });

            resolve(compressedFile);
          },
          'image/jpeg',
          quality
        );
      };

      img.onerror = () => {
        reject(new Error('Error loading image for compression'));
      };
    };

    reader.onerror = () => {
      reject(new Error('Error reading file for compression'));
    };
  });
};

/**
 * Optimizes an image for OCR processing
 * @param file - The image file to optimize
 * @returns Promise<File> - Optimized image file
 */
export const optimizeForOCR = async (file: File): Promise<File> => {
  // First compress the image
  const compressedFile = await compressImage(file, 2, 0.9);
  
  // For future implementation: Additional OCR-specific optimizations
  // - Convert to grayscale
  // - Increase contrast
  // - Apply sharpening
  
  return compressedFile;
};