import { getAPIWithKey } from "@centic-scoring/api/fetchFunctions";
import { ApiRecommendation } from "./types";
import { baseUrl } from "../urls";
import { postAPI } from "@centic-scoring/api/fetchFunctions";

export async function fetchRecommendation({ limit }: { limit?: number }) {
  return await getAPIWithKey<ApiRecommendation>(
    baseUrl + `/v3/recommend/trending/assets?limit=${limit || ""}}`,
    {}
  );
}

export type KOLRecommendationRequest = {
  top_k: number;
  weights: number[];
  override_summary: string;
  override_categories: string[];
};

export type KOLRecommendationResponse = {
  status: string;
  message: string;
  data: {
    recommendations: {
      kol_id: string;
      score: number;
      displayName: string;
      url: string;
      followersCount: number;
      profileImageUrl: string;
      verified: boolean;
      location: string;
    }[];
    total_found: number;
  };
};

export const fetchKOLRecommendation = async (body: KOLRecommendationRequest) => {
  return await postAPI<KOLRecommendationResponse>(
    "http://0.0.0.0:8096/v3/trane111/kol-recommendation",
    {
      body: JSON.stringify(body),
    }
  );
};
