import { fetchAffiliateUseInfo } from "@centic-scoring/api/services/affiliate/affiliate";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAffiliateUser = createAsyncThunk("get-affiliate-user", async () => {
  return await fetchAffiliateUseInfo();
});
