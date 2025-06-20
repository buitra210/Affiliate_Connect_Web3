import { getAPIWithKey, getCDPAPI } from "@centic-scoring/api/fetchFunctions";
import { baseUrl, baseUrlCDP } from "../../urls";
import { getAuthAPI } from "@centic-scoring/api/fetchAuthFunctions";

export type RTEngagement = {
  numberOfWallets: number;
  numberOfUsers: number;
  numberOfCountries: number;
  numberOfSegmentsMatcher: number;
  numberOfSocialAccounts: number;
  users: {
    address: string;
    name: string;
    activeChains: string[];
    country: string;
    totalAssets: number;
    totalValueOfProjectParticipation: number;
    segmentsMatcher: string[];
    lastInteractionAt: number;
    loyaltyPoint: number;
    socialAccounts: {
      platform: string;
      id: string;
      name: string;
      url: string;
      followed: boolean;
    }[];
  }[];
};

export async function fetchUserEngagement({
  id,
  page,
  pageSize,
  chainId,
  country,
  keyword,
}: {
  id: string;
  page?: number;
  pageSize?: number;
  chainId?: string;
  country?: string;
  keyword?: string;
}) {
  const response = await getAuthAPI<RTEngagement>(
    baseUrlCDP +
      `/${id}/engagement?page=${page}&pageSize=${pageSize || ""}&chain=${chainId || ""}&country=${
        country || ""
      }&keyword=${keyword || ""}`,
    {}
  );
  return response;
}

export type RTUserEngagementDetail = {
  address: string;
  name: string;
  activeChains: {
    id: string;
    name: string;
    nativeTokenId: string;
    nativeTokenSymbol: string;
    imgUrl: string;
    explorerUrl: string;
    type: string;
  }[];
  country: string;
  totalAssets?: number;
  segmentsMatcher: string[];
  lastInteractionAt: number;
  loyaltyPoint?: number;
  totalValueOfProjectParticipation: number;
  socialAccounts: {
    platform: string;
    id: string;
    name: string;
    url: string;
    followed: boolean;
  }[];
};

export async function fetchUserEngagementDetail(id: string, address: string) {
  const response = await getAuthAPI<RTUserEngagementDetail>(
    baseUrlCDP + `/${id}/engagement/${address}`,
    {}
  );
  return response;
}

export type RTUserEngagementAsset = {
  adress: string;
  releasedTokens: {
    id: string;
    name: string;
    symbol: string;
    imgUrl: string;
    amount: number;
    valueInUSD: number;
    balanceByChains: {
      [chainId: string]: {
        amount: number;
        valueInUSD: number;
      };
    };
  }[];
  tokens: {
    key: string;
    id: string;
    type: string;
    name: string;
    address: string;
    chainId: string;
    symbol: string;
    imgUrl: string;
    tokenHealth: number;
    amount: number;
    valueInUSD: number;
    price: number;
    priceChangeRate: number;
  }[];
  dapps: {
    key: string;
    id: string;
    type: string;
    projectType: string;
    chainId: string;
    name: string;
    imgUrl: string;
    value: number;
    depositInUSD: number;
    borrowInUSD: number;
    claimable: number;
    claimable24hAgo: number;
    reserves: {
      category: string;
      healthFactor: number;
      deposit: {
        key: string;
        id: string;
        name: string;
        type: string;
        address: string;
        symbol: string;
        amount: number;
        valueInUSD: number;
        imgUrl: string;
        totalValue: number;
        isCollateral: true;
        rewards: {
          key: string;
          id: string;
          name: string;
          type: string;
          address: string;
          symbol: string;
          amount: number;
          valueInUSD: number;
          imgUrl: string;
          totalValue: number;
        }[];
        tokens: {
          address: string;
          symbol: string;
          amount: number;
          valueInUSD: number;
          imgUrl: string;
        }[];
      }[];
      borrow: {
        key: string;
        id: string;
        name: string;
        type: string;
        address: string;
        symbol: string;
        amount: number;
        valueInUSD: number;
        imgUrl: string;
        totalValue: number;
      }[];
      rewards: {
        address: string;
        symbol: string;
        amount: number;
        valueInUSD: number;
        imgUrl: string;
      }[];
    }[];
  }[];
};

