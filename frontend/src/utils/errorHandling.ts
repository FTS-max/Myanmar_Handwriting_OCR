import { AxiosError } from 'axios';

/**
 * Types of API errors that can occur
 */
export enum ErrorType {
  NETWORK = 'network',
  SERVER = 'server',
  VALIDATION = 'validation',
  AUTHENTICATION = 'authentication',
  AUTHORIZATION = 'authorization',
  TIMEOUT = 'timeout',
  UNKNOWN = 'unknown',
}

/**
 * Structured error response
 */
export interface ErrorDetails {
  type: ErrorType;
  message: string;
  statusCode?: number;
  details?: unknown;
}

/**
 * Extracts a user-friendly error message from an Axios error
 * @param error - The error object from Axios
 * @returns Structured error details
 */
export const extractErrorDetails = (error: unknown): ErrorDetails => {
  // Default error response
  const defaultError: ErrorDetails = {
    type: ErrorType.UNKNOWN,
    message: 'An unexpected error occurred. Please try again.',
  };

  // If not an Axios error, return default
  if (!error || !(error instanceof Error)) {
    return defaultError;
  }

  // Handle Axios errors
  if (axios.isAxiosError(error)) {
    return handleAxiosError(error);
  }

  // Handle regular errors
  return {
    type: ErrorType.UNKNOWN,
    message: error.message || defaultError.message,
  };
};

/**
 * Handles Axios specific errors
 * @param error - The Axios error
 * @returns Structured error details
 */
const handleAxiosError = (error: AxiosError): ErrorDetails => {
  // Network errors (no response received)
  if (error.code === 'ECONNABORTED') {
    return {
      type: ErrorType.TIMEOUT,
      message: 'Request timed out. The server might be overloaded or offline.',
    };
  }

  if (error.code === 'ERR_NETWORK') {
    return {
      type: ErrorType.NETWORK,
      message: 'Network error. Please check your internet connection.',
    };
  }

  // Server responded with an error
  if (error.response) {
    const statusCode = error.response.status;
    const responseData = error.response.data as any;

    // Authentication errors
    if (statusCode === 401) {
      return {
        type: ErrorType.AUTHENTICATION,
        message: 'Authentication required. Please log in again.',
        statusCode,
        details: responseData,
      };
    }

    // Authorization errors
    if (statusCode === 403) {
      return {
        type: ErrorType.AUTHORIZATION,
        message: 'You do not have permission to perform this action.',
        statusCode,
        details: responseData,
      };
    }

    // Validation errors
    if (statusCode === 400 || statusCode === 422) {
      return {
        type: ErrorType.VALIDATION,
        message: responseData?.detail || 'Invalid input. Please check your data.',
        statusCode,
        details: responseData,
      };
    }

    // Server errors
    if (statusCode >= 500) {
      return {
        type: ErrorType.SERVER,
        message: 'Server error. Please try again later.',
        statusCode,
        details: responseData,
      };
    }

    // Other HTTP errors
    return {
      type: ErrorType.UNKNOWN,
      message: responseData?.detail || `Error ${statusCode}. Please try again.`,
      statusCode,
      details: responseData,
    };
  }

  // Request was made but no response received
  if (error.request) {
    return {
      type: ErrorType.NETWORK,
      message: 'No response from server. Please check your connection.',
      details: error.request,
    };
  }

  // Something else happened while setting up the request
  return {
    type: ErrorType.UNKNOWN,
    message: error.message || 'An unexpected error occurred. Please try again.',
  };
};

/**
 * Fix for TypeScript error with axios.isAxiosError
 */
const axios = { isAxiosError: (error: unknown): error is AxiosError => error instanceof Error && 'isAxiosError' in error };