import { fetchAmbassadorUserOffer } from "@centic-scoring/api/services/ambassador/affiliate";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAmbassadorUserOffer = createAsyncThunk(
  "get-ambass-user-offer",
  async ({ page, pageSize, keyword }: { keyword?: string; pageSize: number; page: number }) => {
    return await fetchAmbassadorUserOffer({
      page,
      pageSize,
      keyword,
    });
  }
);
