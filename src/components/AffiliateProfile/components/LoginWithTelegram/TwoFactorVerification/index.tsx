/* eslint-disable @next/next/no-img-element */
import { LoadingButton } from "@mui/lab";
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import countryFlag from "@centic-scoring/assets/country-flag.json";
import { toast } from "react-toastify";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { login2FA } from "@centic-scoring/api/services/ambassador/affiliate";
import { setAPIJwt } from "@centic-scoring/utils/storage/authStorage";
import { useAffiliateAuthSelector, useAppDispatch } from "@centic-scoring/redux/hook";
import { editTeleParams, editTeleParamsData } from "@centic-scoring/redux/slices/affiliate-auth";

export default function TwoFactorVerification() {
  const { telegramParams } = useAffiliateAuthSelector();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const dispatch = useAppDispatch();
  const toggle = () => {
    setVisible((prev) => !prev);
  };
  const handleConnect = async () => {
    setLoading(true);
    try {
      if (telegramParams.data.key && telegramParams.data.password) {
        const res = await login2FA({
          key: telegramParams.data.key,
          password: telegramParams.data.password,
        });
        setAPIJwt("affiliate", res.jwt);
        dispatch(editTeleParams({ step: 5 }));
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
            src={"/" + countryFlag.find((c) => c.code === telegramParams.data.country)?.flag_4x3}
            style={{ width: "24px", height: "18px", borderRadius: "4px", marginRight: "8px" }}
          />
          <Typography variant="body1" color={"text.primary"} fontWeight={500}>
            {telegramParams.data.phone}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.label1" textAlign={"center"} mt={3}>
          Your account is protected by 2FA password. Please provide password to authenticity
        </Typography>
      </Box>
      <form onSubmit={(e) => e.preventDefault()}>
        <Typography variant="body1" color="text.label1" mb={0.5}>
          Password*
        </Typography>
        <TextField
          value={telegramParams.data.password}
          size="small"
          fullWidth
          onChange={(e) => {
            dispatch(editTeleParamsData({ password: e.target.value }));
          }}
          type={visible ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <Box
                sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
                onClick={toggle}
              >
                {visible ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </Box>
            ),
          }}
        />
        <LoadingButton
          type="submit"
          loading={loading}
          variant="contained"
          fullWidth
          sx={{ mt: 4 }}
          onClick={handleConnect}
        >
          Connect
        </LoadingButton>
      </form>
      <Button
        variant="outlined"
        fullWidth
        sx={{ mt: 2 }}
        onClick={() => {
          dispatch(editTeleParams({ step: 3 }));
        }}
      >
        Back
      </Button>
    </Box>
  );
}
