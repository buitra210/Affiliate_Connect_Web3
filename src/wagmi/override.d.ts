/* eslint-disable no-unused-vars */

declare module "@wagmi/core/src/connectors/injected" {
  interface Window {
    trustWallet: any;
    tron: any;
  }
}
