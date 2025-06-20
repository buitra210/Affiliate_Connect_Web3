import { useCallback, useState } from "react";

export default function useDialogState() {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);
  return {
    open,
    handleOpen,
    handleClose,
  };
}
