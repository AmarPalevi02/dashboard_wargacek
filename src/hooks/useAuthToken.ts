import { useMemo } from "react";
import Cookies from "js-cookie";

type AuthPayload = {
  token: string;
  username: string;
  email: string;
  role: string;
  id: string;
  dinasName: string;
};

const useAuthToken = (): Partial<AuthPayload> => {
  const auth = useMemo<AuthPayload | null>(() => {
    const cookie = Cookies.get("auth");
    try {
      return cookie ? (JSON.parse(cookie) as AuthPayload) : null;
    } catch (err) {
      console.error("Error parsing auth cookie:", err);
      return null;
    }
  }, []);

  return {
    token: auth?.token,
    username: auth?.username,
    email: auth?.email,
    role: auth?.role,
    id: auth?.id,
    dinasName: auth?.dinasName,
  };
};

export default useAuthToken;
