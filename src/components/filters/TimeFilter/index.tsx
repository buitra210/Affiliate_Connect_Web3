import { SelectArrowIcon } from "@centic-scoring/icons";
import { Box, Button, Paper, Popover, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { useCommonDataSelector } from "@centic-scoring/redux/hook";
import dayjs, { Dayjs } from "dayjs";
import { formatTime } from "@centic-scoring/utils/format";
import TimeFilterContextProvider, { useTimeFilterContext } from "./context";
import MenuTimeList from "./MenuList";

export default function TimeFilter() {
  const { timeFilter } = useCommonDataSelector();
  const [anchorEl, setAnchorEl] = useState<HTMLSpanElement | null>(null);
  const [open, setOpen] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLSpanElement>) => {
    setOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Box
        sx={{ display: "flex", mb: 2, alignItems: "center", cursor: "pointer" }}
        onClick={(e) => {
          handleClick(e);
        }}
      >
        <Typography variant="body1" color="text.label" fontWeight={600} mr={1}>
          {formatTime(timeFilter.start / 1000, { date: true })} -{" "}
          {formatTime(timeFilter.end / 1000, { date: true })}
        </Typography>
        <SelectArrowIcon
          sx={{
            fontSize: "1rem",
            color: "text.active",
          }}
        />
      </Box>
      <Popover
        keepMounted={false}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        onClose={() => {
          setOpen(false);
        }}
      >
        <TimeFilterContextProvider>
          <TimeSelect handleCancel={handleCancel} />
        </TimeFilterContextProvider>
      </Popover>
    </Box>
  );
}

function TimeSelect({ handleCancel }: { handleCancel: () => void }) {
  const { endTime, startTime, setStartTime, setEndTime, maxTimeRange, handleApply } =
    useTimeFilterContext();
  const { timeFilter } = useCommonDataSelector();
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <Paper sx={{ p: 3, maxWidth: "650px" }} className="custom-scrollbar">
      <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
        <Box sx={{ display: `${sm ? "" : "none"}`, width: "310px" }}>
          <MenuTimeList />
        </Box>
        <Box sx={{ display: `${sm ? "" : "none"}`, border: "0.5px solid #344456", mr: 2 }} />
        <Box sx={{ display: "flex", flexDirection: "column", width: "330px" }}>
          <Box sx={{ display: "flex", flexDirection: "column", mb: 2 }}>
            <DatePicker
              onChange={(date: Dayjs | null) => {
                const dateValue = Number(date?.toDate().getTime());
                if (startTime - dateValue > maxTimeRange) {
                  setStartTime(dateValue);
                  setEndTime(dateValue + maxTimeRange);
                  return;
                }
                if (endTime && dateValue > endTime) {
                  setEndTime(dateValue);
                  setStartTime(dateValue);
                  return;
                }
                setStartTime(date?.toDate().getTime() ? dateValue : timeFilter.start);
              }}
              disableFuture
              sx={{ mt: 2, width: "296px" }}
              label="Start"
              value={dayjs(Number(startTime) || null)}
            />
            <DatePicker
              // slotProps={{
              //   textField: {
              //     error: Boolean(dataCreateCampaign.campaignData.errorText.end),
              //     helperText: dataCreateCampaign.campaignData.errorText.end,
              //     fullWidth: true,
              //   },
              // }}
              disableFuture
              onChange={(date: Dayjs | null) => {
                const dateValue = Number(date?.toDate().getTime());
                if (dateValue - startTime > maxTimeRange) {
                  setStartTime(dateValue - maxTimeRange);
                  setEndTime(dateValue);
                  return;
                }
                if (dateValue < startTime) {
                  setEndTime(dateValue);
                  setStartTime(dateValue);
                  return;
                }
                setEndTime(date?.toDate().getTime() ? dateValue : timeFilter.end);
              }}
              sx={{ mt: 2, width: "296px" }}
              label="End"
              value={dayjs(Number(endTime) || null)}
            />
          </Box>
        </Box>
      </Box>
      <Box textAlign="end" mt={2}>
        <Button variant="outlined" sx={{ width: "100px", mr: 2 }} onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{ width: "100px" }}
          disabled={!(startTime && endTime)}
          onClick={() => {
            handleApply();
            handleCancel();
          }}
        >
          Apply
        </Button>
      </Box>
    </Paper>
  );
}
