export type WalletScore = {
  totalAssets?: number;
  dappInteract?: number;
  otherWalletTx?: number;
  liquidationHis?: number;
  loanRatio?: number;
  investmentToTotalAssetRatio?: number;
  holdingAssetTrustWorthiness?: number;
  _id?: string;
};

export type TokenScore = {
  totalAssets?: number;
  marketCapScore?: number;
  tradingVolumeScore?: number;
  priceScore?: number;
  priceStabilityScore?: number;
  transactionScore?: number;
  holderScode?: number;
  holderDistributionScore?: number;
  _id?: string;
};

export type AutoCompleteOptions = {
  imgUrl: string;
  name: string;
  id: string;
  chains?: string[];
};
export type GIEntityType =
  | "All"
  | "Smart Contract"
  | "Wallet"
  | "Token"
  | "Dapps"
  | "Project"
  | "Exchange";
export type GIScoreModel =
  | "Wallet Reputation"
  | "Exchange Reputation"
  | "Smart Contract Reputation"
  | "Reputation"
  | "Credit Score"
  | "Token Health";
export type GIMethods = "ScoreCard" | "PageRank" | "AI Base";
export type ScoreFormula = TokenScore & WalletScore;
export type ScoreType = "Token Score" | "Wallet Score";
