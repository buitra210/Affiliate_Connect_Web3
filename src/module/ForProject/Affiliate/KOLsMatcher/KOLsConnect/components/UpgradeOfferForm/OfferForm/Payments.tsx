import { Box, Paper, Typography } from "@mui/material";
import Step3 from "../../NewOfferForm/steps/Step3";

export default function Payments() {
  return (
    <Box mb={3}>
      <Typography variant="body1" color="text.secondary">
        3. Payments
      </Typography>
      <Paper
        sx={{
          p: 3,
          backgroundColor: "background.primary",
          borderRadius: 2,
          mt: 1,
        }}
      >
        <Step3 />
      </Paper>
    </Box>
  );
}
