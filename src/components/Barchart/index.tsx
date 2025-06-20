import useBarChartConfig from "@centic-scoring/hooks/highcharts/useBarChartConfig";
import { useTheme } from "@mui/material";
import Highcharts, { Options } from "highcharts";
import { HighchartsReact } from "highcharts-react-official";

export default function BarChart(plotData: { series: Array<number>; categories: Array<string> }) {
  const theme = useTheme();
  const options: Options = useBarChartConfig({
    xAxis: {
      type: "category",
      crosshair: false,
      categories: plotData.categories,
      title: {
        style: {
          color: theme.palette.text.secondary,
        },
        text: "Score range",
      },
    },
    yAxis: {
      type: "logarithmic",
      title: {
        style: {
          color: theme.palette.text.secondary,
        },
        text: "Number of entities",
      },
      labels: {
        formatter() {
          const value: number = Number(this.value);
          return `${value}`;
        },
      },
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      column: {
        pointWidth: 15,
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    tooltip: {
      formatter: function () {
        return (
          `Score range: <b>${this.x}</b>` +
          "<br />" +
          `Number of entities: <b>${this.y != undefined && this.y}</b>`
        );
      },
    },
    series: [
      {
        name: "score count",
        data: plotData.series,
        type: "column",
      },
    ],
  });

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
