import { createAsyncThunk } from "@reduxjs/toolkit";
import { TKOLsSlice } from ".";
import {
  fetchDiscussedTopics,
  fetchKolCollaboration,
  fetchKolEngagementAnalysis,
  fetchKolHashTag,
  fetchKolInfo,
  fetchKOLsAudience,
  fetchKOLsOfferInfo,
  fetchKOLsSortBy,
  fetchKOLsTopTweets,
  fetchKOLsTweetFrequency,
  fetchKOLsTweetTime,
  getKOLsPruposes,
  getKOLsTopic,
  recommendationKolList,
  searchKolLists,
  searchKolWatchLists,
  TypeFilter,
} from "@centic-scoring/api/services/affiliate";
import { sleep } from "@centic-scoring/hooks/useScoreDistribution";
import {
  fetchKOLRecommendation,
  KOLRecommendationRequest,
} from "@centic-scoring/api/services/recommendation-api";

export const getKOLsList = createAsyncThunk(
  "get-kols",
  async ({ id, input }: { id: string; input?: TKOLsSlice["kolsFilter"] }) => {
    const response = await searchKolLists(id, input || {});
    return response;
  }
);
export const getKOLsWatchList = createAsyncThunk(
  "get-kols-watch-list",
  async ({ id, input }: { id: string; input?: TKOLsSlice["kolsFilter"] }) => {
    const response = await searchKolWatchLists(id, input || {});
    return response;
  }
);

export const getKOLRecommendationList = createAsyncThunk(
  "get-kols-recommendation",
  async ({ id, input }: { id: string; input?: TKOLsSlice["kolsFilter"] }) => {
    const response = await recommendationKolList(id, input || {});
    return response;
  }
);

export const getKolInfo = createAsyncThunk(
  "get-kol-info",
  async ({ id, userName }: { id: string; userName: string }) => {
    const response = await fetchKolInfo(id, userName);
    return response;
  }
);

export const getKolCollaboration = createAsyncThunk(
  "get-kol-collaboration",
  async ({
    id,
    userName,
    typeFilter,
  }: {
    id: string;
    userName: string;
    typeFilter?: TypeFilter;
  }) => {
    const response = await fetchKolCollaboration(id, userName, typeFilter);
    return response;
  }
);

export const getKOLEngagementAnalysis = createAsyncThunk(
  "get-kol-engagement-analysis",
  async ({ id, userName, type_filter }: { id: string; userName: string; type_filter: string }) => {
    const response = await fetchKolEngagementAnalysis(id, userName, type_filter);
    return response;
  }
);
export const getKolHashtag = createAsyncThunk(
  "get-kol-hashtag",
  async ({
    id,
    userName,
    typeFilter,
  }: {
    id: string;
    userName: string;
    typeFilter?: TypeFilter;
  }) => {
    const response = await fetchKolHashTag(id, userName, typeFilter);
    return response;
  }
);
export const getKOLsAudience = createAsyncThunk(
  "get-kols-audience",
  async ({
    id,
    userName,
    endTime,
    startTime,
  }: {
    id: string;
    userName: string;
    startTime?: number;
    endTime?: number;
  }) => {
    return await fetchKOLsAudience({
      id,
      userName,
      endTime,
      startTime,
    });
  }
);

export const getKOLsTweetFrequency = createAsyncThunk(
  "tweet-frequency",
  async ({
    filterType,
    id,
    userName,
  }: {
    id: string;
    userName: string;
    filterType: "Daily" | "Weekly" | "Monthly";
  }) => {
    return await fetchKOLsTweetFrequency({
      filterType,
      id,
      userName,
    });
  }
);

export const getKOLsTweetTime = createAsyncThunk(
  "tweet-time",
  async ({ id, userName }: { id: string; userName: string }) => {
    return await fetchKOLsTweetTime({ id, userName });
  }
);

export const getKOLsTopTweet = createAsyncThunk(
  "top-tweet",
  async ({
    id,
    userName,
    typeFilter,
    pageSize,
    page,
  }: {
    id: string;
    userName: string;
    typeFilter?: TypeFilter;
    pageSize?: number;
    page?: number;
  }) => {
    await sleep(500);
    return await fetchKOLsTopTweets(id, userName, typeFilter, pageSize, page);
  }
);

export const getKOLsDiscussedTopics = createAsyncThunk(
  "discussed-topics",
  async ({ id, userName }: { id: string; userName: string }) => {
    return await fetchDiscussedTopics(id, userName);
  }
);

export const getKOLsTopics = createAsyncThunk(
  "get-topic",
  async ({ id, type }: { id: string; type?: "All" | "Favorite" }) => {
    return await getKOLsTopic({ id, type });
  }
);

export const getKOLsPurposes = createAsyncThunk(
  "get-purpose",
  async ({ id, type }: { id: string; type?: "All" | "Favorite" }) => {
    return await getKOLsPruposes({ id, type: type || "All" });
  }
);

export const getKOLsOfferInfo = createAsyncThunk(
  "get-offer-info",
  async ({
    id,
    page,
    pageSize,
    keyword,
  }: {
    id: string;
    page: number;
    pageSize: number;
    keyword: string;
  }) => {
    return await fetchKOLsOfferInfo({ keyword, pageSize, page, id });
  }
);

export const getKOLsSortBy = createAsyncThunk(
  "get-sort-by",
  async ({
    id,
    page,
    pageSize,
    sortType,
  }: {
    id: string;
    page?: number;
    pageSize?: number;
    sortType?: string;
  }) => {
    return await fetchKOLsSortBy({ id, page, pageSize, sortType });
  }
);

export const getKOLRecommendation = createAsyncThunk(
  "get-kol-recommendation",
  async (input: KOLRecommendationRequest) => {
    const response = await fetchKOLRecommendation(input);
    return response;
  }
);
