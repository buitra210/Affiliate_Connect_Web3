import { useAccount } from "wagmi";
import ConnectWallet from "../ConnectWallet";
import ConnectedWallet from "../ConnectedWallet";
import CenticLoading from "../CenticLoading";
import { Button } from "@mui/material";

export default function UserWalletProfile() {
  const { isConnected, status } = useAccount();
  return (
    <>
      {!isConnected && status !== "reconnecting" && status !== "connecting" && <ConnectWallet />}
      {isConnected && status === "connected" && <ConnectedWallet />}
      {(status === "reconnecting" || status === "connecting") && (
        <Button variant="outlined" sx={{ minWidth: "150px" }}>
          <CenticLoading size={20} />
        </Button>
      )}
    </>
  );
}
