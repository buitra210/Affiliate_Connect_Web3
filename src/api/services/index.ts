import { GIEntityType, GIMethods, GIScoreModel, ScoreFormula, ScoreType } from "../api";
import { getAuthAPI, postAuthAPI, putAuthAPI } from "../fetchAuthFunctions";
import { getAPI, getAPIWithKey, postAPI, postAPIWithKey } from "../fetchFunctions";
import { ModelDetail } from "@centic-scoring/context/score-context";
import { baseUrlCDP, baseUrlMarketplace, baseUrl as baseUrlPortfolio } from "./urls";

const baseUrl = baseUrlMarketplace;
/**
 * AUTH MANAGEMENT
 */
//check username
type CheckUserInfoReturnType = {
  valid: boolean;
  message: string;
};
export async function checkUsername(userName: string) {
  const res = await getAPI<CheckUserInfoReturnType>(
    baseUrl + "/centic/auth/checkUsername?userName=" + userName,
    {}
  );
  return res;
}
export async function checkEmail(email: string) {
  const res = await getAPI<CheckUserInfoReturnType>(
    baseUrl + "/centic/auth/checkEmail?email=" + email,
    {}
  );
  return res;
}

//login
type LoginReturnType = {
  success: boolean;
  jwt: string;
};

export async function centicLogin({
  userName,
  password,
}: {
  userName: string;
  password: string;
}): Promise<LoginReturnType> {
  return await postAPI<LoginReturnType>(baseUrl + "/centic/auth/login", {
    body: JSON.stringify({
      userName: userName,
      password: password,
    }),
  });
}
//register
export async function centicRegister({
  userName,
  password,
  email,
  organization,
  organizationType,
  userPurpose,
}: {
  userName: string;
  password: string;
  email: string;
  organization: string;
  organizationType: string;
  userPurpose: string;
}) {
  const res = await postAPI(baseUrl + "/centic/auth/register", {
    body: JSON.stringify({
      userName: userName,
      password: password,
      email,
      organization,
      organizationType,
      userPurpose,
    }),
  });

  return res;
}
//verify token
type VerifyTokenReturnType = {
  valid: boolean;
};
export async function verifyToken(): Promise<VerifyTokenReturnType> {
  return await getAuthAPI<VerifyTokenReturnType>(baseUrl + "/centic/auth/verifyToken", {});
}

//get portfolio token

export type ApiLoginResponse = {
  apiKey: string;
  expiresAt: number | null;
  issuedAt: number | null;
  plan: string;
  status: "approved" | "invoked";
};

type LoginParams = {
  address: string;
  nonce: number;
  signature: string;
};

export async function loginPortfolio({ address, nonce, signature }: LoginParams) {
  return await postAPIWithKey<ApiLoginResponse>(baseUrlPortfolio + "/auth/login", {
    body: JSON.stringify({
      address,
      nonce,
      signature,
    }),
  });
}

//get displayname
type GetNameReturnType = {
  userName: string;
  verified: boolean;
};
export async function getName(): Promise<GetNameReturnType> {
  const res = await getAuthAPI<GetNameReturnType>(baseUrl + "/user/getUsername", {});
  return res;
}
/**
 * SCORE MANAGEMENT **************************************************************************************************************************************************************************
 */
