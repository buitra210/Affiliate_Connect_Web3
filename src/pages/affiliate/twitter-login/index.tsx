import { loginWithTwitter } from "@centic-scoring/api/services/affiliate/affiliate";
import useURLQuery from "@centic-scoring/hooks/common/useUrlQuery";
import { deleteAPIJwt, getAPIJwt, setAPIJwt } from "@centic-scoring/utils/storage/authStorage";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function TwitterLoginPage() {
  const { getCustomKey } = useURLQuery();
  const oauthVerifier = getCustomKey("oauth_verifier");
  const router = useRouter();

  useEffect(() => {
    const checkData = async () => {
      const tokenSecret = getAPIJwt("twitterSecretToken");
      if (tokenSecret && oauthVerifier) {
        try {
          const res = await loginWithTwitter({ oauthVerifier, key: tokenSecret });
          setAPIJwt("affiliate", res.jwt);
          deleteAPIJwt("twitterSecretToken");
          toast.success("Login successfully");
          if (typeof window !== "undefined") {
            window.location.pathname = "/affiliate";
          }
        } catch (error) {
          toast.error((error as Error).message);
        }
      }
    };
    checkData();
  }, [oauthVerifier, router]);

  return null;
}
