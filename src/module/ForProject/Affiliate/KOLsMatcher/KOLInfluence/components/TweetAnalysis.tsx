import { Box, Typography } from "@mui/material";
import TweetAnalysisTable from "./TweetAnalysisTable";

export default function TweetAnalysis() {
  return (
    <Box>
      <Typography variant="body2" fontWeight={500} mb={2}>
        Tweet Time Analysis
      </Typography>
      <TweetAnalysisTable />
    </Box>
  );
}
