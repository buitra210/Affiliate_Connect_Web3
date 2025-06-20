import CenticLoading from "@centic-scoring/components/CenticLoading";
import Failed from "@centic-scoring/components/Failed";
import { StateStatus } from "@centic-scoring/components/component";
import { WalletConfig } from "@centic-scoring/config/wallets";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useConnect } from "wagmi";

export default function WalletContent({ wallet }: { wallet: WalletConfig }) {
  const { connect, connectors } = useConnect();
  const [status, setStatus] = useState<StateStatus>("IDLE");
  const [errorText, setErrorText] = useState<string>("");

  const connector = useMemo(() => {
    return (
      connectors.find((conn) => {
        if (!wallet.connectorId) {
          return false;
        }
        return conn.id === wallet.connectorId;
      }) || null
    );
  }, [connectors, wallet.connectorId]);

  const handleConnect = useCallback(() => {
    if (connector) {
      setStatus("PROCESSING");
      connect(
        { connector: connector },
        {
          onSuccess() {
            setStatus("SUCCESS");
          },
          onError(err) {
            setErrorText(err.message);
            setStatus("FAILED");
          },
        }
      );
      //kepp connection for old wagmi wallet lib
      localStorage.setItem(`wagmi.${connector.id}.shimDisconnect`, "true");
    }
  }, [connect, connector]);
  useEffect(() => {
    if (wallet.installed) {
      // TODO: connect wallet

      handleConnect();
    }
  }, [wallet.installed, handleConnect]);

  return (
    <>
      {!wallet.installed && <WalletNotInstalled wallet={wallet} />}
      {wallet.installed && (
        <WalletInstalled
          wallet={wallet}
          status={status}
          errorText={errorText}
          handleConnect={handleConnect}
        />
      )}
    </>
  );
}

const WalletInstalled = ({
  status,
  wallet,
  errorText,
  handleConnect,
}: {
  wallet: WalletConfig;
  status: StateStatus;
  errorText?: string;
  handleConnect: () => void;
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Image
        src={wallet.icon}
        width={80}
        height={80}
        style={{ borderRadius: "12px" }}
        alt={wallet.id}
      />
      {status === "PROCESSING" && (
        <>
          <CenticLoading size={50} boxSx={{ my: 3 }} />
          <Typography textAlign={"center"} variant="body2" color="text.secondary">
            Connecting to {wallet.title}
          </Typography>
        </>
      )}
      {status === "FAILED" && (
        <>
          <Box mt={3} mb={1}>
            <Failed title={errorText} />
          </Box>
          <Button variant="contained" onClick={handleConnect}>
            Retry
          </Button>
        </>
      )}
    </Box>
  );
};

const WalletNotInstalled = ({ wallet }: { wallet: WalletConfig }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Image
        src={wallet.icon}
        width={80}
        height={80}
        style={{ borderRadius: "12px" }}
        alt={wallet.id}
      />
      <Typography
        textAlign={"center"}
        variant="body1"
        color="text.primary"
        mt={2}
        mb={1}
        fontWeight={600}
      >
        {wallet.title} is not installed
      </Typography>
      <Typography textAlign={"center"} variant="body2" color="text.secondary">
        Please install {wallet.title} browser extension.
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 3,
          "& button": {
            minWidth: "140px",
            mx: 1,
          },
        }}
      >
        {wallet.guide && (
          <Link
            href={typeof wallet.guide === "string" ? wallet.guide : wallet.guide.desktop || ""}
            target="_blank"
          >
            <Button variant="outlined">Setup Guilde</Button>
          </Link>
        )}
        {wallet.downloadLink && (
          <Link
            href={
              typeof wallet.downloadLink === "string"
                ? wallet.downloadLink
                : wallet.downloadLink.desktop || ""
            }
            target="_blank"
          >
            <Button variant="contained">Install</Button>
          </Link>
        )}
        {!(wallet.downloadLink || wallet.guide) && <Box>Init connect action</Box>}
      </Box>
    </Box>
  );
};
