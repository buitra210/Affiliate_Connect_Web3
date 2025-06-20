/* eslint-disable no-unused-vars */
import {
  RTOfferNotification,
  RTRequestNotification,
} from "@centic-scoring/api/services/affiliate/affiliate";
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
import { LoadingButton } from "@mui/lab";
import { useMemo } from "react";

export function getStatusColor(color: string) {
  switch (color) {
    case "Request":
      return "#ed6c02";
    case "Upgrade":
    case "Upgrading":
      return "#2e7d32";
    case "In Progress":
      return "#1976d2";
    case "Done":
    case "Accept":
      return "#0CAD9A";
    case "Reject":
    case "Cancel":
      return "#C22525";
    default:
      return "#CCCCCC";
  }
}

type NotiType = "project" | "kol";
export default function AffiliateNotification({
  data,
  request,
  mode,
  type,
  handleReject,
  handleAccept,
  handleRead,
  handleClickHere,
}: {
  data: RTOfferNotification;
  request?: RTRequestNotification;
  mode?: string;
  type: NotiType;
  handleReject?: () => void;
  handleAccept?: () => void;
  handleRead?: (id: string) => void;
  handleClickHere?: () => void;
}) {
  return (
    <Paper>
      <Box pb={4}>
        {data?.data?.map((item) => {
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
                  "&:hover": { backgroundColor: "#F0FDF4" },
                  borderLeft: `3px solid ${getStatusColor(item.type)}`,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  backgroundColor: item.read ? "unset" : "#F0FDF4",
                }}
                onClick={() => {
                  if (!item.read && handleRead) {
                    handleRead(item.id);
                  }
                }}
              >
                {item.requestId && (
                  <RequestComponent
                    title={item.content}
                    time={item.createTime}
                    data={request}
                    read={item.read}
                    mode={mode}
                    type={type}
                    requestStatus={item.requestStatus}
                    handleReject={handleReject}
                    handleAccept={handleAccept}
                    handleClickHere={handleClickHere}
                  />
                )}
                {!item.requestId && (
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
  data,
  mode,
  requestStatus,
  handleReject,
  handleAccept,
  handleClickHere,
}: {
  type: NotiType;
  read: boolean;
  title: string;
  time: number;
  requestStatus: string;
  data?: RTRequestNotification;
  mode?: string;
  handleReject?: () => void;
  handleAccept?: () => void;
  handleClickHere?: () => void;
}) {
  return (
    <Accordion
      sx={{
        "&:hover": { backgroundColor: "#F0FDF4" },
        backgroundColor: "unset",
        "& .MuiAccordionSummary-root": {
          px: 0,
        },
        "& .MuiAccordionDetails-root": {
          px: 0,
        },
        "& .MuiAccordionSummary-expandIconWrapper": {
          ml: 1,
          color: "#3fc668",
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
        {type === "project" && (
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
        )}
        {type === "kol" && (
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
    </Accordion>
  );
}

export function FormatTimeNotification({ time }: { time: number }) {
  const initTime = useMemo(() => {
    return Date.now() - time * 1000;
  }, [time]);

  return (
    <>
      {initTime > 86400000 && (
        <Typography variant="small" color="text.label1" mt={1}>
          {Math.floor(initTime / 86400000)} {Math.floor(initTime / 86400000) > 1 ? " days" : " day"}
        </Typography>
      )}
      {3600000 < initTime && initTime < 86400000 && (
        <Typography variant="small" color="text.label1" mt={1}>
          {Math.floor(initTime / 3600000)}
          {Math.floor(initTime / 3600000) > 1 ? " hours" : " hour"}
        </Typography>
      )}
      {initTime < 3600000 && (
        <Typography variant="small" color="text.label1" mt={1}>
          {Math.floor(initTime / 60000)} {Math.floor(initTime / 60000) > 1 ? " minutes" : " minute"}
        </Typography>
      )}
    </>
  );
}
