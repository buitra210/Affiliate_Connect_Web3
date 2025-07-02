import { AFFILIATE_USER_API, putAuthAPI } from "@centic-scoring/api/fetchAuthFunctions";
import { AFFILIATE_API, postAPI } from "@centic-scoring/api/fetchFunctions";
import { queryParams } from "@centic-scoring/api/ultils";
import { baseKOLsUrl } from "../urls";

export type RTListToken = {
  chainInfo: {
    data: string[];
  };
  tokenInfo: {
    data: {
      [chainId: string]: {
        name?: string;
        imgUrl: string;
        id: string;
        address: string;
        symbol: string;
      }[];
    };
  };
};

export type RTAffiliateContact = {
  phone: string;
  email: string;
  website: string;
  twitter: string[];
  telegram: string[];
};

export type RTAffiliateProjectInfo = {
  projectId: string;
  projectName: string;
  projectLogo: string;
  description: string;
};

export type RTOfferRecommend = {
  content: string;
};

export type RTKOLsBaseInfo = {
  id: string;
  title: string;
  introduction: {
    featureTitle: string;
    logo: string;
    description: string;
    featureLink: string;
  };
  requirements: {
    kpis: {
      goal: string;
      kpi: number;
      time: {
        type: string;
        value: number;
      };
    }[];
    custom: string;
  };
  payments: {
    type: "Auto" | "Selfpay";
    payInfo: {
      token: {
        id: string;
        address: string;
        name: string;
        symbol: string;
        imgUrl: string;
      };
      chainId: string;
      amount: number;
      rule: {
        type: "milestone" | "upfront" | "post" | "string";
        upfrontPay?: number;
        postPay?: number;
        stringValue?: string;
      };
    };
    bonusReward: {
      goal: string;
      kpiType: string;
      kpiValue: number;
      rewardValue: number;
    }[];
    custom: string;
  };
  contactInformation: string;
  createdTime: number;
  kolsInfo: {
    userName: string;
    displayName: string;
    twitterUrl: string;
    walletAddress: string;
  };
  version: number;
  updated: boolean;
};

export type RTOfferList = {
  numberOfDocs: number;
  data: {
    id: string;
    title: string;
    feature: string;
    createdTime: number;
    link: string;
  }[];
};

export type RTCreateOffer = {
  message: string;
  offerId: string;
};

type TCreateOfferInput = {
  setupOffer: {
    title: string;
    introduction: {
      featureTitle: string;
      featureLink: string;
      logo: string;
      description: string;
    };
    requirements: {
      kpis: {
        goal: string;
        kpi: number;
        time: {
          type: string;
          value: number;
        };
      }[];
      custom: string;
    };
    payments: {
      type: string;
      payInfo: {
        token: {
          address: string;
          id: string;
        };
        chainId: string;
        amount: number;
        rule: {
          type: string;
          value:
            | {
                upfrontValue?: number;
                postValue?: number;
              }
            | string;
        };
      };
      bonusReward: {
        goal: string;
        kpiType: string;
        kpiValue: number;
        rewardValue: number;
      }[];
      custom: string;
    };
    contactInformation: string;
  };
  userInfo: null;
};

export type TGenLetter = {
  offer_link: string;
  contact: string;
};

export type RTGenLetter = {
  content: string;
};

export type TUpgradeOffer = {
  title: string;
  introduction: {
    featureTitle: string;
    featureLink: string;
    logo: string;
    description: string;
  };
  requirements: {
    kpis: {
      goal: string;
      kpi: number;
      time: {
        type: string;
        value: number;
      };
    }[];
    custom: string;
  };
  payments: {
    type: string;
    payInfo: {
      token: {
        id: string;
        address: string;
      };
      chainId: string;
      amount: number;
      rule: {
        type: string;
        value: {
          upfrontValue?: number;
          postValue?: number;
          stringValue?: string;
        };
      };
    };
    bonusReward: {
      goal: string;
      kpiType: string;
      kpiValue: number;
      rewardValue: number;
    }[];
    custom: string;
  };
  contactInformation: string;
};

export type RTOfferNotification = {
  numberOfDocs: number;
  data: {
    id: string;
    type: string;
    content: string;
    createTime: number;
    offerId: string;
    requestId?: string;
    read: boolean;
    requestStatus: string;
  }[];
};

