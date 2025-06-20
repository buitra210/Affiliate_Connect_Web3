import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DataWithStatus } from "../global";
import { ApiRecommendation } from "@centic-scoring/api/services/recommendation-api/types";
import { fetchRecommendation } from "@centic-scoring/api/services/recommendation-api";

export type RecommendationSlice = {
  tokens: DataWithStatus<ApiRecommendation["tokens"]>;
};

export const fetchRecommendationThunk = createAsyncThunk<
  ApiRecommendation,
  {
    limit?: number;
  }
>("recommendationSlice/fetchRecommendationThunk", async ({ limit }) => {
  return await fetchRecommendation({ limit });
});

const recommendationSlice = createSlice({
  name: "recommendationSlice",
  initialState: {
    tokens: {
      status: "IDLE",
    },
  } as RecommendationSlice,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchRecommendationThunk.pending, (state) => {
        state.tokens.status = "PROCESSING";
      })
      .addCase(fetchRecommendationThunk.rejected, (state) => {
        state.tokens.status = "FAILED";
      })
      .addCase(fetchRecommendationThunk.fulfilled, (state, action) => {
        state.tokens.status = "SUCCESS";
        state.tokens.data = action.payload.tokens;
      });
  },
});

export default recommendationSlice.reducer;
