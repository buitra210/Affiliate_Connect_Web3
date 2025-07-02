import { Box, Typography } from "@mui/material";

export default function WalletContent() {
  // Wallet connection disabled since wagmi is removed
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        p: 3,
      }}
    >
      <Typography variant="body1" color="text.secondary" textAlign="center">
        Wallet connection temporarily disabled
      </Typography>
    </Box>
  );
}
