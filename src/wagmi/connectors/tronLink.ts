import { RequestArguments } from "@centic-scoring/global";
// import { sleep } from "@centic-scoring/hooks/useScoreDistribution";
// import {
//   AddEthereumChainParameter,
//   ProviderRpcError,
//   ResourceUnavailableRpcError,
//   RpcError,
//   SwitchChainError,
//   UserRejectedRequestError,
//   numberToHex,
// } from "viem";
// import { ChainNotConfiguredError, Connector } from "wagmi";
// import { ProviderNotFoundError, createConnector } from "wagmi";

// type TronLinkParameters = {
//   icon?: string;
//   shimDisconnect?: boolean;
//   websiteIcon?: string;
//   websiteName?: string;
// };

export interface Tron {
  // eslint-disable-next-line no-unused-vars
  on?: (...args: any[]) => void;
  // eslint-disable-next-line no-unused-vars
  removeListener?: (...args: any[]) => void;
  // eslint-disable-next-line no-unused-vars
  request: (args: RequestArguments) => Promise<any>;
  tronWeb: any;
  isTronLink?: true;
}

// type Provider = Tron | undefined;

// export async function getTronWeb() {
//   let tronWeb;
//   if (window.tron?.tronWeb) {
//     tronWeb = window.tron.tronWeb;
//   }
//   return tronWeb;
// }

// export function getTronLinkProvider() {
//   if (typeof window === "undefined" || !window.tron) return;
//   if (window.tron.isTronLink) {
//     return window.tron;
//   }
//   return;
// }

// export function tronLinkConnector(parameters: TronLinkParameters = {}) {
//   const { icon, shimDisconnect = true } = parameters;
//   const connectorId = "tronLink";
//   type StorageItem = {
//     // eslint-disable-next-line no-unused-vars
//     [key in "tronLink.connected" | "tronLink.disconnected" | `${string}.shimDisconnected`]: true;
//   };

//   let accountsChanged: Connector["onAccountsChanged"] | undefined;
//   let chainChanged: Connector["onChainChanged"] | undefined;
//   let connect: Connector["onConnect"] | undefined;
//   let disconnect: Connector["onDisconnect"] | undefined;

//   //@ts-ignore
//   return createConnector<Provider, {}, StorageItem>((config) => {
//     return {
//       icon: icon || "",
//       id: connectorId,
//       name: "Tron Link",
//       type: "tronLink",
//       async setup() {
//         const provider = await this.getProvider();
//         if (provider) provider?.on!("connect", this?.onConnect?.bind(this));
//       },
//       async getProvider() {
//         console.log("🚀 ~ getProvider ~ getProvider:", "getProvider");
//         await sleep(500);
//         let provider = getTronLinkProvider();

//         if (provider && !provider.removeListener) {
//           // Try using `off` handler if it exists, otherwise noop
//           if ("off" in provider && typeof provider.off === "function")
//             //@ts-ignore
//             provider.removeListener = provider.off as typeof provider.removeListener;
//           else provider.removeListener = () => {};
//         }

//         return provider;
//       },
//       async connect({ chainId, isReconnecting }: any) {
//         console.log("🚀 ~ connect ~ connect:", "connect");
//         let accounts: readonly string[] = [];
//         const provider = await this.getProvider();
//         if (isReconnecting) accounts = await this.getAccounts().catch(() => []);
//         else if (shimDisconnect) {
//           // Attempt to show another prompt for selecting account if `shimDisconnect` flag is enabled
//           try {
//             const permissions = await provider?.request({
//               method: "tron_requestAccounts",
//               params: [{ eth_accounts: {} }],
//             });
//             accounts = permissions[0]?.caveats?.[0]?.value as `0x${string}`[];
//           } catch (err) {
//             console.log("🚀 ~ connect ~ err:", err);
//             const error = err as RpcError;
//             // Not all injected providers support `wallet_requestPermissions` (e.g. MetaMask iOS).
//             // Only bubble up error if user rejects request
//             if (error.code === UserRejectedRequestError.code)
//               throw new UserRejectedRequestError(error);
//             // Or prompt is already open
//             if (error.code === ResourceUnavailableRpcError.code) throw error;
//           }
//         }
//         try {
//           if (!accounts?.length && !isReconnecting) {
//             // const requestedAccounts: string[] = await provider?.request({
//             //   method: "eth_requestAccounts",
//             // });
//             const requestedAccounts = await this.getAccounts();
//             accounts = requestedAccounts as `0x${string}`[];
//           }

