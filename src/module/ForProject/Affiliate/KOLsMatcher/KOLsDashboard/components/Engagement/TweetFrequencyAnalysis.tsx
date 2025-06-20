import { CHART_COLOR_RANGE } from "@centic-scoring/constant";
import useURLQuery from "@centic-scoring/hooks/common/useUrlQuery";
import useBarChartConfig from "@centic-scoring/hooks/highcharts/useBarChartConfig";
import { useAppDispatch, useKOLsSelector } from "@centic-scoring/redux/hook";
import { getKOLsTweetFrequency } from "@centic-scoring/redux/slices/kols/fetchFunctions";
import { formatNumber } from "@centic-scoring/utils/string/stringUtils";
import { Box, Button, ButtonGroup, Grid, Paper, Typography, useTheme } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { HighchartsReact } from "highcharts-react-official";
import Highcharts from "highcharts";
import { Information } from "@centic-scoring/module/UserExploreDetail/components/UserExploreForProject/UserExploreSummary";
import ComponentWithStatus from "@centic-scoring/components/ComponentWithStatus";

export default function TweetFrequencyAnalysis() {
  const { daily, monthly, weekly } = useKOLsSelector().kol.tweetFrequency;
  const theme = useTheme();

  const dispatch = useAppDispatch();
  const { id, kolUserName } = useURLQuery();
  const [type, setType] = useState<"Daily" | "Weekly" | "Monthly">("Weekly");
  const handleChangeType = (type: "Daily" | "Weekly" | "Monthly") => {
    setType(type);
  };
  const data = useMemo(() => {
    if (type === "Daily") {
      return daily;
    }
    if (type === "Weekly") {
      return weekly;
    }
    if (type === "Monthly") {
      return monthly;
    }
    return weekly;
  }, [type, daily, weekly, monthly]);

  const commentTitle = useMemo(() => {
    if (type === "Daily") {
      return "Day";
    }
    if (type === "Weekly") {
      return "Week";
    }
    if (type === "Monthly") {
      return "Month";
    }
  }, [type]);

  const chartData = useMemo(() => {
    return Object.entries(data.data?.data?.tweetCountChangeLogs || {}).map(([timeStamp, value]) => {
      return { x: Number(timeStamp) * 1000, y: value };
    });
  }, [data]);

  const options = useBarChartConfig(
    {
      chart: {
        height: 300,
        scrollablePlotArea: { minWidth: 400 },
      },
      plotOptions: {
        column: {
          pointWidth: undefined,
          pointPadding: 0.1,
          groupPadding: 0.05,
          borderWidth: 0,
          borderRadius: "3px",
          grouping: false,
        },
      },
      xAxis: {
        type: "datetime",
      },
      legend: {
        enabled: true,
      },
      yAxis: {
        gridLineWidth: 1,
        title: {
          text: undefined,
          style: {
            color: theme.palette.text.secondary,
          },
        },
        labels: {
          enabled: true,
          formatter() {
            const value = Number(this.value);
            return `<p style="color:#6D8198">${value}</p>`;
          },
        },
      },
      series: [
        {
          data: chartData,
          type: "column",
          color: CHART_COLOR_RANGE[9],
          name: "Tweets count",
        },
      ],
    },
    [chartData]
  );

  useEffect(() => {
    if (!(data.data.status === "SUCCESS" && data.fetchedId === kolUserName) && id && kolUserName) {
      dispatch(getKOLsTweetFrequency({ id, userName: kolUserName, filterType: type }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.fetchedId, id, kolUserName, type]);

  return (
    <Paper sx={{ backgroundColor: "background.hover", p: 3, height: "590px" }}>
      <Typography variant="body1" fontWeight={500} color={"text.secondary"} mb={2}>
        Tweet Frequency Analysis
      </Typography>
      <ButtonGroup>
        <Button
          disableRipple
          variant={type === "Daily" ? "contained" : "outlined"}
          onClick={() => {
            handleChangeType("Daily");
          }}
        >
          Daily
        </Button>
        <Button
          disableRipple
          variant={type === "Weekly" ? "contained" : "outlined"}
          onClick={() => {
            handleChangeType("Weekly");
          }}
        >
          Weekly
        </Button>
        <Button
          disableRipple
          variant={type === "Monthly" ? "contained" : "outlined"}
          onClick={() => {
            handleChangeType("Monthly");
          }}
        >
          Monthly
        </Button>
      </ButtonGroup>
      <Grid container sx={{ my: 3 }}>
        <Grid item xs={12} sm={6}>
          <Information
            status={data.data.status}
            value={formatNumber(data.data.data?.tweetCount)}
            label="Tweet Count"
            tooltip="Total Tweets of KOL All Time"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Information
            status={data.data.status}
            value={
              <Typography variant="body1" fontWeight={700}>
                {`${formatNumber(data.data.data?.tweetFrequency)} tweet(s) `}
                <Typography variant="body2" component={"span"}>
                  / {commentTitle}
                </Typography>
              </Typography>
            }
            label="Tweet Frequency"
            tooltip={`Total Tweets / ${commentTitle}`}
          />
        </Grid>
      </Grid>
      <Box
        sx={{
          "& .loading-container": {
            minHeight: "200px",
          },
        }}
      >
        <ComponentWithStatus status={data.data.status} noData={chartData.length === 0}>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </ComponentWithStatus>
      </Box>
    </Paper>
  );
}
