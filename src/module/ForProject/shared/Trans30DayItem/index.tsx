import { TransactionIcon } from "@centic-scoring/icons";
import { compactNumber } from "@centic-scoring/utils/string/stringUtils";
import { Box, Typography } from "@mui/material";

type Props = { from?: number; to?: number };
export default function Trans30DayItem({ from, to }: Props) {
  return (
    <Box className="filter-item">
      <TransactionIcon sx={{ mr: 1, fontSize: "1rem", my: 0.2 }} />
      <Typography variant="small" fontWeight={600} color={"text.active2"}>{`${compactNumber(
        from || 0
      )} - ${to ? compactNumber(to || 0) : "ထ"}`}</Typography>
    </Box>
  );
}
