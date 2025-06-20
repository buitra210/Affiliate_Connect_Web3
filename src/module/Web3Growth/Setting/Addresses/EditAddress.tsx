import PermissionComponent from "@centic-scoring/components/PermissionComponent";
import useDialogState from "@centic-scoring/hooks/common/useDialogState";
import EditIcon from "@mui/icons-material/Edit";
import { Dialog, Box, Button } from "@mui/material";
import EditForm, { ABIOptions } from "../edit-forms/AddAddress/EditForm";

type Props = {
  initData: {
    name: string;
    address: string;
    chain: { label: string; value: string; avatar: string };
    dappId: string;
    baseTag: string[];
    otherTags: string;
    abiInputType?: ABIOptions;
    abiUrl?: string;
    abiContent?: string;
    files?: FileList;
  };
};

export default function EditAddress({ initData }: Props) {
  const { handleClose, handleOpen, open } = useDialogState();
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxWidth: "900px",
            width: "100%",
          },
        }}
      >
        <EditForm editMode handleClose={handleClose} initData={initData} />
      </Dialog>
      <PermissionComponent
        disableMode="hidden"
        permisionPath={["settings"]}
        requiredPermisison={["update"]}
      >
        <Box sx={{ minWidth: "120px", backgroundColor: "background.primary" }}>
          <Button
            sx={{
              "&:hover": {
                backgroundColor: "text.active2",
                color: "text.primary",
              },
              py: 1,
              width: "100%",
              borderRadius: 0,
              display: "flex",
              justifyContent: "flex-start",
              px: 2,
              backgroundColor: "background.hover",
              color: "text.active",
            }}
            variant="contained"
            onClick={handleOpen}
          >
            <EditIcon fontSize="small" sx={{ mr: 0.5 }} /> Edit
          </Button>
        </Box>
      </PermissionComponent>
    </>
  );
}
