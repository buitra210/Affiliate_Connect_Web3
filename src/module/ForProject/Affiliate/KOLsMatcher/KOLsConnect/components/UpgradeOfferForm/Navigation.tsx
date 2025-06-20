import { LoadingButton } from "@mui/lab";
import { Box, Button } from "@mui/material";
import useKOLsConnectparams from "../../hooks/useKOLsConnectParams";
import { useAppDispatch, useKOLOfferSelector } from "@centic-scoring/redux/hook";
import { useState } from "react";
import { KOLConnectAPI } from "@centic-scoring/api/services/affiliate/affiliate";
import { toast } from "react-toastify";
import useURLQuery from "@centic-scoring/hooks/common/useUrlQuery";
import { getProjectNotifications } from "@centic-scoring/redux/slices/kol-offer/fetchFunctions";

export default function Navigation({ type }: { type?: boolean }) {
  const { resetParam, offerID } = useKOLsConnectparams();
  const { offerForm, upgradeType } = useKOLOfferSelector();
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useURLQuery();
  const dispatch = useAppDispatch();

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      await KOLConnectAPI.upgradeOffer(
        id,
        offerID,
        {
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
                id: `${offerForm.payment.chains}_${offerForm.payment.token}`,
                address: offerForm.payment.token,
              },
              chainId: offerForm.payment.chains,
              amount: offerForm.payment.amount,
              rule: {
                type: offerForm.payment.rule.type,
                value: {
                  stringValue: offerForm.payment.rule.stringValue || undefined,
                  postValue: offerForm.payment.rule.postPay || undefined,
                  upfrontValue: offerForm.payment.rule.upfrontPay || undefined,
                },
              },
            },
            bonusReward: Object.values(offerForm.payment.bonus || {}).map((bonus) => {
              return {
                goal: bonus.goal,
                kpiType: bonus.kpi?.type,
                kpiValue: bonus.kpi?.value,
                rewardValue: bonus.reward,
              };
            }),
            custom: offerForm.payment.rule.stringValue || "",
          },
          contactInformation: offerForm.contactInformation || "",
        },
        upgradeType
      );
      toast.success("Upgrade successfully!");
      dispatch(getProjectNotifications({ id }));

      resetParam();
    } catch (error) {
      toast.error((error as Error).message);
    }
    setLoading(false);
  };

  const handleUpgradeBase = async () => {
    setLoading(true);
    try {
      await KOLConnectAPI.upgradeBaseOffer(id, offerID, {
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
              id: `${offerForm.payment.chains}_${offerForm.payment.token}`,
              address: offerForm.payment.token,
            },
            chainId: offerForm.payment.chains,
            amount: offerForm.payment.amount,
            rule: {
              type: offerForm.payment.rule.type,
              value: {
                stringValue: offerForm.payment.rule.stringValue || undefined,
                postValue: offerForm.payment.rule.postPay || undefined,
                upfrontValue: offerForm.payment.rule.upfrontPay || undefined,
              },
            },
          },
          bonusReward: Object.values(offerForm.payment.bonus || {}).map((bonus) => {
            return {
              goal: bonus.goal,
              kpiType: bonus.kpi?.type,
              kpiValue: bonus.kpi?.value,
              rewardValue: bonus.reward,
            };
          }),
          custom: offerForm.payment.rule.stringValue || "",
        },
        contactInformation: offerForm.contactInformation || "",
      });
      toast.success("Upgrade successfully!");
      dispatch(getProjectNotifications({ id }));
      resetParam();
    } catch (error) {
      toast.error((error as Error).message);
    }
    setLoading(false);
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
      <Button variant="outlined" onClick={resetParam}>
        Cancel
      </Button>
      <LoadingButton
        variant="contained"
        loading={loading}
        onClick={() => {
          if (type) {
            handleUpgradeBase();
          } else {
            handleUpgrade();
          }
        }}
      >
        Upgrade
      </LoadingButton>
    </Box>
  );
}
