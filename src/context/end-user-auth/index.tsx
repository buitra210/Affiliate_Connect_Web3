import { getAPIWithPrefix } from "@centic-scoring/utils/storage/authStorage";
import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { useAccount } from "wagmi";

export type TEndUserContext = {
  isLoggedIn: boolean;
  // eslint-disable-next-line
  setIsLoggedIn: (value: boolean) => void;
  checkAuthStatus: () => void;
};

const EndUserContext = createContext<TEndUserContext>({} as TEndUserContext);
export default function EndUserContextProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { isConnected } = useAccount();
  const checkAuthStatus = useCallback(() => {
    const kolJwt = getAPIWithPrefix("portfolio");
    if (!kolJwt || !isConnected) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  }, [isConnected]);

  const contextValue: TEndUserContext = useMemo(
    () =>
      ({
        isLoggedIn,
        setIsLoggedIn,
        checkAuthStatus,
      } as TEndUserContext),
    [isLoggedIn, checkAuthStatus]
  );

  return <EndUserContext.Provider value={contextValue}>{children}</EndUserContext.Provider>;
}

export const useEndUserAuthContext = () => useContext(EndUserContext);
