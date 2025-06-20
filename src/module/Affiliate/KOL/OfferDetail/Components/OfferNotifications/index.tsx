import {
  FormatTimeNotification,
  getStatusColor,
} from "@centic-scoring/components/AffiliateNotification";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Dialog,
  //   Divider,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import CircleIcon from "@mui/icons-material/Circle";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useKolUserSelector } from "@centic-scoring/redux/hook";
import {
  fetchRequestUpgrade,
  putKolUserOfferUpgrade,
  RTRequestUpgradeOffer,
  updateKolUserNotificationStatus,
} from "@centic-scoring/api/services/affiliate/affiliate";
import useURLQuery from "@centic-scoring/hooks/common/useUrlQuery";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { getKOLUserNotifications } from "@centic-scoring/redux/slices/kol-user/fetchFuntions";
import ComponentWithStatus from "@centic-scoring/components/ComponentWithStatus";
import useDialogState from "@centic-scoring/hooks/common/useDialogState";
import { useEffect, useState } from "react";
import OfferOverview from "../OfferOverview";
import { StateStatus } from "@centic-scoring/components/component";
export default function OfferNotifications() {
  const { notification } = useKolUserSelector().offers;

  const handleRead = async (notificationId: string) => {
    updateKolUserNotificationStatus(notificationId);
  };

  return (
    <Paper>
      <Box pb={4}>
        {notification.data?.data?.map((item) => {
          return (
            <Box
              sx={{
                width: "100%",
                mb: 1,
              }}
              key={item.id}
            >
              <MenuItem
                sx={{
                  height: "auto",
                  minHeight: "70px",
                  "&:hover": { backgroundColor: "#CDFEE1" },
                  borderLeft: `3px solid ${getStatusColor(item.type)}`,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  backgroundColor: item.read ? "unset" : "#CDFEE1",
                }}
                onClick={() => {
                  if (!item.read && handleRead) {
                    handleRead(item.id);
                  }
                }}
              >
                {item.type === "Upgrade" && (
                  <RequestComponent
                    title={item.content}
                    time={item.createTime}
                    read={item.read}
                    requestStatus={item.requestStatus}
                    requestId={item.requestId}
                    type={item.type}
                  />
                )}
                {item.type !== "Upgrade" && (
                  <>
                    <Typography
                      variant="body2"
                      fontWeight={600}
                      sx={{
                        wordBreak: "break-word",
                        whiteSpace: "wrap",
                      }}
                      color={item.read ? "text.label1" : "text.primary"}
                    >
                      {item.content}
                    </Typography>
                    <FormatTimeNotification time={item.createTime} />
                  </>
                )}
              </MenuItem>
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
}

function RequestComponent({
  type,
  read,
  title,
  time,
  mode,
  requestId,
  requestStatus,
}: {
  type: string;
  read: boolean;
  title: string;
  time: number;
  requestId?: string;
  requestStatus: string;
  mode?: string;
}) {
  const { getCustomKey } = useURLQuery();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const offerId = getCustomKey("offerId");
  const { handleClose, handleOpen, open } = useDialogState();
  const [requestUpgrade, setRequestUpgrade] = useState<RTRequestUpgradeOffer>();
  const [status, setStatus] = useState<StateStatus>("IDLE");

  const handleReject = async () => {
    if (requestId) {
      try {
        await putKolUserOfferUpgrade({ offerId: offerId, status: "Reject", requestId: requestId });
        toast.success("Request rejected successfully!");
        router.push(`/affiliate`);
        dispatch(getKOLUserNotifications());
      } catch (error) {
        toast.error((error as Error).message);
      }
    } else {
      toast.error("Request not found");
    }
  };

  const handleAccept = async () => {
    if (requestId) {
      try {
        await putKolUserOfferUpgrade({
          offerId: offerId,
          status: "Accept",
          requestId: requestId,
        });
        toast.success("Request accepted successfully!");
        router.push("/affiliate");
        dispatch(getKOLUserNotifications());
      } catch (error) {
        toast.error((error as Error).message);
      }
    } else {
      toast.error("Request not found");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setStatus("PROCESSING");
      if (requestId && type === "Upgrade") {
        try {
          const res = await fetchRequestUpgrade(offerId, requestId);
          setRequestUpgrade(res);
          setStatus("SUCCESS");
        } catch (error) {
          //pass
          setStatus("FAILED");
        }
      }
    };
    fetchData();
  }, [offerId, dispatch, requestId, type]);

  return (
    <Accordion
      sx={{
        "&:hover": { backgroundColor: "#CDFEE1" },
        backgroundColor: "unset",
        "& .MuiAccordionSummary-root": {
          px: 0,
        },
        "& .MuiAccordionDetails-root": {
          px: 0,
        },
        "& .MuiAccordionSummary-expandIconWrapper": {
          ml: 1,
          color: "#009FDB",
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ArrowDropDownIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="body2"
            fontWeight={600}
            sx={{ wordBreak: "break-word", whiteSpace: "wrap" }}
            color={read ? "text.label1" : "text.primary"}
          >
            {title}
          </Typography>
          <FormatTimeNotification time={time} />
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        {/* {type === "project" && (
          <>
            <Divider sx={{ mb: 2 }} />
            {data?.value?.map((item, index) => {
              return (
                <Box key={index} mb={2}>
                  <Typography variant="small" color="text.secondary">
                    {item.type}
                  </Typography>
                  {item.type === "KPI expectation" &&
                    item.detail?.map((detail, index) => {
                      return (
                        <Box sx={{ display: "flex", ml: 4, mt: 1 }} key={index}>
                          <CircleIcon
                            sx={{ fontSize: "0.3rem", color: "text.label1", mr: 0.5, mt: 0.6 }}
                          />
                          <Box>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <Typography variant="extraSmall" color="text.label1" mr={0.5}>
                                {detail.goal}:
                              </Typography>
                              <Typography
                                variant="extraSmall"
                                color="text.primary"
                                fontWeight={500}
                              >
                                {detail.kpi} {detail.kpi > 1 ? "posts" : "post"}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography variant="extraSmall" color="text.label1" mr={0.5}>
                                Time:
                              </Typography>
                              <Typography
                                variant="extraSmall"
                                color="text.primary"
                                fontWeight={500}
                              >
                                {detail.time.value}{" "}
                                {`${detail.time.type}${detail.time.value > 1 ? "s" : ""}`}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      );
                    })}
                  {item.type === "Payment" && (
                    <Box ml={2} mt={1}>
                      <Box sx={{ display: "flex" }}>
                        <Typography variant="small" color="text.label1" mr={0.5} fontWeight={500}>
                          Rule:
                        </Typography>
                        <Typography variant="small" color="text.primary" fontWeight={500}>
                          {item.detail?.rule}
                        </Typography>
                      </Box>
                      <Typography variant="small" color="text.label1" fontWeight={500}>
                        Bonus Reward:
                      </Typography>
                      {item.detail?.bonusReward &&
                        Object.values(item.detail?.bonusReward).map((detail, index) => {
                          return (
                            <Box sx={{ display: "flex", ml: 2, mb: 1 }} key={index}>
                              <CircleIcon
                                sx={{
                                  fontSize: "0.3rem",
                                  color: "text.label1",
                                  mr: 0.5,
                                  mt: 0.6,
                                }}
                              />
                              <Box>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                  <Typography variant="extraSmall" color="text.label1" mr={0.5}>
                                    {detail.goal}:
                                  </Typography>
                                  <Typography
                                    variant="extraSmall"
                                    color="text.primary"
                                    fontWeight={500}
                                  >
                                    {formatNumber(detail.kpiValue)}{" "}
                                    {detail.kpiType?.toLocaleLowerCase()}
                                  </Typography>
                                </Box>
                                <Box>
                                  <Typography variant="extraSmall" color="text.label1" mr={0.5}>
                                    Reward:
                                  </Typography>
                                  <Typography
                                    variant="extraSmall"
                                    color="text.primary"
                                    fontWeight={500}
                                  >
                                    {detail.rewardValue * 100}%
                                  </Typography>
                                </Box>
                              </Box>
                            </Box>
                          );
                        })}
                    </Box>
                  )}
                  {item.type === "Other" && (
                    <Box ml={2}>
                      <Typography
                        variant="small"
                        color="text.label1"
                        fontWeight={600}
                        sx={{ wordBreak: "break-word", whiteSpace: "wrap" }}
                      >
                        {item.detail}
                      </Typography>
                    </Box>
                  )}
                </Box>
              );
            })}
          </>
        )} */}

        {type === "Upgrade" && (
          <Box mb={2}>
            <Typography variant="small" color="text.primary">
              You can see the details in{" "}
              <Box component="span" onClick={handleOpen}>
                <Typography variant="small" sx={{ textDecoration: "underline", cursor: "pointer" }}>
                  here
                </Typography>
              </Box>
            </Typography>
          </Box>
        )}

        {(mode === "view" || mode === undefined) && requestStatus === "Pending" && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "& .MuiButton-root": {
                minWidth: "100px",
              },
              gap: 1,
            }}
          >
            <LoadingButton variant="outlined" onClick={handleReject}>
              Reject
            </LoadingButton>
            <Button variant="contained" onClick={handleAccept}>
              Accept
            </Button>
          </Box>
        )}
      </AccordionDetails>
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
          <ComponentWithStatus status={status}>
            <Typography variant="h2" mb={6} sx={{ textAlign: "center" }}>
              {requestUpgrade?.data?.title?.toLocaleUpperCase()}
            </Typography>
            {requestUpgrade?.data && <OfferOverview data={requestUpgrade.data} />}
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
              <LoadingButton variant="outlined" onClick={handleReject}>
                Reject
              </LoadingButton>
              <LoadingButton variant="contained" onClick={handleAccept}>
                Accept
              </LoadingButton>
            </Box>
          </ComponentWithStatus>
        </Paper>
      </Dialog>
    </Accordion>
  );
}
