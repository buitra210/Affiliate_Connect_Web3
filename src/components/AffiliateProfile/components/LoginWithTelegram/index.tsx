import { useAffiliateAuthSelector } from "@centic-scoring/redux/hook";
import { Box } from "@mui/material";
import Step2 from "./Step2";
import Step3 from "./Step3";
import TwoFactorVerification from "./TwoFactorVerification";
import Success from "./Success";

export default function LoginWithTelegram() {
  const { telegramParams } = useAffiliateAuthSelector();
  return (
    <Box maxWidth={350}>
      {telegramParams.step === 2 && <Step2 />}
      {telegramParams.step === 3 && <Step3 />}
      {telegramParams.step === 4 && <TwoFactorVerification />}
      {telegramParams.step === 5 && <Success />}
    </Box>
  );
}
