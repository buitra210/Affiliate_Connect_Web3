import { Box, Button, Skeleton, TextField, Typography } from "@mui/material";
import FileCopyRoundedIcon from "@mui/icons-material/FileCopyRounded";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useKolUserSelector } from "@centic-scoring/redux/hook";
import { getKOLAffiliateLinkInfo } from "@centic-scoring/redux/slices/kol-user/fetchFuntions";
import { AffiliateKOLAPI } from "@centic-scoring/api/services/affiliate/affiliate";

export default function AffiliateLink({
  handleClose,
  handleUpdate,
}: {
  handleClose: () => void;
  handleUpdate: () => void;
}) {
  const [custom, setCustom] = useState<string>("");
  const dispatch = useAppDispatch();
  const { detail } = useKolUserSelector().offers;
  const offerId = detail.data?.offerInfo?.id || "";
  const { affiliateLinkInfo } = useKolUserSelector();
  const [type, setType] = useState<string>("default");
  const [customLink, setCustomLink] = useState<string>("");
  const link_id = affiliateLinkInfo.data?.id || "";
  const handleCustomLink = async () => {
    try {
      const res = await AffiliateKOLAPI.customKOLAffiliateLink(link_id, custom);
      setCustomLink(res.link || "");
      setType("custom");
      toast.success("Customized successfully!");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    dispatch(getKOLAffiliateLinkInfo({ offerId: offerId }));
  }, [dispatch, offerId]);
  return (
    <Box sx={{ padding: 3, backgroundColor: "background.paper", minWidth: "400px" }}>
      <Typography variant="h6" sx={{ color: "text.secondary" }}>
        Your Information
      </Typography>
      <Box>
        <Box sx={{ mt: 2.5 }}>
          <Box>
            <Typography variant="body2" sx={{ color: "#6D8198" }}>
              Customize your link
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <TextField
                className="custom-scrollbar"
                rows={1}
                value={custom}
                onChange={(e) => setCustom(e.target.value)}
                fullWidth
                sx={{ maxWidth: "350px", mt: 1 }}
              />
              <Button
                variant="contained"
                onClick={handleCustomLink}
                disabled={!custom.trim()}
                sx={{ ml: 1, height: "48px" }}
              >
                Custom
              </Button>
            </Box>
          </Box>
          <Box sx={{ mt: 1.5 }}>
            <Typography variant="body2" sx={{ color: "#6D8198" }}>
              Your Affiliate Link
            </Typography>

            <Box
              sx={{
                backgroundColor: "background.default",
                maxWidth: "350px",
                // height: 7.5,
                py: 2.5,
                px: 3,
                borderRadius: "8px",
                mt: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",

                // overflowY: "hidden",
              }}
              className="custom-scrollbar"
            >
              <Typography
                variant="body1"
                sx={{
                  // display: "-webkit-box",
                  // WebkitBoxOrient: "vertical",
                  // WebkitLineClamp: 1,
                  maxWidth: "300px",
                }}
              >
                {affiliateLinkInfo.status === "IDLE" ? (
                  <Skeleton />
                ) : affiliateLinkInfo.status === "SUCCESS" ? (
                  type === "custom" ? (
                    customLink
                  ) : (
                    affiliateLinkInfo.data?.link
                  )
                ) : (
                  <Skeleton />
                )}
              </Typography>
              {type === "custom" && (
                <FileCopyRoundedIcon
                  sx={{ cursor: "pointer", fontSize: "20px", color: "text.active2" }}
                  onClick={() => {
                    navigator.clipboard.writeText(customLink);
                    toast.success("Copied to clipboard", { position: "top-right" });
                  }}
                />
              )}
              {type === "default" && (
                <FileCopyRoundedIcon
                  sx={{ cursor: "pointer", fontSize: "20px", color: "text.active2" }}
                  onClick={() => {
                    navigator.clipboard.writeText(affiliateLinkInfo.data?.link || "");
                    toast.success("Copied to clipboard", { position: "top-right" });
                  }}
                />
              )}
            </Box>
          </Box>
          <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between", gap: 2 }}>
            <LoadingButton
              variant="outlined"
              sx={{ maxWidth: "130px", width: "120px" }}
              onClick={handleClose}
            >
              Cancel
            </LoadingButton>
            <LoadingButton
              variant="outlined"
              sx={{ maxWidth: "130px", width: "120px" }}
              onClick={handleUpdate}
            >
              Confirm
            </LoadingButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
