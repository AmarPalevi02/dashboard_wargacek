// types/index.ts
export interface Dinas {
  id: string;
  name: string;
}

export interface JenisKerusakan {
  id: string;
  jenis_kerusakan: string;
    dinas: {
    id: string;
    name: string;
  };
  dinasId?: string;
}

export interface ApiResponse<T = any> {
  status: string;
  message: string;
  data: T;
}

export interface CreateJenisKerusakanPayload {
  jenis_kerusakan: string;
  dinasId: string;
}



export interface JenisKerusakan {
  id: string;
  jenis_kerusakan: string;

}

export interface Dinas {
  id: string;
  name: string;
  users?: User[];
  laporan?: LaporanStatus[];
  jenisKerusakan?: JenisKerusakan[];
}

export interface EditJenisKerusakanPayload {
  namaKerusakan: string;
  dinasId?: string;
}