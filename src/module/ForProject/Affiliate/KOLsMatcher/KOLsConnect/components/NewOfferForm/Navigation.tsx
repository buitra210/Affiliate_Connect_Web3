import { Box, Button } from "@mui/material";
import useKOLsConnectparams from "../../hooks/useKOLsConnectParams";
import { useAppDispatch, useKOLOfferSelector } from "@centic-scoring/redux/hook";
import { useState } from "react";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import { KOLConnectAPI } from "@centic-scoring/api/services/affiliate/affiliate";
import useURLQuery from "@centic-scoring/hooks/common/useUrlQuery";
import { ERROR_TEXTS } from "./errorTexts";
import { setNewOfferId } from "@centic-scoring/redux/slices/kol-offer";

export default function Navigation() {
  const { step, setStep, resetParam, setParams } = useKOLsConnectparams();
  const { offerForm } = useKOLOfferSelector();

  const { id } = useURLQuery();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleNext = async () => {
    if (!handleCheckInput()) {
      return;
    }

    if (step === 4) {
      await handleCreateOffer();
    } else {
      setStep(Math.min(step + 1, 4));
    }
  };
  const handlePrev = () => {
    if (step === 1) {
      resetParam();
    }
    setStep(Math.max(step - 1, 1));
  };

  const handleCreateOffer = async () => {
    setLoading(true);
    try {
      const res = await KOLConnectAPI.createOffer(id, {
        setupOffer: {
          title: offerForm.name,
          introduction: {
            description: offerForm.description.text,
            featureLink: offerForm.featuredLink,
            featureTitle: offerForm.description.title,
            logo: offerForm.description.logo || "",
          },
          requirements: {
            kpis: Object.values(offerForm.kpiExpect).map((kpi) => {
              return {
                goal: kpi.require.type,
                kpi: kpi.require.value,
                time: {
                  type: kpi.timeRequire.unit,
                  value: kpi.timeRequire.value,
                },
              };
            }),
            custom: offerForm.customizedRequirement.text,
          },
          payments: {
            type: offerForm.payment.type,
            payInfo: {
              token: {
                address: offerForm.payment.token,
                id: `${offerForm.payment.chains}_${offerForm.payment.token}`,
              },
              amount: offerForm.payment.amount,
              chainId: offerForm.payment.chains,
              rule: {
                type: offerForm.payment.rule.type,
                value: {
                  postValue: offerForm.payment.rule.postPay,
                  upfrontValue: offerForm.payment.rule.upfrontPay,
                },
              },
            },
            custom: offerForm.payment.rule.stringValue || "",
            bonusReward: Object.values(offerForm.payment.bonus).map((value) => {
              return {
                goal: value.goal,
                kpiType: value.kpi.type,
                kpiValue: value.kpi.value,
                rewardValue: value.reward,
              };
            }),
          },
          contactInformation: offerForm.contactInformation || "",
        },
        userInfo: null,
      });
      dispatch(setNewOfferId(res.offerId));
      toast.success("Create Offer Successfully!");
      // handleOpen();
      setParams("action", "view");
    } catch (error) {
      toast.error((error as Error).message);
    }
    setLoading(false);
  };

  const handleCheckStep1 = () => {
    if (!offerForm.name) {
      toast.error(ERROR_TEXTS.offerName);
      return false;
    }
    if (!offerForm.featuredLink) {
      toast.error(ERROR_TEXTS.featureLink);
      return false;
    }
    if (!offerForm.description.title) {
      toast.error(ERROR_TEXTS.featureTitle);
      return false;
    }
    if (!offerForm.description.logo) {
      toast.error(ERROR_TEXTS.featureLogo);
      return false;
    }
    if (!offerForm.description.text) {
      toast.error(ERROR_TEXTS.description);
      return false;
    }

    return true;
  };
  const handleCheckStep2 = () => {
    let valid = true;
    if (Object.values(offerForm.kpiExpect)?.length === 0) {
      toast.error(ERROR_TEXTS.kpiExpect);
      valid = false;
    }
    if (Object.values(offerForm.kpiExpect)?.length > 0) {
      Object.values(offerForm.kpiExpect).forEach((kpi) => {
        if (!kpi.require.value) {
          toast.error(ERROR_TEXTS.kpiValue);
          valid = false;
        }
        if (!kpi.timeRequire.value) {
          toast.error(ERROR_TEXTS.kpiUnit);
          valid = false;
        }
      });
    }

    return valid;
  };

  const handleCheckStep3 = () => {
    if (!offerForm.payment.chains) {
      toast.error(ERROR_TEXTS.token);
      return false;
    }
    if (!offerForm.payment.token) {
      toast.error(ERROR_TEXTS.token);
      return false;
    }
    if (!offerForm.payment.amount) {
      toast.error(ERROR_TEXTS.amount);
      return false;
    }

    if (offerForm.payment.type === "Selfpay") {
      if (!offerForm.payment.rule.stringValue) {
        toast.error(ERROR_TEXTS.rule);
        return false;
      }
    }
    if (offerForm.payment.type === "Auto") {
      // if (!offerForm.payment.rule.type || offerForm.payment.rule.type === "string") {
      //   toast.error(ERROR_TEXTS.rule);
      //   return false;
      // }
      toast.error("Auto Pay is not supported yet");
      return false;
    }
    return true;
  };

  const handleCheckInput = () => {
    if (step === 1) {
      return handleCheckStep1();
    }
    if (step === 2) {
      return handleCheckStep2();
    }
    if (step === 3) {
      return handleCheckStep3();
    }
    return true;
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
      <Button variant="outlined" onClick={handlePrev}>
        {step < 4 && "Back"}
        {step >= 4 && "Back to previous step"}
      </Button>
      <LoadingButton loading={loading} variant="contained" onClick={handleNext}>
        {step < 4 && "Next"}
        {step >= 4 && "Create"}
      </LoadingButton>
      {/* <Dialog
        open={open}
        PaperProps={{
          sx: {
            maxWidth: "1000px",
          },
          className: "hide-scrollbar",
        }}
      > */}
      {/* <OfferOverview type="create" /> */}
      {/* </Dialog> */}
    </Box>
  );
}
