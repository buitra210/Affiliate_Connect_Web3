import { getAPIJwt } from "@centic-scoring/utils/storage/authStorage";
import { RequestInit } from "next/dist/server/web/spec-extension/request";
import { baseKOLsUrl } from "../services/urls";

// FETCH CDP API
export async function getAuthAPI<ReturnType>(
  path: string,
  init?: RequestInit | undefined
): Promise<ReturnType> {
  const jwt = localStorage.getItem("jwt");
  const res = await fetch(path, {
    method: "GET",
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      Authorization: `${jwt}`,
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

export async function postAuthAPI<ReturnType>(
  path: string,
  init: RequestInit | undefined
): Promise<ReturnType> {
  const jwt = localStorage.getItem("jwt");
  const res = await fetch(path, {
    ...init,
    method: "POST",
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      Authorization: `${jwt}`,
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
}

export async function postAuthAPIFile<ReturnType>(
  path: string,
  init: RequestInit | undefined
): Promise<ReturnType> {
  const jwt = localStorage.getItem("jwt");
  const res = await fetch(path, {
    ...init,
    method: "POST",
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      Authorization: `${jwt}`,
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
}

export async function putAuthAPI<ReturnType>(
  path: string,
  init: RequestInit | undefined
): Promise<ReturnType> {
  const jwt = localStorage.getItem("jwt");
  const res = await fetch(path, {
    ...init,
    method: "PUT",
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      Authorization: `${jwt}`,
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
}

export async function deleteAuthAPI<ReturnType>(
  path: string,
  init?: RequestInit | undefined
): Promise<ReturnType> {
  const jwt = localStorage.getItem("jwt");
  const res = await fetch(path, {
    method: "DELETE",
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      Authorization: `${jwt}`,
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

export async function getAuthAPIBlob(path: string, init?: RequestInit | undefined) {
  const jwt = localStorage.getItem("jwt");
  const res = await fetch(path, {
    method: "GET",
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      Authorization: `${jwt}`,
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer",
    ...init,
  });
  let data;
  try {
    data = await res.blob();
  } catch (error) {
    // pass
  }
  if (res.ok) {
    return data;
  }
  throw Error("Error downloading the file");
  //pass error to calling function
}

//FETCH AFFILIATE USER API
export const AFFILIATE_USER_API = {
  get: async function get<ReturnType>(
    path: string,
    init?: RequestInit | undefined
  ): Promise<ReturnType> {
    const jwt = getAPIJwt("affiliate");
    const res = await fetch(baseKOLsUrl + path, {
      method: "GET",
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        Authorization: `${jwt}`,
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
  post: async function post<ReturnType>(
    path: string,
    init: RequestInit | undefined
  ): Promise<ReturnType> {
    const jwt = getAPIJwt("affiliate");
    const res = await fetch(baseKOLsUrl + path, {
      ...init,
      method: "POST",
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        Authorization: `${jwt}`,
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
  postFile: async function postFile<ReturnType>(
    path: string,
    init: RequestInit | undefined
  ): Promise<ReturnType> {
    const jwt = getAPIJwt("affiliate");
    const res = await fetch(baseKOLsUrl + path, {
      ...init,
      method: "POST",
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        Authorization: `${jwt}`,
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
  put: async function put<ReturnType>(
    path: string,
    init: RequestInit | undefined
  ): Promise<ReturnType> {
    const jwt = getAPIJwt("affiliate");
    const res = await fetch(baseKOLsUrl + path, {
      ...init,
      method: "PUT",
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        Authorization: `${jwt}`,
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
    const jwt = getAPIJwt("affiliate");
    const res = await fetch(baseKOLsUrl + path, {
      method: "DELETE",
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        Authorization: `${jwt}`,
        ...(init || {}).headers,
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
