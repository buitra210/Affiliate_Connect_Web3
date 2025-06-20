import {
  fetchEcosystems,
  fetchHomeLendingRanking,
  fetchHomeProject,
  fetchHomeTokenRanking,
  fetchTrendingTokens,
} from "@centic-scoring/api/services";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getHomeProject = createAsyncThunk(
  "home/project",
  async ({
    category,
    page,
    pageSize,
    orderBy,
    order,
  }: {
    category?: string;
    page?: number;
    pageSize?: number;
    orderBy?: string;
    order?: "asc" | "desc";
  }) => {
    const response = await fetchHomeProject({ page, pageSize, orderBy, order, category });
    return response;
  }
);

export const getHomeTokenRanking = createAsyncThunk("home-token-ranking", async () => {
  const response = await fetchHomeTokenRanking();
  return response;
});

export const getMostGrowthDefi = createAsyncThunk(
  "most-growth-defi",
  async ({
    page,
    pageSize,
    orderBy,
    order,
    category,
  }: {
    page?: number;
    pageSize?: number;
    orderBy?: string;
    order?: "asc" | "desc";
    category?: string;
  }) => {
    return await fetchEcosystems({
      type: "defi",
      page,
      pageSize,
      orderBy,
      order,
      category,
    });
  }
);

export const getHomeLendingRanking = createAsyncThunk("home-leding-ranking", async () => {
  const response = await fetchHomeLendingRanking();
  return response;
});

export const getTrendingTokens = createAsyncThunk("home-trending-tokens", async () => {
  const response = await fetchTrendingTokens();
  return response;
});

export const getMostGrownDexs = createAsyncThunk(
  "home/project-dexes",
  async ({
    page,
    pageSize,
    orderBy,
    order,
    category,
  }: {
    page?: number;
    pageSize?: number;
    orderBy?: string;
    order?: "asc" | "desc";
    category?: string;
  }) => {
    const response = await fetchEcosystems({
      page,
      pageSize,
      orderBy,
      order,
      type: "exchanges",
      category,
    });
    return response;
  }
);

export const getMostGrownLendingPools = createAsyncThunk(
  "home/project-lending",
  async ({
    page,
    pageSize,
    orderBy,
    order,
    category,
  }: {
    page?: number;
    pageSize?: number;
    orderBy?: string;
    order?: "asc" | "desc";
    category?: string;
  }) => {
    const response = await fetchEcosystems({
      page,
      pageSize,
      orderBy,
      order,
      type: "defi",
      category,
    });
    return response;
  }
);
