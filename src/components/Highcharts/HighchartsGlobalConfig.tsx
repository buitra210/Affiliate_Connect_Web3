import { CHART_COLOR_RANGE } from "@centic-scoring/constant";
import { useIsomorphicLayoutEffect } from "@centic-scoring/hooks";
import { alpha } from "@mui/material";
import Highcharts from "highcharts";

export default function HighchartsGlobalConfig() {
  useIsomorphicLayoutEffect(() => {
    Highcharts.setOptions({
      credits: {
        enabled: false,
      },
      chart: {
        backgroundColor: "transparent",
        style: {
          // eslint-disable-next-line quotes
          fontFamily: "inherit",
          fontSize: "14px",
        },
      },
      title: {
        text: undefined, // disable chart title by default
      },
      colors: CHART_COLOR_RANGE,
      time: {
        useUTC: false,
      },
      tooltip: {
        backgroundColor: alpha("#FFF", 0.95),
        borderRadius: 8,
        shadow: false,
        style: {
          color: "#000",
        },
      },
      plotOptions: {
        series: {
          dataLabels: {
            style: {
              textOutline: "0px",
            },
          },
        },
      },
    });
  }, []);

  return null;
}
