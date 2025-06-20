/* eslint-disable @next/next/no-img-element */
import { SuccessIcon } from "@centic-scoring/icons";
import { LoadingButton } from "@mui/lab";
import { Box, Avatar, Typography } from "@mui/material";
import countryFlag from "@centic-scoring/assets/country-flag.json";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAffiliateAuthSelector, useAppDispatch } from "@centic-scoring/redux/hook";
import { getAffiliateUser } from "@centic-scoring/redux/slices/affiliate-auth/fetchFunction";
import { handleClose, resetFormData } from "@centic-scoring/redux/slices/affiliate-auth";

export default function Success() {
  const { telegramParams } = useAffiliateAuthSelector();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const handleConfirm = async () => {
    setLoading(true);
    try {
      dispatch(getAffiliateUser());
      dispatch(handleClose());
      dispatch(resetFormData());
    } catch (error) {
      toast.error((error as Error).message);
    }
    setLoading(false);
  };

  return (
    <Box p={3} sx={{ maxWidth: "400px" }}>
      <Box
        display="flex"
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        mb={1}
      >
        <Avatar src="/platforms/telegram.png" sx={{ width: "60px", height: "60px" }} />
        <Typography variant="h4" color={"text.primary"} mt={2} fontWeight={700}>
          Connected Successfully
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
          <img
            alt="country"
            src={"/" + countryFlag.find((c) => c.code === telegramParams.data.country)?.flag_4x3}
            style={{ width: "24px", height: "18px", borderRadius: "4px", marginRight: "8px" }}
          />
          <Typography variant="body1" color={"text.primary"} fontWeight={500}>
            {telegramParams.data.phone}
          </Typography>
        </Box>
        <SuccessIcon
          sx={{
            width: "60px",
            height: "60px",
            mt: 3,
          }}
        />
      </Box>

      <LoadingButton
        loading={loading}
        onClick={handleConfirm}
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
      >
        Confirm
      </LoadingButton>
    </Box>
  );
}
