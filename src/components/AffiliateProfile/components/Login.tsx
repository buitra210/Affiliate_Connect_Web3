/* eslint-disable @next/next/no-img-element */
import { useAffiliateAuthSelector, useAppDispatch } from "@centic-scoring/redux/hook";
import { handleOpen } from "@centic-scoring/redux/slices/affiliate-auth";
import { Box, Button, Dialog, Paper } from "@mui/material";
import PlatformSelect from "./PlatformSelect";
import centicLogo from "public/centic_light_horizontal.png";
import LoginWithTelegram from "./LoginWithTelegram";

export default function Login() {
  const { open } = useAffiliateAuthSelector();
  const dispatch = useAppDispatch();
  const openModal = () => {
    dispatch(handleOpen());
  };

  return (
    <Box>
      <Button onClick={openModal} variant="contained">
        Login
      </Button>
      <Dialog open={open}>
        <Content />
      </Dialog>
    </Box>
  );
}

function Content() {
  const { loginPlatform } = useAffiliateAuthSelector();
  return (
    <Paper sx={{ px: 3, pt: 6, pb: 4, position: "relative" }}>
      <img
        src={centicLogo.src}
        style={{ height: "16px", width: "auto", position: "absolute", left: "24px", top: "24px" }}
        alt="centic logo"
      />
      {!loginPlatform && <PlatformSelect />}
      {loginPlatform === "telegram" && <LoginWithTelegram />}
    </Paper>
  );
}
