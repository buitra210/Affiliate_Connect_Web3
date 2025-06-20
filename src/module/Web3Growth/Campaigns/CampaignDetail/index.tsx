import { AppTabs } from "@centic-scoring/components/primitives/Tabs";
import { Box, Tab, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Actions from "./Actions";
import Audience from "./Audience";
import Report from "./Report";
import CampaignSummary from "./CampaignSummary";
import PermissionComponent from "@centic-scoring/components/PermissionComponent";
import PDFExport from "./Report/PDFExport";
import { useAppDispatch } from "@centic-scoring/redux/hook";
import useURLQuery from "@centic-scoring/hooks/common/useUrlQuery";
import { checkCampaignData } from "@centic-scoring/redux/slices/campaign/fetchFunctions";

const tabs = [
  { id: "actions", value: 0, title: "Actions" },
  {
    id: "audience",
    value: 1,
    title: "Audience",
  },
  {
    id: "report",
    value: 2,
    title: "Report",
  },
];

export default function CampaignDetail() {
  const [value, setValue] = useState<number>(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const dp = useAppDispatch();
  const { campaignId, id } = useURLQuery();
  useEffect(() => {
    if (id && campaignId) {
      dp(checkCampaignData({ id, campaignId }));
    }
  }, [id, campaignId, dp]);

  return (
    <Box>
      <PermissionComponent
        disableMode="info"
        requiredPermisison={["view"]}
        permisionPath={["campaigns"]}
      >
        <CampaignSummary>{value === 2 && <PDFExport />}</CampaignSummary>
        <Box sx={{ width: "100%", mt: 2 }}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <AppTabs
              sx={{
                "& .MuiTabs-flexContainer": {
                  justifyContent: "center",
                },
              }}
              value={value}
              onChange={handleChange}
              aria-label="campaign detail tabs"
            >
              {tabs.map((item, index) => (
                <Tab
                  key={item.id}
                  label={
                    <Typography
                      variant="body2"
                      sx={{
                        color: item.value == value ? "text.active" : "text.active2",
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                        textTransform: "none",
                        flex: 1,
                      }}
                    >
                      {item.title}
                    </Typography>
                  }
                  disableRipple
                  value={index}
                  sx={{ flex: 1 }}
                />
              ))}
            </AppTabs>
          </Box>
          <Box sx={{ mt: 2 }}>
            {value === 0 && <Actions />}
            {value === 1 && <Audience />}
            {value === 2 && <Report />}
          </Box>
        </Box>
      </PermissionComponent>
    </Box>
  );
}
