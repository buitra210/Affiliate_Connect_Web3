import { Box, Paper, Typography } from "@mui/material";
import { HighchartsReact } from "highcharts-react-official";
import Highcharts from "highcharts";
import ComponentWithStatus from "@centic-scoring/components/ComponentWithStatus";
import { useMemo } from "react";
import useLineChartConfig from "@centic-scoring/hooks/highcharts/useLineChartConfig";
import { compactNumber, formatNumber } from "@centic-scoring/utils/string/stringUtils";
import { useKOLsReportSelector } from "@centic-scoring/redux/hook";
import { capitalize } from "lodash";
import KOLsFilterOverview from "./KOLsFilterOverview";
import { CHART_COLOR_RANGE } from "@centic-scoring/constant";

export default function FollowerGrowth() {
  const { performanceMetrics, filter } = useKOLsReportSelector();
  const chartData = useMemo(() => {
    const logs = Object.entries(performanceMetrics.data?.[filter.viewBy]?.changLogs || {}).map(
      ([timeStamp, value]) => {
        return { x: Number(timeStamp) * 1000, y: value.log };
      }
    );
    const ratio = Object.entries(performanceMetrics.data?.[filter.viewBy]?.changLogs || {}).map(
      ([timeStamp, value]) => {
        return { x: Number(timeStamp) * 1000, y: Number(value.ratio) * 100 };
      }
    );

    return { followers: logs, ratio: ratio };
  }, [performanceMetrics, filter.viewBy]);

  const kolsData = useMemo(() => {
    return Object.fromEntries(
      Object.entries(performanceMetrics.data?.kolInfo || {}).map(([timeStamp, value]) => {
        return [Number(timeStamp) * 1000, value.filter((v) => filter.kolsOverview[v.kol])];
      })
    );
  }, [performanceMetrics.data, filter.kolsOverview]);

  const kolsList = Object.keys(filter.kolsOverview);
  const initValue = chartData?.followers?.[0]?.y || 0;

  const options = useLineChartConfig(
    {
      chart: {
        type: "line",
        height: 250,
        alignThresholds: true,
        scrollablePlotArea: {
          minWidth: 450,
        },
        numberFormatter: function (value) {
          return `${formatNumber(value, { fractionDigits: 2 })}`;
        },
      },

      xAxis: {
        type: "datetime",
        crosshair: { width: 2 },
      },
      yAxis: [
        {
          gridLineWidth: 0.06,
          title: {
            text: undefined,
          },
          plotLines: [
            {
              width: 0.2,
              value: 0,
            },
            { width: 1, value: initValue, color: "#202732" },
          ],
          labels: {
            formatter: function () {
              return compactNumber(Number(this.value), 2);
            },
            style: {
              color: "#6D8198",
            },
          },
          gridLineColor: "#202732",
          opposite: false,
        },
        {
          gridLineWidth: 0.06,
          title: {
            text: undefined,
          },
          plotLines: [
            {
              width: 0.2,
              value: 0,
            },
          ],
          labels: {
            formatter: function () {
              return formatNumber(Number(this.value), {
                fractionDigits: 2,
                suffix: "%",
                padZero: false,
              });
            },
            style: {
              color: "#6D8198",
            },
          },
          gridLineColor: "#202732",
          opposite: true,
        },
      ],
      legend: {
        align: "right",
        verticalAlign: "top",
        squareSymbol: true,
        enabled: false,
      },
      tooltip: {
        shared: true,
        formatter: function () {
          return `<div>
          <p>${new Date(Number(this.x))?.toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            formatMatcher: "best fit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}</p>
          <div style="margin-left: 6px;">
          <p>${capitalize(filter.viewBy)}: <b>${formatNumber(this.y, {
            fractionDigits: 2,
          })}</b>${
            kolsData[Number(this.x)]
              ? `<p>KOLs Info:</p><span>${kolsData[Number(this.x)]
                  .map((kol) => {
                    return `<p style="padding-left: 5px; padding-right: 5px;"><span style="color: ${
                      CHART_COLOR_RANGE[kolsList.indexOf(kol.kol) || 0]
                    }; margin-right: 5px;">■</span>${capitalize(kol.kolName)}: <b>${formatNumber(
                      kol.numberPosts
                    )} tweets</b></p>`;
                  })
                  .join("")}</span>`
              : ""
          }
          </div>
          </div>`;
        },
        useHTML: true,
      },
      series: [
        {
          data: chartData.followers.map((i) => {
            const kolsInfo = kolsData[i.x]?.sort((a, b) => b.numberPosts - a.numberPosts);
            return {
              ...i,
              marker: {
                fillColor: CHART_COLOR_RANGE[kolsList.indexOf(kolsInfo?.[0]?.kol) || 0],
                enabled: Boolean(kolsInfo?.[0]),
                lineWidth: 2,
                radius: 7,
              },
            };
          }),
          name: capitalize(filter.viewBy),
          type: "line",
          color: "#15C381",
          yAxis: 0,
          zones: [
            {
              value: initValue,
              color: "#C22525",
            },
            { color: "#15C381" },
          ],
        },
      ],
    },
    [chartData]
  );

  return (
    <Paper sx={{ p: 3, backgroundColor: "background.hover" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: 2,
          mb: 3,
        }}
      >
        <Typography variant="h6" color="text.secondary">
          {`${capitalize(filter.viewBy.replace("ies", "y").replace("s", ""))} Growth`}
        </Typography>
        <KOLsFilterOverview />
      </Box>
      <ComponentWithStatus status={"SUCCESS"} noData={false}>
        <Box>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </Box>
      </ComponentWithStatus>
    </Paper>
  );
}
