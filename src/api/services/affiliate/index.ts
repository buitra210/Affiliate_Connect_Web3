import { AFFILIATE_API } from "@centic-scoring/api/fetchFunctions";
import { queryParams } from "@centic-scoring/api/ultils";
import { TKOLsSlice } from "@centic-scoring/redux/slices/kols";
import { String } from "lodash";

export type RTKolsListItems = {
  userId: string;
  name: string;
  userName: string;
  avatar: string;
  followers: number;
  language: string;
  status: string;
  averageEngagement: {
    likes: number;
    replies: number;
    retweets: number;
    views: number;
  };
  topic: string[];
  purpose: string[];
  favored: boolean;
  keyword?: string;
};

export const fetchKolLists = async (id: string) => {
  return await AFFILIATE_API.get<RTKolsListItems[]>(`/${id}/kols`);
};

export const searchKolLists = async (id: string, filter?: TKOLsSlice["kolsFilter"]) => {
  return await AFFILIATE_API.get<{ numberOfDocs: number; data: RTKolsListItems[] }>(
    `/${id}/affiliate/kols/search`,
    filter
  );
};

export const searchKolWatchLists = async (id: string, filter?: TKOLsSlice["kolsFilter"]) => {
  return await AFFILIATE_API.get<{ numberOfDocs: number; data: RTKolsListItems[] }>(
    `/${id}/affiliate/kols/favorite`,
    filter
  );
};

export const recommendationKolList = async (id: string, filter?: TKOLsSlice["kolsFilter"]) => {
  return await AFFILIATE_API.post<{ numberOfDocs: number; data: RTKolsListItems[] }>(
    `/${id}/affiliate/kols/recommendation${queryParams(filter)}`,
    {}
  );
};

export type RTKolInfo = {
  displayName: string;
  url: string;
  blue: boolean;
  userName: string;
  followersCount: number;
  created: string;
  timestamp: number;
  rawDescription: string;
  profileImageUrl: string;
  profileBannerUrl: string;
  favored: boolean;
};

export const fetchKolInfo = async (id: string, userName: string) => {
  return await AFFILIATE_API.get<RTKolInfo>(`/${id}/affiliate/kols/kol-dashboard/${userName}`);
};

export type RTKolCollaboration = {
  project: string;
  projectName: string;
  numberOfMentions: number;
  twitterUserName: string;
  url: string;
  profileImageUrl: string;
}[];

export type TypeFilter = "Daily" | "Weekly" | "Monthly";

export const fetchKolCollaboration = async (
  id: string,
  userName: string,
  typeFilter?: TypeFilter
) => {
  return await AFFILIATE_API.get<RTKolCollaboration>(
    `/${id}/affiliate/kols/kol-dashboard/${userName}/collaboration/mentioned-projects?type_filter=${typeFilter}`
  );
};

export type RTKolEngagementAnalysis = {
  typeFilter: string;
  engagementRate: number;
  engagementAvg: number;
  viewRate: number;
  viewAvg: number;
  engagementChangeLogs: {
    [timestamp: string]: {
      likes: number;
      replies: number;
      retweets: number;
    };
  };
  viewChangeLogs: {
    [timestamp: string]: number;
  };
};

export const fetchKolEngagementAnalysis = async (
  id: string,
  userName: string,
  type_filter: string
) => {
  return await AFFILIATE_API.get<RTKolEngagementAnalysis>(
    `/${id}/affiliate/kols/kol-dashboard/${userName}/engagement/engagement-analysis?type_filter=${type_filter}`
  );
};
export type RTKolHashTag = {
  keyWords: {
    keyWord: string;
    usageCount: number;
  }[];
  hashTags: {
    hashTag: string;
    usageCount: number;
    engagementRate: number;
  }[];
};

export const fetchKolHashTag = async (id: string, userName: string, typeFilter?: TypeFilter) => {
  return await AFFILIATE_API.get<RTKolHashTag>(
    `/${id}/affiliate/kols/kol-dashboard/${userName}/content/hashtag-analysis?type_filter=${typeFilter}`
  );
};
export type RTAudienceOverTime = {
  twitterFollowers: {
    userName: string;
    followers: number;
    followersChangedRatio: number;
  };
  twitterFollowersChangeLogs: {
    [timeStamp: string]: number;
  };
};

export async function fetchKOLsAudience({
  id,
  userName,
  endTime,
  startTime,
}: {
  id: string;
  userName: string;
  startTime?: number;
  endTime?: number;
}) {
  return await AFFILIATE_API.get<RTAudienceOverTime>(
    `/${id}/affiliate/kols/kol-dashboard/${userName}/overview/audience-over-time`,
    { startTime, endTime }
  );
}

