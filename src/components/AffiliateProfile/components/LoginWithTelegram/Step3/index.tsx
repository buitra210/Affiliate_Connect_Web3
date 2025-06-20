/* eslint-disable @next/next/no-img-element */
import { LoadingButton } from "@mui/lab";
import { Box, Avatar, Typography, TextField, Button } from "@mui/material";
import countryFlag from "@centic-scoring/assets/country-flag.json";
import { loginTelegam } from "@centic-scoring/api/services/ambassador/affiliate";
import { useState } from "react";
import { toast } from "react-toastify";
import { setAPIJwt } from "@centic-scoring/utils/storage/authStorage";
import { useAffiliateAuthSelector, useAppDispatch } from "@centic-scoring/redux/hook";
import {
  checkUserData,
  editTeleParams,
  editTeleParamsData,
} from "@centic-scoring/redux/slices/affiliate-auth";

export default function Step3() {
  const { telegramParams } = useAffiliateAuthSelector();
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const handleConnect = async () => {
    if (!telegramParams.data.code) {
      return;
    }
    setLoading(true);
    if (
      !(
        telegramParams.data.country &&
        telegramParams.data.phone &&
        telegramParams.data.phoneCodeHash &&
        telegramParams.data.sessionPath
      )
    ) {
      return;
    }
    try {
      const res = await loginTelegam({
        code: telegramParams.data.code,
        country: telegramParams.data.country,
        phone: telegramParams.data.phone,
        phoneCodeHash: telegramParams.data.phoneCodeHash,
        sessionPath: telegramParams.data.sessionPath,
      });
      if (!res.errors) {
        setAPIJwt("affiliate", res.jwt);
        dispatch(editTeleParams({ step: 5 }));
      } else {
        if (res.key) {
          dispatch(
            editTeleParamsData({
              key: res.key,
            })
          );
        }
        dispatch(editTeleParams({ step: 4 }));
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
    setLoading(false);
  };

  return (
    <Box sx={{ maxWidth: "400px" }}>
      <Box
        display="flex"
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        mb={3}
      >
        <Avatar src="/platforms/telegram.png" sx={{ width: "60px", height: "60px" }} />
        <Typography variant="h4" color={"text.primary"} mt={2} fontWeight={700}>
          Connect Telegram
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
          <img
            alt="country"
            src={"/" + countryFlag.find((c) => c.code === telegramParams.data?.country)?.flag_4x3}
            style={{ width: "24px", height: "18px", borderRadius: "4px", marginRight: "8px" }}
          />
          <Typography variant="body1" color={"text.primary"} fontWeight={500}>
            {telegramParams.data?.phone}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.label1" textAlign={"center"} mt={3}>
          Type the code is sent your telegram app to verify
        </Typography>
      </Box>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <>
          <Typography variant="body1" color="text.label1" mb={0.5}>
            Code*
          </Typography>
          <TextField
            value={telegramParams.data?.code}
            size="small"
            fullWidth
            onChange={(e) => {
              dispatch(
                editTeleParamsData({
                  code: e.target.value,
                })
              );
            }}
          />

          <LoadingButton
            type="submit"
            loading={loading}
            variant="contained"
            fullWidth
            sx={{ mt: 4 }}
            onClick={handleConnect}
            disabled={!telegramParams.data?.code}
          >
            Connect
          </LoadingButton>
        </>
      </form>
      <Button
        variant="outlined"
        fullWidth
        sx={{ mt: 2 }}
        onClick={() => {
          dispatch(editTeleParams({ step: 2 }));
          dispatch(checkUserData());
        }}
      >
        Back
      </Button>
    </Box>
  );
}
