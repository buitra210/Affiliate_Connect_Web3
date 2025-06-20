import Highcharts, { isArray } from "highcharts";
import { useMemo } from "react";
import useHighchartsDefaultConfig from "./useHighchartsDefaultConfig";
import { formatNumber } from "@centic-scoring/utils/string/stringUtils";

export default function useAreaChartConfig(extraOptions: Highcharts.Options, deps: unknown[] = []) {
  const defaultConfig = useHighchartsDefaultConfig();

  return useMemo(() => {
    return Highcharts.merge(
      defaultConfig,
      {
        chart: {
          type: "area",
          numberFormatter: function (number) {
            return `<p>${formatNumber(number)}</p>`;
          },
        },
        legend: {
          enabled: true,
          layout: "horizontal",
          align: "right",
          verticalAlign: "top",
          itemMarginTop: 0,
          itemMarginBottom: 10,
          itemStyle: {
            color: "#5185AA",
            fontWeight: "500",
          },
        },
        yAxis: {
          gridLineColor: "#1A212B",
        },
        plotOptions: {
          area: {
            marker: {
              enabled: false,
            },
            lineWidth: 2,
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
