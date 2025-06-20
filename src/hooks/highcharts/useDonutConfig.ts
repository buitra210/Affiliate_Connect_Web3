import Highcharts from "highcharts";
import { useMemo } from "react";
import useHighchartsDefaultConfig from "./useHighchartsDefaultConfig";
import { formatNumber } from "@centic-scoring/utils/string/stringUtils";

export default function useDonutConfig(extraOptions?: Highcharts.Options, deps: any[] = []) {
  const defaultConfig = useHighchartsDefaultConfig();

  return useMemo<Highcharts.Options>(() => {
    return Highcharts.merge(
      defaultConfig,
      {
        chart: {
          type: "pie",
          options3d: {
            enabled: false,
            alpha: 45,
          },
          numberFormatter: function (value) {
            return `${formatNumber(value, { fractionDigits: 2 })}`;
          },
        },
        tooltip: {
          enabled: false,
        },
        plotOptions: {
          pie: {
            cursor: "pointer",
            dataLabels: {
              enabled: false,
            },
            innerSize: "82%",
            depth: 45,
            borderWidth: 0,
          },
        },
        // responsive: {
        //   rules: [
        //     {
        //       condition: {
        //         maxWidth: 500,
        //       },
        //       chartOptions: {
        //         chart: {
        //           height: 200,
        //         },
        //       },
        //     },
        //   ],
        // },
      } as Highcharts.Options,
      extraOptions
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultConfig, ...deps]);
}
