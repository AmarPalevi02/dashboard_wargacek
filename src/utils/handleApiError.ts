import axios from "axios";
import { ApiError, HttpError } from "./types";

export const handleApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const data = error.response?.data;

    const message =
      data?.error || data?.message || "Terjadi kesalahan pada server.";

    return {
      status,
      message,
    };
  }

  return {
    status: 500,
    message: "Terjadi kesalahan tidak terduga.",
  };
};


export const isApiError = (error: unknown): error is ApiError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as any).message === 'string'
  );
};

export const isHttpError = (error: unknown): error is HttpError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    ('response' in error || 'data' in error)
  );
};

export const extractErrorMessage = (error: unknown): string => {
  // Error dari response API (format Anda: { status: "401", message: "..." })
  if (isHttpError(error)) {
    // Cek di error.data terlebih dahulu
    if (error.data?.message) {
      return error.data.message;
    }
    // Cek di error.response.data
    if (error.response?.data?.message) {
      return error.response.data.message;
    }
  }

  // Error langsung dari API response
  if (isApiError(error)) {
    return error.message;
  }

  // Native Error instance
  if (error instanceof Error) {
    return error.message;
  }

  // Fallback message
  return "Email atau password salah";
};