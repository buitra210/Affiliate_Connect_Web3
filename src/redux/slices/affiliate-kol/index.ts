import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TAffiliateKOL = {
  kolRequest: {
    [id: number]: {
      type: string;
      kpiExpect: {
        [kpiId: number]: {
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
        rule: string;
        bonusReward: {
          [bonusId: number]: {
            goal: string;
            kpiValue: number;
            kpiType: string;
            rewardValue: number;
          };
        };
      };
      other: string;
    };
  };
};
const initData: TAffiliateKOL = {
  kolRequest: {
    [Date.now()]: {
      type: "KPI expectation",
      kpiExpect: {
        [Date.now()]: {
          require: {
            value: 0,
            type: "",
          },
          timeRequire: {
            value: 0,
            unit: "",
          },
        },
      },
      payment: {
        rule: "",
        bonusReward: {
          [Date.now()]: {
            goal: "",
            kpiValue: 0,
            kpiType: "",
            rewardValue: 0,
          },
        },
      },
      other: "",
    },
  },
};
const affiliateKOLSlice = createSlice({
  name: "AffiliateKOL",
  initialState: initData,
  reducers: {
    setKOLKpiExpect: (
      state,
      action: PayloadAction<{
        id: number;
        content: TAffiliateKOL["kolRequest"][number]["kpiExpect"];
      }>
    ) => {
      if (state.kolRequest[action.payload.id]) {
        state.kolRequest[action.payload.id].kpiExpect = action.payload.content;
      }
    },
    setKOLPayment: (
      state,
      action: PayloadAction<{
        id: number;
        content: TAffiliateKOL["kolRequest"][number]["payment"];
      }>
    ) => {
      if (state.kolRequest[action.payload.id]) {
        state.kolRequest[action.payload.id].payment = action.payload.content;
      }
    },
    editOtherRequest: (
      state,
      action: PayloadAction<{
        id: number;
        other: string;
      }>
    ) => {
      if (state.kolRequest[action.payload.id]) {
        state.kolRequest[action.payload.id].other = action.payload.other;
      }
    },
    addKOLRequest: (state) => {
      const newId = Date.now();
      state.kolRequest[newId] = {
        type: "",
        kpiExpect: {
          [Date.now()]: {
            require: {
              value: 0,
              type: "",
            },
            timeRequire: {
              value: 0,
              unit: "",
            },
          },
        },
        payment: {
          rule: "",
          bonusReward: {
            [Date.now()]: {
              goal: "",
              kpiValue: 0,
              kpiType: "",
              rewardValue: 0,
            },
          },
        },
        other: "",
      };
    },
    setType: (
      state,
      action: PayloadAction<{
        id: number;
        type: TAffiliateKOL["kolRequest"][number]["type"];
      }>
    ) => {
      if (state.kolRequest[action.payload.id]) {
        state.kolRequest[action.payload.id].type = action.payload.type;
      }
    },
    deleteKOLRequest: (
      state,
      action: PayloadAction<{
        id: number;
      }>
    ) => {
      delete state.kolRequest[action.payload.id];
    },
  },
});

export default affiliateKOLSlice.reducer;
export const {
  setKOLKpiExpect,
  setKOLPayment,
  deleteKOLRequest,
  editOtherRequest,
  addKOLRequest,
  setType,
} = affiliateKOLSlice.actions;
