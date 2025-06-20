import { useForProjectCommonSelector } from "@centic-scoring/redux/hook";
import { useMemo } from "react";
import { GearIcon, UsersIcon } from "@centic-scoring/icons";
import { SidebarConfigItem } from "../sidebar-configs/sidebarConfig";

export default function useForProjectSidebar() {
  const { project } = useForProjectCommonSelector();

  const forProjectSideBar: SidebarConfigItem[] = useMemo(() => {
    let config: SidebarConfigItem[] = [];
    if (project.status === "SUCCESS" && project.data?.id) {
      config = [
        {
          title: "Affiliate",
          path: `/projects/affiliate/${project.data?.id}`,
          redirectTo: `/projects/affiliate/${project.data?.id}/kols-matcher`,
          icon: UsersIcon,
          auth: true,
          redirect: false,
          subTab: [
            {
              title: "KOLs Matcher",
              path: `/kols-matcher`,
              auth: true,
              regEx: /\projects\/affiliate\/.*\/kols-matcher\/*.*/,
            },
            // {
            //   title: "Ambassador Matcher",
            //   path: `/ambassador-matcher`,
            //   auth: true,
            //   regEx: /\projects\/affiliate\/.*\/ambassador-matcher\/*.*/,
            // },
            {
              title: "Offer Management",
              path: `/offer-management`,
              auth: true,
              regEx: /\projects\/affiliate\/.*\/offer-management\/*.*/,
            },
          ],
          showId: false,
        },
        {
          title: "Setting",
          path: `/projects/setting/${project.data?.id}`,
          icon: GearIcon,
          auth: true,
          redirect: false,
          subTab: [],
          showId: false,
        },
      ];
      return config;
    }
    config = [
      // {
      //   title: "KOLs Matcher",
      //   path: `/projects/kols-matcher/${project.data?.id}`,
      //   icon: UsersIcon,
      //   auth: true,
      //   redirect: false,
      // },
      {
        title: "Setting",
        path: `/projects/#`,
        icon: GearIcon,
        auth: true,
        redirect: false,
        subTab: [],
        disabled: true,
      },
    ];
    return config;
  }, [project]);

  return { sidebar: forProjectSideBar };
}
