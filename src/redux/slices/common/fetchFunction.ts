import { fetchProjectConfig } from "@centic-scoring/api/services";
import { fetchDapps, fetchProjectSummary } from "@centic-scoring/api/services/user-explore";
import {
  fetchPRojectTokens,
  fetchProjectChain,
  fetchProjectDapps,
} from "@centic-scoring/api/services/web3-growth/engagement";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getProjectDapps = createAsyncThunk("common/dapp", async (id: string) => {
  const response = await fetchProjectDapps(id);
  return response;
});

export const getProjectContract = createAsyncThunk("common/contract", async (id: string) => {
  return await fetchDapps(id);
});

export const getProjectTokens = createAsyncThunk("common/tokens", async (id: string) => {
  const response = await fetchPRojectTokens(id);
  return response;
});

export const getProjectChains = createAsyncThunk("common/chains", async (id: string) => {
  const response = await fetchProjectChain(id);
  return response;
});

export const getProjectSummary = createAsyncThunk("common/summary", async (id: string) => {
  return await fetchProjectSummary(id);
});

export const getProjectConfig = createAsyncThunk("common/configuration", async (id: string) => {
  return await fetchProjectConfig(id);
});
