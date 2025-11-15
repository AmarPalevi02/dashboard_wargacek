export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface ApiError {
  status: string | number;
  message: string;
  code?: string;
}

export interface HttpError extends Error {
  response?: {
    data: ApiError;
    status: number;
  };
  data?: ApiError;
}
