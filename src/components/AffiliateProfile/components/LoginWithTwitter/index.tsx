import { fetchAuthenURL } from "@centic-scoring/api/services/affiliate/affiliate";
import CenticLoading from "@centic-scoring/components/CenticLoading";
import { TwitterIcon } from "@centic-scoring/icons";
import { setAPIJwt } from "@centic-scoring/utils/storage/authStorage";
import { LoadingButton } from "@mui/lab";
import { Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

export default function LoginWithTwitter({ disabled }: { disabled?: boolean }) {
  const [loading, setLoading] = useState(false);

  const appLocation = useCallback(() => {
    //@ts-ignore
    if (typeof window !== undefined) {
      return window?.location?.origin;
    } else {
      return "";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  const handleLogin = async () => {
    setLoading(true);
    try {
      await loginWithTwitter();
    } catch (error) {
      toast.error((error as Error).message);
    }
    setLoading(false);
  };
  return (
    <LoadingButton
      sx={{ display: "flex", justifyContent: "flex-start" }}
      onClick={handleLogin}
      loading={loading}
      loadingIndicator={<CenticLoading size={20} />}
      variant="outlined"
      color="info"
      fullWidth
      disabled={disabled}
    >
      {!loading && (
        <>
          <TwitterIcon sx={{ mx: 1 }} />
          <Typography variant="body2" fontWeight={500} color="text.secondary">
            Login with Twitter as an Influencer
          </Typography>
        </>
      )}
    </LoadingButton>
  );
}
