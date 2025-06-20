import { Box, Paper, Typography } from "@mui/material";
import ContractInfo from "../../NewOfferForm/steps/Step4/ContractInfo";

export default function ContactInfo() {
  return (
    <Box mb={3}>
      <Typography variant="body1" color="text.secondary">
        4. Contact Information
      </Typography>
      <Paper
        sx={{
          p: 3,
          backgroundColor: "background.primary",
          borderRadius: 2,
          mt: 1,
        }}
      >
        <ContractInfo editable />
      </Paper>
    </Box>
  );
}
