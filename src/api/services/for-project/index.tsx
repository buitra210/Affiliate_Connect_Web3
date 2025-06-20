import { getAuthAPI } from "@centic-scoring/api/fetchAuthFunctions";
import { baseUrlCDP } from "../urls";
import { RTCampaignActionList } from "../web3-growth/campaign";

export type RTUserProject = {
  id: string;
  name: string;
  visible: string;
  imgUrl: string;
  category: string;
  description: string;
  verified: boolean;
  website: string;
  lastDayActiveUsers: number | null;
  monthlyActiveUsers: number;
  statistics: {
    allCampaigns: number;
    ongoingCampaigns: number;
    upcomingCampaigns: number;
    endedCampaigns: number;
    scheduledEvents: number;
  };
  social: {
    twitter: {
      userName: string;
      displayName: string;
      link: string;
    }[];
  };
};
export async function fetchUserProject() {
  return getAuthAPI<RTUserProject>(baseUrlCDP + `/owned`);
}

export type RTEvents = {
  numberOfDocs: number;
  actions: RTCampaignActionList;
};

export async function fetchProjectEvents({
  endTime,
  id,
  startTime,
}: {
  id: string;
  startTime?: number;
  endTime?: number;
}) {
  return getAuthAPI<RTEvents>(
    baseUrlCDP + `/${id}/events?endTime=${endTime || ""}&startTime=${startTime || ""}`
  );
}
