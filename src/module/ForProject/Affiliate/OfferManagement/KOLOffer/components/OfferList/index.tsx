import ComponentWithStatus from "@centic-scoring/components/ComponentWithStatus";
import useURLQuery from "@centic-scoring/hooks/common/useUrlQuery";
import { useAppDispatch, useOfferManagementSelector } from "@centic-scoring/redux/hook";
import { getKolOfferManagement } from "@centic-scoring/redux/slices/offer-management/fetchFunctions";
import { formatTime } from "@centic-scoring/utils/format";
import {
  Box,
  IconButton,
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
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { formatAddress } from "@centic-scoring/utils/string/stringUtils";
import { Link } from "@centic-scoring/components/primitives/Link";
import useDebounce from "@centic-scoring/hooks/useDebounce";
import NewOffer from "@centic-scoring/module/ForProject/Affiliate/KOLsMatcher/KOLsConnect/components/NewOffer";
import dynamic from "next/dynamic";
import useKOLsConnectparams from "@centic-scoring/module/ForProject/Affiliate/KOLsMatcher/KOLsConnect/hooks/useKOLsConnectParams";
import { KOLConnectAPI } from "@centic-scoring/api/services/affiliate/affiliate";
import { toast } from "react-toastify";
import SearchIcon from "@mui/icons-material/Search";
import { CopyIcon } from "@centic-scoring/icons";
const TablePagination = dynamic(() => import("@mui/material/TablePagination"), { ssr: false });

export default function OfferList() {
  const { data, status } = useOfferManagementSelector().kols.offers;
  const { resetParam, setMultipleParams } = useKOLsConnectparams();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [keyword, setKeyword] = useState("");
  const { id } = useURLQuery();
  const dispatch = useAppDispatch();

  const handleDelete = async (offerId: string) => {
    try {
      await KOLConnectAPI.deleteBaseOffer(id, offerId);
      toast.success("Delete offer successfully");
      dispatch(getKolOfferManagement({ id, page: page + 1, pageSize, keyword }));
    } catch (error) {
      toast.error("Delete offer failed");
    }
  };

  const debounceUpdate = useDebounce(() => {
    setKeyword(keyword);
  }, 500);

  useEffect(() => {
    debounceUpdate();
  }, [keyword, debounceUpdate]);

  const handleRowClick = (offerId: string) => {
    setMultipleParams({ offerID: offerId });
  };

  useEffect(() => {
    if (id) {
      dispatch(getKolOfferManagement({ id, page: page + 1, pageSize, keyword }));
    }
  }, [id, page, pageSize, keyword, dispatch]);

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
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          color="secondary"
          placeholder="Search Offer Name"
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
        }}
      >
        <ComponentWithStatus
          status={status}
          noData={!data?.data?.length}
          noDataText="You have not created an offer yet."
        >
          <TableContainer sx={{ borderRadius: "12px" }} className="custom-scrollbar">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Feature</TableCell>
                  <TableCell>Offer name</TableCell>
                  <TableCell>Offer Link</TableCell>
                  <TableCell>Created time</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.data?.map((row) => (
                  <TableRow
                    hover
                    sx={{ cursor: "pointer", height: "70px" }}
                    key={row.id}
                    onClick={() => handleRowClick(row.id)}
                  >
                    <TableCell width={"25%"}>
                      <Tooltip title={row.feature} placeholder="bottom">
                        <Typography
                          variant="body2"
                          sx={{
                            maxWidth: "268px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {row.feature}
                        </Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell width={"30%"}>
                      <Tooltip title={row.title} placeholder="bottom">
                        <Typography
                          variant="body2"
                          sx={{
                            maxWidth: "355px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {row.title}
                        </Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell width={"20%"}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Link
                          href={row.link || ""}
                          sx={{ cursor: "pointer", mr: 1 }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Tooltip title={row.link} placeholder="bottom">
                            <Typography
                              variant="body2"
                              color="text.primary"
                              sx={{ cursor: "pointer", textDecoration: "underline" }}
                            >
                              {formatAddress(row.link?.slice(8), 9, 6)}
                            </Typography>
                          </Tooltip>
                        </Link>
                        <IconButton
                          onClick={(e) => {
                            navigator.clipboard.writeText(row.link);
                            e.stopPropagation();
                          }}
                        >
                          <CopyIcon color="info" />
                        </IconButton>
                      </Box>
                    </TableCell>
                    <TableCell width={"15%"}>
                      <Typography variant="body2">
                        {formatTime(row.createdTime, { date: true })}
                      </Typography>
                    </TableCell>
                    <TableCell width={"10%"}>
                      <IconButton
                        onClick={(e) => {
                          handleDelete(row.id);
                          e.stopPropagation();
                        }}
                      >
                        <DeleteIcon color="info" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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
        </ComponentWithStatus>
      </Paper>
    </Box>
  );
}
