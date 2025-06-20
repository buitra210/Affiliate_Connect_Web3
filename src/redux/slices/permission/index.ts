import { createSlice } from "@reduxjs/toolkit";
import { getUserPermission } from "./fetchFunctions";
import { DataWithStatus } from "../global";
import { updateUserPermission } from "./helper";

export type UserRole = "view" | "list" | "create" | "update" | "delete";

export type UserPermission = DataWithStatus<{
  role: { [key: string]: boolean };
  loyaltyPoint: { [key: string]: boolean };
  campaign: {
    role: { [key: string]: boolean };
    action: { [key: string]: boolean };
  };
  engagement: { [key: string]: boolean };
  setting: { [key: string]: boolean };
}>;

const initialState: UserPermission = {
  data: {
    role: {},
    loyaltyPoint: {},
    campaign: {
      role: {},
      action: {},
    },
    engagement: {},
    setting: {},
  },
  status: "IDLE",
};

export const permissionSlice = createSlice({
  name: "user-permission",
  initialState: initialState,
  reducers: {
    updateUSerState: (state, action: { type: string; payload: Partial<UserPermission> }) => {
      state = { ...state, ...action.payload };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUserPermission.pending, (state) => {
        state.status = "PROCESSING";
      })
      .addCase(getUserPermission.fulfilled, (state, action) => {
        state.status = "SUCCESS";
        state.data = updateUserPermission(action.payload)!["projects"];
      })
      .addCase(getUserPermission.rejected, (state) => {
        state.status = "FAILED";
      });
  },
});

export default permissionSlice.reducer;
export const { updateUSerState } = permissionSlice.actions;
