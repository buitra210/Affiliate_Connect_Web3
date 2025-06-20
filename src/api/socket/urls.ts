// wss://develop.centic.io/stag/v3/defai/signals/ws
export const baseURLSocket =
  (process.env.NEXT_PUBLIC_ENV === "staging" && "hwss://develop.centic.io/stag/v3") ||
  (process.env.NEXT_PUBLIC_ENV === "product" && "wss://develop.centic.io/stag/v33") ||
  "wss://develop.centic.io/stag/v3";
