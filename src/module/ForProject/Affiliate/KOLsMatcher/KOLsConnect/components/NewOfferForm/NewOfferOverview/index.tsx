import { BackIcon } from "@centic-scoring/icons";
import { Box, IconButton, Typography } from "@mui/material";
import useKOLsConnectparams from "../../../hooks/useKOLsConnectParams";
import OfferOverview from "../../OfferOverview";

export default function NewOfferOverview() {
  const { resetParam } = useKOLsConnectparams();
  return (
    <Box
      sx={{
        "& .failed-container": {
          my: 18,
        },
        "& .loading-container": {
          my: 18,
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <IconButton onClick={resetParam}>
          <BackIcon />
        </IconButton>
        <Typography variant="h3">Back</Typography>
      </Box>
      <OfferOverview type="create" />
    </Box>
  );
}
