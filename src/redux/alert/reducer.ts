import { SET_ALERT, CLEAR_ALERT } from "./constans";

interface AlertState {
  message: string | null;
  alertType: "success" | "error" | "warning" | "info" | null;
}

const initialState: AlertState = {
  message: null,
  alertType: null,
};

export default function alertReducer(
  state = initialState,
  action: any
): AlertState {
  switch (action.type) {
    case SET_ALERT:
      return {
        message: action.payload.message,
        alertType: action.payload.alertType,
      };
    case CLEAR_ALERT:
      return initialState;
    default:
      return state;
  }
}
