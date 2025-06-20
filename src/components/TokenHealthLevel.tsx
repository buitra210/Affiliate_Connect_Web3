import {
  TokenScore5Icon,
  TokenScore4Icon,
  TokenScore3Icon,
  TokenScore2Icon,
  TokenScore1Icon,
} from "@centic-scoring/icons";
import { SvgIconProps } from "@mui/material";
import { useMemo } from "react";

export function getTokenHealthRankIcon(score: number) {
  if (score < 0 || score > 1000)
    throw new Error("Invalid health score. Valid value must be in [0, 1000].");
  if (score <= 400) return TokenScore5Icon;
  if (score <= 600) return TokenScore4Icon;
  if (score <= 800) return TokenScore3Icon;
  if (score <= 900) return TokenScore2Icon;
  return TokenScore1Icon;
}

export default function TokenHealthLevel({ score, ...props }: SvgIconProps & { score: number }) {
  const HealthIcon = useMemo(() => getTokenHealthRankIcon(score), [score]);
  return <HealthIcon {...props} />;
}
