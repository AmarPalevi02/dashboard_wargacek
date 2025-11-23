import { useState, useCallback } from 'react';
import { JenisKerusakan, ApiResponse } from './types';
import { putData } from '../../../utils/fetch';

interface EditJenisKerusakanPayload {
  namaKerusakan: string;
  dinasId?: string;
}

export const useEditJenisKerusakan = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const editJenisKerusakan = useCallback(async (
    jenisKerusakanId: string, 
    payload: EditJenisKerusakanPayload
  ): Promise<{ success: boolean; data?: JenisKerusakan; message: string }> => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const response = await putData<ApiResponse<JenisKerusakan>>(
        `edit-jenis-kerusakan/${jenisKerusakanId}`,
        payload
      );

      if (response.data && response.data.success) {
        setSuccess(true);
        return {
          success: true,
          data: response.data.data,
          message: response.data.message || 'Jenis kerusakan berhasil diupdate'
        };
      } else {
        throw new Error(response.data?.message || 'Gagal mengupdate jenis kerusakan');
      }

    } catch (err: any) {
      // ... error handling (sama seperti sebelumnya)
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setError(null);
    setSuccess(false);
  }, []);

  return {
    editJenisKerusakan,
    loading,
    error,
    success,
    reset
  };
};