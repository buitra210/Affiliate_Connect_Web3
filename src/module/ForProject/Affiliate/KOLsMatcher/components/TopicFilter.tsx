import useDialogState from "@centic-scoring/hooks/common/useDialogState";
import { useAppDispatch, useKOLsSelector } from "@centic-scoring/redux/hook";
import { updateFilter } from "@centic-scoring/redux/slices/kols";
import { Box, Button, Checkbox, Dialog, Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useState } from "react";
import { capitalize } from "lodash";

export default function TopicFilter() {
  const { handleClose, handleOpen, open } = useDialogState();
  return (
    <Box mr={1}>
      <Dialog open={open} onClose={handleClose}>
        <Content handleClose={handleClose} />
      </Dialog>
      <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
        <Typography variant="body2" fontWeight={500} onClick={handleOpen}>
          Topics
        </Typography>
        <ArrowDropDownIcon color="info" />
      </Box>
    </Box>
  );
}

function Content({ handleClose }: { handleClose: () => void }) {
  const { topics, kolsFilter } = useKOLsSelector();
  const dispatch = useAppDispatch();

  const [value, setValue] = useState<{ [key: string]: boolean }>(
    Object.fromEntries(
      (kolsFilter.topics || []).map((i) => {
        return [i, true];
      })
    )
  );

  const handleToogleValue = (value: string) => {
    setValue((prev) => {
      return { ...prev, [value]: !prev[value] };
    });
  };

  const handleConfirm = () => {
    dispatch(
      updateFilter({
        topics: Object.entries(value)
          .filter(([, v]) => {
            return v;
          })
          .map((i) => i[0]),
        page: 0,
      })
    );
    handleClose();
  };

  return (
    <Box sx={{ minWidth: "300px", minHeight: "300px", p: 3, backgroundColor: "background.paper" }}>
      <Typography variant="body2" fontWeight={600} color="text.primary" mb={1}>
        Topic
      </Typography>
      <Box sx={{ maxHeight: "400px", overflowY: "auto", ml: -1.5 }} className="custom-scrollbar">
        {Object.entries(topics.data || {}).map((i, index) => {
          return (
            <Box sx={{ display: "flex", alignItems: "center" }} key={index}>
              <Checkbox
                checked={value[i[0]]}
                value={value[i[0]]}
                color="info"
                onClick={() => {
                  handleToogleValue(i[0]);
                }}
              />
              <Typography variant="body1" fontWeight={500} color={"text.label1"}>
                {capitalize(i[0])}
              </Typography>
            </Box>
          );
        })}
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
