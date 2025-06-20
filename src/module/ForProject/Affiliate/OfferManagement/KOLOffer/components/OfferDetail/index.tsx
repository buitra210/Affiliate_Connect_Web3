import useURLQuery from "@centic-scoring/hooks/common/useUrlQuery";
import { BackIcon } from "@centic-scoring/icons";
import {
  useAppDispatch,
  useKOLOfferSelector,
  useOfferManagementSelector,
} from "@centic-scoring/redux/hook";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getKolOfferHistory } from "@centic-scoring/redux/slices/offer-management/fetchFunctions";
import {
  getBaseOfferDetail,
  getOfferOtherVersion,
} from "@centic-scoring/redux/slices/kol-offer/fetchFunctions";
import ComponentWithStatus from "@centic-scoring/components/ComponentWithStatus";
import useKOLsConnectparams from "@centic-scoring/module/ForProject/Affiliate/KOLsMatcher/KOLsConnect/hooks/useKOLsConnectParams";
import dynamic from "next/dynamic";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import UpgradeOfferForm from "@centic-scoring/module/ForProject/Affiliate/KOLsMatcher/KOLsConnect/components/UpgradeOfferForm";
import OfferOverview from "@centic-scoring/module/ForProject/Affiliate/KOLsMatcher/KOLsConnect/components/OfferOverview";
const AffiliateHistory = dynamic(() => import("@centic-scoring/components/AffiliateHistory"), {
  ssr: false,
});
export default function OfferDetail() {
  const [openHistory, setOpenHistory] = useState<boolean>(true);
  const { id } = useURLQuery();
  const { offerID, mode, setParams, resetParam } = useKOLsConnectparams();
  const dispatch = useAppDispatch();
  const { kolDetailStatus } = useKOLOfferSelector();
  const { data, status } = useOfferManagementSelector().kols.history;
  const [type, setType] = useState<string>("");
  const [historyId, setHistoryId] = useState<string>("");

  const handleChange = () => {
    setOpenHistory(!openHistory);
  };

  useEffect(() => {
    if (id && offerID) {
      dispatch(getKolOfferHistory({ id, offerId: offerID }));
    }
  }, [id, offerID, dispatch]);

  useEffect(() => {
    if (type === "Current" || type === "") {
      dispatch(getBaseOfferDetail({ id, offerID }));
    }
    if (type === "Upgrading" || type === "History") {
      dispatch(getOfferOtherVersion({ id, offerID, type: type, historyId }));
    }
  }, [id, offerID, dispatch, type, historyId]);

  useEffect(() => {
    if (type === "Current" || type === "") {
      setParams("activeNotiId", data?.data?.find((item) => item.type === "Current")?.id || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, data]);

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
          gap: openHistory ? 2 : 0,
        }}
      >
        <Box sx={{ width: "auto", flexGrow: 1 }}>
          <ComponentWithStatus status={kolDetailStatus}>
            {mode === "editable" && <UpgradeOfferForm type={true} />}
            {mode === "view" && <OfferOverview type="manager" />}
          </ComponentWithStatus>
        </Box>

        <Box
          sx={{
            width: openHistory ? "300px" : 0,
            transition: "width 0.3s ease",
            position: "relative",
            ml: 2.5,
          }}
        >
          <Box sx={{ minWidth: "300px" }}>
            <Paper sx={{ borderTopLeftRadius: 0 }}>
              <ComponentWithStatus status={status}>
                <Typography variant="h4" py={6} textAlign={"center"}>
                  Offer Upgrade History
                </Typography>
                {data && (
                  <AffiliateHistory
                    data={data}
                    setHistoryId={(id, type) => {
                      setType(type);
                      setHistoryId(id);
                      setParams("activeNotiId", id);
                    }}
                  />
                )}
              </ComponentWithStatus>
            </Paper>
          </Box>
          <Box sx={{ position: "absolute", left: "-24px", top: 0 }}>
            <Box
              onClick={handleChange}
              sx={{
                backgroundColor: "#0D1921",
                "&:hover": {
                  backgroundColor: "#5185AA",
                },
                py: 0.5,
                borderRadius: "12px 0 0 12px",
                width: "24px",
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              {!openHistory ? <KeyboardArrowLeftIcon /> : <KeyboardArrowRightIcon />}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
