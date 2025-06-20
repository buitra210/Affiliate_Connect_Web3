import { centicLogin, fetchApiKey, getName, verifyToken } from "@centic-scoring/api/services";
import { StateStatus } from "@centic-scoring/components/component";
import { notAuthURL } from "@centic-scoring/layouts/sidebar-configs/sidebarConfig";
import { useRouter } from "next/router";
import React, { ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

export type AuthContextType = {
  isLoggedIn: boolean | undefined;
  status: StateStatus;
  checkAuthState: () => Promise<void>;
  // eslint-disable-next-line no-unused-vars
  login: (userName: string, password: string) => Promise<void>;
  logout: () => void;
  getAPIKey: () => Promise<void>;
  handleCloseLogin: () => void;
  handleCloseRegister: () => void;
  handleOpenLogin: () => void;
  handleOpenRegister: () => void;
  // handleVerifyEmail: () => void;
  userName: string;
  verified: boolean;
  apiKey: string;
  openLogin: boolean;
  openRegister: boolean;
  // verifyEmail: boolean;
};

const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);
const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [openLogin, setOpenLogin] = useState<boolean>(false);
  const [openRegister, setOpenRegister] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(undefined);
  const [status, setStatus] = useState<StateStatus>("IDLE");
  const [userName, setUserName] = useState<string>("");
  const [accountVerified, setAccountVerified] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string>("");
  const router = useRouter();

  const handleCloseLogin = useCallback(() => {
    setOpenLogin(false);
  }, []);
  const handleCloseRegister = useCallback(() => {
    setOpenRegister(false);
  }, []);
  const handleOpenLogin = useCallback(() => {
    if (isLoggedIn) {
      return;
    }
    setOpenLogin(true);
  }, [isLoggedIn]);
  const handleOpenRegister = useCallback(() => {
    setOpenRegister(true);
  }, []);

  const checkAuthState = useCallback(async () => {
    try {
      setStatus("PROCESSING");
      const res = await verifyToken();
      if (res.valid) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        toast("Token expired", { type: "info" });
        localStorage?.removeItem("jwt");
        router.push("/projects");
      }
      setStatus("SUCCESS");
    } catch (err) {
      setStatus("FAILED");
      setIsLoggedIn(false);
      router.push("/projects");
    }
  }, [router]);

  const login = useCallback(async (userName: string, password: string) => {
    const res = await centicLogin({
      userName: userName,
      password: password,
    });
    if (res.success) {
      localStorage.setItem("jwt", res.jwt);
      setIsLoggedIn(true);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    router.push("/projects");
  }, [router]);

  const getAPIKey = useCallback(async () => {
    try {
      const apiKeyData = await fetchApiKey();
      setApiKey(apiKeyData.apiKey);
    } catch (error) {
      setApiKey("");
    }
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (isLoggedIn) {
        try {
          const res = await getName();
          setUserName(res.userName);
          setAccountVerified(res.verified);
        } catch (error) {
          setIsLoggedIn(false);
          localStorage?.removeItem("jwt");
          setUserName("");
        }
      }
    };
    fetchUserData();
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn && isLoggedIn !== undefined) {
      getAPIKey();
    }
  }, [getAPIKey, isLoggedIn]);

  useEffect(() => {
    try {
      const jwt = localStorage.getItem("jwt");
      if (jwt) setIsLoggedIn(true);
      else {
        setIsLoggedIn(false);
        try {
          if (!notAuthURL.includes(router.pathname.split("/")[1])) {
            localStorage?.removeItem("jwt");
            // router.push("/web3-growth");
          }
        } catch (error) {
          //pass
        }
      }
    } catch (err) {
      setIsLoggedIn(false);
      localStorage?.removeItem("jwt");
      router.push("/projects");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (status === "SUCCESS") {
      if (isLoggedIn) {
        getAPIKey();
        return;
      }
    }
  }, [isLoggedIn, getAPIKey, status]);

  const contextValue = useMemo(() => {
    return {
      isLoggedIn,
      status,
      // verifyEmail,
      checkAuthState,
      login,
      logout,
      getAPIKey,
      userName,
      verified: accountVerified,
      apiKey,
      handleCloseLogin,
      handleCloseRegister,
      handleOpenLogin,
      handleOpenRegister,
      // handleVerifyEmail,
      openLogin,
      openRegister,
      // setVerifyEmail,
    };
  }, [
    isLoggedIn,
    status,
    login,
    logout,
    checkAuthState,
    getAPIKey,
    userName,
    accountVerified,
    apiKey,
    openLogin,
    openRegister,
    handleCloseLogin,
    handleCloseRegister,
    handleOpenLogin,
    handleOpenRegister,
  ]);
  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
export default AuthContextProvider;
export const useAuthContext = () => useContext(AuthContext);
