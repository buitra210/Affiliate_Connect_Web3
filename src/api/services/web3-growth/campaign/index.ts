import {
  deleteAuthAPI,
  getAuthAPI,
  postAuthAPI,
  postAuthAPIFile,
} from "@centic-scoring/api/fetchAuthFunctions";
import { baseUrlCDP } from "../../urls";
export type RTCampaignLogin = {
  authenticationUrl: string;
};

export type Auth = {
  id: string;
  name: string;
  url: string;
  avatar: string;
  authenticated: boolean;
};

export type AuthsCampaign = Array<Auth>;

export type RTGetAuthenticateTwitters = {
  twitterAccounts: AuthsCampaign;
};

export type RTGetTwitterAuthenticationUrl = {
  authenticationUrl: string;
};

export async function fetchCampaignLogin(id: string) {
  const response = await getAuthAPI<RTCampaignLogin>(baseUrlCDP + `/${id}/campaigns/login`, {});
  return response;
}

export async function fetchCheckAuthenticateTwitters(id: string) {
  const response = await getAuthAPI<RTGetAuthenticateTwitters>(
    baseUrlCDP + `/${id}/check-authenticate-twitters`,
    {}
  );
  return response;
}

export async function fetchTwitterAuthenticationUrl(callbackUrl: string) {
  const response = await getAuthAPI<RTGetTwitterAuthenticationUrl>(
    baseUrlCDP + `/twitter-authentication-url?callback=${callbackUrl}`,
    {}
  );
  return response;
}

export async function postCampaignDetailLogin(projectId: string, oauthVerifier: string) {
  await postAuthAPI(baseUrlCDP + `/${projectId}/login`, {
    body: JSON.stringify({
      oauthVerifier: oauthVerifier,
    }),
  });
}

export type RTCampaignOverview = {
  cost: number;
  visits: number;
  connectWallets: number;
  transactions: number;
  history: {
    [timeStamp: number]: {
      visit: number;
      user: number;
      connectWallet: number;
      transaction: number;
    };
  };
};

export async function fetchCampaignOverview({
  id,
  endTime,
  startTime,
}: {
  id: string;
  startTime?: number;
  endTime?: number;
}) {
  return await getAuthAPI<RTCampaignOverview>(
    baseUrlCDP +
      `/${id}/campaigns/overview-chart?startTime=${startTime || ""}&endTime=${endTime || ""}`,
    {}
  );
}
export type CreateCampaignInput = {
  setupCampaign: {
    name: string;
    description: string;
    start: number;
    end: number;
    objective?: string | null;
    kpis: {
      goal: string;
      kpi: number;
      contractAddress?: string[];
      url?: string[];
    }[];
  };
  audience: {
    conditions: {
      field: string;
      operator: string;
      value?: number;
    }[];
    activeChains: Array<string>;
    activityTime: number;
  };
};

export type RTCreateCampaign = {
  message: string;
  campaignId: string;
  urls: Array<string>;
};

export async function createCampaign(id: string, input: CreateCampaignInput) {
  const response = await postAuthAPI<RTCreateCampaign>(baseUrlCDP + `/${id}/campaigns`, {
    body: JSON.stringify(input),
  });
  return response;
}

export async function postFiles(files: FileList | undefined) {
  if (!files) {
    return;
  }
  let formData = new FormData();
  for (const f of Array.from(files || [])) {
    formData.append("file[]", f);
  }
  const response = await postAuthAPIFile<RTCreateCampaign>(baseUrlCDP + `/upload-files`, {
    body: formData,
  });
  return response;
}

export type RTGetTokenAirdrop = {
  id: string;
  address: string;
  chainId: string;
  name: string;
  symbol: string;
  imgUrl: string;
}[];

export async function fetchAirDropToken({
  campaignId,
  id,
  chainId,
}: {
  id: string;
  campaignId: string;
  chainId?: string;
}) {
  const response = await getAuthAPI<{ tokens: RTGetTokenAirdrop }>(
    baseUrlCDP +
      `/${id}/campaigns/${campaignId}/airdrops/get-tokens-airdrop?chainId=${chainId || ""}`
  );
  return response.tokens;
}

export type CheckBalanceInput = {
  id: string;
  campaignId: string;
  totalAmount: number;
  token: string;
  distributor: string;
  chainId?: string;
};

export type RTCheckBalance = {
  balance: number;
  enough: boolean;
  requireAmount: number;
};

export async function checkWalletBallance({
  distributor,
  id,
  campaignId,
  token,
  totalAmount,
  chainId,
}: CheckBalanceInput) {
  const response = await getAuthAPI<RTCheckBalance>(
    baseUrlCDP +
      `/${id}/campaigns/${campaignId}/airdrops/check-balance?distributor=${
        distributor || ""
      }&token=${token || ""}&totalAmount=${totalAmount || ""}&chainId=${chainId || ""}`
  );

  return response;
}

