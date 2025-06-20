/* eslint-disable react-hooks/exhaustive-deps */
import ComponentWithStatus from "@centic-scoring/components/ComponentWithStatus";
import {
  useAppDispatch,
  useForProjectCommonSelector,
  useKOLsSelector,
} from "@centic-scoring/redux/hook";
import {
  getKOLsPurposes,
  getKOLsTopics,
  getKOLsWatchList,
} from "@centic-scoring/redux/slices/kols/fetchFunctions";
import { Box, Grid, TablePagination } from "@mui/material";
import { useEffect } from "react";

import { updateFilter } from "@centic-scoring/redux/slices/kols";
import KOLsAdvanceFilters from "../components/KOLsAdvanceFilter";
import KOLsFilters from "../components/KOLsFilters";
import KOLsItem from "../components/KOLsItem";
import SearchKOL from "../components/SearchKOL";

export default function KOLsWatchList() {
  const { kolsFilter, kolsWatchList } = useKOLsSelector();
  const { project } = useForProjectCommonSelector();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (project.data?.id) {
      dispatch(
        getKOLsWatchList({
          id: project.data?.id,
          input: { ...kolsFilter, page: Number(kolsFilter?.page) + 1 },
        })
      );
      dispatch(getKOLsTopics({ id: project.data?.id, type: "Favorite" }));
    }
  }, [
    project.data?.id,
    dispatch,
    kolsFilter.comments_max,
    kolsFilter.comments_min,
    kolsFilter.followers_max,
    kolsFilter.followers_min,
    kolsFilter.impressions_max,
    kolsFilter.impressions_min,
    kolsFilter.keyword,
    kolsFilter.language,
    kolsFilter.likes_max,
    kolsFilter.likes_min,
    kolsFilter.page,
    kolsFilter.pageSize,
    kolsFilter.retweets_max,
    kolsFilter.retweets_min,
    kolsFilter.status,
    kolsFilter.topics,
    kolsFilter.purposes,
    kolsFilter.sortType,
  ]);

  useEffect(() => {
    dispatch(updateFilter({ topics: [], page: 0, purposes: [] }));
  }, [dispatch]);

  useEffect(() => {
    if (project.data?.id) {
      dispatch(getKOLsTopics({ id: project.data?.id, type: "Favorite" }));
      dispatch(getKOLsPurposes({ id: project.data?.id, type: "Favorite" }));
    }
  }, [project.data?.id, dispatch]);

  return (
    <Box
      sx={{
        "& .loading-container": {
          minHeight: "200px",
        },
        "& .no-data-container": {
          maxWidth: "250px",
          // "& .MuiTypography-root": {
          //   color: "text.label1",
          // },
        },
      }}
    >
      <Box mt={2} mb={4}>
        {/* <Introduction title="Welcome to KOLs WatchList" /> */}
        <KOLsAdvanceFilters />
        <Box
          sx={{
            mt: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            rowGap: 2,
          }}
        >
          <KOLsFilters />
          <SearchKOL />
        </Box>
      </Box>
      <ComponentWithStatus
        status={kolsWatchList.status}
        noData={kolsWatchList?.data?.data?.length === 0}
        noDataText="Your Watchlist is empty, go to Leaderboard to select KOLs."
      >
        <Grid container spacing={2} alignItems={"stretch"}>
          {kolsWatchList?.data?.data?.map((kol) => {
            return (
              <Grid key={kol.userId} item xs={12} sm={6} lg={4}>
                <KOLsItem data={kol} />
              </Grid>
            );
          })}
        </Grid>

        <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
          <TablePagination
            count={kolsWatchList.data?.numberOfDocs || 0}
            onPageChange={(_, value) => {
              dispatch(updateFilter({ page: value }));
            }}
            page={kolsFilter.page || 0}
            rowsPerPageOptions={[9, 21, 48, 99]}
            onRowsPerPageChange={(e) => {
              dispatch(updateFilter({ pageSize: Number(e.target.value || 9) }));
            }}
            rowsPerPage={kolsFilter.pageSize || 9}
            align="right"
            labelRowsPerPage="Page size"
            showFirstButton
            showLastButton
          />
        </Box>
      </ComponentWithStatus>
    </Box>
  );
}
