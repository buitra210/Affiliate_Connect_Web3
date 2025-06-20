import TimeFilter from "@centic-scoring/components/filters/TimeFilter";
import { useKOLsReportSelector } from "@centic-scoring/redux/hook";
import { compactNumber } from "@centic-scoring/utils/string/stringUtils";
import { Avatar, Box, Typography } from "@mui/material";
import AccountSwitch from "./AccountSwitch";

export default function Summary() {
  const { summary } = useKOLsReportSelector();
  const summaryData = summary.data;
  return (
    <>
      {summary.status === "SUCCESS" && (
        <Box sx={{ display: "flex", alignItems: "flex-start" }}>
          <Avatar
            src={summaryData?.profileImageUrl || ""}
            sx={{ mr: 2, width: "60px", height: "60px" }}
          />
          <Box flexGrow={1}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="body1" fontWeight={600} color={"text.secondary"} mr={0.5}>
                {summaryData?.displayName}
              </Typography>
              <AccountSwitch />
            </Box>
            <Typography
              variant="body2"
              fontWeight={600}
              color={"text.active"}
              my={0.5}
              component={"a"}
              href={summaryData?.url || ""}
              sx={{ textDecoration: "none" }}
              target="_blank"
            >
              @{summaryData?.userName}
            </Typography>
            <Typography
              variant="body1"
              fontWeight={600}
              color={"text.secondary"}
              mt={1}
              mb={3}
              component={"pre"}
            >
              {summaryData?.rawDescription}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
                  <Typography variant="h5" color={"text.primary"} mr={1}>
                    {compactNumber(Number(summaryData?.followersCount))}
                  </Typography>
                  <Typography variant="body2" color={"text.secondary"}>
                    {`${Number(summaryData?.followersCount) >= 0 ? "Follower" : "Followers"}`}
                  </Typography>
                </Box>

                {summaryData?.created && (
                  <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
                    <Typography variant="h5" color={"text.primary"} mr={1}>
                      {new Date(summaryData?.created || 0).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        formatMatcher: "best fit",
                      })}
                    </Typography>
                    <Typography variant="body2" color={"text.secondary"}>
                      Joined
                    </Typography>
                  </Box>
                )}
              </Box>
              <TimeFilter />
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}
