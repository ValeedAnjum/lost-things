import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { authReducer } from "./authReducer";
import { modelReducer } from "./modelReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  form: formReducer,
  model: modelReducer,
});
