import { useKOLAuthContext } from "@centic-scoring/context/kol-auth-context";
import { Button, MenuItem, Paper, Popover, Typography } from "@mui/material";
import CenticLoading from "../CenticLoading";
import useDialogState from "@centic-scoring/hooks/common/useDialogState";
import { MouseEvent, useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";

export default function LoggedInButton() {
  const { kolInfo } = useKOLAuthContext();
  const { open, handleClose, handleOpen } = useDialogState();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openModal = (event: MouseEvent<HTMLButtonElement>) => {
    handleOpen();
    setAnchorEl(event.currentTarget);
  };

  const closeModal = () => {
    handleClose();
  };
  return (
    <>
      <Button variant="outlined" onClick={openModal}>
        {kolInfo.status === "PROCESSING" && <CenticLoading size={20} />}
        {kolInfo.status === "SUCCESS" &&
          `Welcome ${kolInfo.data?.displayName || kolInfo.data?.userName}`}
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
  const { logout } = useKOLAuthContext();
  return (
    <Paper sx={{ py: 1 }}>
      <MenuItem
        sx={{
          height: "46px",
          minWidth: "150px",
        }}
        onClick={logout}
      >
        <LogoutIcon sx={{ mr: 1 }} />
        <Typography variant="body2" color={"text.secondary"}>
          Log out
        </Typography>
      </MenuItem>
    </Paper>
  );
}
