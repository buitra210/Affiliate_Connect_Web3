import { Box } from "@mui/material";
import React from "react";
import dynamic from "next/dynamic";
import KOLsBanner from "../KOLsMatcher/components/KOLsBanner";

const KolOffer = dynamic(() => import("./KOLOffer/index"), { ssr: false });
export default function OfferManagement() {
  // const { setCustomKey, getCustomKey } = useURLQuery();
  // const { resetParam } = useKOLsConnectparams();
  // const currentTab = useMemo(() => {
  //   return (getCustomKey("tab") || "kol") as "kol" | "ambassador";
  // }, [getCustomKey]);

  // const handleChange = (event: React.SyntheticEvent, newValue: string) => {
  //   setCustomKey("tab", newValue);
  //   resetParam();
  // };

  // const tabs = [
  //   {
  //     id: 1,
  //     value: "kol",
  //     label: "KOL Offer",
  //     disabled: false,
  //   },
  //   {
  //     id: 2,
  //     value: "ambassador",
  //     label: "Ambassador Offer",
  //     disabled: false,
  //   },
  // ];
  return (
    <Box>
      <KOLsBanner
        title="Offer Management"
        src="/affiliate/kol-project-banner.png"
        content="Organize all offers created."
      />
      {/* <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          position: "relative",
        }}
      >
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
                backgroundColor: "#0D1921",
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
            mb: 3,
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
      </Box>
      <Box sx={{ mt: 2 }}>
        {currentTab === "kol" && <KolOffer />}
        {currentTab === "ambassador" && <AmbassadorOffer />}
      </Box> */}
      <KolOffer />
    </Box>
  );
}
