import { KOLConnectAPI } from "@centic-scoring/api/services/affiliate/affiliate";
import TextEditor from "@centic-scoring/components/TextEditor";
import useDialogState from "@centic-scoring/hooks/common/useDialogState";
import useURLQuery from "@centic-scoring/hooks/common/useUrlQuery";
import { CloseIcon } from "@centic-scoring/icons";
import {
  useAppDispatch,
  useForProjectCommonSelector,
  useKOLOfferSelector,
} from "@centic-scoring/redux/hook";
import { LoadingButton } from "@mui/lab";
import { Paper, Box, IconButton, Typography, Button, Dialog } from "@mui/material";
import Image from "next/image";
import LogoImg from "public/centic_light_horizontal.png";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import useKOLsConnectparams from "../../../hooks/useKOLsConnectParams";
// import SearchKol from "./SearchKols";
import { setLetterContent } from "@centic-scoring/redux/slices/kol-offer";

export default function OfferLetter() {
  const { handleClose, handleOpen, open } = useDialogState();
  const { contact, newOfferId, letterContent } = useKOLOfferSelector();
  const { id } = useURLQuery();
  const [loading, setLoading] = useState(false);
  const { offerID } = useKOLsConnectparams();
  const dispatch = useAppDispatch();

  const useOfferId = useMemo(() => {
    if (offerID) {
      return offerID;
    }
    if (newOfferId && !offerID) {
      return newOfferId;
    }
  }, [newOfferId, offerID]);

  const handleConnect = async () => {
    setLoading(true);
    try {
      const result = await KOLConnectAPI.genLetter(id, {
        contact: contact.data || "",
        offer_link: `${window.location.origin}/affiliate/offer-link?baseOfferId=${useOfferId}`,
      });
      // setText(result.content);
      dispatch(setLetterContent(result.content));
      handleOpen();
    } catch (error) {
      toast.error((error as Error).message);
    }
    setLoading(false);
  };
  return (
    <Box>
      <LoadingButton loading={loading} variant="contained" onClick={handleConnect}>
        Connect KOLs
      </LoadingButton>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            maxWidth: "1000px",
            minWidth: "930px",
          },
          className: "hide-scrollbar",
        }}
      >
        <Content text={letterContent} handleClose={handleClose} />
      </Dialog>
    </Box>
  );
}
function Content({ handleClose, text }: { handleClose: () => void; text?: string }) {
  const { project } = useForProjectCommonSelector();
  const [editText, setEditText] = useState<string>(String(text) || "");

  // const [step, setStep] = useState(0);

  const handleCopy = () => {
    navigator.clipboard.writeText(editText || "").then(() => {
      toast.success("Copied to clipboard");
    });
  };

  return (
    <>
      {/* {step === 0 && ( */}
      <Paper sx={{ px: 5, py: 6, width: "100%" }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Image src={LogoImg} alt="logo" width={111} height={31.6} />
          <IconButton
            onClick={() => {
              handleClose && handleClose();
            }}
          >
            <CloseIcon sx={{ fontSize: "1rem" }} />
          </IconButton>
        </Box>
        <Typography variant="h2" my={6} sx={{ textAlign: "center" }}>
          {`Collaboration Invitation from ${project.data?.name}`}
        </Typography>
        <Box
          sx={{
            "& .text-container": {
              backgroundColor: "background.paper",
            },
          }}
        >
          <TextEditor
            inputType="markdown"
            outputType="markdown"
            initValue={editText}
            onValueChange={(value) => {
              setEditText(value);
            }}
          />
        </Box>
        <Box sx={{ mt: 3 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              "& .MuiButton-root": {
                minWidth: "130px",
              },
              gap: 1,
            }}
          >
            <Button variant="outlined" onClick={handleCopy}>
              Copy
            </Button>
            {/* <Button variant="contained" onClick={() => setStep(1)}>
                Send by
              </Button> */}
          </Box>
        </Box>
      </Paper>
      {/* )} */}
      {/* {step === 1 && <SearchKol handleClose={handleClose} />} */}
    </>
  );
}
