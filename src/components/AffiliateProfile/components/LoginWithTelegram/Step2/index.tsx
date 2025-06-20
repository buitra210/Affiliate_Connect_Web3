/* eslint-disable @next/next/no-img-element */
import { LoadingButton } from "@mui/lab";
import { Autocomplete, Avatar, Box, Button, TextField, Typography } from "@mui/material";
import countryFlag from "@centic-scoring/assets/country-flag.json";
import { toast } from "react-toastify";
import { useState } from "react";
import { sendAuthCode } from "@centic-scoring/api/services/ambassador/affiliate";
import { useAffiliateAuthSelector, useAppDispatch } from "@centic-scoring/redux/hook";
import {
  editTeleParamsData,
  editTeleParams,
  resetFormData,
} from "@centic-scoring/redux/slices/affiliate-auth";

export default function Step2() {
  // const { setTeleData, teleData, setStep } = useAmbassadorAuthContext();
  const { telegramParams } = useAffiliateAuthSelector();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const handleGetVerifyCode = async () => {
    if (!(telegramParams.data.country && telegramParams.data.phone)) {
      return;
    }
    setLoading(true);
    try {
      const res = await sendAuthCode({
        country: telegramParams.data.country,
        phone: telegramParams.data.phone,
      });
      dispatch(
        editTeleParamsData({
          phoneCodeHash: res.phoneCodeHash,
          sessionPath: res.sessionPath,
        })
      );
      dispatch(editTeleParams({ step: 3 }));
    } catch (error) {
      toast.error((error as Error).message);
    }
    setLoading(false);
  };
  return (
    <Box sx={{ maxWidth: "400px" }}>
      <Box
        display="flex"
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        mb={3}
      >
        <Avatar src="/platforms/telegram.png" sx={{ width: "60px", height: "60px" }} />
        <Typography variant="h4" color={"text.primary"} mt={2} fontWeight={700}>
          Connect Telegram
        </Typography>
      </Box>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <>
          <Typography variant="body1" color="text.label1" mb={0.5}>
            Country*
          </Typography>
          <Autocomplete
            options={countryFlag.map((country) => ({
              label: country.name,
              value: country.code,
              icon: "/" + country.flag_4x3,
            }))}
            renderInput={(params) => {
              return (
                <TextField
                  variant="outlined"
                  color="primary"
                  sx={{ fontWeight: 500 }}
                  {...params}
                  fullWidth
                />
              );
            }}
            renderOption={(props, option) => (
              <Box component="li" sx={{ "& > img": { mr: 2, flexShrink: 0 } }} {...props}>
                {option?.icon && (
                  <img
                    loading="lazy"
                    width="20"
                    src={option?.icon || ""}
                    style={{ borderRadius: "4px" }}
                    alt=""
                  />
                )}
                {option.label}
              </Box>
            )}
            onChange={(_, newValue) => {
              dispatch(
                editTeleParamsData({
                  country: newValue?.value,
                })
              );
            }}
            size="small"
          />

          <Typography variant="body1" color="text.label1" mb={0.5} mt={4}>
            Phone*
          </Typography>
          <TextField
            onChange={(e) => {
              dispatch(
                editTeleParamsData({
                  phone: e.target.value,
                })
              );
            }}
            size="small"
            type="text"
            fullWidth
          />
          <LoadingButton
            type="submit"
            loading={loading}
            disabled={!(telegramParams.data.country && telegramParams.data.phone)}
            variant="contained"
            fullWidth
            sx={{ mt: 4 }}
            onClick={handleGetVerifyCode}
          >
            Get verify code
          </LoadingButton>
          <Button
            sx={{ mt: 1 }}
            fullWidth
            variant="outlined"
            color="info"
            onClick={() => {
              dispatch(resetFormData());
            }}
          >
            Cancel
          </Button>
        </>
      </form>
    </Box>
  );
}
