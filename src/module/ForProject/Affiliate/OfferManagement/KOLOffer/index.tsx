import { Box } from "@mui/material";
import OfferList from "./components/OfferList";
import OfferDetail from "./components/OfferDetail";
import useKOLsConnectparams from "../../KOLsMatcher/KOLsConnect/hooks/useKOLsConnectParams";
import NewOfferForm from "../../KOLsMatcher/KOLsConnect/components/NewOfferForm";
import NewOfferOverview from "../../KOLsMatcher/KOLsConnect/components/NewOfferForm/NewOfferOverview";
import DataFetcher from "../../KOLsMatcher/KOLsConnect/components/DataFetcher";

export default function KOLOffer() {
  const { offerID, newOffer, action } = useKOLsConnectparams();

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
