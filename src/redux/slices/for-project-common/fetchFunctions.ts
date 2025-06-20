import { fetchProjectEvents, fetchUserProject } from "@centic-scoring/api/services/for-project";
import { RootState } from "@centic-scoring/redux/store";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUserProject = createAsyncThunk("get-project", async () => {
  return await fetchUserProject();
});

export const getForProjectEvents = createAsyncThunk(
  "get-events",
  async ({ endTime, id, startTime }: { id: string; startTime: number; endTime?: number }) => {
    return await fetchProjectEvents({ endTime, id, startTime });
  }
);

export const refreshProjectEvents = createAsyncThunk(
  "refresh-event",
  async (id: string, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const { end, start } = state.forProjectCommon.events.fetchedTimeWindow;
    if (start && end) {
      thunkApi.dispatch(
        getForProjectEvents({
          id,
          startTime: Math.floor(start / 1000),
          endTime: Math.floor(end / 1000),
        })
      );
    }
  }
);
