export type Chain = {
  id: string;
  name: string;
  img: string;
  explorerUrl?: string;
  type?: string;
  color?: string;
  nativeSymbol?: string;
  decimal?: 18;
  rpc?: string[];
};

export const chainsConfig: { [id: string]: Chain } = {
  "0x1b58": {
    id: "0x1b58",
    name: "ZetaChain",
    img: "https://coin-images.coingecko.com/coins/images/26718/large/Twitter_icon.png",
    explorerUrl: "https://explorer.zetachain.com",
    type: "tx",
  },
  "0x1": {
    id: "0x1",
    name: "Ethereum",
    type: "tx",
    img: "/images/chains/0x1.png",
    explorerUrl: "https://etherscan.io",
    color: "#FFFFFF",
    nativeSymbol: "ETH",
    rpc: ["mainnet.infura.io"],
  },
  "0x38": {
    id: "0x38",
    name: "BNB Chain",
    img: "/images/chains/0x38.png",
    explorerUrl: "https://bscscan.com",
    type: "tx",
    color: "#F0B90B",
  },
  "0x61": {
    id: "0x61",
    name: "BNB Chain testnet",
    img: "/images/chains/0x38.png",
    explorerUrl: "https://testnet.bscscan.com",
    type: "tx",
    color: "#F0B90B",
  },
  "0x89": {
    id: "0x89",
    name: "Polygon",
    img: "/images/chains/0x89.png",
    explorerUrl: "https://polygonscan.com",
    type: "tx",
    color: "#9034D5",
  },
  "0x2b6653dc": {
    id: "0x2b6653dc",
    name: "Tron",
    img: "/images/chains/tron.png",
    explorerUrl: "https://tronscan.org",
    type: "transaction",
    color: "#FF0013",
  },
  "0xa4b1": {
    id: "0xa4b1",
    name: "Arbitrum",
    img: "/images/chains/0xa4b1.png",
    explorerUrl: "https://arbiscan.io",
    type: "tx",
    color: "#9DCCED",
  },
  "0xa": {
    id: "0xa",
    name: "Optimism",
    img: "/images/chains/0xa.png",
    explorerUrl: "https://optimistic.etherscan.io",
    type: "tx",
    color: "#FF0420",
  },
  "0x144": {
    id: "0x144",
    name: "ZkSync",
    img: "https://s2.coinmarketcap.com/static/img/coins/128x128/24091.png",
    explorerUrl: "https://explorer.zksync.io",
    type: "tx",
  },
  "0xfa": {
    id: "0xfa",
    name: "Fantom",
    img: "/images/chains/0xfa.png",
    explorerUrl: "https://ftmscan.com",
    type: "tx",
    color: "#1269FF",
  },
  "0x19": {
    id: "0x19",
    name: "Cronos",
    img: "/images/chains/cronos.png",
    type: "tx",
    color: "#6999FF",
  },
  solana: {
    id: "solana",
    name: "Solana",
    img: "/images/chains/solana.png",
    type: "tx",
    color: "#1D1D1D",
  },
  polkadot: {
    id: "polkadot",
    name: "Polkadot",
    img: "/images/chains/polkadot.png",
    type: "tx",
    color: "#E60079",
  },
  "0xa86a": {
    id: "0xa86a",
    name: "Avalanche C-Chain",
    img: "/images/chains/0xa86a.png",
    explorerUrl: "https://43114.snowtrace.io",
    type: "tx",
    color: "#E84142",
  },
  "x-avax": {
    id: "x-avax",
    name: "Avalanche X-Chain",
    img: "/images/chains/x-avax.png",
    type: "tx",
    color: "#BF3083",
  },
  "p-avax": {
    id: "p-avax",
    name: "Avalanche P-Chain",
    img: "/images/chains/p-avax.png",
    type: "tx",
    color: "#1273EA",
  },
  "0x5afe": {
    id: "0x5afe",
    name: "Oasis Sapphire",
    img: "/images/chains/rose.png",
    type: "tx",
    color: "#000000",
  },
  // "0x5aff": {
  //   id: "0x5aff",
  //   name: "Oasis Sapphire Testnet",
  //   img: "/images/chains/empty-token.png",
  //   type: "tx",
  //   color: "#000000",
  // },
  bitcoin: {
    id: "bitcoin",
    name: "Bitcoin",
    img: "https://assets.coingecko.com/coins/images/1/standard/bitcoin.png",
  },
  cosmos: {
    id: "cosmos",
    name: "Cosmos Hub",
    img: "https://assets.coingecko.com/coins/images/1481/standard/cosmos_hub.png",
  },
  "0x2105": {
    id: "0x2105",
    name: "Base",
    img: "https://assets.coingecko.com/asset_platforms/images/131/small/base.jpeg",
  },
  "0x8ae": {
    id: "0x8ae",
    name: "Kava",
    img: "https://assets.coingecko.com/coins/images/9761/standard/kava.png",
  },
  "0x64": {
    id: "0x64",
    name: "Gnosis",
    img: "https://assets.coingecko.com/coins/images/662/standard/logo_square_simple_300px.png",
  },
  "0x2019": {
    id: "0x2019",
    name: "Klaytn",
    img: "https://assets.coingecko.com/coins/images/9672/standard/klaytn.png",
  },
  "0x1388": {
    id: "0x1388",
    name: "Mantle",
    img: "https://assets.coingecko.com/coins/images/30980/standard/token-logo.png",
  },
  "0xa4ec": {
    id: "0xa4ec",
    name: "Celo",
    img: "https://assets.coingecko.com/coins/images/11090/standard/InjXBNx9_400x400.jpg",
  },
  "0x504": {
    id: "0x504",
    name: "Moonbeam",
    img: "https://icons.llamao.fi/icons/chains/rsz_moonbeam.jpg",
  },
  "0xa9": {
    id: "0xa9",
    name: "Manta Pacific",
    img: "https://icons.llamao.fi/icons/chains/rsz_manta.jpg",
  },
  "0x171": {
    id: "0x171",
    name: "PulseChain",
    img: "https://icons.llamao.fi/icons/chains/rsz_pulse.jpg",
  },
  "0x1e": {
    id: "0x1e",
    name: "Rootstock",
    img: "https://icons.llamao.fi/icons/chains/rsz_rsk.jpg",
  },
  "0x250": {
    id: "0x250",
    name: "Astar",
    img: "https://icons.llamao.fi/icons/chains/rsz_astar.jpg",
  },
  "0x440": {
    id: "0x440",
    name: "Metis Andromeda",
    img: "https://icons.llamao.fi/icons/chains/rsz_metis.jpg",
  },
  "0x1e14": {
    id: "0x1e14",
    name: "Canto",
    img: "https://icons.llamao.fi/icons/chains/rsz_canto.jpg",
  },
  "0x80": {
    id: "0x80",
    name: "Huobi Eco",
    img: "https://icons.llamao.fi/icons/chains/rsz_heco.jpg",
  },
  "0xe708": {
    id: "0xe708",
    name: "Linea",
    img: "https://assets.coingecko.com/coins/images/12509/standard/1649227343-linalogo200px.png",
  },
  "0x42": {
    id: "0x42",
    name: "OKXChain",
    img: "https://assets.coingecko.com/coins/images/33474/standard/OKX_logo.png",
  },
  "0x4e454152": {
    id: "0x4e454152",
    name: "Aurora",
    img: "https://icons.llamao.fi/icons/chains/rsz_aurora.jpg",
  },
  "0x505": {
    id: "0x505",
    name: "Moonriver",
    img: "https://icons.llamao.fi/icons/chains/rsz_moonriver.jpg",
  },

  "0xee": {
    id: "0xee",
    name: "Blast",
    img: "https://assets.coingecko.com/asset_platforms/images/192/small/blast.jpeg",
  },
  orai: {
    id: "orai",
    name: "Oraichain",
    img: "https://assets.coingecko.com/coins/images/12931/standard/orai.png",
  },
  ton: {
    id: "ton",
    name: "The Open Network",
    img: "https://coin-images.coingecko.com/coins/images/17980/large/photo_2024-09-10_17.09.00.jpeg",
    explorerUrl: "https://tonscan.org/",
    type: "tx",
  },
  "0x138de": {
    id: "0x138de",
    name: "Berachain",
    // nativeTokenId: "berachain-bera",
    // nativeTokenSymbol: "BERA",
    // nativeTokenDecimals: 18,
    img: "https://assets.coingecko.com/coins/images/25235/standard/BERA.png",
    explorerUrl: "https://berascan.com/",
    type: "tx",
  },
};

export function getChains(ignoreChains: string[] = []) {
  return Object.values(chainsConfig).filter((item) => !ignoreChains.includes(item.id));
}

export function getChains2({
  ignoreChains,
  selectChains,
}: {
  ignoreChains?: string[];
  selectChains?: string[];
}) {
  return Object.values(chainsConfig).filter((item) => {
    if (ignoreChains && ignoreChains.includes(item.id)) return false;
    if (selectChains && !selectChains.includes(item.id)) return false;
    return true;
  });
}
