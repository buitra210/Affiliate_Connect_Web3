import ChartContainer from "@centic-scoring/components/ChartContainer";
import { CHART_COLOR_RANGE } from "@centic-scoring/constant";
import useDonutConfig from "@centic-scoring/hooks/highcharts/useDonutConfig";
import useURLQuery from "@centic-scoring/hooks/common/useUrlQuery";
import { formatNumber } from "@centic-scoring/utils/string/stringUtils";
import { useAppDispatch, useAppSelector } from "@centic-scoring/redux/hook";
import {
  getAffiliateAnalytics,
  getAffiliateAnalyticsDonut,
  resetDonutDetailState,
} from "@centic-scoring/redux/slices/for-project-common";
import { Box, Grid, Tooltip, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { useMemo, useState, useEffect } from "react";
import useKOLsConnectparams from "../KOLsConnect/hooks/useKOLsConnectParams";

export default function DonutAffiliateLink() {
  const dispatch = useAppDispatch();
  const { resetParam, setMultipleParams } = useKOLsConnectparams();

  const { analytics } = useAppSelector((state) => state.forProjectCommon);
  const { id: projectId } = useURLQuery();
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [selectedRedirectUrl, setSelectedRedirectUrl] = useState<string>("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleRowClick = (offerId: string, action: string) => {
    setMultipleParams({ offerID: offerId, action: action.toLowerCase(), mode: "view" });
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (projectId) {
      dispatch(getAffiliateAnalytics(projectId));
    }
  }, [dispatch, projectId]);

  useEffect(() => {
    const redirectUrls = analytics.overview.data?.data?.donutChart?.redirectUrls || [];
    if (redirectUrls.length > 0 && !selectedRedirectUrl) {
      setSelectedRedirectUrl(redirectUrls[0]);
    }
  }, [analytics.overview.data, selectedRedirectUrl]);

  useEffect(() => {
    if (projectId && selectedRedirectUrl) {
      dispatch(getAffiliateAnalyticsDonut({ projectId, redirectUrl: selectedRedirectUrl }));
    }
  }, [dispatch, projectId, selectedRedirectUrl]);

  useEffect(() => {
    resetParam();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUrlChange = (newUrl: string) => {
    dispatch(resetDonutDetailState());
    setSelectedRedirectUrl(newUrl);
    handleMenuClose();
  };

  const chartData = useMemo(() => {
    const donutData = analytics.donutDetail.data?.data?.data || [];

    return donutData.map((item, index) => {
      const offerId = item.affiliateId.split("?")[0];

      return {
        id: offerId,
        name: item.label,
        y: item.clicks,
        color: CHART_COLOR_RANGE[index + (4 % CHART_COLOR_RANGE.length)],
        affiliateId: item.affiliateId,
        offerId: offerId,
      };
    });
  }, [analytics.donutDetail.data]);

  const options = useDonutConfig(
    {
      chart: {
        height: 400,
      },
      plotOptions: {
        pie: {
          borderRadius: 0,
          innerSize: "70%",
          cursor: "pointer", // Hiển thị cursor pointer khi hover
          size: "90%",
        },
      },
      series: [
        {
          point: {
            events: {
              mouseOver: function (e: any) {
                setSelectedItem(e.target.id);
              },
              mouseOut: function () {
                setSelectedItem("");
              },
            },
          },
          states: {
            inactive: {
              opacity: 0.2,
              enabled: true,
            },
          },
          name: "",
          type: "pie",
          data: chartData,
        },
      ],
    },
    [chartData]
  );

  const activeItem = useMemo(() => {
    return analytics.donutDetail.data?.data?.data?.find((item) => {
      const offerId = item.affiliateId.split("?")[0];
      return offerId === selectedItem;
    });
  }, [selectedItem, analytics.donutDetail.data]);

  const redirectUrls = analytics.overview.data?.data?.donutChart?.redirectUrls || [];
  const isLoading =
    analytics.overview.status === "PROCESSING" || analytics.donutDetail.status === "PROCESSING";

  return (
    <Box
      sx={{
        minWidth: "400px",
        minHeight: "300px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="body1" fontWeight={500} color="text.primary">
          Detail Affiliate Links
        </Typography>

        <IconButton onClick={handleMenuClick} disabled={redirectUrls.length === 0} size="small">
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          {redirectUrls.map((url) => {
            const displayUrl = new URL(url).pathname.replace("/", "") || new URL(url).hostname;
            return (
              <MenuItem
                key={url}
                onClick={() => handleUrlChange(url)}
                selected={selectedRedirectUrl === url}
              >
                {displayUrl}
              </MenuItem>
            );
          })}
        </Menu>
      </Box>

      {selectedRedirectUrl && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
          Total Clicks: <strong>{analytics.donutDetail.data?.data?.totalClicks || 0}</strong>
        </Typography>
      )}

      <ChartContainer
        status={isLoading ? "PROCESSING" : analytics.donutDetail.status}
        sx={{ minHeight: "350px" }}
        noData={!chartData?.length}
      >
        <Box sx={{ width: "100%" }}>
          <Grid container sx={{ display: "flex", alignItems: "center" }}>
            <Grid item xs={12} md={9} sx={{ position: "relative" }}>
              <HighchartsReact highcharts={Highcharts} options={options} />
              {activeItem && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    position: "absolute",
                    left: "calc(50% - 60px)",
                    top: "calc(50% - 50px)",
                    width: "100px",
                    height: "100px",
                  }}
                >
                  <Typography variant="body2" noWrap color="text.secondary" width={"100%"}>
                    {activeItem.label}
                  </Typography>
                  <Typography variant="body2" color="text.primary">
                    Clicks: {formatNumber(activeItem.clicks)} (
                    {(
                      (activeItem.clicks / (analytics.donutDetail.data?.data?.totalClicks || 0)) *
                      100
                    ).toFixed(2)}
                    %)
                  </Typography>
                </Box>
              )}
            </Grid>
            <Grid
              item
              xs={12}
              sm={2}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 2,
              }}
              className="custom-scrollbar"
            >
              <Box sx={{ width: "100%" }}>
                {chartData?.map((item, index) => {
                  return (
                    <Tooltip key={index} title={item.name}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Box
                          sx={{
                            width: "14px",
                            height: "14px",
                            minWidth: "14px",
                            borderRadius: "3px",
                            backgroundColor: item.color,
                            mr: 2,
                          }}
                        />

                        <Typography
                          noWrap
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            textOverflow: "ellipsis",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            handleRowClick(item.offerId, "view");
                          }}
                        >
                          {item.name}
                        </Typography>
                      </Box>
                    </Tooltip>
                  );
                })}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </ChartContainer>
    </Box>
  );
}
