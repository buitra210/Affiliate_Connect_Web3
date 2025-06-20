import NaValue from "@centic-scoring/components/NaValue";
import { compactNumber } from "@centic-scoring/utils/string/stringUtils";
import { Avatar, Box, Paper, Tooltip, Typography } from "@mui/material";
import { capitalize } from "lodash";
import Link from "next/link";
import KOLFavorite from "./Favorite";
import useURLQuery from "@centic-scoring/hooks/common/useUrlQuery";

type Props = {
  userId: string;
  name?: string;
  userName?: string;
  avatar?: string;
  followers?: number;
  language?: string;
  status: string;
  averageEngagement: {
    likes?: number;
    replies?: number;
    retweets?: number;
    views?: number;
  };
  topic?: string[];
  purpose?: string[];
  favored: boolean;
};

export default function KOLsItem({ data }: { data: Props }) {
  const { id, getCustomKey } = useURLQuery();
  const getFromTab = getCustomKey("tab") || "leaderboard";
  return (
    <Link
      href={
        data.userId
          ? `/projects/affiliate/${id}/kols-matcher/${data.userName}?fromTab=${getFromTab}`
          : ""
      }
      style={{ textDecoration: "none", height: "100%" }}
    >
      <Paper
        sx={{
          px: 3,
          py: 2,
          borderRadius: 2,
          minHeight: "330px",
          "&:hover": {
            backgroundColor: "background.hover",
          },
          position: "relative",
          height: "100%",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", minHeight: "100px" }}>
          <Avatar src={data.avatar} sx={{ width: "4.375rem", height: "4.375rem", mr: 2 }} />
          <Box>
            <Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Tooltip title={data.name} placement="top">
                  <Typography
                    variant="h4"
                    fontWeight={600}
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      width: { xs: "80px", xsm: "200px", sm: "120px", md: "200px" },
                    }}
                  >
                    {data.name}
                  </Typography>
                </Tooltip>
                <Box sx={{ position: "absolute", right: "8px" }}>
                  <KOLFavorite userName={data.userName || ""} favorite={data.favored} />
                </Box>
              </Box>
              <Typography variant="body2" color={"text.label1"}>
                @{data.userName}
              </Typography>
            </Box>
            <Typography variant="body2" color={"secondary"}>
              {data.followers && (
                <Typography variant="h4" component={"span"} color={"text.primary"}>
                  {compactNumber(data.followers, 2)}
                </Typography>
              )}
              {!data.followers && <NaValue />} Followers
            </Typography>
          </Box>
        </Box>
        <Typography variant="body2" fontWeight={500} color={"secondary"} mt={3} mb={2}>
          Average engagement
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          {Object.entries(data.averageEngagement || {})?.map(([info, value], index) => {
            return (
              <Box key={index} textAlign="center">
                {(value || value === 0) && (
                  <Typography variant="body1" fontWeight={600}>
                    {compactNumber(value, 2)}
                  </Typography>
                )}
                {!(value || value === 0) && <NaValue />}
                <Typography variant="small" color={"text.active2"}>
                  {capitalize(info)}
                </Typography>
              </Box>
            );
          })}
        </Box>
        {Boolean(data.topic?.length) && (
          <>
            <Typography variant="body2" fontWeight={500} color={"secondary"} mt={2} mb={0.5}>
              Topic
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
              {data.topic?.map((topic, index) => {
                return <Topic key={index} title={topic} />;
              })}
            </Box>
          </>
        )}
        {Boolean(data.purpose?.length) && (
          <>
            <Typography variant="body2" fontWeight={500} color={"secondary"} mt={2} mb={0.5}>
              Purpose
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
              {data.purpose?.map((purpose, index) => {
                return <Topic key={index} title={purpose} />;
              })}
            </Box>
          </>
        )}
      </Paper>
    </Link>
  );
}

function Topic({ title }: { title?: string }) {
  return (
    <Box>
      <Typography
        variant="extraSmall"
        color={"text.active2"}
        sx={{
          border: "1px solid",
          borderColor: "text.active2",
          borderRadius: 2,
          px: 2,
          py: 0.5,
          backgroundColor: "background.primary",
          mr: 1,
          display: "block",
          my: 0.5,
        }}
      >
        {title}
      </Typography>
    </Box>
  );
}
