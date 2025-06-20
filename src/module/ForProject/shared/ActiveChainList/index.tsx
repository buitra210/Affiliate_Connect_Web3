import { ActiveChainIcon } from "@centic-scoring/icons";
import { Box, Avatar } from "@mui/material";

type Props = {
  chains: {
    name: string;
    avatar: string;
    id: string;
  }[];
};
export default function ActiveChainList({ chains }: Props) {
  return (
    <Box className="filter-item">
      <ActiveChainIcon sx={{ mr: 1, fontSize: "1rem" }} />
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {chains?.map((chain, index) => {
          return (
            <Avatar
              key={chain.id}
              src={chain.avatar}
              sx={{ width: "18px", height: "18px", transform: `translateX(-${3 * index}px)` }}
            />
          );
        })}
      </Box>
    </Box>
  );
}
