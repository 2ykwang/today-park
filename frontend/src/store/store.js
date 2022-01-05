import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
  },
});
