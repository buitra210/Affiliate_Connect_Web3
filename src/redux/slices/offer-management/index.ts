import {
  RTKOLsBaseInfo,
  RTKOLsOfferHistory,
  RTKOLsOfferList,
  RTKOLsOfferManagement,
} from "@centic-scoring/api/services/affiliate/affiliate";
import { DataWithStatus } from "../global";
import {
  getKolOfferManagement,
  getKolOfferDetail,
  getKolOfferHistory,
  getKolOfferList,
  getAmbassadorBaseOffer,
} from "./fetchFunctions";
import { createSlice } from "@reduxjs/toolkit";
import { RTAmbassadorBaseOffer } from "@centic-scoring/api/services/ambassador/affiliate";

export type TOfferManagement = {
  kols: {
    offers: DataWithStatus<RTKOLsOfferManagement>;
    detail: DataWithStatus<RTKOLsBaseInfo>;
    history: DataWithStatus<RTKOLsOfferHistory>;
    listOffers: DataWithStatus<RTKOLsOfferList>;
  };
  ambassadors: {
    offers: DataWithStatus<RTAmbassadorBaseOffer>;
  };
};

const initData: TOfferManagement = {
  kols: {
    offers: {
      status: "IDLE",
      data: {} as RTKOLsOfferManagement,
    },
    detail: {
      status: "IDLE",
      data: {} as RTKOLsBaseInfo,
    },
    history: {
      status: "IDLE",
      data: {} as RTKOLsOfferHistory,
    },
    listOffers: {
      status: "IDLE",
      data: {} as RTKOLsOfferList,
    },
  },
  ambassadors: {
    offers: {
      status: "IDLE",
      data: {} as RTAmbassadorBaseOffer,
    },
  },
};

export const offerManagementSlice = createSlice({
  name: "offer-management",
  initialState: initData,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getKolOfferManagement.pending, (state) => {
        state.kols.offers.status = "PROCESSING";
      })
      .addCase(getKolOfferManagement.fulfilled, (state, action) => {
        state.kols.offers.status = "SUCCESS";
        state.kols.offers.data = action.payload;
      })
      .addCase(getKolOfferManagement.rejected, (state) => {
        state.kols.offers.status = "FAILED";
      })
      .addCase(getKolOfferDetail.pending, (state) => {
        state.kols.detail.status = "PROCESSING";
      })
      .addCase(getKolOfferDetail.fulfilled, (state, action) => {
        state.kols.detail.status = "SUCCESS";
        state.kols.detail.data = action.payload;
      })
      .addCase(getKolOfferDetail.rejected, (state) => {
        state.kols.detail.status = "FAILED";
      })
      .addCase(getKolOfferHistory.pending, (state) => {
        state.kols.history.status = "PROCESSING";
      })
      .addCase(getKolOfferHistory.fulfilled, (state, action) => {
        state.kols.history.status = "SUCCESS";
        state.kols.history.data = action.payload;
      })
      .addCase(getKolOfferHistory.rejected, (state) => {
        state.kols.history.status = "FAILED";
      })
      .addCase(getKolOfferList.pending, (state) => {
        state.kols.listOffers.status = "PROCESSING";
      })
      .addCase(getKolOfferList.fulfilled, (state, action) => {
        state.kols.listOffers.status = "SUCCESS";
        state.kols.listOffers.data = action.payload;
      })
      .addCase(getKolOfferList.rejected, (state) => {
        state.kols.listOffers.status = "FAILED";
      })
      .addCase(getAmbassadorBaseOffer.pending, (state) => {
        state.ambassadors.offers.status = "PROCESSING";
      })
      .addCase(getAmbassadorBaseOffer.fulfilled, (state, action) => {
        state.ambassadors.offers.status = "SUCCESS";
        state.ambassadors.offers.data = action.payload;
      })
      .addCase(getAmbassadorBaseOffer.rejected, (state) => {
        state.ambassadors.offers.status = "FAILED";
      });
  },
});
export default offerManagementSlice.reducer;
