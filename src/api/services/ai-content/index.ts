import { getPortfolioAPI } from "@centic-scoring/api/fetchFunctions";

export type RTGraphComments = {
  content: string;
};

type GraphCommentInput = {
  id: string;
  graphName: string;
  tokenId?: string;
  retry?: boolean;
  dapps?: string;
  chainId?: string;
  contract?: string;
  startTime?: number;
  endTime?: number;
  timeRange?: string;
  unitTimeRange?: string;
  timeGap?: string;
};
export async function fetchGraphComment({
  graphName,
  id,
  chainId,
  contract,
  dapps,
  endTime,
  retry,
  startTime,
  tokenId,
  timeGap,
  timeRange,
  unitTimeRange,
}: GraphCommentInput) {
  return await getPortfolioAPI<RTGraphComments>(`/data/${id}/dapp-users/get-comment`, {
    entity: graphName,
    tokenId,
    retry,
    dapps,
    chainId,
    contract,
    startTime,
    endTime,
    timeGap,
    timeRange,
    unitTimeRange,
  });
}
