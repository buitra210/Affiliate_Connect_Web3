/* eslint-disable no-unused-vars */
import { GIEntityType, ScoreFormula } from "@centic-scoring/api/api";
import { ScoreDetailReturnType } from "@centic-scoring/api/services";

type ItemType = {
  displayName: string;
  formula: ScoreFormula;
  value: string;
};
// export const entityTypes: GIEntityType[] = ["All", "Smart Contract", "Exchange", "Wallet", "Token"];
export const entityTypes: GIEntityType[] = ["All", "Smart Contract", "Exchange", "Wallet", "Token"];

export enum FetchStatus {
  IDLE = "idle",
  FETCHING = "fetching",
  UPDATING = "updating",
  SUCCESS = "success",
  FAILED = "failed",
}

export const timeRange = [
  {
    id: 2,
    label: "7D",
    timeRange: 604800000,
  },
  {
    id: 3,
    label: "1M",
    timeRange: 2592000000,
  },
  {
    id: 4,
    label: "3M",
    timeRange: 7948800000,
  },
];

export const ScoreTemplate: ItemType[] = [
  {
    displayName: "Wallet Score",
    formula: {
      totalAssets: 0.25,
      dappInteract: 0.25,
      otherWalletTx: 0.1,
      liquidationHis: 0.1,
      loanRatio: 0.15,
      investmentToTotalAssetRatio: 0.1,
      holdingAssetTrustWorthiness: 0.05,
    },
    value: "Wallet Score",
  },
  {
    displayName: "Token Score",
    formula: {
      marketCapScore: 0.3,
      tradingVolumeScore: 0.1,
      priceScore: 0.1,
      priceStabilityScore: 0.15,
      transactionScore: 0.1,
      holderScode: 0.15,
      holderDistributionScore: 0.1,
    },
    value: "Token Score",
  },
];

export const initScoreData: ScoreDetailReturnType = {
  authorId: "",
  authorName: "",
  description: "",
  isPublic: true,
  numForked: 0,
  scoreAvatar: "",
  scoreFormula: undefined,
  scoreId: "",
  scoreName: "Loyalty point",
  scoreType: undefined,
  star: [],
  entityType: "Wallet",
  method: "PageRank",
  model: "Wallet Reputation",
  modelDetail: {
    scoreFormula: undefined,
    pageRankForm: undefined,
  },
};

export const scoreDistributionWallet =
  "Score distribution of 2000 wallets caculated using the score model";
export const scoreDistributionToken =
  "Score distribution of 1738 tokens caculated using the score model";
export const organizationTypeOptions = [
  { key: "On-ramp /  Off-ramp", value: "On-ramp /  Off-ramp" },
  { key: "Payments", value: "Payments" },
  {
    key: "Security, Compliance, & Identity",
    value: "Security, Compliance, & Identity",
  },
  {
    key: "Wallets & Asset Management",
    value: "Wallets & Asset Management",
  },
  {
    key: "Marketplaces & Liquidity",
    value: "Marketplaces & Liquidity",
  },
  { key: "Analytics", value: "Analytics" },
  { key: "Trading", value: "Trading" },
  { key: "Gaming", value: "Gaming" },
  { key: "DAO", value: "DAO" },
  { key: "Fintech", value: "Fintech" },
  { key: "Financial institution", value: "Financial institution" },
  { key: "Other...", value: "Other..." },
];
export const COMING_SCORE = [
  { name: "Dydx Ecosystem Reputation", avatar: "/dydx.png" },
  { name: "Pancakeswap Ecosystem Reputation", avatar: "/pancake.png" },
  { name: "Uniswap Ecosystem Reputation", avatar: "/uniswap.png" },
  { name: "Lending Pool Index", avatar: "/Centic-logo.png" },
  { name: "Social Impact Score", avatar: "/Centic-logo.png" },
  { name: "Active Index", avatar: "/Centic-logo.png" },
];

