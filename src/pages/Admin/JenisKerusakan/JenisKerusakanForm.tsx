import React, { useState } from "react";
import { useGetDinas } from "./useGetDinas";
import { useCreateJenisKerusakan } from "./useCreateJenisKerusakan";

interface JenisKerusakanFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const JenisKerusakanForm: React.FC<JenisKerusakanFormProps> = ({
  onSuccess,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    namaKerusakan: "",
    dinasId: "",
  });

  const {
    data: dinasData,
    loading: dinasLoading,
    error: dinasError,
  } = useGetDinas();
  const { createJenisKerusakan, loading, error, success, reset } =
    useCreateJenisKerusakan();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.namaKerusakan || !formData.dinasId) {
      alert("Harap lengkapi semua field");
      return;
    }

    const result = await createJenisKerusakan(formData);

    if (result) {
      onSuccess();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (dinasLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">
            Tambah Jenis Kerusakan
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="text-red-600">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              </div>
            </div>
          )}

          {dinasError && (
            <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="text-red-600">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-red-700 text-sm">{dinasError}</p>
                </div>
              </div>
            </div>
          )}

          {/* Jenis Kerusakan Field */}
          <div className="mb-4">
            <label
              htmlFor="namaKerusakan"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Jenis Kerusakan *
            </label>
            <input
              type="text"
              id="jnamaKerusakan"
              name="namaKerusakan"
              value={formData.namaKerusakan}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Masukkan jenis kerusakan"
              required
            />
          </div>

          {/* Dinas Field */}
          <div className="mb-6">
            <label
              htmlFor="dinasId"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Dinas *
            </label>
            <select
              id="dinasId"
              name="dinasId"
              value={formData.dinasId}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Pilih Dinas</option>
              {dinasData.map((dinas) => (
                <option key={dinas.id} value={dinas.id}>
                  {dinas.name}
                </option>
              ))}
            </select>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors duration-200"
              disabled={loading}
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 flex items-center disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Menyimpan...
                </>
              ) : (
                <>
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Simpan
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JenisKerusakanForm;
