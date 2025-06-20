import { GlobalIcon } from "@centic-scoring/icons";
import { SidebarConfigItem } from "../sidebar-configs/sidebarConfig";

export default function useAffiliateLayout() {
  const config: SidebarConfigItem[] = [
    {
      title: "Affiliate",
      path: "/affiliate",
      icon: GlobalIcon,
      auth: true,
      inactiveHideSubTab: true,
      subTab: [
        {
          title: "Offer management",
          path: "/",
          auth: false,
        },
      ],
      showId: false,
    },
  ];
  return { config };
}
