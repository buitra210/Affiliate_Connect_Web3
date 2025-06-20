import {
  RTKOLsOfferHistory,
  RTOfferNotification,
  RTRequestUpgradeOffer,
  RTKOLsUserOfferDetail,
  RTAffiliateLinkInfo,
} from "@centic-scoring/api/services/affiliate/affiliate";
import { DataWithStatus } from "../global";
import { createSlice } from "@reduxjs/toolkit";
import {
  getKOLAffiliateLinkInfo,
  getKOLOtherVersion,
  getKOLUserNotifications,
  getKOLUserOfferNotification,
  getKOLUserOfferRequestUpgrade,
  getKolUsersOfferDetail,
  getKolUsersOfferHistory,
} from "./fetchFuntions";

export type TKolUsers = {
  offers: {
    detail: DataWithStatus<RTKOLsUserOfferDetail>;
    history: DataWithStatus<RTKOLsOfferHistory>;
    notification: DataWithStatus<RTOfferNotification>;
    requestUpgrade: DataWithStatus<RTRequestUpgradeOffer>;
  };
  notifications: DataWithStatus<RTOfferNotification>;
  activeHistoryId: string;
  affiliateLinkInfo: DataWithStatus<RTAffiliateLinkInfo>;
};

const initData: TKolUsers = {
  offers: {
    detail: {
      status: "IDLE",
      data: {} as RTKOLsUserOfferDetail,
    },
    history: {
      status: "IDLE",
      data: {} as RTKOLsOfferHistory,
    },
    notification: {
      status: "IDLE",
      data: {} as RTOfferNotification,
    },
    requestUpgrade: {
      status: "IDLE",
      data: {} as RTRequestUpgradeOffer,
    },
  },
  notifications: {
    status: "IDLE",
    data: {} as RTOfferNotification,
  },
  activeHistoryId: "",
  affiliateLinkInfo: {
    status: "IDLE",
    data: {} as RTAffiliateLinkInfo,
  },
};

export const kolUserSlice = createSlice({
  name: "kol-user",
  initialState: initData,
  reducers: {
    setActiveHistoryId: (state, action) => {
      state.activeHistoryId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getKolUsersOfferDetail.pending, (state) => {
        state.offers.detail.status = "PROCESSING";
      })
      .addCase(getKolUsersOfferDetail.fulfilled, (state, action) => {
        state.offers.detail.status = "SUCCESS";
        state.offers.detail.data = action.payload;
      })
      .addCase(getKolUsersOfferDetail.rejected, (state) => {
        state.offers.detail.status = "FAILED";
      })
      .addCase(getKOLOtherVersion.pending, (state) => {
        state.offers.detail.status = "PROCESSING";
      })
      .addCase(getKOLOtherVersion.fulfilled, (state, action) => {
        state.offers.detail.status = "SUCCESS";
        state.offers.detail.data = action.payload;
      })
      .addCase(getKOLOtherVersion.rejected, (state) => {
        state.offers.detail.status = "FAILED";
      })
      .addCase(getKolUsersOfferHistory.pending, (state) => {
        state.offers.history.status = "PROCESSING";
      })
      .addCase(getKolUsersOfferHistory.fulfilled, (state, action) => {
        state.offers.history.status = "SUCCESS";
        state.offers.history.data = action.payload;
      })
      .addCase(getKolUsersOfferHistory.rejected, (state) => {
        state.offers.history.status = "FAILED";
      })
      .addCase(getKOLUserOfferNotification.pending, (state) => {
        state.offers.notification.status = "PROCESSING";
      })
      .addCase(getKOLUserOfferNotification.fulfilled, (state, action) => {
        state.offers.notification.status = "SUCCESS";
        state.offers.notification.data = action.payload;
      })
      .addCase(getKOLUserOfferNotification.rejected, (state) => {
        state.offers.notification.status = "FAILED";
      })
      .addCase(getKOLUserOfferRequestUpgrade.pending, (state) => {
        state.offers.requestUpgrade.status = "PROCESSING";
      })
      .addCase(getKOLUserOfferRequestUpgrade.fulfilled, (state, action) => {
        state.offers.requestUpgrade.status = "SUCCESS";
        state.offers.requestUpgrade.data = action.payload;
      })
      .addCase(getKOLUserOfferRequestUpgrade.rejected, (state) => {
        state.offers.requestUpgrade.status = "FAILED";
      })
      .addCase(getKOLUserNotifications.pending, (state) => {
        state.notifications.status = "PROCESSING";
      })
      .addCase(getKOLUserNotifications.fulfilled, (state, action) => {
        state.notifications.status = "SUCCESS";
        state.notifications.data = action.payload;
      })
      .addCase(getKOLUserNotifications.rejected, (state) => {
        state.notifications.status = "FAILED";
      })
      .addCase(getKOLAffiliateLinkInfo.pending, (state) => {
        state.affiliateLinkInfo.status = "PROCESSING";
      })
      .addCase(getKOLAffiliateLinkInfo.fulfilled, (state, action) => {
        state.affiliateLinkInfo.status = "SUCCESS";
        state.affiliateLinkInfo.data = action.payload;
      })
      .addCase(getKOLAffiliateLinkInfo.rejected, (state) => {
        state.affiliateLinkInfo.status = "FAILED";
      });
  },
});

export default kolUserSlice.reducer;

export const { setActiveHistoryId } = kolUserSlice.actions;