//get all score
export type AllScoreReturnType = Array<{
  name: string;
  id: string;
  authorId: string;
  authorName: string;
  scoreType: string;
  scoreAvatar: string;
  centicVerified: boolean;
}>;
export async function getAllMarketScore(): Promise<AllScoreReturnType> {
  const allScore = await getAPI<AllScoreReturnType>(baseUrl + "/centic/services/getAllScore", {});
  return allScore;
}
//get your creations
export type YourCreationsReturnType = Array<{
  name: string;
  id: string;
  authorId: string;
  authorName: string;
  scoreType: string;
  scoreAvatar: string;
  isPublic: boolean;
}>;
export async function getAllUserScore(): Promise<YourCreationsReturnType> {
  const allUserScore = await getAuthAPI<YourCreationsReturnType>(
    baseUrl + "/centic/services/yourCreation",
    {}
  );
  return allUserScore;
}
//get score detail
export type ScoreDetailReturnType = {
  scoreName: string;
  scoreId: string;
  scoreType: ScoreType | undefined;
  scoreFormula: ScoreFormula | undefined;
  entityType: GIEntityType | undefined;
  method: GIMethods | undefined;
  model: GIScoreModel | undefined;
  modelDetail: ModelDetail;
  authorId: string;
  authorName: string;
  numForked: number;
  star: Array<any>;
  description: string;
  isPublic: boolean;
  scoreAvatar: string;
};

export async function getScoreDetail(scoreId: string): Promise<ScoreDetailReturnType> {
  const res = await getAPI<ScoreDetailReturnType>(
    baseUrl +
      "/centic/services/scoreDetail?" +
      new URLSearchParams({
        scoreId: scoreId,
      }).toString(),
    {}
  );
  return res;
}

