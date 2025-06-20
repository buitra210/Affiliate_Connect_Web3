import { Box, MenuItem, Paper, Popover } from "@mui/material";
import RepeatIcon from "@mui/icons-material/Repeat";
import useDialogState from "@centic-scoring/hooks/common/useDialogState";
import { MouseEvent, useState } from "react";
import {
  useAppDispatch,
  useForProjectCommonSelector,
  useKOLsReportSelector,
} from "@centic-scoring/redux/hook";
import { setAccount } from "@centic-scoring/redux/slices/kols-report";

export default function AccountSwitch() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { handleClose, handleOpen, open } = useDialogState();

  const openModal = (event: MouseEvent<HTMLDivElement>) => {
    handleOpen();
    setAnchorEl(event.currentTarget);
  };

  const handleCloseProfile = () => {
    handleClose();
  };

  return (
    <Box>
      <Box
        sx={{
          "& :hover": {
            cursor: "pointer",
          },
          display: "flex",
          alignItems: "center",
        }}
        onClick={(e) => {
          openModal(e);
        }}
      >
        <RepeatIcon sx={{ color: "text.secondary", fontSize: "1rem" }} />
      </Box>
      <Popover
        anchorEl={anchorEl}
        open={open}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
        onClose={handleCloseProfile}
        slotProps={{
          paper: {
            style: {
              backgroundColor: "transparent",
              borderRadius: "16px",
            },
          },
        }}
      >
        <Content />
      </Popover>
    </Box>
  );
}

const Content = () => {
  const { project } = useForProjectCommonSelector();
  const { name } = useKOLsReportSelector();
  const dispatch = useAppDispatch();

  return (
    <Paper
      sx={{
        py: 1,
        "& .active": {
          fontWeight: 600,
        },
        "& .inactive": {
          fontWeight: 400,
          color: "text.secondary",
          "&.MuiMenuItem-root:hover": {
            fontWeight: 500,
          },
        },
      }}
    >
      {project.data?.social?.twitter?.map((social) => {
        return (
          <MenuItem
            onClick={() => {
              dispatch(setAccount(social.userName));
            }}
            className={name === social.userName ? "active" : "inactive"}
            key={social.userName}
          >
            {social.displayName}
          </MenuItem>
        );
      })}
    </Paper>
  );
};
