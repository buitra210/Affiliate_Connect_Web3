import { getAPI, getAPIWithKey } from "@centic-scoring/api/fetchFunctions";
import { baseUrl, baseUrlCDP, baseUrlMarketplace, baseUrlStaging } from "../urls";
import { getAuthAPI } from "@centic-scoring/api/fetchAuthFunctions";
import { queryParams } from "@centic-scoring/api/ultils";

//HOLDER EXPLORE **********************************************************************************************************************************************************
export type RTAddressDistribution = {
  [distribution: string]: {
    total_addresses: number;
    total_balance: number;
    dydx_balance: number;
  };
};
export async function fetchAddressDistribution(id: string = "dydx") {
  const result = await getAPIWithKey<RTAddressDistribution>(
    baseUrl + `/data/${id || "dydx"}/holders/address-distribution`,
    {}
  );
  return result;
}

export type RTTokenBalanceDistribution = {
  whales: number;
  forgottenWallets: number;
  normalWallets: number;
};
export async function fetchAddressDistributionV2({
  chainId,
  id,
  tokenId,
}: {
  id: string;
  chainId?: string;
  tokenId?: string;
}) {
  const result = await getAPIWithKey<RTTokenBalanceDistribution>(
    baseUrl +
      `/data/${id || "dydx"}/holders/token-balance-distribution?chainId=${chainId || ""}&tokenId=${
        tokenId || ""
      }`,
    {}
  );
  return result;
}
export type RTBalanceFoundation = {
  [foundation: string]: {
    total_balance: number;
    dydx_balance: number;
  };
};
export async function fetchFoundation(id: string = "dydx") {
  const result = await getAPIWithKey<RTBalanceFoundation>(
    baseUrl + `/data/${id || "dydx"}/holders/foundations`,
    {}
  );
  return result;
}
export type RTBalanceProminent = {
  [key: string]: {
    id: string;
    projectType?: string;
    type: string;
    value: number;
    name: string;
  };
};
export type ProminentType = "contract" | "wallet" | "foundation";
export async function fetchProminentBalance({
  id,
  type,
  chainId,
  tokenId,
}: {
  id: string;
  type: ProminentType;
  chainId?: string;
  tokenId?: string;
}) {
  const result = await getAPIWithKey<RTBalanceProminent>(
    baseUrl +
      `/data/${id || "dydx"}/holders/prominent-balance?type=${
        type || "foundation"
      }&chainId=${chainId}&tokenId=${tokenId}`,
    {}
  );
  return result;
}
export async function fetchSmartContract(id: string = "dydx") {
  const result = await getAPIWithKey<RTBalanceFoundation>(
    baseUrl + `/data/${id || "dydx"}/holders/projects`,
    {}
  );
  return result;
}
export type RTDistributionToken = {
  [token: string]: {
    total_balance: number;
    total_addresses: number;
  };
};
export async function fetchToken(id: string = "dydx") {
  const result = await getAPIWithKey<RTDistributionToken>(
    baseUrl + `/data/${id}/holders/tokens`,
    {}
  );
  return result;
}
export type RTEventTransferDisibution = {
  [timeStamp: string]: {
    [address: string]: {
      value: number;
      name: string;
    };
  };
};
export async function fetchEventTransferDis({
  chainId,
  id,
  endTime,
  startTime,
  tokenId,
}: {
  id: string;
  chainId?: string;
  tokenId?: string;
  startTime?: number;
  endTime?: number;
}) {
  const result = await getAPIWithKey<RTEventTransferDisibution>(
    baseUrl +
      `/data/${id}/holders/event-transfer-distribution?chainId=${chainId || ""}&tokenId=${
        tokenId || ""
      }&startTime=${startTime || ""}&endTime=${endTime || ""}`,
    {}
  );
  return result;
}
export type RTDefiDistribution = {
  [address: string]: {
    id: string;
    type: string;
    projectType?: string;
    holders: number;
    balance: number;
    name: string;
  };
};
export type defiHolderType = "all" | "active" | "new";
export type defiDistributedBy = "token" | "dapp" | "nft";
export async function fetchDefiDistribution({
  chainId,
  distributeBy,
  holderType,
  id,
  tokenId,
}: {
  id: string;
  holderType: defiHolderType;
  distributeBy: defiDistributedBy;
  chainId?: string;
  tokenId?: string;
}) {
  const result = await getAPIWithKey<RTDefiDistribution>(
    baseUrl +
      `/data/${id}/holders/defi-distribution?defiType=${distributeBy}&holderType=${
        holderType || ""
      }&chainId=${chainId}&tokenId=${tokenId}`,
    {}
  );
  return result;
}
export type RTHolderChange = {
  now: {
    active: number;
    new: number;
    total: number;
  };
  logs: {
    [timeStamp: string]: {
      active: number;
      new: number;
    };
  };
};
export async function fetchHolderChange({
  chainID,
  id,
  endTime,
  startTime,
  tokenID,
}: {
  id: string;
  chainID?: string;
  startTime?: number;
  endTime?: number;
  tokenID?: string;
}) {
  const result = await getAPIWithKey<RTHolderChange>(
    baseUrl +
      `/data/${id || "dydx"}/holders/holder-change?chainId=${chainID || ""}&startTime=${
        startTime || ""
      }&endTime=${endTime || ""}&tokenId=${tokenID || ""}`,
    {}
  );
  return result;
}
//USER EXPLORE ********************************************************************************************************************************************************

