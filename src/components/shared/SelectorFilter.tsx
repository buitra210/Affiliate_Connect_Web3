import CenticLoading from "@centic-scoring/components/CenticLoading";
import { SelectArrowIcon } from "@centic-scoring/icons";
import {
  Avatar,
  Box,
  MenuItem,
  Paper,
  Popover,
  SxProps,
  Theme,
  Typography,
  TypographyProps,
} from "@mui/material";
import React, { useEffect, useState } from "react";

type Props = {
  // eslint-disable-next-line no-unused-vars
  onChange: (item: string) => void;
  options: { name: string; value: string; icon?: string }[] | string[];
  initValue?: string;
  textStyle?: SxProps<Theme>;
  postText?: string;
  value?: string;
  loading?: boolean;
  textProps?: TypographyProps;
  disabled?: boolean;
};
export default function SelectorFilter({
  onChange,
  options,
  initValue,
  textStyle,
  postText,
  value,
  loading,
  textProps,
  disabled,
}: Props) {
  const [selected, setSelected] = useState<string>(
    initValue || (typeof options[0] === "string" ? options[0] : options[0]?.name) || ""
  );
  const [anchorEl, setAnchorEl] = useState<HTMLSpanElement | null>(null);
  const [open, setOpen] = useState(false);

  // useEffect(() => {
  //   if (initValue) {
  //     setSelected(initValue);
  //     return;
  //   }
  //   if (typeof options[0] === "string") {
  //     setSelected(options[0]);
  //     return;
  //   }
  //   if (typeof options[0] === "object") {
  //     setSelected(options[0].name);
  //     return;
  //   }
  // }, [initValue, options]);

  const handleClick = (event: React.MouseEvent<HTMLSpanElement>) => {
    if (disabled) {
      return;
    }
    setOpen(true);
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    if (value) {
      let v = "";
      if (typeof options[0] === "string") {
        v = (options as string[]).find((opt) => opt === value) || "";
      }
      if (typeof options[0] === "object") {
        v =
          (options as { name: string; value: string }[]).find((opt) => opt.value === value)?.name ||
          "";
      }
      setSelected(v);
    }
  }, [value, options]);

  return (
    <>
      <Typography
        {...(textProps || {})}
        component={"span"}
        sx={{
          fontWeight: 700,
          backgroundColor: "transparent",
          border: "none",
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          ml: 0.5,
          position: "relative",
          pr: 2,
          ...textStyle,
        }}
        noWrap
        onClick={(e) => {
          handleClick(e);
        }}
        color={textProps?.color || "text.active"}
        variant="inherit"
      >
        {loading && <CenticLoading size={20} />}
        {selected}
        {postText}
        <SelectArrowIcon
          sx={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            ml: 0.2,
            fontSize: "1rem",
            color: "text.active",
            position: "absolute",
            right: "0px",
            top: 2,
          }}
        />
      </Typography>
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
        <Paper sx={{ py: 1 }}>
          {options.map((item, index) => {
            return (
              <MenuItem
                onClick={() => {
                  onChange(typeof item === "string" ? item : item.value);
                  setSelected(typeof item === "string" ? item : item.name);
                  setOpen(false);
                }}
                key={index}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {typeof item !== "string" && item.icon && (
                    <Avatar src={item.icon} sx={{ width: "22px", height: "22px", mr: 1 }} />
                  )}
                  <Typography component={"span"} variant="body1" color={"text.secondary"}>
                    {typeof item === "string" ? item : item.name}
                  </Typography>
                </Box>
              </MenuItem>
            );
          })}
        </Paper>
      </Popover>
    </>
  );
}
