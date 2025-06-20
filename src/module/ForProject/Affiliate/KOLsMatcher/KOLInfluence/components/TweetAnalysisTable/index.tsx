import { RTKOLsRPTweet } from "@centic-scoring/api/services/affiliate";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useMemo, useState } from "react";
import ColumnFilter from "./ColumnFilter";
import { useKOLsReportSelector } from "@centic-scoring/redux/hook";
import { formatNumber } from "@centic-scoring/utils/string/stringUtils";
import NaValue from "@centic-scoring/components/NaValue";

const PAGE_SIZE = 5;

export default function TweetAnalysisTable() {
  const { filter } = useKOLsReportSelector();
  const [page, setPage] = useState(0);
  const [activeColumn, setActiveColumn] = useState<{
    // eslint-disable-next-line no-unused-vars
    [key in keyof RTKOLsRPTweet["tweetsAnalysis"][string][number]]: {
      title: string;
      active?: boolean;
    };
  }>({
    engagementRate: {
      title: "Engagement Rate",
      active: true,
    },
    viewRate: {
      title: "View Rate",
      active: true,
    },
    likes: {
      title: "Likes",
      active: true,
    },
    views: {
      title: "Views",
      active: true,
    },
    retweets: {
      title: "Retweets",
      active: true,
    },
    replies: { title: "Replies", active: true },
  } as {
    // eslint-disable-next-line no-unused-vars
    [key in keyof RTKOLsRPTweet["tweetsAnalysis"][string][number]]: {
      title: string;
      active?: boolean;
    };
  });

  const { tweetAnalysis } = useKOLsReportSelector();

  const rowData = useMemo(() => {
    return Object.entries(tweetAnalysis.data?.tweetsAnalysis || {})
      .filter((i) => i || true)
      .reduce((currentSum, [userName, value]) => {
        return [...currentSum, ...value.map((i) => ({ ...i, kolUserName: userName }))];
      }, [] as RTKOLsRPTweet["tweetsAnalysis"][string]);
  }, [tweetAnalysis]);

  const handleChangeToggleColumn = (
    column: keyof Omit<RTKOLsRPTweet["tweetsAnalysis"][string][number], "kolUserName">
  ) => {
    setActiveColumn((prev) => {
      let tmp = { ...prev };
      tmp[column].active = !tmp[column].active;
      return tmp;
    });
  };

  const filteredData = useMemo(() => {
    return rowData.filter((row) => {
      return filter.kolsAnalysis[row.kolUserName || ""];
    });
  }, [rowData, filter.kolsAnalysis]);

  return (
    <Box>
      <Box sx={{ my: 2 }}>
        <ColumnFilter value={activeColumn} onChange={handleChangeToggleColumn} />
      </Box>
      <TableContainer
        sx={{ borderRadius: 3, boxShadow: "0px 0px 8px 0px #00000080", minHeight: "321px" }}
        className="custom-scrollbar"
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">KOL</TableCell>
              {Object.values(activeColumn)
                .filter((i) => i.active)
                .map((cell, index) => {
                  return (
                    <TableCell align="center" sx={{ whiteSpace: "nowrap" }} key={`head-${index}`}>
                      {cell.title}
                    </TableCell>
                  );
                })}
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              "& .MuiTableCell-root": {
                fontWeight: 600,
              },
            }}
          >
            {filteredData.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE).map((row, index) => {
              return (
                <TableRow key={index}>
                  <TableCell align="left" sx={{ whiteSpace: "nowrap" }}>
                    {row.kolName}
                  </TableCell>
                  {activeColumn.engagementRate.active && (
                    <TableCell align="center">
                      <CustomTableValue value={Number(row.engagementRate) * 100} suffix="%" />
                    </TableCell>
                  )}
                  {activeColumn.viewRate.active && (
                    <TableCell align="center">
                      <CustomTableValue value={Number(row.viewRate) * 100} suffix="%" />
                    </TableCell>
                  )}
                  {activeColumn.likes.active && (
                    <TableCell align="center">
                      <CustomTableValue value={row.likes} />
                    </TableCell>
                  )}
                  {activeColumn.views.active && (
                    <TableCell align="center">
                      <CustomTableValue value={row.views} />
                    </TableCell>
                  )}
                  {activeColumn.retweets.active && (
                    <TableCell align="center">
                      <CustomTableValue value={row.retweets} />
                    </TableCell>
                  )}
                  {activeColumn.replies.active && (
                    <TableCell align="center">
                      <CustomTableValue value={row.replies} />
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <TablePagination
          page={page}
          rowsPerPage={PAGE_SIZE}
          onPageChange={(_, page) => {
            setPage(page);
          }}
          count={filteredData.length}
          align="right"
          rowsPerPageOptions={[PAGE_SIZE]}
        />
      </Box>
    </Box>
  );
}

const CustomTableValue = ({
  value,
  fractionDigits,
  suffix,
}: {
  value?: number;
  suffix?: string;
  fractionDigits?: number;
}) => {
  return (
    <>
      {value === undefined || (value === null && <NaValue />)}
      {!(value === undefined || value === null) &&
        formatNumber(value, { suffix, fractionDigits: fractionDigits || 2 })}
    </>
  );
};
