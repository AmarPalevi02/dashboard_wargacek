export type authPayload = {
  token: string;
  username: string;
  email: string;
  role: string;
  id: string;
  dinasName: string;
};

export type AuthState = {
  isAuthenticated: boolean;
  token: string | null;
  username: string | null;
  email: string | null;
  role: string | null;
  id: string | null;
  dinasName: string | null;
};
