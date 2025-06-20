import {
  AddressesSetting,
  DappsSetting,
  SocialsMediaSetting,
} from "@centic-scoring/api/services/web3-growth/setting";
import { createSlice } from "@reduxjs/toolkit";
import { DataWithStatus } from "../global";
import { getAddressesSetting, getDAppsSetting, getSocialsSetting } from "./fetchFunctions";

export type SettingSlice = {
  dApp: DataWithStatus<DappsSetting>;
  address: DataWithStatus<AddressesSetting>;
  socialsMedia: DataWithStatus<SocialsMediaSetting>;
};

const initialState: SettingSlice = {
  dApp: {
    status: "IDLE",
    data: {
      numberOfDocs: 0,
      docs: [],
    },
  },
  address: {
    status: "IDLE",
    data: {
      numberOfDocs: 0,
      docs: [],
    },
  },
  socialsMedia: {
    status: "IDLE",
    data: {
      numberOfDocs: 0,
      totalFollowers: 0,
      docs: [],
    },
  },
};
export const settingSlice = createSlice({
  name: "settingSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDAppsSetting.pending, (state) => {
      state.dApp.status = "PROCESSING";
    });
    builder.addCase(getDAppsSetting.rejected, (state) => {
      state.dApp.status = "FAILED";
    });
    builder.addCase(getDAppsSetting.fulfilled, (state, action) => {
      state.dApp.status = "SUCCESS";
      state.dApp.data = action.payload;
    });
    builder.addCase(getAddressesSetting.rejected, (state) => {
      state.address.status = "FAILED";
    });
    builder.addCase(getAddressesSetting.pending, (state) => {
      state.address.status = "PROCESSING";
    });
    builder.addCase(getAddressesSetting.fulfilled, (state, action) => {
      state.address.status = "SUCCESS";
      state.address.data = action.payload;
    });
    builder.addCase(getSocialsSetting.rejected, (state) => {
      state.socialsMedia.status = "FAILED";
    });
    builder.addCase(getSocialsSetting.pending, (state) => {
      state.socialsMedia.status = "PROCESSING";
    });
    builder.addCase(getSocialsSetting.fulfilled, (state, action) => {
      state.socialsMedia.status = "SUCCESS";
      state.socialsMedia.data = action.payload;
    });
  },
});

export default settingSlice.reducer;
