import { RTAmbassadorUserOffer } from "@centic-scoring/api/services/ambassador/affiliate";
import { DataWithStatus } from "../global";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAmbassadorUserOffer } from "./fetchFunctions";

export type TAffiliateAmbassdor = {
  offerTable: DataWithStatus<RTAmbassadorUserOffer>;
  params: {
    page: number;
    pageSize: number;
    keyword: string;
  };
};

const initState: TAffiliateAmbassdor = {
  offerTable: { status: "IDLE", data: {} as RTAmbassadorUserOffer },
  params: {
    page: 0,
    pageSize: 25,
    keyword: "",
  },
};

const affiliateAmbassadorSlice = createSlice({
  name: "affiliate abmassador",
  initialState: initState,
  reducers: {
    editParam: (state, action: PayloadAction<Partial<TAffiliateAmbassdor["params"]>>) => {
      state.params = {
        ...state.params,
        ...action.payload,
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAmbassadorUserOffer.pending, (state) => {
        state.offerTable.status = "PROCESSING";
      })
      .addCase(getAmbassadorUserOffer.fulfilled, (state, action) => {
        state.offerTable.status = "SUCCESS";
        state.offerTable.data = action.payload;
      })
      .addCase(getAmbassadorUserOffer.rejected, (state) => {
        state.offerTable.status = "FAILED";
      });
  },
});

export default affiliateAmbassadorSlice.reducer;
export const { editParam } = affiliateAmbassadorSlice.actions;
