// useTransferLaporan.ts
import { useState, useEffect } from "react";
import { TransferLaporanRequest, DinasOption } from "./types";
import { postData, getDatas } from "../../utils/fetch";

export const useTransferLaporan = () => {
  const [transferring, setTransferring] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [dinasOptions, setDinasOptions] = useState<DinasOption[]>([]);
  const [loadingDinas, setLoadingDinas] = useState(true);

  // Fetch dinas options
  const fetchDinasOptions = async () => {
    try {
      setLoadingDinas(true);
      console.log("🔄 Fetching dinas options for transfer...");
      
      const response = await getDatas("dinas-options");
      
      console.log("📡 Dinas options response:", response);

      if (response.data?.status === true) {
        console.log("✅ Dinas options received:", response.data.data);
        setDinasOptions(response.data.data || []);
      } else {
        console.warn("⚠️ Dinas options response format unexpected:", response.data);
        setDinasOptions([]);
      }
    } catch (err: any) {
      console.error("❌ Error fetching dinas options:", err);
      console.error("Error details:", err.response?.data);
      setDinasOptions([]);
      setError("Gagal memuat daftar dinas");
    } finally {
      setLoadingDinas(false);
    }
  };

  const transferLaporan = async (
    laporanId: string, 
    transferData: TransferLaporanRequest
  ) => {
    try {
      setTransferring(laporanId);
      setError(null);
      setSuccess(null);

      console.log("🔄 Transferring laporan:", { laporanId, transferData });

      const response = await postData(
        `laporan/${laporanId}/transfer`,
        transferData
      );

      console.log("📡 Transfer response:", response);

      if (response.data.status === true) {
        setSuccess("Laporan berhasil dialihkan");
        return response.data;
      } else {
        const errorMsg = response.data.error || "Gagal mengalihkan laporan";
        setError(errorMsg);
        return null;
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || "Terjadi kesalahan saat mengalihkan laporan";
      setError(errorMessage);
      console.error("Error transferring laporan:", err);
      return null;
    } finally {
      setTransferring(null);
    }
  };

  const clearMessages = () => {
    setError(null);
    setSuccess(null);
  };

  const refetchDinasOptions = () => {
    fetchDinasOptions();
  };

  // Load dinas options on mount
  useEffect(() => {
    fetchDinasOptions();
  }, []);

  return {
    transferring,
    error,
    success,
    dinasOptions,
    loadingDinas,
    transferLaporan,
    clearMessages,
    refetchDinasOptions,
  };
};

export default useTransferLaporan;