/* eslint-disable react-hooks/exhaustive-deps */
import ComponentWithStatus from "@centic-scoring/components/ComponentWithStatus";
import { useAppDispatch, useKOLsSelector } from "@centic-scoring/redux/hook";
import { getKOLRecommendation } from "@centic-scoring/redux/slices/kols/fetchFunctions";
import { setKolsRecommendationForm } from "@centic-scoring/redux/slices/kols";
import { Box, Grid, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { KOLRecommendationRequest } from "@centic-scoring/api/services/recommendation-api";
import KOLRecommendationDialog from "../components/KOLRecommendationDialog";
import KOLRecommendationItem from "../components/KOLRecommendationItem";

export default function KOLsWatchList() {
  const { kolsRecommendation, kolsRecommendationForm } = useKOLsSelector();
  const dispatch = useAppDispatch();
  const [hasSearched, setHasSearched] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

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
    setDialogOpen(false);
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
        {!hasSearched && (
          <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => setDialogOpen(true)}
              sx={{ minWidth: "200px" }}
            >
              Find KOL
            </Button>
          </Box>
        )}

        <KOLRecommendationDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onSubmit={handleRecommendationSubmit}
          loading={kolsRecommendation.status === "PROCESSING"}
          initialValues={kolsRecommendationForm}
        />
      </Box>

      {hasSearched && (
        <Button
          variant="contained"
          size="large"
          onClick={() => setDialogOpen(true)}
          sx={{
            position: "fixed",
            bottom: 32,
            right: 32,
            minWidth: "120px",
            zIndex: 1000,
            boxShadow: 3,
            "&:hover": {
              boxShadow: 6,
            },
          }}
        >
          Find KOL
        </Button>
      )}

      {hasSearched && (
        <ComponentWithStatus
          status={kolsRecommendation.status}
          noData={kolsRecommendation?.data?.data?.recommendations?.length === 0}
          noDataText="No KOLs found"
        >
          <Box mb={3}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              {kolsRecommendation.data?.message ||
                `Found ${
                  kolsRecommendation.data?.data?.total_found || 0
                } KOLs suitable for your project`}
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
