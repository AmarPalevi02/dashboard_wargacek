import { useState } from 'react';
import { patchData } from '../../../utils/fetch';
import { UpdateLaporanPayload, UpdateLaporanResponse } from './types';

export const useUpdateLaporan = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateLaporanStatus = async (laporanId: string, status: string): Promise<boolean> => {
    try {
      setIsUpdating(true);
      setError(null);

      // Validasi status yang diizinkan
      if (!['PENDING', 'VALIDATED'].includes(status)) {
        setError('Status tidak valid. Hanya PENDING atau VALIDATED yang diizinkan.');
        return false;
      }

      const payload: UpdateLaporanPayload = { status };

      const response = await patchData<UpdateLaporanResponse>(
        `update-laporan-status/${laporanId}`,
        payload
      );

      if (response.data.success) {
        return true;
      } else {
        setError(response.data.message || 'Gagal mengupdate status laporan');
        return false;
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Terjadi kesalahan saat mengupdate status';
      setError(errorMessage);
      console.error('Error updating laporan status:', err);
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  const updateToValidated = async (laporanId: string): Promise<boolean> => {
    return await updateLaporanStatus(laporanId, 'VALIDATED');
  };

  const updateToPending = async (laporanId: string): Promise<boolean> => {
    return await updateLaporanStatus(laporanId, 'PENDING');
  };

  const clearError = () => setError(null);

  return {
    updateLaporanStatus,
    updateToValidated,
    updateToPending,
    isUpdating,
    error,
    clearError,
  };
};