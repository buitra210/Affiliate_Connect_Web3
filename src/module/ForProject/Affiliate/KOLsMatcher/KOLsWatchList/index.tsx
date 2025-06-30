/* eslint-disable react-hooks/exhaustive-deps */
import ComponentWithStatus from "@centic-scoring/components/ComponentWithStatus";
import { useAppDispatch, useKOLsSelector } from "@centic-scoring/redux/hook";
import { getKOLRecommendation } from "@centic-scoring/redux/slices/kols/fetchFunctions";
import {
  setKolsRecommendationForm,
  clearKolsRecommendationData,
} from "@centic-scoring/redux/slices/kols";
import { Box, Grid, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { KOLRecommendationRequest } from "@centic-scoring/api/services/recommendation-api";
import KOLRecommendationForm from "../components/KOLRecommendationForm";
import KOLRecommendationItem from "../components/KOLRecommendationItem";

export default function KOLsWatchList() {
  const { kolsRecommendation, kolsRecommendationForm } = useKOLsSelector();
  const dispatch = useAppDispatch();
  const [hasSearched, setHasSearched] = useState(false);

  // Check if we have previous search results when component mounts
  useEffect(() => {
    if (
      kolsRecommendation.status === "SUCCESS" &&
      kolsRecommendation.data?.data?.recommendations &&
      kolsRecommendation.data.data.recommendations.length > 0
    ) {
      setHasSearched(true);
    }
  }, [kolsRecommendation.status, kolsRecommendation.data]);

  const handleRecommendationSubmit = (data: KOLRecommendationRequest) => {
    dispatch(setKolsRecommendationForm(data));
    dispatch(getKOLRecommendation(data));
    setHasSearched(true);
  };

  const handleReset = () => {
    dispatch(clearKolsRecommendationData());
    setHasSearched(false);
  };

  return (
    <Box
      sx={{
        "& .loading-container": {
          minHeight: "200px",
        },
        "& .no-data-container": {
          maxWidth: "400px",
        },
      }}
    >
      <Box mt={2} mb={4}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h5" fontWeight={600}>
            KOL Recommendation - Tìm KOL phù hợp với dự án
          </Typography>
          {hasSearched && (
            <Button variant="outlined" onClick={handleReset}>
              Tìm kiếm mới
            </Button>
          )}
        </Box>

        <KOLRecommendationForm
          onSubmit={handleRecommendationSubmit}
          loading={kolsRecommendation.status === "PROCESSING"}
          initialValues={kolsRecommendationForm}
        />
      </Box>

      {hasSearched && (
        <ComponentWithStatus
          status={kolsRecommendation.status}
          noData={kolsRecommendation?.data?.data?.recommendations?.length === 0}
          noDataText="Không tìm thấy KOL phù hợp với tiêu chí của bạn. Hãy thử điều chỉnh các tham số."
        >
          <Box mb={3}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              {kolsRecommendation.data?.message ||
                `Tìm thấy ${kolsRecommendation.data?.data?.total_found || 0} KOL phù hợp`}
            </Typography>
          </Box>

          <Grid container spacing={2} alignItems={"stretch"}>
            {kolsRecommendation?.data?.data?.recommendations?.map((kol) => {
              return (
                <Grid key={kol.kol_id} item xs={12} sm={6} lg={4}>
                  <KOLRecommendationItem data={kol} />
                </Grid>
              );
            })}
          </Grid>
        </ComponentWithStatus>
      )}
    </Box>
  );
}
