import { CoinIcon } from "@centic-scoring/icons";
import { compactNumber } from "@centic-scoring/utils/string/stringUtils";
import { Box, Typography } from "@mui/material";

type Props = { from?: number; to?: number };
export default function WalletBallanceItem({ from, to }: Props) {
  return (
    <Box className="filter-item">
      <CoinIcon fontSize="small" sx={{ my: -0.2 }} />
      <Typography ml={1} variant="small" fontWeight={600} color="text.active2">{`$${compactNumber(
        from || 0,
        2
      )} - ${to ? `$${compactNumber(to || 0, 2)}` : "ထ"}`}</Typography>
    </Box>
  );
}
