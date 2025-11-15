import { useState } from "react";
import { Laporan } from "./types";
import { putData } from "../../utils/fetch";

export const useStatusUpdate = (
  setLaporanData: React.Dispatch<React.SetStateAction<Laporan[]>>,
  refetch?: () => Promise<void>
) => {
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const updateStatusLaporan = async (laporanId: string, newStatus: string) => {
    try {
      setUpdatingStatus(laporanId);
      setError(null);

      const payload = {
        status: newStatus,
      };

      const response = await putData(`laporan/${laporanId}/status`, payload);

      if (response.data.status === true) {
        // Update local state dengan status terbaru di index 0
        setLaporanData((prevData) =>
          prevData.map((laporan) => {
            if (laporan.id === laporanId) {
              const newStatusEntry = {
                status: newStatus,
                updatedAt: new Date().toISOString(),
              };

              // Buat array statuses baru dengan status terbaru di awal
              const updatedStatuses = [newStatusEntry, ...laporan.statuses];

              return {
                ...laporan,
                statuses: updatedStatuses,
              };
            }
            return laporan;
          })
        );

        // Jika menggunakan refetch
        if (refetch) {
          await refetch();
        }
      } else {
        setError("Gagal mengupdate status laporan");
      }
    } catch (err) {
      setError("Terjadi kesalahan saat mengupdate status");
      console.error("Error updating status:", err);
    } finally {
      setUpdatingStatus(null);
    }
  };

  return {
    updatingStatus,
    error,
    updateStatusLaporan,
  };
};