type RequestTypes =
  | {
      type: "KPI expectation";
      detail: {
        goal: string;
        kpi: number;
        time: {
          type: string;
          value: number;
        };
      }[];
    }
  | {
      type: "Payment";
      detail: {
        rule: string;
        bonusReward: {
          goal: string;
          kpiType: string;
          kpiValue: number;
          rewardValue: number;
        }[];
      };
    }
  | {
      type: "Other";
      detail: string;
    };
export type RTRequestNotification = {
  id: string;
  offerId: string;
  value: RequestTypes[];
  createdTime: number;
  updatedTime: number;
  isAccepted: boolean;
};

export type UpgradeType = "By self" | "By request";

export const KOLConnectAPI = {
  listToken: async () => {
    return await AFFILIATE_API.get<RTListToken>(`/list-token`);
  },
  contact: async (id: string) => {
    return await AFFILIATE_API.get<RTAffiliateContact>(`/${id}/contact`);
  },
  getRecomend: async (id: string, text?: string) => {
    return await AFFILIATE_API.post<RTOfferRecommend>(
      `/${id}/affiliate/share/connect/offers/recommendation`,
      {
        body: JSON.stringify({ text: text || "" }),
      }
    );
  },
  getBaseOfferInfo: async (id: string, offerID: string) => {
    return await AFFILIATE_API.get<RTKOLsBaseInfo>(
      `/${id}/affiliate/kols/connect/base-offers/${offerID}`
    );
  },
  getOfferInfo: async (id: string, offerID: string) => {
    return await AFFILIATE_API.get<RTKOLsBaseInfo>(
      `/${id}/affiliate/kols/connect/offers/${offerID}`
    );
  },
  getOfferBase: async ({
    id,
    keyword,
    page,
    pageSize,
  }: {
    id: string;
    keyword?: string;
    page?: number;
    pageSize?: number;
  }) => {
    return await AFFILIATE_API.get<RTOfferList>(
      `/${id}/affiliate/kols/connect/base-offers${queryParams({
        keyword,
        page,
        pageSize: pageSize,
      })}`
    );
  },
  createOffer: async (id: string, input: TCreateOfferInput) => {
    return await AFFILIATE_API.post<RTCreateOffer>(`/${id}/affiliate/kols/connect/base-offers`, {
      body: JSON.stringify(input),
    });
  },
  genLetter: async (id: string, input: TGenLetter) => {
    return await AFFILIATE_API.post<RTGenLetter>(
      `/${id}/affiliate/kols/connect/offers/gen_letter`,
      {
        body: JSON.stringify(input),
      }
    );
  },
  upgradeOffer: async (id: string, offerId: string, input: TUpgradeOffer, type: UpgradeType) => {
    return await putAuthAPI<RTCreateOffer>(
      baseKOLsUrl + `/${id}/affiliate/kols/connect/offers/${offerId}`,
      {
        body: JSON.stringify({ setupOffer: input, type: type }),
      }
    );
  },
  upgradeBaseOffer: async (id: string, offerId: string, input: TUpgradeOffer) => {
    return await putAuthAPI<RTCreateOffer>(
      baseKOLsUrl + `/${id}/affiliate/kols/connect/base-offers/${offerId}`,
      {
        body: JSON.stringify({ setupOffer: input }),
      }
    );
  },
  getNotification: async (id: string, offerId: string) => {
    return await AFFILIATE_API.get<RTOfferNotification>(
      `/${id}/affiliate/share/connect/${offerId}/notification`
    );
  },
  getRequestNotification: async (id: string, offerId: string, requestId: string) => {
    return await AFFILIATE_API.get<RTRequestNotification>(
      `/${id}/affiliate/kols/connect/offers/${offerId}/request/${requestId}`
    );
  },
  updateOfferStatus: async (id: string, offerId: string, status: KolUserStatus) => {
    return await putAuthAPI<RTCreateOffer>(
      baseKOLsUrl + `/${id}/affiliate/kols/connect/offers/${offerId}/status`,
      {
        body: JSON.stringify({ status: status }),
      }
    );
  },
  updateNotificationStatus: async (id: string, notificationId: string) => {
    return await putAuthAPI(
      baseKOLsUrl + `/${id}/affiliate/share/connect/notifications/${notificationId}/status`,
      {}
    );
  },
  updateRequestNotificationStatus: async (
    id: string,
    offerId: string,
    requestId: string,
    status: KolUserStatus
  ) => {
    return await putAuthAPI(
      baseKOLsUrl + `${id}/affiliate/kols/connect/offers/${offerId}/request/${requestId}`,
      {
        body: JSON.stringify({ status: status }),
      }
    );
  },
  deleteBaseOffer: async (id: string, offerId: string) => {
    return await AFFILIATE_API.delete(`/${id}/affiliate//kols/connect/base-offers/${offerId}`);
  },
  otherVersion: async (id: string, offerId: string, type: string, historyId?: string) => {
    return await AFFILIATE_API.get<RTKOLsBaseInfo>(
      `/${id}/affiliate/share/connect/${offerId}/other-version${queryParams({
        type,
        id: historyId,
      })}`
    );
  },
};

