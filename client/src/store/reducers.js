import { combineReducers } from "@reduxjs/toolkit";
import customizationReducer from "./slices/customizationSlice";
import authReducer from "./slices/authSlice";

const rootReducer = combineReducers({
  customization: customizationReducer,
  auth: authReducer,
});

export default rootReducer;