//           if (connect) {
//             provider?.removeListener!("connect", connect);
//             connect = undefined;
//           }
//           if (!accountsChanged) {
//             accountsChanged = this.onAccountsChanged.bind(this);
//             provider?.on!("accountsChanged", accountsChanged);
//           }
//           if (!chainChanged) {
//             chainChanged = this.onChainChanged.bind(this);
//             provider?.on!("chainChanged", chainChanged);
//           }
//           if (!disconnect) {
//             disconnect = this.onDisconnect.bind(this);
//             provider?.on!("disconnect", disconnect);
//           }

//           // Switch to chain if provided
//           let currentChainId = await this.getChainId();
//           if (chainId && currentChainId !== chainId) {
//             const chain = await this.switchChain!({ chainId }).catch((error) => {
//               if (error.code === UserRejectedRequestError.code) throw error;
//               return { id: currentChainId };
//             });
//             currentChainId = chain?.id ?? currentChainId;
//           }
//         } catch (error) {
//           // if (this.isUserRejectedRequestError(error)) throw new UserRejectedRequestError(error);
//           if ((error as RpcError).code === -32002)
//             throw new ResourceUnavailableRpcError(error as Error);
//           throw error;
//         }
//         if (shimDisconnect) {
//           await config.storage?.removeItem(`${connectorId}.disconnected`);
//         }
//         return { accounts: accounts as `0x${string}`[], chainId: 0 };
//       },
//       async disconnect() {
//         console.log("🚀 ~ disconnect ~ disconnect:", "disconnect");
//         const provider = await this.getProvider();
//         if (!provider) throw new ProviderNotFoundError();

//         // Manage EIP-1193 event listeners
//         if (chainChanged) {
//           provider?.removeListener!("chainChanged", chainChanged);
//           chainChanged = undefined;
//         }
//         if (disconnect) {
//           provider?.removeListener!("disconnect", disconnect);
//           disconnect = undefined;
//         }
//         if (!connect) {
//           connect = this?.onConnect?.bind(this);
//           provider?.on!("connect", connect);
//         }
//         if (shimDisconnect) {
//           await config.storage?.setItem(`${connectorId}.disconnected`, true);
//         }
//         await config.storage?.setItem(`${connectorId}.shimDisconnected`, true);
//       },
//       async getAccounts() {
//         console.log("🚀 ~ getAccounts ~ getAccounts:", "getAccounts");
//         const provider = await this.getProvider();
//         if (!provider) throw new ProviderNotFoundError();

//         const accounts = (await provider.request({ method: "eth_requestAccounts" })) as string[];
//         return accounts.map((x: string) => String(x));
//       },
//       async getChainId() {
//         console.log("🚀 ~ getChainId ~ getChainId:", "getChainId");
//         const provider = await this.getProvider();
//         let chainId: number = 728126428;
//         try {
//           chainId = await provider?.request({ method: "eth_chainId" });
//         } catch (error) {
//           //pass
//         }
//         return Number(chainId);
//       },
//       async isAuthorized() {
//         console.log("🚀 ~ isAuthorized ~ isAuthorized:", "isAuthorized");
//         // return false;
//         try {
//           const isDisconnected =
//             // If shim exists in storage, connector is disconnected
//             shimDisconnect && (await config.storage?.getItem(`${connectorId}.disconnected`));
//           if (isDisconnected) return false;
//           const isRecent = localStorage.getItem("wagmi.recentConnectorId");
//           if (String(isRecent).trim() === `"tronLink"`) {
//             const accounts = await this.getAccounts();
//             return !!accounts.length;
//           } else {
//             return false;
//           }
//         } catch {
//           return false;
//         }
//       },
//       async switchChain({ addEthereumChainParameter, chainId }) {
//         console.log("🚀 ~ switchChain ~ switchChain:", "switchChain");
//         const provider = await this.getProvider();

//         const chain = config.chains.find((x) => x.id === chainId);
//         if (!chain) throw new SwitchChainError(new ChainNotConfiguredError());

//         try {
//           provider?.request!({
//             method: "wallet_switchEthereumChain",
//             params: [{ chainId: numberToHex(chainId) }],
//           });
//           return chain;
//         } catch (err) {
//           const error = err as RpcError;

