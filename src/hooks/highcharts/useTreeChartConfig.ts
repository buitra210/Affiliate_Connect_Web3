import Highcharts from "highcharts";
import { useMemo } from "react";
import useHighchartsDefaultConfig from "./useHighchartsDefaultConfig";

export default function useTreeChartConfig(
  extraOptions?: Highcharts.Options,
  deps: unknown[] = []
) {
  const defaultConfig = useHighchartsDefaultConfig();

  return useMemo(() => {
    return Highcharts.merge(
      defaultConfig,
      {
        chart: {
          type: "treemap",
        },
        tooltip: {
          enabled: true,
        },
      } as Highcharts.Options,
      { ...extraOptions }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultConfig, ...deps]);
}
