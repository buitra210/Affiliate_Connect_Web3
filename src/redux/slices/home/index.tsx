import { RTHomeProject, RTTrendingTokens } from "@centic-scoring/api/services";
import { DataWithStatus } from "../global";
import { createSlice } from "@reduxjs/toolkit";
import {
  getHomeProject,
  getMostGrownDexs,
  getMostGrownLendingPools,
  getMostGrowthDefi,
  getTrendingTokens,
} from "./fetchFuntion";

export type THomePage = {
  project: DataWithStatus<RTHomeProject>;
  defi: DataWithStatus<RTHomeProject>;
  token: DataWithStatus<RTTrendingTokens>;
  lending: DataWithStatus<RTHomeProject>;
  dexes: DataWithStatus<RTHomeProject>;
};

const initState: THomePage = {
  project: {
    status: "IDLE",
    data: {} as RTHomeProject,
  },
  defi: {
    status: "IDLE",
    data: {} as RTHomeProject,
  },
  token: {
    status: "IDLE",
    data: {} as RTTrendingTokens,
  },
  lending: {
    status: "IDLE",
    data: {} as RTHomeProject,
  },
  dexes: {
    status: "IDLE",
    data: {} as RTHomeProject,
  },
};

export const homePageSlice = createSlice({
  name: "home-page",
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHomeProject.pending, (state) => {
        state.project.status = "PROCESSING";
      })
      .addCase(getHomeProject.fulfilled, (state, action) => {
        state.project.status = "SUCCESS";
        state.project.data = action.payload;
      })
      .addCase(getHomeProject.rejected, (state) => {
        state.project.status = "FAILED";
      })
      .addCase(getTrendingTokens.pending, (state) => {
        state.token.status = "PROCESSING";
      })
      .addCase(getTrendingTokens.fulfilled, (state, action) => {
        state.token.status = "SUCCESS";
        state.token.data = action.payload;
      })
      .addCase(getTrendingTokens.rejected, (state) => {
        state.token.status = "FAILED";
      })
      .addCase(getMostGrownLendingPools.pending, (state) => {
        state.lending.status = "PROCESSING";
      })
      .addCase(getMostGrownLendingPools.fulfilled, (state, action) => {
        state.lending.status = "SUCCESS";
        state.lending.data = action.payload;
      })
      .addCase(getMostGrownLendingPools.rejected, (state) => {
        state.lending.status = "FAILED";
      })
      .addCase(getMostGrownDexs.pending, (state) => {
        state.dexes.status = "PROCESSING";
      })
      .addCase(getMostGrownDexs.fulfilled, (state, action) => {
        state.dexes.status = "SUCCESS";
        state.dexes.data = action.payload;
      })
      .addCase(getMostGrownDexs.rejected, (state) => {
        state.dexes.status = "FAILED";
      })
      .addCase(getMostGrowthDefi.pending, (state) => {
        state.defi.status = "PROCESSING";
      })
      .addCase(getMostGrowthDefi.fulfilled, (state, action) => {
        state.defi.status = "SUCCESS";
        state.defi.data = action.payload;
      })
      .addCase(getMostGrowthDefi.rejected, (state) => {
        state.defi.status = "FAILED";
      });
  },
});

export default homePageSlice.reducer;
