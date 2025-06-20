import { useTheme } from "@mui/material";
import { useMemo } from "react";
import Highcharts from "highcharts";
import { CHART_COLOR_RANGE } from "../useColorRange";

export default function useHighchartsDefaultConfig(): Highcharts.Options {
  const theme = useTheme();
  // const chartColors = useColorRange();
  return useMemo<Highcharts.Options>(
    () => ({
      colors: CHART_COLOR_RANGE,
      title: {
        style: {
          color: theme.palette.text.secondary,
          fontSize: "16px",
        },
      },
      yAxis: {
        gridLineColor: "#1A212B",
        lineColor: "#1A212B",
        tickColor: "#1A212B",
        title: {
          style: {
            color: theme.palette.text.label1,
          },
        },
        labels: {
          style: {
            color: theme.palette.text.label1,
          },
        },
      },
      xAxis: {
        gridLineColor: "#1A212B",
        tickColor: "#1A212B",
        lineColor: "#1A212B",
        title: {
          style: {
            color: theme.palette.text.label1,
          },
        },
        labels: {
          style: {
            color: theme.palette.text.secondary,
          },
        },
      },
      time: {
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      legend: {
        itemStyle: {
          color: theme.palette.text.primary,
        },
        itemHoverStyle: {
          color: theme.palette.primary.main,
        },
        itemHiddenStyle: {
          color: theme.palette.mode === "dark" ? "#7a7a7a" : "#cccccc",
        },
        symbolRadius: 2,
      },
      loading: {
        style: {
          backgroundColor: theme.palette.mode === "dark" ? "#000" : "#fff",
        },
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme]
  );
}
