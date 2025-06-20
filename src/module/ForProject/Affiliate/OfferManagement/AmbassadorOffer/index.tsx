import { Box } from "@mui/material";
import useAmbassConnectParam from "../../AmbassadorMatcher/AmbassadorConnection/hooks/useAmbassConnectParams";
import OfferList from "./components/OfferList";
import OfferDetail from "./components/OfferDetail";
import NewOfferForm from "../../AmbassadorMatcher/AmbassadorConnection/components/NewOfferForm";
import NewOfferOverview from "../../AmbassadorMatcher/AmbassadorConnection/components/NewOfferForm/NewOfferOverview";
import DataFetcher from "../../AmbassadorMatcher/AmbassadorConnection/components/DataFetcher";

export default function AmbassadorOffer() {
  const { offerID, newOffer, action } = useAmbassConnectParam();

  return (
    <Box>
      <DataFetcher />
      {!newOffer && !offerID && <OfferList />}
      {offerID && !newOffer && <OfferDetail />}
      {newOffer && !offerID && action !== "view" && <NewOfferForm />}
      {newOffer && !offerID && action === "view" && <NewOfferOverview />}
    </Box>
  );
}
