import TextEditor from "@centic-scoring/components/TextEditor";
import { AddIcon, StrokeIcon } from "@centic-scoring/icons";
import { useAppDispatch, useKOLOfferSelector } from "@centic-scoring/redux/hook";
import { DeleteOutline } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { KPI } from "../../NewOfferForm/steps/Step2";
import { editForm } from "@centic-scoring/redux/slices/kol-offer";
import useDebounce from "@centic-scoring/hooks/useDebounce";
import { getFixedTimeUnit } from "@centic-scoring/module/Affiliate/KOL/OfferDetail/Components/Request/RequestKPIExpectation";

const TimeUnit = [
  {
    label: "Days",
    value: "Days",
  },
  {
    label: "Weeks",
    value: "Weeks",
  },
  {
    label: "Months",
    value: "Months",
  },
];

const Type = [
  {
    label: "Number of posts",
    value: "Number of posts",
  },
  {
    label: "Post per day",
    value: "Post per day",
  },
  {
    label: "Post per week",
    value: "Post per week",
  },
  {
    label: "Post per month",
    value: "Post per month",
  },
];

export default function Requirements() {
  const { offerForm } = useKOLOfferSelector();
  const [kpi, setKpi] = useState<KPI>(offerForm.kpiExpect);
  const [updateText, setUpdateText] = useState<string>(offerForm.customizedRequirement.text);
  const dispatch = useAppDispatch();

  const updateReduxState = useDebounce(() => {
    dispatch(
      editForm({
        kpiExpect: kpi,
        customizedRequirement: {
          text: updateText,
        },
      })
    );
  }, 500);

  useEffect(() => {
    updateReduxState();
  }, [kpi, updateReduxState, updateText]);

  const handleAddKPI = () => {
    const newId = Date.now();
    setKpi((prev) => {
      return {
        ...prev,
        [newId]: {
          require: {
            value: 0,
            type: "Number of posts",
          },
          timeRequire: {
            value: 0,
            unit: "Weeks",
          },
        },
      };
    });
  };

  const handleDeleteKPI = (id: number) => {
    setKpi((prev) => {
      let tmp = { ...prev };
      try {
        delete tmp[id];
      } catch (error) {
        //pass
      }
      return tmp;
    });
  };

  return (
    <Box mb={3}>
      <Typography variant="body1" color="text.secondary">
        2. Requirements
      </Typography>
      <Paper
        sx={{
          p: 3,
          backgroundColor: "background.primary",
          borderRadius: 2,
          mt: 1,
        }}
      >
        <Box
          sx={{
            "& .input-container": {
              minHeight: "10px",
            },
            "& .text-container": {
              pb: "16px",
            },
          }}
        >
          {offerForm.customizedRequirement.text && (
            <TextEditor
              onValueChange={(e) => {
                setUpdateText(e);
              }}
              initValue={offerForm.customizedRequirement.text}
              inputType="markdown"
              placeholder=""
            />
          )}
        </Box>
        <Typography variant="body1" color="text.label1" mb={1}>
          KPI Expectations *
        </Typography>
        <Box>
          {Object.entries(kpi).map(([id, kpiData]) => {
            const fixedUnit = getFixedTimeUnit(kpiData.require.type);

            return (
              <Box key={id}>
                <Grid container spacing={2} sx={{ alignItems: "center", mb: 2 }}>
                  <Grid item xs={12} sm={5.5}>
                    <TextField
                      value={kpiData.require.value || ""}
                      sx={{ border: "1px solid #5185AA" }}
                      fullWidth
                      onChange={(e) => {
                        setKpi((prev) => {
                          return {
                            ...prev,
                            [Number(id)]: {
                              ...prev[Number(id)],
                              require: {
                                ...prev[Number(id)].require,
                                value: Number(e.target.value),
                              },
                            },
                          };
                        });
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
                                setKpi((prev) => {
                                  return {
                                    ...prev,
                                    [Number(id)]: {
                                      ...prev[Number(id)],
                                      require: {
                                        ...prev[Number(id)].require,
                                        type: String(e.target.value),
                                      },
                                      timeRequire: {
                                        ...prev[Number(id)].timeRequire,
                                        unit: newFixedUnit || "Weeks",
                                      },
                                    },
                                  };
                                });
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
                      sx={{ border: "1px solid #5185AA" }}
                      fullWidth
                      onChange={(e) => {
                        setKpi((prev) => {
                          return {
                            ...prev,
                            [Number(id)]: {
                              ...prev[Number(id)],
                              timeRequire: {
                                ...prev[Number(id)].timeRequire,
                                value: Number(e.target.value),
                              },
                            },
                          };
                        });
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
                                setKpi((prev) => {
                                  return {
                                    ...prev,
                                    [Number(id)]: {
                                      ...prev[Number(id)],
                                      timeRequire: {
                                        unit: e.target.value,
                                        value: prev[Number(id)].timeRequire.value,
                                      },
                                    },
                                  };
                                });
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
                    {Object.entries(kpi).length >= 2 && (
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
      </Paper>
    </Box>
  );
}
