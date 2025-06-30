export const baseUrl = process.env.NEXT_PUBLIC_PORTFOLIO_ENDPOINT;
export const baseUrlStaging = process.env.NEXT_PUBLIC_PORTFOLIO_ENDPOINT;
export const baseUrlMarketplace = process.env.NEXT_PUBLIC_INTEGRATE_ENDPOINT;
export const baseUrlCDP = process.env.NEXT_PUBLIC_CDP_ENDPOINT;
export const baseKOLsUrl = "http://0.0.0.0:8096/v3";
// (process.env.NEXT_PUBLIC_ENV === "staging" && "https://develop.centic.io/affiliate-staging/v3") ||
// (process.env.NEXT_PUBLIC_ENV === "product" && "https://develop.centic.io/affiliate/v3") ||
// "https://develop.centic.io/affiliate-staging/v3";

export const baseURLAirdrop =
  (process.env.NEXT_PUBLIC_ENV === "staging" && "https://develop.centic.io/ctp-api") ||
  (process.env.NEXT_PUBLIC_ENV === "product" && "https://develop.centic.io/ctp-api") ||
  "https://develop.centic.io/ctp-api";
