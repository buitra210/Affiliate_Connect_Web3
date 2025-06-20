import { useAppDispatch } from "@centic-scoring/redux/hook";
import { updateAuthState } from "@centic-scoring/redux/slices/auth-end-user";
import { getAPIWithPrefix } from "@centic-scoring/utils/storage/authStorage";
import { useCallback } from "react";
import { useAccount } from "wagmi";

export default function useEndUserAuth() {
  const { isConnected } = useAccount();
  const dispatch = useAppDispatch();

  const checkStatus = useCallback(() => {
    const kolJwt = getAPIWithPrefix("portfolio");
    if (!kolJwt || !isConnected) {
      dispatch(updateAuthState(false));
    } else {
      dispatch(updateAuthState(true));
    }
  }, [isConnected, dispatch]);

  return { checkStatus };
}
