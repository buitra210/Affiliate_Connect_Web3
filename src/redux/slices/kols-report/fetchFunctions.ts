import {
  fetchKOLsOverview,
  fetchKOLsReportSummary,
  fetchKOLsRPMetrics,
  fetchKOLsRPPerformance,
  fetchKOLsRPTweet,
} from "@centic-scoring/api/services/affiliate";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getKOLsSummary = createAsyncThunk(
  "summary",
  async ({ id, name }: { id: string; name: string }) => {
    return await fetchKOLsReportSummary({ id, name });
  }
);

export const getKOLsRPPerformance = createAsyncThunk(
  "performance",
  async ({
    endTime,
    id,
    name,
    startTime,
  }: {
    id: string;
    name: string;
    startTime?: number;
    endTime?: number;
  }) => {
    return await fetchKOLsRPPerformance({ endTime, id, name, startTime });
  }
);

export const getKOLsRPTweet = createAsyncThunk(
  "tweet",
  async ({
    endTime,
    id,
    name,
    startTime,
  }: {
    id: string;
    name: string;
    startTime?: number;
    endTime?: number;
  }) => {
    return await fetchKOLsRPTweet({ endTime, id, name, startTime });
  }
);

export const getKOLsRPOverview = createAsyncThunk(
  "overview",
  async ({
    endTime,
    id,
    name,
    startTime,
  }: {
    id: string;
    name: string;
    startTime?: number;
    endTime?: number;
  }) => {
    return await fetchKOLsOverview({ endTime, id, name, startTime });
  }
);

export const getKOLsRPMetrics = createAsyncThunk(
  "metric",
  async ({
    endTime,
    id,
    name,
    startTime,
  }: {
    id: string;
    name: string;
    startTime?: number;
    endTime?: number;
  }) => {
    return await fetchKOLsRPMetrics({ endTime, id, name, startTime });
  }
);
