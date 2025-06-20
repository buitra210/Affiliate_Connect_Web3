import { useAffiliateAuthSelector, useAppDispatch } from "@centic-scoring/redux/hook";
import { checkUserData } from "@centic-scoring/redux/slices/affiliate-auth";
import { getAffiliateUser } from "@centic-scoring/redux/slices/affiliate-auth/fetchFunction";
import { useEffect } from "react";

export default function AuthDataFetcher() {
  const dispatch = useAppDispatch();
  const { isLoggedIn, userData } = useAffiliateAuthSelector();
  useEffect(() => {
    dispatch(getAffiliateUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(checkUserData());
  }, [isLoggedIn, dispatch, userData.status]);

  return null;
}
