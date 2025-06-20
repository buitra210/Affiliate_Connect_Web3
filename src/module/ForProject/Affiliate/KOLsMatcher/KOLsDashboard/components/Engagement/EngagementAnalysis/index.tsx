import useURLQuery from "@centic-scoring/hooks/common/useUrlQuery";
import { useAppDispatch, useKOLsSelector } from "@centic-scoring/redux/hook";
import { getKOLEngagementAnalysis } from "@centic-scoring/redux/slices/kols/fetchFunctions";
import { Box, Button, ButtonGroup, Paper, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import AnalysisInfo from "./AnalysisInfo";
import dynamic from "next/dynamic";
const AnalysisChart = dynamic(() => import("./AnalysisChart"), { ssr: false });
export default function EngagementAnalysis() {
  const { id, kolUserName } = useURLQuery();
  const [typeFilter, setTypeFilter] = useState("Weekly");
  const { daily, weekly, monthly } = useKOLsSelector().kol.engagement.analysis;
  const onHandleChange = (filterType: string) => {
    setTypeFilter(filterType);
  };

  const selectData = useMemo(() => {
    if (typeFilter === "Daily") {
      return daily;
    }
    if (typeFilter === "Weekly") {
      return weekly;
    }
    if (typeFilter === "Monthly") {
      return monthly;
    }
  }, [typeFilter, daily, weekly, monthly]);
  const dispatch = useAppDispatch();
  const commentTitle = useMemo(() => {
    if (typeFilter === "Daily") {
      return "Day";
    }
    if (typeFilter === "Weekly") {
      return "Week";
    }
    if (typeFilter === "Monthly") {
      return "Month";
    }
  }, [typeFilter]);

  useEffect(() => {
    if (id && kolUserName)
      if (selectData?.fetchedId !== kolUserName || selectData?.data.status !== "SUCCESS") {
        dispatch(getKOLEngagementAnalysis({ id, userName: kolUserName, type_filter: typeFilter }));
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id, kolUserName, typeFilter, selectData?.fetchedId]);
  // const useData = useMemo(() => {
  //   Object.entries(selectData?.data?.data?.engagementChangeLogs).map(([key, value]) => {

  //   })
  // },[])
  return (
    <>
      <Paper sx={{ backgroundColor: "background.hover", p: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            rowGap: 2,
          }}
        >
          <Typography variant="body1" sx={{ color: "text.primary" }}>
            Engagement Analysis
          </Typography>
          <Box>
            <ButtonGroup>
              <Button
                value="Daily"
                onClick={() => onHandleChange("Daily")}
                variant={typeFilter === "Daily" ? "contained" : "outlined"}
                color={"primary"}
              >
                Daily
              </Button>
              <Button
                value="Weekly"
                onClick={() => onHandleChange("Weekly")}
                variant={typeFilter === "Weekly" ? "contained" : "outlined"}
                color={"primary"}
              >
                Weekly
              </Button>

              <Button
                value="Monthly"
                onClick={() => onHandleChange("Monthly")}
                variant={typeFilter === "Monthly" ? "contained" : "outlined"}
                color={"primary"}
              >
                Monthly
              </Button>
            </ButtonGroup>
          </Box>
        </Box>
        <AnalysisInfo
          engagementRate={selectData?.data.data?.engagementRate}
          avgEngagement={selectData?.data.data?.engagementAvg}
          avgViews={selectData?.data.data?.viewAvg}
          tweetsViewRate={selectData?.data.data?.viewRate}
          status={selectData?.data.status ?? "IDLE"}
          commentTitle={commentTitle}
        />
        <AnalysisChart
          data={selectData?.data.data?.engagementChangeLogs ?? {}}
          status={selectData?.data.status ?? "IDLE"}
          view={selectData?.data.data?.viewChangeLogs ?? {}}
        />
      </Paper>
    </>
  );
}
