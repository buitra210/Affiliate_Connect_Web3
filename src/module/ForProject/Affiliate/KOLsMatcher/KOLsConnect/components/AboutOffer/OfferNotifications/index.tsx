import {
  KOLConnectAPI,
  RTRequestNotification,
} from "@centic-scoring/api/services/affiliate/affiliate";
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
  Divider,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CircleIcon from "@mui/icons-material/Circle";
import { formatNumber } from "@centic-scoring/utils/string/stringUtils";
import { useAppDispatch, useKOLOfferSelector } from "@centic-scoring/redux/hook";
import {
  getProjectNotification,
  getProjectNotifications,
} from "@centic-scoring/redux/slices/kol-offer/fetchFunctions";
import useURLQuery from "@centic-scoring/hooks/common/useUrlQuery";
import useKOLsConnectparams from "../../../hooks/useKOLsConnectParams";
import { toast } from "react-toastify";
import { editForm, editUpgradeType } from "@centic-scoring/redux/slices/kol-offer";
import { LoadingButton } from "@mui/lab";
import { useEffect, useState } from "react";

export default function ProjectOfferNotifications({ handleOpen }: { handleOpen: () => void }) {
  const { notification } = useKOLOfferSelector();
  const { offerID } = useKOLsConnectparams();

  const dispatch = useAppDispatch();
  const { id } = useURLQuery();

  const handleRead = async (notificationId: string) => {
    await KOLConnectAPI.updateNotificationStatus(id, notificationId);
    dispatch(getProjectNotification({ id, offerId: offerID }));
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
                  if (!item.read) {
                    handleRead(item.id);
                  }
                }}
              >
                {item.type === "Request" && (
                  <RequestComponent
                    title={item.content}
                    time={item.createTime}
                    read={item.read}
                    requestStatus={item.requestStatus}
                    requestId={item.requestId}
                    handleOpen={handleOpen}
                    type={item.type}
                  />
                )}
                {item.type !== "Request" && (
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
  read,
  title,
  time,
  requestId,
  requestStatus,
  handleOpen,
  type,
}: {
  read: boolean;
  title: string;
  time: number;
  requestStatus: string;
  requestId?: string;
  handleOpen: () => void;
  type: string;
}) {
  const dispatch = useAppDispatch();
  const { id } = useURLQuery();
  const { offerID, resetParam, mode } = useKOLsConnectparams();
  const { offerForm } = useKOLOfferSelector();
  const [requestData, setRequestData] = useState<RTRequestNotification>();

  useEffect(() => {
    const fetchData = async () => {
      if (requestId && type === "Request") {
        try {
          const res = await KOLConnectAPI.getRequestNotification(id, offerID, requestId);
          setRequestData(res);
        } catch (error) {
          //pass
        }
      }
    };
    fetchData();
  }, [dispatch, id, requestId, offerID, type]);

  const handleReject = async () => {
    try {
      if (requestId) {
        await KOLConnectAPI.updateRequestNotificationStatus(id, offerID, requestId, "Reject");
        toast.success("Request rejected successfully!");
        dispatch(getProjectNotifications({ id }));
        resetParam();
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const handleOpenAccept = () => {
    requestData &&
      requestData.value?.map((item) => {
        if (item.type === "KPI expectation") {
          dispatch(
            editForm({
              kpiExpect: Object.fromEntries(
                item.detail.map((kpi, index) => [
                  `${index}`,
                  {
                    require: {
                      type: kpi.goal,
                      value: kpi.kpi,
                    },
                    timeRequire: {
                      unit: kpi.time.type,
                      value: kpi.time.value,
                    },
                  },
                ])
              ),
            })
          );
        }
        if (item.type === "Payment") {
          dispatch(
            editForm({
              payment: {
                ...offerForm.payment,
                bonus: Object.fromEntries(
                  Object.entries(item.detail.bonusReward).map(([k, v]) => {
                    const newBonus = {
                      goal: v.goal || "",
                      kpi: {
                        value: v.kpiValue || 0,
                        type: v.kpiType || "",
                      },
                      reward: v.rewardValue || 0,
                    };
                    return [k, newBonus];
                  })
                ),
              },
            })
          );
        }
      });
  };
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
          color: "#2ED389",
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
        <Divider sx={{ mb: 2 }} />
        {requestData?.value?.map((item, index) => {
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
                          <Typography variant="extraSmall" color="text.primary" fontWeight={500}>
                            {detail.kpi} {detail.kpi > 1 ? "posts" : "post"}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="extraSmall" color="text.label1" mr={0.5}>
                            Time:
                          </Typography>
                          <Typography variant="extraSmall" color="text.primary" fontWeight={500}>
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
                                {formatNumber(detail.rewardValue, {
                                  fractionDigits: 2,
                                  suffix: "%",
                                })}
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

        {/* {type === "kol" && (
          <Box mb={2}>
            <Typography variant="small" color="text.primary">
              You can see the details in{" "}
              <Box component="span" onClick={handleClickHere}>
                <Typography variant="small" sx={{ textDecoration: "underline", cursor: "pointer" }}>
                  here
                </Typography>
              </Box>
            </Typography>
          </Box>
        )} */}
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
            <Button
              variant="contained"
              onClick={() => {
                handleOpen();
                dispatch(editUpgradeType("By request")), handleOpenAccept();
              }}
            >
              Accept
            </Button>
          </Box>
        )}
      </AccordionDetails>
    </Accordion>
  );
}
