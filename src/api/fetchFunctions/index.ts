import { RequestInit } from "next/dist/server/web/spec-extension/request";
import { baseKOLsUrl, baseUrl, baseURLAirdrop, baseUrlCDP } from "../services/urls";
import { queryParams, ValueType } from "../ultils";
import { deleteAuthAPI, getAuthAPI, postAuthAPI, putAuthAPI } from "../fetchAuthFunctions";
import { getAPIWithPrefix } from "@centic-scoring/utils/storage/authStorage";

export async function getAPI<ReturnType>(
  path: string,
  init?: RequestInit | undefined
): Promise<ReturnType> {
  const res = await fetch(path, {
    method: "GET",
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer",
    ...init,
  });
  let data;
  try {
    data = await res.json();
  } catch (error) {
    // pass
  }
  if (res.ok) {
    return data;
  }
  throw Error(data?.message || res.statusText);
  //pass error to calling function
}

export async function postAPI<ReturnType>(
  path: string,
  init: RequestInit | undefined
): Promise<ReturnType> {
  const res = await fetch(path, {
    method: "POST",
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer",
    ...init,
  });
  let data;
  try {
    data = await res.json();
  } catch (error) {
    // pass
  }
  if (res.ok) {
    return data;
  }
  throw Error(data?.message || res.statusText);
  //pass error to calling function
}

export async function putAPI<ReturnType>(
  path: string,
  init: RequestInit | undefined
): Promise<ReturnType> {
  const res = await fetch(path, {
    method: "PUT",
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer",
    ...init,
  });
  let data;
  try {
    data = await res.json();
  } catch (error) {
    // pass
  }
  if (res.ok) {
    return data;
  }
  throw Error(data?.message || res.statusText);
  //pass error to calling function
}

export async function deleteAPI<ReturnType>(
  path: string,
  init: RequestInit | undefined
): Promise<ReturnType> {
  const res = await fetch(path, {
    method: "DELETE",
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer",
    ...init,
  });
  let data;
  try {
    data = await res.json();
  } catch (error) {
    // pass
  }
  if (res.ok) {
    return data;
  }
  throw Error(data?.message || res.statusText);
  //pass error to calling function
}

//FETCH FUNCTION FOR PORTFOLIO APIs
export async function getAPIWithKey<ReturnType>(
  path: string,
  init?: RequestInit | undefined
): Promise<ReturnType> {
  const res = await fetch(path, {
    method: "GET",
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      "x-apikey": "dXoriON31OO1UopGakYO9f3tX2c4q3oO7mNsjB2nJsKnW406",
      ...init?.headers,
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer",
  });
  let data;
  try {
    data = await res.json();
  } catch (error) {
    // pass
  }
  if (res.ok) {
    return data;
  }
  throw Error(data?.message || res.statusText);
  //pass error to calling function
}
export async function postAPIWithKey<ReturnType>(
  path: string,
  init: RequestInit | undefined
): Promise<ReturnType> {
  const res = await fetch(path, {
    method: "POST",
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      "x-apikey": "dXoriON31OO1UopGakYO9f3tX2c4q3oO7mNsjB2nJsKnW406",
      ...init?.headers,
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer",
    ...init,
  });
  let data;
  try {
    data = await res.json();
  } catch (error) {
    // pass
  }
  if (res.ok) {
    return data;
  }
  throw Error(data?.message || res.statusText);
  //pass error to calling function
}
export async function putAPIWithKey<ReturnType>(
  path: string,
  init: RequestInit | undefined
): Promise<ReturnType> {
  const res = await fetch(path, {
    method: "PUT",
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      "x-apikey": "dXoriON31OO1UopGakYO9f3tX2c4q3oO7mNsjB2nJsKnW406",
      ...init?.headers,
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer",
  });
  let data;
  try {
    data = await res.json();
  } catch (error) {
    // pass
  }
  if (res.ok) {
    return data;
  }
  throw Error(data?.message || res.statusText);
  //pass error to calling function
}
export async function getPortfolioAPI<ReturnType>(
  path: string,
  params?: { [key: string]: number | string | boolean | undefined }
) {
  return await getAPIWithKey<ReturnType>(baseUrl + `${path}${queryParams(params)}`);
}
export async function getCDPAPI<ReturnType>(
  path: string,
  params?: { [key: string]: number | string | boolean | undefined | string[] | number[] }
) {
  return await getAuthAPI<ReturnType>(baseUrlCDP + `${path}${queryParams(params)}`);
}
export async function postCDPAPI<ReturnType>(path: string, init: RequestInit | undefined) {
  return await postAuthAPI<ReturnType>(baseUrlCDP + `${path}`, init);
}

