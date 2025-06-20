import useDialogState from "@centic-scoring/hooks/common/useDialogState";
import { useAppDispatch, useKOLsSelector } from "@centic-scoring/redux/hook";
import { Box, Button, Dialog, Radio, Typography } from "@mui/material";
import { ArrowDropDownIcon } from "@mui/x-date-pickers";
import { capitalize } from "lodash";
import React, { ReactNode, useState } from "react";
import { TKOLsSlice, updateFilter } from "@centic-scoring/redux/slices/kols";
import {
  BestFitIcon,
  CommentIcon,
  FollowerIcon,
  ImpressionIcon,
  RetweetIcon,
} from "@centic-scoring/icons/affiliate";
import { LikeIcon } from "@centic-scoring/icons";

const sortByOptions: NonNullable<TKOLsSlice["kolsFilter"]["sortType"]>[] = [
  "followers",
  "likes",
  "replies",
  "retweets",
  "views",
  "bestFit",
];
// eslint-disable-next-line no-undef, no-unused-vars
const iconMap: { [key in (typeof sortByOptions)[number]]: ReactNode } = {
  followers: <FollowerIcon sx={{ fontSize: "1rem" }} />,
  bestFit: <BestFitIcon sx={{ fontSize: "1.3rem" }} />,
  likes: <LikeIcon sx={{ fontSize: "1.2rem" }} />,
  replies: <CommentIcon sx={{ fontSize: "1rem" }} />,
  retweets: <RetweetIcon sx={{ fontSize: "1rem" }} />,
  views: <ImpressionIcon sx={{ fontSize: "1rem" }} />,
};

export default function SortBy() {
  const { handleClose, handleOpen, open } = useDialogState();
  return (
    <Box mr={1}>
      <Dialog open={open} onClose={handleClose}>
        <Content handleClose={handleClose} />
      </Dialog>
      <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
        <Typography variant="body2" fontWeight={500} onClick={handleOpen}>
          Sort by
        </Typography>
        <ArrowDropDownIcon color="info" />
      </Box>
    </Box>
  );
}

function Content({ handleClose }: { handleClose: () => void }) {
  const { kolsFilter } = useKOLsSelector();
  const [type, setType] = useState<TKOLsSlice["kolsFilter"]["sortType"]>(kolsFilter.sortType);
  const dispatch = useAppDispatch();

  const handleSetType = (selectedType: NonNullable<TKOLsSlice["kolsFilter"]["sortType"]>) => {
    setType((prev) => {
      if (prev === selectedType) {
        return undefined;
      } else {
        return selectedType;
      }
    });
  };

  const handleConfirm = () => {
    dispatch(
      updateFilter({
        sortType: type,
        page: 0,
      })
    );
    handleClose();
  };

  return (
    <Box
      sx={{
        minWidth: "300px",
        minHeight: "200px",
        p: 3,
        backgroundColor: "background.paper",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Typography variant="body2" fontWeight={600} color="text.primary" mb={1}>
          Sort by
        </Typography>
        <Box sx={{ maxHeight: "400px", overflowY: "auto", ml: -1.5 }} className="custom-scrollbar">
          {sortByOptions.map((option, index) => {
            return (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  pl: 1.5,
                  cursor: "pointer",
                }}
                key={index}
                onClick={() => handleSetType(option)}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }} color="text.label1">
                  {iconMap[option]}
                  <Typography variant="body1" fontWeight={500} color="text.label1">
                    {capitalize(option)}
                  </Typography>
                </Box>
                <Radio checked={type === option} value={type === option} color="info" />
              </Box>
            );
          })}
        </Box>
      </Box>
      <Box
        mt={2}
        display="flex"
        sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
      >
        <Button variant="outlined" onClick={handleClose} fullWidth sx={{ mr: 0.5 }}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleConfirm} fullWidth sx={{ ml: 0.5 }}>
          Confirm
        </Button>
      </Box>
    </Box>
  );
}