export async function getUserScoreDetail(scoreId: string): Promise<ScoreDetailReturnType> {
  const res = await getAuthAPI<ScoreDetailReturnType>(
    baseUrl +
      "/centic/services/userScoreDetail?" +
      new URLSearchParams({
        scoreId: scoreId,
      }).toString(),
    {}
  );
  return res;
}
//playground calculate score
export type ScoreCardReturnType = {
  score: number;
  rank: number;
  scoreBreakdown: {
    assets?: number;
    transactions?: number;
    loan?: number;
    circulatingAssets?: number;
    trustworthinessAssets?: number;
    marketCap?: number;
    priceOverHighest?: number;
    tradingVolume?: number;
    holders?: number;
    holderDistribution?: number;
    priceStability?: number;
    dappInteractions?: number;
    liquidation?: number;
  };
  entityId: string;
};
export type PageRankReturnType = {
  address: string;
  chainId: string;
  score: number;
  type: string;
  cashIn?: number;
  cashOut?: number;
  incomingTransactions?: number;
  outgoingTransactions?: number;
};
export type PlaygroundReturnType = ScoreCardReturnType | PageRankReturnType;
export async function calculateScorePlayground(
  scoreId: string,
  entityAddress: string,
  apiKey: string
) {
  const res = await getAPI<PlaygroundReturnType>(
    baseUrl + `/centic-services/playground/calculateScore/${entityAddress}?scoreId=${scoreId}`,
    {
      headers: {
        "x-apikey": apiKey,
      },
    }
  );
  return res;
}
//score distribution
//Wallet score
export type ParamsScoreDisReturnType = {
  numberOfSamples: number;
  params: Array<Array<number>>;
};
export async function getWalletScoreParam(
  numberOfSamples: number,
  batchIndex: number
): Promise<ParamsScoreDisReturnType> {
  const res = (
    await getAPI<{ data: ParamsScoreDisReturnType }>(
      "https://api-scoring.centic.io/credit-score/dev/credit-score-samples?" +
        new URLSearchParams({
          numberOfSamples: numberOfSamples.toString(),
          batchIndex: batchIndex.toString(),
        }).toString(),
      {}
    )
  ).data;
  return res;
}
//Toke Score
export async function getTokenScorParams(): Promise<ParamsScoreDisReturnType> {
  const res = await getAPI<ParamsScoreDisReturnType>(
    "https://scoringapi.trava.finance/token-health/v1/dev/token-health-samples",
    {}
  );
  return res;
}
//add to creation
export type AddScoreReturnType = {
  success: boolean;
};
export async function addToYourCreation(scoreId: string): Promise<AddScoreReturnType> {
  const res = await postAuthAPI<AddScoreReturnType>(baseUrl + "/centic/services/forkScore", {
    body: JSON.stringify({
      scoreId: scoreId,
    }),
  });
  return res;
}
//edit score
export type EditScoreReturnType = {};
export async function editScore(
  scoreId: string | undefined,
  {
    scoreName,
    description,
    isPublic,
    scoreAvatar,
    entityType,
    method,
    model,
    modelDetail,
  }: {
    scoreName?: string;
    entityType?: GIEntityType;
    model?: GIScoreModel;
    method?: GIMethods;
    modelDetail?: ModelDetail;
    description?: string;
    isPublic?: boolean;
    scoreAvatar?: string;
  }
) {
  if (!scoreId) {
    throw Error("Invalid score");
  }

  const res = await postAuthAPI(baseUrl + "/centic/services/editScore/" + scoreId, {
    body: JSON.stringify({
      scoreName,
      description,
      isPublic,
      scoreAvatar,
      entityType,
      method,
      model,
      modelDetail,
    }),
  });
  return res;
}
//new score
export type NewScoreReturnType = { scoreId: string };
export async function newScore({
  scoreName,
  description,
  isPublic,
  scoreAvatar,
  entityType,
  method,
  model,
  modelDetail,
}: {
  scoreName: string;
  entityType: GIEntityType;
  model: GIScoreModel;
  method: GIMethods;
  modelDetail: ModelDetail;
  description: string;
  isPublic: boolean;
  scoreAvatar?: string;
}) {
  const res = await postAuthAPI<NewScoreReturnType>(baseUrl + "/centic/services/newScore", {
    body: JSON.stringify({
      scoreName,
      description,
      isPublic,
      scoreAvatar,
      entityType,
      method,
      model,
      modelDetail,
    }),
  });
  return res;
}
//delete Score
export type DeleteScoreReturnType = { success: boolean };
export async function deleteScore(scoreId: string) {
  const res = await postAuthAPI<DeleteScoreReturnType>(
    baseUrl + "/centic/services/deleteScore/" + scoreId,
    {}
  );
  return res;
}
//score ranking
export type RankingItemType = {
  address?: string;
  score: number;
  id?: string;
  name?: string;
};
export type RankingData = {
  // eslint-disable-next-line no-unused-vars
  [key in GIEntityType]: RankingItemType[];
};
export type ScoreRankingReturnType = {
  data: RankingData & { _id?: string };
  type: ScoreType;
  maxScore?: number;
};
export async function getScoreRanking(scoreId: string) {
  let res = await getAPI<ScoreRankingReturnType>(
    baseUrl + `/centic/services/scoreRanking/${scoreId}`,
    {}
  );
  try {
    delete res.data._id;
  } catch (error) {
    //pass
  }
  return res;
}
export async function getScoreRankingv2(scoreId: string) {
  const res = await getAPI<ScoreRankingReturnType>(
    baseUrl + `/centic/services/scoreRanking/${scoreId}`,
    {}
  );
  return res;
}
export type RTPageRankDis = {
  categories: string[];
  values: number[];
  info: string;
};
export async function getPageRankistribution(
  scoreId: string | undefined,
  entityType: GIEntityType = "All"
) {
  const res = getAPI<RTPageRankDis>(
    baseUrl + `/centic/services/pageRankDistribution?scoreId=${scoreId}&entityType=${entityType}`,
    {}
  );
  return res;
}
export type NodeType = {
  address: string;
  chainId: string;
  score: number;
  type: string;
  cashIn: number;
  cashOut: number;
  incomingTransactions: number;
  outgoingTransactions: number;
  id?: string;
  name?: string;
  val?: number;
  color?: string;
};
export type LinkType = {
  chainId?: string;
  fromAddress?: string;
  toAddress?: string;
  value?: number;
  source?: string;
  target?: string;
};
type RTGraph = {
  nodes: NodeType[];
  links: LinkType[];
};
export async function getPageRankGraphData(numberOfWallet: number) {
  const result = await getAPI<RTGraph>(
    baseUrl + `/centic/services/pageRankGraph?numberOfEntity=${numberOfWallet}`,
    {}
  );
  return result;
}

