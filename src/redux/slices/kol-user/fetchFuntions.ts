import {
  fetchKolUserOfferDetail,
  fetchKolUserHistory,
  fetchKOLNotification,
  fetchRequestUpgrade,
  fetchKOLNotifications,
  fetchKOLOtherVersion,
  AffiliateKOLAPI,
} from "@centic-scoring/api/services/affiliate/affiliate";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getKolUsersOfferDetail = createAsyncThunk(
  "kol-users/offer-detail",
  async ({ offerId }: { offerId: string }) => {
    return await fetchKolUserOfferDetail({ offerId });
  }
);

export const getKOLOtherVersion = createAsyncThunk(
  "kol-users/offer-other-version",
  async ({ offerId, type, historyId }: { offerId: string; type: string; historyId?: string }) => {
    return await fetchKOLOtherVersion(offerId, type, historyId);
  }
);

export const getKolUsersOfferHistory = createAsyncThunk(
  "kol-users/offer-history",
  async ({ offerId }: { offerId: string }) => {
    return await fetchKolUserHistory({ offerId });
  }
);

export const getKOLUserOfferNotification = createAsyncThunk(
  "kol-users/offer-notification",
  async ({ offerId }: { offerId: string }) => {
    return await fetchKOLNotification(offerId);
  }
);

export const getKOLUserOfferRequestUpgrade = createAsyncThunk(
  "kol-users/offer-request-upgrade",
  async ({ offerId, requestId }: { offerId: string; requestId: string }) => {
    return await fetchRequestUpgrade(offerId, requestId);
  }
);

export const getKOLUserNotifications = createAsyncThunk("kol-users/notifications", async () => {
  return await fetchKOLNotifications();
});

export const getKOLAffiliateLinkInfo = createAsyncThunk(
  "kol-users/affiliate-link-info",
  async ({ offerId }: { offerId: string }) => {
    return await AffiliateKOLAPI.fetchAffiliateLinkInfo(offerId);
  }
);