type ParamsType = { [key: string]: ValueType | ValueType[] };

export const AFFILIATE_API = {
  get: async function <ReturnType>(path: string, params?: ParamsType) {
    const filteredParam = Object.fromEntries(
      Object.entries(params || {}).filter(([, value]) => value !== undefined && value !== "")
    );
    // return await getAuthAPI<ReturnType>(baseKOLsUrl + `${path}?${queryParams(params)}`);
    return await getAuthAPI<ReturnType>(baseKOLsUrl + `${path}${queryParams(filteredParam)}`);
  },
  post: async function <ReturnType>(path: string, init: RequestInit | undefined) {
    return await postAuthAPI<ReturnType>(baseKOLsUrl + `${path}`, init);
  },
  put: async function <ReturnType>(path: string, params?: ParamsType) {
    const filteredParam = Object.fromEntries(
      Object.entries(params || {}).filter(([, value]) => value !== undefined)
    );
    return await putAuthAPI<ReturnType>(baseKOLsUrl + `${path}`, {
      body: JSON.stringify(filteredParam),
    });
  },
  delete: async function <ReturnType>(path: string, params?: ParamsType) {
    const filteredParam = Object.fromEntries(
      Object.entries(params || {}).filter(([, value]) => value !== undefined)
    );
    // return await getAuthAPI<ReturnType>(baseKOLsUrl + `${path}?${queryParams(params)}`);
    return await deleteAuthAPI<ReturnType>(baseKOLsUrl + `${path}`, {
      body: JSON.stringify(filteredParam),
    });
  },
};

export const PORTFOLIO_API = {
  get: async function <ReturnType>(
    path: string,
    init?: RequestInit | undefined
  ): Promise<ReturnType> {
    const apiKey = getAPIWithPrefix("portfolio");
    const res = await fetch(baseUrl + path, {
      method: "GET",
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        "x-apikey": `${apiKey}`,
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer",
      ...init,
    });
    let data;
    try {
      data = await res.json();
    } catch (error) {
      // pass
    }
    if (res.ok) {
      return data;
    }
    throw Error(data?.message || res.statusText);
    //pass error to calling function
  },
  post: async function <ReturnType>(
    path: string,
    init: RequestInit | undefined
  ): Promise<ReturnType> {
    const apiKey = getAPIWithPrefix("portfolio");
    const res = await fetch(baseUrl + path, {
      ...init,
      method: "POST",
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        "x-apikey": `${apiKey}`,
        ...(init?.headers || {}),
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer",
    });
    let data;
    try {
      data = await res.json();
    } catch (error) {
      // pass
    }

    if (res.ok) {
      return data;
    }
    throw Error(data?.message || res.statusText);
    //pass error to calling function
  },
  postFile: async function <ReturnType>(
    path: string,
    init: RequestInit | undefined
  ): Promise<ReturnType> {
    const apiKey = getAPIWithPrefix("portfolio");
    const res = await fetch(baseUrl + path, {
      ...init,
      method: "POST",
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "x-apikey": `${apiKey}`,
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer",
    });
    let data;
    try {
      data = await res.json();
    } catch (error) {
      // pass
    }

    if (res.ok) {
      return data;
    }
    throw Error(data.message || res.statusText);
    //pass error to calling function
  },
  put: async function <ReturnType>(
    path: string,
    init: RequestInit | undefined
  ): Promise<ReturnType> {
    const apiKey = getAPIWithPrefix("portfolio");
    const res = await fetch(baseUrl + path, {
      ...init,
      method: "PUT",
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        "x-apikey": `${apiKey}`,
        ...(init?.headers || {}),
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer",
    });
    let data;
    try {
      data = await res.json();
    } catch (error) {
      // pass
    }

    if (res.ok) {
      return data;
    }
    throw Error(data.message || res.statusText);
    //pass error to calling function
  },
  delete: async function <ReturnType>(
    path: string,
    init?: RequestInit | undefined
  ): Promise<ReturnType> {
    const apiKey = getAPIWithPrefix("portfolio");
    const res = await fetch(baseUrl + path, {
      method: "DELETE",
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        "x-apikey": `${apiKey}`,
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer",
      ...init,
    });
    let data;
    try {
      data = await res.json();
    } catch (error) {
      // pass
    }
    if (res.ok) {
      return data;
    }
    throw Error(data?.message || res.statusText);
    //pass error to calling function
  },
};

