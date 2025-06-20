import { chainsConfig } from "@centic-scoring/config/chain";
import { Avatar, Box, MenuItem, TextField, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAccount, useChains, useSwitchChain } from "wagmi";
import CenticLoading from "../CenticLoading";
import { toHex } from "viem";

//DEFAULT ETH CHAIN
const defaultChain = {
  chainId: 1,
  blockExplorerUrls: [chainsConfig["0x1"].explorerUrl || ""],
  chainName: chainsConfig["0x1"].name,
  nativeCurrency: {
    name: chainsConfig["0x1"].name || "",
    decimals: chainsConfig["0x1"].decimal || 18,
    symbol: chainsConfig["0x1"].name,
  },
  rpcUrls: chainsConfig["0x1"].rpc,
};

export default function ChainSelect() {
  const chains = useChains();
  const { chainId, connector, isConnected } = useAccount();
  const { switchChainAsync } = useSwitchChain();
  const [loading, setLoading] = useState(false);

  const handleChangeChain = useCallback(
    async (targetChainId: number) => {
      setLoading(true);
      try {
        let addChainParam = undefined;
        if (chainsConfig[targetChainId]) {
          addChainParam = {
            blockExplorerUrls: [chainsConfig[targetChainId].explorerUrl || ""],
            chainName: chainsConfig[targetChainId].name,
            nativeCurrency: {
              name: chainsConfig[targetChainId].name || "",
              decimals: chainsConfig[targetChainId].decimal || 18,
              symbol: chainsConfig[targetChainId].name,
            },
            rpcUrls: chainsConfig[targetChainId].rpc,
          };
        }
        await switchChainAsync({
          chainId: targetChainId as any,
          connector: connector,
          addEthereumChainParameter: addChainParam,
        });
      } catch (error) {
        toast.error((error as Error).message);
      }
      setLoading(false);
    },
    [connector, switchChainAsync]
  );

  const handleCheckChain = useCallback(async () => {
    if (!(isConnected && chainId)) {
      return;
    }
    if (
      !chains?.find((i) => {
        return i.id === chainId;
      })
    ) {
      await handleChangeChain(defaultChain.chainId);
    }
  }, [chains, chainId, handleChangeChain, isConnected]);

  useEffect(() => {
    handleCheckChain();
  }, [handleCheckChain]);

  return (
    <Box>
      {isConnected && (
        <TextField
          onChange={(e) => {
            handleChangeChain(Number(e.target.value));
          }}
          select
          value={chainId}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: loading ? <CenticLoading size={20} boxSx={{ mr: 0.5 }} /> : "",
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "background.hover",
              color: "text.active",
              fontWeight: 600,
            },
            mr: 2,
          }}
        >
          {chains.map((chain) => {
            return (
              <MenuItem key={chain.id} value={chain.id}>
                <Box sx={{ display: "flex", alignItems: "center", mt: 0.2 }}>
                  <Avatar
                    sx={{
                      width: 16,
                      height: 16,
                      mr: 1,
                    }}
                    src={chainsConfig[toHex(chain.id)]?.img || ""}
                  />
                  <Typography variant="body2" fontWeight={600}>
                    {chain.name}
                  </Typography>
                </Box>
              </MenuItem>
            );
          })}
        </TextField>
      )}
    </Box>
  );
}
