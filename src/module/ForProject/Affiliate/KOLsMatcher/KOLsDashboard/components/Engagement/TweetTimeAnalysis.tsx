import { RTTweetTime } from "@centic-scoring/api/services/affiliate";
import ComponentWithStatus from "@centic-scoring/components/ComponentWithStatus";
import useURLQuery from "@centic-scoring/hooks/common/useUrlQuery";
import useHeatMapChartConfig from "@centic-scoring/hooks/highcharts/useHeatMapChartConfig";
import { useAppDispatch, useKOLsSelector } from "@centic-scoring/redux/hook";
import { getKOLsTweetTime } from "@centic-scoring/redux/slices/kols/fetchFunctions";
import { HighchartsReact } from "highcharts-react-official";
import Highcharts from "highcharts";
import HeatMap from "highcharts/modules/heatmap";
HeatMap(Highcharts);
import React, { useEffect, useMemo, useState } from "react";
import { Box, Button, ButtonGroup, Paper, Tooltip, Typography, useTheme } from "@mui/material";
import { compactNumber, formatNumber } from "@centic-scoring/utils/string/stringUtils";
import { capitalize } from "lodash";
import { InfoIcon } from "@centic-scoring/icons";

export default function TweetTimeAnalysis() {
  const { tweetTime } = useKOLsSelector().kol;
  const [viewMode, setViewMode] = useState<"Engagement" | "Views">("Engagement");
  const { id, kolUserName } = useURLQuery();
  const theme = useTheme();
  const renderData = useMemo(() => {
    if (viewMode === "Engagement") {
      return tweetTime.data?.engagement || ({} as RTTweetTime["engagement"]);
    }
    if (viewMode === "Views") {
      return tweetTime.data?.view || ({} as RTTweetTime["engagement"]);
    }
    return tweetTime.data?.engagement || ({} as RTTweetTime["engagement"]);
  }, [viewMode, tweetTime.data]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id && kolUserName) {
      dispatch(getKOLsTweetTime({ id, userName: kolUserName }));
    }
  }, [id, dispatch, kolUserName]);

  const chartData = useMemo(() => {
    let xCategory: string[] = [];
    let yCategory: string[] = [];
    let values: [number, number, number][] = [];
    let tooltipValues: {
      [key: string]: {
        likes?: number;
        replies?: number;
        retweets?: number;
        total?: number;
        views?: number;
      };
    } = {};
    Object.entries(renderData).forEach(([xCate, yCates], indexX) => {
      xCategory.push(xCate);
      Object.entries(yCates).forEach(([yValue, value], indexY) => {
        yCategory.push(indexY % 2 === 0 ? yValue : "");
        values.push([indexX, indexY, value.total || value.views || 0]);
        tooltipValues[`${indexX}-${indexY}`] = value;
      });
    });
    return { xCategory, yCategory, values, tooltipValues };
  }, [renderData]);

  const options = useHeatMapChartConfig(
    {
      chart: {
        type: "heatmap",
        height: 435,
      },
      series: [{ data: chartData.values, name: "", type: "heatmap" }],
      xAxis: {
        categories: chartData.xCategory,
      },
      yAxis: {
        categories: chartData.yCategory,
        opposite: true,
        title: undefined,
      },
      colorAxis: {
        min: 0,
        minColor: "#1A212B",
        maxColor: "#009FDB",
        labels: {
          style: { color: theme.palette.text.secondary },
          formatter() {
            return `${compactNumber(this.value)}`;
          },
          align: "right",
          allowOverlap: false,
        },
        gridLineColor: "transparent",
        width: "80%",
      },
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
          },
        ],
      },
      tooltip: {
        formatter: function () {
          return `<div>${Object.entries(chartData.tooltipValues[`${this.point.x}-${this.point.y}`])
            .map(([key, value]) => {
              return `<span style="color: #6D8198;">${capitalize(key)}:</span> ${formatNumber(
                value,
                {
                  fractionDigits: 0,
                }
              )}<br />`;
            })
            .join("")}</div>`;
        },
      },
    },
    [chartData]
  );
  return (
    <Paper sx={{ p: 3, backgroundColor: "background.hover" }}>
      <Typography variant="body1" fontWeight={500} mb={2} color="text.secondary">
        Tweet Time Analysis
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          rowGap: 2,
        }}
      >
        <Tooltip
          title={
            "Analysis of relationship between the effectiveness of KOL's tweets (Likes, Replies, Retweets, View) and within the selected time frame."
          }
          placement="top-end"
        >
          <Typography
            variant="body1"
            fontWeight={600}
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            Tweet Engagement Hotspots
            <InfoIcon sx={{ fontSize: "20px" }} />
          </Typography>
        </Tooltip>
        <ButtonGroup>
          <Button
            variant={viewMode === "Engagement" ? "contained" : "outlined"}
            onClick={() => {
              setViewMode("Engagement");
            }}
          >
            Engagement
          </Button>
          <Button
            variant={viewMode === "Views" ? "contained" : "outlined"}
            onClick={() => {
              setViewMode("Views");
            }}
          >
            Views
          </Button>
        </ButtonGroup>
      </Box>
      <Box
        sx={{
          mt: 4,
          "& .loading-container": {
            minHeight: "435px",
          },
          "& .nodata-container": {
            minHeight: "435px",
          },
        }}
      >
        <ComponentWithStatus status={tweetTime.status} noData={chartData.values.length === 0}>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </ComponentWithStatus>
      </Box>
    </Paper>
  );
}
