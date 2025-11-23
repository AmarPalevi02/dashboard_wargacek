// hooks/useGetDinas.ts
import { useState, useEffect } from 'react';
import { Dinas, ApiResponse } from '../types';
import { getDatas } from '../../../utils/fetch';

export const useGetDinas = () => {
  const [data, setData] = useState<Dinas[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDinas = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await getDatas('getAll-id-Dinas');
      
      if (response.data && response.data.status === "true") {
        setData(response.data.data);
      } else {
        setError(response.data?.message || 'Gagal memuat data dinas');
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Terjadi kesalahan saat memuat data dinas';
      setError(errorMessage);
      console.error('Error fetching dinas:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDinas();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchDinas
  };
};