export async function fetchUserEngagementAssets(id: string, address: string) {
  const response = await getAPIWithKey<RTUserEngagementAsset>(
    baseUrl + `/data/${id}/engagement/${address}/assets`,
    {}
  );
  return response;
}

export type RTEngagementTrafficShare = {
  layers: { title: string; users: number; ratio: number }[][];
  flows: { startAction: string; endAction: string; users: number }[][];
};

export async function fetchEngagementTrafficShare(
  id: string,
  address: string,
  startTimeSecond: number,
  endTimeSecond: number
) {
  const response = await getAPIWithKey<RTEngagementTrafficShare>(
    baseUrl +
      `/data/${id}/engagement/${address}/traffic-share?startTime=${startTimeSecond}&endTime=${endTimeSecond}`,
    {}
  );
  return response;
}

export type RTEngagementTransaction = {
  numberOfItems: number;
  noMore: boolean;
  transactions: {
    id: string;
    chain: string;
    timestamp: number;
    method: string;
    transactionHash: string;
    dapp: string;
    explorerUrl?: string;
    tokens: {
      id: string;
      type: string;
      name: string;
      symbol: string;
      address: string;
      imgUrl: string;
      amount: number;
      valueInUSD: number;
    }[];
  }[];
};

export async function fetchEngagementTransactions({
  id,
  chainId,
  address,
  dapp,
  interaction,
  page,
  pageSize,
  token,
}: {
  id: string;
  address: string;
  chainId?: string;
  interaction?: string;
  token?: string;
  dapp?: string;
  page?: number;
  pageSize?: number;
}) {
  const response = await getAPIWithKey<RTEngagementTransaction>(
    baseUrl +
      `/data/${id}/engagement/${address}/transactions?interaction=${interaction || ""}${
        chainId === "all" ? "" : `&chain=${chainId || ""}`
      }&token=${token || ""}&${dapp === "all" ? "" : `dapp=${dapp || ""}`}&page=${
        page || ""
      }&pageSize=${pageSize || ""}`,
    {}
  );
  return response;
}

export type RTDapps = {
  id: string;
  chains: string[];
  name: string;
  description: string;
  numberOfAddresses: number;
  tvl: number;
}[];

export async function fetchProjectDapps(id: string) {
  const response = await getAuthAPI<{
    numberOfDocs: number;
    docs: RTDapps;
  }>(baseUrlCDP + `/${id}/setting/dapps`, {});
  return response.docs;
}

export type RTToken = {
  chains: string[];
  id: string;
  name: string;
  symbol: string;
  imgUrl: string;
  marketCap: number;
}[];

export async function fetchPRojectTokens(id: string) {
  const response = await getAuthAPI<{ numberOfDocs: number; docs: RTToken }>(
    baseUrlCDP + `/${id}/setting/released-tokens`,
    {}
  );
  return response.docs;
}

export type RTEngagementFilterOptions = {
  chains: string[];
  countries: {
    id: string;
    label: string;
  }[];
  segmentsMatcher: {
    id: string;
    label: string;
  }[];
};
export type RTChains = string[];

export async function fetchProjectChain(id: string) {
  return (await getAuthAPI<{ deployedChains: RTChains }>(baseUrlCDP + `/${id}/setting/chains`))
    .deployedChains;
}

export async function fetchEngagementFilterOptions(id: string) {
  const response = await getAuthAPI<RTEngagementFilterOptions>(
    baseUrlCDP +
      `/${id}/engagement/filter-configs
  `,
    {}
  );
  return response;
}

export type RTSupportChain = {
  chains: {
    [chainId: string]: {
      id: string;
      name: string;
      nativeTokenId: string;
      nativeTokenSymbol: string;
      imgUrl: string;
      explorerUrl: string;
      type: string;
    };
  };
};

export async function fetchSupportChain() {
  return await getAuthAPI<RTSupportChain>(baseUrlCDP + `/support-chains`);
}

export type RTTokenList = {
  tokens: {
    address: string;
    chainId: string;
    symbol: string;
    imgUrl: string;
    id: string;
  }[];
};

export async function fetchTokenList(chainId: string, keyword?: string) {
  return await getCDPAPI<RTTokenList>(`/tokens-list`, { chainId: chainId, keyword: keyword });
}
