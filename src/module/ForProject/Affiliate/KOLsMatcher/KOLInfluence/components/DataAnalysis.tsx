import { Box, Grid, Paper, Typography } from "@mui/material";
import PerformanceAnalysis from "./PerformanceAnalysis";
import TweetAnalysis from "./TweetAnalysis";
import KOLsFilterAnalysis from "./KOLsFilterAnalysis";
import { useKOLsReportSelector } from "@centic-scoring/redux/hook";

export default function DataAnalysis() {
  const { performanceAnalysis, tweetAnalysis } = useKOLsReportSelector();

  const hasPerformanceData =
    performanceAnalysis?.data?.performanceAnalysis &&
    Object.keys(performanceAnalysis.data.performanceAnalysis).length > 0;
  const hasTweetData =
    tweetAnalysis?.data?.tweetsAnalysis &&
    Object.keys(tweetAnalysis.data.tweetsAnalysis).length > 0;

  if (!hasPerformanceData && !hasTweetData) {
    return null;
  }

  return (
    <Paper sx={{ p: 3, mt: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          mb: 3,
        }}
      >
        <Typography variant="h6" color={"text.secondary"}>
          KOLs/Influencers Data Analysis
        </Typography>
        <KOLsFilterAnalysis />
      </Box>
      <Grid container spacing={2} alignItems={"stretch"}>
        {hasPerformanceData && (
          <Grid item xs={12} sm={6}>
            <Paper sx={{ p: 3, backgroundColor: "background.hover", height: "100%" }}>
              <PerformanceAnalysis />
            </Paper>
          </Grid>
        )}
        {hasTweetData && (
          <Grid item xs={12} sm={6}>
            <Paper sx={{ p: 3, backgroundColor: "background.hover", height: "100%" }}>
              <TweetAnalysis />
            </Paper>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
}
