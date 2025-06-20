import { AFFILIATE_USER_API, putAuthAPI } from "@centic-scoring/api/fetchAuthFunctions";
import { AFFILIATE_API, postAPI } from "@centic-scoring/api/fetchFunctions";
import { baseKOLsUrl } from "../urls";
import {
  RTAffiliateContact,
  RTAffiliateProjectInfo,
  RTListToken,
  RTOfferNotification,
  UpgradeType,
} from "../affiliate/affiliate";
import { queryParams } from "@centic-scoring/api/ultils";

export type RTAmbassadorBaseOffer = {
  numberOfDocs: number;
  data: {
    id: string;
    communityPlatform: string;
    title: string;
    link: string;
    createdTime: number;
  }[];
};
export type AmbassadorStatus =
  | "Request"
  | "Upgrading"
  | "In progress"
  | "Reject"
  | "Done"
  | "Cancel"
  | "Accept"
  | "Pending";

export type RTAmbassadorOffer = {
  numberOfDocs: number;
  data: {
    id: string;
    ambassadorName: string;
    linkOffer: string;
    value: number;
    startData: number;
    duration: string;
    status: AmbassadorStatus;
  }[];
};

type TCreateOfferInput = {
  setupOffer: {
    title: string;
    introduction: {
      projectName: string;
      projectLogo: string;
      description: string;
    };
    tasks: {
      time: {
        type: string;
        value: number;
      };
      taskDetails: {
        taskId: string;
        taskType: string;
        taskName: string;
        points: number | null;
      }[];

      customizedTask: string;
    };
    payments: {
      type: string;
      payInfo: {
        payType: string;
        token: {
          id: string;
          address: string;
        } | null;
        chainId: string | null;
        amount: number;
        rule: null;
      };
    };
    contactInformation: string;
  };
};

export type TUpgradeOffer = {
  title: string;
  introduction: {
    projectName: string;
    projectLogo: string;
    description: string;
  };
  tasks: {
    time: {
      type: string;
      value: number;
    };
    taskDetails: {
      taskId: string;
      taskType: string;
      taskName: string;
      points: number | null;
    }[];

    customizedTask: string;
  };
  payments: {
    type: string;
    payInfo: {
      payType: string;
      token: {
        id: string;
        address: string;
      } | null;
      chainId: string | null;
      amount: number;
      rule: null;
    };
  };
  contactInformation: string;
};

export type RTCreateOffer = {
  message: string;
  offerId: string;
};
export type TGenLetter = {
  offer_link: string;
  contact: string;
};

export type RTGenLetter = {
  content: string;
};

export type RTAmbassadorBaseOfferInfo = {
  title: string;
  introduction: {
    projectName: string;
    projectLogo: string;
    description: string;
  };
  tasks: {
    time: {
      type: string;
      value: number;
    };
    taskDetails: [
      {
        taskId: string;
        taskType: string;
        taskName: string;
        description: string;
        points: number | null;
      },
      {
        taskId: string;
        taskType: string;
        taskName: string;
        description: string;
        points: number | null;
      }
    ];
    customizedTask: string;
  };
  payments: {
    type: "Selfpay" | "Auto";
    payInfo: {
      payType: "Crypto" | "USD";
      token: {
        id: string;
        address: string;
        name: string;
        symbol: string;
        imgUrl: string;
      };
      chainId: string;
      amount: number;
      rule: null;
    };
  };
  contactInformation: string;
  createdTime: number;
  endTime: number;
  updatedTime: number;
  kolsInfo: {
    userName: string;
    displayName: string;
    twitterUrl: string;
    walletAddress: null | string;
  };
  version: number;
  updated: boolean;
};

