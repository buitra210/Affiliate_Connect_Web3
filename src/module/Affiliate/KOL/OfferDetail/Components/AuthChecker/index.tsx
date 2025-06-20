import ComponentWithStatus from "@centic-scoring/components/ComponentWithStatus";
import { TTab } from "@centic-scoring/module/Affiliate";
import { useAffiliateAuthSelector } from "@centic-scoring/redux/hook";
import { Box, Button, Paper, Typography } from "@mui/material";
import { PropsWithChildren } from "react";

export default function AuthChecker({
  children,
  type,
}: PropsWithChildren<{
  type: TTab;
}>) {
  const { userData } = useAffiliateAuthSelector();
  return (
    <Box>
      <ComponentWithStatus status={userData.status}>
        {type === "KOL" && userData.data?.platform?.includes("twitter") && children}
        {type === "KOL" && !userData.data?.platform?.includes("twitter") && <TwitterAuthRequire />}
        {type === "Ambassador" && userData.data?.platform?.includes("telegram") && children}
        {type === "Ambassador" && !userData.data?.platform?.includes("telegram") && (
          <TelegramAuthRequire />
        )}
      </ComponentWithStatus>
    </Box>
  );
}

function TwitterAuthRequire() {
  return (
    <Paper
      sx={{
        p: 3,
        py: 6,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="body2" color="text.label1" mb={2}>
        You are not verify your Twitter account
      </Typography>
      <Button variant="contained">Verify</Button>
    </Paper>
  );
}

function TelegramAuthRequire() {
  return (
    <Paper
      sx={{
        p: 3,
        py: 6,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="body2" color="text.label1" mb={2}>
        You are not verify your Telegram account
      </Typography>
      <Button variant="contained">Verify</Button>
    </Paper>
  );
}
