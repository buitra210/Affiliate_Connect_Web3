import TextEditor from "@centic-scoring/components/TextEditor";
import useDebounce from "@centic-scoring/hooks/useDebounce";
import { useAppDispatch, useKOLOfferSelector } from "@centic-scoring/redux/hook";
import { editForm } from "@centic-scoring/redux/slices/kol-offer";
import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";

type Props = {
  disabled?: boolean;
};
export default function Requirements({ disabled }: Props) {
  const { offerForm } = useKOLOfferSelector();
  const [updateText, setUpdateText] = useState<string>(offerForm.customizedRequirement?.text);
  const dispatch = useAppDispatch();
  const updateReduxState = useDebounce(() => {
    dispatch(
      editForm({
        customizedRequirement: {
          text: updateText,
        },
      })
    );
  }, 500);

  useEffect(() => {
    updateReduxState();
  }, [updateReduxState, updateText]);
  return (
    <Box>
      {offerForm.customizedRequirement?.text && (
        <Box
          sx={{
            "& .input-container": {
              minHeight: "10px",
            },
            "& .text-container": {
              pb: "16px",
            },
          }}
        >
          <TextEditor
            onValueChange={(e) => {
              setUpdateText(e);
            }}
            initValue={offerForm.customizedRequirement.text}
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
          mt: offerForm.customizedRequirement?.text ? 0 : 3,
        }}
      >
        <Typography variant="h6" color="text.secondary" mb={3}>
          KPI Detail
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
          {offerForm.kpiExpect &&
            Object.values(offerForm.kpiExpect).map((kpi, index) => {
              return (
                <KPIDetailRow
                  key={index}
                  type={kpi.require.type}
                  unit={kpi.timeRequire.unit}
                  value={kpi.require.value}
                  valueUnit={kpi.timeRequire.value}
                />
              );
            })}
        </Box>
      </Box>
    </Box>
  );
}

export function KPIDetailRow({
  type,
  unit,
  value,
  valueUnit,
}: {
  type: string;
  value: number;
  unit: string;
  valueUnit: number;
}) {
  return (
    <Box
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
          <Typography color={"text.label1"}>
            {type === "Number of posts" ? "Number of posts" : `Number of ${type}`}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography fontWeight={500} color={"text.primary"}>
            {type === `Number of posts` ? `${value} posts` : `${value} ${type}`}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Typography color={"text.label1"}>In:</Typography>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Typography fontWeight={500} color={"text.primary"}>
            {`${valueUnit} ${unit}`}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
