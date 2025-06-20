import { WalletAgeIcon } from "@centic-scoring/icons";
import { Box, Typography } from "@mui/material";

type Props = {
  from?: number;
  to?: number;
};

export default function WalletAgeItem({ from, to }: Props) {
  return (
    <Box className="filter-item">
      <WalletAgeIcon fontSize="small" />
      <Typography ml={1} variant="small" fontWeight={600} color="text.active2">{`${new Date(
        Date.now() - (to || Date.now())
      ).toLocaleDateString("en-us")} - ${
        from !== null ? new Date(Date.now() - (from || 0)).toLocaleDateString("en-us") : "Now"
      }`}</Typography>
    </Box>
  );
}
