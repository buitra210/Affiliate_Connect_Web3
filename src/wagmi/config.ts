import { http, createConfig, unstable_connector, fallback } from "wagmi";
import { mainnet, bscTestnet } from "wagmi/chains";
import { coinbaseWallet, injected, walletConnect } from "./connectors";
// import { tronLinkConnector } from "./connectors/tronLink";
// import { tronLinkConnector } from "./connectors/tronLink";

declare module "wagmi" {
  // eslint-disable-next-line no-unused-vars
  interface Register {
    config: typeof wagmiConfig;
  }
}

// export const tron: Chain = {
//   id: 728126428,
//   name: "TRON Mainnet",
//   // network: 'trongrid',
//   nativeCurrency: {
//     decimals: 1,
//     name: "TRX",
//     symbol: "TRX",
//   },
//   rpcUrls: {
//     default: {
//       http: ["https://api.trongrid.io"],
//     },
//     public: {
//       http: ["https://api.trongrid.io"],
//     },
//   },
//   blockExplorers: {
//     default: {
//       name: "TRONSCAN",
//       url: "https://tronscan.org/#",
//     },
//   },
// };

export const wagmiConfig = createConfig({
  chains: process.env.NEXT_PUBLIC_ENV === "product" ? [mainnet] : [mainnet, bscTestnet],
  transports: {
    // [mainnet.id]: http("https://nd-177-396-769.p2pify.com/e6ad4d29004c82aaec7a4b2d61bcfe11"),
    [mainnet.id]: fallback([
      unstable_connector(injected),
      http("https://nd-177-396-769.p2pify.com/e6ad4d29004c82aaec7a4b2d61bcfe11"),
    ]),
    // [mainnet.id]: unstable_connector(injected),
    // [mainnet.id]: http(),
    [bscTestnet.id]: http(),
  },
  connectors: [
    injected({ target: "metaMask", shimDisconnect: true }),
    // metaMask({
    //   checkInstallationImmediately: true,
    //   extensionOnly: true,
    //   dappMetadata: {
    //     url: "https://centic.io/",
    //     name: "Centic",
    //     iconUrl: "/images/wallets/metamask.png",
    //   },
    // }),
    injected({
      target: {
        id: "trustWallet",
        name: "Trust Wallet",
        provider(window) {
          //@ts-ignore
          if (window?.trustWallet) return window.trustWallet;
          return undefined;
        },
      },
      shimDisconnect: true,
    }),
    coinbaseWallet({
      appName: "Centic",
      appLogoUrl: "https://centic.io/images/logos/centic_dark_icon.png",
      version: "3",
    }),
    walletConnect({
      projectId: "e798d9e6ae31f96eeb80c8396b17611b",
      showQrModal: true,
      metadata: {
        name: "Centic",
        url: "https://platform.centic.io", // origin must match your domain & subdomain
        icons: ["https://app.centic.io/favicon.ico"],
        description:
          "Check for analytical insights about every blockchain entity including assets allocation, activities, especially credit score and token health.",
      },
      qrModalOptions: {
        themeVariables: {
          "--wcm-z-index": "1301",
        },
      },
    }),
    // tronLinkConnector({ shimDisconnect: true }),
  ],
});