export const EXPLORE_SCORE = [
  {
    name: "Dydx Ecosystem",
    avatar: "/dydx.png",
    id: "dydx",
    centicVerified: true,
    authorName: "Centic",
  },
  {
    name: "AAVE Ecosystem ",
    avatar: "/aave.png",
    id: "aave",
    centicVerified: true,
    authorName: "Centic",
  },
  {
    name: "LIDO Ecosystem ",
    avatar: "https://icons.llama.fi/lido.png",
    id: "lido",
    centicVerified: true,
    authorName: "Centic",
  },
  {
    name: "TRAVA FINANCE Ecosystem ",
    avatar: "/trava.png",
    id: "trava",
    centicVerified: true,
    authorName: "Centic",
  },
];
// export const EXPLORE_COMING_SCORE = [{ name: "Compound Ecosystem", avatar: "/compound.png" }];
export const EXPLORE_COMING_SCORE: { name: string; avatar: string }[] = [];
export const ALL_CHAIN: {
  [id: string]: {
    id: string;
    name: string;
    imgUrl: string;
  };
} = {
  all: {
    id: "all",
    name: "All chain",
    imgUrl: "",
  },
  "0x1": {
    id: "0x1",
    name: "Ethereum",
    imgUrl:
      "https://firebasestorage.googleapis.com/v0/b/token-c515a.appspot.com/o/tokens_v2%2FETH.png?alt=media&token=55db834b-029b-4237-9b30-f5fd28d7b2f4",
  },
  "0x38": {
    id: "0x38",
    name: "BNB Chain",
    imgUrl:
      "https://firebasestorage.googleapis.com/v0/b/token-c515a.appspot.com/o/tokens_v2%2FBNB.png?alt=media&token=b0a77aea-6f98-4916-9dbf-ffdc9b44c2c3",
  },
  "0x89": {
    id: "0x89",
    name: "Polygon",
    imgUrl:
      "https://firebasestorage.googleapis.com/v0/b/token-c515a.appspot.com/o/tokens_v2%2FMATIC.png?alt=media&token=f3dd80ba-b045-40ba-9c8c-ee0d9617d798",
  },
  "0xfa": {
    id: "0xfa",
    name: "Fantom",
    imgUrl:
      "https://firebasestorage.googleapis.com/v0/b/token-c515a.appspot.com/o/tokens_v2%2FFTM.png?alt=media&token=0fc3758c-9aa3-491b-904b-46fabb097447",
  },
  "0xa4b1": {
    id: "0xa4b1",
    name: "Arbitrum",
    imgUrl:
      "https://firebasestorage.googleapis.com/v0/b/token-c515a.appspot.com/o/tokens_v2%2Farbitrum.jpeg?alt=media&token=cd5a7393-1488-4d3a-8eeb-f9b7d65d952b",
  },
  "0xa": {
    id: "0xa",
    name: "Optimism",
    imgUrl:
      "https://firebasestorage.googleapis.com/v0/b/token-c515a.appspot.com/o/tokens_v2%2Foptimism.png?alt=media&token=5bdb5bd7-6aa7-4c31-bc49-121e869f6b49",
  },
  "0xa86a": {
    id: "0xa86a",
    name: "Avalanche C-Chain",
    imgUrl:
      "https://firebasestorage.googleapis.com/v0/b/token-c515a.appspot.com/o/tokens_v2%2FAVAX.png?alt=media&token=1e01b02f-0fb2-4887-b84d-837a4e2880dd",
  },
  "x-avax": {
    id: "x-avax",
    name: "Avalanche X-Chain",
    imgUrl:
      "https://firebasestorage.googleapis.com/v0/b/token-c515a.appspot.com/o/tokens_v2%2FAVAX-X.png?alt=media&token=ebaa0fc0-3420-42aa-ad0b-39bdeea3c074",
  },
  "p-avax": {
    id: "p-avax",
    name: "Avalanche P-Chain",
    imgUrl:
      "https://firebasestorage.googleapis.com/v0/b/token-c515a.appspot.com/o/tokens_v2%2FAVAX-P.png?alt=media&token=3d8caa29-28e8-46a0-8248-393637b8589d",
  },
  "0x2b6653dc": {
    id: "0x2b6653dc",
    name: "Tron",
    imgUrl:
      "https://firebasestorage.googleapis.com/v0/b/token-c515a.appspot.com/o/tokens_v2%2FTRX.png?alt=media&token=85e1e5a3-26bc-433b-81dd-f2733c7ffe80",
  },
};

export const CHART_COLOR_RANGE = [
  // "#002831",
  "#0A3C58",
  "#025188",
  "#0973AF",
  "#1B95C8",
  "#4AB7D9",
  "#7EEBE4",
  "#C0F9B7",
  "#E1FDE7",
  "#FF9999",
  "#009FDB",
  "#A9AAF2",
  "#AD9C55",
  "#F0D77D",
  "#B18BFF",
  "#C9E1F8",
  "#764C79",
];

export const PORTFOLIO_URL = "https://portfolio.centic.io";
export const APP_URL =
  (process.env.NEXT_PUBLIC_ENV === "staging" && "https://staging.centic.io") ||
  (process.env.NEXT_PUBLIC_ENV === "product" && "https://centic.io") ||
  "https://staging.centic.io";
