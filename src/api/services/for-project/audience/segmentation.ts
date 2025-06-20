import {
  deleteAuthAPI,
  getAuthAPI,
  getAuthAPIBlob,
  postAuthAPI,
  putAuthAPI,
} from "@centic-scoring/api/fetchAuthFunctions";
import { baseUrlCDP } from "../../urls";
import { queryParams } from "@centic-scoring/api/ultils";
import { TAudiencesFilter } from "../../web3-growth/engagement";

export type RTCreateSegment = {
  name: string;
  numberOfAudiences: number;
  message: string;
};

type TCreateSegmentInput = {
  chains?: string[];
  excludedProtocols?: string[];
  includedProtocols?: string[];
  maxTransIn30Days?: number;
  minTransIn30Days?: number;
  maxCreatedTime?: number;
  minCreatedTime?: number;
  excludedTokens?: string[];
  includedTokens?: string[];
  maxWalletBalance?: number;
  minWalletBalance?: number;
  tags?: string[];
  name: string;
};
export async function createSegment({ id, input }: { id: string; input: TCreateSegmentInput }) {
  return await postAuthAPI<RTCreateSegment>(baseUrlCDP + `/${id}/engagement/segments`, {
    body: JSON.stringify(input),
  });
}

export async function exportSegment({
  id,
  input,
}: {
  id: string;
  input: Omit<TAudiencesFilter, "id">;
}) {
  return await getAuthAPIBlob(baseUrlCDP + `/${id}/engagement/export${queryParams(input)}`);
}

export type RTEditSegment = {};
export async function editSegment({
  id,
  name,
  segmentId,
}: {
  id: string;
  name: string;
  segmentId: string;
}) {
  return await putAuthAPI<RTEditSegment>(baseUrlCDP + `/${id}/engagement/segments/${segmentId}`, {
    body: JSON.stringify({ name }),
  });
}

export type RTDeleteSegment = {};
export async function deleteSegment({ id, segmentId }: { id: string; segmentId: string }) {
  return await deleteAuthAPI<RTDeleteSegment>(
    baseUrlCDP + `/${id}/engagement/segments/${segmentId}`
  );
}

export type RTSegmentDetail = {
  id: string;
  name: string;
  filter: {
    tags: string[];
    portfolio: {
      walletBalance: {
        from: number;
        to: number;
      };
      includedTokens: {
        _id: string;
        address: string;
        chainId: string;
        imgUrl: string;
        symbol: string;
        name: string;
      }[];
      excludedTokens: {
        _id: string;
        address: string;
        chainId: string;
        imgUrl: string;
        symbol: string;
        name: string;
      }[];
    };
    onchainActivity: {
      walletAge: {
        minCreatedTime: number;
        maxCreatedTime: number;
      };
      transactionsIn30Days: {
        min: number;
        max: number;
      };
      includedProtocols: {
        projectId: string;
        name: string;
        imgUrl: string;
      }[];
      excludedProtocols: {
        projectId: string;
        name: string;
        imgUrl: string;
      }[];
      activeChains: {
        id: string;
        name: string;
        nativeTokenId: string;
        nativeTokenSymbol: string;
        imgUrl: string;
        explorerUrl: string;
        type: string;
      }[];
    };
  };
  totalDocs: number;
  totalSegmentAudiences: number;
  users: {
    address: string;
    name: string;
    loyaltyPoint: number;
    totalAssets: number;
    totalValueOfProjectParticipation: number;
    activeChains: {
      id: string;
      name: string;
      nativeTokenId: string;
      nativeTokenSymbol: string;
      imgUrl: string;
      explorerUrl: string;
      type: string;
    }[];
    segmentsMatcher: string[];
  }[];
};

export async function fetchSegmentDetail({
  id,
  segmentId,
  keyword,
  page,
  pageSize,
}: {
  id: string;
  segmentId: string;
  keyword?: string;
  page?: number;
  pageSize?: number;
}) {
  return await getAuthAPI<RTSegmentDetail>(
    baseUrlCDP +
      `/${id}/engagement/segments/${segmentId}${queryParams({ keyword, page, pageSize })}`
  );
}

export type RTSegmentList = {
  segments: {
    id: string;
    projectId: string;
    name: string;
    description: null;
    filter: {
      tags: string[];
      portfolio: {
        walletBalance: {
          from: number;
          to: null | number;
        };
        includedTokens: {
          _id: string;
          address: string;
          chainId: string;
          imgUrl: string;
          symbol: string;
          name: string;
        }[];
        excludedTokens: {
          _id: string;
          address: string;
          chainId: string;
          imgUrl: string;
          symbol: string;
          name: string;
        }[];
      };
      onchainActivity: {
        walletAge: {
          minCreatedTime: number;
          maxCreatedTime: null | number;
        };
        transactionsIn30Days: {
          min: number;
          max: null | number;
        };
        includedProtocols: {
          projectId: string;
          name: string;
          imgUrl: string;
        }[];
        excludedProtocols: {
          projectId: string;
          name: string;
          imgUrl: string;
        }[];
        activeChains: {
          id: string;
          name: string;
          nativeTokenId: string;
          nativeTokenSymbol: string;
          imgUrl: string;
          explorerUrl: string;
          type: string;
        }[];
      };
    };
    numberOfAudiences: number;
  }[];
};

export async function fetchSegmentList({ id }: { id: string }) {
  return await getAuthAPI<RTSegmentList>(baseUrlCDP + `/${id}/engagement/segments`);
}
