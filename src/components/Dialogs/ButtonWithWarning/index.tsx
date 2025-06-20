import { FailIcon } from "@centic-scoring/icons";
import { LoadingButton } from "@mui/lab";
import { Box, Dialog, Typography, Button, ButtonOwnProps, SxProps } from "@mui/material";
import { ReactNode, useState } from "react";

type Props = {
  onClick: () => Promise<void>;
  children: ReactNode;
  warningText: string;
  disabled?: boolean;
  variant?: ButtonOwnProps["variant"];
  sx?: SxProps;
};
const ButtonWithWarning = ({ children, onClick, warningText, disabled, variant, sx }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onClick();
      handleClose();
    } catch (error) {
      //pass
    }
    setLoading(false);
  };
  return (
    <Box>
      <Dialog open={open}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minWidth: "300px",
            p: 3,
          }}
        >
          <FailIcon
            sx={{
              width: "50px",
              height: "50px",
              mt: 1,
            }}
          />
          <Typography variant="h4" fontWeight={700} mt={2}>
            Warning
          </Typography>
          <Typography variant="body2" color={"text.active2"} mb={2} mt={2} textAlign={"center"}>
            {warningText}
          </Typography>
          <Box display="flex" justifyContent={"space-between"} alignItems={"center"} width={"100%"}>
            <Button variant="outlined" onClick={handleClose} fullWidth sx={{ mr: 1 }}>
              Cancel
            </Button>
            <LoadingButton
              loading={loading}
              variant="contained"
              onClick={() => {
                handleConfirm();
              }}
              fullWidth
              sx={{ ml: 1 }}
            >
              Confirm
            </LoadingButton>
          </Box>
        </Box>
      </Dialog>
      <Button
        sx={sx}
        disabled={disabled}
        disableRipple
        variant={variant || "text"}
        onClick={handleOpen}
      >
        {children}
      </Button>
    </Box>
  );
};

export default ButtonWithWarning;
