export type ValueType = string | number | boolean | undefined;

export function queryParams(obj?: { [key: string]: ValueType | ValueType[] }) {
  let params = new URLSearchParams();
  Object.entries(obj || {})?.forEach(([key, value]) => {
    if (!(value === undefined || value === "")) {
      if (typeof value === "object" && value && value[0] !== undefined) {
        (value as ValueType[]).forEach((v) => {
          params.append(key, String(v || "").trim());
        });
      } else {
        params.append(key, value === 0 ? "0" : String(value || ""));
      }
    }
  });
  return `${Object.keys(obj || {}).length ? "?" : ""}${params.toString()}`;
}
