import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "elice@test.com",
  username: "엘리스",
  password: "",
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    getLoginData: (state, action) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    getUsername: (state, action) => {
      state.username = action.payload;
    },
  },
});

export const { getLoginData, getUsername } = loginSlice.actions;

export default loginSlice.reducer;
