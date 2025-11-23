import store from "./store";
import Cookies from "js-cookie";
import { userLogin } from "./auth/action";

let currentAuth: any;

function initializeAuthFromCookies() {
  const authCookie = Cookies.get("auth");
  if (authCookie) {
    try {
      const authData = JSON.parse(authCookie);
      
      // Dispatch login action untuk sync state Redux dengan cookies
      store.dispatch(userLogin(authData));
    } catch (error) {
      console.error("Error parsing auth cookie:", error);
      Cookies.remove("auth");
    }
  }
}

function listener() {
  const previousAuth = currentAuth;
  currentAuth = store.getState().auth;

  if (currentAuth !== previousAuth) {

    if (currentAuth.isAuthenticated && currentAuth.token) {
      Cookies.set(
        "auth",
        JSON.stringify({
          token: currentAuth.token || "",
          username: currentAuth.username || "",
          email: currentAuth.email || "",
          role: currentAuth.role || "",
          id: currentAuth.id || "",
          dinasName: currentAuth.dinasName || "",
        }),
        { expires: 7 }
      );
      console.log("Auth cookie set");
    } else {
      Cookies.remove("auth");
      console.log("Auth cookie removed");
    }
  }
}

export function listen() {
  // Initialize auth state from cookies saat app start
  initializeAuthFromCookies();
  
  // Subscribe to store changes
  store.subscribe(listener);
}