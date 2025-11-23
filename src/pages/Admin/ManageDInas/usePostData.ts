import { useState } from 'react';
import { postData } from '../../../utils/fetch';
import { CreateDinasUserResponse } from '../types';

export const usePostData = <T = any>() => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);

  const execute = async (url: string, payload: any, formData: boolean = false) => {
    try {
      setLoading(true);
      setError(null);
      const response = await postData<T>(url, payload, formData);
      setData(response.data);
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { execute, loading, error, data };
};

// Hook khusus untuk create dinas user
export const useCreateDinasUser = () => {
  return usePostData<CreateDinasUserResponse>();
};