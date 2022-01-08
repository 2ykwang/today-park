import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  username: "",
  password: "",
};

export const signUpSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    getSignUpData: (state, action) => {
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.password = action.payload.password;
    },
  },
});

export const { getSignUpData } = signUpSlice.actions;

export default signUpSlice.reducer;
