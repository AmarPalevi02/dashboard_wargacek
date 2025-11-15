import { useState, useEffect } from "react";
import { Laporan, PaginationData } from "./types";
import useAuthToken from "../../hooks/useAuthToken";
import { getDatas } from "../../utils/fetch";

export const useLaporanData = () => {
  const [laporanData, setLaporanData] = useState<Laporan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationData>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  });
  const [filterStatus, setFilterStatus] = useState<"active" | "done">("active");

  const { dinasName } = useAuthToken();

  const fetchLaporanData = async (page: number = 1, limit: number = 10) => {
    try {
      setLoading(true);
      setError(null);

      // Tentukan endpoint berdasarkan filter
      const endpoint = filterStatus === "done" 
        ? `laporans/dinas/selesai?page=${page}&limit=${limit}&showDone=true`
        : `laporans/dinas?page=${page}&limit=${limit}`;

      const response = await getDatas(endpoint);

      if (response.data.status === true) {
        const transformedData: Laporan[] = response.data.data.map(
          (item: any) => ({
            id: item.id,
            jenisKerusakanId: item.jenisKerusakanId || "",
            foto_url: item.foto_url,
            longitude: item.longitude || 0,
            latitude: item.latitude || 0,
            deskripsi: item.deskripsi,
            location: item.location,
            waktu_laporan: item.waktu_laporan,
            userId: item.user.id,
            dinasSekarang: item.dinasSekarang,
            User: {
              id: item.user.id,
              username: item.user.username,
              no_telepon: item.user.no_telepon,
            },
            jenisKerusakan: {
              jenis_kerusakan: item.jenisKerusakan,
              dinas: {
                name: item.dinas,
              },
            },
            voteCount: {
              likes: item.voteCount.likes,
              dislikes: item.voteCount.dislikes,
            },
            statuses: item.statuses || [],
          })
        );

        setLaporanData(transformedData);

        if (response.data.pagination) {
          setPagination(response.data.pagination);
        }
      } else {
        setError("Gagal mengambil data laporan");
      }
    } catch (err) {
      setError("Terjadi kesalahan saat mengambil data");
      console.error("Error fetching laporan:", err);
    } finally {
      setLoading(false);
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= pagination.totalPages) {
      fetchLaporanData(page, pagination.itemsPerPage);
    }
  };

  const changeItemsPerPage = (itemsPerPage: number) => {
    setPagination((prev) => ({ ...prev, itemsPerPage }));
    fetchLaporanData(1, itemsPerPage);
  };

  // Function untuk mengganti filter
  const changeFilterStatus = (newFilter: "active" | "done") => {
    setFilterStatus(newFilter);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  useEffect(() => {
    fetchLaporanData(1, pagination.itemsPerPage);
  }, [filterStatus]);

  return {
    laporanData,
    setLaporanData,
    loading,
    error,
    pagination,
    filterStatus,
    refetch: fetchLaporanData,
    goToPage,
    changeItemsPerPage,
    changeFilterStatus,
  };
};