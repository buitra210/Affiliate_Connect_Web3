import { Box, Typography } from "@mui/material";
import FollowerFilters from "./FollowerFilter";
import EngagementRateFilter from "./EngagementRateFilter";

export default function KOLsFilters() {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Typography variant="body2" fontWeight={500} color="#9AA7BA" mr={2}>
        Filter
      </Typography>
      <FollowerFilters />
      <EngagementRateFilter />
    </Box>
  );
}
