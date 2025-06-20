import useURLQuery from "@centic-scoring/hooks/common/useUrlQuery";
import { BackIcon } from "@centic-scoring/icons";
import { useAmbassdorOfferSelector, useAppDispatch } from "@centic-scoring/redux/hook";
import { Box, IconButton, Typography } from "@mui/material";
import { useEffect } from "react";

import ComponentWithStatus from "@centic-scoring/components/ComponentWithStatus";
import useAmbassConnectParam from "@centic-scoring/module/ForProject/Affiliate/AmbassadorMatcher/AmbassadorConnection/hooks/useAmbassConnectParams";
import { getBaseOfferDetail } from "@centic-scoring/redux/slices/ambassadors-offer/fetchFunctions";
import OfferOverview from "@centic-scoring/module/ForProject/Affiliate/AmbassadorMatcher/AmbassadorConnection/components/OfferOverview/OfferOverview";
import UpgradeOfferForm from "@centic-scoring/module/ForProject/Affiliate/AmbassadorMatcher/AmbassadorConnection/components/UpgradeOfferForm";

export default function OfferDetail() {
  const { id } = useURLQuery();
  const { offerID, mode, resetParam } = useAmbassConnectParam();
  const dispatch = useAppDispatch();
  const { ambassadorDetailStatus } = useAmbassdorOfferSelector();

  useEffect(() => {
    dispatch(getBaseOfferDetail({ id, offerId: offerID }));
  }, [id, offerID, dispatch]);

  return (
    <Box>
      <Box
        mb={3}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={resetParam}>
            <BackIcon />
          </IconButton>
          <Typography variant="h3">Back</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          overflowX: "hidden",
          display: "flex",
        }}
      >
        <Box sx={{ width: "auto", flexGrow: 1 }}>
          <ComponentWithStatus status={ambassadorDetailStatus}>
            {mode === "editable" && <UpgradeOfferForm type={true} />}
            {mode === "view" && <OfferOverview type="manager" />}
          </ComponentWithStatus>
        </Box>
      </Box>
    </Box>
  );
}
