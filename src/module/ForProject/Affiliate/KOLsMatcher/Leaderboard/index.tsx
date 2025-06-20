/* eslint-disable react-hooks/exhaustive-deps */
import ComponentWithStatus from "@centic-scoring/components/ComponentWithStatus";
import {
  useAppDispatch,
  useForProjectCommonSelector,
  useKOLsSelector,
} from "@centic-scoring/redux/hook";
import { updateFilter } from "@centic-scoring/redux/slices/kols";
import {
  getKOLsList,
  getKOLsPurposes,
  getKOLsTopics,
} from "@centic-scoring/redux/slices/kols/fetchFunctions";
import { Box, Grid } from "@mui/material";
const TablePagination = dynamic(() => import("@mui/material/TablePagination"), { ssr: false });
import { useEffect } from "react";
import KOLsAdvanceFilters from "../components/KOLsAdvanceFilter";
import KOLsFilters from "../components/KOLsFilters";
import KOLsItem from "../components/KOLsItem";
import SearchKOL from "../components/SearchKOL";
import dynamic from "next/dynamic";
// import { RecommendIcon } from "@centic-scoring/icons";

export default function KOLsMatcherList() {
  const { kols, kolsFilter } = useKOLsSelector();
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(updateFilter({ topics: [], page: 0, purposes: [] }));
    };
  }, [dispatch]);

  const { project } = useForProjectCommonSelector();

  useEffect(() => {
    if (project.data?.id) {
      dispatch(
        getKOLsList({
          id: project.data?.id,
          input: { ...kolsFilter, page: Number(kolsFilter?.page) + 1 },
        })
      );
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
    if (project.data?.id) {
      dispatch(getKOLsTopics({ id: project.data?.id, type: "All" }));
      dispatch(getKOLsPurposes({ id: project.data?.id, type: "All" }));
    }
  }, [project.data?.id, dispatch]);

  return (
    <Box
      sx={{
        "& .loading-container": {
          minHeight: "200px",
        },
      }}
    >
      <Box mt={2} mb={4}>
        {/* <Introduction title="Welcome to KOLs Leaderboard" /> */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <KOLsAdvanceFilters />
          {/* <Button
            startIcon={
              <RecommendIcon
                sx={{
                  "& path": {
                    fill: isRecommendation ? "#FFFFFF" : "#009FDB",
                  },
                }}
              />
            }
            variant={isRecommendation ? "contained" : "outlined"}
            onClick={() => {
              dispatch(setRecommendation(!isRecommendation));
              dispatch(updateFilter({ topics: [], page: 0, purposes: [] }));
            }}
          >
            Recommendation
          </Button> */}
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            mt: 4,
            rowGap: 2,
          }}
        >
          <KOLsFilters />
          <SearchKOL />
        </Box>
      </Box>
      <ComponentWithStatus status={kols.status} noData={kols?.data?.data?.length === 0}>
        <Grid container spacing={2} alignItems={"stretch"}>
          {kols?.data?.data?.map((kol) => {
            return (
              <Grid key={kol.userId} item xs={12} sm={6} lg={4}>
                <KOLsItem data={kol} />
              </Grid>
            );
          })}
        </Grid>
      </ComponentWithStatus>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row-reverse",
        }}
      >
        <TablePagination
          count={kols.data?.numberOfDocs || 0}
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
    </Box>
  );
}
