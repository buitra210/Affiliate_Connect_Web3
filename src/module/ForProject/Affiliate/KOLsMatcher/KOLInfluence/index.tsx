import { Box } from "@mui/material";
import Summary from "./components/Summary";
import Overview from "./components/Overview";
import DataAnalysis from "./components/DataAnalysis";
import DataFetcher from "./components/DataFetcher";
import { useAppDispatch } from "@centic-scoring/redux/hook";
import { useEffect } from "react";
import { resetTimeFilter } from "@centic-scoring/redux/slices/common";

export default function KOLsInfluence() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // DO NOTHING
    return () => {
      dispatch(resetTimeFilter());
    };
  }, [dispatch]);

  return (
    <Box>
      <DataFetcher />
      <Summary />
      <Overview />
      <DataAnalysis />
    </Box>
  );
}
