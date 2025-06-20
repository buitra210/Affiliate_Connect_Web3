import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";

export const useAppDispatch = useDispatch<AppDispatch>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useCommonDataSelector = () => useAppSelector((state) => state.common);

export const usePermissionSelector = () => useAppSelector((state) => state.userPermissions);

export const useProjectSummarySelector = () => useAppSelector((state) => state.common.project);

// FOR PROJECT DATA SELECTOR****************************************************************
export const useForProjectCommonSelector = () => useAppSelector((state) => state.forProjectCommon);
export const useKOLsSelector = () => useAppSelector((state) => state.kols);
export const useKOLsReportSelector = () => useAppSelector((state) => state.kolsReport);
export const useKOLOfferSelector = () => useAppSelector((state) => state.kolOffer);
export const useOfferManagementSelector = () => useAppSelector((state) => state.offerManagement);
export const useKolUserSelector = () => useAppSelector((state) => state.kolUser);
export const useAffiliateKOLsSelector = () => useAppSelector((state) => state.affiliateKols);
export const useAuthEndUserSelector = () => useAppSelector((state) => state.authEndUser);
export const useAffiliateAmbassadorSelector = () =>
  useAppSelector((state) => state.affiliateAbmassador);
export const useAffiliateAuthSelector = () => useAppSelector((state) => state.affiliateUserAuth);

//PRESALE
