import { StateStatus } from "@centic-scoring/components/component";
import { Information } from "@centic-scoring/module/UserExploreDetail/components/UserExplore/UserExploreSummary";
import { formatNumber } from "@centic-scoring/utils/string/stringUtils";
import { Box, Grid, Typography } from "@mui/material";
import React from "react";
type InformationProps = {
  engagementRate?: number;
  tweetsViewRate?: number;
  avgEngagement?: number;
  avgViews?: number;
  status: StateStatus;
  commentTitle?: string;
};
export default function AnalysisInfo({
  engagementRate,
  tweetsViewRate,
  avgEngagement,
  avgViews,
  status,
  commentTitle,
}: InformationProps) {
  return (
    <Box sx={{ py: 5 }}>
      <Grid container rowGap={1}>
        <Grid item xs={12} sm={6} md={3}>
          <Information
            label={"Engagement Rate"}
            tooltip={`Avg. Engagement for Tweets / Avg. Followers in recent 1 ${commentTitle}.`}
            value={
              <Typography sx={{ fontWeight: 700 }}>
                {formatNumber(Number(engagementRate) * 100, { fractionDigits: 2, suffix: "%" })}
              </Typography>
            }
            status={status}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Information
            label={"Tweets View Rate"}
            tooltip={`Avg. Views for Tweets / Avg. Followers in recent 1 ${commentTitle}.`}
            value={
              <Typography sx={{ fontWeight: 700 }}>
                {formatNumber(Number(tweetsViewRate) * 100, { fractionDigits: 2, suffix: "%" })}
              </Typography>
            }
            status={status}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Information
            label={"Avg. Engagement"}
            tooltip={`(Likes + Replies + Retweets) / Number of Tweets in recent 1 week ${commentTitle}`}
            value={
              <Typography sx={{ fontWeight: 700 }}>
                {formatNumber(avgEngagement, { fractionDigits: 0 })}
              </Typography>
            }
            status={status}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Information
            label={"Avg. Views"}
            tooltip={`Views / Number of Tweets in recent 1 ${commentTitle}`}
            value={
              <Typography sx={{ fontWeight: 700 }}>
                {formatNumber(avgViews, { fractionDigits: 0 })}
              </Typography>
            }
            status={status}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
