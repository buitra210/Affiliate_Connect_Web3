import { useKOLAuthContext } from "@centic-scoring/context/kol-auth-context";
import { TwitterIcon } from "@centic-scoring/icons";
import { Box, Button, Checkbox, Dialog, Typography } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import CenticLoading from "../CenticLoading";

export default function LoginButton() {
  const { open } = useKOLAuthContext();
  return (
    <Box>
      <Button variant="contained">Login</Button>
      <Dialog open={open}>
        <Content />
      </Dialog>
    </Box>
  );
}
function Content() {
  const [checked, setChecked] = useState(true);
  const [loading, setLoading] = useState<boolean>(false);
  const { loginWithTwitter } = useKOLAuthContext();
  const handleLogin = async () => {
    if (!checked) {
      toast.info("Please agree to the terms and conditions");
      return;
    }
    setLoading(true);
    try {
      await loginWithTwitter();
    } catch (error) {
      toast.error((error as Error).message);
    }
    setLoading(false);
  };

  return (
    <Box sx={{ p: 3, maxWidth: "400px" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography
          variant="h5"
          fontWeight={500}
          color="#FFFFFF"
          textAlign={"center"}
          mt={2}
          mb={1.5}
        >
          Welcome to Centic
        </Typography>
        <Typography variant="body2" color="text.label1" textAlign={"center"} mb={3}>
          Login with Twitter to see the offer. This is free and will not require a transaction
        </Typography>

        <Button
          onClick={handleLogin}
          variant="outlined"
          color="info"
          fullWidth
          sx={{ display: "flex", alignItems: "center" }}
        >
          {loading ? (
            <CenticLoading size={20} />
          ) : (
            <>
              {" "}
              <TwitterIcon sx={{ mr: 1 }} /> Login with Twitter
            </>
          )}
        </Button>
      </Box>
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
          <Typography component={"span"} variant="small" fontWeight={500} color="text.active">
            Terms of Service, Cookies Policy
          </Typography>{" "}
          and{" "}
          <Typography component={"span"} variant="small" fontWeight={500} color="text.active">
            Privacy Policy
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
}
