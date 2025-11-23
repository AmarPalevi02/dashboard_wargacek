import React, { useState } from 'react';
import { useCreateDinasUser } from './usePostData';
import { CreateDinasUserRequest } from '../types';
import Alert from '../../../components/ui/alert/Alert';
import Button from '../../../components/ui/button/Button';
import Input from '../../../components/form/input/InputField';
import Label from '../../../components/form/Label';
import { useGetDinas } from '../JenisKerusakan/useGetDinas';

interface CreateDinasUserFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

const CreateDinasUserForm: React.FC<CreateDinasUserFormProps> = ({ 
  onSuccess, 
  onCancel 
}) => {
  const { execute, loading, error } = useCreateDinasUser();
  const { data: dinasList, loading: dinasLoading, error: dinasError } = useGetDinas();
  
  const [formData, setFormData] = useState<CreateDinasUserRequest>({
    username: '',
    email: '',
    password: '',
    dinasName: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState<{
    variant: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message: string;
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validasi form
    if (!formData.username || !formData.email || !formData.password || !formData.dinasName) {
      setAlert({
        variant: 'error',
        title: 'Error',
        message: 'Semua field harus diisi'
      });
      return;
    }

    if (formData.password.length < 6) {
      setAlert({
        variant: 'error',
        title: 'Error',
        message: 'Password harus minimal 6 karakter'
      });
      return;
    }

    try {
      await execute('crete/dinas', formData);
      
      setAlert({
        variant: 'success',
        title: 'Berhasil',
        message: 'User DINAS berhasil dibuat'
      });

      // Reset form
      setFormData({
        username: '',
        email: '',
        password: '',
        dinasName: ''
      });

      // Call success callback
      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 1500);
      }
    } catch (err: any) {
      setAlert({
        variant: 'error',
        title: 'Error',
        message: err.message || 'Gagal membuat user DINAS'
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Tambah User DINAS</h2>
        <p className="text-gray-600 mt-1">
          Tambahkan user baru dengan role DINAS ke dalam sistem
        </p>
      </div>

      {/* Alert */}
      {alert && (
        <div className="mb-6">
          <Alert
            variant={alert.variant}
            title={alert.title}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        </div>
      )}

      {/* Error dari hook */}
      {error && !alert && (
        <div className="mb-6">
          <Alert
            variant="error"
            title="Error"
            message={error}
            onClose={() => {}}
          />
        </div>
      )}

      {/* Error dari fetch dinas */}
      {dinasError && !alert && (
        <div className="mb-6">
          <Alert
            variant="error"
            title="Error"
            message={`Gagal memuat data dinas: ${dinasError}`}
            onClose={() => {}}
          />
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Username */}
          <div className="md:col-span-2">
            <Label htmlFor="username">
              Username <span className="text-red-500">*</span>
            </Label>
            <Input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder="Masukkan username"
              required
              disabled={loading}
            />
          </div>

          {/* Email */}
          <div className="md:col-span-2">
            <Label htmlFor="email">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="contoh: user@dinas.go.id"
              required
              disabled={loading}
            />
          </div>

          {/* Password */}
          <div className="md:col-span-2">
            <Label htmlFor="password">
              Password <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="Minimal 6 karakter"
                required
                disabled={loading}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Password harus minimal 6 karakter
            </p>
          </div>

          {/* Dinas Name - Changed to Select */}
          <div className="md:col-span-2">
            <Label htmlFor="dinasName">
              Nama Dinas <span className="text-red-500">*</span>
            </Label>
            <select
              id="dinasName"
              name="dinasName"
              value={formData.dinasName}
              onChange={handleChange}
              required
              disabled={loading || dinasLoading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              <option value="">Pilih Dinas</option>
              {dinasList.map((dinas) => (
                <option key={dinas.id} value={dinas.name}>
                  {dinas.name}
                </option>
              ))}
            </select>
            
            {dinasLoading && (
              <p className="text-xs text-gray-500 mt-1">
                Memuat data dinas...
              </p>
            )}
            
            {!dinasLoading && dinasList.length === 0 && !dinasError && (
              <p className="text-xs text-yellow-600 mt-1">
                Tidak ada data dinas tersedia
              </p>
            )}
            
            <p className="text-xs text-gray-500 mt-1">
              Pilih dinas dari daftar yang tersedia
            </p>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                Informasi
              </h3>
              <div className="mt-2 text-sm text-blue-700">
                <ul className="list-disc list-inside space-y-1">
                  <li>User akan dibuat dengan role <strong>DINAS</strong></li>
                  <li>Email harus unik dan belum terdaftar</li>
                  <li>Pilih dinas dari daftar yang tersedia</li>
                  <li>Password akan di-hash sebelum disimpan</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={loading}
          >
            Batal
          </Button>
          <Button
            type="submit"
            disabled={loading || dinasLoading}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Membuat...
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Tambah User
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateDinasUserForm;