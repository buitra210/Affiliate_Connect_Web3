import { ScoreFormula } from "./api/api";
import { BlogProps } from "../public/images/Blogs/MainBlog";

export const mockScoreData = [
  [0, 49],
  [10, 72],
  [20, 66],
  [30, 67],
  [40, 70],
  [50, 78],
  [60, 75],
  [70, 78],
  [80, 56],
  [90, 70],
  [100, 78],
  [110, 55],
  [120, 73],
  [130, 75],
  [140, 52],
  [150, 66],
  [160, 79],
  [170, 74],
  [180, 58],
  [190, 73],
  [200, 61],
  [210, 49],
  [220, 69],
  [230, 52],
  [240, 62],
  [250, 62],
  [260, 47],
  [270, 72],
  [280, 65],
  [290, 75],
  [300, 66],
  [310, 52],
  [320, 59],
  [330, 68],
  [340, 76],
  [350, 59],
  [360, 65],
  [370, 68],
  [380, 53],
  [390, 49],
  [400, 69],
  [410, 56],
  [420, 48],
  [430, 67],
  [440, 49],
  [450, 65],
  [460, 57],
  [470, 50],
  [480, 57],
  [490, 73],
  [500, 58],
  [510, 55],
  [520, 68],
  [530, 41],
  [540, 76],
  [550, 78],
  [560, 63],
  [570, 58],
  [580, 57],
  [590, 59],
  [600, 59],
  [610, 79],
  [620, 56],
  [630, 63],
  [640, 60],
  [650, 68],
  [660, 61],
  [670, 59],
  [680, 61],
  [690, 57],
  [700, 66],
  [710, 78],
  [720, 60],
  [730, 63],
  [740, 61],
  [750, 63],
  [760, 63],
  [770, 76],
  [780, 43],
  [790, 63],
  [800, 62],
  [810, 58],
  [820, 69],
  [830, 47],
  [840, 61],
  [850, 79],
];

export const scoreFormula: ScoreFormula = {
  totalAssets: 0.25,
  dappInteract: 0.25,
  otherWalletTx: 0.1,
  liquidationHis: 0.1,
  loanRatio: 0.15,
  investmentToTotalAssetRatio: 0.1,
  holdingAssetTrustWorthiness: 0.05,
};

export const MOCK_API_KEY = [
  {
    name: "API Key 1",
    createDate: Date.now(),
    status: "Active",
    value: "123456789",
  },
  {
    name: "API Key 2",
    createDate: Date.now(),
    status: "Active",
    value: "123456789",
  },
  {
    name: "API Key 3",
    createDate: Date.now(),
    status: "Active",
    value: "123456789",
  },
  {
    name: "API Key 4",
    createDate: Date.now(),
    status: "Active",
    value: "123456789",
  },
  {
    name: "API Key 5",
    createDate: Date.now(),
    status: "Active",
    value: "123456789",
  },
];

export const MOCK_WALLET_REPUTATION = "Model for calculate wallet reputation of an echo system.";
export const MOCK_CREDIT_SCORE_DESCRIPTION =
  "Similar to the Credit Score in Traditional Finance, Crypto Credit Score is the scoring system that evaluates the on-chain credit history & ability to pay the Crypto loan wallet addresses.";
export const MOCK_TOKEN_HEALTH_DESCRIPTION =
  "This is a scoring system for cryptocurrencies that evaluates the overall health and performance of crypto assets.";

export const subBlogsMock: BlogProps[] = [
  {
    img: "https://pyxis.nymag.com/v1/imgs/51b/28a/622789406b8850203e2637d657d5a0e0c3-avatar-rerelease.2x.rsocial.w600.jpg",
    title: "Centic - A Gateway to Connect Web2 and Web3",
    description:
      "In response to the rapid development of decentralized finance and the increasing demand for crypto investment, a lending service has emerged to provide...",
    date: Date.now(),
  },
  {
    img: "https://pyxis.nymag.com/v1/imgs/51b/28a/622789406b8850203e2637d657d5a0e0c3-avatar-rerelease.2x.rsocial.w600.jpg",
    title: "Centic - A Gateway to Connect Web2 and Web3",
    description:
      "In response to the rapid development of decentralized finance and the increasing demand for crypto investment, a lending service has emerged to provide...",
    date: Date.now(),
  },
  {
    img: "https://pyxis.nymag.com/v1/imgs/51b/28a/622789406b8850203e2637d657d5a0e0c3-avatar-rerelease.2x.rsocial.w600.jpg",
    title: "Centic - A Gateway to Connect Web2 and Web3",
    description:
      "In response to the rapid development of decentralized finance and the increasing demand for crypto investment, a lending service has emerged to provide...",
    date: Date.now(),
  },
  {
    img: "https://pyxis.nymag.com/v1/imgs/51b/28a/622789406b8850203e2637d657d5a0e0c3-avatar-rerelease.2x.rsocial.w600.jpg",
    title: "Centic - A Gateway to Connect Web2 and Web3",
    description:
      "In response to the rapid development of decentralized finance and the increasing demand for crypto investment, a lending service has emerged to provide...",
    date: Date.now(),
  },
  {
    img: "https://pyxis.nymag.com/v1/imgs/51b/28a/622789406b8850203e2637d657d5a0e0c3-avatar-rerelease.2x.rsocial.w600.jpg",
    title: "Centic - A Gateway to Connect Web2 and Web3",
    description:
      "In response to the rapid development of decentralized finance and the increasing demand for crypto investment, a lending service has emerged to provide...",
    date: Date.now(),
  },
];
