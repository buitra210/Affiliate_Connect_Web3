import {
  AffiliateKOLAPI,
  putKolUserOfferStatus,
} from "@centic-scoring/api/services/affiliate/affiliate";
import useDialogState from "@centic-scoring/hooks/common/useDialogState";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Dialog } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import Request from "./Request";
import AffiliateLink from "./AffiliateLink/AffiliateLink";
import { useAppDispatch, useKolUserSelector } from "@centic-scoring/redux/hook";
import { getKOLUserNotifications } from "@centic-scoring/redux/slices/kol-user/fetchFuntions";
import { useKOLAuthContext } from "@centic-scoring/context/kol-auth-context";
import Abandon from "./Abandon";
// import Request from "./Request";

export default function Navigation({ offerId }: { offerId: string }) {
  const [loadingAccept, setLoadingAccept] = useState<boolean>(false);
  const [loadingReject, setLoadingReject] = useState<boolean>(false);
  const [loadingRevert, setLoadingRevert] = useState<boolean>(false);
  const [type, setType] = useState<string>("");
  const dispatch = useAppDispatch();
  const { detail } = useKolUserSelector().offers;
  const { kolInfo } = useKOLAuthContext();
  const { handleOpen, open, handleClose } = useDialogState();
  const router = useRouter();
  const handleGetLink = async () => {
    try {
      const response = await AffiliateKOLAPI.createKOLAffiliateLink({
        redirect_url: detail.data?.offerInfo?.introduction?.featureLink || "",
        offerId: detail.data?.offerInfo?.id || "",
        twitterUserName: kolInfo.data?.userName || "",
      });
      return response.affiliate_link;
    } catch (error) {
      return null;
    }
  };
  const handleRequest = async () => {
    setType("request");
    handleOpen();
  };
  const handleReject = async () => {
    setLoadingReject(true);
    try {
      await putKolUserOfferStatus({ offerId: offerId, status: "Reject" });
      toast.success("Request rejected successfully!");
      router.push("/affiliate");
      dispatch(getKOLUserNotifications());
    } catch (error) {
      toast.error((error as Error).message);
    }
    setLoadingReject(false);
  };
  const handleAbandon = async () => {
    setLoadingReject(true);
    try {
      // await putKOLOfferAbandon({ offerId: offerId, reason: "Cancel" });
      // toast.success("Offer abandoned successfully!");
      // router.push("/affiliate");
      // dispatch(getKOLUserNotifications());
      setType("abandon");
      handleOpen();
    } catch (error) {
      toast.error((error as Error).message);
    }
    setLoadingReject(false);
  };
  const handleRevert = async () => {
    setLoadingRevert(true);
    try {
      await AffiliateKOLAPI.deleteKOLRequest(offerId, detail.data?.requestId as string);
      toast.success("Request reverted successfully!");
      router.push("/affiliate");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };
  const handleAccept = async () => {
    setLoadingAccept(true);
    try {
      setType("accept");
      await handleGetLink();
      handleOpen();
      // await putKolUserOfferStatus({ offerId: offerId, status: "In progress" });
      // toast.success("Request accepted successfully!");
      // dispatch(getKOLUserNotifications());
      // router.push("/affiliate");
    } catch (error) {
      toast.error((error as Error).message);
    }
    setLoadingAccept(false);
  };
  const handleUdpdateAccept = async () => {
    try {
      await putKolUserOfferStatus({ offerId: offerId, status: "In progress" });
      toast.success("Offer accepted successfully!");
      dispatch(getKOLUserNotifications());
      router.push("/affiliate");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
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
      {detail.data?.offerInfo?.status === "Pending" && (
        <>
          <LoadingButton variant="outlined" loading={loadingReject} onClick={handleReject}>
            Reject
          </LoadingButton>
          <Button variant="outlined" onClick={handleRequest}>
            Request
          </Button>
          <LoadingButton variant="contained" loading={loadingAccept} onClick={handleAccept}>
            Accept
          </LoadingButton>
        </>
      )}
      {(detail.data?.offerInfo?.status === "In progress" ||
        detail.data?.offerInfo?.status === "Upgrading") && (
        <>
          <LoadingButton variant="outlined" loading={loadingReject} onClick={handleAbandon}>
            Abandon Offer
          </LoadingButton>
        </>
      )}
      {detail.data?.offerInfo?.status === "Request" && (
        <>
          <LoadingButton variant="outlined" loading={loadingRevert} onClick={handleRevert}>
            Revert Request
          </LoadingButton>
          <Button variant="outlined" onClick={handleRequest}>
            Request
          </Button>
        </>
      )}
      {type == "request" && (
        <Dialog
          open={open}
          PaperProps={{
            sx: {
              maxWidth: "1000px",
            },
            className: "hide-scrollbar",
          }}
        >
          <Request handleClose={handleClose} />
        </Dialog>
      )}
      {type == "accept" && (
        <Dialog
          open={open}
          PaperProps={{
            sx: {
              maxWidth: "1000px",
            },
            className: "hide-scrollbar",
          }}
        >
          <AffiliateLink handleClose={handleClose} handleUpdate={handleUdpdateAccept} />
        </Dialog>
      )}
      {type == "abandon" && (
        <Dialog
          open={open}
          PaperProps={{
            sx: {
              maxWidth: "1000px",
            },
            className: "hide-scrollbar",
          }}
        >
          <Abandon handleClose={handleClose} />
        </Dialog>
      )}
    </Box>
  );
}
