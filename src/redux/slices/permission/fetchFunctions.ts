import { fetchUserPermission } from "@centic-scoring/api/services";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUserPermission = createAsyncThunk("fetch", async (id: string) => {
  return await fetchUserPermission(id);
});
