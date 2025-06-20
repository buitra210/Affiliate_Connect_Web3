import { WalletConfig } from "@centic-scoring/config/wallets";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

export default function WalletItem({ wallet }: { wallet: WalletConfig }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "90px",
        cursor: "pointer",
        "&:hover": { filter: "brightness(85%)" },
      }}
    >
      <Image
        src={wallet.icon}
        width={50}
        height={50}
        style={{ borderRadius: "5px" }}
        alt={wallet.id}
      />
      <Typography variant="small" mt={1} color={"secondary"}>
        {wallet.title}
      </Typography>
    </Box>
  );
}
