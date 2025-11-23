// hooks/useGetJenisKejadian.ts
import { useState, useEffect } from "react";
import { JenisKerusakan } from "./types";
import { deleteData, getDatas } from "../../../utils/fetch";

export const useGetJenisKejadian = () => {
  const [data, setData] = useState<JenisKerusakan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJenisKejadian = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getDatas("getAllKerusakan");


      if (response.data && response.data.status === "true") {
        setData(response.data.data);
      } else {
        setError(response.data?.message || "Gagal memuat data");
      }
    } catch (err: any) {
      // Handle error dari handleApiError
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Terjadi kesalahan saat memuat data";
      setError(errorMessage);
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

   const deleteJenisKejadian = async (id: string): Promise<{ success: boolean; message: string }> => {
    try {
      console.log('Menghapus jenis kerusakan dengan ID:', id);
      
      const response = await deleteData(`delete-jenis-kerusakan/${id}`);
      
      console.log('Response delete:', response);
      
      if (response.data && response.data.success) {
        // Optimistic update - hapus dari state lokal
        setData(prev => prev.filter(item => item.id !== id));
        return {
          success: true,
          message: response.data.message || 'Data berhasil dihapus'
        };
      } else {
        throw new Error(response.data?.message || 'Gagal menghapus data');
      }
      
    } catch (err: any) {
      console.error('Error dalam deleteJenisKejadian:', err);
      
      // Extract error message dari berbagai kemungkinan response structure
      let errorMessage = 'Gagal menghapus data';
      
      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      // Handle specific error cases
      if (errorMessage.includes('Cannot read properties of undefined')) {
        errorMessage = 'Terjadi kesalahan sistem saat menghapus data';
      } else if (errorMessage.includes('laporan yang terkait')) {
        errorMessage = 'Tidak dapat menghapus karena masih ada laporan yang menggunakan jenis kerusakan ini';
      } else if (errorMessage.includes('tidak ditemukan')) {
        errorMessage = 'Data tidak ditemukan atau sudah dihapus';
      }
      
      setError(errorMessage);
      
      return {
        success: false,
        message: errorMessage
      };
    }
  };

  useEffect(() => {
    fetchJenisKejadian();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchJenisKejadian,
    deleteJenisKejadian,
  };
};
