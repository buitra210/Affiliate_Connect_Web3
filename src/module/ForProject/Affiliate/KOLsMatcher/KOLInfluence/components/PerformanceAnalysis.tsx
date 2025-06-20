import { Box, MenuItem, TextField, Typography } from "@mui/material";
import { HighchartsReact } from "highcharts-react-official";
import Highcharts from "highcharts";
import ComponentWithStatus from "@centic-scoring/components/ComponentWithStatus";
import useBarChartConfig from "@centic-scoring/hooks/highcharts/useBarChartConfig";
import { formatNumber } from "@centic-scoring/utils/string/stringUtils";
import { useMemo, useState } from "react";
import { CHART_COLOR_RANGE } from "@centic-scoring/constant";
import { useKOLsReportSelector } from "@centic-scoring/redux/hook";
import { RTKOlsRPPerformance } from "@centic-scoring/api/services/affiliate";

export default function PerformanceAnalysis() {
  const { performanceAnalysis, filter } = useKOLsReportSelector();
  const [currentField, setCurrentField] =
    useState<keyof RTKOlsRPPerformance["performanceAnalysis"][string]>("engagementRate");
  const handleChangeField = (value: keyof RTKOlsRPPerformance["performanceAnalysis"][string]) => {
    setCurrentField(value);
  };

  const chartData = useMemo(() => {
    return (
      Object.entries(performanceAnalysis?.data?.performanceAnalysis || {})
        .filter(([key]) => {
          return filter.kolsAnalysis[key];
        })
        .map(([, value]) => {
          return [value["kolName"], Number(value[currentField] || 0) * 100];
        }) || []
    );
  }, [currentField, performanceAnalysis.data, filter.kolsAnalysis]);

  const options = useBarChartConfig(
    {
      chart: {
        height: 350,
        scrollablePlotArea: { minWidth: 400 },
      },
      tooltip: {
        formatter: function () {
          return `<b>${
            this.y != undefined && formatNumber(Number(this.y), { fractionDigits: 2, suffix: "%" })
          }</b>`;
        },
      },
      plotOptions: {
        column: {
          pointWidth: 20,
          pointPadding: 0.2,
          borderWidth: 0,
          borderRadius: "6px",
        },
      },
      xAxis: {
        categories: chartData.map((i) => String(i[0])),
      },
      legend: {
        enabled: false,
      },
      yAxis: {
        gridLineWidth: 1,
        title: {
          text: undefined,
        },
        labels: {
          enabled: true,
          formatter() {
            const value = Number(this.value);
            return `<p style="color:#6D8198">${value}%</p>`;
          },
        },
      },
      series: [
        {
          type: "column",
          color: CHART_COLOR_RANGE[9],
          data: chartData,
        },
      ],
    },
    [chartData]
  );
  return (
    <Box>
      <Typography variant="body2" fontWeight={500} mb={2} sx={{ display: "block" }}>
        KOLs/Influencers Performance Analysis
      </Typography>
      <Box sx={{ width: "50%", minWidth: "200px" }}>
        <TextField
          select
          size="small"
          fullWidth
          onChange={(e) => {
            handleChangeField(
              e.target.value as keyof RTKOlsRPPerformance["performanceAnalysis"][string]
            );
          }}
          value={currentField}
          sx={{ my: 1 }}
        >
          <MenuItem value="engagementRate">Engagement Rate</MenuItem>
          <MenuItem value="viewRate">View Rate</MenuItem>
        </TextField>
      </Box>

      <Box sx={{ mt: 2 }}>
        <ComponentWithStatus status={"SUCCESS"} noData={false}>
          <Box>
            <HighchartsReact highcharts={Highcharts} options={options} />
          </Box>
        </ComponentWithStatus>
      </Box>
    </Box>
  );
}
