import { useAppDispatch } from "@centic-scoring/redux/hook";
import { updateAuthState } from "@centic-scoring/redux/slices/auth-end-user";
import { getAPIWithPrefix } from "@centic-scoring/utils/storage/authStorage";
import { useCallback } from "react";
export default function useEndUserAuth() {
  const isConnected = false; // Mock value since wagmi is removed
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
