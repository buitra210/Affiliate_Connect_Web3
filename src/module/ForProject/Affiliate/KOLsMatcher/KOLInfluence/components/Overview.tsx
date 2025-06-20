import { formatNumber } from "@centic-scoring/utils/string/stringUtils";
import { Box, Paper, Typography } from "@mui/material";
import PerformanceMetrics from "./PerformanceMetrics";
import FollowerGrowth from "./FollowerGrowth";
import { useKOLsReportSelector } from "@centic-scoring/redux/hook";
import ComponentWithStatus from "@centic-scoring/components/ComponentWithStatus";
import { useMemo } from "react";

export default function Overview() {
  const { overview } = useKOLsReportSelector();
  const { performanceMetrics, filter } = useKOLsReportSelector();
  const displayData = useMemo(() => {
    return {
      "KOLs/Influencers": overview?.data?.totalKOLs,
      Posts: overview?.data?.totalPosts,
      // Topics: overview?.data?.totalTopics,
    };
  }, [overview?.data]);

  return (
    <Paper sx={{ p: 3, backgroundColor: "background.paper" }}>
      <Typography variant="h6" color="text.secondary">
        Overview
      </Typography>
      <ComponentWithStatus
        status={overview.status}
        noData={Object.keys(overview.data || {})?.length === 0}
      >
        <>
          <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", my: 3 }}>
            {Object.entries(displayData).map(([key, value], index) => {
              return (
                <Box key={index} sx={{ display: "flex", alignItems: "center", mr: 2 }}>
                  <Typography variant="body2" color={"text.secondary"} mr={0.5}>
                    {key}:
                  </Typography>
                  <Typography variant="body2" fontWeight={600} color={"text.secondary"}>
                    {formatNumber(value)}
                  </Typography>
                </Box>
              );
            })}
          </Box>
          <Box my={2}>
            <PerformanceMetrics />
          </Box>
          <Box>
            <FollowerGrowth
              key={`${performanceMetrics.status}-${filter.viewBy}-${
                Object.values(filter.kolsOverview).filter((i) => i).length
              }`}
            />
          </Box>
        </>
      </ComponentWithStatus>
    </Paper>
  );
}