export type RTCreditScoreDistribution = { category: string[]; values: number[] };
export async function getCreditScoreDistribution() {
  const result = await getAPI<RTCreditScoreDistribution>(
    baseUrl + `/centic/services/getCreditScoreDistribution`,
    {}
  );
  return result;
}
//**************************************************************************************************************************************************************************
/**
 * API KEY MANAGEMENT **************************************************************************************************************************************************************************
 */
//get all api key
export type ApiKeyReturnType = {
  key_id: string;
  name: string;
  condition: number;
  operator: number;
  createDate: number;
  status: string;
  scoreId: string;
}[];
export async function getAllApiKey(scoreId?: string): Promise<ApiKeyReturnType> {
  const res = await getAuthAPI<ApiKeyReturnType>(
    baseUrl +
      "/centic/services/getAllKey?" +
      new URLSearchParams(
        scoreId
          ? {
              scoreId: scoreId,
            }
          : {}
      ).toString(),
    {}
  );
  return res;
}
//create key
export type CreateKeyReturnType = {
  success: boolean;
};
export async function createApiKey({
  operator = 0,
  condition,
  keyName,
  scoreId,
}: {
  operator?: number;
  condition: number;
  keyName: string;
  scoreId: string;
}): Promise<CreateKeyReturnType> {
  const res = await postAuthAPI<CreateKeyReturnType>(baseUrl + "/centic/services/createKey", {
    body: JSON.stringify({
      operator,
      condition,
      keyName,
      scoreId,
    }),
  });
  return res;
}
//get key
export type RTGetAPIKey = {
  apiKey: string;
};
export async function fetchApiKey(): Promise<RTGetAPIKey> {
  const res = await getAuthAPI<RTGetAPIKey>(baseUrl + "/centic/gateway/getAPIKey", {});
  return res;
}
//refreshKey
export type RTRefreshAPIKey = {
  apikey: string;
};
export async function refreshAPIKey() {
  const res = await postAuthAPI<RTRefreshAPIKey>(baseUrl + "/centic/gateway/refreshApiKey", {});
  return res;
}
//edit key
export type EditKeyReturnType = {};
export async function editApiKey({
  keyId,
  condition,
  operator,
}: {
  keyId: string;
  condition: number;
  operator: number;
}) {
  try {
    await postAuthAPI(baseUrl + "/centic/services/editKey", {
      body: JSON.stringify({
        keyId,
        condition,
        operator,
      }),
    });
  } catch (error) {
    //pass
  }
}
//revoke key
export async function revokeKey(keyId: string) {
  await postAuthAPI(baseUrl + "/centic/services/revokeKey", {
    body: JSON.stringify({
      key_id: keyId,
    }),
  });
}
//**************************************************************************************************************************************************************************
/**
 * PROFILE MANAGEMENT **************************************************************************************************************************************************************************
 */
