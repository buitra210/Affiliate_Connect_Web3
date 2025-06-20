import { configureStore } from "@reduxjs/toolkit";
import settingReducer from "./slices/setting";
import commonReducer from "./slices/common";
import userPermissionReducer from "./slices/permission";
import recommendationReducer from "./slices/recommendation";
import kolsReport from "./slices/kols-report";
import kolsReducer from "./slices/kols";
import kolOfferReducer from "./slices/kol-offer";
import offerManagement from "./slices/offer-management";
import kolUser from "./slices/kol-user";
import affiliateKOLs from "./slices/affiliate-kol";
import authEndUser from "./slices/auth-end-user";
import affiliateAbmassador from "./slices/affiliate-ambassador";
import affiliateAuthReducer from "./slices/affiliate-auth";
import forProjectCommonReducer from "./slices/for-project-common";

export const store = configureStore({
  reducer: {
    setting: settingReducer,
    common: commonReducer,
    userPermissions: userPermissionReducer,
    recommendation: recommendationReducer,
    kols: kolsReducer,
    kolsReport: kolsReport,
    kolOffer: kolOfferReducer,
    offerManagement: offerManagement,
    kolUser: kolUser,
    affiliateKols: affiliateKOLs,
    authEndUser: authEndUser,
    affiliateAbmassador: affiliateAbmassador,
    affiliateUserAuth: affiliateAuthReducer,
    forProjectCommon: forProjectCommonReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
