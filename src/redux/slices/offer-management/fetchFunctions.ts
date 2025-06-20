import { AmbassadorConnectAPI } from "@centic-scoring/api/services/ambassador/affiliate";
import {
  fetchKolOfferDetail,
  fetchKolOfferHistory,
  fetchKOLsOfferList,
  fetchOfferManagement,
} from "@centic-scoring/api/services/affiliate/affiliate";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getKolOfferManagement = createAsyncThunk(
  "offer-management",
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
    return await fetchOfferManagement({ id, page, pageSize, keyword });
  }
);

export const getKolOfferDetail = createAsyncThunk(
  "offer-detail",
  async ({ id, offerId }: { id: string; offerId: string }) => {
    return await fetchKolOfferDetail({ id, offerId });
  }
);

export const getKolOfferHistory = createAsyncThunk(
  "offer-history",
  async ({ id, offerId }: { id: string; offerId: string }) => {
    return await fetchKolOfferHistory({ id, offerId });
  }
);

export const getKolOfferList = createAsyncThunk(
  "offer-list",
  async ({ keyword, pageSize, page }: { keyword: string; pageSize: number; page: number }) => {
    return await fetchKOLsOfferList({ keyword, pageSize, page });
  }
);

export const getAmbassadorBaseOffer = createAsyncThunk(
  "ambassador-base-offer",
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
    return await AmbassadorConnectAPI.getBaseOffers({ id, page, pageSize, keyword });
  }
);