export type CheckWalletAllowanceInput = {
  id: string;
  campaignId: string;
  totalAmount: number;
  token: string;
  distributor: string;
};

export type RTCheckAllowance = { allowance: number; requireAmount: number; enough: boolean };

export async function checkWalletAllowance({
  distributor,
  id,
  campaignId,
  token,
  totalAmount,
}: CheckBalanceInput) {
  const response = await getAuthAPI<RTCheckAllowance>(
    baseUrlCDP +
      `/${id}/campaigns/${campaignId}/airdrops/check-allowance?distributor=${
        distributor || ""
      }&token=${token || ""}&totalAmount=${totalAmount || ""}`
  );

  return response;
}

export type PostAirdropInput = {
  id: string;
  campaignId: string;
  totalAmount: number;
  token: string;
  receivers: string;
  file: string;
  rewardBy: string;
  distributor: string;
  numberOfAwards?: number;
  scheduleAt?: number;
  metadata: {
    first: {
      number: number | undefined;
      amount: number | undefined;
    };
    second: {
      number: number | undefined;
      amount: number | undefined;
    };
    third: {
      number: number | undefined;
      amount: number | undefined;
    };
    subdomain?: string;
    type?: string | null;
    sprintId?: string | null | number;
    campaignId?: string | null | number;
    seasonId?: string | null | number;
    questId?: string | null | number;
  };
  send?: boolean;
};

export type RTCreateAirdrop = {};

export async function createAirdrop({
  file,
  metadata,
  receivers,
  rewardBy,
  token,
  totalAmount,
  campaignId,
  id,
  distributor,
  numberOfAwards,
  scheduleAt,
  send,
}: PostAirdropInput) {
  if (totalAmount <= 0) {
    throw new Error("Invalid total amount");
  }
  const response = await postAuthAPI(baseUrlCDP + `/${id}/campaigns/${campaignId}/airdrops`, {
    body: JSON.stringify({
      file,
      metadata,
      receivers,
      rewardBy,
      token,
      totalAmount: Number(totalAmount),
      distributor,
      numberOfAwards,
      scheduleAt,
      send,
    }),
  });
  return response;
}

export type RTFunnel = {
  visits: {
    total: number;
    percent: number;
  };
  users: {
    total: number;
    percent: number;
  };
  connectWallets: {
    total: number;
    percent: number;
  };
  transactions: {
    total: number;
    percent: number;
  };
  impressions: {
    total: number;
    percent: number;
  };
  comment: string;
};

export async function fetchCampaignFunnel(id: string, campaignId: string) {
  const response = await getAuthAPI<RTFunnel>(baseUrlCDP + `/${id}/campaigns/${campaignId}/funnel`);
  return response;
}

export type RTCampaignInfo = {
  spend: number;
  budget: number;
  users: number;
  costPerUser: number;
  visits: number;
  costPerVisit: number;
  connectWallet: number;
  conversion: number;
  objectives: {
    goal: string;
    kpi: number;
    progress: number;
    completionRate: number;
  }[];
  goal: string;
};

export async function fetchCampaignInfo(id: string, campaignId: string) {
  const response = await getAuthAPI<RTCampaignInfo>(
    baseUrlCDP + `/${id}/campaigns/${campaignId}/information`
  );
  return response;
}

export type RTCampaignPerformance = {
  visits: number;
  connectWallets: number;
  transactions: number;
  history: {
    [timeStamp: string]: {
      visit: number;
      user: number;
      connectWallet: number;
      transaction: number;
    };
  };
  comment: string;
};

export async function fetchCampaignPerformance({
  campaignId,
  id,
  endTime,
  startTime,
}: {
  id: string;
  campaignId: string;
  startTime?: number;
  endTime?: number;
}) {
  const response = await getAuthAPI<RTCampaignPerformance>(
    baseUrlCDP +
      `/${id}/campaigns/${campaignId}/performance?startTime=${startTime || ""}&endTime=${
        endTime || ""
      }`
  );
  return response;
}

export type TaskOnActionType =
  | "Space Campaign"
  | "Space Leaderboard"
  | "Campaign Winners"
  | "Community Sprint"
  | "Community Quest Category"
  | "Community Leaderboard"
  | "Sprint Winners";

export type QuestNActionType =
  | "Quest"
  | "Survey"
  | "Quest Collection"
  | "Leaderboard"
  | "Airdrop"
  | "Questers";

