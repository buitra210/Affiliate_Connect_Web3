import { PlaygroundReturnType } from "@centic-scoring/api/services";

export const DefaultWalletScore: PlaygroundReturnType = {
  score: 696,
  rank: 81,
  scoreBreakdown: {
    assets: 740,
    dappInteractions: 690,
    transactions: 712,
    liquidation: 795,
    loan: 550,
    circulatingAssets: 840,
    trustworthinessAssets: 631,
  },
  entityId: "0x8d655b1af80200a6b81e11482fdea66328b16e05",
};
export const defaultWalletAddress = "0x8d655b1af80200a6b81e11482fdea66328b16e05";

export const DefaultTokenScore: PlaygroundReturnType = {
  score: 742,
  rank: 2,
  scoreBreakdown: {
    marketCap: 870,
    priceOverHighest: 757,
    transactions: 1000,
    tradingVolume: 652,
    holders: 693,
    holderDistribution: 560,
    priceStability: 533,
  },
  entityId: "tether",
};

export const DefaultWReputation: any = {
  _id: "aave_0xc3f89f829ca23e85c59e9ec44a0c79e483d58be2",
  NumberOfTokensBorrow: 1,
  NumberOfTokensDeposit: 1,
  NumberOfTokensHold: 0,
  project: "aave",
  score: 799.02225819069,
  totalBorrowInUSD: 2500000,
  totalDepositInUSD: 17489648.55972115,
  totalHoldInUSD: 0,
  type: "Very Good",
  wallet: "0xc3f89f829ca23e85c59e9ec44a0c79e483d58be2",
};

export const DefaultSmReputation: any = {
  address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
  score: 799.02225819069,
};

export const DefaultExchangeReputation: any = {
  _id: "binance",
  NumberOfTokensBorrow: 0,
  NumberOfTokensDeposit: 8,
  NumberOfTokensHold: 11,
  score: 799.02225819069,
  totalBorrowInUSD: 0,
  totalDepositInUSD: 2095.027074098313,
  totalHoldInUSD: 150583365.23537037,
};

export const defaultTokenId = "tether";

export const bugReportUrl = "https://forms.gle/M3G5eRyU6vdaKcxSA";

export const DEFAULT_CACHE_TIME = 300 * 1000;