export type RTTweetFrequency = {
  tweetCount: number;
  tweetFrequency: number;
  tweetCountChangeLogs: {
    [timeStamp: string]: number;
  };
};

export async function fetchKOLsTweetFrequency({
  filterType,
  id,
  userName,
}: {
  id: string;
  userName: string;
  filterType: string;
}) {
  return await AFFILIATE_API.get<RTTweetFrequency>(
    `/${id}/affiliate/kols/kol-dashboard/${userName}/engagement/tweet-frequency-analysis`,
    { type_filter: filterType }
  );
}

export type RTTweetTime = {
  engagement: {
    [key: string]: {
      [key: string]: {
        likes?: number;
        replies?: number;
        retweets?: number;
        total?: number;
        views?: number;
      };
    };
  };
  view: {
    [key: string]: {
      [key: string]: {
        likes?: number;
        replies?: number;
        retweets?: number;
        total?: number;
        views?: number;
      };
    };
  };
};

export async function fetchKOLsTweetTime({ id, userName }: { id: string; userName: string }) {
  return await AFFILIATE_API.get<RTTweetTime>(
    `/${id}/affiliate/kols/kol-dashboard/${userName}/engagement/tweet-time-analysis`
  );
}

export type RTTopTweets = {
  numberOfDocs: number;
  data: {
    id: string;
    authorName: string;
    created: string;
    timestamp: number;
    url: string;
    views: number;
    likes: number;
    replyCounts: number;
    retweetCounts: number;
    text: string;
    media: {
      // eslint-disable-next-line no-unused-vars
      [type in "photo" | "video"]?: string[];
    };
  }[];
};

export async function fetchKOLsTopTweets(
  id: string,
  userName: string,
  typeFilter?: TypeFilter,
  pageSize?: number,
  page?: number
) {
  return await AFFILIATE_API.get<RTTopTweets>(
    `/${id}/affiliate/kols/kol-dashboard/${userName}/tweets?pageSize=${pageSize}&page=${page}&typeFilter=${typeFilter}`
  );
}

export type RTDiscussedTopics = {
  authorName: String;
  topics: {
    [topic: string]: {
      proportion: number;
      description:
        | {
            [others: string]: number;
          }
        | string;
    };
  };
};

export async function fetchDiscussedTopics(id: string, userName: string) {
  return await AFFILIATE_API.get<RTDiscussedTopics>(
    `/${id}/affiliate/kols/kol-dashboard/${userName}/most-discussed-topic`
  );
}

export async function addToFavorite({ id, userName }: { id: string; userName: string }) {
  return await AFFILIATE_API.put(`/${id}/affiliate/kols/favorite/${userName}`);
}

export async function removeFavorite({ id, userName }: { id: string; userName: string }) {
  return await AFFILIATE_API.delete(`/${id}/affiliate/kols/favorite/${userName}`);
}

export type RTKOLsTopic = {
  [topic: string]: number;
};

export async function getKOLsTopic({ id, type }: { id: string; type?: "All" | "Favorite" }) {
  return await AFFILIATE_API.get<RTKOLsTopic>(
    `/${id}/affiliate/kols/topic${queryParams({ type: type })}`
  );
}

export type RTKOLsPurposes = {
  [purpose: string]: number;
};

export async function getKOLsPruposes({ id, type }: { id: string; type: "All" | "Favorite" }) {
  return await AFFILIATE_API.get<RTKOLsPurposes>(`/${id}/affiliate/kols/purpose?type=${type}`);
}

export type RTKOLsSortBy = {
  numberOfDocs: number;
  data: {
    userId: string;
    name: string;
    userName: string;
    avatar: string;
    followers: number;
    language?: string;
    averageEngagement: {
      likes: number;
      replies: number;
      retweets: number;
      views: number;
    };
    topics?: string[];
    purposes?: string[];
    favored: boolean;
  }[];
};

export async function fetchKOLsSortBy({
  sortType,
  page,
  pageSize,
  id,
}: {
  sortType?: string;
  page?: number;
  pageSize?: number;
  id: string;
}) {
  return await AFFILIATE_API.get<RTKOLsSortBy>(
    `/${id}/affiliate/kols/search-sort${queryParams({ sortType, page, pageSize })}`
  );
}
export type RTKOLsreport = {
  displayName: string;
  url: string;
  blue: boolean;
  userName: string;
  followersCount: number;
  created: string;
  timestamp: number;
  rawDescription: string;
  profileImageUrl: string;
  profileBannerUrl: string;
};

