import React, { useState, useMemo, useCallback, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
  IconButton,
  Menu,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import Highcharts from "highcharts";
import { HighchartsReact } from "highcharts-react-official";
import { useAppDispatch, useKolUserSelector } from "@centic-scoring/redux/hook";
import {
  getActiveWallet,
  getNewHolders,
  getVolume,
} from "@centic-scoring/redux/slices/kol-user/fetchFuntions";
import useDualBarAndLineChartConfig from "@centic-scoring/hooks/highcharts/useDualBarAndLineChartConfig";
import {
  RTActiveWalletRequest,
  RTNewHoldersRequest,
  RTVolumeRequest,
} from "@centic-scoring/api/services/affiliate/affiliate";
import TuneIcon from "@mui/icons-material/Tune";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CenticLoading from "@centic-scoring/components/CenticLoading";

type DataType = "activeWallet" | "newHolders" | "volume";

const dataTypeOptions = [
  {
    value: "activeWallet" as DataType,
    label: "Active Wallets",
    icon: AccountBalanceWalletIcon,
    description: "Unique wallets that interacted with the contract",
  },
  {
    value: "newHolders" as DataType,
    label: "New Token Holders",
    icon: GroupAddIcon,
    description: "New addresses that received tokens",
  },
  {
    value: "volume" as DataType,
    label: "Transaction Volume",
    icon: TrendingUpIcon,
    description: "Total transaction volume",
  },
];

export default function OnChain() {
  const dispatch = useAppDispatch();
  const { activeWallet, newHolders, volume } = useKolUserSelector();

  // Date range state for applied dates (used for API calls)
  const [campaignStartDate, setCampaignStartDate] = useState<Dayjs | null>(dayjs("2024-10-21"));
  const [campaignEndDate, setCampaignEndDate] = useState<Dayjs | null>(dayjs("2024-11-09"));

  // Temporary date range state (for DateRangePicker before applying)
  const [tempDateRange, setTempDateRange] = useState<[Dayjs | null, Dayjs | null]>([
    dayjs("2024-10-21"),
    dayjs("2024-11-09"),
  ]);

  const [contractAddress] = useState<string>("0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984");
  const [projectId] = useState<string>("trane111");

  const preCampaignDays = useMemo(() => {
    if (!campaignStartDate || !campaignEndDate) return 20;
    return campaignEndDate.diff(campaignStartDate, "days") || 1;
  }, [campaignStartDate, campaignEndDate]);

  const [dataType, setDataType] = useState<DataType>("activeWallet");
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  const fetchData = useCallback(() => {
    if (!campaignStartDate || !campaignEndDate) return;

    const requestData = {
      contractAddress,
      projectId,
      campaignStartDate: campaignStartDate.format("YYYY-MM-DDTHH:mm:ss[Z]"),
      campaignEndDate: campaignEndDate.format("YYYY-MM-DDTHH:mm:ss[Z]"),
      preCampaignDays,
      maxPages: 10,
    };

    switch (dataType) {
      case "activeWallet":
        dispatch(getActiveWallet(requestData as RTActiveWalletRequest));
        break;
      case "newHolders":
        dispatch(getNewHolders(requestData as RTNewHoldersRequest));
        break;
      case "volume":
        dispatch(getVolume(requestData as RTVolumeRequest));
        break;
    }
  }, [
    dispatch,
    contractAddress,
    projectId,
    campaignStartDate,
    campaignEndDate,
    preCampaignDays,
    dataType,
  ]);

  const handleApplyDateRange = useCallback(() => {
    if (tempDateRange[0] && tempDateRange[1]) {
      setCampaignStartDate(tempDateRange[0]);
      setCampaignEndDate(tempDateRange[1]);
    }
  }, [tempDateRange]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const getCurrentData = () => {
    switch (dataType) {
      case "activeWallet":
        return activeWallet;
      case "newHolders":
        return newHolders;
      case "volume":
        return volume;
      default:
        return activeWallet;
    }
  };

  const currentData = getCurrentData();

  const chartData = useMemo(() => {
    if (!currentData.data?.data?.report) return null;

    const { summary, dailyData } = currentData.data.data.report;

    if (!dailyData || !Array.isArray(dailyData) || dailyData.length === 0) return null;
    if (!summary) return null;

    const lineChartData = dailyData.map((item) => ({
      x: new Date(item.date).getTime(),
      y: item.count,
    }));
    const dates = dailyData.map((item) => new Date(item.date).getTime());
    const minDate = Math.min(...dates);
    const maxDate = Math.max(...dates);
    const campaignStart = campaignStartDate?.valueOf() || minDate;
    const campaignEnd = campaignEndDate?.valueOf() || maxDate;

    const preCampaignPos = campaignStart - (preCampaignDays * 24 * 60 * 60 * 1000) / 2;
    const duringCampaignPos = campaignStart + (campaignEnd - campaignStart) / 2;

    return {
      lineData: lineChartData,
      summaryData: [
        { x: preCampaignPos, y: summary.preCampaign, name: "Before Campaign" },
        { x: duringCampaignPos, y: summary.duringCampaign, name: "During Campaign" },
      ],
      categories: dailyData.map((item) => item.date),
      summary,
    };
  }, [currentData.data, campaignStartDate, campaignEndDate, preCampaignDays]);

  const getCurrentDataOption = () => {
    return dataTypeOptions.find((option) => option.value === dataType) || dataTypeOptions[0];
  };

  const chartOptions = useDualBarAndLineChartConfig(
    {
      title: {
        text: getCurrentDataOption().label + " Analytics",
      },
      xAxis: {
        type: "datetime",
        title: {
          text: "Date",
        },
        plotBands:
          chartData && campaignStartDate && campaignEndDate
            ? [
                {
                  from: campaignStartDate.valueOf(),
                  to: campaignEndDate.valueOf(),
                  color: "rgba(102, 187, 106, 0.1)", // Light green tone
                  label: {
                    text: "Campaign Time",
                    style: { color: "#059669" },
                  },
                },
              ]
            : [],
      },
      yAxis: [
        {
          title: {
            text: getCurrentDataOption().label,
          },
          opposite: false,
        },
      ],
      series: chartData
        ? [
            {
              name: getCurrentDataOption().label + " Daily",
              type: "line",
              data: chartData.lineData,
              yAxis: 0,
              color: "rgb(190, 144, 204)", // Pink tone
              lineWidth: 2,
              marker: {
                enabled: true,
                radius: 3,
                fillColor: "rgb(190, 144, 204)",
                lineColor: "rgb(190, 144, 204)",
              },
            },
            {
              name: "Summary",
              type: "column",
              data: chartData.summaryData,
              yAxis: 0,
              color: "#059669", // Soft green tone
              pointWidth: 40,
            },
          ]
        : [],
      tooltip: {
        shared: true,
        formatter: function () {
          let tooltip = "";
          this.points?.forEach((point) => {
            if (point.series.type === "line") {
              tooltip += `<b>${point.series.name}</b><br/>`;
              tooltip += `${dayjs(point.x).format("DD/MM/YYYY")}: ${point.y}<br/>`;
            } else if (point.series.type === "column") {
              tooltip += `<b>${(point.point as any).name}</b><br/>`;
              tooltip += `Total: ${point.y}<br/>`;
            }
          });
          return tooltip;
        },
      },
      legend: {
        enabled: true,
      },
    },
    [chartData]
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ p: 3, width: "100%" }}>
        {/* Data Type Selector */}
        <Box sx={{ mb: 3, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton
              onClick={(e) => setMenuAnchor(e.currentTarget)}
              sx={{
                bgcolor: "#059669",
                color: "white",
                "&:hover": { bgcolor: "primary.dark" },
              }}
            >
              <TuneIcon />
            </IconButton>

            <Menu
              anchorEl={menuAnchor}
              open={Boolean(menuAnchor)}
              onClose={() => setMenuAnchor(null)}
            >
              <List sx={{ minWidth: 250 }}>
                {dataTypeOptions.map((option) => {
                  const IconComponent = option.icon;
                  return (
                    <ListItem
                      key={option.value}
                      onClick={() => {
                        setDataType(option.value);
                        setMenuAnchor(null);
                      }}
                      sx={{
                        cursor: "pointer",
                        bgcolor: dataType === option.value ? "primary.light" : "transparent",
                        "&:hover": { bgcolor: "grey.100" },
                      }}
                    >
                      <ListItemIcon>
                        <IconComponent color={dataType === option.value ? "primary" : "inherit"} />
                      </ListItemIcon>
                      <ListItemText primary={option.label} secondary={option.description} />
                    </ListItem>
                  );
                })}
              </List>
            </Menu>

            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {getCurrentDataOption().label}
              </Typography>
            </Stack>
          </Box>
          <Box sx={{ p: 2, border: "1px solid", borderColor: "divider", borderRadius: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
              Select campaign date range
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={4}>
                <DatePicker
                  label="Start date"
                  value={tempDateRange[0]}
                  onChange={(newValue) => setTempDateRange([newValue, tempDateRange[1]])}
                  slotProps={{ textField: { fullWidth: true, size: "small" } }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <DatePicker
                  label="End date"
                  value={tempDateRange[1]}
                  onChange={(newValue) => setTempDateRange([tempDateRange[0], newValue])}
                  slotProps={{ textField: { fullWidth: true, size: "small" } }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Button
                  variant="contained"
                  onClick={handleApplyDateRange}
                  disabled={!tempDateRange[0] || !tempDateRange[1]}
                  sx={{
                    bgcolor: "#059669",
                    "&:hover": { bgcolor: "#047857" },
                    height: "40px",
                    width: "100%",
                  }}
                >
                  Apply
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>

        {chartData?.summary && (
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Before Campaign
                  </Typography>
                  <Typography variant="h4">
                    {chartData.summary.preCampaign.toLocaleString()}
                  </Typography>
                  <Typography variant="body2">{getCurrentDataOption().label}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    During Campaign Time
                  </Typography>
                  <Typography variant="h4">
                    {chartData.summary.duringCampaign.toLocaleString()}
                  </Typography>
                  <Typography variant="body2">{getCurrentDataOption().label}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Change Percent
                  </Typography>
                  <Typography
                    variant="h4"
                    color={chartData.summary.changePercent >= 0 ? "success.main" : "error.main"}
                  >
                    {chartData.summary.changePercent >= 0 ? "+" : ""}
                    {chartData.summary.changePercent}%
                  </Typography>
                  <Typography variant="body2">Compared to Before Campaign</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        <Paper sx={{ p: 2, backgroundColor: "background.paper" }}>
          {currentData.status === "PROCESSING" && (
            <Box sx={{ textAlign: "center", py: 4 }}>
              <CenticLoading />
            </Box>
          )}

          {currentData.status === "FAILED" && (
            <Box sx={{ textAlign: "center", py: 4 }}>
              <Typography color="error">Cannot load data. Please try again.</Typography>
            </Box>
          )}

          {currentData.status === "SUCCESS" && chartData && (
            <Box sx={{ height: 500 }}>
              <HighchartsReact highcharts={Highcharts} options={chartOptions} />
            </Box>
          )}

          {currentData.status === "SUCCESS" && !chartData && (
            <Box sx={{ textAlign: "center", py: 4 }}>
              <Typography color="warning.main">
                Data loaded successfully but invalid to display chart
              </Typography>
            </Box>
          )}

          {currentData.status === "IDLE" && (
            <Box sx={{ textAlign: "center", py: 4 }}>
              <Typography>Chart will load automatically when data is available</Typography>
            </Box>
          )}
        </Paper>
      </Box>
    </LocalizationProvider>
  );
}
