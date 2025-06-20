import { postCampaignDetailLogin } from "@centic-scoring/api/services/web3-growth/campaign";
import { Url } from "next/dist/shared/lib/router/router";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function Redirect() {
  const router = useRouter();
  useEffect(() => {
    const login = async () => {
      if (router && router.query.url) {
        const url = new URL(router.query.url as string);
        const params = new URLSearchParams(url.search);
        try {
          await postCampaignDetailLogin(
            params.get("projectId") as string,
            router.query.oauth_verifier as string
          );
        } catch (error) {
          toast.error((error as Error).message);
        }
        router.push(`${decodeURI(router.query.url ? (router.query.url as string) : "")}` as Url);
      }
    };
    login();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return null;
}
