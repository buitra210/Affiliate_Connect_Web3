import { RTKOLsRPTweet } from "@centic-scoring/api/services/affiliate";
import { Box, Checkbox, Paper, Popover, Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import React, { useState } from "react";

type Props = {
  value: {
    // eslint-disable-next-line no-unused-vars
    [key in keyof RTKOLsRPTweet["tweetsAnalysis"][string][number]]: {
      title: string;
      active?: boolean;
    };
  };
  onChange: (
    // eslint-disable-next-line no-unused-vars
    column: keyof Omit<RTKOLsRPTweet["tweetsAnalysis"][string][number], "kolUserName">
  ) => void;
};

export default function ColumnFilter(props: Props) {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const id = open ? "filter-menu-kol-column-filter" : undefined;

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
        onClick={handleClick}
      >
        <Typography fontWeight={500} sx={{ display: "flex", alignItems: "center" }}>
          Column Selection ({Object.values(props.value || {}).filter((i) => i.active).length})
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
        <Content {...props} />
      </Popover>
    </Box>
  );
}

const Content = ({ value, onChange }: Props) => {
  return (
    <Paper sx={{ py: 3 }}>
      <Box sx={{ pl: 1.5, pr: 3 }}>
        {Object.entries(value).map(([key, data]) => {
          return (
            <Box
              key={key}
              sx={{ display: "flex", cursor: "pointer" }}
              onClick={() => {
                onChange(
                  key as keyof Omit<RTKOLsRPTweet["tweetsAnalysis"][string][number], "kolUserName">
                );
              }}
            >
              <Checkbox color="info" value={data.active} checked={data.active} />
              <Typography variant="body1" ml={1} mt={1.3} fontWeight={500} color="text.label1">
                {data.title}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
};
