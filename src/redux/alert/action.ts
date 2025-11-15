import { SET_ALERT, CLEAR_ALERT } from "./constans";

export type AlertType = "success" | "error" | "warning" | "info";

export const setAlert = (message: string, alertType: AlertType) => ({
  type: SET_ALERT,
  payload: { message, alertType },
});

export const clearAlert = () => ({
  type: CLEAR_ALERT,
});
