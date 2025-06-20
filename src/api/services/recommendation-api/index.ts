import { getAPIWithKey } from "@centic-scoring/api/fetchFunctions";
import { ApiRecommendation } from "./types";
import { baseUrl } from "../urls";

export async function fetchRecommendation({ limit }: { limit?: number }) {
  return await getAPIWithKey<ApiRecommendation>(
    baseUrl + `/v3/recommend/trending/assets?limit=${limit || ""}}`,
    {}
  );
}