//api: /v3/data/dydx
export type RTEcosystemSummary = {
  name: string;
  imgUrl: string;
  socialAccounts: {
    centic: string | undefined;
    website: string | undefined;
    twitter: string | undefined;
    telegram: string | undefined;
    discord: string | undefined;
    linkedin: string | undefined;
    reddit: string | undefined;
    medium: string | undefined;
    github: string | undefined;
    blog: string | undefined;
    coingecko: string | undefined;
    defillama: string | undefined;
  };
  category: string;
  description: string;
  tvl: number;
  tvlChangeRate: number;
  numberOfUsers: number;
  dailyUsersChangeRate: number;
  numberOfTransactions: number;
  dailyTransactionsChangeRate: number;
  token: {
    id: string;
    name: string;
    symbol: string;
    imgUrl: string;
    marketCap: 460549942;
  };
  tradingVolumeChangeLogs?: {
    [timeStamp: string]: number;
  };
  tvlChangeLogs?: {
    [timeStamp: string]: number;
  };
};

export async function fetchEcosystemSummary({
  id,
  endTime,
  startTime,
  chainId,
}: {
  id: string;
  startTime?: number;
  endTime?: number;
  chainId?: string;
}) {
  const result = await getAPIWithKey<RTEcosystemSummary>(
    baseUrl + `/data/${id || "dydx"}${queryParams({ endTime, startTime, chainId })}`,
    {}
  );
  return result;
}

export type RTProjectSummary = {
  id: string;
  name: string;
  visible: string;
  createdBy: string;
  createdById: string;
  imgUrl: string;
  category: string;
  description: string;
  verified: boolean;
  userRole: string;
  socialAccounts: {
    website?: string | null;
    twitter?: string | null;
    telegram?: string | null;
    discord?: string | null;
    blog?: string | null;
    linkedin?: string | null;
    reddit?: string | null;
    github?: string | null;
    medium?: string | null;
    etherscan?: string | null;
    bscscan?: string | null;
    ftmscan?: string | null;
    polygonscan?: string | null;
    defillama?: string | null;
    coinmarketcap?: string | null;
    coingecko?: string | null;
    opensea?: string | null;
    centic?: string | null;
  };
  importedFrom: string;
};

export async function fetchProjectSummary(id: string) {
  return await getAuthAPI<RTProjectSummary>(baseUrlCDP + `/${id}`);
}

