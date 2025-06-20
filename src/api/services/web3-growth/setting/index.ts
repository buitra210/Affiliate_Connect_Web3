import { baseUrlCDP } from "../../urls";
import {
  deleteAuthAPI,
  getAuthAPI,
  postAuthAPI,
  putAuthAPI,
} from "@centic-scoring/api/fetchAuthFunctions";

export type DappSetting = {
  id: string;
  chains: Array<string>;
  name: string;
  description: string | null;
  numberOfAddresses: number;
  tvl: number | null;
};

export type DappsSetting = {
  numberOfDocs: number;
  docs: Array<DappSetting>;
};

export type AddressSetting = {
  chain: string;
  address: string;
  name: string;
  dapp: string | null;
  dappId: string;
  tags: { [key: string]: string };
  last30DaysNumberOfUsers: number | null;
  isContract: boolean;
  abi: string | null;
};

export type AddressesSetting = {
  numberOfDocs: number;
  docs: Array<AddressSetting>;
};

export type SocialMediaSetting = {
  id: string;
  platform: string;
  name: string;
  url: string;
  avatar: string | null;
  numberOfAudiences: number;
  authenticated: boolean;
  type: string;
};

export type SocialsMediaSetting = {
  numberOfDocs: number;
  totalFollowers: number;
  docs: Array<SocialMediaSetting>;
};

export async function fetchDappsSetting(id: string) {
  const response = await getAuthAPI<DappsSetting>(baseUrlCDP + `/${id}/setting/dapps`, {});
  return response;
}

export async function fetchAddressesSetting(id: string) {
  const response = await getAuthAPI<AddressesSetting>(baseUrlCDP + `/${id}/setting/addresses`, {});
  return response;
}

export async function fetchSocialsMediaSetting(id: string) {
  const response = await getAuthAPI<SocialsMediaSetting>(
    baseUrlCDP + `/${id}/setting/social-media`,
    {}
  );
  return response;
}

export type RTAddDapps = {};
export async function addDapps({
  chains,
  dappId,
  description,
  id,
  name,
}: {
  id: string;
  dappId: string;
  name: string;
  chains: string[];
  description: string;
}) {
  return await postAuthAPI<RTAddDapps>(baseUrlCDP + `/${id}/setting/dapps`, {
    body: JSON.stringify({
      id: dappId,
      chains,
      description,
      name,
    }),
  });
}
export type RTEditDapps = {};
export async function editDapps({
  chains,
  dappId,
  description,
  id,
  name,
}: {
  id: string;
  dappId: string;
  name?: string;
  chains?: string[];
  description?: string;
}) {
  return await putAuthAPI<RTEditDapps>(baseUrlCDP + `/${id}/setting/dapps/${dappId}`, {
    body: JSON.stringify({
      chains,
      description,
      name,
    }),
  });
}

export type RTAddAddresses = {};
export async function addAddresses({
  id,
  name,
  abi,
  abiFileUrl,
  address,
  chainId,
  dapp,
  tags,
}: {
  id: string;
  address: string;
  chainId: string;
  name: string;
  dapp: string;
  tags: string[];
  abi?: string;
  abiFileUrl?: string;
}) {
  return await postAuthAPI<RTAddAddresses>(baseUrlCDP + `/${id}/setting/addresses`, {
    body: JSON.stringify({
      address,
      chainId,
      name,
      dapp,
      tags,
      abi,
      abiFileUrl,
    }),
  });
}

export type RTEditAddress = {};
export async function editAddresses({
  id,
  name,
  abi,
  abiFileUrl,
  address,
  chainId,
  dapp,
  tags,
}: {
  id: string;
  address: string;
  chainId: string;
  name: string;
  dapp: string;
  tags: string[];
  abi?: string;
  abiFileUrl?: string;
}) {
  const addressKey = `${chainId}_${address}`;
  return await putAuthAPI<RTAddAddresses>(baseUrlCDP + `/${id}/setting/addresses/${addressKey}`, {
    body: JSON.stringify({
      name,
      dapp,
      tags,
      abi,
      abiFileUrl,
    }),
  });
}

export type RTDeleteDapp = {};
export async function deleteDapp({ dappId, id }: { id: string; dappId: string }) {
  return await deleteAuthAPI<RTDeleteDapp>(baseUrlCDP + `/${id}/setting/dapps/${dappId}`);
}

export type RTDeleteAddress = {};
export async function deleteAddress({
  address,
  chainId,
  id,
}: {
  address: string;
  chainId: string;
  id: string;
}) {
  return await deleteAuthAPI<RTDeleteAddress>(
    baseUrlCDP + `/${id}/setting/addresses/${chainId}_${address}`
  );
}

export type RTImportAddress = {};
export async function importAddress({ fileUrl, id }: { fileUrl: string; id: string }) {
  return postAuthAPI<RTImportAddress>(baseUrlCDP + `/${id}/setting/addresses/import-file`, {
    body: JSON.stringify({
      fileUrl: fileUrl,
      mode: "update",
      onDuplicate: "replace",
    }),
  });
}

export type RTAddSocialMedia = {};
export async function addSocialMedia({
  id,
  name,
  platform,
  url,
  accountId,
  announcement,
}: {
  platform: string;
  id: string;
  name: string;
  url?: string;
  accountId: string;
  announcement?: boolean;
}) {
  return await postAuthAPI<RTAddSocialMedia>(baseUrlCDP + `/${id}/setting/social-media`, {
    body: JSON.stringify({
      name,
      platform,
      id: accountId,
      url,
      announcement,
    }),
  });
}

export type RTRemoveSocialMedia = {};
export async function removeSocialMedia({
  accountId,
  id,
  platform,
}: {
  id: string;
  platform: string;
  accountId: string;
}) {
  return await deleteAuthAPI<RTRemoveSocialMedia>(
    baseUrlCDP + `/${id}/setting/social-media/${platform}/${accountId}`
  );
}

export type RTEditSocialMedia = {};
export async function editSocialMedia({
  id,
  name,
  platform,
  url,
  accountId,
}: {
  platform: string;
  id: string;
  name?: string;
  url?: string;
  accountId?: string;
}) {
  return await putAuthAPI<RTEditSocialMedia>(
    baseUrlCDP + `/${id}/setting/social-media/${platform}/${accountId}`,
    {
      body: JSON.stringify({
        name,
        url,
      }),
    }
  );
}
