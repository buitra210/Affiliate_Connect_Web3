import { Box } from "@mui/material";
import useKOLsConnectparams from "./hooks/useKOLsConnectParams";
import OfferList from "./components/OfferList";
import NewOfferForm from "./components/NewOfferForm";
import DataFetcher from "./components/DataFetcher";
import OfferRequest from "./components/OfferRequest";
import OfferViewOnly from "./components/OfferViewOnly";
import NewOfferOverview from "./components/NewOfferForm/NewOfferOverview";

export default function KOLsConnect() {
  const { newOffer, offerID, action, initOfferId } = useKOLsConnectparams();
  return (
    <Box>
      <DataFetcher />
      {!newOffer && !offerID && <OfferList />}
      {newOffer && !offerID && action !== "view" && <NewOfferForm />}
      {newOffer && !offerID && action === "view" && <NewOfferOverview />}
      {!newOffer && !offerID && action === "view" && !initOfferId && <NewOfferOverview />}
      {!newOffer && offerID && action === "request" && <OfferRequest />}
      {!newOffer && offerID && action === "in progress" && <OfferRequest />}
      {!newOffer &&
        offerID &&
        (action === "done" ||
          action === "pending" ||
          action === "accept" ||
          action === "reject" ||
          action === "cancel" ||
          action === "upgrading") && <OfferViewOnly />}
    </Box>
  );
}

// ?newOffer=true&newOfferType=&step=4&mode=&offerID=&action=create&initOfferId=52ee8127-4d30-42bb-9c2d-e0878ab5738e&activeNotiId=
// ?newOffer=true&newOfferType=&step=4&mode=&offerID=&action=view&initOfferId=&activeNotiId=