export type RTUsageAUPerformance = {
  startTime: number;
  endTime: number;
  dailyUsers: {
    timestamp: number;
    numberOfUsers: number;
    numberOfTransactions: number;
  }[];
};
export async function fetchUniqueActiveUser({
  id,
  chainID,
  contract,
  dapp,
  endTime,
  startTime,
}: {
  id: string;
  chainID?: string;
  dapp?: string;
  contract?: string;
  startTime?: number;
  endTime?: number;
}) {
  const result = await getAPIWithKey<RTUsageAUPerformance>(
    baseUrl +
      `/data/${id || ""}/dapp-users/daily-users?chainId=${chainID || ""}&contract=${
        contract || ""
      }&dapp=${dapp || ""}&startTime=${startTime || ""}&endTime=${endTime || ""}`,
    {}
  );
  return result;
}
export type RTClaimReward = {
  startTime: number;
  endTime: number;
  claimed_rewards: {
    [timeStamp: string]: number;
  };
};
export async function fetchExClaimReward({
  id,
  chainId,
  endTime,
  startTime,
}: {
  id: string;
  chainId?: string;
  startTime?: number;
  endTime?: number;
}) {
  const result = await getAPIWithKey<RTClaimReward>(
    baseUrl +
      `/data/${id || "dydx"}/holders/daily-claimed-rewards?chainId=${chainId}&startTime=${
        startTime || ""
      }&endTime=${endTime || ""}`,
    {}
  );
  return result;
}
export type TDistributionItem = {
  id: string;
  name: string;
  numberOfUsers: number;
  numberOfTransactions: number;
  entity?: { id: string; type: string; projectType?: string };
};
export type TCexesDistributionItem = {
  idCoingecko: string;
  name: string;
  symbol: string;
  actionType: string;
  numberOfUsers: number;
  numberOfTransactions: number;
  totalValue: number;
  entity: {
    id: string;
    type: string;
  };
};
export type RTExploreDistribution = {
  startTime: number;
  endTime: number;
  numberOfUsers: number;
  numberOfTransactions: number;
  dapps: TDistributionItem[];
  contracts: TDistributionItem[];
  actions: TDistributionItem[];
  deposit: TCexesDistributionItem[];
  withdraw: TCexesDistributionItem[];
};

export async function fetchDistributionByDapp({
  id,
  chainID,
  startTime,
  endTime,
}: {
  id: string;
  chainID?: string;
  startTime?: number;
  endTime?: number;
}) {
  const result = await getAPIWithKey<RTExploreDistribution>(
    baseUrl +
      `/data/${id || "dydx"}/dapp-users/distribution-by-dapps?chainId=${chainID || ""}&startTime=${
        startTime || ""
      }&endTime=${endTime || ""}`,
    {}
  );
  return result;
}
export async function fetchDistributionBySmartContract({
  id,
  chainID,
  dapp,
}: {
  id: string;
  chainID?: string;
  dapp?: string;
}) {
  const result = await getAPIWithKey<RTExploreDistribution>(
    baseUrl +
      `/data/${id || "dydx"}/dapp-users/distribution-by-contracts?chainId=${chainID || ""}&dapp=${
        dapp || ""
      }`,
    {}
  );
  return result;
}
export async function fetchDistributionByAction({
  id,
  chainID,
  contract,
  dapp,
}: {
  id: string;
  chainID?: string;
  dapp?: string;
  contract?: string;
}) {
  const result = await getAPIWithKey<RTExploreDistribution>(
    baseUrl +
      `/data/${id || "dydx"}/dapp-users/distribution-by-actions?chainId=${chainID || ""}&contract=${
        contract || ""
      }&dapp=${dapp || ""}`,
    {}
  );
  return result;
}

export type RTExploreDistributionCexes = {
  startTime: number;
  endTime: number;
  numberOfUsers: number;
  numberOfTransactions: number;
  deposit: TCexesDistributionItem[];
  withdraw: TCexesDistributionItem[];
};

