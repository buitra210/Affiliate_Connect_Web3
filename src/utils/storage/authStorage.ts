const JWT_PATH_CONFIG = {
  cdp: "jwt",
  portfolio: "apiKey",
  twitterSecretToken: "twitterSecretToken",
  kol: "kol_jwt",
  ambassadors: "ambass_jwt",
  affiliate: "affiliate_jwt",
  privateSale: "presale_jwt",
  strategicSale: "strategic_jwt",
};

const STORAGE_CONFIG = { skipWalletVerification: "centic-skip-wallet-verification" };
const CONFIG = { ...STORAGE_CONFIG, ...JWT_PATH_CONFIG };

export function getJwt(type: keyof typeof JWT_PATH_CONFIG) {
  return getStorageItem(JWT_PATH_CONFIG[type]);
}

export function setAPIJwt(type: keyof typeof JWT_PATH_CONFIG, value: string) {
  return setStorageItem(JWT_PATH_CONFIG[type], value);
}

export function setAPPStorage(type: keyof typeof CONFIG, value: string) {
  return setStorageItem(CONFIG[type], value);
}

export function getAPPStorage(type: keyof typeof CONFIG) {
  return getStorageItem(CONFIG[type]);
}
export function removeAPPStorage(type: keyof typeof CONFIG) {
  return removeStorageItem(CONFIG[type]);
}

export function getAPIJwt(type: keyof typeof JWT_PATH_CONFIG) {
  return getStorageItem(JWT_PATH_CONFIG[type]);
}

export function setAPIJwtWithKey(type: keyof typeof JWT_PATH_CONFIG, key: string, value: string) {
  return setStorageItem(JWT_PATH_CONFIG[type] + "_" + key || "", value);
}

export function getAPIJwtWithKey(type: keyof typeof JWT_PATH_CONFIG, key: string) {
  return getStorageItem(JWT_PATH_CONFIG[type] + "_" + key || "");
}

export function getAPIWithPrefix(type: keyof typeof JWT_PATH_CONFIG) {
  const key = Object.keys(localStorage).find((k) => k?.startsWith(JWT_PATH_CONFIG[type]));
  if (key) {
    return getStorageItem(key || "");
  } else {
    return "";
  }
}

export function getStorageWithPrefix(prefix: string) {
  const key = Object.keys(localStorage).find((k) => k?.startsWith(prefix));
  if (key) {
    return getStorageItem(key || "");
  } else {
    return "";
  }
}

export function deleteAPIJwt(type: keyof typeof JWT_PATH_CONFIG) {
  const keyToDelete = Object.keys(localStorage).filter((k) => k?.includes(JWT_PATH_CONFIG[type]));
  if (keyToDelete?.length > 0) {
    return keyToDelete.forEach((k) => {
      return removeStorageItem(k || "");
    });
  }
}

export function getStorageItem(key: string) {
  if (!key) {
    return undefined;
  }
  return localStorage.getItem(key);
}

export function setStorageItem(key: string, value: string) {
  if (!key || !value) {
    return;
  }
  localStorage.setItem(key, value);
}

export function removeStorageItem(key: string) {
  if (!key) {
    return;
  }
  localStorage.removeItem(key);
}
