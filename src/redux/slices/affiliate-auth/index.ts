import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DataWithStatus } from "../global";
import { RTAffiliateUserInfo } from "@centic-scoring/api/services/affiliate/affiliate";
import { getAffiliateUser } from "./fetchFunction";
import { deleteAPIJwt } from "@centic-scoring/utils/storage/authStorage";

export type RTAffiliateAuth = {
  isLoggedIn: boolean;
  open: boolean;
  userData: DataWithStatus<RTAffiliateUserInfo>;
  telegramParams: {
    step: number;
    data: {
      country?: string;
      phone?: string;
      code?: string;
      phoneCodeHash?: string;
      sessionPath?: string;
      password?: string;
      key?: string;
    };
  };
  loginPlatform: "telegram" | "twitter" | null;
};

const initState: RTAffiliateAuth = {
  isLoggedIn: false,
  open: false,
  userData: { status: "IDLE", data: {} as RTAffiliateUserInfo },
  telegramParams: { step: 2, data: {} },
  loginPlatform: null,
};

const AffiliateAuthSlice = createSlice({
  name: "affiliate-auth",
  initialState: initState,
  reducers: {
    editTeleParams: (state, action: PayloadAction<Partial<RTAffiliateAuth["telegramParams"]>>) => {
      state.telegramParams = { ...state.telegramParams, ...action.payload };
    },
    editTeleParamsData: (
      state,
      action: PayloadAction<Partial<RTAffiliateAuth["telegramParams"]["data"]>>
    ) => {
      state.telegramParams.data = { ...state.telegramParams.data, ...action.payload };
    },
    logout: (state) => {
      state.userData.status = "IDLE";
      deleteAPIJwt("affiliate");
      state.userData.data = {} as RTAffiliateUserInfo;
      state.isLoggedIn = false;
    },
    setLoginPlatform: (state, action: PayloadAction<RTAffiliateAuth["loginPlatform"]>) => {
      state.loginPlatform = action.payload;
    },
    handleOpen: (state) => {
      state.open = true;
    },
    handleClose: (state) => {
      state.open = false;
    },
    resetFormData: (state) => {
      state.telegramParams = {
        step: 2,
        data: {},
      };
      state.loginPlatform = null;
    },
    checkUserData: (state) => {
      if (
        state.userData.status !== "IDLE" &&
        state.userData.status !== "PROCESSING" &&
        !state.isLoggedIn
      ) {
        state.open = true;
        state.telegramParams = {
          step: 2,
          data: {},
        };
        state.loginPlatform = null;
      } else {
        state.open = false;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAffiliateUser.pending, (state) => {
        state.userData.status = "PROCESSING";
      })
      .addCase(getAffiliateUser.fulfilled, (state, action) => {
        state.userData.status = "SUCCESS";
        state.userData.data = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(getAffiliateUser.rejected, (state) => {
        state.userData.status = "FAILED";
        state.isLoggedIn = false;
      });
  },
});

export default AffiliateAuthSlice.reducer;

export const {
  editTeleParams,
  editTeleParamsData,
  logout,
  setLoginPlatform,
  handleClose,
  handleOpen,
  resetFormData,
  checkUserData,
} = AffiliateAuthSlice.actions;
