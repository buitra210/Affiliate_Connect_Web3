import {
  fetchKolOfferHistory,
  fetchProjectAffiliate,
  KOLConnectAPI,
} from "@centic-scoring/api/services/affiliate/affiliate";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { TKOLOffer } from ".";

export const getPayOptions = createAsyncThunk("pay-options", async () => {
  return await KOLConnectAPI.listToken();
});

export const getProjectContact = createAsyncThunk("contact", async (id: string) => {
  return await KOLConnectAPI.contact(id);
});

export const getOfferDetail = createAsyncThunk(
  "offer-detail",
  async ({ id, offerID }: { id: string; offerID: string }) => {
    const detailData = await KOLConnectAPI.getOfferInfo(id, offerID);
    const result: TKOLOffer["offerForm"] = {
      name: detailData.title,
      description: {
        text: detailData.introduction.description,
        title: detailData.introduction.featureTitle,
        logo: detailData.introduction.logo,
      },
      featuredLink: detailData.introduction.featureLink,
      customizedRequirement: {
        text: detailData.requirements.custom,
      },
      kpiExpect: Object.fromEntries(
        detailData.requirements.kpis?.map((kpi, index) => {
          return [
            index,
            {
              require: {
                value: kpi.kpi,
                type: kpi.goal,
              },
              timeRequire: {
                value: kpi.time.value,
                unit: kpi.time.type,
              },
            },
          ];
        }) || []
      ),
      payment: {
        type: detailData.payments.type,
        token: detailData.payments.payInfo.token.address,
        tokenName: detailData.payments.payInfo.token.name,
        chains: detailData.payments.payInfo.chainId,
        amount: detailData.payments.payInfo.amount,
        rule: {
          type: detailData.payments.type === "Selfpay" ? "string" : "Upfront Payment",
          stringValue: detailData.payments.custom,
        },
        bonus: Object.fromEntries(
          detailData.payments?.bonusReward?.map((reward, index) => {
            return [
              index,
              {
                goal: reward.goal,
                kpi: {
                  value: reward.kpiValue,
                  type: reward.kpiType,
                },
                reward: reward.rewardValue,
              },
            ];
          }) || []
        ),
      },
      contactInformation: detailData.contactInformation,

      // kolsInfo: {
      //   userName: detailData.kolsInfo.userName,
      //   displayName: detailData.kolsInfo.displayName,
      //   twitterUrl: detailData.kolsInfo.twitterUrl,
      //   walletAddress: detailData.kolsInfo.walletAddress,
      // },
    };
    return result;
  }
);

export const getBaseOfferDetail = createAsyncThunk(
  "base-offer-detail",
  async ({ id, offerID }: { id: string; offerID: string }) => {
    const detailData = await KOLConnectAPI.getBaseOfferInfo(id, offerID);
    const result: TKOLOffer["offerForm"] = {
      name: detailData.title,
      description: {
        text: detailData.introduction.description,
        title: detailData.introduction.featureTitle,
        logo: detailData.introduction.logo,
      },
      featuredLink: detailData.introduction.featureLink,
      customizedRequirement: {
        text: detailData.requirements.custom,
      },
      kpiExpect: Object.fromEntries(
        detailData.requirements.kpis?.map((kpi, index) => {
          return [
            index,
            {
              require: {
                value: kpi.kpi,
                type: kpi.goal,
              },
              timeRequire: {
                value: kpi.time.value,
                unit: kpi.time.type,
              },
            },
          ];
        }) || []
      ),
      payment: {
        type: detailData.payments.type,
        token: detailData.payments.payInfo.token.address,
        tokenName: detailData.payments.payInfo.token.name,
        chains: detailData.payments.payInfo.chainId,
        amount: detailData.payments.payInfo.amount,
        rule: {
          type: detailData.payments.type === "Selfpay" ? "string" : "Upfront Payment",
          stringValue: detailData.payments.custom,
        },
        bonus: Object.fromEntries(
          detailData.payments?.bonusReward?.map((reward, index) => {
            return [
              index,
              {
                goal: reward.goal,
                kpi: {
                  value: reward.kpiValue,
                  type: reward.kpiType,
                },
                reward: reward.rewardValue,
              },
            ];
          }) || []
        ),
      },
      contactInformation: detailData.contactInformation,
      // kolsInfo: {
      //   userName: detailData.kolsInfo.userName,
      //   displayName: detailData.kolsInfo.displayName,
      //   twitterUrl: detailData.kolsInfo.twitterUrl,
      //   walletAddress: detailData.kolsInfo.walletAddress,
      // },
    };
    return result;
  }
);

export const getOfferOtherVersion = createAsyncThunk(
  "offer-other-version",
  async ({
    id,
    offerID,
    type,
    historyId,
  }: {
    id: string;
    offerID: string;
    type: string;
    historyId?: string;
  }) => {
    const detailData = await KOLConnectAPI.otherVersion(id, offerID, type, historyId);
    const result: TKOLOffer["offerForm"] = {
      name: detailData.title,
      description: {
        text: detailData.introduction.description,
        title: detailData.introduction.featureTitle,
        logo: detailData.introduction.logo,
      },
      featuredLink: detailData.introduction.featureLink,
      customizedRequirement: {
        text: detailData.requirements.custom,
      },
      kpiExpect: Object.fromEntries(
        detailData.requirements.kpis?.map((kpi, index) => {
          return [
            index,
            {
              require: {
                value: kpi.kpi,
                type: kpi.goal,
              },
              timeRequire: {
                value: kpi.time.value,
                unit: kpi.time.type,
              },
            },
          ];
        }) || []
      ),
      payment: {
        type: detailData.payments.type,
        token: detailData.payments.payInfo.token.address,
        tokenName: detailData.payments.payInfo.token.name,
        chains: detailData.payments.payInfo.chainId,
        amount: detailData.payments.payInfo.amount,
        rule: {
          type: detailData.payments.type === "Selfpay" ? "string" : "Upfront Payment",
          stringValue: detailData.payments.custom,
        },
        bonus: Object.fromEntries(
          detailData.payments?.bonusReward?.map((reward, index) => {
            return [
              index,
              {
                goal: reward.goal,
                kpi: {
                  value: reward.kpiValue,
                  type: reward.kpiType,
                },
                reward: reward.rewardValue,
              },
            ];
          }) || []
        ),
      },
      contactInformation: detailData.contactInformation,
      // kolsInfo: {
      //   userName: detailData.kolsInfo.userName,
      //   displayName: detailData.kolsInfo.displayName,
      //   twitterUrl: detailData.kolsInfo.twitterUrl,
      //   walletAddress: detailData.kolsInfo.walletAddress,
      // },
    };
    return result;
  }
);

export const getOfferHistory = createAsyncThunk(
  "offer-history",
  async ({ id, offerId }: { id: string; offerId: string }) => {
    return await fetchKolOfferHistory({ id, offerId });
  }
);

export const getProjectNotification = createAsyncThunk(
  "notification",
  async ({ id, offerId }: { id: string; offerId: string }) => {
    return await KOLConnectAPI.getNotification(id, offerId);
  }
);

export const getProjectRequestNotification = createAsyncThunk(
  "request-notification",
  async ({ id, offerId, requestId }: { id: string; offerId: string; requestId: string }) => {
    return await KOLConnectAPI.getRequestNotification(id, offerId, requestId);
  }
);

export const getProjectNotifications = createAsyncThunk(
  "project-notifications",
  async ({ id }: { id: string }) => {
    return await fetchProjectAffiliate(id);
  }
);
