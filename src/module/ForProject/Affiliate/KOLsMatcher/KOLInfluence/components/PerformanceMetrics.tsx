import {
  LikeIcon,
  ReplyIcon,
  RetweetIcon,
  SvgIconComponent,
  UserIcon,
} from "@centic-scoring/icons";
import { Box, Skeleton, Typography } from "@mui/material";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { formatNumber } from "@centic-scoring/utils/string/stringUtils";
import { useAppDispatch, useKOLsReportSelector } from "@centic-scoring/redux/hook";
import { useMemo } from "react";
import { setFilter } from "@centic-scoring/redux/slices/kols-report";

export default function PerformanceMetrics() {
  const { filter, performanceMetrics } = useKOLsReportSelector();
  const dispatch = useAppDispatch();
  const renderData = useMemo(() => {
    return [
      {
        title: "Followers",
        changeRate: performanceMetrics?.data?.followers?.followerGrowth,
        icon: UserIcon,
        filterValue: "followers",
      },
      {
        title: "Likes",
        changeRate: performanceMetrics?.data?.likes?.likeGrowth,
        icon: LikeIcon,
        filterValue: "likes",
      },
      {
        title: "Retweets",
        changeRate: performanceMetrics?.data?.retweets?.retweetGrowth,
        icon: RetweetIcon,
        filterValue: "retweets",
      },
      {
        title: "Replies",
        changeRate: performanceMetrics?.data?.replies?.replyGrowth,
        icon: ReplyIcon,
        filterValue: "replies",
      },
      {
        title: "Views",
        changeRate: performanceMetrics?.data?.views?.viewGrowth,
        icon: RemoveRedEyeOutlinedIcon,
        filterValue: "views",
      },
    ] as {
      title: string;
      changeRate: number;
      icon: SvgIconComponent;
      filterValue: "followers" | "likes" | "retweets" | "replies" | "views";
    }[];
  }, [performanceMetrics.data]);

  return (
    <Box>
      <Typography variant="h6" color="text.secondary" mb={2}>
        Performance Metrics
      </Typography>
      <Box sx={{ display: "flex", alignItems: "stretch", flexWrap: "wrap", gap: 2 }}>
        {renderData.map((metric, index) => {
          return (
            <Box
              key={index}
              sx={{
                backgroundColor:
                  metric.filterValue === filter.viewBy ? "background.active" : "background.hover",
                "&:hover": {
                  cursor: "pointer",
                },
                p: 3,
                borderRadius: 4,
                flex: 1,
                display: "flex",
                alignItems: "center",
              }}
              onClick={() => {
                dispatch(setFilter({ viewBy: metric.filterValue }));
              }}
            >
              <metric.icon fontSize="medium" sx={{ mr: 2, color: "text.label1" }} />
              <Box sx={{ width: "100%" }}>
                {performanceMetrics.status === "SUCCESS" && (
                  <>
                    <Typography variant="small" color={"text.label1"}>
                      {metric.title}
                    </Typography>
                    <Typography
                      variant="h4"
                      sx={{
                        color: metric.changeRate > 0 ? "text.active3" : "#C22525",
                      }}
                    >
                      {" "}
                      {metric.changeRate > 0 ? "+" : ""}
                      {formatNumber(Number(metric.changeRate) * 100, {
                        fractionDigits: 2,
                        suffix: "%",
                      })}
                    </Typography>
                  </>
                )}
                {performanceMetrics.status === "PROCESSING" && (
                  <>
                    <Skeleton />
                    <Skeleton />
                  </>
                )}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
