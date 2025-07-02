import ConnectWallet from "../ConnectWallet";

export default function UserWalletProfile() {
  // Mock values since wagmi is removed - always show ConnectWallet
  return (
    <>
      <ConnectWallet />
    </>
  );
}