//get profile
export type ProfileReturnType = {
  userName: string;
  userId: string;
  displayName: string;
  about: string;
  avatar: string;
  socials: {
    name: string;
    url: string;
  }[];
  createDate: Date;
};
export async function getUserProfile(userId: string): Promise<ProfileReturnType> {
  if (!userId) {
    return {} as ProfileReturnType;
  }

  const res = await getAPI<ProfileReturnType>(baseUrl + `/user/profile/${userId}`, {});
  return res;
}
//get your profile
export type SocialsType = "facebook" | "discord" | "twitter" | "linkedIn" | "telegram" | "github";
export type Socials = {
  // eslint-disable-next-line no-unused-vars
  [k in SocialsType]: string;
};
export type YourProfileReturnType = {
  userName: string;
  userId: string;
  displayName: string;
  about: string;
  avatar: string;
  socials: Socials;
  createDate: Date;
  editable: boolean;
  email: string;
};
export async function getYourProfile(): Promise<YourProfileReturnType> {
  const res = await getAuthAPI<YourProfileReturnType>(baseUrl + `/user/yourProfile`, {});
  return res;
}
//edit user profile
export type EditProfileReturnType = { success: boolean };
export async function editUserProfile(body: {
  displayName: string;
  about: string;
  socials: Socials;
  avatarImage?: string;
  email?: string;
}): Promise<EditProfileReturnType> {
  const res = await postAuthAPI<EditProfileReturnType>(baseUrl + "/user/updateProfile", {
    body: JSON.stringify(body),
  });
  return res;
}
//dashboard
export type RTQuota = {
  totalQuota: number;
  usedQuota: number;
  availableQuota: number;
  currentPlan: string;
};
export async function fetchQuota() {
  const result = await getAuthAPI<RTQuota>(baseUrl + "/dashboard/currentQuota", {});
  return result;
}

export type RequestTrafficReturnType = Array<{
  value: number;
  timestamp: number;
}>;

export async function getRequestTraffic({
  start,
  end,
}: {
  start: number;
  end: number;
}): Promise<RequestTrafficReturnType> {
  const res = await getAuthAPI<RequestTrafficReturnType>(
    baseUrl + `/dashboard/requestTraffic?start=${start}&end=${end}`,
    {}
  );
  return res;
}

export type RequestCountReturnType = {
  data: { numberOfRequest: number; timeStamp: string }[];
};

export async function getRequestCount(): Promise<RequestCountReturnType> {
  const res = await getAuthAPI<RequestCountReturnType>(baseUrl + `/dashboard/requestCount `, {});
  return res;
}

export type MonthCostReturnType = {
  currentCost: number;
  estimateCost: number;
  costBreakdown: {
    [key: string]: {
      requests: number;
      keyName: string;
    };
  };
};

export async function getMonthCost(): Promise<MonthCostReturnType> {
  const res = await getAuthAPI<MonthCostReturnType>(baseUrl + "/dashboard/monthCost", {});
  return res;
}

export type RTImportedProject = {
  projects: {
    id: string;
    name: string;
    imgUrl: string;
    category: string;
  }[];
};

export async function fetchImportedProjects() {
  return await getAuthAPI<RTImportedProject>(baseUrlCDP + "/list-imported-projects");
}

export type RTImportedData = {
  projectId: string;
  name: string;
  description: string;
  imgUrl: string;
  category: string;
  settings: {
    dapps: {
      id: string;
      chains: string[];
      name: string;
      description: string;
    }[];
    addresses: {
      address: string;
      name: string;
      dapp: string;
      chainId: string;
      isContract: boolean;
      tags: string[];
    }[];
    socialMedia: {
      platform: string;
      id: string;
      name: null;
      url: string;
      avatar: null;
    }[];
    website: string;
  };
};

export async function fetchImportedDetail(id: string) {
  return await getAuthAPI<RTImportedData>(baseUrlCDP + `/imported-project?importedFrom=${id}`);
}

export type RTImportProject = {};
export async function handleImportProject(input: {
  name: string;
  id: string;
  importedFrom: string;
  imgUrl: string;
  description: string;
  visible: "private" | "public";
  category: string;
}) {
  return await postAuthAPI<RTImportProject>(baseUrlCDP + `/import`, {
    body: JSON.stringify(input),
  });
}

export type RTCreateProject = {};
export async function createProject(input: {
  name: string;
  id: string;
  imgUrl: string;
  description: string;
  visible: "private" | "public";
  category: string;
}) {
  return await postAuthAPI<RTCreateProject>(baseUrlCDP + `/create`, {
    body: JSON.stringify(input),
  });
}

export type RTProjectData = {
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
    [platform: string]: string;
  };
  importedFrom: string;
};

export async function fetchProjectData(id: string) {
  return await getAuthAPI<RTProjectData>(baseUrlCDP + `/${id}`);
}

