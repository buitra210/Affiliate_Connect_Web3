import { BackIcon } from "@centic-scoring/icons";
import { Box, IconButton, Typography } from "@mui/material";
import useKOLsConnectparams from "../../hooks/useKOLsConnectParams";
// import StepperIcon from "@centic-scoring/module/Web3Growth/Campaigns/CreateCampaign/StepperIcon";
// import Steplabel from "@centic-scoring/module/Web3Growth/Campaigns/CreateCampaign/steps/StepLabel";
// import Step1 from "./steps/Step1";
// import Step2 from "./steps/Step2";
// import Step3 from "./steps/Step3";
// import Step4 from "./steps/Step4";
// import OfferPopup from "./OfferPopup";

// const steps = ["Introduction", "Requirements", "Payment", "Review"];
import OfferForm from "../OfferForm";
import Navigation from "./Navigation";
import { useAppDispatch, useKOLOfferSelector } from "@centic-scoring/redux/hook";
import { getBaseOfferDetail } from "@centic-scoring/redux/slices/kol-offer/fetchFunctions";
import { useEffect } from "react";
import useURLQuery from "@centic-scoring/hooks/common/useUrlQuery";
import ComponentWithStatus from "@centic-scoring/components/ComponentWithStatus";

export default function NewOfferForm() {
  const { removeParams, initOfferId } = useKOLsConnectparams();
  const { kolDetailStatus } = useKOLOfferSelector();
  const { id } = useURLQuery();
  const dispatch = useAppDispatch();

  const handleBack = () => {
    removeParams("newOffer");
  };

  useEffect(() => {
    if (id && initOfferId) {
      dispatch(getBaseOfferDetail({ id, offerID: initOfferId }));
    }
  }, [id, initOfferId, dispatch]);

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton onClick={handleBack}>
          <BackIcon />
        </IconButton>
        <Typography variant="h3">Create New Offer</Typography>
      </Box>
      {!initOfferId && <OfferForm />}
      {initOfferId && (
        <ComponentWithStatus status={kolDetailStatus}>
          <OfferForm />
        </ComponentWithStatus>
      )}
      <Box sx={{ mt: 3 }}>
        <Navigation />
      </Box>
    </Box>
  );
}
