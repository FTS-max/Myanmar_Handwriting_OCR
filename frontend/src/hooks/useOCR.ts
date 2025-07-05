import { useState } from 'react';
import { processOCRImage } from '@/utils/api';
import { validateImage, createImagePreview, revokeImagePreview, compressImageIfNeeded } from '@/utils/imageUtils';
import { UploadState, OCRResponse } from '@/types';

interface UseOCRReturn {
  uploadState: UploadState;
  result: OCRResponse | null;
  error: string | null;
  imagePreview: string | null;
  isProcessing: boolean;
  handleImageUpload: (file: File) => Promise<void>;
  resetState: () => void;
}

/**
 * Custom hook for handling OCR operations
 */
export function useOCR(): UseOCRReturn {
  const [uploadState, setUploadState] = useState<UploadState>('idle');
  const [result, setResult] = useState<OCRResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  /**
   * Handles image upload and OCR processing
   */
  const handleImageUpload = async (file: File): Promise<void> => {
    // Reset previous state
    resetState();
    
    // Validate the image
    const validation = validateImage(file);
    if (!validation.valid) {
      setError(validation.error || 'Invalid image');
      setUploadState('error');
      return;
    }

    try {
      // Create image preview
      const preview = createImagePreview(file);
      setImagePreview(preview);
      
      // Set uploading state
      setUploadState('uploading');
      setIsProcessing(true);
      
      // Compress and optimize the image for OCR
      const optimizedFile = await compressImageIfNeeded(file);
      
      // Process the optimized image with OCR
      const ocrResult = await processOCRImage(optimizedFile);
      
      // Update state with results
      setResult(ocrResult);
      setUploadState('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setUploadState('error');
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * Resets the OCR state
   */
  const resetState = () => {
    // Clean up previous preview URL if it exists
    if (imagePreview) {
      revokeImagePreview(imagePreview);
    }
    
    setUploadState('idle');
    setResult(null);
    setError(null);
    setImagePreview(null);
    setIsProcessing(false);
  };

  return {
    uploadState,
    result,
    error,
    imagePreview,
    isProcessing,
    handleImageUpload,
    resetState,
  };
}