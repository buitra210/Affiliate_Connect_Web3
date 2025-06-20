import { Box, Dialog, Typography } from "@mui/material";
import AuthContent from "./AuthContent";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import useDialogState from "@centic-scoring/hooks/common/useDialogState";

export default function EmailConfirm() {
  const { handleClose, handleOpen, open } = useDialogState();
  return (
    <Box>
      <Dialog
        open={open}
        onClose={() => {
          handleClose();
        }}
      >
        <AuthContent handleClose={handleClose} />
      </Dialog>
      <Typography
        variant="body2"
        color="#E7B32E"
        display={"flex"}
        alignItems={"center"}
        sx={{ cursor: "pointer" }}
        onClick={handleOpen}
      >
        <CancelOutlinedIcon fontSize="small" sx={{ mr: 0.6 }} /> Account not verified
      </Typography>
    </Box>
  );
}
