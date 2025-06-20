import { Box, Checkbox, Paper, Popover, Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useAppDispatch, useKOLsReportSelector } from "@centic-scoring/redux/hook";
import { toggleKOLsAnalysisFilter } from "@centic-scoring/redux/slices/kols-report";
import React, { useState } from "react";

export default function KOLsFilterAnalysis() {
  const { filter } = useKOLsReportSelector();
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const id = open ? "filter-menu-kol-analysis" : undefined;
  return (
    <Box>
      <Box
        sx={{
          backgroundColor: "background.primary",
          borderRadius: 2,
          py: 1.1,
          px: 2,
          display: "inline-block",
          cursor: "pointer",
        }}
        onClick={(e) => {
          handleClick(e);
        }}
      >
        <Typography fontWeight={500} sx={{ display: "flex", alignItems: "center" }}>
          KOLs/Influencers ({Object.values(filter.kolsAnalysis || {}).filter((i) => i).length})
          <ArrowDropDownIcon color="info" sx={{ ml: 1 }} />
        </Typography>
      </Box>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Content />
      </Popover>
    </Box>
  );
}

const Content = () => {
  const { filter } = useKOLsReportSelector();
  const dispatch = useAppDispatch();
  return (
    <Paper sx={{ py: 3 }}>
      <Box sx={{ pl: 1.5, pr: 3, minWidth: "200px" }}>
        {Object.entries(filter.kolsAnalysis).map(([key, data]) => {
          return (
            <Box
              key={key}
              sx={{ display: "flex", cursor: "pointer" }}
              onClick={() => {
                dispatch(toggleKOLsAnalysisFilter(key));
              }}
            >
              <Checkbox color="info" value={data} checked={data} />
              <Typography variant="body1" ml={1} mt={1.3} fontWeight={500} color="text.label1">
                {key}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
};
