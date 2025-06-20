import Highcharts from "highcharts";
import { useMemo } from "react";
import useHighchartsDefaultConfig from "./useHighchartsDefaultConfig";

export default function useBarChartConfig(extraOptions: Highcharts.Options, deps: unknown[] = []) {
  const defaultConfig = useHighchartsDefaultConfig();

  return useMemo(() => {
    return Highcharts.merge(
      defaultConfig,
      {
        colors: ["#009FDB"],
        chart: {
          type: "column",
        },
        plotOptions: {
          series: {
            borderWidth: 0,
            borderRadius: 2,
          },
          column: {
            pointWidth: 15,
            pointPadding: 0.2,
            borderWidth: 0,
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
        tooltip: {
          shared: true,
        },
      } as Highcharts.Options,
      extraOptions
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultConfig, ...deps]);
}
