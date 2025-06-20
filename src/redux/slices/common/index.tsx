import { RTChains, RTDapps, RTToken } from "@centic-scoring/api/services/web3-growth/engagement";
import { RTDapps as RTContract, RTProjectSummary } from "@centic-scoring/api/services/user-explore";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DataWithStatus } from "../global";
import {
  getProjectChains,
  getProjectConfig,
  getProjectContract,
  getProjectDapps,
  getProjectSummary,
  getProjectTokens,
} from "./fetchFunction";
import { RTProjectConfig } from "@centic-scoring/api/services";

export type TCommonData = {
  project: DataWithStatus<RTProjectSummary>;
  dapps: DataWithStatus<RTDapps>;
  token: DataWithStatus<RTToken>;
  contract: DataWithStatus<RTContract>;
  chains: DataWithStatus<RTChains>;
  timeFilter: {
    start: number;
    end: number;
  };
  exportMode: boolean;
  skipSignWallet: boolean;
  fetchedId: {
    [key: string]: string;
  };
  projectConfig: DataWithStatus<RTProjectConfig>;
  layout: "For-project" | "web3-growth";
};

const now = Date.now();

const initState: TCommonData = {
  project: {
    status: "IDLE",
    data: {} as RTProjectSummary,
  },
  dapps: {
    status: "IDLE",
    data: [],
  },
  contract: {
    status: "IDLE",
    data: [],
  },
  token: {
    status: "IDLE",
    data: [],
  },
  chains: {
    status: "IDLE",
    data: [],
  },
  timeFilter: {
    start: now - 2592000000,
    end: now,
  },
  exportMode: false,
  skipSignWallet: false,
  fetchedId: {},
  projectConfig: { status: "IDLE", data: {} as RTProjectConfig },
  layout: "web3-growth",
};

export const commonSlice = createSlice({
  name: "common",
  initialState: initState,
  reducers: {
    editStartTime: (state, action) => {
      state.timeFilter.start = action.payload;
    },
    editEndTime: (state, action) => {
      state.timeFilter.end = action.payload;
    },
    resetTimeFilter: (state) => {
      state.timeFilter = initState.timeFilter;
    },
    enableExportMode: (state) => {
      state.exportMode = true;
    },
    disableExportMode: (state) => {
      state.exportMode = false;
    },
    setSkipSign: (state, action: PayloadAction<boolean>) => {
      state.skipSignWallet = action.payload;
    },
    setLayout: (state, action: PayloadAction<TCommonData["layout"]>) => {
      state.layout = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getProjectDapps.pending, (state) => {
        state.dapps.status = "PROCESSING";
      })
      .addCase(getProjectDapps.fulfilled, (state, action) => {
        state.dapps.status = "SUCCESS";
        state.dapps.data = action.payload;
        state.fetchedId["dapps"] = action.meta.arg;
      })
      .addCase(getProjectDapps.rejected, (state) => {
        state.dapps.status = "FAILED";
      })
      .addCase(getProjectContract.pending, (state) => {
        state.contract.status = "PROCESSING";
      })
      .addCase(getProjectContract.fulfilled, (state, action) => {
        state.contract.status = "SUCCESS";
        state.contract.data = action.payload;
      })
      .addCase(getProjectContract.rejected, (state) => {
        state.contract.status = "FAILED";
      })
      .addCase(getProjectTokens.pending, (state) => {
        state.token.status = "PROCESSING";
      })
      .addCase(getProjectTokens.fulfilled, (state, action) => {
        state.token.status = "SUCCESS";
        state.token.data = action.payload;
      })
      .addCase(getProjectTokens.rejected, (state) => {
        state.token.status = "FAILED";
      })
      .addCase(getProjectChains.pending, (state) => {
        state.chains.status = "PROCESSING";
      })
      .addCase(getProjectChains.fulfilled, (state, action) => {
        state.chains.status = "SUCCESS";
        state.chains.data = action.payload;
      })
      .addCase(getProjectChains.rejected, (state) => {
        state.chains.status = "FAILED";
      })
      .addCase(getProjectSummary.pending, (state) => {
        state.project.status = "PROCESSING";
      })
      .addCase(getProjectSummary.fulfilled, (state, action) => {
        state.project.status = "SUCCESS";
        state.project.data = action.payload;
      })
      .addCase(getProjectSummary.rejected, (state) => {
        state.project.status = "FAILED";
      })
      .addCase(getProjectConfig.pending, (state) => {
        state.projectConfig.status = "PROCESSING";
      })
      .addCase(getProjectConfig.fulfilled, (state, action) => {
        state.projectConfig.status = "SUCCESS";
        state.projectConfig.data = action.payload;
      })
      .addCase(getProjectConfig.rejected, (state) => {
        state.projectConfig.status = "FAILED";
      });
  },
});

export default commonSlice.reducer;

export const {
  editStartTime,
  editEndTime,
  disableExportMode,
  enableExportMode,
  setSkipSign,
  setLayout,
  resetTimeFilter,
} = commonSlice.actions;