export type RTKOLsOfferManagement = {
  numberOfDocs: number;
  data: {
    id: string;
    title: string;
    feature: string;
    link: string;
    createdTime: number;
  }[];
};
export async function fetchOfferManagement({
  id,
  page,
  pageSize,
  keyword,
}: {
  id: string;
  page: number;
  pageSize: number;
  keyword: string;
}) {
  return await AFFILIATE_API.get<RTKOLsOfferManagement>(
    `/${id}/affiliate/kols/connect/base-offers?keyword=${keyword}&pageSize=${pageSize}&page=${page}`
  );
}

export async function fetchKolOfferDetail({ id, offerId }: { id: string; offerId: string }) {
  return await AFFILIATE_API.get<RTKOLsBaseInfo>(
    `/${id}/affiliate/kols/connect/base-offers/${offerId}`
  );
}

export type RTKOLsOfferHistory = {
  numberOfDocs: number;
  data: {
    id: string;
    createdTime: number;
    updatedTime: number;
    version: number;
    type: string;
  }[];
};

export async function fetchKolOfferHistory({ id, offerId }: { id: string; offerId: string }) {
  return await AFFILIATE_API.get<RTKOLsOfferHistory>(
    `/${id}/affiliate/share/connect/offers/${offerId}/history`
  );
}

export const KOLUsersAPI = {};

export type KolUserStatus =
  | "Request"
  | "In progress"
  | "Reject"
  | "Done"
  | "Cancel"
  | "Accept"
  | "Pending";

export type RTKOLsUserOfferDetail = {
  offerInfo: {
    id: string;
    projectName: string;
    kolInfo: {
      userName: string;
      displayName: string;
      avatar: string;
      walletAddress: string;
    };
    title: string;
    introduction: {
      description: string;
      featureLink: string;
      featureTitle: string;
      logo: string;
    };
    requirements: {
      kpis: {
        goal: string;
        kpi: number;
        time: {
          type: string;
          value: number;
        };
      }[];
      custom: string;
    };
    payments: {
      type: string;
      payInfo: {
        token: {
          id: string;
          address: string;
          name: string;
          symbol: string;
          imgUrl: string;
        };
        chainId: string;
        amount: number;
        rule: {
          type: string;
          value: {} | string;
        };
      };
      bonusReward: {
        goal: string;
        kpiType: string;
        kpiValue: number;
        rewardValue: number;
      }[];
      custom: string;
    };
    contactInformation: string;
    createdTime: number;
    updatedTime: number;
    userId: string;
    status: string;
    version: number;
    updated: boolean;
    type: string;
  };
  kpis: {
    totalProgress: number;
    details: {
      goal: string;
      kpi: number;
      time: {
        type: string;
        value: number;
      };
      progress: {
        value?: number;
        ratio?: number;
        totalWeek?: number;
        details?: [];
      };
    }[];
  };
  bonusReward: {
    goal: string;
    kpiType: string;
    rewardValue: number;
    kpiValue: number;
    progress: {
      value: number;
      ratio: number;
    };
    rewardAble: boolean;
  }[];

  request: RequestTypes[];

  requestId: string;
};

export async function fetchKolUserOfferDetail({ offerId }: { offerId: string }) {
  return await AFFILIATE_USER_API.get<RTKOLsUserOfferDetail>(`/affiliate/kols/offers/${offerId}`);
}

export async function fetchKolUserHistory({ offerId }: { offerId: string }) {
  return await AFFILIATE_USER_API.get<RTKOLsOfferHistory>(`/affiliate/share/${offerId}/history`);
}

export async function putKolUserOfferStatus({
  offerId,
  status,
}: {
  offerId: string;
  status: KolUserStatus;
}) {
  return await AFFILIATE_USER_API.put(`/affiliate/share/${offerId}/status`, {
    body: JSON.stringify({
      status: status,
    }),
  });
}

