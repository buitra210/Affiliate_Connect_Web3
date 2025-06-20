export type TokenSearchResult = {
  id: string;
  type: "token";
  name: string;
  symbol: string;
  imgUrl: string;
  tokenHealth: number | null;
  projectId?: string;
};

export type ProjectSearchResult = {
  id: string;
  type: "project";
  name: string;
  imgUrl: string;
  projectType: string;
  projectId?: string;
};

export type AddressSearchResult = {
  id: string;
  type: string;
  name: string;
  address: string;
  imgUrl: string;
  projectId?: string;
};

export type CDPSearchResult = {
  id: string;
  name: string;
  type: string;
  imgUrl: string;
  category: string;
  projectId?: string;
};

export type SearchResult = {
  tokens: TokenSearchResult[];
  nfts: ProjectSearchResult[];
  exchanges: ProjectSearchResult[];
  defi: ProjectSearchResult[];
  addresses: AddressSearchResult[];
  cdp: CDPSearchResult[];
};

export type ApiSearch = {
  keyword: string;
  results: SearchResult;
};
