/* eslint-disable @next/next/no-img-element */
import {
  deleteAPIJwt,
  getAPIJwtWithKey,
  getAPPStorage,
  setAPIJwtWithKey,
  setAPPStorage,
} from "@centic-scoring/utils/storage/authStorage";
import { Box, Button, Dialog, DialogContent, Divider, Typography } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
// wagmi removed
import BootstrapDialogTitle from "../primitives/Dialog";
import { StateStatus } from "../component";
import { loginPortfolio } from "@centic-scoring/api/services";
import { walletsConfig } from "@centic-scoring/config/wallets";
import { hexlify, toUtf8Bytes } from "ethers";
import { toast } from "react-toastify";
import { useAppDispatch } from "@centic-scoring/redux/hook";
import { updateAuthState } from "@centic-scoring/redux/slices/auth-end-user";
import { QuestStorage } from "@centic-scoring/utils/storage/questsStorage";
// import { walletsConfig } from "@centic-scoring/config/wallets";

type Props = {
  handleClose: () => void;
  handleOpen: () => void;
  open: boolean;
};
export default function SignatureRequire({ handleClose, handleOpen, open }: Props) {
  const address = null; // Mock value since wagmi is removed
  const connector = null; // Mock value since wagmi is removed
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState<StateStatus>("IDLE");
  const connectorConfig = useMemo(() => {
    return walletsConfig().find((config) => config.connectorId === connector?.id);
  }, [connector]);

  const getPortfolioJwt = useCallback(async () => {
    try {
      deleteAPIJwt("portfolio");
      setStatus("PROCESSING");
      const provider: any = await connector?.getProvider();
      const nonce = Math.round(Math.random() * 1e6);
      const msg =
        `I am signing my one-time nonce: ${nonce}.` +
        "\n\n" +
        "Note: Sign to log into your Centic account. This is free and will not require a transaction.";
      let signature = "";
      try {
        if (connector?.id === "tronLink") {
          signature = await provider?.tronWeb?.trx?.signMessageV2!(msg);
        } else {
          signature = await provider.request({
            method: "personal_sign",
            params: [hexlify(toUtf8Bytes(msg)), address?.toLocaleLowerCase()],
          });
        }
      } catch (error) {
        console.log("🚀 ~ getPortfolioJwt ~ error:", error);
      }
      if (signature) {
        const res = await loginPortfolio({
          address: String(address),
          nonce: nonce,
          signature: signature,
        });
        if (res.apiKey) {
          setAPIJwtWithKey("portfolio", String(address), res.apiKey);
          dispatch(updateAuthState(true));
          handleClose();
        }
      } else {
        toast.error("Error getting user signature");
      }

      setStatus("SUCCESS");
    } catch (error) {
      //pass
      setStatus("FAILED");
    }
  }, [address, handleClose, connector, dispatch]);

  useEffect(() => {
    const portfolioJWT = getAPIJwtWithKey("portfolio", String(address));
    const skipSignWallet = Boolean(getAPPStorage("skipWalletVerification"));
    if (!portfolioJWT && !skipSignWallet) {
      deleteAPIJwt("portfolio");
      //Remove quest storage when change wallet address
      QuestStorage.deleteStorage();
      dispatch(updateAuthState(false));
      handleOpen();
    }
  }, [handleOpen, address, dispatch]);

  return (
    <Dialog open={open} fullWidth maxWidth={"xs"}>
      <BootstrapDialogTitle
        onClose={() => {
          handleClose();
        }}
      />
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mt: 2 }}>
        {connectorConfig?.icon && (
          <img
            src={connectorConfig?.icon || ""}
            style={{ width: "60px", height: "60px" }}
            alt="wallet"
          />
        )}
      </Box>
      <DialogContent>
        <Box sx={{ display: "flex", justifyContent: "center" }}></Box>
        <Typography variant="h4" align="center" mt={3}>
          Welcome to Centic
        </Typography>

        <Typography variant="body2" mt={3} align="center">
          Prove you are the holder of the address.
        </Typography>

        <Divider sx={{ my: 3 }} />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={getPortfolioJwt}
          disabled={status === "PROCESSING"}
        >
          Verify your address
        </Button>

        <Typography
          variant="body2"
          sx={{ textAlign: "center", mt: 2, cursor: "pointer" }}
          onClick={() => {
            setAPPStorage("skipWalletVerification", "true");
            handleClose();
          }}
        >
          Skip
        </Typography>
      </DialogContent>
    </Dialog>
  );
}
