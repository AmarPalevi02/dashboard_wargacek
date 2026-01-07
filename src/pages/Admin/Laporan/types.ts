export interface User {
  id: string;
  username: string;
  no_telepon: string;
}

export interface Dinas {
  name: string;
}

export interface JenisKerusakan {
  jenis_kerusakan: string;
  dinas: Dinas;
}

export interface voteCount {
  likes: string;
  dislikes: string;
}


export interface StatusLaporan {
  status: string;
  updatedAt: string;

  transferredFrom?: string;
  transferReason?: string;
  Dinas?: {
    name: string;
  };
}


export interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface Laporan {
  id: string;
  jenisKerusakanId: string;
  foto_url: string;
  longitude: number;
  latitude: number;
  deskripsi: string;
  location: string;
  waktu_laporan: string;
  userId: string;
  User: User;
  dinasSekarang: string;
  jenisKerusakan: JenisKerusakan;
  voteCount: voteCount;
  statuses: StatusLaporan[];
}


export interface StatusOption {
  value: string;
  label: string;
}


export interface UpdateLaporanPayload {
  status: string;
}

export interface UpdateLaporanResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    status: string;
    updatedAt: string;
    laporan: {
      id: string;
      jenisKerusakan: string;
      deskripsi: string;
      location: string;
      user: User;
    };
    dinas: {
      id: string;
      name: string;
    };
  };
}