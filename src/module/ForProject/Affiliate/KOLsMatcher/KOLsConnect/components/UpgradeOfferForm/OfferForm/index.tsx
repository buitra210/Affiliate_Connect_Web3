import { Box, Paper, Typography } from "@mui/material";
import Introduction from "./Introduction";
import Requirements from "./Requirements";
import Payments from "./Payments";
import ContactInfo from "./ContactInfo";
import { WarningIcon } from "@centic-scoring/icons";
import Navigation from "../Navigation";

export default function OfferForm({ type }: { type?: boolean }) {
  return (
    <Paper sx={{ px: 5, py: 4 }}>
      <Introduction />
      <Requirements />
      <Payments />
      <ContactInfo />
      <Box sx={{ display: "flex", alignItems: "center", mb: 8 }}>
        <WarningIcon fontSize="small" />
        <Typography variant="body2" color={"text.label1"} ml={1}>
          If you confirm the information in the above contract, please press the create button.
        </Typography>
      </Box>
      <Navigation type={type} />
    </Paper>
  );
}
