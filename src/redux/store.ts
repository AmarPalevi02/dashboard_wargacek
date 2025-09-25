import {
  combineReducers,
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
import { thunk } from "redux-thunk";

import authReducer from './auth/reducer'

const composerEnhancer =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer,
});
  
const store = createStore(
  rootReducer,
  composerEnhancer(applyMiddleware(thunk))
);

export type RootState = ReturnType<typeof rootReducer>;
export default store;
