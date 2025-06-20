import { Box, MenuItem, MenuList, Typography } from "@mui/material";
import { useTimeFilterContext } from "./context";
import { useMemo } from "react";

export default function MenuTimeList() {
  const { setEndTime, setStartTime } = useTimeFilterContext();

  const startDate = useMemo(() => {
    const activeDay = new Date(new Date().setHours(0, 0, 0));
    const dayInWeek = activeDay.getDay();
    return new Date(new Date().setHours(0, 0, 0)).setDate(activeDay.getDate() - dayInWeek);
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        "& .item": {
          pl: 0,
          height: "44px",
          width: "250px",
        },
      }}
    >
      <Box sx={{ pb: 3, mr: 3 }}>
        <Typography variant="h6" color="text.secondary">
          Time Range
        </Typography>
      </Box>
      <MenuList
        sx={{
          ml: -3,
          "& .MuiMenuItem-root": {
            px: 3,
            width: "100%",
          },
        }}
      >
        <MenuItem
          className="item"
          onClick={() => {
            setStartTime(new Date(new Date().setHours(0, 0, 0)).getTime());
            setEndTime(Date.now());
          }}
        >
          <Typography variant="body1" color="text.label1">
            Today
          </Typography>
        </MenuItem>
        <MenuItem
          className="item"
          onClick={() => {
            setStartTime(Date.now() - 2 * 86400 * 1000);
            setEndTime(Date.now() - 86400 * 1000);
          }}
        >
          <Typography variant="body1" color="text.label1">
            Yesterday
          </Typography>
        </MenuItem>
        <MenuItem
          className="item"
          onClick={() => {
            setStartTime(startDate);
            setEndTime(Date.now());
          }}
        >
          <Typography variant="body1" color="text.label1">
            This week (Sunday - Today)
          </Typography>
        </MenuItem>
        <MenuItem
          className="item"
          onClick={() => {
            setStartTime(startDate - 7 * 86400 * 1000);
            setEndTime(startDate - 1000);
          }}
        >
          <Typography variant="body1" color="text.label1">
            Last week (Sunday - Saturday)
          </Typography>
        </MenuItem>
        <MenuItem
          className="item"
          onClick={() => {
            setStartTime(Date.now() - 7 * 86400 * 1000);
            setEndTime(Date.now());
          }}
        >
          <Typography variant="body1" color="text.label1">
            7 days ago
          </Typography>
        </MenuItem>
        <MenuItem
          className="item"
          onClick={() => {
            setStartTime(Date.now() - 28 * 86400 * 1000);
            setEndTime(Date.now());
          }}
        >
          <Typography variant="body1" color="text.label1">
            28 days ago
          </Typography>
        </MenuItem>
        <MenuItem
          className="item"
          onClick={() => {
            setStartTime(Date.now() - 30 * 86400 * 1000);
            setEndTime(Date.now());
          }}
        >
          <Typography variant="body1" color="text.label1">
            30 days ago
          </Typography>
        </MenuItem>
        <MenuItem
          className="item"
          onClick={() => {
            setStartTime(Date.now() - 90 * 86400 * 1000);
            setEndTime(Date.now());
          }}
        >
          <Typography variant="body1" color="text.label1">
            90 days ago
          </Typography>
        </MenuItem>
      </MenuList>
    </Box>
  );
}
