import { TelegramIcon2 } from "@centic-scoring/icons";
import { Box, Typography, Button } from "@mui/material";

export default function Step1() {
  return (
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
        Login with Telegram to see the offer. This is free and will not require a transaction
      </Typography>

      <Button
        variant="outlined"
        color="info"
        fullWidth
        sx={{ display: "flex", alignItems: "center" }}
      >
        <TelegramIcon2 sx={{ mr: 1 }} /> Login with Telegram
      </Button>
    </Box>
  );
}
