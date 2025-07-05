import axios from 'axios';
import { OCRResponse, ErrorResponse } from '@/types';
import { extractErrorDetails, ErrorType } from './errorHandling';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to process OCR image
export const processOCRImage = async (imageFile: File): Promise<OCRResponse> => {
  try {
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('confidence', 'true'); // Request confidence score
    
    const response = await apiClient.post<OCRResponse>('/ocr/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 30000, // 30 seconds timeout for OCR processing
    });
    
    return response.data;
  } catch (error) {
    const errorDetails = extractErrorDetails(error);
    
    // Log the detailed error for debugging
    console.error('OCR processing error:', errorDetails);
    
    // Throw a user-friendly error message
    throw new Error(errorDetails.message);
  }
};

// Health check function to verify API is running
export const checkAPIHealth = async (): Promise<boolean> => {
  try {
    const response = await apiClient.get('/');
    return response.status === 200;
  } catch (error) {
    return false;
  }
};

// For future implementation: Authentication functions
export const authAPI = {
  login: async (username: string, password: string) => {
    // This is a placeholder for future implementation
    console.log('Login functionality will be implemented in the future');
    return { token: 'placeholder-token' };
  },
  
  register: async (username: string, email: string, password: string) => {
    // This is a placeholder for future implementation
    console.log('Register functionality will be implemented in the future');
    return { success: true };
  },
  
  logout: async () => {
    // This is a placeholder for future implementation
    console.log('Logout functionality will be implemented in the future');
    return { success: true };
  }
};