import useBarChartConfig from "@centic-scoring/hooks/highcharts/useBarChartConfig";
import { highchartDateFormat } from "@centic-scoring/utils/format";
import { compactNumber } from "@centic-scoring/utils/string/stringUtils";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { HighchartsReact } from "highcharts-react-official";
import Highcharts from "highcharts";
import { useEffect, useMemo } from "react";
import { useStackedColorRange } from "@centic-scoring/hooks/useColorRange";
import ChartContainer from "@centic-scoring/components/ChartContainer";
import { checkData } from "@centic-scoring/components/ShareContainer";
import { RTKolEngagementAnalysis } from "@centic-scoring/api/services/affiliate";
import { StateStatus } from "@centic-scoring/components/component";
import { CHART_COLOR_RANGE } from "@centic-scoring/constant";
import { capitalize } from "lodash";

type AnalysisChartProps = {
  data: RTKolEngagementAnalysis["engagementChangeLogs"];
  status: StateStatus;
  view: RTKolEngagementAnalysis["viewChangeLogs"];
};

export default function AnalysisChart({ data, status, view }: AnalysisChartProps) {
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  const stackedColor = useStackedColorRange();
  const noData = useMemo(() => {
    return Object.entries(data || {}).length == 0;
  }, [data]);

  useEffect(() => {
    checkData(noData, `share/trending_addresses`);
  }, [noData]);

  const lineName = useMemo(() => {
    return Object.keys(view || {}).length ? "Views" : "";
  }, [view]);

  const chartData = useMemo(() => {
    let result: {
      name: string;
      data: { y: number }[];
      color: string;
      type: string;
      yAxis: number;
    } = {
      name: "",
      data: [],
      color: "",
      type: "",
      yAxis: 1,
    };
    let actionResult = [] as {
      [key: string]: number;
    }[];
    let actionNames: string[] = [];
    //all timestamps
    let timeStamp: number[] = [];

    const lineData = Object.keys({
      ...(data || {}),
    })
      .map((k) => {
        return {
          y: Number(view[k] || 0),
          marker: { enabled: Boolean(view[k]) },
          x: Number(k) * 1000,
        };
      })
      .filter((i) => i.y);

    result = {
      name: lineName,
      data: lineData,
      color: CHART_COLOR_RANGE[12],
      type: "line",
      yAxis: 1,
    };
    // eslint-disable-next-line prefer-const
    if (data) {
      Object.entries(data || {}).forEach(([ts, v]) => {
        let actions: { [key: string]: number } = {};
        Object.entries(v).forEach(([action, count]) => {
          const actionCount = typeof count === "number" ? count : parseInt(count, 100);
          actions[action] = (actions[action] || 0) + actionCount;
          if (!actionNames.includes(action)) {
            actionNames.push(action);
          }
        });
        timeStamp.push(Number(ts) * 1000);
        actionResult.push(actions);
      });
    }
    const fullActionsData = actionNames
      .map((item) => {
        const sum = actionResult.reduce((sum, currentValue) => sum + (currentValue[item] || 0), 0);
        return { sum: sum, name: item };
      })
      .sort((a, b) => b.sum - a.sum)
      .map((item) => item.name);

    return {
      stackedData: {
        data: fullActionsData
          .map((item, index) => ({
            name: capitalize(item),
            data: actionResult.map((action, index) => {
              return { y: action[item] || 0, x: timeStamp[index] };
            }),
            color: stackedColor[index],
          }))
          .reverse(),
        type: "column",
        yAxis: 0,
      },
      lineData: result,
    };
  }, [lineName, stackedColor, data, view]);

  const options = useBarChartConfig(
    {
      chart: {
        height: 400,
        scrollablePlotArea: {
          minWidth: 800,
        },
      },
      xAxis: {
        crosshair: false,
        type: "datetime",
      },
      yAxis: [
        {
          title: {
            text: undefined,
          },
          labels: {
            formatter() {
              const value: number = Number(this.value);
              return `<span>${compactNumber(value)}</span>`;
            },
            style: {
              color: "#97A8BC",
            },
          },
          gridLineWidth: 1,
          gridLineColor: "#202732",
        },
        {
          title: {
            text: undefined,
          },
          labels: {
            formatter() {
              const value: number = Number(this.value);
              return `<span>${compactNumber(value)}</span>`;
            },
            style: {
              color: "#97A8BC",
            },
          },
          opposite: true,
          gridLineWidth: 1,
          gridLineColor: "#202732",
        },
      ],
      legend: {
        enabled: true,
        symbolRadius: 2,
        align: lg ? "right" : "left",
        ...(lg && { layout: "vertical", verticalAlign: "middle" }),
      },
      plotOptions: {
        column: {
          stacking: "normal",
        },
        line: {
          dashStyle: "Dash",
          marker: {
            enabled: true,
            radius: 3,
          },
        },
      },
      tooltip: {
        formatter: function () {
          return (
            `<b style="color: #E2EDFF">${highchartDateFormat(this.x as number)}</b>` +
            "<br />" +
            `${
              this.points &&
              this.points
                // .reverse()
                .map((item) => {
                  if (item.y !== 0) {
                    return `<br /><div ><span style="color: ${item.color};">■</span>
                    <span style="color: #6D8198">${item.series.name}: </span>
                    <span style="color:#bac3d2;font-weight: 500">
                    ${item.y != undefined && item.y != null && compactNumber(item.y)}
                  </span>
                  </div>`;
                  }
                })
                .join("")
            }`
          );
        },
      },
      series: [...chartData.stackedData.data, chartData.lineData] as any,
    },
    [chartData]
  );

  return (
    <Box sx={{ minHeight: 300 }} className="custom-scrollbar">
      <ChartContainer
        status={status}
        noData={chartData.stackedData?.data?.length == 0}
        sx={{ minHeight: "400px" }}
      >
        <Box sx={{ position: "relative", width: "100%" }}>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </Box>
      </ChartContainer>
    </Box>
  );
}
