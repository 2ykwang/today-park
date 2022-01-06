import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginSlice";
import signUpReducer from "./signupSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    signup: signUpReducer,
  },
});
