import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DataWithStatus } from "../global";
import { RTEvents, RTUserProject } from "@centic-scoring/api/services/for-project";
import {
  RTAffiliateAnalytics,
  RTAffiliateAnalyticsDonut,
} from "@centic-scoring/api/services/affiliate/affiliate";
import {
  getForProjectEvents,
  getUserProject,
  getAffiliateAnalytics,
  getAffiliateAnalyticsDonut,
} from "./fetchFunctions";
import { RTCampaignActionList } from "@centic-scoring/api/services/web3-growth/campaign";

export type TCommonData = {
  project: DataWithStatus<RTUserProject>;
  projectCreated?: boolean;
  events: {
    eventsData: DataWithStatus<RTEvents>;
    currentTimeWindow: {
      start: number;
      end: number;
    };
    fetchedTimeWindow: {
      start?: number;
      end?: number;
    };
  };
  analytics: {
    overview: DataWithStatus<RTAffiliateAnalytics>;
    donutDetail: DataWithStatus<RTAffiliateAnalyticsDonut>;
  };
};

var date = new Date();
var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

const initState: TCommonData = {
  project: { status: "IDLE", data: {} as RTUserProject },
  projectCreated: false,
  events: {
    eventsData: { status: "IDLE", data: {} as RTEvents, cacheTime: 30 * 60 * 1000, lastFetched: 0 },
    currentTimeWindow: {
      start: firstDay.getTime(),
      end: lastDay.getTime(),
    },
    fetchedTimeWindow: {},
  },
  analytics: {
    overview: {
      status: "IDLE",
      data: {} as RTAffiliateAnalytics,
      cacheTime: 5 * 60 * 1000,
      lastFetched: 0,
    },
    donutDetail: {
      status: "IDLE",
      data: {} as RTAffiliateAnalyticsDonut,
      cacheTime: 5 * 60 * 1000,
      lastFetched: 0,
    },
  },
};

export const forProjectCommon = createSlice({
  name: "common",
  initialState: initState,
  reducers: {
    resetForProjectState: (state) => {
      state.project = initState.project;
      state.projectCreated = initState.projectCreated;
    },
    setProjectCreatedState: (state, action: PayloadAction<boolean>) => {
      state.projectCreated = action.payload;
    },
    // For 1 user = 1 project: Always consider user has a virtual project
    setVirtualProject: (state, action: PayloadAction<{ userName: string }>) => {
      state.project.status = "SUCCESS";
      state.project.data = { id: action.payload.userName } as RTUserProject;
      state.projectCreated = true;
    },
    setEventsFetchTimeWindow: (
      state,
      action: PayloadAction<Partial<TCommonData["events"]["currentTimeWindow"]>>
    ) => {
      state.events.currentTimeWindow = { ...state.events.currentTimeWindow, ...action.payload };
    },
    setEventsFetchedTimeWindow: (
      state,
      action: PayloadAction<Partial<TCommonData["events"]["fetchedTimeWindow"]>>
    ) => {
      state.events.fetchedTimeWindow = { ...state.events.fetchedTimeWindow, ...action.payload };
    },
    resetAnalyticsState: (state) => {
      state.analytics.overview = initState.analytics.overview;
      state.analytics.donutDetail = initState.analytics.donutDetail;
    },
    resetDonutDetailState: (state) => {
      state.analytics.donutDetail = initState.analytics.donutDetail;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUserProject.pending, (state) => {
        state.project.status = "PROCESSING";
      })
      .addCase(getUserProject.fulfilled, (state, action) => {
        state.project.status = "SUCCESS";
        state.project.data = action.payload;
        state.projectCreated = Boolean(Object.keys(action.payload || {}).length);
      })
      .addCase(getUserProject.rejected, (state) => {
        state.project.status = "FAILED";
        state.projectCreated = false;
      })
      .addCase(getForProjectEvents.pending, (state) => {
        state.events.eventsData.status = "PROCESSING";
      })
      .addCase(getForProjectEvents.fulfilled, (state, action) => {
        state.events.eventsData.status = "SUCCESS";
        if (state.events.eventsData.data) {
          let curent = [
            ...(state.events.eventsData.data?.actions || []),
            ...action.payload.actions,
          ].reduce((currentArr: RTCampaignActionList, currentItem) => {
            if (!currentArr.find((i) => i.id === currentItem.id)) {
              return currentArr.concat(currentItem);
            } else {
              return currentArr;
            }
          }, [] as RTCampaignActionList);
          state.events.eventsData.data.actions = curent;
          state.events.fetchedTimeWindow.start = Math.min(
            state.events.fetchedTimeWindow.start || 1000000000000000,
            (action.meta.arg.startTime - 1) * 1000
          );
          state.events.fetchedTimeWindow.end = Math.max(
            state.events.fetchedTimeWindow.end || 0,
            (action.meta.arg.endTime || Math.floor(Date.now() / 1000)) * 1000
          );
        }

        // state.events.eventsData.data = action.payload;
        state.events.eventsData.lastFetched = Date.now();
      })
      .addCase(getForProjectEvents.rejected, (state) => {
        state.events.eventsData.status = "FAILED";
      })
      // Analytics overview handlers
      .addCase(getAffiliateAnalytics.pending, (state) => {
        state.analytics.overview.status = "PROCESSING";
      })
      .addCase(getAffiliateAnalytics.fulfilled, (state, action) => {
        state.analytics.overview.status = "SUCCESS";
        state.analytics.overview.data = action.payload;
        state.analytics.overview.lastFetched = Date.now();
      })
      .addCase(getAffiliateAnalytics.rejected, (state) => {
        state.analytics.overview.status = "FAILED";
      })
      // Analytics donut detail handlers
      .addCase(getAffiliateAnalyticsDonut.pending, (state) => {
        state.analytics.donutDetail.status = "PROCESSING";
      })
      .addCase(getAffiliateAnalyticsDonut.fulfilled, (state, action) => {
        state.analytics.donutDetail.status = "SUCCESS";
        state.analytics.donutDetail.data = action.payload;
        state.analytics.donutDetail.lastFetched = Date.now();
      })
      .addCase(getAffiliateAnalyticsDonut.rejected, (state) => {
        state.analytics.donutDetail.status = "FAILED";
      });
  },
});

export default forProjectCommon.reducer;

export const {
  resetForProjectState,
  setProjectCreatedState,
  setVirtualProject,
  setEventsFetchTimeWindow,
  setEventsFetchedTimeWindow,
  resetAnalyticsState,
  resetDonutDetailState,
} = forProjectCommon.actions;

// Export async thunk functions
export { getAffiliateAnalytics, getAffiliateAnalyticsDonut } from "./fetchFunctions";
