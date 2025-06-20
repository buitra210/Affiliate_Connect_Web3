/* eslint-disable @next/next/no-img-element */
import {
  fetchAuthenURL,
  fetchKolInfo,
  RTKOLInfos,
} from "@centic-scoring/api/services/affiliate/affiliate";
import useDialogState from "@centic-scoring/hooks/common/useDialogState";
import { DataWithStatus } from "@centic-scoring/redux/slices/global";
import { deleteAPIJwt, getAPIJwt, setAPIJwt } from "@centic-scoring/utils/storage/authStorage";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "react-toastify";

export type TKOLAuthContext = {
  isLoggedIn: boolean | undefined;
  loginWithTwitter: () => Promise<void>;
  logout: () => void;
  open: boolean;
  handleClose: () => void;
  handleOpen: () => void;
  getKOLInfo: () => Promise<void>;
  kolInfo: DataWithStatus<RTKOLInfos>;
};

const KOLAuthContext = createContext<TKOLAuthContext>({} as TKOLAuthContext);

export default function KOLAuthContextProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(undefined);
  const [kolInfo, setKOLInfo] = useState<DataWithStatus<RTKOLInfos>>({
    status: "IDLE",
    data: {} as RTKOLInfos,
  });
  const { handleClose, handleOpen, open } = useDialogState();
  const appLocation = useCallback(() => {
    //@ts-ignore
    if (typeof window !== undefined) {
      return window?.location?.origin;
    } else {
      return "";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleOpen, handleClose]);

  useEffect(() => {
    if (!isLoggedIn && isLoggedIn !== undefined) {
      handleOpen();
    } else {
      handleClose();
    }
  }, [isLoggedIn, handleOpen, handleClose]);

  const loginWithTwitter = useCallback(async () => {
    try {
      const res = await fetchAuthenURL(`${appLocation()}/affiliate/twitter-login`);
      setAPIJwt("twitterSecretToken", res.key);
      if (typeof window !== "undefined") {
        window.open(res.authenticationUrl, "_self");
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  }, [appLocation]);

  const logout = useCallback(() => {
    deleteAPIJwt("kol");
    setIsLoggedIn(false);
  }, []);

  const getKOLInfo = useCallback(async () => {
    const jwt = getAPIJwt("kol");
    if (!jwt) {
      setIsLoggedIn(false);
    } else {
      try {
        setKOLInfo({ status: "PROCESSING" });
        const res = await fetchKolInfo();
        setKOLInfo({ status: "SUCCESS", data: res });
        setIsLoggedIn(true);
      } catch (error) {
        setIsLoggedIn(false);
      }
    }
  }, []);

  useEffect(() => {
    getKOLInfo();
  }, [getKOLInfo]);

  const contextValue: TKOLAuthContext = useMemo(() => {
    return {
      isLoggedIn,
      loginWithTwitter,
      logout,
      open,
      handleClose,
      handleOpen,
      getKOLInfo,
      kolInfo,
    };
  }, [isLoggedIn, loginWithTwitter, logout, open, handleClose, handleOpen, kolInfo, getKOLInfo]);
  return <KOLAuthContext.Provider value={contextValue}>{children}</KOLAuthContext.Provider>;
}

export const useKOLAuthContext = () => useContext(KOLAuthContext);
