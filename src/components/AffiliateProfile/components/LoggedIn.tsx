import { useAffiliateAuthSelector, useAppDispatch } from "@centic-scoring/redux/hook";
import { handleClose, handleOpen, logout } from "@centic-scoring/redux/slices/affiliate-auth";
import { Paper, MenuItem, Typography, Button, Popover } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import CenticLoading from "@centic-scoring/components/CenticLoading";
import { MouseEvent, useState } from "react";

export default function LoggedIn() {
  const { open, userData } = useAffiliateAuthSelector();
  const dispatch = useAppDispatch();
  const openModal = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    dispatch(handleOpen());
  };
  const closeModal = () => {
    dispatch(handleClose());
  };
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  return (
    <>
      <Button variant="contained" onClick={openModal}>
        {userData.status === "PROCESSING" && <CenticLoading size={20} />}
        {userData.status === "SUCCESS" &&
          `Welcome ${userData.data?.displayName || userData.data?.userName}`}
      </Button>
      <Popover
        anchorEl={anchorEl}
        open={open}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        onClose={closeModal}
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
    </>
  );
}

function Content() {
  const dispatch = useAppDispatch();
  return (
    <Paper sx={{ py: 1 }}>
      <MenuItem
        sx={{
          height: "46px",
          minWidth: "150px",
        }}
        onClick={() => {
          dispatch(logout());
        }}
      >
        <LogoutIcon sx={{ mr: 1 }} />
        <Typography variant="body2" color={"text.secondary"}>
          Log out
        </Typography>
      </MenuItem>
    </Paper>
  );
}
