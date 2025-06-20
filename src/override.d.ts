import { WalletProvider } from "./global";

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    trustWallet: WalletProvider;
  }
}
