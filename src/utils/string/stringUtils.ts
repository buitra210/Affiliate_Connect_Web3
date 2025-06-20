import BigNumber from "bignumber.js";

export type TruncateStringOptions = {
  /**
   * The number of characters will be taken from begin. This value cannot be negative.
   */
  first?: number;
  /**
   * The number of characters will be taken from last. This value cannot be negative.
   */
  last?: number;
};
/**
 * Truncate a string
 * @param {string} s The input string
 * @param {TruncateStringOptions} options Includes options to customize the results returned
 * @returns if options is not provided, the original string will
 *          be returned, otherwise return the truncated string.
 */
export function truncateString(s: string, options: TruncateStringOptions = {}): string {
  if (options.first === undefined && options.last === undefined) return s;
  if ((options.first && options.first < 0) || (options.last && options.last < 0)) {
    throw new Error("Invalid parameter(s)");
  }
  let _s = "";
  if (options.first) {
    _s = s.slice(0, options.first);
  }
  _s += "...";
  if (options.last) {
    _s += s.slice(-options.last);
  }
  return _s;
}

/**
 * Format contract or user address
 */
export function formatAddress(address: string, first = 6, last = 4): string {
  if (!address) {
    return "";
  }
  return truncateString(address, { first, last });
}

/**
 * Check if a value is numeric or not
 */
export function isNumeric(value: any): value is number | string {
  return !isNaN(value) && !isNaN(parseFloat(value));
}

/**
 * Cast a value to BigNumber (bignumber.js) instance.
 * @param {*} value - The value
 * @returns An instance of BigNumber.
 */
export function BN(value: any): BigNumber {
  return new BigNumber(value);
}

export function toUSD(amount?: BigNumber.Value, price?: BigNumber.Value): string {
  return BN(amount).times(BN(price)).toString();
}

export function numberWithDelimiter(x: BigNumber.Value, delimiter = ","): string {
  if (!isNumeric(x)) {
    throw new Error("Must provide a correct number");
  }
  const [natural, decimal] = x.toString().split(".");
  let out = natural.replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
  if (decimal) {
    out += "." + decimal;
  }
  return out;
}

/**
 * Compact large number
 * @param {*} n The number
 * @param {Number} fractionDigits Number of digits after the decimal point
 * @returns A compacted number in `K`, `M`, `B` or `T`.
 */
export function compactNumber(n: BigNumber.Value, fractionDigits: number = 1) {
  if (!isNumeric(n)) {
    throw new Error("Must provide a correct number");
  }
  const suffixes = ["", "K", "M", "B", "T"];
  let suffixNum = Math.floor((n.toString().split(".")[0].length - 1) / 3);

  if (suffixNum >= suffixes.length) {
    suffixNum = suffixes.length - 1;
  }

  let shortValue = (Number(n) / Math.pow(1000, suffixNum)).toFixed(fractionDigits + 2);

  if (Number(shortValue) % 1 !== 0) {
    shortValue = Number(shortValue).toFixed(fractionDigits);
  }

  return Number(shortValue).toString() + suffixes[suffixNum];
}

export interface FormatNumberOptions<F> {
  /**
   * Number of digits after the decimal point. Must be in the range 0 - 20, inclusive.
   */
  fractionDigits?: number;
  /**
   * A fallback react tree to show when a number is invalid.
   * @default N/A
   */
  fallback?: F;
  /**
   * The string used to separate number.
   */
  delimiter?: string;
  /**
   * Allow zero after decimal point.
   * @default false
   */
  padZero?: boolean;
  /**
   * A string that will be appended to the beginning of the returned result.
   */
  prefix?: string;
  /**
   * A string that will be appended to the ending of the returned result.
   */
  suffix?: string;
}
/**
 * Format a number to easy-to-see
 * @param {*} number - The number needs to format
 * @param {FormatNumberOptions} options - Includes options to customize the results returned
 * @returns A string representing a number in formatted, `option.fallback` will be returned if `number` is invalid
 */
export function formatNumber<F = any>(number: any, options?: FormatNumberOptions<F>): string | F {
  const {
    fallback = "N/A",
    fractionDigits,
    delimiter,
    padZero,
    prefix = "",
    suffix = "",
  } = options ?? {};
  if (!isNumeric(number)) {
    return fallback;
  }
  let n = String(number);
  if (isNumeric(fractionDigits)) {
    n = BN(n).toFixed(fractionDigits);
  }
  if (!padZero && n.split(".").length > 1) {
    n = n.replace(/0*$/g, ""); // remove last zeros after decimal point
  }
  return prefix + numberWithDelimiter(n, delimiter) + suffix;
}
export function UppercaseFirst(s: string) {
  if (!s) {
    return "";
  }
  return s.charAt(0)?.toUpperCase() + s.slice(1);
}

export function formatTimeRange(ts: number) {
  const yearTime = 60 * 60 * 24 * 360;
  const monthTime = 60 * 60 * 24 * 30;
  const weekTime = 60 * 60 * 24 * 7;
  const dayTime = 60 * 60 * 24;

  const year = Math.floor(ts / yearTime);
  const month = Math.floor((ts % yearTime) / monthTime);
  const day = Math.floor((ts % weekTime) / dayTime);
  const week = Math.floor((ts % monthTime) / weekTime);

  return `${year ? `${year} year${year > 1 ? "s" : ""} ` : ""}${
    month ? `${month} month${month > 1 ? "s" : ""} ` : ""
  }${week ? `${week} week${week > 1 ? "s" : ""} ` : ""}${
    day ? `${day} day${day > 1 ? "s" : ""} ` : ""
  }`;
}

type Action = "export-pdf";
export const generateComponentID = (name: string, action: Action = "export-pdf") => {
  return `${action}-${name}`;
};
export const getComponentID = (name: string, action: Action = "export-pdf") => {
  return `${action}-${name}`;
};

export const formatFileSize = (fileSizeByte: number) => {
  if (fileSizeByte < 1024) {
    return `${formatNumber(fileSizeByte)} Bytes`;
  }
  if (fileSizeByte < 1024 * 1024) {
    return `${formatNumber(fileSizeByte / 1024, { fractionDigits: 2 })} KB`;
  }
  if (fileSizeByte < 1024 * 1024 * 1024) {
    return `${compactNumber(Math.floor(fileSizeByte / (1024 * 1024)))} MB`;
  }
  return `${compactNumber(Math.floor(fileSizeByte / (1024 * 1024 * 1024)))} GB`;
};