export async function fetchDistributionByToken({
  id,
  chainID,
  startTime,
  endTime,
}: {
  id: string;
  chainID?: string;
  startTime?: number;
  endTime?: number;
}) {
  const result = await getAPIWithKey<RTExploreDistributionCexes>(
    baseUrl +
      `/data/${id || "dydx"}/dapp-users/distribution-by-tokens?chainId=${chainID || ""}&startTime=${
        startTime || ""
      }&endTime=${endTime || ""}`,
    {}
  );
  return result;
}

export type RTOthertExchanges = {
  startTime: number;
  endTime: number;
  users:
    | {
        id: string;
        name: string;
        numberOfUsers: number;
        entity: { id: string; type: string; projectType: string };
      }[]
    | [];
  marketShare:
    | {
        id: string;
        name: string;
        tvl: number;
        marketShare: number;
        projectType: string;
        type: string;
      }[]
    | [];
};
export async function fetchOtherExchanges({
  id,
  chainID,
  contract,
  dapp,
}: {
  id: string;
  chainID?: string;
  dapp?: string;
  contract?: string;
}) {
  const result = await getAPIWithKey<RTOthertExchanges>(
    baseUrl +
      `/data/${id || "dydx"}/dapp-users/use-competitors?chainId=${chainID || ""}&contract=${
        contract || ""
      }&dapp=${dapp || ""}`,
    {}
  );
  return result;
}
export type RTLendingUser = {
  nDays: number;
  dailyUseLending:
    | {
        timestamp: number;
        numberOfDepositUsers: number;
        numberOfActiveUsers: number;
      }[]
    | [];
};

export async function getLendingUser({
  id,
  startTime,
  endTime,
}: {
  id: string;
  startTime: number;
  endTime: number;
}) {
  const result = await getAPIWithKey<RTLendingUser>(
    baseUrl +
      `/data/${
        id || "dydx"
      }/dapp-users/daily-use-lending?startTime=${startTime}&endTime=${endTime}`,
    {}
  );
  return result;
}
export type RTPartnerUser = {
  startTime: number;
  endTime: number;
  users:
    | {
        id: string;
        name: string;
        numberOfUsers: number;
        entity: { id: string; type: string; projectType?: string };
      }[]
    | [];
};
export async function getPartnerUser({
  id,
  chainID,
  contract,
  dapp,
}: {
  id: string;
  chainID?: string;
  contract?: string;
  dapp?: string;
}) {
  const result = await getAPIWithKey<RTPartnerUser>(
    baseUrl +
      `/data/${id || "dydx"}/dapp-users/use-partners?chainId=${chainID || ""}&contract=${
        contract || ""
      }&dapp=${dapp || ""}`,
    {}
  );
  return result;
}
export type RTDailyAction = {
  dailyActions:
    | {
        timestamp: number;
        actions: {
          id: string;
          name: string;
          actionType: string;
          numberOfUsers: number;
          numberOfTransactions: number;
        }[];
      }[]
    | [];
};
export async function getDailyAction({
  id,
  chainID,
  contract,
  dapp,
  startTime,
  endTime,
}: {
  id: string;
  chainID?: string;
  contract?: string;
  dapp?: string;
  startTime?: number;
  endTime?: number;
}) {
  const result = await getAPIWithKey<RTDailyAction>(
    baseUrl +
      `/data/${id || "dydx"}/dapp-users/daily-actions?chainId=${chainID || ""}&contract=${
        contract || ""
      }&dapp=${dapp || ""}&startTime=${startTime || ""}&endTime=${endTime || ""}`,
    {}
  );
  return result;
}

export type TDailyTokenItems = {
  timestamp: number;
  actions: {
    idCoingecko: string;
    name: string;
    symbol: string;
    numberOfUsers: number;
    numberOfTransactions: number;
    totalValue: number;
    entity: {
      id: string;
      type: string;
    };
  }[];
};

