/* eslint-disable no-unused-vars */
export type localStorageType = {
  jwt: string;
};

import { EIP1193Provider } from "viem";
import { UnionEvaluate } from "viem/_types/types/utils";
import { Tron } from "./wagmi/connectors/tronLink";

export type WalletProvider = UnionEvaluate<
  EIP1193Provider & {
    [key: string]: true | undefined;
  } & {
    providers?: WalletProvider[] | undefined;
    /** Only exists in MetaMask as of 2022/04/03 */
    _events?: { connect?: (() => void) | undefined } | undefined;
    /** Only exists in MetaMask as of 2022/04/03 */
    _state?:
      | {
          accounts?: string[];
          initialized?: boolean;
          isConnected?: boolean;
          isPermanentlyDisconnected?: boolean;
          isUnlocked?: boolean;
        }
      | undefined;
  }
>;

interface RequestArguments {
  readonly method: string;
  readonly params?: unknown[] | object;
}

declare global {
  interface Window {
    coin98?: true;
    tron?: Tron;
    tronLink: any;
  }
}

declare module "*.webm" {
  const src: string;
  export default src;
}
