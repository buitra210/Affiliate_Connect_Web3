import { Box, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import SelfPay from "./components/SelfPay";
import { useAppDispatch, useKOLOfferSelector } from "@centic-scoring/redux/hook";
import { getPayOptions } from "@centic-scoring/redux/slices/kol-offer/fetchFunctions";
import FilterItem from "@centic-scoring/components/shared/FilterItem";

export default function Step3() {
  const { offerForm } = useKOLOfferSelector();
  const [payType, setPayType] = useState<"Selfpay" | "Auto">(offerForm.payment.type);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPayOptions());
  }, [dispatch]);

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <FilterItem text="Autopay" active={payType === "Auto"} onClick={() => setPayType("Auto")} />
        <FilterItem
          text="Selfpay"
          active={payType === "Selfpay"}
          onClick={() => setPayType("Selfpay")}
        />
      </Box>
      <Box mt={2}>
        {payType === "Auto" && (
          <Paper
            sx={{
              p: 3,
              minHeight: "200px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h4" color="text.secondary">
              Coming Soon
            </Typography>
          </Paper>
        )}
        {payType === "Selfpay" && <SelfPay />}
      </Box>
    </Box>
  );
}