export type RTEditProject = {};

export async function editProjectData({
  id,
  name,
  imgUrl,
  description,
  visible,
  category,
}: {
  id: string;
  name?: string;
  imgUrl?: string;
  description?: string;
  visible?: string;
  category?: string;
}) {
  return await putAuthAPI<RTProjectData>(baseUrlCDP + `/${id}`, {
    body: JSON.stringify({
      name,
      imgUrl,
      description,
      visible,
      category,
    }),
  });
}

//**************************************************************************************************************************************************************************
// UTILS *******************************************************************************************************************************************************************
export type RTGetEchoSystemItem = {
  id: string;
  name: string;
  imgUrl: string;
  chains?: string[];
};
export type RTGetEchoSystem = {
  numberOfDocs: number;
  docs: RTGetEchoSystemItem[];
};
export async function getEchoSystem(pageSize?: number) {
  const result = (
    await getAPI<RTGetEchoSystem>(
      `https://api-staging.centic.io/dev/v3/ranking/defi?pageSize=${pageSize || 100}`,
      {}
    )
  ).docs;
  return result;
}
export async function getScoreOwnerShip(scoreId: string) {
  const res = getAuthAPI<boolean>(
    baseUrl + `/centic/services/scoreOwnership?scoreId=${scoreId}`,
    {}
  );
  return res;
}

export type RTProjectList = {
  id: string;
  name: string;
  visible: "public";
  createdBy: string;
  createdById: string;
  imgUrl: string;
  category: string;
  description: string;
  verified: true;
  userRole: string;
}[];

export async function fetchProjectId() {
  return (await getAuthAPI<{ projects: RTProjectList }>(baseUrlCDP + `/allowed`)).projects;
}

export type RTPermission = string[];

export async function fetchUserPermission(id: string) {
  return (
    await getAuthAPI<{ permissions: RTPermission }>(
      baseUrlCDP + `/permissions?projectId=${id || ""}`
    )
  ).permissions;
}

//HOME PAGE *********************************************************************************************************************************************
export type RTHomeProject = {
  numberOfDocs: number;
  docs: {
    id: string;
    name: string;
    imgUrl: string;
    category: string;
    tvl: number;
    tvlChangeRate: number;
    numberOfUsers: number;
    dailyUsersChange: number;
    maximumAPY: number;
  }[];
  categories: string[];
};

export async function fetchHomeProject({
  category,
  page,
  pageSize,
  orderBy,
  order,
}: {
  category?: string;
  page?: number;
  pageSize?: number;
  orderBy?: string;
  order?: "asc" | "desc";
}) {
  return await getAPIWithKey<RTHomeProject>(
    baseUrlPortfolio +
      `/data/projects?${category ? `category=${category}` : ""}${
        page ? `&page=${page}` : ""
      }&pageSize=${pageSize || ""}&orderBy=${orderBy || ""}&order=${order || ""}`,
    {}
  );
}

export async function fetchEcosystems({
  category,
  page,
  pageSize,
  orderBy,
  order,
  type,
}: {
  category?: string;
  page?: number;
  pageSize?: number;
  orderBy?: string;
  order?: "asc" | "desc";
  type: "defi" | "exchanges" | "nfts" | "tokens";
}) {
  return await getAPIWithKey<RTHomeProject>(
    baseUrlPortfolio +
      `/ecosystems/${type}?${category ? `category=${category}` : ""}${
        page ? `&page=${page}` : ""
      }&pageSize=${pageSize || ""}&orderBy=${orderBy || ""}&order=${order || ""}`,
    {}
  );
}

export type RTHomeTokenRanking = {
  numberOfDocs: number;
  docs: {
    id: string;
    type: string;
    name: string;
    imgUrl: string;
    symbol: string;
    marketCap: number;
    tradingVolume: number;
    price: number;
    tokenHealth: number;
    tradingVolumeChangeRate: number;
    marketCapChangeRate: number;
    priceChangeRate: number;
  }[];
};

