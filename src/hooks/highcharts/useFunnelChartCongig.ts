import Highcharts from "highcharts";
import { useMemo } from "react";
import useHighchartsDefaultConfig from "./useHighchartsDefaultConfig";

export default function useFunnelChartConfig(extraOptions?: Highcharts.Options, deps: any[] = []) {
  const defaultConfig = useHighchartsDefaultConfig();

  return useMemo<Highcharts.Options>(() => {
    return Highcharts.merge(
      defaultConfig,
      {
        chart: {
          type: "funnel",
        },
        tooltip: {
          enabled: true,
        },
        plotOptions: {
          funnel: {
            cursor: "pointer",
            dataLabels: {
              enabled: true,
            },
            borderWidth: 0,
          },
        },
      } as Highcharts.Options,
      extraOptions
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultConfig, ...deps]);
}
