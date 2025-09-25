import { USER_LOGIN, USER_LOGOUT } from "./constans";
import Cookies from "js-cookie";
import { authPayload } from "./type";

export const userLogin = (payload: authPayload) => {
  return {
    type: USER_LOGIN,
    payload,
  };
};

export const userLogout = () => {
  Cookies.remove("auth");
  return {
    type: USER_LOGOUT,
  };
};