export async function putKolUserOfferUpgrade({
  offerId,
  status,
  requestId,
}: {
  offerId: string;
  status: KolUserStatus;
  requestId: string;
}) {
  return await AFFILIATE_USER_API.put(`/affiliate/share/${offerId}/upgrade`, {
    body: JSON.stringify({
      type: status,
      requestUpgradeId: requestId,
    }),
  });
}

export const ForKOLAPI = {};

export type RTKOLsOfferList = {
  numberOfDocs: number;
  data: {
    id: string;
    project: string;
    title: string;
    link: string;
    kpi: number;
    value: number;
    lastUpgrade: number;
    reward: boolean;
    status: string;
  }[];
};

export async function fetchKOLsOfferList({
  keyword,
  page,
  pageSize,
}: {
  keyword?: string;
  page?: number;
  pageSize?: number;
}) {
  return await AFFILIATE_USER_API.get<RTKOLsOfferList>(
    `/affiliate/kols/offers${queryParams({ keyword, page, pageSize })}`
  );
}

export type RTGetAuthenURL = {
  key: string;
  authenticationUrl: string;
};
export async function fetchAuthenURL(callback?: string) {
  return await AFFILIATE_API.get<RTGetAuthenURL>(
    `/twitter-authentication-url${queryParams({
      callback,
    })}`
  );
}

export type RTLoginWithTwitter = {
  jwt: string;
  userId: string;
};

export async function loginWithTwitter({
  key,
  oauthVerifier,
}: {
  oauthVerifier: string;
  key: string;
}) {
  return await postAPI<RTLoginWithTwitter>(baseKOLsUrl + `/login`, {
    body: JSON.stringify({ key, oauthVerifier }),
  });
}

export type RTKOLInfos = {
  userName: string;
  displayName: string;
  avatar: string;
  twitterLink: string;
};

export async function fetchKolInfo() {
  return await AFFILIATE_USER_API.get<RTKOLInfos>(`/user-info`);
}

export type RTAffiliateUserInfo = {
  userName: string;
  displayName: string;
  avatar: string;
  twitterLink: string;
  platform: string[];
};

export async function fetchAffiliateUseInfo() {
  return await AFFILIATE_USER_API.get<RTAffiliateUserInfo>(`/user-info`);
}

export async function fetchAmbassadorInfo() {
  return await AFFILIATE_USER_API.get<RTKOLInfos>(`/user-info`);
}

export async function fetchKOLNotification(offerId: string) {
  return await AFFILIATE_USER_API.get<RTOfferNotification>(
    `/affiliate/share/${offerId}/notification`
  );
}

export async function updateKolUserNotificationStatus(notificationId: string) {
  return await putAuthAPI(
    baseKOLsUrl + `/affiliate/share/notifications/${notificationId}/status`,
    {}
  );
}

export type RTRequestUpgradeOffer = {
  data: RTKOLsBaseInfo;
  requestUpgradeId: string;
};

export async function fetchRequestUpgrade(offerId: string, requestId: string) {
  return await AFFILIATE_USER_API.get<RTRequestUpgradeOffer>(
    `/affiliate/share/${offerId}/request-upgrade/${requestId}`
  );
}

export async function fetchNotificationRequest({
  offerId,
  requestId,
}: {
  offerId: string;
  requestId: string;
}) {
  return await AFFILIATE_USER_API.get<RTRequestNotification>(
    `/affiliate/kols/offers/${offerId}/request/${requestId}`
  );
}

export async function fetchProjectAffiliate(id: string) {
  return await AFFILIATE_API.get<RTOfferNotification>(
    `/${id}/affiliate/share/connect/notifications`
  );
}

export async function updateReadAllProject(id: string) {
  return await putAuthAPI(baseKOLsUrl + `/${id}/affiliate/share/connect/notifications/status`, {
    body: JSON.stringify({ readAll: true }),
  });
}

export async function fetchKOLNotifications() {
  return await AFFILIATE_USER_API.get<RTOfferNotification>(`/affiliate/share/notifications`);
}

export async function updateReadAllKOL() {
  return await AFFILIATE_USER_API.put(`/affiliate/share/notifications/status`, {
    body: JSON.stringify({ readAll: true }),
  });
}

export async function fetchKOLOtherVersion(offerId: string, type: string, historyId?: string) {
  return await AFFILIATE_USER_API.get<RTKOLsUserOfferDetail>(
    `/affiliate/share/offers/${offerId}/other-version${queryParams({ type, id: historyId })}`
  );
}

