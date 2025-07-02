import { Box, Tab, Tabs, Typography } from "@mui/material";
import React, { useMemo } from "react";

import useURLQuery from "@centic-scoring/hooks/common/useUrlQuery";
import KOLsConnect from "../../Affiliate/KOLsMatcher/KOLsConnect";
import KOLsWatchList from "./KOLsWatchList";
import KOLsBanner from "./components/KOLsBanner";
import ReportProject from "./ReportProject";

export default function KOLsMatcher() {
  const { setCustomKey, getCustomKey } = useURLQuery();
  const currentTab = useMemo(() => {
    return (getCustomKey("tab") || "connect") as "watchlist" | "connect" | "report";
  }, [getCustomKey]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setCustomKey("tab", newValue);
  };

  const tabs = [
    {
      id: 2,
      value: "watchlist",
      label: "KOL Watchlist",
      disabled: false,
    },
    {
      id: 3,
      value: "connect",
      label: "KOL Connection",
      disabled: false,
    },
    {
      id: 4,
      value: "report",
      label: "KOL Report",
      disabled: false,
    },
  ];

  return (
    <Box>
      {currentTab === "watchlist" && (
        <KOLsBanner
          title="KOL Watchlist"
          content="Monitor and keep track of your selected KOLs."
          src="/affiliate/kol-project-banner.png"
        />
      )}
      {currentTab === "connect" && (
        <KOLsBanner
          title="KOL Connection"
          content="Manage all offers responsed by your KOLs."
          src="/affiliate/kol-project-banner.png"
        />
      )}
      {currentTab === "report" && (
        <KOLsBanner
          title="KOL Report"
          content="Analyze the impact of your KOLs onto project."
          src="/affiliate/kol-project-banner.png"
        />
      )}
      <Tabs
        variant="scrollable"
        value={currentTab}
        scrollButtons={"auto"}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
        sx={{
          ".MuiTabs-flexContainer": {
            position: "relative",
            minWidth: "fit-content",
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 4,
              borderRadius: "10px",
              // backgroundColor: "#0D1921",
              zIndex: -1,
            },
            ".MuiTab-root": {
              flex: 1,
              overflow: "visible",
              "&[disabled]": {
                color: "text.primary",
                opacity: 0.3,
                cursor: "not-allowed",
                pointerEvents: "auto",
              },
              textTransform: "none",
              fontWeight: 600,
            },
          },
          ".MuiTabs-indicator": {
            height: 4,
            borderRadius: "10px",
            bgcolor: "text.active",
            zIndex: 2,
          },
        }}
      >
        {tabs.map((item) => (
          <Tab
            disabled={item.disabled}
            key={item.id}
            value={item.value}
            sx={{ minWidth: "200px" }}
            label={
              <Typography
                variant="body2"
                sx={{
                  position: "relative",
                  display: "flex",
                  color: currentTab == item.value ? "text.active" : "text.active2",
                  fontWeight: 600,
                }}
              >
                {item.label}
              </Typography>
            }
          />
        ))}
      </Tabs>
      <Box sx={{ mt: 2 }}>
        {currentTab === "watchlist" && <KOLsWatchList />}
        {currentTab === "connect" && <KOLsConnect />}
        {currentTab === "report" && <ReportProject />}
      </Box>
    </Box>
  );
}
