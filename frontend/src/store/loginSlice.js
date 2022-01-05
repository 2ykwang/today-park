import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  username: "",
  password: "",
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    getLoginData: (state, action) => {
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.password = action.payload.password;
    },
  },
});

export const { getLoginData } = loginSlice.actions;

export default loginSlice.reducer;