export type RTDailyToken = {
  inflowActions: TDailyTokenItems[];
  outflowActions: TDailyTokenItems[];
};
export async function getDailyToken({
  id,
  chainID,
  startTime,
  endTime,
}: {
  id: string;
  chainID?: string;
  contract?: string;
  dapp?: string;
  startTime?: number;
  endTime?: number;
}) {
  const result = await getAPIWithKey<RTDailyToken>(
    baseUrl +
      `/data/${id}/dapp-users/daily-tokens?chainId=${chainID || ""}&startTime=${
        startTime || ""
      }&endTime=${endTime || ""}`,
    {}
  );
  return result;
}

//DAPPS ****************************************************************************************************************************************************************************
// export type RTDapps = {
//   dapps: {
//     [id: string]: {
//       id: string;
//       address: string;
//       name: string;
//       project: string;
//       numberOfUsers: number | null | string;
//       verified: number;
//       chainId: string;
//       explorerUrl: string;
//     }[];
//   };
// };

export type RTDapps = {
  chain: string;
  address: string;
  name: string;
  dapp: string;
  tags: string[];
  last30DaysNumberOfUsers: number;
  isContract: boolean;
  dappId: string;
}[];

export async function fetchDapps(id: string = "dydx") {
  const result = await getAuthAPI<{ numberOfDocs: number; docs: RTDapps }>(
    baseUrlCDP + `/${id || "dydx"}/setting/addresses`,
    {}
  );
  return result.docs;
}

//CAMPAIGN *************************************************************************************************************************************************************
export type RTHistoricalReport = {
  [eventName: string]: {
    [timeStamp: string]: number;
  };
};

export async function fetchHistoricalReport(id: string = "trava", events: string[]) {
  const eventsQuery = events
    .map((item) => `events[]=${item}`)
    .join()
    .replaceAll(",", "&");
  const result = await getAPI<RTHistoricalReport>(
    baseUrlMarketplace + `/cdp-services-v2/${id}/historical-reports?${eventsQuery}`,
    {}
  );
  return result;
}

export type RTRetentionData = {
  [date: string]: {
    total: number;
    retention: {
      [monthAfter: string]: number;
    };
  };
};

export async function fetchRetentionData(
  id: string = "trava",
  startEvent: string,
  endEvent: string
) {
  const result = await getAPI<RTRetentionData>(
    baseUrlMarketplace +
      `/cdp-services-v2/${id}/retention?startEvent=${startEvent}&endEvent=${endEvent}`,
    {}
  );
  return result;
}
// export async function fetchRetentionDataV2(id: string = "trava", projects: string[]) {
//   try {
//     const query = projects
//       .map((item) => {
//         return `projects[]=${item}`;
//       })
//       .join()
//       .replaceAll(",", "&");

//     const result = await getAPI<RTRetentionData>(
//       baseUrlMarketplace + `/cdp-services-v2/${id}/retentionv2?${query}`,
//       {}
//     );
//     return result;
//   } catch (error) {
//     throw error;
//   }
// }

export async function fetchRetentionDataV2({
  id,
  projects,
  endTime,
  contract,
  dapp,
  timeRange,
  unitTimeRange,
  timeGap,
}: {
  id: string;
  projects: string[];
  endTime: number;
  contract?: string;
  dapp?: string;
  timeRange: string;
  unitTimeRange: string;
  timeGap: string;
}) {
  const query = projects.join();
  const result = await getAPIWithKey<RTRetentionData>(
    baseUrlStaging +
      `/data/${id}/cdp-users/retention${queryParams({
        endTime,
        contract,
        dapp,
        timeRange,
        unitTimeRange,
        timeGap,
        eventName: query,
      })}`,
    {}
  );
  return result;
}

export type RTFunnelData = {
  [key: string]: number;
};

