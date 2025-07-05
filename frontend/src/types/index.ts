// OCR Response type
export interface OCRResponse {
  text: string;
  confidence?: number;
}

// Error response type
export interface ErrorResponse {
  detail: string;
}

// Upload state type
export type UploadState = 'idle' | 'uploading' | 'success' | 'error';

// User type (for future authentication)
export interface User {
  id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
}

// OCR History entry (for future database integration)
export interface OCRHistoryEntry {
  id: string;
  userId: string;
  imageUrl?: string;
  originalText: string;
  timestamp: string;
  documentType?: string;
}