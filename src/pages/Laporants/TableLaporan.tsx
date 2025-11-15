import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import LaporanRow from "./LaporanRow";
import { useLaporanData } from "./useLaporanData";
import { useStatusUpdate } from "./useStatusUpdate";
import { useTransferLaporan } from "./useTransferLaporan";
import Pagination from "./Pagination";

const TableLaporan: React.FC = () => {
  const {
    laporanData,
    setLaporanData,
    currentDinasId,
    loading,
    error,
    pagination,
    filterStatus,
    refetch,
    goToPage,
    changeItemsPerPage,
    changeFilterStatus,
  } = useLaporanData();

  const { updatingStatus, updateStatusLaporan } = useStatusUpdate(setLaporanData, refetch);
  
  // Gunakan useTransferLaporan yang sudah include dinas options
  const { 
    transferring, 
    error: transferError, 
    success: transferSuccess, 
    dinasOptions,
    loadingDinas,
    transferLaporan,
    clearMessages,
  } = useTransferLaporan();

  const handleTransfer = async (laporanId: string, transferData: any) => {
    const result = await transferLaporan(laporanId, transferData);
    if (result) {
      await refetch();
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Memuat data laporan...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Notifikasi Transfer */}
      {transferError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded flex justify-between items-center">
          <span>{transferError}</span>
          <button 
            onClick={clearMessages}
            className="text-red-700 hover:text-red-900"
          >
            ✕
          </button>
        </div>
      )}
      
      {transferSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded flex justify-between items-center">
          <span>{transferSuccess}</span>
          <button 
            onClick={clearMessages}
            className="text-green-700 hover:text-green-900"
          >
            ✕
          </button>
        </div>
      )}

      {/* Loading Dinas Options */}
      {loadingDinas && (
        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded">
          Memuat daftar dinas...
        </div>
      )}

      {/* Filter Section */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Daftar Laporan
          </h2>
          
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600 dark:text-gray-400">
              Filter Status:
            </label>
            <select
              value={filterStatus}
              onChange={(e) => changeFilterStatus(e.target.value as "active" | "done")}
              className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 text-sm bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="active">Laporan Aktif</option>
              <option value="done">Laporan Selesai</option>
            </select>
          </div>
        </div>

        {filterStatus === "done" && (
          <div className="text-sm text-green-600 bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full">
            Menampilkan laporan yang sudah selesai
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className="px-4 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Pelapor
                </TableCell>
                <TableCell isHeader className="px-4 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  No Telepon
                </TableCell>
                <TableCell isHeader className="px-4 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Jenis Kerusakan
                </TableCell>
                <TableCell isHeader className="px-4 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Lokasi
                </TableCell>
                <TableCell isHeader className="px-4 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 max-w-[200px]">
                  Deskripsi
                </TableCell>
                <TableCell isHeader className="px-4 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Waktu Laporan
                </TableCell>
                <TableCell isHeader className="px-4 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Dinas
                </TableCell>
                <TableCell isHeader className="px-4 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Setuju
                </TableCell>
                <TableCell isHeader className="px-4 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Tidak Setuju
                </TableCell>
                <TableCell isHeader className="px-4 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 min-w-[180px]">
                  Status & Aksi
                </TableCell>
                <TableCell isHeader className="px-4 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Foto
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {laporanData.map((laporan) => (
                <LaporanRow
                  key={laporan.id}
                  laporan={laporan}
                  isUpdating={updatingStatus === laporan.id}
                  onStatusUpdate={updateStatusLaporan}
                  currentDinasId={currentDinasId}
                  dinasOptions={dinasOptions}
                  transferring={transferring === laporan.id}
                  onTransfer={handleTransfer}
                />
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Empty State */}
        {laporanData.length === 0 && (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <div className="text-gray-400 text-lg mb-2">
                {filterStatus === "done" 
                  ? "Tidak ada laporan yang sudah selesai" 
                  : "Tidak ada data laporan"
                }
              </div>
              <div className="text-gray-500 text-sm">
                {filterStatus === "done" 
                  ? "Semua laporan masih dalam proses" 
                  : "Belum ada laporan yang dibuat"
                }
              </div>
            </div>
          </div>
        )}

        {/* Pagination */}
        {laporanData.length > 0 && (
          <Pagination
            pagination={pagination}
            onPageChange={goToPage}
            onItemsPerPageChange={changeItemsPerPage}
          />
        )}
      </div>
    </div>
  );
};

export default TableLaporan;