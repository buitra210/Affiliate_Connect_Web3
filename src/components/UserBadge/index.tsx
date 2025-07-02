import useUserLevel from "@centic-scoring/hooks/useUserLevel";
import { BadgeAdvanced, BadgeBeginner, BadgeIntermediate } from "@centic-scoring/icons/badge";
import { Box } from "@mui/material";
import UserBadgeNotify from "./UserBadgeNotify";
import { useCallback, useEffect, useState } from "react";
import { SvgIconComponent } from "@centic-scoring/icons";
import IconFlipAndMove from "./IconFlipAndMove";
// wagmi removed
import { getStorageWithPrefix, setStorageItem } from "@centic-scoring/utils/storage/authStorage";
import { useAuthEndUserSelector } from "@centic-scoring/redux/hook";

export default function UserBadge() {
  const { data } = useUserLevel();
  const address = null; // Mock value since wagmi is removed
  const { isLoggedin } = useAuthEndUserSelector();
  const [animationStep, setAnimationStep] = useState(0);
  const userLevel = data?.userLevel;
  let Icon: SvgIconComponent | undefined;
  let videoSrc: string | undefined;
  switch (userLevel) {
    case "beginner":
      Icon = BadgeBeginner;
      videoSrc = "/videos/badgeBeginner.webm";
      break;
    case "intermediate":
      Icon = BadgeIntermediate;
      videoSrc = "/videos/badgeIntermediate.webm";
      break;
    case "advanced":
      Icon = BadgeAdvanced;
      videoSrc = "/videos/badgeAdvanced.webm";
      break;
    default:
      Icon = BadgeBeginner;
      videoSrc = "/videos/badgeBeginner.webm";
      break;
  }

  const startNoti = useCallback(() => {
    if (address && data && isLoggedin) {
      const viewed = getStorageWithPrefix(`badge_noti_${address}_${data.userLevel}`);
      if (viewed) {
        return;
      } else {
        setStorageItem(`badge_noti_${address}_${data.userLevel}`, "true");
        setAnimationStep(1);
      }
    }
  }, [address, data, isLoggedin]);

  useEffect(() => {
    startNoti();
  }, [startNoti]);
  return (
    <Box id="user-badge" sx={{ my: -2 }}>
      <Box sx={{ opacity: data && (animationStep < 1 || animationStep === 3) ? 1 : 0 }}>
        <Icon
          id="icon-user-badge"
          sx={{ fontSize: "2.8rem" }}
          onClick={() => {
            setAnimationStep(1);
          }}
        />
      </Box>

      {animationStep >= 1 && videoSrc && (
        <UserBadgeNotify onEnd={() => setAnimationStep(2)} videoSrc={videoSrc} />
      )}
      {animationStep === 2 && (
        <IconFlipAndMove Icon={Icon} onAnimationEnd={() => setAnimationStep(0)} />
      )}
    </Box>
  );
}
