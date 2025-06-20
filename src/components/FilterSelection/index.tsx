/* eslint-disable no-unused-vars */
import { Box, Button, Checkbox, MenuItem, Popover, Typography } from "@mui/material";
import React, { ReactNode, useEffect, useState } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
type Options = {
  label: string;
  value: string;
}[];
export default function FilterSelection({
  FilterButton,
  filterOptions,
  onChange,
  value,
}: {
  FilterButton?: ReactNode;
  filterOptions: Options;
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: string[]) => void;
  value?: string[];
}) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? "filter-menu-popover" : undefined;
  const [selected, setSelected] = useState<{
    [value: string]: boolean;
  }>({});
  const handleSelectedChange = (value: string) => {
    setSelected((prev) => {
      const temp = { ...prev, [value]: !prev[value] };
      if (Object.values(temp).filter((item) => item).length > 0) {
        return temp;
      } else {
        return prev;
      }
    });
  };
  useEffect(() => {
    let selectInited: {
      [value: string]: boolean;
    } = {};
    if (value) {
      value.forEach((item) => {
        selectInited[item] = true;
      });
    } else {
      filterOptions.forEach((item) => {
        selectInited[item.value] = true;
      });
    }
    setSelected(selectInited);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterOptions]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (onChange) {
      const resultFiltered = Object.entries(selected)
        .filter(([_, checked]) => checked)
        .map(([valueName, _]) => valueName);
      onChange(resultFiltered);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return (
    <Box>
      {
        <Button
          aria-describedby={id}
          variant="text"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: "150px",
          }}
          onClick={handleClick}
        >
          {FilterButton || (
            <>
              <FilterAltIcon />
              <Typography ml={0.5} variant="body2" color={"text.active"} fontWeight={500}>
                All Dapps
              </Typography>
            </>
          )}
        </Button>
      }
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
        <Box sx={{ py: 1, backgroundColor: "#051119", maxHeight: "400px", overflowY: "auto" }}>
          {filterOptions?.length > 0 &&
            filterOptions.map((item, index) => {
              return (
                <MenuItem
                  key={item.value}
                  disableRipple
                  onClick={() => {
                    handleSelectedChange(item.value);
                  }}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    width: "100%",
                    color: selected[item.value] ? "text.active" : "text.secondary",
                    my: -1,
                  }}
                >
                  <Checkbox
                    sx={{
                      color: "inherit",
                      "&.Mui-checked": {
                        color: "inherit",
                      },
                      backgroundColor: "transparent",
                      ":hover": { backgroundColor: "transparent" },
                    }}
                    checked={Boolean(selected[item.value])}
                    disableRipple
                  />
                  <Typography fontWeight={500} variant="small" mr={2}>
                    {item.label}
                  </Typography>
                </MenuItem>
              );
            })}
          {filterOptions?.length === 0 && (
            <Box>
              <Typography variant="small" color={"text.secondary"}>
                No option
              </Typography>
            </Box>
          )}
        </Box>
      </Popover>
    </Box>
  );
}
