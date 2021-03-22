import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { authReducer } from "./authReducer";
import { modelReducer } from "./modelReducer";
import { userReducer } from "./userReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  form: formReducer,
  model: modelReducer,
  user: userReducer,
});
