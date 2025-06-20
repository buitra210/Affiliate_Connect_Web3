import { Time } from "highcharts";
import { formatNumber } from "./string/stringUtils";

export function highchartDateFormat(
  timestamp?: number | undefined,
  format = "%Y-%m-%d %H:%M"
): string {
  return new Time({ useUTC: false }).dateFormat(format, timestamp);
}

export type AllocationChartProps = {
  id: string;
  name: string;
  y: number;
  value: number;
  symbol?: string;
};

export const sortAndSliceData = (data: Array<AllocationChartProps>) => {
  const sortData = data
    .slice()
    .sort((x: AllocationChartProps, y: AllocationChartProps) => y.value - x.value);
  if (data.length > 4) {
    const dataOthers = sortData.slice(4).reduce((total, item) => item.value + total, 0);

    return [
      ...sortData.slice(0, 4).map((item) => {
        return {
          id: item.id,
          name: item.name,
          value: item.value,
          y: item.value,
          symbol: item.symbol,
        };
      }),
      { id: "Others", name: "Others", value: dataOthers, y: dataOthers },
    ];
  } else {
    return sortData;
  }
};

export function formatValueNumber(value: number, params?: { threshold?: number; prefix?: string }) {
  const { threshold = 0.0001, prefix = "" } = params ?? {};
  if (value == 0) return "0";
  if (value < threshold) {
    return `< ${prefix}${threshold}`;
  }
  if (value >= 1e15) {
    return Number(value).toExponential(2);
  }
  return formatNumber(value, { prefix, fractionDigits: value >= 10 ? 2 : 4 });
}

export function formatValueUSD(value: number, threshold = 0.0001) {
  return formatValueNumber(value, { threshold, prefix: "$" });
}

/*************  ✨ Codeium Command ⭐  *************/
/**
 * Formats a given time duration in milliseconds into a human-readable string
 * indicating the approximate time elapsed in years, months, weeks, days, hours,
 * minutes, or seconds. Returns "Recently" if the time duration is very short.
 *
 * @param timeMs - The time duration in milliseconds to format.
 * @returns A string representation of the time elapsed, such as "2 years ago",
 * "5 months ago", or "Recently".
 */

/******  1005d056-2886-4636-8bfc-930a814344b2  *******/
export function formatTimeRange(
  timeMs: number,
  options?: {
    label?: {
      year?: string;
      month?: string;
      week?: string;
      day?: string;
      hour?: string;
      minute?: string;
      second?: string;
    };
  }
) {
  const yearTime = 1000 * 60 * 60 * 24 * 360;
  const monthTime = 1000 * 60 * 60 * 24 * 30;
  const weekTime = 1000 * 60 * 60 * 24 * 7;
  const dayTime = 1000 * 60 * 60 * 24;
  const hourTime = 1000 * 60 * 60;
  const minutesTime = 1000 * 60;
  const secondTime = 1000;
  const recentTime = 10000;
  if (timeMs > yearTime) {
    return `${Math.round(timeMs / yearTime)} ${options?.label?.year || "years"} ago`;
  }
  if (timeMs > monthTime) {
    return `${Math.round(timeMs / monthTime)} ${options?.label?.month || "months"} ago`;
  }
  if (timeMs > weekTime) {
    return `${Math.round(timeMs / weekTime)} ${options?.label?.week || "weeks"} ago`;
  }
  if (timeMs > dayTime) {
    return `${Math.round(timeMs / dayTime)} ${options?.label?.day || "days"} ago`;
  }
  if (timeMs > hourTime) {
    return `${Math.round(timeMs / hourTime)} ${options?.label?.hour || "hours"} ago`;
  }
  if (timeMs > minutesTime) {
    return `${Math.round(timeMs / minutesTime)} ${options?.label?.minute || "minutes"} ago`;
  }
  if (timeMs > recentTime) {
    return `${Math.round(timeMs / secondTime)} ${options?.label?.second || "seconds"} ago`;
  }
  return `Recently`;
}

export function formatTime(
  timeStampS: number | undefined,
  {
    date,
    time,
  }: {
    date?: boolean;
    time?: boolean;
  }
) {
  return new Date(Number(timeStampS || 0) * 1000)
    .toLocaleString(undefined, {
      ...(date && { year: "numeric", month: "numeric", day: "numeric" }),
      ...(time && { hour: "2-digit", minute: "2-digit", hour12: true }),
    })
    .replaceAll("am", "AM")
    .replaceAll("pm", "PM");
}

export function formatRangeTime(timeRangeMs: number) {
  const oneYear = 1000 * 60 * 60 * 24 * 365;
  const oneDay = 1000 * 60 * 60 * 24;
  const oneHour = 1000 * 60 * 60;
  const oneMinute = 1000 * 60;
  const year = Math.floor(timeRangeMs / oneYear);
  const dayRemainMs = timeRangeMs % oneYear;
  const day = Math.floor(dayRemainMs / oneDay);
  const hourRemainsMs = dayRemainMs % oneDay;
  const hour = Math.floor(hourRemainsMs / oneHour);
  const minuteRemainMs = hourRemainsMs % oneHour;
  const minute = Math.floor(minuteRemainMs / oneMinute);
  const secondRemainMs = minuteRemainMs % oneMinute;
  const second = Math.floor(secondRemainMs / 1000);

  let flag1 = false;
  let flag2 = false;
  const render = [
    {
      value: year,
      unit: "year",
    },
    {
      value: day,
      unit: "day",
    },
    {
      value: hour,
      unit: "hour",
    },
    {
      value: minute,
      unit: "minute",
    },
    {
      value: second,
      unit: "second",
    },
  ];

  const tmp1 = render
    .filter((item) => {
      if (flag1) {
        return true;
      }
      if (item.value === 0) {
        return false;
      }
      flag1 = true;
      return true;
    })
    .reverse();

  return tmp1
    .filter((item) => {
      if (flag2) {
        return true;
      }
      if (item.value === 0) {
        return false;
      }
      flag2 = true;
      return true;
    })
    .reverse()
    .map((i) => `${i.value} ${i.unit} `)
    .join("");
}