export const AIRDROP_API = {
  get: async function <ReturnType>(
    path: string,
    init?: RequestInit | undefined
  ): Promise<ReturnType> {
    const apiKey = getAPIWithPrefix("portfolio");
    const res = await fetch(baseURLAirdrop + path, {
      method: "GET",
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        "x-apikey": `${apiKey}`,
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer",
      ...init,
    });
    let data;
    try {
      data = await res.json();
    } catch (error) {
      // pass
    }
    if (res.ok) {
      return data;
    }
    throw Error(data?.message || res.statusText);
    //pass error to calling function
  },
  post: async function <ReturnType>(
    path: string,
    init: RequestInit | undefined
  ): Promise<ReturnType> {
    const apiKey = getAPIWithPrefix("portfolio");
    const res = await fetch(baseURLAirdrop + path, {
      ...init,
      method: "POST",
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        "x-apikey": `${apiKey}`,
        ...(init?.headers || {}),
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer",
    });
    let data;
    try {
      data = await res.json();
    } catch (error) {
      // pass
    }

    if (res.ok) {
      return data;
    }
    throw Error(data?.message || res.statusText);
    //pass error to calling function
  },
  postFile: async function <ReturnType>(
    path: string,
    init: RequestInit | undefined
  ): Promise<ReturnType> {
    const apiKey = getAPIWithPrefix("portfolio");
    const res = await fetch(baseURLAirdrop + path, {
      ...init,
      method: "POST",
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "x-apikey": `${apiKey}`,
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer",
    });
    let data;
    try {
      data = await res.json();
    } catch (error) {
      // pass
    }

    if (res.ok) {
      return data;
    }
    throw Error(data.message || res.statusText);
    //pass error to calling function
  },
  put: async function <ReturnType>(
    path: string,
    init: RequestInit | undefined
  ): Promise<ReturnType> {
    const apiKey = getAPIWithPrefix("portfolio");
    const res = await fetch(baseURLAirdrop + path, {
      ...init,
      method: "PUT",
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        "x-apikey": `${apiKey}`,
        ...(init?.headers || {}),
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer",
    });
    let data;
    try {
      data = await res.json();
    } catch (error) {
      // pass
    }

    if (res.ok) {
      return data;
    }
    throw Error(data.message || res.statusText);
    //pass error to calling function
  },
  delete: async function <ReturnType>(
    path: string,
    init?: RequestInit | undefined
  ): Promise<ReturnType> {
    const apiKey = getAPIWithPrefix("portfolio");
    const res = await fetch(baseURLAirdrop + path, {
      method: "DELETE",
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        "x-apikey": `${apiKey}`,
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer",
      ...init,
    });
    let data;
    try {
      data = await res.json();
    } catch (error) {
      // pass
    }
    if (res.ok) {
      return data;
    }
    throw Error(data?.message || res.statusText);
    //pass error to calling function
  },
};
