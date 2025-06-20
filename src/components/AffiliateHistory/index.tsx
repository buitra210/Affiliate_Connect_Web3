/* eslint-disable no-unused-vars */
import { RTKOLsOfferHistory } from "@centic-scoring/api/services/affiliate/affiliate";
import { formatTime } from "@centic-scoring/utils/format";
import { Box, MenuItem, Paper, Typography } from "@mui/material";
import useKOLsConnectparams from "@centic-scoring/module/ForProject/Affiliate/KOLsMatcher/KOLsConnect/hooks/useKOLsConnectParams";
import { useKolUserSelector } from "@centic-scoring/redux/hook";
import { useMemo } from "react";
// import { useMemo, useState } from "react";

export default function AffiliateHistory({
  data,
  setHistoryId,
}: {
  data: RTKOLsOfferHistory;
  setHistoryId: (id: string, type: string) => void;
}) {
  const handleClick = (id: string, type: string) => {
    setHistoryId(id, type);
  };
  const { activeNotiId } = useKOLsConnectparams();
  const { activeHistoryId } = useKolUserSelector();
  const activeId = useMemo(() => {
    if (activeHistoryId) {
      return activeHistoryId;
    }
    if (activeNotiId) {
      return activeNotiId;
    }
  }, [activeHistoryId, activeNotiId]);

  return (
    <Paper>
      <Box pb={4}>
        {data?.data?.map((item) => {
          return (
            <MenuItem
              key={item.id}
              sx={{
                height: "70px",
                borderRadius: "10px",
                padding: "10px",
                borderLeft: activeId === item.id ? "4px solid #2ED389" : "4px solid transparent",
                backgroundColor:
                  item.type === "Upgrading"
                    ? "#8EFFC7"
                    : activeId === item.id
                    ? "#CDFEE1"
                    : "unset",
              }}
              onClick={() => {
                handleClick(item.id, item.type);
              }}
            >
              <Box>
                <Typography variant="body2" fontWeight={600}>
                  {formatTime(item.createdTime, { date: true, time: true })}
                </Typography>
                <Typography variant="small"> {item.type}</Typography>
              </Box>
            </MenuItem>
          );
        })}
      </Box>
    </Paper>
  );
}
