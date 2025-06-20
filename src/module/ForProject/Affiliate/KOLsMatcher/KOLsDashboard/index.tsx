import { Box, IconButton, Typography } from "@mui/material";
import KOLOverview from "./components/Overview";
import KOLSummary from "./components/Summary";
import KOLEngagement from "./components/Engagement";
import KOLContent from "./components/Content";
import KOLCollaboration from "./components/Collaboration";
import { BackIcon } from "@centic-scoring/icons";
import { useRouter } from "next/router";
import useURLQuery from "@centic-scoring/hooks/common/useUrlQuery";

export default function KOLsDashboard() {
  const { id, getCustomKey } = useURLQuery();
  const router = useRouter();
  const fromTab = getCustomKey("fromTab") || "leaderboard";
  return (
    <Box
      sx={{
        "& .MuiPaper-root": {
          mb: 2,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "left",
          mb: 4,
        }}
      >
        <IconButton
          onClick={() => {
            // if (router.asPath.match(/\projects\/kols-matcher\/.*\/leaderboard\/*.*/)) {
            router.push(`/projects/affiliate/${id}/kols-matcher?tab=${fromTab}`);
            //   return;
            // }
            // if (router.asPath.match(/\projects\/kols-matcher\/.*\/watch-list\/*.*/)) {
            //   router.push(`/projects/kols-matcher/${id}/watch-list`);
            //   return;
            // }
            // history.back();
          }}
        >
          <BackIcon />
        </IconButton>
        <Typography color={"text.primary"} variant="h4" fontWeight={600}>
          KOLs Dashboard
        </Typography>
      </Box>
      <KOLSummary />
      <Box sx={{ my: 2 }}>
        <KOLOverview />
      </Box>
      <KOLEngagement />
      <KOLContent />
      <KOLCollaboration />
    </Box>
  );
}
