import store from "./store";
import Cookies from "js-cookie";

let currentAuth: any;
function listener() {
  const previousAuth = currentAuth;
  currentAuth = store.getState().auth;

  if (currentAuth !== previousAuth) {
    if (currentAuth.isAuthenticated) {
      // Cookies.set("token", currentAuth.token ?? "", { expires: 7 / 24 });
      // Cookies.set("username", currentAuth.username ?? "", { expires: 7 / 24 });
      // Cookies.set("email", currentAuth.email ?? "", { expires: 7 / 24 });
      // Cookies.set("role", currentAuth.role ?? "", { expires: 7 / 24 });
      // Cookies.set("id", currentAuth.id ?? "", { expires: 7 / 24 });
      Cookies.set(
        "auth",
        JSON.stringify({
          token: currentAuth.token || "",
          username: currentAuth.username || "",
          email: currentAuth.email || "",
          role: currentAuth.role || "",
          id: currentAuth.id || "",
        }),
        { expires: 7 / 24 } 
      );
    } else {
      Cookies.remove("token");
      Cookies.remove("username");
      Cookies.remove("email");
      Cookies.remove("role");
      Cookies.remove("id");
    }
  }
}

export function listen() {
  store.subscribe(listener);
}
