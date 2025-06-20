import RangeFilter from "@centic-scoring/components/RangeFilter";
import useDialogState from "@centic-scoring/hooks/common/useDialogState";
import { useAppDispatch, useKOLsSelector } from "@centic-scoring/redux/hook";
import { updateFilter } from "@centic-scoring/redux/slices/kols";
import { Box, Button, Dialog, Radio, Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useState } from "react";

const inputRange: { label: string; valueStart: number; valueEnd: number }[] = [
  { label: "< 100,000", valueStart: 0, valueEnd: 100000 },
  { label: "100,000 - 200,000", valueStart: 100000, valueEnd: 200000 },
  { label: "200,000 - 500,000", valueStart: 200000, valueEnd: 500000 },
  { label: "500,000 - 1,000,000", valueStart: 500000, valueEnd: 1000000 },
  { label: "> 1,000,000", valueStart: 1000000, valueEnd: 1000001 },
];

export default function FollowerFilters() {
  const { handleClose, handleOpen, open } = useDialogState();
  return (
    <Box mr={1}>
      <Dialog open={open} onClose={handleClose}>
        <Content handleClose={handleClose} />
      </Dialog>
      <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
        <Typography variant="body2" fontWeight={500} onClick={handleOpen}>
          Followers
        </Typography>
        <ArrowDropDownIcon color="info" />
      </Box>
    </Box>
  );
}

function Content({ handleClose }: { handleClose: () => void }) {
  const { kolsFilter } = useKOLsSelector();
  const dispatch = useAppDispatch();
  const rangeStart = 0;
  const rangeEnd = 1000001;
  const [value, setValue] = useState<[number, number]>([
    kolsFilter.followers_min || rangeStart,
    kolsFilter.followers_max || rangeEnd,
  ]);
  const handleConfirm = () => {
    dispatch(
      updateFilter({
        followers_min: value[0],
        followers_max: value[1] >= 1000001 ? undefined : value[1],
        page: 0,
      })
    );
    handleClose();
  };

  return (
    <Box sx={{ minWidth: "300px", minHeight: "300px", p: 3, backgroundColor: "background.paper" }}>
      <Typography variant="body2" fontWeight={600} color="text.primary" mb={1}>
        Follower
      </Typography>
      <Box>
        {inputRange.map((i, index) => {
          return (
            <Box sx={{ display: "flex", alignItems: "center", ml: -1 }} key={index}>
              <Radio
                checked={value[0] === i.valueStart && value[1] === i.valueEnd}
                color="info"
                onClick={() => {
                  setValue([i.valueStart, i.valueEnd]);
                }}
              />
              <Typography variant="body1" fontWeight={500} color={"text.label1"}>
                {i.label}
              </Typography>
            </Box>
          );
        })}
      </Box>

      <Box>
        <Typography variant="body2" fontWeight={600} color="text.primary" mt={2} mb={1}>
          Or Choose the optional
        </Typography>

        <RangeFilter
          value={value}
          updateValue={value}
          rangeStart={rangeStart}
          rangeEnd={rangeEnd}
          onValueChange={(newValue) => {
            setValue(newValue);
          }}
          minDistance={20000}
        />
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
