import TextEditor from "@centic-scoring/components/TextEditor";
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
import { AddIcon, StrokeIcon } from "@centic-scoring/icons";
import { DeleteOutline } from "@mui/icons-material";
import { useAppDispatch, useKOLOfferSelector } from "@centic-scoring/redux/hook";
import useDebounce from "@centic-scoring/hooks/useDebounce";
import { editForm } from "@centic-scoring/redux/slices/kol-offer";
import { KOLConnectAPI } from "@centic-scoring/api/services/affiliate/affiliate";
import useURLQuery from "@centic-scoring/hooks/common/useUrlQuery";
import { toast } from "react-toastify";
import CenticLoading from "@centic-scoring/components/CenticLoading";
import CachedIcon from "@mui/icons-material/Cached";
import { APP_ANIMATION } from "@centic-scoring/animations";
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

export type KPI = {
  [id: number]: {
    // type: string;
    // value: number;
    // unit: string;
    // range: number;
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

export default function Step2() {
  const { offerForm } = useKOLOfferSelector();
  const { id } = useURLQuery();
  const [contentText, setContentText] = useState<string>(offerForm.customizedRequirement.text);
  const [content, setContent] = useState<string>("");
  const [kpi, setKpi] = useState<KPI>(offerForm.kpiExpect);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const updateReduxState = useDebounce(() => {
    dispatch(
      editForm({
        customizedRequirement: {
          text: contentText,
        },
        kpiExpect: kpi,
      })
    );
  }, 500);

  useEffect(() => {
    updateReduxState();
  }, [contentText, kpi, updateReduxState]);

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

  const handleGeneratContent = async () => {
    setLoading(true);
    try {
      const res = await KOLConnectAPI.getRecomend(id, offerForm.description.text);
      setContent(res.content);
    } catch (error) {
      toast.error((error as Error).message);
      //pass
    }
    setLoading(false);
  };

  return (
    <Paper sx={{ p: 3.5 }}>
      <Typography variant="body1" color="text.label1" mb={1}>
        Customized requirements
      </Typography>
      <Paper
        sx={{ backgroundColor: "background.default", mt: 1, px: 1, pb: 4, position: "relative" }}
      >
        <TextEditor
          outputType="markdown"
          inputType="markdown"
          initValue={contentText}
          updateValue={content}
          onValueChange={(e) => setContentText(e)}
          placeholder="Enter your additional requirements, your could refer our"
        />
        {!contentText && (
          <Button
            variant="text"
            sx={{
              position: "absolute",
              left: 470,
              top: 15,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
            onClick={handleGeneratContent}
            disabled={loading}
          >
            <Typography
              variant="body1"
              color="text.label1"
              fontWeight={600}
              sx={{ textDecoration: "underline" }}
            >
              Recommendation
            </Typography>
            {loading && <CenticLoading size={20} />}
          </Button>
        )}

        {((content && contentText) || (offerForm.customizedRequirement && contentText)) && (
          <Button
            startIcon={
              <CachedIcon
                sx={{
                  animation: loading
                    ? `${APP_ANIMATION.rotate} 1s linear infinite reverse`
                    : "none",
                }}
              />
            }
            onClick={handleGeneratContent}
            variant="outlined"
            color="info"
            sx={{ position: "absolute", left: "16px", bottom: "16px" }}
          >
            Reload
          </Button>
        )}
      </Paper>
      <Box mt={3}>
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
      </Box>
    </Paper>
  );
}
