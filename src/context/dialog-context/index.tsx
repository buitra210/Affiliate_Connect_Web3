import useDialogState from "@centic-scoring/hooks/common/useDialogState";
import { createContext, PropsWithChildren, useContext, useMemo } from "react";

export type TDialogContext = {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
};

const DialogContext = createContext({} as TDialogContext);

export default function DialogContextProvider({ children }: PropsWithChildren) {
  const { handleClose, handleOpen, open } = useDialogState();
  const contextValue: TDialogContext = useMemo(
    () => ({
      open,
      handleOpen,
      handleClose,
    }),
    [open, handleOpen, handleClose]
  );

  return <DialogContext.Provider value={contextValue}>{children}</DialogContext.Provider>;
}

export const useDialogContext = () => useContext(DialogContext);
