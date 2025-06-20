import { Box, Paper, Typography } from "@mui/material";
import Introduction from "./Introduction";
import Requirements from "./Requirements";
import Payments from "./Payments";
import ContractInfo from "./ContractInfo";

export default function Step4() {
  return (
    <Paper
      sx={{
        "& .step-summ-container": { mb: 3 },
        p: 3,
        "& .info-container": { p: 3, backgroundColor: "background.primary", borderRadius: 2 },
      }}
    >
      <Box className="step-summ-container">
        <Typography color="text.label1" mb={1}>
          1. Introduction
        </Typography>
        <Box className="info-container">
          <Introduction />
        </Box>
      </Box>
      <Box className="step-summ-container">
        <Typography color="text.label1" mb={1}>
          2. Requirements
        </Typography>
        <Box className="info-container">
          <Requirements />
        </Box>
      </Box>
      <Box className="step-summ-container">
        <Typography color="text.label1" mb={1}>
          3. Payments
        </Typography>
        <Box className="info-container">
          <Payments />
        </Box>
      </Box>
      <Box className="step-summ-container">
        <Typography color="text.label1" mb={1}>
          4. Contact information
        </Typography>
        <Box className="info-container">
          <ContractInfo editable />
        </Box>
      </Box>
    </Paper>
  );
}