export async function fetchKOLsReportSummary({ id, name }: { id: string; name: string }) {
  return await AFFILIATE_API.get<RTKOLsreport>(`/${id}/affiliate/kols/kol-report/${name}`);
}

export type RTKOlsRPPerformance = {
  performanceAnalysis: {
    [name: string]: {
      engagementRate: number;
      viewRate: number;
      kolName: string;
      url: string;
    };
  };
};

export async function fetchKOLsRPPerformance({
  endTime,
  id,
  name,
  startTime,
}: {
  id: string;
  name: string;
  startTime?: number;
  endTime?: number;
}) {
  return await AFFILIATE_API.get<RTKOlsRPPerformance>(
    `/${id}/affiliate/kols/kol-report/${name}/kols-performance-analysis`,
    { start_time: startTime, end_time: endTime }
  );
}

export type RTKOLsRPTweet = {
  tweetsAnalysis: {
    [name: string]: {
      kolName: string;
      url: string;
      text: string;
      engagementRate: number;
      viewRate: number;
      views: number;
      likes: number;
      replies: number;
      retweets: number;
      kolUserName?: string;
    }[];
  };
};

export async function fetchKOLsRPTweet({
  endTime,
  id,
  name,
  startTime,
}: {
  id: string;
  name: string;
  startTime?: number;
  endTime?: number;
}) {
  return await AFFILIATE_API.get<RTKOLsRPTweet>(
    `/${id}/affiliate/kols/kol-report/${name}/kols-tweets-analysis`,
    {
      start_time: startTime,
      end_time: endTime,
    }
  );
}

export type RTKOLsRPOverview = { totalKOLs: number; totalPosts: number; totalTopics: number };

export async function fetchKOLsOverview({
  endTime,
  id,
  name,
  startTime,
}: {
  id: string;
  name: string;
  startTime?: number;
  endTime?: number;
}) {
  return await AFFILIATE_API.get<RTKOLsRPOverview>(
    `/${id}/affiliate/kols/kol-report/${name}/overview`,
    {
      start_time: startTime,
      end_time: endTime,
    }
  );
}

export type RTKOLsRPMetrics = {
  followers: {
    changLogs: {
      [timeStamp: string]: {
        log: number;
        ratio: number;
      };
    };
    startFollower: number;
    followerGrowth: number;
  };
  likes: {
    changLogs: {
      [timeStamp: string]: {
        log: number;
        ratio: number;
      };
    };
    startLike: number;
    likeGrowth: number;
  };
  retweets: {
    changLogs: {
      [timeStamp: string]: {
        log: number;
        ratio: number;
      };
    };
    startRetweet: number;
    retweetGrowth: number;
  };
  replies: {
    changLogs: {
      [timeStamp: string]: {
        log: number;
        ratio: number;
      };
    };
    startReply: number;
    replyGrowth: number;
  };
  views: {
    changLogs: {
      [timeStamp: string]: {
        log: number;
        ratio: number;
      };
    };
    startView: number;
    viewGrowth: number;
  };
  kolInfo: {
    [timeStamp: string]: {
      kol: string;
      kolName: string;
      numberPosts: number;
    }[];
  };
  kolList: string[];
};

export async function fetchKOLsRPMetrics({
  endTime,
  id,
  name,
  startTime,
}: {
  id: string;
  name: string;
  startTime?: number;
  endTime?: number;
}) {
  return await AFFILIATE_API.get<RTKOLsRPMetrics>(
    `/${id}/affiliate/kols/kol-report/${name}/performance-project-metrics`,
    {
      start_time: startTime,
      end_time: endTime,
    }
  );
}

export type RTKOlsOfferInfo = {
  numberOfDocs: number;
  data: {
    id: string;
    title: string;
    feature: string;
    kolName: string;
    linkAffiliate: string;
    walletAddress: string;
    progress: number;
    payment: number;
    value: number;
    time: number;
    status: string;
  }[];
};

export async function fetchKOLsOfferInfo({
  keyword,
  pageSize,
  page,
  id,
}: {
  keyword: string;
  pageSize: number;
  page: number;
  id: string;
}) {
  return await AFFILIATE_API.get<RTKOlsOfferInfo>(
    `/${id}/affiliate/kols/connect/offers${queryParams({ keyword, pageSize, page })}`
  );
}