export type TAffiliateKOLRequest = {
  setupRequest: {
    value: {
      type: string;
      detail:
        | {
            goal: string;
            kpi: number;
            time: {
              type: string;
              value: number;
            };
          }[]
        | {
            rule: string;
            bonusReward: {
              goal: string;
              kpiType: string;
              kpiValue: number;
              rewardValue: number;
            }[];
          }
        | string;
    }[];
  };
};

export type TKOLOffer = {
  baseOfferId: string;
};

export type TAffiliateKOLLink = {
  redirect_url: string;
  twitterUserName: string;
  offerId: string;
  customUrl?: string;
};

export type RTAffiliateLink = {
  message: string;
  affiliate_link: string;
};

export type RTAffiliateLinkInfo = {
  id: string;
  link: string;
  affiliateId: string;
  offerId: string;
};
export const AffiliateKOLAPI = {
  createKOLRequest: async (id: string, data: TAffiliateKOLRequest) => {
    return await AFFILIATE_USER_API.post<string>(`/affiliate/kols/${id}/request`, {
      body: JSON.stringify(data),
    });
  },
  editKOLRequest: async (id: string, data: TAffiliateKOLRequest, requestId: string) => {
    return await AFFILIATE_USER_API.put<string>(`/affiliate/kols/${id}/request/${requestId}`, {
      body: JSON.stringify(data),
    });
  },
  createKOLOffer: async (data: TKOLOffer) => {
    return await AFFILIATE_USER_API.post<{
      message: string;
      offerId: string;
    }>(`/affiliate/kols/offers`, {
      body: JSON.stringify(data),
    });
  },
  deleteKOLRequest: async (id: string, requestId: string) => {
    return await AFFILIATE_API.delete(`/affiliate/kols/${id}/request/${requestId}`);
  },
  createKOLAffiliateLink: async (link: TAffiliateKOLLink) => {
    return await AFFILIATE_USER_API.post<RTAffiliateLink>(`/affiliate/kols/link`, {
      body: JSON.stringify(link),
    });
  },
  customKOLAffiliateLink: async (link_id: string, custom: string) => {
    return await AFFILIATE_USER_API.put<{
      message: string;
      linkId: string;
      link: string;
    }>(`/affiliate/kols/link/${link_id}`, {
      body: JSON.stringify({
        customUrl: custom,
      }),
    });
  },
  fetchAffiliateLinkInfo: async (id: string) => {
    return await AFFILIATE_USER_API.get<RTAffiliateLinkInfo>(`/affiliate/kols/offers/${id}/link`);
  },
  createKOLOfferAbandonReason: async ({ offerId, reason }: { offerId: string; reason: string }) => {
    return await AFFILIATE_USER_API.put<string>(`/affiliate/kols/offers/${offerId}/abandon`, {
      body: JSON.stringify({
        reason: reason,
      }),
    });
  },
};

export type RTInitOffer = {
  message: string;
  offerType: "Ambassador" | "Kol";
  offerId: string;
};
export async function initOffer(data: TKOLOffer) {
  return await AFFILIATE_USER_API.post<RTInitOffer>(`/affiliate/share/offers`, {
    body: JSON.stringify(data),
  });
}

export type RTSendLetter = {
  successful: string[];
  unsuccessful: string[];
};

export type TKOLInfo = {
  kolId: string;
  displayName: string;
}[];

export async function connectKOLs(kol: TKOLInfo, message: string) {
  return await AFFILIATE_API.post<RTSendLetter>(`/affiliate/send-twitter-message`, {
    body: JSON.stringify({
      SetupKolInfo: kol,
      message: message,
    }),
  });
}
export type RTActiveWalletRequest = {
  contractAddress: string | "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984";
  projectId: string;
  campaignStartDate: string;
  campaignEndDate: string;
  preCampaignDays: number;
  maxPages: number | 10;
};

export type RTActiveWalletResponse = {
  success: boolean;
  data: {
    campaignInfo: {
      contractAddress: string;
      projectId: string;
      preCampaignPeriod: {
        start: string;
        end: string;
        days: number;
      };
      campaignPeriod: {
        start: string;
        end: string;
        days: number;
      };
    };
    report: {
      campaign: {
        token: {
          name: string;
          symbol: string;
          contractAddress: string;
        };
        period: {
          preCampaign: {
            from: string;
            to: string;
          };
          duringCampaign: {
            from: string;
            to: string;
          };
        };
      };
      summary: {
        name: string;
        preCampaign: number;
        duringCampaign: number;
        changePercent: number;
        description: string;
      };
      dailyData: {
        date: string;
        count: number;
      }[];
      dataCollection: {
        maxPages: number;
        transactionsAnalyzed: {
          preCampaign: number;
          duringCampaign: number;
          total: number;
        };
      };
    };
  };
};