export async function fetchFunnelData(id: string = "trava", actions: string[] = []) {
  const actionsQuery = actions
    .map((item) => `actions[]=${item}`)
    .join()
    .replaceAll(",", "&");

  const result = await getAPI<RTFunnelData>(
    baseUrlMarketplace + `/cdp-services-v2/${id}/funnel?${actionsQuery}`,
    {}
  );
  return result;
}

export type RTOptions = string[];
export async function fetchOptions(id: string = "trava") {
  const result = await getAPI<RTOptions>(baseUrlMarketplace + `/cdp-services-v2/${id}/options`, {});
  return result;
}

export type RTDailyReport = {
  visitors: number;
  wallets: number;
  topCountry: {
    name: string;
    data: {
      visitor: 94;
      wallet: 1;
    };
  }[];
};

export async function fetchDailyReports({
  id,
  contract,
  dapp,
}: {
  id: string;
  contract?: string;
  dapp?: string;
}) {
  const result = await getAPIWithKey<RTDailyReport>(
    baseUrlStaging +
      `/data/${id}/cdp-users/distribution-by-countries?contract=${contract || ""}&dapp=${
        dapp || ""
      }`,
    {}
  );
  return result;
}

export type RTUserInbounce = {
  wallet: {
    new: number;
    return: number;
  };
  visitor: {
    new: number;
    return: number;
  };
};

// export async function fetchUserInbounce(id: string = "trava") {
//   try {
//     const result = await getAPI<RTUserInbounce>(
//       baseUrlMarketplace + `/cdp-services-v2/${id}/user-inbounce`,
//       {}
//     );
//     return result;
//   } catch (error) {
//     throw error;
//   }
// }

export async function fetchUserInbounce({
  id,
  contract,
  dapp,
  startTime,
  endTime,
}: {
  id: string;
  dapp?: string;
  contract?: string;
  startTime?: number;
  endTime?: number;
}) {
  const result = await getAPIWithKey<RTUserInbounce>(
    baseUrlStaging +
      `/data/${id}/cdp-users/user-inbounce?endTime=${endTime || ""}&startTime=${
        startTime || ""
      }&contract=${contract}&dapp=${dapp}`,
    {}
  );
  return result;
}

export async function fetchCexesUserInbounce({
  id,
  startTime,
  endTime,
}: {
  id: string;
  startTime?: number;
  endTime?: number;
}) {
  const result = await getAPIWithKey<RTUserInbounce>(
    baseUrlStaging +
      `/data/${id}/cdp-users/cex-user-inbounce
?endTime=${endTime || ""}&startTime=${startTime || ""}`,
    {}
  );
  return result;
}

export type RTUserBehavior = {
  journeys: {
    [step: string]: [string, string, number][];
  };
};

export async function fetchUserBehavior(id: string = "trava", startEvent: string = "") {
  const result = await getAPI<RTUserBehavior>(
    baseUrlMarketplace + `/cdp-services-v2/${id}/user-behaviors?startAction=${startEvent}`,
    {}
  );
  return result;
}
//CONTACTS ****************************************************************
export type RTContact = {
  data: [
    {
      id: string;
      address: string;
      balance: {
        [key: string]: number;
      };
      createAt: number;
      name: string;
      tags: string[];
      country?: string;
    }
  ];
  walletNumber: number;
  countryNumber: number;
  segmentNumber: number;
};

export async function fetchContact(id: string = "trava", pagesize: number = 50, page: number = 1) {
  const result = await getAPIWithKey<RTContact>(
    baseUrlMarketplace + `/cdp-services-v2/${id}/contacts?pagesize=${pagesize}&page=${page}`,
    {}
  );
  return result;
}

export type RTRankingLeaderboard = {
  numberOfDocs: number;
  docs: Array<{
    id: string;
    type: string;
    score: number;
    depositInUSD: number;
    borrowInUSD: number;
    holdInUSD: number;
  }>;
};

