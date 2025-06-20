import { useAppDispatch, useKOLsSelector } from "@centic-scoring/redux/hook";
import { Box, Grid, Paper, Skeleton, Tooltip, Typography } from "@mui/material";
import { HighchartsReact } from "highcharts-react-official";
import Highcharts from "highcharts";
import useURLQuery from "@centic-scoring/hooks/common/useUrlQuery";
import { useEffect, useMemo } from "react";
import { getKOLsAudience } from "@centic-scoring/redux/slices/kols/fetchFunctions";
import useLineChartConfig from "@centic-scoring/hooks/highcharts/useLineChartConfig";
import { compactNumber, formatNumber } from "@centic-scoring/utils/string/stringUtils";
import ComponentWithStatus from "@centic-scoring/components/ComponentWithStatus";
import { InfoIcon } from "@centic-scoring/icons";

export default function AudienceOverTime() {
  const { audienceOverTime } = useKOLsSelector().kol;
  const dispatch = useAppDispatch();
  const { id, kolUserName } = useURLQuery();

  useEffect(() => {
    if (id && kolUserName) {
      dispatch(getKOLsAudience({ id, userName: kolUserName }));
    }
  }, [id, kolUserName, dispatch]);

  const chartData = useMemo(() => {
    const result: { x: number; y: number }[] = Object.entries(
      audienceOverTime.data?.twitterFollowersChangeLogs || {}
    ).map(([timeStamp, value]) => {
      return { x: Number(timeStamp) * 1000, y: Number(value) };
    });
    return result;
  }, [audienceOverTime]);

  const options = useLineChartConfig(
    {
      chart: {
        type: "line",
        height: 250,
        alignThresholds: true,
        scrollablePlotArea: {
          minWidth: 450,
        },
        numberFormatter: function (value) {
          return `${formatNumber(value, { fractionDigits: 2 })}`;
        },
      },
      xAxis: {
        type: "datetime",
        crosshair: { width: 2 },
      },
      yAxis: {
        gridLineWidth: 0,
        title: {
          text: undefined,
        },
        plotLines: [
          {
            width: 0.2,
            value: 0,
          },
        ],
        labels: {
          formatter: function () {
            return compactNumber(Number(this.value), 2);
          },
        },
      },
      legend: {
        align: "right",
        verticalAlign: "top",
        squareSymbol: true,
      },
      tooltip: { shared: true },
      series: [
        {
          data: chartData,
          name: "Twitter Followers",
          type: "line",
          color: "#009FDB",
        },
      ],
    },
    [chartData]
  );
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={9}>
        <Paper
          sx={{
            backgroundColor: "background.hover",
            p: 3,
            "& .loading-container": {
              minHeight: "252px",
            },
          }}
        >
          <Typography variant="body1" fontWeight={500} color={"text.secondary"} mb={2}>
            Audience Over Time
          </Typography>
          <ComponentWithStatus status={audienceOverTime.status} noData={chartData.length === 0}>
            <Box>
              <HighchartsReact highcharts={Highcharts} options={options} />
            </Box>
          </ComponentWithStatus>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={3}>
        <Paper
          sx={{
            backgroundColor: "background.hover",
            p: 3,
            height: "335px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <ComponentWithStatus
            status={audienceOverTime.status}
            LoadingComponent={
              <Box width={"100%"}>
                <Skeleton sx={{ width: "100%" }} />
                <Skeleton sx={{ width: "100%" }} />
                <Skeleton sx={{ width: "100%" }} />
              </Box>
            }
          >
            <Box>
              <Typography variant="h2" fontWeight={600}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Tooltip
                        title={
                          <>
                            Total of Followers{" "}
                            {formatNumber(
                              Number(
                                audienceOverTime.data?.twitterFollowers?.followersChangedRatio
                              ) * 100,
                              {
                                fractionDigits: 2,
                                suffix: "%",
                                prefix:
                                  Number(
                                    audienceOverTime.data?.twitterFollowers?.followersChangedRatio
                                  ) > 0
                                    ? "+"
                                    : "",
                              }
                            )}{" "}
                            in recent 30 days.
                          </>
                        }
                        placement="top-start"
                      >
                        <Typography
                          variant="body2"
                          fontWeight={500}
                          sx={{ display: "flex", cursor: "pointer", alignItems: "center", gap: 1 }}
                        >
                          Followers
                          <InfoIcon sx={{ fontSize: "1rem" }} />
                        </Typography>
                      </Tooltip>
                    </Box>
                    <Typography variant="h2" fontWeight={600} my={1}>
                      {formatNumber(audienceOverTime.data?.twitterFollowers?.followers)}
                    </Typography>
                    <Typography variant="small" color={"text.label1"}>
                      <Typography
                        component={"span"}
                        variant="small"
                        color={
                          Number(audienceOverTime.data?.twitterFollowers?.followersChangedRatio) > 0
                            ? "text.active3"
                            : "text.error"
                        }
                      >
                        {formatNumber(
                          Number(audienceOverTime.data?.twitterFollowers?.followersChangedRatio) *
                            100,
                          {
                            fractionDigits: 2,
                            suffix: "%",
                            prefix:
                              Number(
                                audienceOverTime.data?.twitterFollowers?.followersChangedRatio
                              ) > 0
                                ? "+"
                                : "",
                          }
                        )}
                      </Typography>{" "}
                      / 30 days
                    </Typography>
                  </Box>
                </Box>
              </Typography>
            </Box>
          </ComponentWithStatus>
        </Paper>
      </Grid>
    </Grid>
  );
}
