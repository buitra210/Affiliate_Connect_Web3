import { useKolUserSelector } from "@centic-scoring/redux/hook";
import { formatNumber } from "@centic-scoring/utils/string/stringUtils";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { capitalize } from "lodash";
export function ProgressKPI({
  type,
  value,
  progress1,
}: {
  type: string;
  value: number;
  progress1: number;
  progress2: number;
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
            {type === `Number of posts` ? `${progress1} ` : `${progress1} `}/{" "}
            {type === `Number of posts` ? `${value} posts` : `${value} posts`}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default function Progress() {
  const { data } = useKolUserSelector().offers.detail;
  return (
    <Paper sx={{ backgroundColor: "background.default", p: 4 }}>
      <Box>
        {(data?.kpis.details.length || 0) > 0 && (
          <Box>
            <Typography variant="h4" sx={{ color: "text.secondary" }}>
              KPI
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 500, color: "text.secondary", mt: 1.5 }}>
              You have achieved{" "}
              {data?.kpis?.totalProgress
                ? formatNumber(data.kpis.totalProgress * 100, { fractionDigits: 2 })
                : 0}
              % of the KPI you need to achieve.
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
                {data?.kpis?.details?.map((kpi, index) => {
                  return (
                    <ProgressKPI
                      key={index}
                      type={kpi.goal}
                      unit={kpi.time.type}
                      progress1={kpi.progress.value ?? 0}
                      progress2={kpi.progress.totalWeek ?? 0}
                      value={kpi.kpi}
                      valueUnit={kpi.time.value}
                    />
                  );
                })}
              </Box>
            </Box>
          </Box>
        )}
        {(data?.bonusReward?.length || 0) > 0 && (
          <Box>
            <Typography variant="h4" sx={{ color: "text.secondary", mt: 3.5 }}>
              Bonus Reward
            </Typography>
            <Box>
              <Box
                sx={{
                  mt: 1.5,
                  border: "1px solid",
                  borderColor: "text.active2",
                  p: 3,
                  borderRadius: 2,
                }}
              >
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
                  {data?.bonusReward?.map((v, index) => {
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
                            {v.goal === "Engagement Rate" && (
                              <Typography fontWeight={500} color={"text.primary"}>
                                {`${formatNumber(v.progress?.value, {
                                  fractionDigits: 3,
                                })}% / ${formatNumber(v.kpiValue)}% 
                             `}
                                {/* ${capitalize(v.kpiType.replace("-", " "))} */}
                              </Typography>
                            )}
                            {v.goal === "Impressions" && (
                              <Typography fontWeight={500} color={"text.primary"}>
                                {`${formatNumber(v.progress?.value ?? 0, {
                                  fractionDigits: 3,
                                })} / ${formatNumber(v.kpiValue, { fractionDigits: 3 })} ${
                                  v.kpiType
                                } 
                                                       `}
                                {/* ${capitalize(v.kpiType.replace("-", " "))} */}
                              </Typography>
                            )}
                          </Grid>
                          {/* <Grid item xs={12} sm={2}>
                          <Typography color={"text.label1"}>Reward:</Typography>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                          <Typography fontWeight={500} color={"text.primary"}>
                            {`${v.rewardValue * 100}%`}
                          </Typography>
                        </Grid> */}
                        </Grid>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Paper>
  );
}
