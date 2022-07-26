import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import serviceReducer from "./serviceReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  service: serviceReducer,
});

export default rootReducer;
