import {
  fetchAddressesSetting,
  fetchDappsSetting,
  fetchSocialsMediaSetting,
} from "@centic-scoring/api/services/web3-growth/setting";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getDAppsSetting = createAsyncThunk("setting/dapps", async ({ id }: { id: string }) => {
  const dappsData = await fetchDappsSetting(id);
  return dappsData;
});

export const getAddressesSetting = createAsyncThunk(
  "setting/addresses",
  async ({ id }: { id: string }) => {
    const addressesData = await fetchAddressesSetting(id);
    return addressesData;
  }
);

export const getSocialsSetting = createAsyncThunk(
  "setting/social-media",
  async ({ id }: { id: string }) => {
    const socialsMediaData = await fetchSocialsMediaSetting(id);
    return socialsMediaData;
  }
);
