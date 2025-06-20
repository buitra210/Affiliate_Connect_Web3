import {
  RTKOLsreport,
  RTKOLsRPMetrics,
  RTKOLsRPOverview,
  RTKOlsRPPerformance,
  RTKOLsRPTweet,
} from "@centic-scoring/api/services/affiliate";
import { DataWithStatus } from "../global";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getKOLsRPMetrics,
  getKOLsRPOverview,
  getKOLsRPPerformance,
  getKOLsRPTweet,
  getKOLsSummary,
} from "./fetchFunctions";

export type TKOLsReport = {
  name: string;
  nameList: string[];
  filter: {
    startTime?: number;
    endTime?: number;
    viewBy: keyof Omit<RTKOLsRPMetrics, "kolInfo" | "kolList">;
    kolsAnalysis: {
      [name: string]: boolean;
    };
    kolsOverview: {
      [name: string]: boolean;
    };
  };
  summary: DataWithStatus<RTKOLsreport>;
  performanceAnalysis: DataWithStatus<RTKOlsRPPerformance>;
  tweetAnalysis: DataWithStatus<RTKOLsRPTweet>;
  overview: DataWithStatus<RTKOLsRPOverview>;
  performanceMetrics: DataWithStatus<RTKOLsRPMetrics>;
};
const initData: TKOLsReport = {
  name: "",
  nameList: [],
  filter: {
    viewBy: "followers",
    kolsAnalysis: {},
    kolsOverview: {},
  },
  summary: { status: "IDLE", data: {} as RTKOLsreport },
  performanceAnalysis: { status: "IDLE", data: {} as RTKOlsRPPerformance },
  tweetAnalysis: { status: "IDLE", data: {} as RTKOLsRPTweet },
  overview: { status: "IDLE", data: {} as RTKOLsRPOverview },
  performanceMetrics: { status: "IDLE", data: {} as RTKOLsRPMetrics },
};

const kolsReport = createSlice({
  name: "kols-report",
  initialState: initData,
  reducers: {
    setFilter: (state, action: PayloadAction<Partial<TKOLsReport["filter"]>>) => {
      state.filter = { ...state.filter, ...action.payload };
    },
    setKOLsAnalysisFilter: (
      state,
      action: PayloadAction<TKOLsReport["filter"]["kolsAnalysis"]>
    ) => {
      state.filter.kolsAnalysis = { ...state.filter.kolsAnalysis, ...action.payload };
    },

    toggleKOLsAnalysisFilter: (
      state,
      action: PayloadAction<keyof TKOLsReport["filter"]["kolsAnalysis"]>
    ) => {
      state.filter.kolsAnalysis[action.payload] = !state.filter.kolsAnalysis[action.payload];
    },

    setKOLsOverviewFilter: (
      state,
      action: PayloadAction<TKOLsReport["filter"]["kolsOverview"]>
    ) => {
      state.filter.kolsOverview = { ...state.filter.kolsOverview, ...action.payload };
    },
    toggleKOLsOverviewFilter: (
      state,
      action: PayloadAction<keyof TKOLsReport["filter"]["kolsOverview"]>
    ) => {
      state.filter.kolsOverview[action.payload] = !state.filter.kolsOverview[action.payload];
    },
    setAccount: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getKOLsSummary.pending, (state) => {
        state.summary.status = "PROCESSING";
      })
      .addCase(getKOLsSummary.fulfilled, (state, action) => {
        state.summary.status = "SUCCESS";
        state.summary.data = action.payload;
      })
      .addCase(getKOLsSummary.rejected, (state) => {
        state.summary.status = "FAILED";
      })
      .addCase(getKOLsRPPerformance.pending, (state) => {
        state.performanceAnalysis.status = "PROCESSING";
      })
      .addCase(getKOLsRPPerformance.fulfilled, (state, action) => {
        state.performanceAnalysis.status = "SUCCESS";
        state.performanceAnalysis.data = action.payload;
      })
      .addCase(getKOLsRPPerformance.rejected, (state) => {
        state.performanceAnalysis.status = "FAILED";
      })
      .addCase(getKOLsRPTweet.pending, (state) => {
        state.tweetAnalysis.status = "PROCESSING";
      })
      .addCase(getKOLsRPTweet.fulfilled, (state, action) => {
        state.tweetAnalysis.status = "SUCCESS";
        state.tweetAnalysis.data = action.payload;
        state.filter.kolsAnalysis = Object.fromEntries(
          Object.keys(action.payload.tweetsAnalysis).map((i) => {
            return [i, true];
          })
        );
      })
      .addCase(getKOLsRPTweet.rejected, (state) => {
        state.tweetAnalysis.status = "FAILED";
      })
      .addCase(getKOLsRPOverview.pending, (state) => {
        state.overview.status = "PROCESSING";
      })
      .addCase(getKOLsRPOverview.fulfilled, (state, action) => {
        state.overview.status = "SUCCESS";
        state.overview.data = action.payload;
      })
      .addCase(getKOLsRPOverview.rejected, (state) => {
        state.overview.status = "FAILED";
      })
      .addCase(getKOLsRPMetrics.pending, (state) => {
        state.performanceMetrics.status = "PROCESSING";
      })
      .addCase(getKOLsRPMetrics.fulfilled, (state, action) => {
        state.performanceMetrics.status = "SUCCESS";
        state.performanceMetrics.data = action.payload;
        state.filter.kolsOverview = Object.fromEntries(
          action.payload.kolList.map((i) => [i, true])
        );
      })
      .addCase(getKOLsRPMetrics.rejected, (state) => {
        state.performanceMetrics.status = "FAILED";
      });
  },
});

export default kolsReport.reducer;
export const {
  setFilter,
  setKOLsAnalysisFilter,
  setKOLsOverviewFilter,
  toggleKOLsAnalysisFilter,
  toggleKOLsOverviewFilter,
  setAccount,
} = kolsReport.actions;