export async function fetchLeaderboard(id: string) {
  const response = await getAPIWithKey<RTRankingLeaderboard>(
    `${baseUrl}/ranking/leaderboard/${id}`,
    {}
  );
  return response;
}

//SOCIAL ************************************************************************************************
export type RTAudienceOverTime = {
  twitterFollowersChangeLogs: {
    [timeStamp: string]: number;
  };
  telegramMembersChangeLogs: {
    [timeStamp: string]: number;
  };
};

export async function fetchAudienceOverTime(id: string, startTime?: number, endTime?: number) {
  const response = await getAPIWithKey<RTAudienceOverTime>(
    baseUrlStaging +
      `/data/${id}/socials/audience-over-time?startTime=${startTime}&endTime=${endTime}`,
    {}
  );
  return response;
}

export type RTSocialOverview = {
  twitter: {
    followers: number;
    followersChanged: {
      "24h": number;
      "7d": number;
      "30d": number;
    };
    postImpressions: {
      "24h": number;
      "7d": number;
      "30d": number;
    };
    postImpressionsChangeRate: {
      "24h": number;
      "7d": number;
      "30d": number;
    };
  };
  telegram: {
    members: number;
    membersChanged: {
      "24h": number;
      "7d": number;
      "30d": number;
    };
    activeMembers: {
      "24h": number;
      "7d": number;
      "30d": number;
    };
  };
};

export async function fetchSocialOverview(id: string) {
  const response = await getAPIWithKey<RTSocialOverview>(
    baseUrlStaging + `/data/${id}/socials/overview`,
    {}
  );
  return response;
}

export type RTTwitterFollowerLocation = {
  [country: string]: {
    followers: 9897;
    followersChanged: {
      "24h": number;
      "7d": number;
      "30d": number;
    };
  };
};

export async function fetchTwitterFollowerLocation(id: string) {
  const response = await getAPIWithKey<{ location: RTTwitterFollowerLocation }>(
    baseUrlStaging + `/data/${id}/socials/twitter/followers-location`,
    {}
  );
  return Object.fromEntries(
    Object.entries(response.location).map(([k, v]) => [k.toLowerCase(), v])
  );
}

export type RTTwitterFollowerQuality = {
  followersQualityRatio: { Verified: number; Normal: number; Bot: number };
  followersQualityChangeLogs: {
    Verified: {
      [timeStamp: string]: number;
    };
    Normal: {
      [timeStamp: string]: number;
    };
    Bot: {
      [timeStamp: string]: number;
    };
  };
};

export async function fetchTwitterFollowerQuality(
  id: string,
  startTime?: number,
  endTime?: number
) {
  const response = await getAPIWithKey<RTTwitterFollowerQuality>(
    baseUrlStaging +
      `/data/${id}/socials/twitter/followers-quality?startTime=${startTime}&endTime=${endTime}`,
    {}
  );
  return response;
}

export type RTTwitterEnagaementOverTime = {
  projectEngagementRealTime: {
    favouritesCount: number;
    friendsCount: number;
    listedCount: number;
    mediaCount: number;
    followersCount: number;
    statusesCount: number;
  };
  projectEngagementOverTime: {
    favouritesCount: {
      [timeStamp: string]: number;
    };
    friendsCount: {
      [timeStamp: string]: number;
    };
    listedCount: {
      [timeStamp: string]: number;
    };
    mediaCount: {
      [timeStamp: string]: number;
    };
    followersCount: {
      [timeStamp: string]: number;
    };
    statusesCount: {
      [timeStamp: string]: number;
    };
  };
};

