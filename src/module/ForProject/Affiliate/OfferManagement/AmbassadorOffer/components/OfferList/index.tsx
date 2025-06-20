import { AmbassadorConnectAPI } from "@centic-scoring/api/services/ambassador/affiliate";
import ComponentWithStatus from "@centic-scoring/components/ComponentWithStatus";
import useURLQuery from "@centic-scoring/hooks/common/useUrlQuery";
import useDebounce from "@centic-scoring/hooks/useDebounce";
import useAmbassConnectParam from "@centic-scoring/module/ForProject/Affiliate/AmbassadorMatcher/AmbassadorConnection/hooks/useAmbassConnectParams";
import { useAppDispatch, useOfferManagementSelector } from "@centic-scoring/redux/hook";
import { getAmbassadorBaseOffer } from "@centic-scoring/redux/slices/offer-management/fetchFunctions";
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
  TablePagination,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "@centic-scoring/components/primitives/Link";
import { CopyIcon } from "@centic-scoring/icons";
import { formatAddress } from "@centic-scoring/utils/string/stringUtils";
import NewOffer from "@centic-scoring/module/ForProject/Affiliate/AmbassadorMatcher/AmbassadorConnection/components/NewOffer/NewOffer";

export default function OfferList() {
  const { data, status } = useOfferManagementSelector().ambassadors.offers;
  const { resetParam, setMultipleParams } = useAmbassConnectParam();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [keyword, setKeyword] = useState("");
  const { id } = useURLQuery();
  const dispatch = useAppDispatch();

  const handleDelete = async (offerId: string) => {
    try {
      await AmbassadorConnectAPI.deleteBaseOffer(id, offerId);
      toast.success("Delete offer successfully");
      dispatch(getAmbassadorBaseOffer({ id, page: page + 1, pageSize, keyword }));
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
      dispatch(getAmbassadorBaseOffer({ id, page: page + 1, pageSize, keyword }));
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
                    <TableCell width={"35%"}>
                      <Tooltip title={row.title} placeholder="bottom">
                        <Typography
                          variant="body2"
                          sx={{
                            maxWidth: "418px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {row.title}
                        </Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell width={"30%"}>
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
                              {formatAddress(row.link?.slice(8), 18, 6)}
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
                    <TableCell width={"20%"}>
                      <Typography variant="body2">
                        {formatTime(row.createdTime, { date: true })}
                      </Typography>
                    </TableCell>
                    <TableCell width={"15%"}>
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
