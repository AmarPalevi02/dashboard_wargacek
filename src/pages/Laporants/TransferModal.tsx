import React, { useState, useEffect } from "react";
import { TransferLaporanRequest, DinasOption } from "./types";

interface TransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTransfer: (data: TransferLaporanRequest) => void;
  transferring: boolean;
  laporanId: string;
  currentDinasId: string;
  dinasOptions?: DinasOption[]; 
}

const TransferModal: React.FC<TransferModalProps> = ({
  isOpen,
  onClose,
  onTransfer,
  transferring,
  laporanId,
  currentDinasId,
  dinasOptions = [], 
}) => {
  const [targetDinasId, setTargetDinasId] = useState("");
  const [reason, setReason] = useState("");

  // Filter out current dinas from options dengan null check
  const filteredDinasOptions = (dinasOptions || []).filter(
    (dinas) => dinas.id !== currentDinasId
  );

  useEffect(() => {
    if (!isOpen) {
      setTargetDinasId("");
      setReason("");
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (targetDinasId && reason.trim()) {
      onTransfer({
        targetDinasId,
        reason: reason.trim(),
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Alihkan Laporan
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Target Dinas */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Pilih Dinas Tujuan
              </label>
              <select
                value={targetDinasId}
                onChange={(e) => setTargetDinasId(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={transferring || filteredDinasOptions.length === 0}
              >
                <option value="">Pilih dinas...</option>
                {filteredDinasOptions.map((dinas) => (
                  <option key={dinas.id} value={dinas.id}>
                    {dinas.name}
                  </option>
                ))}
              </select>
              {filteredDinasOptions.length === 0 && (
                <p className="text-sm text-gray-500 mt-1">
                  Tidak ada dinas lain yang tersedia
                </p>
              )}
            </div>

            {/* Alasan Transfer */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Alasan Pengalihan
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={4}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Masukkan alasan mengapa laporan dialihkan..."
                required
                disabled={transferring}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                disabled={transferring}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={transferring || !targetDinasId || !reason.trim() || filteredDinasOptions.length === 0}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {transferring ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Mengalihkan...
                  </div>
                ) : (
                  "Alihkan Laporan"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TransferModal;