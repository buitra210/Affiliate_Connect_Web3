import ChartContainer from "@centic-scoring/components/ChartContainer";
import { CHART_COLOR_RANGE } from "@centic-scoring/constant";
import useBarChartConfig from "@centic-scoring/hooks/highcharts/useBarChartConfig";
import useURLQuery from "@centic-scoring/hooks/common/useUrlQuery";
import { formatNumber } from "@centic-scoring/utils/string/stringUtils";
import { useAppDispatch, useAppSelector } from "@centic-scoring/redux/hook";
import { getAffiliateAnalytics } from "@centic-scoring/redux/slices/for-project-common";
import { Box, Typography } from "@mui/material";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useMemo, useEffect } from "react";

export default function TotalLink() {
  const dispatch = useAppDispatch();
  const { analytics } = useAppSelector((state) => state.forProjectCommon);
  const { id: projectId } = useURLQuery();

  useEffect(() => {
    if (projectId) {
      dispatch(getAffiliateAnalytics(projectId));
    }
  }, [dispatch, projectId]);

  const chartData = useMemo(() => {
    const barChartData = analytics.overview.data?.data?.barChart?.data || [];

    return {
      categories: barChartData.map((item: any) => {
        try {
          const url = new URL(item.redirectUrl);
          return url.pathname.replace("/", "") || url.hostname;
        } catch {
          return item.redirectUrl;
        }
      }),
      data: {
        data: barChartData.map((item: any, index: number) => ({
          y: item.totalClicks,
          color: CHART_COLOR_RANGE[index + (3 % CHART_COLOR_RANGE.length)],
          redirectUrl: item.redirectUrl,
        })),
      },
    };
  }, [analytics.overview.data]);

  const options = useBarChartConfig(
    {
      chart: {
        height: 300,
        scrollablePlotArea: { minWidth: 400 },
      },
      tooltip: {
        formatter: function () {
          return `<b>${this.x}</b><br />Total Clicks: <b>${
            this.y != undefined && formatNumber(this.y, { fractionDigits: 0 })
          }</b>`;
        },
      },
      plotOptions: {
        column: {
          pointWidth: Math.floor(250 / Number(chartData?.data?.data.length || 1)),
          pointPadding: 0.2,
          borderWidth: 0,
          borderRadius: "6px",
          cursor: "pointer",
          point: {
            events: {
              click: function (e: any) {
                // Mở redirect URL trong tab mới khi click vào cột
                const redirectUrl = e.point.options.redirectUrl;
                if (redirectUrl) {
                  window.open(redirectUrl, "_blank");
                }
              },
            },
          },
        },
      },
      xAxis: {
        visible: false,
        categories: chartData.categories,
      },
      legend: {
        enabled: false,
      },
      yAxis: {
        gridLineWidth: 1,
        title: {
          text: undefined,
        },
      },
      series: [chartData.data] as any,
    },
    [chartData.data]
  );
  const totalClicks = chartData.data.data.reduce((sum: number, item: any) => sum + item.y, 0);

  return (
    <Box>
      <Typography variant="body1" fontWeight={500} color="text.primary" sx={{ mb: 2 }}>
        Total Affiliate Links
      </Typography>

      {totalClicks > 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Total Clicks: <strong>{formatNumber(totalClicks)}</strong>
        </Typography>
      )}

      <ChartContainer status={analytics.overview.status} noData={!chartData.categories.length}>
        <Box sx={{ width: "100%", mt: 3 }}>
          <HighchartsReact highcharts={Highcharts} options={options} />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: "center" }}>
            Click on a column to open the redirect URL
          </Typography>
        </Box>
      </ChartContainer>
    </Box>
  );
}
