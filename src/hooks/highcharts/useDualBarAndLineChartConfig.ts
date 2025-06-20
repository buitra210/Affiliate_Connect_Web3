import { useMemo } from "react";
import Highcharts from "highcharts";
import useHighchartsDefaultConfig from "./useHighchartsDefaultConfig";

export const colorsDualBarAndLineChart = [
  "#31566F",
  "#437FA7",
  "#009FDB",
  "#0076DB",
  "#6858DB",
  "#9c90ec",
  "#db90ec",
  "#9451aa",
  "#9b358c",
  "#95094f",
];

export default function useDualBarAndLineChartConfig(
  extraOptions: Highcharts.Options,
  deps: unknown[] = []
) {
  const defaultConfig = useHighchartsDefaultConfig();

  return useMemo(() => {
    return Highcharts.merge(
      defaultConfig,
      {
        chart: {
          zoomType: "xy",
        },
        colors: colorsDualBarAndLineChart,
        tooltip: {
          shared: true,
        },
        plotOptions: {
          series: {
            borderWidth: 0,
            borderRadius: 0,
          },
          column: {
            pointWidth: 15,
            pointPadding: 0.2,
            borderWidth: 0,
            groupPadding: 0.4,
          },
          line: {
            marker: {
              enabled: false,
            },
          },
        },
        xAxis: {
          crosshair: {
            width: 15,
            snap: false,
            color: "transparent",
            dashStyle: "Solid",
          },
        },
        legend: {
          enabled: true,
          layout: "horizontal",
          align: "right",
          verticalAlign: "top",
          itemMarginTop: 0,
          itemMarginBottom: 10,
          // itemStyle: {
          //   color: '#5185AA',
          // },
        },
      } as Highcharts.Options,
      extraOptions
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultConfig, ...deps]);
}
