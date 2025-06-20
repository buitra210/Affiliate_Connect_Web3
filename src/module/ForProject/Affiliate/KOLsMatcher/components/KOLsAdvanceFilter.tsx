import { Box, Typography } from "@mui/material";
import TopicFilter from "./TopicFilter";
import PurposesFilter from "./PurposesFilter";
import SortBy from "./SortBy";

export default function KOLsAdvanceFilters() {
  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", mt: 4 }}>
        <Typography variant="body2" fontWeight={500} color="#9AA7BA" mr={2}>
          Advance
        </Typography>
        <TopicFilter />
        <PurposesFilter />
        <SortBy />
      </Box>
    </Box>
  );
}
