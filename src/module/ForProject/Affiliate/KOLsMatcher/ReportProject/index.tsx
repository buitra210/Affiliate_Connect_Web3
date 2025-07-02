import { Box, Typography } from "@mui/material";
import React from "react";
import OnChain from "./OnChain";
import TotalLink from "./TotalLink";
import DonutAffiliateLink from "./DonutAffiliateLink";

export default function ReportProject() {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, color: "text.primary" }}>
        Affiliate Link Analytics
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 3, mb: 3 }}>
        <Box sx={{ backgroundColor: "background.paper4", p: 3, borderRadius: 2, width: "100%" }}>
          <TotalLink />
        </Box>
        <Box sx={{ backgroundColor: "background.paper4", p: 3, borderRadius: 2 }}>
          <DonutAffiliateLink />
        </Box>
      </Box>

      <Typography variant="h4" sx={{ mb: 3, color: "text.primary" }}>
        On Chain Analytics
      </Typography>
      <Box sx={{ backgroundColor: "background.paper4", p: 3, borderRadius: 2 }}>
        <OnChain />
      </Box>
    </Box>
  );
}
