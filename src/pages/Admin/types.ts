export interface DinasUser {
  id: string;
  username: string;
  email: string;
  role: string;
  dinas: {
    id: string;
    name: string;
  };
}

export interface Dinas {
  id: string;
  name: string;
  users: DinasUser[];
  createdAt?: string;
  updatedAt?: string;
}

export interface DinasResponse {
  status: boolean;
  message: string;
  data: Dinas[];
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export interface CreateDinasUserRequest {
  id: string;
  username: string;
  email: string;
  password: string;
  dinasName: string;
  dinasId: string;
}

export interface CreateDinasUserResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    username: string;
    email: string;
    role: string;
    dinas: {
      id: string;
      name: string;
    };
    createdAt: string;
  };
}
