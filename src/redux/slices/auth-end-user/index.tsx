import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TAuthEndUser = {
  isLoggedin: boolean;
};

const initData: TAuthEndUser = { isLoggedin: false };

const AuthEndUserSlice = createSlice({
  name: "auth-end-user",
  initialState: initData,
  reducers: {
    updateAuthState: (state, action: PayloadAction<boolean>) => {
      state.isLoggedin = action.payload;
    },
  },
});

export default AuthEndUserSlice.reducer;
export const { updateAuthState } = AuthEndUserSlice.actions;
