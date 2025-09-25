import axios from "axios";

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
