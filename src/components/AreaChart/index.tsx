import { useTheme } from "@mui/material";
import Highcharts, { Options } from "highcharts";
import { HighchartsReact } from "highcharts-react-official";
import { mockScoreData } from "@centic-scoring/mock";

const AreaChart = () => {
  const theme = useTheme();
  const options: Options = {
    chart: {
      type: "area",
      backgroundColor: "transparent",
    },
    title: {
      text: "",
    },
    yAxis: {
      gridLineColor: "#1A212B",
      lineColor: "#1A212B",
      tickColor: "#1A212B",
      title: {
        style: {
          color: theme.palette.text.secondary,
        },
        text: "Number",
      },
      labels: {
        style: {
          color: theme.palette.text.secondary,
        },
      },
    },
    xAxis: {
      gridLineColor: "#1A212B",
      tickColor: "#1A212B",
      lineColor: "#1A212B",
      title: {
        style: {
          color: theme.palette.text.secondary,
        },
        text: "Score range",
      },
      labels: {
        style: {
          color: theme.palette.text.secondary,
        },
      },
    },
    legend: {
      enabled: false,
    },
    loading: {
      style: {
        backgroundColor: theme.palette.mode === "dark" ? "#000" : "#fff",
      },
    },
    series: [
      {
        data: mockScoreData,
        type: "area",
      },
    ],
    credits: {
      enabled: false,
    },
    plotOptions: {
      area: {
        fillColor: {
          linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
          stops: [
            [0, "rgb(0,159,219,0.6)"],
            [1, "rgb(0,159,219,0)"],
          ],
        },
        marker: {
          enabled: false,
        },
      },
    },
    tooltip: {
      formatter: function () {
        return ` Score Range: ${this.x}<br />Numer of wallet: ${this.y}`;
      },
    },
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default AreaChart;
