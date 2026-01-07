import React, { useState } from 'react';
import { useGetLaporan } from './useGetLaporan';
import { useUpdateLaporan } from './useUpdateLaporan';
import LaporanRow from './LaporanRow';
import Pagination from './Pagination';

const TableLaporan: React.FC = () => {
  const {
    laporanData,
    // setLaporanData,
    loading,
    error,
    pagination,
    filterStatus,
    refetch,
    goToPage,
    changeItemsPerPage,
    changeFilterStatus,
  } = useGetLaporan();

  const { updateLaporanStatus, isUpdating: globalUpdating } = useUpdateLaporan();
  const [updatingLaporanId, setUpdatingLaporanId] = useState<string | null>(null);

  // Fungsi handleStatusUpdate yang diperbarui
  const handleStatusUpdate = async (laporanId: string, newStatus: string) => {
    // Validasi: hanya boleh update ke PENDING atau VALIDATED
    if (!['PENDING', 'VALIDATED'].includes(newStatus)) {
      alert('Hanya bisa mengupdate status menjadi PENDING atau VALIDATED');
      return;
    }

    try {
      setUpdatingLaporanId(laporanId);
      
      const success = await updateLaporanStatus(laporanId, newStatus);
      
      if (success) {
        // Refresh data setelah berhasil update
        await refetch(pagination.currentPage, pagination.itemsPerPage);
      } else {
        alert('Gagal mengupdate status laporan');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Terjadi kesalahan saat mengupdate status');
    } finally {
      setUpdatingLaporanId(null);
    }
  };

  // Tampilan tetap sama...
  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        <p>Error: {error}</p>
        <button 
          onClick={() => refetch()} 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-white/[0.03] rounded-lg border border-gray-200 dark:border-white/[0.05] overflow-hidden">
      {/* Filter Tabs - Tetap sama */}
      <div className="flex border-b border-gray-200 dark:border-white/[0.05]">
        <button
          onClick={() => changeFilterStatus('active')}
          className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
            filterStatus === 'active'
              ? 'border-blue-500 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          Laporan Aktif
        </button>
        
        <button
          onClick={() => changeFilterStatus('validated')}
          className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
            filterStatus === 'validated'
              ? 'border-blue-500 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          Laporan Tervalidasi
        </button>
      </div>

      {/* Table - Tetap sama */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-white/[0.02] border-b border-gray-200 dark:border-white/[0.05]">
            <tr>
              <th className="px-4 py-3 text-start text-theme-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Pelapor
              </th>
              <th className="px-4 py-3 text-start text-theme-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                No. Telepon
              </th>
              <th className="px-4 py-3 text-start text-theme-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Jenis Kerusakan
              </th>
              <th className="px-4 py-3 text-start text-theme-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Lokasi
              </th>
              <th className="px-4 py-3 text-start text-theme-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Deskripsi
              </th>
              <th className="px-4 py-3 text-start text-theme-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Waktu Laporan
              </th>
              <th className="px-4 py-3 text-start text-theme-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Dinas
              </th>
              <th className="px-4 py-3 text-start text-theme-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Likes
              </th>
              <th className="px-4 py-3 text-start text-theme-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Dislikes
              </th>
              <th className="px-4 py-3 text-start text-theme-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-start text-theme-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Foto
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-white/[0.05]">
            {laporanData.length === 0 ? (
              <tr>
                <td colSpan={11} className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                  Tidak ada data laporan
                </td>
              </tr>
            ) : (
              laporanData.map((laporan) => (
                <LaporanRow
                  key={laporan.id}
                  laporan={laporan}
                  isUpdating={updatingLaporanId === laporan.id || globalUpdating}
                  onStatusUpdate={handleStatusUpdate}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination - Tetap sama */}
      {laporanData.length > 0 && (
        <Pagination
          pagination={pagination}
          onPageChange={goToPage}
          onItemsPerPageChange={changeItemsPerPage}
        />
      )}
    </div>
  );
};

export default TableLaporan;