export async function fetchHomeTokenRanking() {
  return await getAPIWithKey<RTHomeTokenRanking>(baseUrlPortfolio + "/ranking/tokens", {});
}

export type RTHomeLendingRanking = {
  numberOfDocs: number;
  docs: {
    id: string;
    type: string;
    projectType: string;
    name: string;
    imgUrl: string;
    chains: Array<string>;
    tvl: number;
    category: string;
    tvlChangeRate: number;
    totalUsers: number | null;
    totalAssets: number;
    totalAssetsChangeRate: number;
  }[];
};

export async function fetchHomeLendingRanking() {
  return await getAPIWithKey<RTHomeLendingRanking>(
    baseUrlPortfolio + "/ranking/defi?category=Lending",
    {}
  );
}

export type RTTrendingTokens = {
  tokens: {
    id: string;
    name: string;
    type: string;
    symbol: string;
    imgUrl: string;
    tokenHealth: null | number;
    marketCap: number;
    marketCapChangeRate: number;
    tradingVolume: number;
    tradingVolumeChangeRate: number;
    price: number;
    priceChangeRate: number;
  }[];
};

export async function fetchTrendingTokens() {
  return await getAPIWithKey<RTTrendingTokens>(baseUrlPortfolio + "/recommend/trending/assets", {});
}

export type RTUserEmail = {
  email: string;
};

export async function confirmUserEmail() {
  return await postAuthAPI<RTUserEmail>(baseUrlMarketplace + "/centic/auth/verifyEmail", {});
}

export type RTEmailAction = {
  message: string;
  action: string;
  data?: {
    jwt?: string;
  };
};

export async function emailAction(token: string) {
  return await postAuthAPI<RTEmailAction>(baseUrlMarketplace + "/centic/auth/emailAction", {
    body: JSON.stringify({
      token: token,
    }),
  });
}

export async function changePasswordAction({
  oldPassword,
  newPassword,
}: {
  oldPassword: string;
  newPassword: string;
}) {
  return await postAuthAPI(baseUrlMarketplace + "/centic/auth/changePassword", {
    body: JSON.stringify({
      oldPassword: oldPassword,
      newPassword: newPassword,
    }),
  });
}

export type RTGetTwitterLoginURL = {
  url: string;
  tokenSecret: string;
};

export async function getTwitterLoginURL() {
  return await getAPI<RTGetTwitterLoginURL>(
    baseUrlMarketplace + "/centic/auth/get-twitter-login-url",
    {}
  );
}

export type RTLogInWithTwitter = {
  userId: string;
  jwt: string;
  error: any;
};

export async function loginWithTwitter({
  oauthToken,
  oauthVerifier,
  tokenSecret,
}: {
  oauthToken: string;
  oauthVerifier: string;
  tokenSecret: string;
}) {
  return await postAPI<RTLogInWithTwitter>(baseUrlMarketplace + "/centic/auth/login-with-twitter", {
    body: JSON.stringify({
      oauthToken,
      oauthVerifier,
      tokenSecret,
    }),
  });
}

export type RTProjectConfig = {
  id: string;
  name: string;
  description: string;
  type: string;
  category: string;
  imgUrl: string;
  chains: string[];
  dapps: {
    id: string;
    name: string;
    chains: string[];
    imgUrl: string;
    type: string;
    projectType: string;
  }[];
  tokens: {
    id: string;
    name: string;
    symbol: string;
    chains: string[];
    imgUrl: string;
    type: string;
  }[];
  socialAccounts: {
    website: string;
    twitter: string;
    telegram: string;
  };
  web3GrowthData?: boolean;
};

export async function fetchProjectConfig(id: string) {
  return await getAPIWithKey<RTProjectConfig>(baseUrlPortfolio + `/data/${id}/configs`);
}
