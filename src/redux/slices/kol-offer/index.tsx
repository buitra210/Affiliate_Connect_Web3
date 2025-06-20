import {
  RTKOLsOfferHistory,
  RTListToken,
  RTOfferNotification,
  RTRequestNotification,
  UpgradeType,
} from "@centic-scoring/api/services/affiliate/affiliate";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DataWithStatus } from "../global";
import {
  getBaseOfferDetail,
  getOfferDetail,
  getOfferHistory,
  getOfferOtherVersion,
  getPayOptions,
  getProjectContact,
  getProjectNotification,
  getProjectNotifications,
  getProjectRequestNotification,
} from "./fetchFunctions";
import { StateStatus } from "@centic-scoring/components/component";

export type TKOLOffer = {
  offerList: {};
  kolDetailStatus: StateStatus;
  upgradeType: UpgradeType;
  offerForm: {
    name: string;
    featuredLink: string;
    description: {
      title: string;
      text: string;
      logo?: string;
      logoFile?: FileList;
    };
    customizedRequirement: {
      text: string;
    };
    kpiExpect: {
      [id: string]: {
        require: {
          value: number;
          type: string;
        };
        timeRequire: {
          value: number;
          unit: string;
        };
      };
    };
    payment: {
      type: "Auto" | "Selfpay";
      token: string;
      tokenName: string;
      chains: string;
      amount: number;
      rule: {
        type: "Upfront Payment" | "Post Payment" | "string";
        upfrontPay?: number;
        postPay?: number;
        stringValue?: string;
      };
      bonus: {
        [id: string]: {
          goal: string;
          kpi: {
            value: number;
            type: string;
          };
          reward: number;
        };
      };
    };
    contactInformation: string;
    // kolsInfo: {
    //   userName: string;
    //   displayName: string;
    //   twitterUrl: string;
    //   walletAddress: string;
    // };
  };
  options: {
    payTokens: DataWithStatus<RTListToken["tokenInfo"]["data"]>;
    payChains: DataWithStatus<RTListToken["chainInfo"]["data"]>;
  };
  contact: DataWithStatus<string>;
  history: DataWithStatus<RTKOLsOfferHistory>;
  notification: DataWithStatus<RTOfferNotification>;
  requestNotification: DataWithStatus<RTRequestNotification>;
  projectNotifications: DataWithStatus<RTOfferNotification>;
  newOfferId: string;
  letterContent: string;
};

const initState: TKOLOffer = {
  offerForm: {
    customizedRequirement: {
      text: "",
    },
    kpiExpect: {},
    payment: {
      type: "Selfpay",
      token: "",
      tokenName: "",
      chains: "",
      amount: 0,
      rule: {
        type: "Post Payment",
      },
      bonus: {},
    },
    name: "",
    featuredLink: "",
    description: {
      title: "",
      text: "",
      logo: "",
    },
    contactInformation: "",
    // kolsInfo: {
    //   userName: "",
    //   displayName: "",
    //   twitterUrl: "",
    //   walletAddress: "",
    // },
  },
  kolDetailStatus: "IDLE",
  upgradeType: "By request",
  offerList: {},
  options: {
    payChains: { status: "IDLE", data: [] },
    payTokens: { status: "IDLE", data: {} },
  },
  contact: {
    status: "IDLE",
    data: "",
  },
  history: {
    status: "IDLE",
    data: {} as RTKOLsOfferHistory,
  },
  notification: {
    status: "IDLE",
    data: {} as RTOfferNotification,
  },
  requestNotification: {
    status: "IDLE",
    data: {} as RTRequestNotification,
  },
  projectNotifications: {
    status: "IDLE",
    data: {} as RTOfferNotification,
  },
  newOfferId: "",
  letterContent: "",
};

