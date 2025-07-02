import { AddIcon, CloseIcon } from "@centic-scoring/icons";
import {
  Box,
  Button,
  Dialog,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import useKOLsConnectparams from "../../hooks/useKOLsConnectParams";
import useDialogState from "@centic-scoring/hooks/common/useDialogState";
import { useEffect, useState } from "react";
import { DataWithStatus } from "@centic-scoring/redux/slices/global";
import { KOLConnectAPI, RTOfferList } from "@centic-scoring/api/services/affiliate/affiliate";
import useURLQuery from "@centic-scoring/hooks/common/useUrlQuery";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import useDebounce from "@centic-scoring/hooks/useDebounce";
import { useAppDispatch } from "@centic-scoring/redux/hook";
import { resetForm } from "@centic-scoring/redux/slices/kol-offer";
import ComponentWithStatus from "@centic-scoring/components/ComponentWithStatus";

export default function NewOffer() {
  const { open, handleClose, handleOpen } = useDialogState();
  return (
    <Box>
      <Button variant="outlined" color="info" onClick={handleOpen}>
        <AddIcon sx={{ mr: 1 }} /> Create new offer
      </Button>
      <Dialog
        PaperProps={{
          sx: {
            maxWidth: "1000px",
          },
        }}
        open={open}
        onClose={handleClose}
      >
        <Content handleClose={handleClose} />
      </Dialog>
    </Box>
  );
}

function Content({ handleClose }: { handleClose: () => void }) {
  const { setParams } = useKOLsConnectparams();
  const [existingOffer, setExistingOffer] = useState(false);
  const dispatch = useAppDispatch();
  return (
    <Box p={3} sx={{ backgroundColor: "background.paper" }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <IconButton onClick={handleClose}>
          <CloseIcon sx={{ fontSize: "1rem" }} />
        </IconButton>
      </Box>
      {!existingOffer && (
        <>
          <Button
            fullWidth
            variant="outlined"
            color="info"
            sx={{ mb: 2, mt: 3 }}
            onClick={() => {
              setExistingOffer(true);
            }}
          >
            Create from existing offer
          </Button>
          <Button
            fullWidth
            variant="contained"
            onClick={() => {
              setParams("newOffer", "true");
              handleClose();
              dispatch(resetForm());
            }}
          >
            Create new offer
          </Button>
        </>
      )}
      {existingOffer && <ExisitingOffer />}
    </Box>
  );
}

function ExisitingOffer() {
  const [offerData, setOfferData] = useState<DataWithStatus<RTOfferList>>({
    status: "IDLE",
    data: { data: [], numberOfDocs: 0 },
  });
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [keyword, setKeyword] = useState("");
  const [editKeyword, setEditKeyword] = useState("");

  const { setMultipleParams } = useKOLsConnectparams();
  const { id } = useURLQuery();

  const debounceUpdate = useDebounce(() => {
    setKeyword(editKeyword);
  }, 500);

  useEffect(() => {
    debounceUpdate();
  }, [editKeyword, debounceUpdate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setOfferData((prev) => {
          return {
            ...prev,
            status: "PROCESSING",
          };
        });
        const result = await KOLConnectAPI.getOfferBase({
          id,
          keyword,
          page: page + 1,
          pageSize,
        });
        setOfferData({
          status: "SUCCESS",
          data: result,
        });
      } catch (error) {
        setOfferData({
          status: "FAILED",
        });
      }
    };
    if (id) {
      fetchData();
    }
  }, [id, keyword, page, pageSize]);

  const handleRowClick = (id: string) => {
    setMultipleParams({
      newOffer: "true",
      initOfferId: id,
    });
  };

  return (
    <Box>
      <Grid container sx={{ my: 2 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            size="small"
            value={editKeyword}
            onChange={(e) => setEditKeyword(e.target.value)}
            placeholder="Search Offer's name"
            InputProps={{
              endAdornment: <SearchIcon fontSize="small" />,
            }}
          />
        </Grid>
      </Grid>
      <TableContainer
        className="custom-scrollbar"
        sx={{
          "& .loading-container": { minHeight: "200px" },
          maxHeight: "400px",
        }}
      >
        <ComponentWithStatus status={offerData.status}>
          <Table stickyHeader sx={{ borderRadius: 2 }}>
            <TableHead>
              <TableRow sx={{ "& .MuiTableCell-root": { backgroundColor: "#0E1B25" } }}>
                <TableCell sx={{ whiteSpace: "nowrap" }}>Feature</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap" }}>Offer Name</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap" }}>Link</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap" }}>Create Time</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {offerData?.data?.data?.map((row, index) => {
                return (
                  <TableRow
                    key={index}
                    onClick={() => {
                      handleRowClick(row.id);
                    }}
                    hover
                    sx={{
                      "& .MuiTableCell-root": {
                        backgroundColor: "background.hover",
                      },
                      ":hover": {
                        cursor: "pointer",
                        "& .MuiTableCell-root": {
                          backgroundColor: "#CDFEE1",
                        },
                      },
                    }}
                  >
                    <TableCell>
                      <Typography color={"text.primary"} minWidth={150} fontWeight={600}>
                        {row.feature}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color={"text.primary"} fontWeight={600}>
                        {row.title}
                      </Typography>
                    </TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <Link href={row.link || "#"} target="_blank" style={{ color: "inherit" }}>
                        <Typography color={"text.primary"} maxWidth={150} noWrap>
                          {row.link}
                        </Typography>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Typography color={"text.primary"} fontWeight={600}>
                        {new Date(Number(row.createdTime) * 1000).toLocaleString(undefined, {
                          day: "2-digit",
                          month: "2-digit",
                        })}
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </ComponentWithStatus>
      </TableContainer>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", mt: 1 }}>
        <TablePagination
          count={offerData?.data?.numberOfDocs || 0}
          page={page}
          onPageChange={(_, page) => setPage(page)}
          rowsPerPageOptions={[10, 50, 100]}
          onRowsPerPageChange={(e) => setPageSize(Number(e.target.value))}
          rowsPerPage={pageSize}
        />
      </Box>
    </Box>
  );
}