export const AmbassadorConnectAPI = {
  listToken: async () => {
    return await AFFILIATE_API.get<RTListToken>(`/list-token`);
  },
  contact: async (id: string) => {
    return await AFFILIATE_API.get<RTAffiliateContact>(`/${id}/contact`);
  },
  projectInfo: async (id: string) => {
    return await AFFILIATE_API.get<RTAffiliateProjectInfo>(`/${id}/project-info`);
  },
  getBaseOffers: async ({
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
    return await AFFILIATE_API.get<RTAmbassadorBaseOffer>(
      `/${id}/affiliate/ambassadors/base-offers${queryParams({
        keyword,
        page,
        pageSize: pageSize,
      })}`
    );
  },
  createOffer: async (id: string, input: TCreateOfferInput) => {
    return await AFFILIATE_API.post<RTCreateOffer>(`/${id}/affiliate/ambassadors/base-offers`, {
      body: JSON.stringify(input),
    });
  },
  genLetter: async (id: string, input: TGenLetter) => {
    return await AFFILIATE_API.post<RTGenLetter>(`/${id}/affiliate/ambassadors/offers/gen_letter`, {
      body: JSON.stringify(input),
    });
  },
  getBaseOfferInfo: async (id: string, offerId: string) => {
    return await AFFILIATE_API.get<RTAmbassadorBaseOfferInfo>(
      `/${id}/affiliate/ambassadors/base-offers/${offerId}`
    );
  },
  getOffers: async (id: string) => {
    return await AFFILIATE_API.get<RTAmbassadorOffer>(`/${id}/affiliate/ambassadors/offers`);
  },
  getOffersInfo: async (id: string, offerId: string) => {
    return await AFFILIATE_API.get<RTAmbassadorBaseOfferInfo>(
      `/${id}/affiliate/ambassadors/offers/${offerId}`
    );
  },
  upgradeBaseOffer: async (
    id: string,
    offerId: string,
    input: TUpgradeOffer,
    type: UpgradeType
  ) => {
    return await putAuthAPI<RTCreateOffer>(
      baseKOLsUrl + `/${id}/affiliate/ambassadors/base-offers/${offerId}`,
      {
        body: JSON.stringify({ setupOffer: input, type: type }),
      }
    );
  },
  deleteBaseOffer: async (id: string, offerId: string) => {
    return await AFFILIATE_API.delete(`/${id}/affiliate/ambassadors/base-offers/${offerId}`);
  },
  upgradeOffer: async (id: string, offerId: string, input: TUpgradeOffer, type: UpgradeType) => {
    return await putAuthAPI<RTCreateOffer>(
      baseKOLsUrl + `/${id}/affiliate/ambassadors/offers/${offerId}`,
      {
        body: JSON.stringify({ setupOffer: input, type: type }),
      }
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
    return await AFFILIATE_API.get<RTAmbassadorBaseOffer>(
      `/${id}/affiliate/ambassadors/base-offers${queryParams({
        keyword,
        page,
        pageSize: pageSize,
      })}`
    );
  },
};

export type RTTeleLogin = {
  jwt: string;
  userId: string;
  key?: string;
  errors?: boolean;
  message?: string;
};
export async function loginTelegam({
  code,
  country,
  phone,
  phoneCodeHash,
  sessionPath,
}: {
  country: string;
  phone: string;
  code: string;
  phoneCodeHash: string;
  sessionPath: string;
}) {
  return await postAPI<RTTeleLogin>(baseKOLsUrl + `/telegram/login`, {
    body: JSON.stringify({ code, country, phone, phoneCodeHash, sessionPath }),
  });
}

export type RTSendAuthCode = {
  country: string;
  phone: string;
  phoneCodeHash: string;
  sessionPath: string;
};
export async function sendAuthCode({ country, phone }: { country: string; phone: string }) {
  return await postAPI<RTSendAuthCode>(baseKOLsUrl + `/telegram/send-auth-code`, {
    body: JSON.stringify({ country, phone }),
  });
}

export type RT2FALogin = {
  jwt: string;
  userId: string;
};
export async function login2FA({ key, password }: { password: string; key: string }) {
  return await postAPI<RT2FALogin>(baseKOLsUrl + `/telegram/2fa-login`, {
    body: JSON.stringify({ key, password }),
  });
}

export type RTAmbassadorUserOffer = {
  numberOfDocs: number;
  data: {
    id: string;
    projectName: string;
    title: string;
    startDate: number;
    duration: string;
    status: string;
    link?: string;
  }[];
};
export async function fetchAmbassadorUserOffer({
  page,
  pageSize,
  keyword,
}: {
  keyword?: string;
  pageSize: number;
  page: number;
}) {
  return await AFFILIATE_USER_API.get<RTAmbassadorUserOffer>(
    `/affiliate/ambassadors/offers${queryParams({ page, pageSize, keyword })}`
  );
}

export async function fetchAmbassadorNotifications() {
  return await AFFILIATE_USER_API.get<RTOfferNotification>(`/affiliate/share/notifications`);
}

export async function readAllAmbassNoti() {
  return await AFFILIATE_USER_API.put(`/affiliate/share/notifications/status`, {
    body: JSON.stringify({ readAll: true }),
  });
}

export async function fetchAmbassadorNotification(offerId: string) {
  return await AFFILIATE_USER_API.get<RTOfferNotification>(
    `/affiliate/share/${offerId}/notification`
  );
}

export type RTAmbassadorOfferDetail = {
  offerInfo: {
    id: string;
    projectName: string;
    title: string;
    introduction: {
      projectName: string;
      projectLogo: string;
      description: string;
    };
    tasks: {
      time: {
        type: string;
        value: number;
      };
      taskDetails: {
        taskId: string;
        taskType: string;
        taskName: string;
        points: null;
      }[];
      customizedTask: string;
    };
    payments: {
      type: string;
      payInfo: {
        payType: string;
        token: {
          id: string;
          address: string;
          name: string;
          symbol: string;
          imgUrl: string;
        };
        chainId: string;
        amount: number;
        rule: null;
      };
    };
    contactInformation: string;
    kolInfo: {
      userName: string;
      displayName: string;
      telegramUrl: string;
      walletAddress: null;
    };
    createdTime: number;
    updatedTime: number;
    endTime: null;
    type: string;
    status: string;
    baseOfferId: string;
    offerType: string;
  };
};

export async function fetchAmbassOfferDetail({ offerId }: { offerId: string }) {
  return await AFFILIATE_USER_API.get<RTAmbassadorOfferDetail>(
    `/affiliate/ambassadors/offers/${offerId}`
  );
}

export async function initAmbassOfferDetail({ offerId }: { offerId: string }) {
  return await AFFILIATE_USER_API.get<{ offerId: string }>(`/affiliate/ambassadors/offers`, {
    body: JSON.stringify({ baseOfferId: offerId }),
  });
}

export async function putAmbassUserStatus({
  offerId,
  status,
}: {
  offerId: string;
  status: string;
}) {
  return await AFFILIATE_USER_API.put(`/affiliate/share/${offerId}/status`, {
    body: JSON.stringify({ status: status }),
  });
}
