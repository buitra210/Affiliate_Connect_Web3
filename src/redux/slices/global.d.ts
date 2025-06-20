import { StateStatus } from "@centic-scoring/components/component";

export interface DataWithStatus<T> {
  data?: T;
  status: StateStatus;
  lastFetched?: number;
  cacheTime?: number;
}
