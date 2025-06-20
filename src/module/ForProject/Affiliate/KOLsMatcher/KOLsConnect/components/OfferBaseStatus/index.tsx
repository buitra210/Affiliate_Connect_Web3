import { useKOLOfferSelector } from "@centic-scoring/redux/hook";
import useKOLsConnectparams from "../../hooks/useKOLsConnectParams";
import { Box, IconButton, Typography } from "@mui/material";
import { BackIcon } from "@centic-scoring/icons";
import ComponentWithStatus from "@centic-scoring/components/ComponentWithStatus";
import OfferOverview from "../OfferOverview";

export default function OfferBaseStatus() {
  const { resetParam, mode } = useKOLsConnectparams();
  const { kolDetailStatus } = useKOLOfferSelector();

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
      <ComponentWithStatus status={kolDetailStatus}>
        <Box
          sx={{
            width: "100%",
            overflowX: "hidden",
            display: "flex",
            gap: 2,
          }}
        >
          {mode === "view" && <OfferOverview type="view" />}
        </Box>
      </ComponentWithStatus>
    </Box>
  );
}