export type ZealyActionType = "Quest Category" | "Sprint" | "Leaderboard";
export type RTCampaignActionList = {
  type: "post" | "message" | "airdrop" | ZealyActionType | TaskOnActionType | QuestNActionType;
  timestamp: number;
  postId?: string;
  campaignId: string;
  userId: string;
  account?: {
    id: string;
    name: string;
    avatar: string;
    url: string;
  };
  platform: string;
  content?: string;
  medias?: string[];
  url?: string;
  isPosted?: boolean;
  scheduleAt?: number;
  createdAt: number;
  updatedAt: number;
  messageId?: string;
  serverId?: string;
  serverName?: string;
  channelId?: string;
  channelName?: string;
  isSend?: true;
  sendAt?: number;
  airdropId: string;
  file?: string;
  metadata?: null;
  receivers?: string;
  reward?: {
    address: string;
    amount: number;
  }[];
  rewardBy?: string;
  token?: {
    id: string;
    address: string;
    name: string;
    symbol: string;
    imgUrl: string;
  };
  totalAmount?: number;
  views: number;
  likes: number;
  //zealy
  communityId?: string;
  communityName?: string;
  avatar?: string;
  description?: string;
  sprintName?: string;
  start?: number;
  end?: number;
  numberOfUsers: number;
  numberOfQuests: number;
  numberOfTwitters: number;
  numberOfDiscords: number;
  totalClaimedQuests?: number;
  //taskon
  id?: string;
  spaceName?: string;
  campaignName?: string;
  spaceCampaignName?: string;
  transactions: {
    hash: string;
    success: boolean;
    url: string;
  }[];
  numberOfAudiences?: number;
  totalParticipants?: number;
  status: "pending" | "success" | "failure";
  sprintId?: string;
  spaceId?: number;
  spaceCampaignId?: string;
  totalQuests?: number;
  totalWinners?: number;
  totalAddresses?: number;
  categoryName?: string;
  categoryId?: number;
  //questN
  questId: string;
  questType: string;
  title: string;
  growthParticipants?: number;
  totalTasks?: number;
}[];

export type RTDEleteTwitterAction = {};
export async function deleteTwitterAction({
  postId,
  campaignId,
  id,
}: {
  id: string;
  campaignId: string;
  postId: string;
}) {
  return await deleteAuthAPI<RTDEleteTwitterAction>(
    baseUrlCDP + `/${id}/campaigns/${campaignId}/twitters/${postId}`
  );
}

export type RTTwitterAction = {
  postId: string;
  accountId: string;
  campaignId: string;
  content: string;
  replies: {
    content: string;
    medias: string[];
    actualId: string;
    url: string;
    isPosted: boolean;
    status: string;
  }[];
  createdAt: number;
  isPosted: boolean;
  medias: string[];
  platform: string;
  projectId: string;
  scheduleAt: number;
  send: boolean;
  type: string;
  updatedAt: number;
  userId: string;
  account: {
    id: string;
    name: string;
    avatar: string;
    url: string;
  };
  url?: string;
  status: "failure" | "success" | "pending";
};

export async function fetchTwitterAction({
  campaignId,
  id,
  postId,
}: {
  id: string;
  campaignId: string;
  postId: string;
}) {
  return getAuthAPI<RTTwitterAction>(
    baseUrlCDP + `/${id}/campaigns/${campaignId}/twitters/${postId}`
  );
}

// SESSION ****************************************************************
export type RTReportSession = {
  sessions: number;
  sessionPerUser: number;
  userEngagementSecond: number;
  userEngagementDetail: {
    page: string;
    sessionNumber: number;
    timeEngagementSecond: number;
  }[];
  channels: {
    [key: string]: {
      sessionCount: number;
      ratio: number;
    };
  };
  sessionHistory: {
    [timeStamp: number]: number;
  };
  comment: string;
};

export async function fetchReportSession({ campaignId, id }: { campaignId: string; id: string }) {
  return await getAuthAPI<RTReportSession>(baseUrlCDP + `/${id}/campaigns/${campaignId}/session`);
}

// SOCIAL MEDIA *************************************************************
export type RTReportSocialMedia = {
  twitter: {
    totalFollowers: number;
    growthFollowers: number;
    twitterGrowthFollowerHistory: {
      [timeStamp: number]: number;
    };
  };
  comment: string;
};
export async function fetchReportSocialMedia({
  campaignId,
  id,
}: {
  id: string;
  campaignId: string;
}) {
  return getAuthAPI<RTReportSocialMedia>(
    baseUrlCDP + `/${id}/campaigns/${campaignId}/social-media`
  );
}

export type RTReportSocialMediaTwitter = {
  totalFollowers: number;
  growthFollowers: number;
  views: number;
  likes: number;
  retweets: number;
  followerHistory: {
    [timeStamp: number]: {
      totalFollowers: number;
    };
  };
  tweets: {
    postId: string;
    text: string;
    views: number;
    likes: number;
    retweets: number;
    url: string;
  }[];
  comment: string;
};
