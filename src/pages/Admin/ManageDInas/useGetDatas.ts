import { useState, useEffect } from 'react';
import { getDatas } from '../../../utils/fetch';
import { DinasResponse} from '../types';

export const useGetDatas = <T = any>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getDatas(url);
      setData(response.data);
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan saat mengambil data');
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, loading, error, refetch };
};

// Hook khusus untuk data dinas
export const useDinasData = () => {
  return useGetDatas<DinasResponse>('get-dinas');
};