import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeForm: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    openLoginForm: state => {
      state.activeForm = "login";
    },
    openRegisterForm: state => {
      state.activeForm = "register";
    },
    openGiftForm: state => {
      state.activeForm = "gift";
    },
    closeForm: state => {
      state.activeForm = null;
    },
  },
});

export const { openLoginForm, openRegisterForm, openGiftForm, closeForm } =
  authSlice.actions;
export default authSlice.reducer;
