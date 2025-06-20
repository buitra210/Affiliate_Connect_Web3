import Highcharts, { isArray } from "highcharts";
import { useMemo } from "react";
import useHighchartsDefaultConfig from "./useHighchartsDefaultConfig";
import mapJsonData from "@centic-scoring/hooks/highcharts/highchartMapWorld.json";

export default function useMapChartConfig(extraOptions: Highcharts.Options, deps: unknown[] = []) {
  const defaultConfig = useHighchartsDefaultConfig();

  return useMemo(() => {
    return Highcharts.merge(
      defaultConfig,
      {
        chart: {
          map: mapJsonData,
        },
        yAxis: {
          gridLineColor: "#1A212B",
        },
        credits: {
          enabled: false,
        },
        plotOptions: {
          area: {
            marker: {
              enabled: true,
            },
          },
        },
      } as Highcharts.Options,
      {
        ...extraOptions,
        yAxis: isArray(extraOptions.yAxis)
          ? (extraOptions.yAxis as Highcharts.YAxisOptions[]).map((item) => ({
              ...defaultConfig.yAxis,
              ...item,
            }))
          : extraOptions.yAxis,
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultConfig, ...deps]);
}
