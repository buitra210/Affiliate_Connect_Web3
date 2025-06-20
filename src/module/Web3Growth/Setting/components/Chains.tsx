import { Chain } from "@centic-scoring/config/chain";
import { Avatar, Box, Typography } from "@mui/material";
import { useMemo } from "react";

export const Chains = ({ chains, isShowName }: { chains: Array<Chain>; isShowName?: boolean }) => {
  const chainsRender = useMemo(() => {
    if (chains.length > 3) {
      return { chains: chains.slice(0, 3), large: chains.length - 3 };
    } else {
      return { chains: chains, large: 0 };
    }
  }, [chains]);
  return (
    <Box sx={{ position: "relative", display: "flex", alignItems: "center" }}>
      {chainsRender.chains.map((chain, index) => {
        return (
          <>
            <Avatar
              key={chain.id}
              src={chain.img}
              alt={chain.name}
              sx={{
                width: 24,
                height: 24,
                position: "absolute",
                left: index + index * 16,
                zIndex: 30 - index,
                // cursor: "pointer",
                "&:hover": {
                  filter: "brightness(1) drop-shadow(0 0 1px white)",
                },
              }}
            />
            {isShowName && (
              <Typography
                sx={{
                  fontWeight: 600,
                  position: "absolute",
                  left: chainsRender.chains.length + chainsRender.chains.length * 20,
                  ml: 2,
                }}
                color="text.primary"
              >
                {chain.name}
              </Typography>
            )}
          </>
        );
      })}
      {chainsRender.large !== 0 && (
        <Typography
          sx={{
            fontWeight: 600,
            position: "absolute",
            left: chainsRender.chains.length + chainsRender.chains.length * 20,
          }}
          color="text.primary"
        >
          +{chainsRender.large}
        </Typography>
      )}
    </Box>
  );
};
