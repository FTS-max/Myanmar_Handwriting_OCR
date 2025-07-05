import { useState, useRef, ChangeEvent, DragEvent } from 'react';
import { validateImage } from '@/utils/imageUtils';

interface UseUploadReturn {
  isDragging: boolean;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleDragEnter: (event: DragEvent<HTMLDivElement>) => void;
  handleDragOver: (event: DragEvent<HTMLDivElement>) => void;
  handleDragLeave: (event: DragEvent<HTMLDivElement>) => void;
  handleDrop: (event: DragEvent<HTMLDivElement>) => void;
  triggerFileInput: () => void;
  selectedFile: File | null;
  fileError: string | null;
  resetUpload: () => void;
}

/**
 * Custom hook for handling file uploads with drag and drop support
 * @param onFileSelected Callback function to be called when a valid file is selected
 */
export function useUpload(onFileSelected?: (file: File) => void): UseUploadReturn {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * Handles file selection from input element
   */
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  /**
   * Processes the selected file
   */
  const processFile = (file: File) => {
    // Reset previous error
    setFileError(null);
    
    // Validate the file
    const validation = validateImage(file);
    if (!validation.valid) {
      setFileError(validation.error || 'Invalid file');
      return;
    }
    
    // Set the selected file
    setSelectedFile(file);
    
    // Call the callback if provided
    if (onFileSelected) {
      onFileSelected(file);
    }
  };

  /**
   * Drag and drop event handlers
   */
  const handleDragEnter = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    
    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  /**
   * Triggers the file input click event
   */
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  /**
   * Resets the upload state
   */
  const resetUpload = () => {
    setSelectedFile(null);
    setFileError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return {
    isDragging,
    fileInputRef,
    handleFileChange,
    handleDragEnter,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    triggerFileInput,
    selectedFile,
    fileError,
    resetUpload,
  };
}