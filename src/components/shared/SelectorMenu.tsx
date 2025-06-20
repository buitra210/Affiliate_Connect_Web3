import MenuIcon from "@mui/icons-material/Menu";
import { Box, MenuItem, Paper, Popover, SxProps, Theme, Typography } from "@mui/material";
import React, { useState } from "react";

type Props = {
  // eslint-disable-next-line no-unused-vars
  onChange: (item: string) => void;
  options: string[] | { name: string; value: string }[];
  initValue?: string;
  textStyle?: SxProps<Theme>;
};
export default function SelectorMenu({ onChange, options, initValue, textStyle }: Props) {
  const [anchorEl, setAnchorEl] = useState<HTMLSpanElement | null>(null);
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [selected, setSelected] = useState<string>(
    initValue || (typeof options[0] === "string" ? options[0] : options[0]?.name) || ""
  );

  const handleClick = (event: React.MouseEvent<HTMLSpanElement>) => {
    setOpen(true);
    setAnchorEl(event.currentTarget);
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Popover
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        onClose={() => {
          setOpen(false);
        }}
        sx={{
          maxHeight: "300px",
          "& ::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Paper
          sx={{
            boxShadow: "0px 2px 8px 0px #5185AA4A",
            borderRadius: 2,
          }}
        >
          {options.map((item, index) => {
            return (
              <Box
                onClick={() => {
                  setOpen(false);
                  setSelected(typeof item === "string" ? item : item.value);
                  onChange(typeof item === "string" ? item : item.value);
                }}
                key={index}
              >
                <MenuItem sx={{ height: "46px" }}>
                  <Typography
                    variant="body1"
                    sx={{
                      color: `${
                        (typeof item === "string" ? item : item.value) == selected
                          ? "text.active"
                          : "#C1ECFD"
                      }`,
                      fontWeight: `${
                        (typeof item === "string" ? item : item.value) == selected ? "600" : "400"
                      }`,
                      ...textStyle,
                    }}
                  >
                    {typeof item === "string" ? item : item.name}
                  </Typography>
                </MenuItem>
              </Box>
            );
          })}
        </Paper>
      </Popover>
      <Box
        onClick={(e) => {
          handleClick(e);
        }}
      >
        <MenuIcon sx={{ color: "text.active", cursor: "pointer" }} fontSize="medium" />
      </Box>
    </Box>
  );
}
