/* eslint-disable no-unused-vars */
import { Box, Button, Dialog, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import dynamic from "next/dynamic";
import useKOLsConnectparams from "../../hooks/useKOLsConnectParams";
import { useAppDispatch, useKOLOfferSelector } from "@centic-scoring/redux/hook";
import {
  getOfferDetail,
  getOfferHistory,
  getProjectNotification,
  getProjectNotifications,
} from "@centic-scoring/redux/slices/kol-offer/fetchFunctions";
import useURLQuery from "@centic-scoring/hooks/common/useUrlQuery";
import { KOLConnectAPI } from "@centic-scoring/api/services/affiliate/affiliate";
import { toast } from "react-toastify";
import ComponentWithStatus from "@centic-scoring/components/ComponentWithStatus";
import useDialogState from "@centic-scoring/hooks/common/useDialogState";
import { LoadingButton } from "@mui/lab";
import OfferOverview from "../OfferOverview";
import ProjectOfferNotifications from "./OfferNotifications";
import FilterItem from "@centic-scoring/components/shared/FilterItem";

const AffiliateHistory = dynamic(() => import("@centic-scoring/components/AffiliateHistory"), {
  ssr: false,
});

export default function AboutOffer({
  setHistoryType,
}: {
  setHistoryType: (type: string, id: string) => void;
}) {
  const [openAbout, setOpenAbout] = useState<boolean>(true);
  const { offerID, setMultipleParams } = useKOLsConnectparams();
  const [loading, setLoading] = useState<boolean>(false);

  const { history, notification, offerForm, kolDetailStatus, upgradeType } = useKOLOfferSelector();
  const { id } = useURLQuery();
  const [selected, setSelected] = useState<string>("notification");
  const { handleClose, handleOpen, open } = useDialogState();
  const dispatch = useAppDispatch();

  const handleChange = () => {
    setOpenAbout(!openAbout);
  };
  const tabList = [
    { text: "Notification", value: "notification" },
    { text: "History", value: "history" },
  ];

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      await KOLConnectAPI.upgradeOffer(
        id,
        offerID,
        {
          title: offerForm.name,
          introduction: {
            description: offerForm.description.text,
            featureLink: offerForm.featuredLink,
            featureTitle: offerForm.description.title,
            logo: offerForm.description.logo || "",
          },
          requirements: {
            kpis: Object.values(offerForm.kpiExpect).map((kpi) => {
              return {
                goal: kpi.require.type,
                kpi: kpi.require.value,
                time: {
                  type: kpi.timeRequire.unit,
                  value: kpi.timeRequire.value,
                },
              };
            }),
            custom: offerForm.customizedRequirement.text,
          },
          payments: {
            type: offerForm.payment.type,
            payInfo: {
              token: {
                id: `${offerForm.payment.chains}_${offerForm.payment.token}`,
                address: offerForm.payment.token,
              },
              chainId: offerForm.payment.chains,
              amount: offerForm.payment.amount,
              rule: {
                type: offerForm.payment.rule.type,
                value: {
                  stringValue: offerForm.payment.rule.stringValue || undefined,
                  postValue: offerForm.payment.rule.postPay || undefined,
                  upfrontValue: offerForm.payment.rule.upfrontPay || undefined,
                },
              },
            },
            bonusReward: Object.values(offerForm.payment.bonus || {}).map((bonus) => {
              return {
                goal: bonus.goal,
                kpiType: bonus.kpi?.type,
                kpiValue: bonus.kpi?.value,
                rewardValue: bonus.reward,
              };
            }),
            custom: offerForm.payment.rule.stringValue || "",
          },
          contactInformation: offerForm.contactInformation || "",
        },
        upgradeType
      );
      toast.success("Upgrade successfully!");
      dispatch(getProjectNotifications({ id }));
      dispatch(getOfferDetail({ id, offerID }));
      handleClose();
    } catch (error) {
      toast.error((error as Error).message);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (offerID) {
      dispatch(getOfferHistory({ id, offerId: offerID }));
    }
  }, [offerID, dispatch, id]);

  useEffect(() => {
    if (offerID) {
      dispatch(getProjectNotification({ id, offerId: offerID }));
    }
  }, [offerID, dispatch, id]);

  return (
    <Box
      sx={{
        width: openAbout ? "300px" : 0,
        transition: "width 0.3s ease",
        position: "relative",
        ml: 1.5,
      }}
    >
      <Paper sx={{ minWidth: "300px", px: 2, minHeight: "350px", borderTopLeftRadius: 0 }}>
        <Typography variant="h6" color={"text.secondary"} pt={4} pb={2}>
          About this offer
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {tabList.map((item) => (
            <FilterItem
              key={item.value}
              text={item.text}
              active={selected === item.value}
              onClick={() => setSelected(item.value)}
            />
          ))}
        </Box>
        <Box sx={{ mt: 2, pb: 2 }}>
          {selected === "history" && history.data && (
            <AffiliateHistory
              data={history.data}
              setHistoryId={(id, type) => {
                setMultipleParams({ offerID: offerID, activeNotiId: id });
                setHistoryType(type, id);
              }}
            />
          )}
          {selected === "notification" && notification.data && (
            <>
              <ProjectOfferNotifications handleOpen={handleOpen} />
              <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                  sx: {
                    maxWidth: "1000px",
                  },
                  className: "hide-scrollbar",
                }}
              >
                <Paper sx={{ px: 5, py: 6, width: "100%" }}>
                  <ComponentWithStatus status={kolDetailStatus}>
                    {<OfferOverview type="view" />}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        "& .MuiButton-root": {
                          minWidth: "130px",
                        },
                        mt: 3,
                        gap: 1,
                      }}
                    >
                      <Button variant="outlined" onClick={handleClose}>
                        Cancel
                      </Button>
                      <LoadingButton variant="contained" onClick={handleUpgrade} loading={loading}>
                        Confirm
                      </LoadingButton>
                    </Box>
                  </ComponentWithStatus>
                </Paper>
              </Dialog>
            </>
          )}
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
            {!openAbout ? <KeyboardArrowLeftIcon /> : <KeyboardArrowRightIcon />}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