const kolOfferSlice = createSlice({
  initialState: initState,
  name: "kol-offer",
  reducers: {
    resetForm: (state) => {
      state.offerForm = initState.offerForm;
      state.kolDetailStatus = initState.kolDetailStatus;
    },
    editForm: (state, action: PayloadAction<Partial<TKOLOffer["offerForm"]>>) => {
      state.offerForm = {
        ...state.offerForm,
        ...action.payload,
      };
    },
    editDetailStatus: (state, action: PayloadAction<StateStatus>) => {
      state.kolDetailStatus = action.payload;
    },
    editContact: (state, action: PayloadAction<string>) => {
      state.contact.data = action.payload;
    },
    editUpgradeType: (state, action: PayloadAction<UpgradeType>) => {
      state.upgradeType = action.payload;
    },
    setNewOfferId: (state, action: PayloadAction<string>) => {
      state.newOfferId = action.payload;
    },
    setLetterContent: (state, action: PayloadAction<string>) => {
      state.letterContent = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPayOptions.pending, (state) => {
        state.options.payTokens.status = "PROCESSING";
        state.options.payChains.status = "PROCESSING";
      })
      .addCase(getPayOptions.fulfilled, (state, action) => {
        state.options.payTokens.status = "SUCCESS";
        state.options.payChains.status = "SUCCESS";
        state.options.payTokens.data = action.payload.tokenInfo.data;
        state.options.payChains.data = action.payload.chainInfo.data;
      })
      .addCase(getPayOptions.rejected, (state) => {
        state.options.payTokens.status = "FAILED";
        state.options.payChains.status = "FAILED";
      })
      .addCase(getProjectContact.pending, (state) => {
        state.contact.status = "PROCESSING";
      })
      .addCase(getProjectContact.fulfilled, (state, action) => {
        state.contact.status = "SUCCESS";
        state.contact.data = Object.entries(action.payload || {})
          .map(([platform, value]) => {
            if (typeof value === "string") {
              return `${platform}: ${value}\n`;
            } else {
              return `${platform}: ${value?.join(", ")}\n`;
            }
          })
          .join("");
      })

      .addCase(getProjectContact.rejected, (state) => {
        state.contact.status = "FAILED";
      })
      .addCase(getOfferDetail.pending, (state) => {
        state.kolDetailStatus = "PROCESSING";
      })
      .addCase(getOfferDetail.fulfilled, (state, action) => {
        state.kolDetailStatus = "SUCCESS";
        state.offerForm = action.payload;
      })
      .addCase(getOfferDetail.rejected, (state) => {
        state.kolDetailStatus = "FAILED";
      })
      .addCase(getBaseOfferDetail.pending, (state) => {
        state.kolDetailStatus = "PROCESSING";
      })
      .addCase(getBaseOfferDetail.fulfilled, (state, action) => {
        state.kolDetailStatus = "SUCCESS";
        state.offerForm = action.payload;
      })
      .addCase(getBaseOfferDetail.rejected, (state) => {
        state.kolDetailStatus = "FAILED";
      })
      .addCase(getOfferOtherVersion.pending, (state) => {
        state.kolDetailStatus = "PROCESSING";
      })
      .addCase(getOfferOtherVersion.fulfilled, (state, action) => {
        state.kolDetailStatus = "SUCCESS";
        state.offerForm = action.payload;
      })
      .addCase(getOfferOtherVersion.rejected, (state) => {
        state.kolDetailStatus = "FAILED";
      })
      .addCase(getOfferHistory.pending, (state) => {
        state.history.status = "PROCESSING";
      })
      .addCase(getOfferHistory.fulfilled, (state, action) => {
        state.history.status = "SUCCESS";
        state.history.data = action.payload;
      })
      .addCase(getOfferHistory.rejected, (state) => {
        state.history.status = "FAILED";
      })
      .addCase(getProjectNotification.pending, (state) => {
        state.notification.status = "PROCESSING";
      })
      .addCase(getProjectNotification.fulfilled, (state, action) => {
        state.notification.status = "SUCCESS";
        state.notification.data = action.payload;
      })
      .addCase(getProjectNotification.rejected, (state) => {
        state.notification.status = "FAILED";
      })
      .addCase(getProjectRequestNotification.pending, (state) => {
        state.requestNotification.status = "PROCESSING";
      })
      .addCase(getProjectRequestNotification.fulfilled, (state, action) => {
        state.requestNotification.status = "SUCCESS";
        state.requestNotification.data = action.payload;
      })
      .addCase(getProjectRequestNotification.rejected, (state) => {
        state.requestNotification.status = "FAILED";
      })
      .addCase(getProjectNotifications.pending, (state) => {
        state.projectNotifications.status = "PROCESSING";
      })
      .addCase(getProjectNotifications.fulfilled, (state, action) => {
        state.projectNotifications.status = "SUCCESS";
        state.projectNotifications.data = action.payload;
      })
      .addCase(getProjectNotifications.rejected, (state) => {
        state.projectNotifications.status = "FAILED";
      });
  },
});

export default kolOfferSlice.reducer;

export const {
  resetForm,
  editForm,
  editDetailStatus,
  editContact,
  editUpgradeType,
  setNewOfferId,
  setLetterContent,
} = kolOfferSlice.actions;
