// import useDebounce from "@centic-scoring/hooks/useDebounce";
import useDebounce from "@centic-scoring/hooks/useDebounce";
import { AddIcon, StrokeIcon } from "@centic-scoring/icons";
import { useAppDispatch, useKolUserSelector } from "@centic-scoring/redux/hook";
import { setKOLKpiExpect, TAffiliateKOL } from "@centic-scoring/redux/slices/affiliate-kol";
// import { useAppDispatch } from "@centic-scoring/redux/hook";
// import { editKOLKPIExpectation } from "@centic-scoring/redux/slices/affiliate-kol";
import { DeleteOutline } from "@mui/icons-material";
import { Box, Button, Grid, IconButton, MenuItem, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const TimeUnit = [
  { label: "Days", value: "Days" },
  { label: "Weeks", value: "Weeks" },
  { label: "Months", value: "Months" },
];

const Type = [
  { label: "Number of posts", value: "Number of posts" },
  { label: "Post per day", value: "Post per day" },
  { label: "Post per week", value: "Post per week" },
  { label: "Post per month", value: "Post per month" },
];

export type KPI = {
  [kpiId: number]: {
    require: {
      value: number;
      type: string;
    };
    timeRequire: {
      value: number;
      unit: string;
    };
  };
};

export default function RequestKPIExpectation({ requestId }: { requestId: number }) {
  const { detail } = useKolUserSelector().offers;
  const data = Object.fromEntries(
    detail.data?.offerInfo?.requirements?.kpis?.map((kpi, index) => [
      index,
      {
        require: {
          value: kpi.kpi,
          type: kpi.goal,
        },
        timeRequire: {
          value: kpi.time.value,
          unit: kpi.time.type,
        },
      },
    ]) || []
  );
  const dispatch = useAppDispatch();
  const [kpi, setKpi] = useState<TAffiliateKOL["kolRequest"][number]["kpiExpect"]>(data);

  const updateReduxState = useDebounce(() => {
    dispatch(
      setKOLKpiExpect({
        id: requestId,
        content: kpi,
      })
    );
  }, 500);
  useEffect(() => {
    updateReduxState();
  }, [kpi, updateReduxState, dispatch, requestId]);

  const handleAddKPI = () => {
    const newId = Date.now();
    setKpi((prev) => ({
      ...prev,
      [newId]: {
        require: { value: 0, type: "Number of posts" },
        timeRequire: { value: 0, unit: "Weeks" },
      },
    }));
  };

  const handleDeleteKPI = (id: number) => {
    setKpi((prev) => {
      const updatedKpi = { ...prev };
      delete updatedKpi[id];
      return updatedKpi;
    });
  };

  return (
    <Box mt={3} p={2.5}>
      <Typography variant="body1" color="text.label1" mb={1}>
        KPI Expectations *
      </Typography>
      <Box key={Object.entries(kpi).toString()}>
        {Object.entries(kpi).map(([id, kpiData]) => {
          const fixedUnit = getFixedTimeUnit(kpiData.require.type);

          return (
            <Box key={id}>
              <Grid container spacing={2} sx={{ alignItems: "center", mb: 2 }}>
                <Grid item xs={12} sm={5.5}>
                  <TextField
                    value={kpiData.require.value || ""}
                    fullWidth
                    onChange={(e) => {
                      setKpi((prev) => ({
                        ...prev,
                        [Number(id)]: {
                          ...prev[Number(id)],
                          require: {
                            ...prev[Number(id)].require,
                            value: Number(e.target.value),
                          },
                        },
                      }));
                    }}
                    InputProps={{
                      endAdornment: (
                        <Box sx={{ display: "flex", alignItems: "center", width: "72%" }}>
                          <StrokeIcon />
                          <TextField
                            select
                            fullWidth
                            value={kpiData.require.type}
                            onChange={(e) => {
                              const selectedType = String(e.target.value);
                              const newFixedUnit = getFixedTimeUnit(selectedType);
                              setKpi((prev) => ({
                                ...prev,
                                [Number(id)]: {
                                  ...prev[Number(id)],
                                  require: {
                                    ...prev[Number(id)].require,
                                    type: selectedType,
                                  },
                                  timeRequire: {
                                    ...prev[Number(id)].timeRequire,
                                    unit: newFixedUnit || "Weeks",
                                  },
                                },
                              }));
                            }}
                          >
                            {Type.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Box>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={5.5}>
                  <TextField
                    value={kpiData.timeRequire.value || ""}
                    fullWidth
                    onChange={(e) => {
                      setKpi((prev) => ({
                        ...prev,
                        [Number(id)]: {
                          ...prev[Number(id)],
                          timeRequire: {
                            ...prev[Number(id)].timeRequire,
                            value: Number(e.target.value),
                          },
                        },
                      }));
                    }}
                    InputProps={{
                      endAdornment: (
                        <Box sx={{ display: "flex", alignItems: "center", width: "40%" }}>
                          <StrokeIcon />
                          <TextField
                            select
                            fullWidth
                            value={kpiData.timeRequire.unit}
                            onChange={(e) => {
                              setKpi((prev) => ({
                                ...prev,
                                [Number(id)]: {
                                  ...prev[Number(id)],
                                  timeRequire: {
                                    ...prev[Number(id)].timeRequire,
                                    unit: e.target.value,
                                  },
                                },
                              }));
                            }}
                            disabled={Boolean(fixedUnit)}
                          >
                            {TimeUnit.map((option) => (
                              <MenuItem
                                key={option.value}
                                value={option.value}
                                disabled={fixedUnit ? option.value !== fixedUnit : false}
                              >
                                {option.label}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Box>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={1}>
                  {Object.entries(kpi).length >= 1 && (
                    <IconButton
                      sx={{
                        ml: 2,
                        color: "text.active2",
                      }}
                      onClick={() => {
                        handleDeleteKPI(Number(id));
                      }}
                    >
                      <DeleteOutline />
                    </IconButton>
                  )}
                </Grid>
              </Grid>
            </Box>
          );
        })}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button
            onClick={() => {
              handleAddKPI();
            }}
            variant="outlined"
            sx={{ backgroundColor: "background.primary" }}
          >
            <AddIcon />
            Add KPI
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export const getFixedTimeUnit = (requireType: string) => {
  switch (requireType) {
    case "Post per day":
      return "Days";
    case "Post per week":
      return "Weeks";
    case "Post per month":
      return "Months";
    default:
      return null;
  }
};
