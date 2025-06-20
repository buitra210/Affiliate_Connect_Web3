// import { isFirefox } from "react-device-detect";

// import { getTronLinkProvider } from "@centic-scoring/wagmi/connectors/tronLink";

// import { getTronLinkProvider } from "@centic-scoring/wagmi/connectors/tronLink";

export type WalletConfig = {
  id: string;
  title: string;
  icon: string;
  connectorId?: string;
  deepLink?: string;
  installed?: boolean;
  guide?: string | { desktop?: string; mobile?: string };
  downloadLink?: string | { desktop?: string; mobile?: string };
  mobileOnly?: boolean;
  qrCode?: () => Promise<string>;
};

export const ConnectorIDs = {
  metamask: "metaMask",
  metamaskSDK: "metaMaskSDK",
  walletConnect: "walletConnect",
  coinbase: "coinbaseWalletSDK",
  trustWallet: "trustWallet",
  // tronLink: "tronLink",
};

export const walletsConfig: () => WalletConfig[] = () => {
  return [
    {
      id: "metamask",
      title: "Metamask",
      icon: "/images/wallets/metamask.png",
      connectorId: ConnectorIDs.metamask,
      deepLink: "https://metamask.app.link/dapp/centic.io/",
      downloadLink: {
        desktop:
          "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en",
        mobile: "https://metamask.app.link/dapp/centic.io/",
      },
      get installed() {
        if (typeof window === "undefined") {
          return false;
        }
        if (window.ethereum?.isMetaMask) {
          return true;
        }
        // @ts-ignore
        if (window.ethereum?.providers?.some((p) => p.isMetaMask)) {
          return true;
        }
        return false;
      },
    },
    {
      id: "coinbase",
      title: "Coinbase Wallet",
      icon: "/images/wallets/coinbase.png",
      connectorId: ConnectorIDs.coinbase,
      installed: true,
    },
    // {
    //   id: "binance",
    //   title: "Binance Wallet",
    //   icon: "/images/wallets/binance.png",
    //   //   get installed() {
    //   //     return typeof window !== "undefined" && Boolean(window.BinanceChain);
    //   //   },
    //   // connectorId: ConnectorNames.BSC,
    //   guide: {
    //     desktop: "https://www.bnbchain.org/en/binance-wallet",
    //   },
    //   downloadLink: {
    //     desktop: isFirefox
    //       ? "https://addons.mozilla.org/en-US/firefox/addon/binance-chain"
    //       : "https://chrome.google.com/webstore/detail/binance-wallet/fhbohimaelbohpjbbldcngcnapndodjp",
    //   },
    // },
    {
      id: "trust",
      title: "Trust Wallet",
      icon: "/images/wallets/trustwallet.png",
      connectorId: ConnectorIDs.trustWallet,
      deepLink: "https://link.trustwallet.com/open_url?url=https://centic.io/",
      downloadLink:
        "https://chrome.google.com/webstore/detail/trust-wallet/egjidjbpglichdcondbcbdnbeeppgdph",
      guide: {
        desktop: "https://trustwallet.com/browser-extension",
        mobile: "https://trustwallet.com/",
      },
      get installed() {
        if (typeof window === "undefined") {
          return false;
        }
        if (window.ethereum?.isTrust) {
          return true;
        }
        // @ts-ignore
        if (window.ethereum?.providers?.some((p) => p.isTrust)) {
          return true;
        }
        // @ts-ignore
        if (window.trustWallet) {
          return true;
        }
        return false;
      },
    },
    // {
    //   id: "ledger",
    //   title: "Ledger",
    //   icon: "/images/wallets/ledger.png",
    //   // connectorId: ConnectorNames.Ledger,
    // },
    {
      id: "walletconnect",
      title: "WalletConnect",
      icon: "/images/wallets/walletconnect.png",
      connectorId: ConnectorIDs.walletConnect,
      installed: true,
    },
    // {
    //   id: "tronLink",
    //   title: "TronLink",
    //   icon: "/images/wallets/tronlink.png",
    //   connectorId: ConnectorIDs.tronLink,
    //   get installed() {
    //     return !!getTronLinkProvider();
    //   },
    //   downloadLink:
    //     "https://chrome.google.com/webstore/detail/tronlink/ibnejdfjmmkpcnlpebklmnkoeoihofec",
    //   guide: {
    //     desktop: "https://www.tronlink.org/dlDetails/",
    //     mobile: "https://www.tronlink.org/dlDetails/",
    //   },
    // },
    // {
    //   id: "coin98",
    //   title: "Coin98",
    //   icon: "/images/wallets/coin98.png",
    //   // connectorId: ConnectorNames.Injected,
    //   deepLink: "https://coin98.com/dapp/centic.io/56",
    //   downloadLink:
    //     "https://chrome.google.com/webstore/detail/coin98-wallet/aeachknmefphepccionboohckonoeemg",
    //   //   get installed() {
    //   //     return (
    //   //       typeof window !== "undefined" &&
    //   //       (Boolean((window.ethereum as ExtendEthereum)?.isCoin98) || Boolean(window.coin98))
    //   //     );
    //   //   },
    // },
    // {
    //   id: "opera",
    //   title: "Opera Wallet",
    //   icon: "/images/wallets/opera.png",
    //   // connectorId: ConnectorNames.Injected,
    //   get installed() {
    //     return typeof window !== "undefined" && Boolean(window.ethereum?.isOpera);
    //   },
    //   downloadLink: "https://www.opera.com/crypto/next",
    // },
    // {
    //   id: "brave",
    //   title: "Brave Wallet",
    //   icon: "/images/wallets/brave.png",
    //   // connectorId: ConnectorNames.Injected,
    //   get installed() {
    //     return typeof window !== "undefined" && Boolean(window.ethereum?.isBraveWallet);
    //   },
    //   downloadLink: "https://brave.com/wallet/",
    // },
  ];
};
