import { chainsConfig } from "@centic-scoring/config/chain";
import { Box, Avatar } from "@mui/material";

type Props = {
  chainId?: string;
  icon?: string;
};

export default function CurrentHoldingItem({ chainId, icon }: Props) {
  return (
    <Box>
      <Avatar src={icon} sx={{ width: "18px", height: "18px" }} />
      <Avatar
        src={chainsConfig[chainId || ""]?.img || "#"}
        sx={{
          width: "7px",
          height: "7px",
          position: "absolute",
          left: "0px",
          top: "0px",
          backgroundColor: "#FFFFFF",
        }}
      />
    </Box>
  );
}
