import ComponentWithStatus from "@centic-scoring/components/ComponentWithStatus";
import { BackIcon } from "@centic-scoring/icons";
import { Box, IconButton, Typography } from "@mui/material";
import AboutOffer from "../AboutOffer";
import useKOLsConnectparams from "../../hooks/useKOLsConnectParams";
import { useAppDispatch, useKOLOfferSelector } from "@centic-scoring/redux/hook";
import useURLQuery from "@centic-scoring/hooks/common/useUrlQuery";
import { useEffect, useState } from "react";
import {
  getOfferDetail,
  getOfferOtherVersion,
} from "@centic-scoring/redux/slices/kol-offer/fetchFunctions";
import OfferOverview from "../OfferOverview";

export default function OfferViewOnly() {
  const { offerID, resetParam, setParams } = useKOLsConnectparams();
  const { kolDetailStatus, history } = useKOLOfferSelector();
  const { id } = useURLQuery();
  const [type, setType] = useState<string>("");
  const [historyId, setHistoryId] = useState<string>("");

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (type === "Current" || type === "") {
      dispatch(getOfferDetail({ id, offerID }));
    }
    if (type === "Upgrading" || type === "History") {
      dispatch(getOfferOtherVersion({ id, offerID, type: type, historyId }));
    }
  }, [id, offerID, dispatch, type, historyId]);

  useEffect(() => {
    if (type === "Current" || type === "") {
      setParams(
        "activeNotiId",
        history.data?.data?.find((item) => item.type === "Current")?.id || ""
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history, type]);
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
          {<OfferOverview type="view" />}

          {/* <UpgradeOfferForm /> */}
          <AboutOffer
            setHistoryType={(type, id) => {
              setType(type);
              setHistoryId(id);
            }}
          />
        </Box>
      </ComponentWithStatus>
      {/* <Box sx={{ mt: 2 }}>
            <Navigation />
          </Box> */}
    </Box>
  );
}
