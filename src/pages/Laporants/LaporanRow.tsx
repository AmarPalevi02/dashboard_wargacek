import React, { useState } from "react";
import { Laporan } from "./types";
import { formatTanggal, getStatusTerbaru } from "./laporanHelpers";
import { getStatusColor } from "./statusHelpers";
import { TableCell, TableRow } from "../../components/ui/table";
import Badge from "../../components/ui/badge/Badge";
import StatusSelect from "./StatusSelect";
import TransferModal from "./TransferModal";
import { config } from "../../configs/configs";

interface LaporanRowProps {
  laporan: Laporan;
  isUpdating: boolean;
  onStatusUpdate: (laporanId: string, newStatus: string) => void;
  currentDinasId: string;
  dinasOptions: any[];
  transferring: boolean; 
  onTransfer: (laporanId: string, transferData: any) => void;
}

const LaporanRow: React.FC<LaporanRowProps> = ({
  laporan,
  isUpdating,
  onStatusUpdate,
  currentDinasId,
  dinasOptions,
  transferring,
  onTransfer,
}) => {
  const statusTerbaru = getStatusTerbaru(laporan.statuses);
  const statusColor = getStatusColor(statusTerbaru);
  const [showTransferModal, setShowTransferModal] = useState(false);

  const handleStatusChange = (newStatus: string) => {
    onStatusUpdate(laporan.id, newStatus);
  };

  const handleTransfer = async (transferData: any) => {
    await onTransfer(laporan.id, transferData);
    setShowTransferModal(false);
  };

  // Tampilkan tombol transfer hanya untuk laporan aktif (bukan DONE)
  const showTransferButton = statusTerbaru !== "DONE";

  return (
    <>
      <TableRow className="hover:bg-gray-50 dark:hover:bg-white/[0.02]">
        {/* Kolom Pelapor */}
        <TableCell className="px-4 py-3 text-start">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="font-medium text-gray-700 dark:text-gray-300 text-theme-xs">
                {laporan.User.username.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="min-w-0">
              <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90 truncate">
                {laporan.User.username}
              </span>
            </div>
          </div>
        </TableCell>

        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
          <div>
            <span className="font-medium text-gray-800 dark:text-white/90 block truncate max-w-[150px]">
              {laporan.User.no_telepon}
            </span>
          </div>
        </TableCell>

        {/* Kolom Jenis Kerusakan */}
        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
          <span className="font-medium text-gray-800 dark:text-white/90">
            {laporan.jenisKerusakan.jenis_kerusakan}
          </span>
        </TableCell>

        {/* Kolom Lokasi */}
        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
          <div>
            <span className="font-medium text-gray-800 dark:text-white/90 block truncate max-w-[150px]">
              {laporan.location}
            </span>
          </div>
        </TableCell>

        {/* Kolom Deskripsi */}
        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 max-w-[200px]">
          <div className="line-clamp-2" title={laporan.deskripsi}>
            {laporan.deskripsi}
          </div>
        </TableCell>

        {/* Kolom Waktu Laporan */}
        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 whitespace-nowrap">
          {formatTanggal(laporan.waktu_laporan)}
        </TableCell>

        {/* Kolom Dinas */}
        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
          <Badge size="sm" color="primary">
            {laporan.dinasSekarang}
          </Badge>
        </TableCell>

        {/* Kolom Likes and Dislikes */}
        <TableCell>
          <Badge size="sm" color="success">
            {laporan.voteCount.likes}
          </Badge>
        </TableCell>

        <TableCell>
          <Badge size="sm" color="error">
            {laporan.voteCount.dislikes}
          </Badge>
        </TableCell>

        {/* Kolom Status + Transfer Button */}
        <TableCell className="px-4 py-3 text-start">
          <div className="flex flex-col gap-2 min-w-[160px]">
            <div className="relative">
              <Badge size="sm" color={statusColor} className="w-full">
                <div className="relative w-full">
                  <StatusSelect
                    value={statusTerbaru}
                    onChange={handleStatusChange}
                    disabled={isUpdating}
                    className="!text-theme-xs"
                  />
                </div>
              </Badge>

              {isUpdating && (
                <div className="absolute inset-0 bg-white bg-opacity-50 dark:bg-gray-800 dark:bg-opacity-50 flex items-center justify-center rounded">
                  <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>

            {/* Tombol Transfer */}
            {showTransferButton && (
              <button
                onClick={() => setShowTransferModal(true)}
                disabled={transferring} 
                className="w-full text-theme-xs bg-orange-500 hover:bg-orange-600 text-white py-1 px-2 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {transferring ? "Mengalihkan..." : "Alihkan ke Dinas Lain"}
              </button>
            )}

            {/* Info status */}
            <div className="text-theme-xs text-gray-400">
              {laporan.statuses.length > 0 ? (
                <div>Riwayat: {laporan.statuses.length} status</div>
              ) : (
                <span className="text-orange-500">Belum ada status</span>
              )}
            </div>

            {isUpdating && (
              <div className="text-theme-xs text-blue-500 flex items-center gap-1">
                <div className="w-2 h-2 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                Mengupdate...
              </div>
            )}
          </div>
        </TableCell>

        {/* Kolom Foto */}
        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
          {laporan.foto_url ? (
            <div className="w-10 h-10 overflow-hidden rounded border border-gray-200 dark:border-gray-700 flex-shrink-0">
              <img
                src={`${config.base_url}${laporan.foto_url}`}
                alt="Foto laporan"
                className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() =>
                  window.open(`${config.base_url}${laporan.foto_url}`, "_blank")
                }
              />
            </div>
          ) : (
            <span className="text-theme-xs text-gray-400 italic">No photo</span>
          )}
        </TableCell>
      </TableRow>

      {/* Transfer Modal */}
      <TransferModal
        isOpen={showTransferModal}
        onClose={() => setShowTransferModal(false)}
        onTransfer={handleTransfer}
        transferring={transferring}
        laporanId={laporan.id}
        currentDinasId={currentDinasId}
        dinasOptions={dinasOptions || []}
      />
    </>
  );
};

export default LaporanRow;