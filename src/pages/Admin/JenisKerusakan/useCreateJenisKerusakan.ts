// hooks/useCreateJenisKerusakan.ts
import { useState } from 'react';
import { CreateJenisKerusakanPayload, JenisKerusakan } from './types';
import { postData } from '../../../utils/fetch';

export const useCreateJenisKerusakan = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const createJenisKerusakan = async (payload: CreateJenisKerusakanPayload): Promise<JenisKerusakan | null> => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const response = await postData('create/jeniskejadian', payload);
      
      if (response.data && response.data.status === "true") {
        setSuccess(true);
        return response.data.data;
      } else {
        throw new Error(response.data?.message || 'Gagal membuat jenis kerusakan');
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Terjadi kesalahan saat membuat data';
      setError(errorMessage);
      console.error('Error creating jenis kerusakan:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setError(null);
    setSuccess(false);
  };

  return {
    createJenisKerusakan,
    loading,
    error,
    success,
    reset
  };
};