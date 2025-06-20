import {
  Box,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

const TablePagination = dynamic(() => import("@mui/material/TablePagination"), { ssr: false });
import NewOffer from "../NewOffer";
import { useEffect, useState } from "react";
import { useAppDispatch, useKOLsSelector } from "@centic-scoring/redux/hook";
import useURLQuery from "@centic-scoring/hooks/common/useUrlQuery";
import { getKOLsOfferInfo } from "@centic-scoring/redux/slices/kols/fetchFunctions";
import styled from "styled-components";
import { formatNumber } from "@centic-scoring/utils/string/stringUtils";
import ComponentWithStatus from "@centic-scoring/components/ComponentWithStatus";
import useDebounce from "@centic-scoring/hooks/useDebounce";
import dynamic from "next/dynamic";
import useKOLsConnectparams from "../../hooks/useKOLsConnectParams";
import SearchIcon from "@mui/icons-material/Search";
import NaValue from "@centic-scoring/components/NaValue";

function getStatusColor(color: string) {
  switch (color.toLowerCase()) {
    case "request":
      return "#ed6c02";
    case "in progress":
      return "#1976d2";
    case "upgrading":
      return "#2e7d32";
    case "done":
      return "text.active3";
    case "reject":
    case "cancel":
      return "#C22525";
    default:
      return "text.active2";
  }
}

export default function OfferList() {
  const { data, status } = useKOLsSelector().kolsConnect.kolsOfferInfo;
  const { resetParam, setMultipleParams } = useKOLsConnectparams();
  const [page, setPage] = useState(0);
  const dispatch = useAppDispatch();
  const [keyword, setKeyword] = useState("");
  const [editKeyword, setEditKeyword] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const { id } = useURLQuery();

  const handleRowClick = (offerId: string, action: string) => {
    // Set the offer ID and action in the URL query parameters.
    setMultipleParams({ offerID: offerId, action: action.toLowerCase(), mode: "view" });
  };

  const CustomLinearProgress = styled(LinearProgress)(({ color }) => ({
    height: 5,
    borderRadius: 3,
    "&.MuiLinearProgress-colorPrimary": {
      backgroundColor: "#2c2f35",
    },
    "& .MuiLinearProgress-bar": {
      borderRadius: 5,
      backgroundColor: color || "#1e88e5",
    },
  }));

  const debounceUpdate = useDebounce(() => {
    setKeyword(editKeyword);
  }, 500);

  useEffect(() => {
    debounceUpdate();
  }, [editKeyword, debounceUpdate]);

  useEffect(() => {
    if (id) {
      dispatch(getKOLsOfferInfo({ id, keyword, page: page + 1, pageSize }));
    }
  }, [id, dispatch, keyword, page, pageSize]);

  useEffect(() => {
    resetParam();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <TextField
          value={editKeyword}
          onChange={(e) => setEditKeyword(e.target.value)}
          color="secondary"
          placeholder="Search KOL's name"
          sx={{ minWidth: "400px" }}
          InputProps={{
            endAdornment: <SearchIcon color="info" />,
          }}
        />
        <NewOffer />
      </Box>
      <Paper
        sx={{
          mt: 3,
          "& .loading-container": {
            minHeight: "400px",
          },
          "& .failed-container": {
            pt: 3,
          },
        }}
      >
        <ComponentWithStatus
          status={status}
          noData={data?.data?.length === 0}
          noDataText="KOLs have not responded to your offer yet."
        >
          <TableContainer
            sx={{ borderRadius: "12px", boxShadow: " 0px 0px 8px 0px rgba(0, 0, 0, 0.50)" }}
            className="custom-scrollbar"
          >
            <Table sx={{ minWidth: 400 }} aria-labelledby="tableTitle">
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Feature</TableCell>
                  <TableCell>KOL</TableCell>
                  <TableCell>Link Affiliate</TableCell>
                  {/* <TableCell>Wallet Address</TableCell> */}
                  <TableCell>Progress</TableCell>
                  {/* <TableCell>Payment</TableCell> */}
                  <TableCell>Value</TableCell>
                  <TableCell>Start Time</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.data?.map((row) => (
                  <TableRow
                    onClick={() => {
                      handleRowClick(row.id, row.status);
                    }}
                    hover
                    key={row.id}
                    sx={{
                      maxWidth: "100px",
                      ":hover": {
                        cursor: "pointer",
                      },
                    }}
                  >
                    <TableCell
                      sx={{
                        maxWidth: "150px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      <Tooltip title={row.title} placement="bottom">
                        <Typography
                          variant="body2"
                          sx={{
                            maxWidth: "150px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {row.title}
                        </Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Tooltip title={row.feature} placement="bottom">
                        <Typography
                          variant="body2"
                          sx={{
                            maxWidth: "150px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {row.feature}
                        </Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell>{row.kolName}</TableCell>
                    <TableCell
                      sx={{
                        maxWidth: "150px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {row.linkAffiliate && (
                        <Tooltip title={row.linkAffiliate} placement="bottom">
                          <Typography
                            variant="body2"
                            sx={{
                              maxWidth: "150px",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {row.linkAffiliate}
                          </Typography>
                        </Tooltip>
                      )}
                      {!row.linkAffiliate && <NaValue />}
                    </TableCell>
                    {/* <TableCell
                      sx={{
                        maxWidth: "150px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {row.walletAddress && formatAddress(row.walletAddress)}
                      {!row.walletAddress && <NaValue />}
                    </TableCell> */}
                    <TableCell>
                      <CustomLinearProgress
                        sx={{
                          "& .MuiLinearProgress-bar": {
                            backgroundColor: row.progress === 100 ? "#00ff00" : "#1e88e5",
                          },
                        }}
                        variant="determinate"
                        value={row.progress}
                      />
                    </TableCell>
                    {/* <TableCell>
                      {row.payment > 0 && (
                        <CustomLinearProgress
                          sx={{
                            "& .MuiLinearProgress-bar": {
                              backgroundColor: row.progress === 100 ? "#00ff00" : "#1e88e5",
                            },
                          }}
                          variant="determinate"
                          value={row.payment * 100}
                        />
                      )}
                      {!row.payment && <NaValue />}
                    </TableCell> */}
                    <TableCell sx={{ fontWeight: 600 }}>
                      {formatNumber(row.value, { fractionDigits: 2, prefix: "$" })}
                    </TableCell>
                    <TableCell>
                      {new Date(row.time * 1000).toLocaleDateString(undefined, {
                        day: "2-digit",
                        month: "2-digit",
                      })}
                    </TableCell>
                    <TableCell sx={{ color: getStatusColor(row.status) }}>{row.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </ComponentWithStatus>
        <Box sx={{ display: "flex", justifyContent: "flex-end", my: 1 }}>
          <TablePagination
            count={data?.numberOfDocs || 0}
            page={page}
            onPageChange={(_, newPage) => setPage(newPage)}
            rowsPerPage={pageSize}
            onRowsPerPageChange={(e) => setPageSize(Number(e.target.value))}
            rowsPerPageOptions={[10, 50, 100]}
          />
        </Box>
      </Paper>
    </Box>
  );
}
