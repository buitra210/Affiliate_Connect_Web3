import useURLQuery from "@centic-scoring/hooks/common/useUrlQuery";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
// import Image from "next/image";
import { useAppDispatch, useKolUserSelector } from "@centic-scoring/redux/hook";
import { useEffect, useState } from "react";
import {
  getKolUsersOfferDetail,
  getKolUsersOfferHistory,
  getKOLUserOfferNotification,
  getKOLOtherVersion,
} from "@centic-scoring/redux/slices/kol-user/fetchFuntions";
import Navigation from "./Components/Navigation";
import { BackIcon } from "@centic-scoring/icons";
import { useRouter } from "next/router";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import dynamic from "next/dynamic";
import ComponentWithStatus from "@centic-scoring/components/ComponentWithStatus";
import Offer from "./Components/Offer";
import { ArrowDropDownIcon } from "@mui/x-date-pickers";
import Progress from "./Components/Progress";
import RequestOffer from "./Components/RequestOffer";
import { setActiveHistoryId } from "@centic-scoring/redux/slices/kol-user";
import OfferNotifications from "./Components/OfferNotifications";
import KOLsBanner from "@centic-scoring/module/ForProject/Affiliate/KOLsMatcher/components/KOLsBanner";
import FilterItem from "@centic-scoring/components/shared/FilterItem";

const AffiliateHistory = dynamic(() => import("@centic-scoring/components/AffiliateHistory"), {
  ssr: false,
});

export default function OfferDetail() {
  const [openHistory, setOpenHistory] = useState<boolean>(true);
  const { detail, history, notification } = useKolUserSelector().offers;
  const { getCustomKey, setCustomKey } = useURLQuery();
  const offerId = getCustomKey("offerId");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [aboutView, setAboutView] = useState<string>("notification");
  const [type, setType] = useState<string>("");
  const [historyId, setHistoryId] = useState<string>("");

  const tabList = [
    { text: "Notification", value: "notification" },
    { text: "History", value: "history" },
  ];
  const handleChange = () => {
    setOpenHistory(!openHistory);
  };

  useEffect(() => {
    if (offerId) {
      dispatch(getKolUsersOfferHistory({ offerId: offerId }));
    }
  }, [offerId, dispatch]);

  useEffect(() => {
    if (offerId) {
      if (type === "Current" || type === "") {
        dispatch(getKolUsersOfferDetail({ offerId: offerId }));
      }
      if (type === "Upgrading" || type === "History") {
        dispatch(getKOLOtherVersion({ offerId: offerId, type: type, historyId: historyId }));
      }
    }
  }, [offerId, dispatch, type, historyId]);

  useEffect(() => {
    if (offerId) {
      dispatch(getKOLUserOfferNotification({ offerId }));
    }
  }, [offerId, dispatch]);

  useEffect(() => {
    if (type === "Current" || type === "") {
      dispatch(setActiveHistoryId(history.data?.data?.find((item) => item.type === "Current")?.id));
    }
  }, [type, history, dispatch]);

  return (
    <Box>
      <Box sx={{ px: 2.5 }}>
        <KOLsBanner
          title="Affiliate"
          src="/affiliate/kol-banner.png"
          content="Manage all of your Affiliate Programs."
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <IconButton
          onClick={() => {
            router.push(`/affiliate?tab=KOL`);
          }}
        >
          <BackIcon />
        </IconButton>
        <Typography variant="h3">Back</Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          overflowX: "hidden",
          display: "flex",
          gap: 2,
        }}
      >
        <Box sx={{ width: "auto", flexGrow: 1 }}>
          <Box sx={{ px: 2, width: "100%" }}>
            <ComponentWithStatus status={detail.status}>
              <Accordion defaultExpanded sx={{ mb: 3.5, py: 4.5, px: 3 }}>
                <AccordionSummary sx={{ color: "#009FDB" }} expandIcon={<ArrowDropDownIcon />}>
                  <Typography variant="h2" sx={{ textAlign: "left" }}>
                    {detail?.data?.offerInfo?.title?.toLocaleUpperCase()}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Offer />
                </AccordionDetails>
              </Accordion>
              {Array.isArray(detail.data?.kpis?.details) &&
                (detail.data?.kpis?.details || []).length > 0 &&
                detail.data?.offerInfo?.status !== "Pending" &&
                detail.data?.offerInfo?.status !== "Request" &&
                detail.data?.offerInfo?.status !== "Reject" && (
                  <Accordion sx={{ py: 4.5, px: 3, mb: 2.5 }}>
                    <AccordionSummary sx={{ color: "#009FDB" }} expandIcon={<ArrowDropDownIcon />}>
                      <Typography variant="h2" sx={{ textAlign: "left" }}>
                        Progress
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Progress />
                    </AccordionDetails>
                  </Accordion>
                )}
              {detail.data?.offerInfo?.status === "Request" && (
                <Accordion sx={{ py: 4.5, px: 3 }}>
                  <AccordionSummary sx={{ color: "#009FDB" }} expandIcon={<ArrowDropDownIcon />}>
                    <Typography variant="h2" sx={{ textAlign: "left" }}>
                      Request
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <RequestOffer />
                  </AccordionDetails>
                </Accordion>
              )}
              <Box sx={{ mt: 3 }}>
                <Navigation offerId={offerId} />
              </Box>
            </ComponentWithStatus>
          </Box>
        </Box>
        {detail.data?.offerInfo?.status != "Pending" && (
          <Box
            sx={{
              width: openHistory ? "300px" : 0,
              transition: "width 0.3s ease",
            }}
          >
            <Paper
              sx={{
                minWidth: "300px",
                position: "relative",
                px: 2,
                minHeight: "350px",
                borderTopLeftRadius: 0,
              }}
            >
              <Typography variant="h6" color={"text.secondary"} pt={4} pb={2}>
                About this offer
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                {tabList.map((item) => (
                  <FilterItem
                    key={item.value}
                    text={item.text}
                    active={aboutView === item.value}
                    onClick={() => setAboutView(item.value)}
                  />
                ))}
              </Box>
              <Box sx={{ mt: 2, pb: 2 }}>
                {aboutView === "history" && history.data && (
                  <AffiliateHistory
                    data={history.data}
                    setHistoryId={(id, type) => {
                      setCustomKey("offerId", offerId);
                      setType(type);
                      setHistoryId(id);
                      dispatch(setActiveHistoryId(id));
                    }}
                  />
                )}
                {aboutView === "notification" && notification.data && <OfferNotifications />}
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
            </Paper>
          </Box>
        )}
      </Box>
    </Box>
  );
}
