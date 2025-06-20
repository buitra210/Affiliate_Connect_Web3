import { ProtocolIcon } from "@centic-scoring/icons";
import { Avatar, Box, Typography } from "@mui/material";
import Trans30DayItem from "../Trans30DayItem";
import WalletAgeItem from "../WalletAgeItem";
import { ReactNode } from "react";
import ActiveChainList from "../ActiveChainList";

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
  walletAge: {
    from?: number;
    to?: number;
    unit: number;
  };
  transIn30Days: {
    from?: number;
    to?: number;
  };
  protocols: {
    [id: string | number]: {
      id?: string;
      excluded?: boolean;
      name?: string;
      icon?: string;
    };
  };
  activeChain: {
    name: string;
    avatar: string;
    id: string;
  }[];
  title?: ReactNode;
};
export default function OnChainActivityInfo({
  activeChain,
  filterConfig,
  protocols,
  transIn30Days,
  walletAge,
  title,
}: Props) {
  const walletAgeRender =
    (filterConfig.walletAge && walletAge.from) || (walletAge.from === 0 && walletAge.to);
  const transIn30DaysRender =
    (filterConfig.transIn30Days && transIn30Days.from) ||
    (transIn30Days.from === 0 && transIn30Days.to);
  const protocolsRender =
    filterConfig.protocols && Object.values(protocols)?.filter((i) => i.id)?.length > 0;
  const activeChainsRender = filterConfig.activeChain && Boolean(activeChain?.length);
  return (
    <>
      {(walletAgeRender || transIn30DaysRender || protocolsRender || activeChainsRender) && (
        <Box>
          {title || (
            <Typography variant="small" color="#9AA7BA">
              On-chain activity
            </Typography>
          )}
          <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 1, mt: 1 }}>
            {walletAgeRender && (
              <WalletAgeItem
                from={(walletAge?.from || 0) * walletAge.unit * 1000}
                to={(walletAge.to || 0) * walletAge.unit * 1000}
              />
            )}
            {transIn30DaysRender && (
              <Trans30DayItem from={transIn30Days.from} to={transIn30Days.to} />
            )}
            {protocolsRender && (
              <Box className="filter-item">
                <ProtocolIcon sx={{ fontSize: "1rem", mr: 1 }} />
                {Object.values(protocols)
                  ?.filter((i) => i.id)
                  ?.map((value, index) => {
                    return (
                      <Avatar
                        key={index}
                        src={value.icon}
                        sx={{
                          width: "18px",
                          height: "18px",
                          transform: `translateX(-${3 * index}px)`,
                        }}
                      />
                    );
                  })}
              </Box>
            )}
            {activeChainsRender && <ActiveChainList chains={activeChain || []} />}
          </Box>
        </Box>
      )}
    </>
  );
}
