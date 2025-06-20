import { AFFILIATE_API } from "@centic-scoring/api/fetchFunctions";
import { queryParams } from "@centic-scoring/api/ultils";
import { TAmbassadorsSlice } from "@centic-scoring/redux/slices/ambassadors";

export type RTAmbassadorListItem = {
  name: string;
  id: string;
  username: string;
  messagesCount: number;
  reactsCount: number;
  repliesCount: number;
  lastInteractedAt: number;
  url: string;
  favored: boolean;
};

export const searchAmbassadorLists = async (
  id: string,
  filter?: TAmbassadorsSlice["ambassadorsFilter"]
) => {
  return await AFFILIATE_API.get<{ numberOfDocs: number; data: RTAmbassadorListItem[] }>(
    `/${id}/affiliate/ambassadors/search`,
    filter
  );
};

export const ambassadorFavorite = async (
  id: string,
  filter?: TAmbassadorsSlice["ambassadorsFilter"]
) => {
  return await AFFILIATE_API.get<{ numberOfDocs: number; data: RTAmbassadorListItem[] }>(
    `/${id}/affiliate/ambassadors/favorite`,
    filter
  );
};

export type RTAmbassOfferInfo = {
  numberOfDocs: number;
  data: {
    id: string;
    ambassadorName: string;
    linkOffer: string;
    value: number;
    startDate: number;
    duration: string;
    status: string;
  }[];
};

export const fetchAmbassOfferInfo = async ({
  keyword,
  pageSize,
  page,
  id,
}: {
  keyword?: string;
  pageSize?: number;
  page?: number;
  id: string;
}) => {
  return await AFFILIATE_API.get<RTAmbassOfferInfo>(
    `/${id}/affiliate/ambassadors/offers${queryParams({ keyword, pageSize, page })}`
  );
};

export type RTAmbassadorTask = {
  taskTypes: string[];
  taskDetail: {
    [task: string]: {
      taskId: string;
      taskType: string;
      taskName: string;
      description: string;
    }[];
  };
};

export async function fetchAmbassadorTask() {
  return await AFFILIATE_API.get<RTAmbassadorTask>(`/list-ambassador-task`);
}

export async function addToFavorite({ id, ambassId }: { id: string; ambassId: string }) {
  return await AFFILIATE_API.put(`/${id}/affiliate/ambassadors/favorite/${ambassId}`);
}

export async function removeFavorite({ id, ambassId }: { id: string; ambassId: string }) {
  return await AFFILIATE_API.delete(`/${id}/affiliate/ambassadors/favorite/${ambassId}`);
}