//           // Indicates chain is not added to provider
//           if (
//             error.code === 4902 ||
//             // Unwrapping for MetaMask Mobile
//             // https://github.com/MetaMask/metamask-mobile/issues/2944#issuecomment-976988719
//             (error as ProviderRpcError<{ originalError?: { code: number } }>)?.data?.originalError
//               ?.code === 4902
//           ) {
//             try {
//               const { default: blockExplorer, ...blockExplorers } = chain.blockExplorers ?? {};
//               let blockExplorerUrls: string[] | undefined;
//               if (addEthereumChainParameter?.blockExplorerUrls)
//                 blockExplorerUrls = addEthereumChainParameter.blockExplorerUrls;
//               else if (blockExplorer)
//                 blockExplorerUrls = [
//                   blockExplorer.url,
//                   ...Object.values(blockExplorers).map((x) => x.url),
//                 ];

//               let rpcUrls: readonly string[];
//               if (addEthereumChainParameter?.rpcUrls?.length)
//                 rpcUrls = addEthereumChainParameter.rpcUrls;
//               else rpcUrls = [chain.rpcUrls.default?.http[0] ?? ""];

//               const addEthereumChain = {
//                 blockExplorerUrls,
//                 chainId: numberToHex(chainId),
//                 chainName: addEthereumChainParameter?.chainName ?? chain.name,
//                 iconUrls: addEthereumChainParameter?.iconUrls,
//                 nativeCurrency: addEthereumChainParameter?.nativeCurrency ?? chain.nativeCurrency,
//                 rpcUrls,
//               } satisfies AddEthereumChainParameter;
//               await provider?.request!({
//                 method: "wallet_addEthereumChain",
//                 params: [addEthereumChain],
//               });
//               const currentChainId = await this.getChainId();
//               if (currentChainId !== chainId)
//                 throw new UserRejectedRequestError(
//                   new Error("User rejected switch after adding network.")
//                 );
//               return chain;
//             } catch (error) {
//               throw new UserRejectedRequestError(error as Error);
//             }
//           }

//           if (error.code === UserRejectedRequestError.code)
//             throw new UserRejectedRequestError(error);
//           throw new SwitchChainError(error);
//         }
//       },
//       async onAccountsChanged(accounts) {
//         console.log("🚀 ~ onAccountsChanged ~ onAccountsChanged:", "onAccountsChanged");
//         // Disconnect if there are no accounts
//         if (accounts.length === 0) this.onDisconnect();
//         else if (config.emitter.listenerCount("connect")) {
//           const chainId = (await this.getChainId()).toString();
//           this.onConnect!({ chainId });
//           await config.storage?.removeItem(`${connectorId}.shimDisconnected`);
//         }
//       },
//       async onChainChanged() {
//         console.log("🚀 ~ onChainChanged ~ onChainChanged:", "onChainChanged");
//         console.log("chain changed");
//       },
//       async onConnect(connectInfo) {
//         console.log("🚀 ~ onConnect ~ onConnect:", "onConnect");
//         const accounts = await this.getAccounts();
//         if (accounts.length === 0) return;

//         const chainId = Number(connectInfo.chainId);
//         config.emitter.emit("connect", { accounts, chainId });

//         const provider = await this.getProvider();
//         if (provider) {
//           provider?.removeListener!("connect", this?.onConnect?.bind(this));
//           provider?.on!("accountsChanged", this.onAccountsChanged.bind(this) as any);
//           provider?.on!("chainChanged", this.onChainChanged as any);
//           provider?.on!("disconnect", this.onDisconnect.bind(this) as any);
//         }
//       },
//       async onDisconnect() {
//         console.log("🚀 ~ onDisconnect ~ onDisconnect:", "onDisconnect");
//         const provider = await this.getProvider();
//         config.emitter.emit("disconnect");
//         if (provider) {
//           if (chainChanged) {
//             provider.removeListener!("chainChanged", chainChanged);
//             chainChanged = undefined;
//           }
//           if (disconnect) {
//             provider.removeListener!("disconnect", disconnect);
//             disconnect = undefined;
//           }
//           if (!connect) {
//             connect = this.onConnect?.bind(this);
//             provider.on!("connect", connect);
//           }
//         }
//       },
//     };
//   });
// }
