import { Avatar, Box, Paper, Typography, Chip, Link as MUILink } from "@mui/material";
import { compactNumber } from "@centic-scoring/utils/string/stringUtils";
import { KOLRecommendationResponse } from "@centic-scoring/api/services/recommendation-api";

type KOLData = KOLRecommendationResponse["data"]["recommendations"][0];

type Props = {
  data: KOLData;
};

export default function KOLRecommendationItem({ data }: Props) {
  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 2,
        minHeight: "200px",
        "&:hover": {
          backgroundColor: "background.hover",
        },
        position: "relative",
        height: "100%",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Avatar src={data.profileImageUrl} sx={{ width: "4.375rem", height: "4.375rem", mr: 2 }} />
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Typography
              variant="h4"
              fontWeight={600}
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: "200px",
              }}
            >
              {data.displayName}
            </Typography>
            {data.verified && <Chip label="Verified" color="primary" size="small" sx={{ ml: 1 }} />}
          </Box>
          <Typography variant="body2" color="text.label1" mb={1}>
            @{data.kol_id}
          </Typography>
          <MUILink
            href={data.url}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              fontSize: "0.875rem",
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            {data.url}
          </MUILink>
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Typography variant="body2" fontWeight={500} color="secondary" mb={1}>
            Score
          </Typography>
          <Typography variant="h3" fontWeight={600} color="primary.main">
            {(data.score * 100).toFixed(1)}%
          </Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" fontWeight={500} color="secondary" mb={1}>
            Followers
          </Typography>
          <Typography variant="h4" fontWeight={600}>
            {compactNumber(data.followersCount, 2)}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}
