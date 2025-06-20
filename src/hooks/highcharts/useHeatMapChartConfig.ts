import Highcharts from "highcharts";
import { useMemo } from "react";
import useHighchartsDefaultConfig from "./useHighchartsDefaultConfig";

export default function useHeatMapChartConfig(
  extraOptions: Highcharts.Options,
  deps: unknown[] = []
) {
  const defaultConfig = useHighchartsDefaultConfig();

  return useMemo(() => {
    return Highcharts.merge(
      defaultConfig,
      {
        chart: {
          type: "heatmap",
        },
        colorAxis: {
          min: 0,
          minColor: "#1A212B",
          maxColor: "#009FDB",
        },
        legend: {
          align: "left",
          layout: "horizontal",
          margin: 4,
          verticalAlign: "top",
          y: -20,
          x: 0,
          symbolHeight: 280,
        },
      } as Highcharts.Options,
      extraOptions
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultConfig, ...deps]);
}
