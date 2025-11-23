import React, { useState, useEffect } from 'react';
import { JenisKerusakan, Dinas } from './types';
import { useEditJenisKerusakan } from './useEditJenisKerusakan';
import { useGetDinas } from './useGetDinas';

interface JenisKerusakanEditFormProps {
  item: JenisKerusakan;
  onSuccess: () => void;
  onCancel: () => void;
}

const JenisKerusakanEditForm: React.FC<JenisKerusakanEditFormProps> = ({
  item,
  onSuccess,
  onCancel
}) => {
  const { editJenisKerusakan, loading, error, success, reset } = useEditJenisKerusakan();
  const { data: dinasList, loading: dinasLoading } = useGetDinas();
  
  const getDinasId = (item: JenisKerusakan): string => {
    return item.dinasId || item.dinas?.id || '';
  };

  const [formData, setFormData] = useState({
    namaKerusakan: '',
    dinasId: ''
  });

  // Initialize form data hanya sekali ketika komponen pertama kali mount
  useEffect(() => {
    setFormData({
      namaKerusakan: item.jenis_kerusakan || '',
      dinasId: getDinasId(item)
    });
    // Hapus reset() dari sini karena menyebabkan infinite loop
  }, []); // Empty dependency array - hanya jalankan sekali

  // Handle success separately
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        onSuccess();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [success, onSuccess]);

  // Reset error state ketika form data berubah
  useEffect(() => {
    if (error) {
      reset();
    }
  }, [formData.namaKerusakan, formData.dinasId]); // Reset error ketika user mulai mengetik

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.namaKerusakan.trim()) {
      alert('Nama kerusakan tidak boleh kosong');
      return;
    }

    if (!formData.dinasId) {
      alert('Pilih dinas terkait');
      return;
    }

    const result = await editJenisKerusakan(item.id, {
      namaKerusakan: formData.namaKerusakan.trim(),
      dinasId: formData.dinasId
    });

    if (result.success) {
      console.log('✅ Edit successful');
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!item || !item.id) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md transform transition-all">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Edit Jenis Kerusakan</h2>
              <p className="text-gray-600 text-sm mt-1">Perbarui informasi jenis kerusakan</p>
            </div>
            <button
              onClick={onCancel}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 rounded-full hover:bg-gray-100"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Success Message */}
          {success && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="text-green-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-green-800 text-sm font-medium">
                    Jenis kerusakan berhasil diupdate!
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="text-red-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-red-800 text-sm font-medium">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Nama Kerusakan Field */}
          <div>
            <label htmlFor="namaKerusakan" className="block text-sm font-medium text-gray-700 mb-2">
              Nama Jenis Kerusakan *
            </label>
            <input
              type="text"
              id="namaKerusakan"
              value={formData.namaKerusakan}
              onChange={(e) => handleChange('namaKerusakan', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              placeholder="Masukkan nama jenis kerusakan"
              disabled={loading}
              required
            />
          </div>

          {/* Dinas Field */}
          <div>
            <label htmlFor="dinasId" className="block text-sm font-medium text-gray-700 mb-2">
              Dinas Terkait *
            </label>
            <select
              id="dinasId"
              value={formData.dinasId}
              onChange={(e) => handleChange('dinasId', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              disabled={loading || dinasLoading}
              required
            >
              <option value="">Pilih Dinas</option>
              {dinasList.map((dinas) => (
                <option key={dinas.id} value={dinas.id}>
                  {dinas.name}
                </option>
              ))}
            </select>
            {dinasLoading && (
              <p className="text-gray-500 text-sm mt-1">Memuat data dinas...</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Memproses...
                </>
              ) : (
                'Update'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JenisKerusakanEditForm;