import { getStatusColor } from "@centic-scoring/components/AffiliateNotification";
import ComponentWithStatus from "@centic-scoring/components/ComponentWithStatus";
import NaValue from "@centic-scoring/components/NaValue";
import { useAppDispatch, useOfferManagementSelector } from "@centic-scoring/redux/hook";
import { getKolOfferList } from "@centic-scoring/redux/slices/offer-management/fetchFunctions";
import { formatNumber } from "@centic-scoring/utils/string/stringUtils";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
const TablePagination = dynamic(() => import("@mui/material/TablePagination"), { ssr: false });
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import FileCopyRoundedIcon from "@mui/icons-material/FileCopyRounded";
import dynamic from "next/dynamic";

export default function KOLOffers() {
  const { data, status } = useOfferManagementSelector().kols.listOffers;
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [keyword] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getKolOfferList({ page: page + 1, pageSize, keyword }));
  }, [dispatch, page, pageSize, keyword]);

  return (
    <Paper
      sx={{
        margin: 5,
        "& .failed-container": {
          pt: 7,
        },
        "& .loading-container": {
          pt: 7,
        },
      }}
    >
      <ComponentWithStatus status={status} noData={data?.data?.length === 0}>
        <TableContainer
          sx={{ borderRadius: "12px", boxShadow: " 0px 0px 8px 0px rgba(0, 0, 0, 0.50)" }}
          className="custom-scrollbar"
        >
          <Table sx={{ minWidth: 400 }} aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                <TableCell>Project</TableCell>
                <TableCell>Offer Title</TableCell>
                <TableCell>Link Affiliate</TableCell>
                <TableCell>Value</TableCell>
                <TableCell>KPI</TableCell>
                <TableCell>Last Upgrade</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Payment</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.data?.map((row) => (
                <TableRow
                  hover
                  sx={{ cursor: "pointer" }}
                  key={row.id}
                  onClick={() => {
                    router.push(`/affiliate/kol-offer/${row.id}`);
                  }}
                >
                  <TableCell>{row.project}</TableCell>
                  <TableCell
                    sx={{
                      maxWidth: "150px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      cursor: "pointer",
                    }}
                    onClick={() => {}}
                  >
                    {row.title}
                  </TableCell>
                  <TableCell
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      maxWidth: "200px",
                    }}
                  >
                    {row.link && (
                      <>
                        {" "}
                        <Typography
                          sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            textDecoration: "underline",
                            cursor: "pointer",
                          }}
                        >
                          {row.link}
                        </Typography>
                        <FileCopyRoundedIcon
                          sx={{ cursor: "pointer", fontSize: "20px", color: "info.main" }}
                          onClick={(e) => {
                            navigator.clipboard.writeText(row.link);
                            toast.success("Copied to clipboard", { position: "top-right" });
                            e.stopPropagation();
                          }}
                        />
                      </>
                    )}
                    {!row.link && <NaValue />}
                  </TableCell>
                  <TableCell>
                    {formatNumber(row.value, { fractionDigits: 2, prefix: "$" })}
                  </TableCell>

                  <TableCell>{formatNumber(row.kpi, { fractionDigits: 2, suffix: "%" })}</TableCell>
                  <TableCell>
                    {new Date(row.lastUpgrade * 1000).toLocaleDateString(undefined, {
                      day: "2-digit",
                      month: "2-digit",
                    })}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: getStatusColor(row.status),
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Typography sx={{ fontSize: "40px" }}>•</Typography>
                    {row.status}
                  </TableCell>
                  <TableCell>
                    {/* {row.reward === false ? (
                    <Button variant="outlined" color="primary">
                      Claim
                    </Button>
                  ) : row.reward === true ? (
                    <Button variant="outlined" color="primary" disabled>
                      Claimed
                    </Button>
                  ) : (
                    <NaValue />
                  )} */}
                    <NaValue />
                  </TableCell>
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
  );
}
