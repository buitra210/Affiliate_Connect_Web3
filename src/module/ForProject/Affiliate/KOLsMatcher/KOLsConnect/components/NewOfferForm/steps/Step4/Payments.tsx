import TextEditor from "@centic-scoring/components/TextEditor";
import { chainsConfig } from "@centic-scoring/config/chain";
import useDebounce from "@centic-scoring/hooks/useDebounce";
import { useAppDispatch, useKOLOfferSelector } from "@centic-scoring/redux/hook";
import { editForm } from "@centic-scoring/redux/slices/kol-offer";
import { formatNumber } from "@centic-scoring/utils/string/stringUtils";
import { Box, Grid, Typography } from "@mui/material";
import { capitalize } from "lodash";
import { useEffect, useState } from "react";

type Props = {
  disabled?: boolean;
};

export default function Payments({ disabled }: Props) {
  const { offerForm } = useKOLOfferSelector();
  const [updateText, setUpdateText] = useState<string>(offerForm.payment?.rule.stringValue || "");
  const dispatch = useAppDispatch();
  const updateReduxState = useDebounce(() => {
    dispatch(
      editForm({
        payment: {
          ...offerForm.payment,
          rule: {
            ...offerForm.payment?.rule,
            stringValue: updateText,
          },
        },
      })
    );
  }, 500);

  useEffect(() => {
    updateReduxState();
  }, [updateReduxState, updateText]);
  return (
    <Box>
      {offerForm.payment?.type === "Selfpay" && (
        // <Typography color={"text.primary"} my={4}>
        //   {offerForm.payment.rule.stringValue}
        // </Typography>
        <Box
          sx={{
            "& .input-container": {
              minHeight: "10px",
            },
            "& .text-container": {
              pb: "px",
            },
          }}
        >
          <TextEditor
            onValueChange={(e) => {
              setUpdateText(e);
            }}
            initValue={offerForm.payment.rule.stringValue}
            inputType="markdown"
            placeholder={""}
            viewMode={disabled}
          />
        </Box>
      )}
      <Box
        sx={{
          border: "1px solid",
          borderColor: "text.active2",
          p: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" color="text.secondary" mb={3}>
          Payment detail
        </Typography>
        <Box
          sx={{
            "& .kpi-detail-row": {
              py: 3,
              borderBottom: "1px solid",
              borderColor: "text.active2",
            },
            "& .kpi-detail-row:last-child": {
              borderBottom: "none",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
            className="kpi-detail-row"
          >
            <Typography color={"text.label1"}>Total Token:</Typography>
            <Typography fontWeight={500} color="text.primary">
              {`${offerForm.payment?.amount} ${offerForm.payment?.tokenName}`}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
            className="kpi-detail-row"
          >
            <Typography color={"text.label1"}>Chain:</Typography>
            <Typography fontWeight={500} color="text.primary">
              {chainsConfig[offerForm.payment?.chains || ""]?.name}
            </Typography>
          </Box>
        </Box>
        {offerForm.payment?.bonus && (
          <>
            <Typography variant="h6" color="text.secondary" my={3}>
              Bonus rewards
            </Typography>
            <Box
              sx={{
                "& .kpi-detail-row": {
                  py: 3,
                  borderBottom: "1px solid",
                  borderColor: "text.active2",
                },
                "& .kpi-detail-row:last-child": {
                  borderBottom: "none",
                },
              }}
            >
              {Object.values(offerForm.payment.bonus || {}).map((v, index) => {
                return (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                    }}
                    className="kpi-detail-row"
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={4}>
                        <Typography color={"text.label1"}>{capitalize(v.goal)}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Typography fontWeight={500} color={"text.primary"}>
                          {`${formatNumber(v.kpi.value)} ${capitalize(
                            v.kpi.type.replace("-", " ")
                          )}`}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={2}>
                        <Typography color={"text.label1"}>Reward:</Typography>
                      </Grid>
                      <Grid item xs={12} sm={2}>
                        <Typography fontWeight={500} color={"text.primary"}>
                          {`${v.reward}%`}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                );
              })}
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}
