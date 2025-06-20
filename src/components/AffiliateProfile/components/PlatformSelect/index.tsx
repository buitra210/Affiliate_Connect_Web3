import { TeleIconRounded } from "@centic-scoring/icons";
import { useAppDispatch } from "@centic-scoring/redux/hook";
import { setLoginPlatform } from "@centic-scoring/redux/slices/affiliate-auth";
import { Box, Button, Checkbox, Typography } from "@mui/material";
import { useState } from "react";
import LoginWithTwitter from "../LoginWithTwitter";

export default function PlatformSelect() {
  const [checked, setChecked] = useState(true);
  const dispatch = useAppDispatch();

  return (
    <Box maxWidth={350}>
      <Typography variant="h5" fontWeight={500} textAlign={"center"} mb={1}>
        Welcome to Centic
      </Typography>
      <Typography color="text.label1" textAlign={"center"} variant="body2">
        Login with social to manage your Affiliate offer
      </Typography>
      <Box sx={{ mt: 4, mb: 2 }}>
        <LoginWithTwitter disabled={!checked} />
      </Box>
      <Button
        disabled={!checked}
        variant="outlined"
        color="info"
        fullWidth
        sx={{ display: "flex", justifyContent: "flex-start" }}
        onClick={() => {
          dispatch(setLoginPlatform("telegram"));
        }}
      >
        <TeleIconRounded sx={{ mx: 1 }} />
        <Typography variant="body2" fontWeight={500} color="text.secondary">
          Login with Telegram as an Ambassador
        </Typography>
      </Button>
      <Box sx={{ display: "flex", alignItems: "flex-start", ml: -1, mt: 2 }}>
        <Checkbox
          value={checked}
          checked={checked}
          onChange={(_, c) => setChecked(c)}
          color="info"
          disableRipple
        />
        <Typography variant="small" color="text.label1" mt={1}>
          I agree to the{" "}
          <Typography
            sx={{ cursor: "pointer" }}
            component={"span"}
            variant="small"
            fontWeight={500}
            color="text.active"
          >
            Terms of Service, Cookies Policy
          </Typography>{" "}
          and{" "}
          <Typography
            sx={{ cursor: "pointer" }}
            component={"span"}
            variant="small"
            fontWeight={500}
            color="text.active"
          >
            Privacy Policy
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
}
