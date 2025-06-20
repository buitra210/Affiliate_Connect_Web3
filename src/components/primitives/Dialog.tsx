import CloseIcon from "@mui/icons-material/Close";
import { DialogTitle, DialogTitleProps, IconButton } from "@mui/material";
import React from "react";

interface BootstrapDialogTitleProps extends DialogTitleProps {
  // eslint-disable-next-line no-unused-vars
  onClose?: (_ev: React.SyntheticEvent) => void;
}

export default function BootstrapDialogTitle(props: BootstrapDialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle {...other}>
      {children}
      {onClose ? (
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            cursor: "pointer",
            right: 8,
            top: 8,
            color: "inherit",
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}
