import { getAPIWithKey } from "@centic-scoring/api/fetchFunctions";
import { ApiSearch } from "./types";
import { baseUrl } from "../urls";

export async function fetchSearchResults({
  keyword,
  type,
  projectType,
  chain,
}: {
  keyword: string;
  type?: string;
  projectType?: string;
  chain?: string;
}) {
  return getAPIWithKey<ApiSearch>(
    baseUrl +
      `/search/entities-and-cdp-projects?keyword=${keyword || ""}&type=${type || ""}&projectType=${
        projectType || ""
      }&chain=${chain || ""}`,
    {}
  );
}
