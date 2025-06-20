import { useKolUserSelector } from "@centic-scoring/redux/hook";
import { formatNumber } from "@centic-scoring/utils/string/stringUtils";
import { Box, capitalize, Grid, Paper, Typography } from "@mui/material";
import React from "react";
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
export default function RequestOffer() {
  const { data } = useKolUserSelector().offers.detail;
  return (
    <Box>
      {(data?.request?.filter((req) => req?.type === "KPI expectation") || []).length > 0 && (
        <Paper sx={{ backgroundColor: "background.default", p: 3 }}>
          <Box>
            <Typography variant="h4" sx={{ color: "text.secondary" }}>
              KPI expectation
            </Typography>
            <Box
              sx={{
                mt: 1.5,
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
                  border: "1px solid",
                  borderColor: "text.active2",
                  p: 3,
                  borderRadius: 2,
                }}
              >
                {data?.request
                  ?.filter((req) => req.type === "KPI expectation")
                  .map((req) => {
                    //@ts-ignore
                    return req.detail?.map((kpi, index) => (
                      <KPIDetailRow
                        key={index}
                        type={kpi.goal}
                        unit={kpi.time.type}
                        value={kpi.kpi}
                        valueUnit={kpi.time.value}
                      />
                    ));
                  })}
                {/* {typeof data?.request.find((req) => req.type === "KPI expectation")?.detail !==
                  "string" &&
                  data?.request
                    .find((req) => req.type === "KPI expectation")
                    ?.detail?.map((kpi, index) => (
                      <KPIDetailRow
                        key={index}
                        type={kpi.goal}
                        unit={kpi.time.type}
                        value={kpi.kpi}
                        valueUnit={kpi.time.value}
                      />
                    ))} */}
              </Box>
            </Box>
          </Box>
        </Paper>
      )}
      {(data?.request?.filter((req) => req?.type === "Payment") || []).length > 0 && (
        <Paper sx={{ backgroundColor: "background.default", p: 3, mt: 3 }}>
          <Box>
            <Typography variant="h4" sx={{ color: "text.secondary" }}>
              Payment
            </Typography>
            <Box
              sx={{
                mt: 1.5,
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
                  border: "1px solid",
                  borderColor: "text.active2",
                  p: 3,
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6" color="text.secondary" my={2}>
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
                  {data?.request
                    ?.filter((req) => req?.type === "Payment")
                    .map((req) => {
                      return (
                        //@ts-ignore
                        req.detail?.bonusReward?.map((v, index) => {
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
                                  <Typography color={"text.label1"}>
                                    {capitalize(v.goal)}
                                  </Typography>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                  <Typography fontWeight={500} color={"text.primary"}>
                                    {`${formatNumber(v.kpiValue)} ${capitalize(
                                      v.kpiType.replace("-", " ")
                                    )}`}
                                  </Typography>
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                  <Typography color={"text.label1"}>Reward:</Typography>
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                  <Typography fontWeight={500} color={"text.primary"}>
                                    {`${v.rewardValue * 100}%`}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Box>
                          );
                        }) || []
                      );
                    })}
                </Box>
              </Box>
            </Box>
          </Box>
        </Paper>
      )}
      {(data?.request?.filter((req) => req?.type === "Other") || []).length > 0 && (
        <Paper sx={{ backgroundColor: "background.default", p: 3, mt: 3 }}>
          <Box>
            <Typography variant="h4" sx={{ color: "text.secondary" }}>
              Other
            </Typography>
            <Box
              sx={{
                mt: 1.5,
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
                  border: "1px solid",
                  borderColor: "text.active2",
                  p: 3,
                  borderRadius: 2,
                }}
              >
                {data?.request
                  ?.filter((req) => req?.type === "Other")
                  .map((req, index) => (
                    <Box key={index}>
                      <Typography>{req.detail as string}</Typography>
                    </Box>
                  ))}
              </Box>
            </Box>
          </Box>
        </Paper>
      )}
    </Box>
  );
}
