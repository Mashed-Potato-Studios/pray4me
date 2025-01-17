import { AppwriteException } from 'appwrite';

export class ApiError extends Error {
  code: number;
  type: string;

  constructor(message: string, code: number = 500, type: string = 'API_ERROR') {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.type = type;
  }
}

export const handleApiError = (error: unknown): ApiError => {
  if (error instanceof AppwriteException) {
    return new ApiError(
      error.message,
      error.code,
      'APPWRITE_ERROR'
    );
  }

  if (error instanceof ApiError) {
    return error;
  }

  if (error instanceof Error) {
    return new ApiError(
      error.message,
      500,
      'UNKNOWN_ERROR'
    );
  }

  return new ApiError(
    'An unknown error occurred',
    500,
    'UNKNOWN_ERROR'
  );
};

export const isApiError = (error: unknown): error is ApiError => {
  return error instanceof ApiError;
};

export const formatApiError = (error: ApiError): string => {
  switch (error.type) {
    case 'APPWRITE_ERROR':
      return `Database error: ${error.message}`;
    case 'VALIDATION_ERROR':
      return `Invalid input: ${error.message}`;
    case 'PERMISSION_ERROR':
      return `Permission denied: ${error.message}`;
    default:
      return error.message;
  }
};

export const createApiResponse = <T>(
  data: T | null = null,
  error: Error | null = null
) => {
  if (error) {
    const apiError = handleApiError(error);
    return {
      data: null,
      error: {
        code: apiError.code,
        message: apiError.message,
        type: apiError.type,
      },
    };
  }

  return {
    data,
    error: null,
  };
};
