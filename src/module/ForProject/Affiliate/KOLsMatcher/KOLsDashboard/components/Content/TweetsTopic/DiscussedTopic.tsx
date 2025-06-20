import ComponentWithStatus from "@centic-scoring/components/ComponentWithStatus";
import useURLQuery from "@centic-scoring/hooks/common/useUrlQuery";
import useTreeChartConfig from "@centic-scoring/hooks/highcharts/useTreeChartConfig";
import { useAppDispatch, useKOLsSelector } from "@centic-scoring/redux/hook";
import { getKOLsDiscussedTopics } from "@centic-scoring/redux/slices/kols/fetchFunctions";
import { Box, Typography } from "@mui/material";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useMemo } from "react";
import Highcharts from "highcharts";
TreeMap(Highcharts);
import TreeMap from "highcharts/modules/treemap";
import { formatNumber } from "@centic-scoring/utils/string/stringUtils";
export default function MostDiscussedTopic() {
  const { status, data } = useKOLsSelector().kol.discussedTopic;
  const { id, kolUserName } = useURLQuery();
  const dispatch = useAppDispatch();

  const chartData = useMemo(() => {
    return Object.entries(data?.topics || {})
      .map(([key, value]) => {
        const description =
          typeof value.description === "object"
            ? Object.entries(value.description || {})
                .map(([k, v]) => `${k}: ${v * 100}%`)
                .join("<br />")
            : value.description;

        return {
          name: key,
          value: value.proportion * 100,
          description,
          colorValue: value.proportion * 100,
        };
      })
      .sort((a, b) => b.value - a.value);
  }, [data]);

  const options = useTreeChartConfig(
    {
      chart: {
        height: 482,
        type: "treemap",
      },
      colorAxis: {
        minColor: "#003D55",
        maxColor: "#66BADA",
      },
      tooltip: {
        useHTML: true,
        formatter: function () {
          const pointData = this.point as typeof this.point & { description: string };
          return `<b>${pointData.name}: ${formatNumber(pointData.value, {
            fractionDigits: 2,
          })}%</b><br/>
            <b>Description: ${pointData.description}</b>`;
        },
      },

      legend: {
        enabled: false,
      },

      series: [
        {
          dataLabels: {
            style: {
              color: "#FFFFFF",
              fontSize: "15px",
              fontWeight: "400",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
            },
            formatter: function () {
              return `
              <p>${this.point.name}</p></br>
              <b>${formatNumber(this.point.value, { fractionDigits: 2 })}%
              </p>`;
            },
          },
          type: "treemap",
          layoutAlgorithm: "squarified",
          alternateStartingDirection: true,
          borderColor: "#12212C",
          borderWidth: 2,
          data: chartData,
          states: {
            hover: {
              borderColor: "#009FDB",
              borderWidth: 2,
            },
          },
        },
      ],
    },
    [chartData]
  );

  useEffect(() => {
    if (id && kolUserName) {
      dispatch(getKOLsDiscussedTopics({ id: id, userName: kolUserName }));
    }
  }, [id, kolUserName, dispatch]);
  return (
    <Box>
      <Typography variant="body2" fontWeight={500} pb={3}>
        Most discussed topic
      </Typography>
      <Box
        sx={{
          "& .loading-container": {
            minHeight: "200px",
          },
          width: "100%",
        }}
      >
        <ComponentWithStatus status={status} noData={chartData.length === 0}>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </ComponentWithStatus>
      </Box>
    </Box>
  );
}
