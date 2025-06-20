import { questTwiteerLogin } from "@centic-scoring/api/services/airdrop-services";
import CenticLoading from "@centic-scoring/components/CenticLoading";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

export default function QuestLoginTwitter() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const oauthVerifier = useMemo(() => {
    return typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("oauth_verifier") || ""
      : "";
  }, []);

  useEffect(() => {
    const handleConnectTwitter = async () => {
      setLoading(true);
      try {
        await questTwiteerLogin({ oauthVerifier });
        toast.success("Connect Twitter Account Successfully!");
        router.push("/quests/social");
      } catch (error) {
        toast.error((error as Error).message);
        router.push("/quests/social");
      }
      setLoading(false);
      return;
    };

    if (!oauthVerifier) {
      toast.warn("Verify failed!");
      router.push("/quests/social");
      return;
    }
    handleConnectTwitter();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [oauthVerifier]);

  return (
    <Box
      sx={{
        width: "100sw",
        minHeight: "400px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {loading && <CenticLoading title="Connecting Twitter account" showTitle={true} />}
    </Box>
  );
}
