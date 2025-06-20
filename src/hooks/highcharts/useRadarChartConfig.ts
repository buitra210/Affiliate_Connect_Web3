import Highcharts from "highcharts";
import highchartsMoreInit from "highcharts/highcharts-more";
import { useMemo } from "react";
import useHighchartsDefaultConfig from "./useHighchartsDefaultConfig";

if (typeof Highcharts === "object") {
  highchartsMoreInit(Highcharts);
}

export default function useRadarChartConfig(
  extraOptions: Highcharts.Options,
  deps: unknown[] = []
) {
  const defaultConfig = useHighchartsDefaultConfig();

  return useMemo(() => {
    return Highcharts.merge(
      defaultConfig,
      {
        chart: {
          type: "area",
          polar: true,
        },
        colors: ["#009FDB"],
        xAxis: {
          tickmarkPlacement: "on",
          lineWidth: 0,
          gridLineColor: "#1d2a37",
        },
        yAxis: {
          gridLineInterpolation: "polygon",
          lineWidth: 0,
          // min: 0,
          // max: 1000,
          // tickInterval: 500,
        },
        pane: {
          startAngle: 0,
          endAngle: 360,
        },
        tooltip: {
          enabled: true,
          shared: true,
        },
      } as Highcharts.Options,
      extraOptions
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultConfig, ...deps]);
}
