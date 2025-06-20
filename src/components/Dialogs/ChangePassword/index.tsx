import useDialogState from "@centic-scoring/hooks/common/useDialogState";
import { Box, Dialog, MenuItem, Typography } from "@mui/material";
import ChangeContent from "./ChangeContent";
import LockResetIcon from "@mui/icons-material/LockReset";

export default function ChangePassword() {
  const { handleClose, open, handleOpen } = useDialogState();

  return (
    <Box>
      <Dialog
        open={open}
        onClose={() => {
          handleClose();
        }}
      >
        <ChangeContent handleClose={handleClose} />
      </Dialog>
      <MenuItem
        sx={{
          height: "46px",
        }}
        onClick={handleOpen}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <LockResetIcon sx={{ mr: 1, ml: -0.5 }} />
          <Typography variant="body2" color={"text.secondary"}>
            Change Password
          </Typography>
        </Box>
      </MenuItem>
    </Box>
  );
}
