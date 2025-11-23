import { AuthState, authPayload } from "./type";
import { USER_LOGIN, USER_LOGOUT } from "./constans";

type AuthAction =
  | { type: typeof USER_LOGIN; payload: authPayload }
  | { type: typeof USER_LOGOUT };

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  username: null,
  email: null,
  role: null,
  id: null,
  dinasName: null
};

export function authReducer (
  state: AuthState = initialState,
  action: AuthAction
): AuthState  {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        username: action.payload.username,
        email: action.payload.email,
        role: action.payload.role,
        id: action.payload.id,
        dinasName: action.payload.dinasName,
      };
    case USER_LOGOUT:
      console.log("USER_LOGOUT reducer");
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
