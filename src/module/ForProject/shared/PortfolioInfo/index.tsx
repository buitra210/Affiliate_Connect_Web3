import { CurrentHoldingIcon } from "@centic-scoring/icons";
import { Box, Typography } from "@mui/material";
import CurrentHoldingItem from "../CurrentHoldingItem";
import WalletBallanceItem from "../WalletBallanceItem";
import { ReactNode } from "react";

type Props = {
  filterConfig: {
    tags?: boolean;
    walletBalance?: boolean;
    currentHolding?: boolean;
    walletAge?: boolean;
    transIn30Days?: boolean;
    protocols?: boolean;
    activeChain?: boolean;
  };
  walletBalance: {
    from?: number;
    to?: number;
  };
  currentHolding: {
    [id: string | number]: {
      chainId?: string;
      tokenAddress?: string;
      excluded?: boolean;
      tokenSymbol?: string;
      icon?: string;
    };
  };
  title?: ReactNode;
};

export default function PortfolioInfo({
  currentHolding,
  filterConfig,
  walletBalance,
  title,
}: Props) {
  return (
    <>
      {((filterConfig.walletBalance &&
        (walletBalance.from || (walletBalance.from === 0 && walletBalance.to))) ||
        (filterConfig.currentHolding &&
          Boolean(
            Object.entries(currentHolding)?.filter(([, i]) => Boolean(i.chainId && i.tokenAddress))
              ?.length
          ))) && (
        <Box>
          {title || (
            <Typography variant="small" color="#9AA7BA">
              Portfolio
            </Typography>
          )}
          <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 1, mt: 1 }}>
            {filterConfig.walletBalance && walletBalance.from !== undefined && (
              <WalletBallanceItem from={walletBalance.from} to={walletBalance.to} />
            )}
            {filterConfig.currentHolding && Boolean(Object.entries(currentHolding)?.length) && (
              <Box className="filter-item">
                <CurrentHoldingIcon fontSize="small" sx={{ mr: 1 }} />
                {Object.values(currentHolding)
                  ?.filter((i) => Boolean(i.chainId && i.tokenAddress))
                  ?.map((value, index) => {
                    return (
                      <Box
                        key={index}
                        sx={{
                          position: "relative",
                          zIndex: index + 1,
                          transform: `translateX(-${3 * index}px)`,
                        }}
                      >
                        <CurrentHoldingItem chainId={value.chainId} icon={value.icon} />
                      </Box>
                    );
                  })}
              </Box>
            )}
          </Box>
        </Box>
      )}
    </>
  );
}