export async function fetchTwitterEnagaementOverTime(
  id: string,
  startTime?: number,
  endTime?: number
) {
  const response = await getAPIWithKey<RTTwitterEnagaementOverTime>(
    baseUrlStaging +
      `/data/${id}/socials/twitter/projects-engagement-over-time?startTime=${
        startTime || ""
      }&endTime=${endTime || ""}`,
    {}
  );
  return response;
}
export type RTTwitterMostLikedPosts = {
  mostLikedPosts: [
    {
      url: string;
      views: number;
      likes: number;
      replyCounts: number;
      retweetCounts: number;
      text: string;
    }
  ];
};
export async function fetchTwitterMostLikedPosts(
  id: string,
  startTime?: number,
  endTime?: number,
  limit?: number
) {
  const response = await getAPIWithKey<RTTwitterMostLikedPosts>(
    baseUrlStaging +
      `/data/${id}/socials/twitter/tweets-most-liked-posts?startTime=${startTime || ""}&endTime=${
        endTime || ""
      }&limit=${limit || ""}`,
    {}
  );
  return response;
}

export type RTTwitterMostPopularHastag = {
  mostHashTags: [
    string: {
      views: number;
      likes: number;
      replyCounts: number;
      retweetCounts: number;
    }
  ];
};
export async function fetchTwitterMostPopularHastag(
  id: string,
  startTime?: number,
  endTime?: number,
  limit?: number
) {
  const response = await getAPIWithKey<RTTwitterMostPopularHastag>(
    baseUrlStaging +
      `/data/${id}/socials/twitter/tweets-most-popular-hashtag?startTime=${
        startTime || ""
      }&endTime=${endTime || ""}&limit=${limit || ""}`,
    {}
  );
  return response;
}

export type RTTeleMemInteractionOT = {
  membersChangeLogs: {
    [timestamp: string]: number;
  };
  dailyActiveMembers: {
    [timestamp: string]: number;
  };
  dailyReacts: {
    [timestamp: string]: number;
  };
  dailyViews: {
    [timestamp: string]: number;
  };
  dailyMessages: {
    [timestamp: string]: number;
  };
};

export async function fetchTeleMemInteractionOT(id: string, startTime: number, endTime: number) {
  const response = await getAPIWithKey<RTTeleMemInteractionOT>(
    baseUrlStaging +
      `/data/${id}/socials/telegram/members-interaction-over-time?startTime=${startTime}&endTime=${endTime}`,
    {}
  );
  return response;
}

export type RTTeleTopActiveMem = {
  id: string;
  name: string;
  reacts: number;
  messages: number;
  lastInteractedAt: number;
  url: string;
}[];

export async function fetchTeleTopActiveMem(id: string, startTime?: number, endTime?: number) {
  const response = await getAPIWithKey<{ topActiveMembers: RTTeleTopActiveMem }>(
    baseUrlStaging +
      `/data/${id}/socials/telegram/top-active-members?startTime=${startTime}&endTime=${endTime}`,
    {}
  );
  return response.topActiveMembers || [];
}

export type RTTeleTopTopic = {
  title: string;
  views: number;
  reacts: number;
  messages: number;
  postUrl: string;
  timestamp: number;
}[];

export async function fetchTeleTopTopic(id: string, startTime?: number, endTime?: number) {
  const response = await getAPIWithKey<{ topDiscussedTopic: RTTeleTopTopic }>(
    baseUrlStaging +
      `/data/${id}/socials/telegram/top-discussed-topic?startTime=${startTime}&endTime=${endTime}`,
    {}
  );
  return response.topDiscussedTopic;
}

export type RTTrafficShare = {
  layers: { title: string; users: number; ratio: number }[][];
  flows: { startAction: string; endAction: string; users: number }[][];
};

export async function fetchTrafficShare(
  id: string,
  startTimeSeconds?: number,
  endTimeSeconds?: number
) {
  const response = await getAPIWithKey<RTTrafficShare>(
    baseUrlStaging +
      `/data/${id}/socials/traffic-share${
        startTimeSeconds && endTimeSeconds
          ? `?startTime=${startTimeSeconds}&endTime=${endTimeSeconds}`
          : ""
      }`,
    {}
  );
  return response;
}