export async function fetchActiveWallet(data: RTActiveWalletRequest) {
  return await AFFILIATE_API.post<RTActiveWalletResponse>(`/api/etherscan/active_wallets`, {
    body: JSON.stringify(data),
  });
}

export type RTNewHoldersRequest = {
  contractAddress: string;
  projectId: string;
  campaignStartDate: string;
  campaignEndDate: string;
  preCampaignDays: number;
  maxPages: number;
};

export type RTNewHoldersResponse = {
  success: boolean;
  data: {
    campaignInfo: {
      contractAddress: string;
      projectId: string;
      preCampaignPeriod: {
        start: string;
        end: string;
        days: number;
      };
      campaignPeriod: {
        start: string;
        end: string;
        days: number;
      };
    };
    report: {
      campaign: {
        token: {
          name: string;
          symbol: string;
          contractAddress: string;
        };
        period: {
          preCampaign: {
            from: string;
            to: string;
          };
          duringCampaign: {
            from: string;
            to: string;
          };
        };
      };
      summary: {
        name: string;
        preCampaign: number;
        duringCampaign: number;
        changePercent: number;
        description: string;
      };
      dailyData: {
        date: string;
        count: number;
      }[];
      dataCollection: {
        maxPages: number;
        transactionsAnalyzed: {
          preCampaign: number;
          duringCampaign: number;
          total: number;
        };
      };
    };
  };
};

export async function fetchNewHolders(data: RTNewHoldersRequest) {
  return await AFFILIATE_API.post<RTNewHoldersResponse>(`/api/etherscan/new_token_holders`, {
    body: JSON.stringify(data),
  });
}

export type RTVolumeRequest = {
  contractAddress: string;
  projectId: string;
  campaignStartDate: string;
  campaignEndDate: string;
  preCampaignDays: number;
  maxPages: number;
};

export type RTVolumeResponse = {
  success: boolean;
  data: {
    campaignInfo: {
      contractAddress: string;
      projectId: string;
      preCampaignPeriod: {
        start: string;
        end: string;
        days: number;
      };
      campaignPeriod: {
        start: string;
        end: string;
        days: number;
      };
    };
    report: {
      campaign: {
        token: {
          name: string;
          symbol: string;
          contractAddress: string;
        };
        period: {
          preCampaign: {
            from: string;
            to: string;
          };
          duringCampaign: {
            from: string;
            to: string;
          };
        };
      };
      summary: {
        name: string;
        preCampaign: number;
        duringCampaign: number;
        changePercent: number;
        description: string;
      };
      dailyData: {
        date: string;
        count: number;
      }[];
      dataCollection: {
        maxPages: number;
        transactionsAnalyzed: {
          preCampaign: number;
          duringCampaign: number;
          total: number;
        };
      };
    };
  };
};

export async function fetchVolume(data: RTVolumeRequest) {
  return await AFFILIATE_API.post<RTVolumeResponse>(`/api/etherscan/volume_transactions`, {
    body: JSON.stringify(data),
  });
}

export type RTAffiliateAnalytics = {
  success: boolean;
  data: {
    projectId: string;
    barChart: {
      title: string;
      data: {
        totalClicks: number;
        redirectUrl: string;
      }[];
    };
    donutChart: {
      title: string;
      redirectUrls: string[];
    };
  };
};

export type RTAffiliateAnalyticsDonut = {
  success: boolean;
  data: {
    projectId: string;
    redirectUrl: string;
    totalClicks: number;
    data: {
      label: string;
      affiliateId: string;
      offerId: string;
      clicks: number;
    }[];
  };
};

export async function fetchAffiliateAnalytics(projectId: string) {
  return await AFFILIATE_API.get<RTAffiliateAnalytics>(`/${projectId}/affiliate-analytics`);
}

export async function fetchAffiliateAnalyticsDonut(projectId: string, redirectUrl: string) {
  const encodedUrl = encodeURIComponent(redirectUrl);
  return await AFFILIATE_API.get<RTAffiliateAnalyticsDonut>(
    `/${projectId}/affiliate-analytics/donut/${encodedUrl}`
  );
}
