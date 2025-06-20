import { Box } from "@mui/material";
import OfferForm from "./OfferForm";

export default function UpgradeOfferForm({ type }: { type?: boolean }) {
  return (
    <Box>
      <OfferForm type={type} />
    </Box>
  );
}
