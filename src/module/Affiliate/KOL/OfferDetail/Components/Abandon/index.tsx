import { AffiliateKOLAPI } from "@centic-scoring/api/services/affiliate/affiliate";
import useURLQuery from "@centic-scoring/hooks/common/useUrlQuery";
import { LoadingButton } from "@mui/lab";
import { Box, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function Abandon({ handleClose }: { handleClose: () => void }) {
  const [reason, setReason] = useState<string>("");
  const [check, setCheck] = useState<boolean>(false);
  const { getCustomKey } = useURLQuery();
  const offerId = getCustomKey("offerId");
  const router = useRouter();

  const handleReasonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputReason = e.target.value;
    setReason(inputReason);
    setCheck(inputReason.trim().length > 0);
  };

  const handleSubmitReason = async () => {
    try {
      await AffiliateKOLAPI.createKOLOfferAbandonReason({ offerId, reason });
      router.push(`/affiliate`);
      toast.success("Abandon offer successfully");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };
  return (
    <Box sx={{ py: 4, px: 3, backgroundColor: "background.paper" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}></Box>
      <Box
        sx={{
          display: "flex",

          justifyContent: "center",
        }}
      >
        <Typography variant="h6" sx={{ mt: 3 }}>
          Can you tell us the reason?
        </Typography>
      </Box>
      <TextField
        fullWidth
        multiline
        rows={4}
        variant="outlined"
        value={reason}
        onChange={handleReasonChange}
        placeholder="Enter your reason..."
        className="custom-scrollbar"
        sx={{ mt: 3, minWidth: { md: "400px", sm: "300px" } }}
      ></TextField>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        <LoadingButton variant="outlined" sx={{ minWidth: "150px" }} onClick={handleClose}>
          Cancel
        </LoadingButton>
        <LoadingButton
          variant="contained"
          sx={{ minWidth: "150px" }}
          onClick={handleSubmitReason}
          disabled={!check}
        >
          Abandon Offer
        </LoadingButton>
      </Box>
    </Box>
  );
}
