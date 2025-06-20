export type ApiRecommendation = {
  tokens: Array<{
    id: string;
    name: string;
    type: 'token';
    symbol: string;
    imgUrl: string;
    tokenHealth: number | null;
    tradingVolumeChangeRate: number;
  }>;
};
