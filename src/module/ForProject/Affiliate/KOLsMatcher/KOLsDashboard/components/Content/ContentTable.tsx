import { TypeFilter } from "@centic-scoring/api/services/affiliate";
import useURLQuery from "@centic-scoring/hooks/common/useUrlQuery";
import { useAppDispatch, useKOLsSelector } from "@centic-scoring/redux/hook";
import { getKolHashtag } from "@centic-scoring/redux/slices/kols/fetchFunctions";
import { formatNumber } from "@centic-scoring/utils/string/stringUtils";
import { ArrowDownward } from "@mui/icons-material";
import {
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import ComponentWithStatus from "@centic-scoring/components/ComponentWithStatus";
import WordCloud from "./WordCloud";

type Order = "asc" | "desc";
type Orderby = "usageCount" | "engagementRate";

type KolHashTag = {
  id: number;
  hashTag: string;
  usageCount: number;
  engagementRate: number;
};

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
  // eslint-disable-next-line no-unused-vars
): (a: { [key in Key]: number }, b: { [key in Key]: number }) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// eslint-disable-next-line no-unused-vars
function stableSort<T>(array: readonly KolHashTag[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });

  return stabilizedThis.map((el) => el[0] as KolHashTag);
}

export default function ContentTable({ type }: { type: TypeFilter }) {
  const { daily, weekly, monthly } = useKOLsSelector().kol.content;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const { id, kolUserName } = useURLQuery();
  const [order1, setOrder1] = useState<Order>("desc");
  const [order2, setOrder2] = useState<Order>("desc");
  const [orderBy, setOrderBy] = useState<Orderby>("usageCount");

  const dispatch = useAppDispatch();

  const data = useMemo(() => {
    if (type === "Daily") {
      return daily;
    }
    if (type === "Weekly") {
      return weekly;
    }
    if (type === "Monthly") {
      return monthly;
    }
    return weekly;
  }, [type, daily, weekly, monthly]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    if (!(data.data.status === "SUCCESS" && data.fetchedId === kolUserName) && id && kolUserName) {
      dispatch(getKolHashtag({ id: id, userName: kolUserName, typeFilter: type }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.fetchedId, id, kolUserName, type]);

  const useData = useMemo(() => {
    if (data.data.data) {
      return data.data.data.hashTags?.map((item, index) => {
        return {
          id: index + 1,
          hashTag: item.hashTag,
          usageCount: item.usageCount,
          engagementRate: item.engagementRate,
        };
      });
    }
  }, [data]);

  const dataRender = useMemo(() => {
    if (useData) {
      if (orderBy == "usageCount") {
        return stableSort(useData, getComparator(order1, orderBy)).slice(
          page * rowsPerPage,
          page * rowsPerPage + rowsPerPage
        );
      }
      if (orderBy == "engagementRate") {
        return stableSort(useData, getComparator(order2, orderBy)).slice(
          page * rowsPerPage,
          page * rowsPerPage + rowsPerPage
        );
      }
    }
  }, [useData, order1, order2, orderBy, page, rowsPerPage]);

  const handleDesFilter1 = () => {
    setOrder1((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    setOrderBy("usageCount");
  };
  const handleDesFilter2 = () => {
    setOrder2((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    setOrderBy("engagementRate");
  };

  const words = useMemo(() => {
    if (data.data.data) {
      return data.data.data.hashTags?.map((tag, index) => ({
        text: tag.hashTag,
        value: tag.usageCount,
        id: index,
      }));
    }
  }, [data]);

  return (
    <Paper sx={{ p: 2, mb: 3, backgroundColor: "background.hover" }}>
      <Box
        sx={{
          mb: 3.5,
        }}
      >
        <Typography variant="body2" fontWeight={500}>
          Hashtag Analysis
        </Typography>
      </Box>
      <Grid container sx={{ minHeight: "331px", alignItems: "center" }}>
        <ComponentWithStatus
          status={data.data.status}
          noData={data.data.data?.hashTags?.length == 0}
        >
          <Grid item xs={12} md={5.5} sx={{ height: "100%" }}>
            <WordCloud words={words || []} />
          </Grid>
          <Grid item xs={12} md={6.5}>
            <TableContainer
              sx={{ borderRadius: "12px", boxShadow: " 0px 0px 8px 0px rgba(0, 0, 0, 0.50)" }}
              className="custom-scrollbar"
            >
              <Table sx={{ minWidth: 400 }} aria-labelledby="tableTitle">
                <TableHead>
                  <TableRow>
                    <TableCell
                      align="center"
                      sx={{
                        width: "20%",
                      }}
                    >
                      No
                    </TableCell>
                    <TableCell
                      sx={{
                        width: "27%",
                      }}
                    >
                      Hashtag
                    </TableCell>
                    <TableCell align="right" sx={{ whiteSpace: "nowrap", width: "27%" }}>
                      <Typography
                        variant="body2"
                        fontWeight={500}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-end",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          handleDesFilter1();
                          setOrderBy("usageCount");
                        }}
                      >
                        Usage Count
                        <ArrowDownward
                          fontSize="small"
                          color="info"
                          sx={{
                            transform: `${order1 == "desc" ? "rotate(0deg)" : "rotate(180deg)"}`,
                            transition: "transform 0.2s linear",
                          }}
                        />
                      </Typography>
                    </TableCell>
                    <TableCell align="right" sx={{ whiteSpace: "nowrap", width: "26%" }}>
                      <Typography
                        variant="body2"
                        fontWeight={500}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-end",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          handleDesFilter2();
                          setOrderBy("engagementRate");
                        }}
                      >
                        Engagement Rate
                        <ArrowDownward
                          fontSize="small"
                          color="info"
                          sx={{
                            transform: `${order2 == "desc" ? "rotate(0deg)" : "rotate(180deg)"}`,
                            transition: "transform 0.2s linear",
                          }}
                        />
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody sx={{ backgroundColor: "background.paper2" }}>
                  {dataRender?.map((item, index) => {
                    return (
                      <TableRow tabIndex={-1} key={item.id} sx={{ maxWidth: "100px" }}>
                        <TableCell
                          sx={{
                            width: "20%",
                            fontSize: "16px",
                            fontWeight: 500,
                            color: "text.primary",
                          }}
                          align="center"
                        >
                          {index + page * rowsPerPage + 1}
                        </TableCell>
                        <TableCell
                          sx={{
                            width: "27%",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            fontSize: "16px",
                            fontWeight: 500,
                            color: "text.primary",
                          }}
                        >
                          <Typography variant="body1" fontWeight={600}>
                            {item.hashTag}
                          </Typography>
                        </TableCell>
                        <TableCell
                          sx={{
                            width: "27%",
                            fontSize: "16px",
                            fontWeight: 500,
                            color: "text.primary",
                          }}
                          align="right"
                        >
                          {formatNumber(item.usageCount)}
                        </TableCell>
                        <TableCell
                          sx={{
                            width: "26%",
                            fontSize: "16px",
                            fontWeight: 500,
                            color: "text.primary",
                          }}
                          align="right"
                        >
                          {formatNumber(item.engagementRate * 100, {
                            fractionDigits: 2,
                            suffix: "%",
                          })}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={data.data.data?.hashTags?.length || 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[4]}
              labelRowsPerPage=""
              sx={{
                color: "text.secondary",
                fontSize: "14px",
                fontWeight: 400,
                "& .MuiTablePagination-selectIcon": {
                  display: "none",
                },
                "& .MuiTablePagination-menuItem": {
                  display: "none",
                },
              }}
            />
          </Grid>
        </ComponentWithStatus>
      </Grid>
    </Paper>
  );
}
