import FailDialog from "@centic-scoring/components/Dialogs/FailDialog";
import SuccessDialog from "@centic-scoring/components/Dialogs/SuccessDialog";
import { StateStatus } from "@centic-scoring/components/component";
import { LoadingButton } from "@mui/lab";
import { Box, Dialog } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";

type Props = {
  onClick: () => void;
  status: StateStatus;
  buttonText: string | ReactNode;
  dialogText: string;
  onDialogClick?: () => void;
  errorText?: string;
  disabled?: boolean;
};
export default function ButtonWithNotiDialog({
  onClick,
  status,
  buttonText,
  dialogText,
  onDialogClick,
  errorText,
  disabled,
}: Props) {
  const [open, setOpen] = useState<boolean>(false);
  useEffect(() => {
    if (status === "SUCCESS" || status === "FAILED") {
      setOpen(true);
    }
  }, [status]);
  return (
    <>
      <Dialog open={open}>
        <Box sx={{ p: 3 }}>
          {status === "SUCCESS" && (
            <SuccessDialog
              onClick={() => {
                setOpen(false);
                onDialogClick && onDialogClick();
              }}
              text={dialogText}
            />
          )}
          {status === "FAILED" && (
            <FailDialog
              onClick={() => {
                setOpen(false);
              }}
              text={errorText}
            />
          )}
        </Box>
      </Dialog>
      <LoadingButton
        loading={status === "PROCESSING"}
        variant="contained"
        onClick={onClick}
        disabled={disabled}
      >
        {buttonText}
      </LoadingButton>
    </>
  );
}
