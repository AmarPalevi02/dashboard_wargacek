import { Laporan, StatusLaporan } from "./types";

export const getStatusTerbaru = (statuses: StatusLaporan[]): string => {
  if (!statuses || statuses.length === 0) return "PENDING";

  const sortedStatus = [...statuses].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  return sortedStatus[0].status;
};

export const formatTanggal = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
