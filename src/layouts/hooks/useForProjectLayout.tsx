import { useForProjectCommonSelector } from "@centic-scoring/redux/hook";
import { useMemo } from "react";
import { GearIcon, UsersIcon } from "@centic-scoring/icons";
import { SidebarConfigItem } from "../sidebar-configs/sidebarConfig";
import { useAuthContext } from "@centic-scoring/context/auth-context";

export default function useForProjectSidebar() {
  const { project } = useForProjectCommonSelector();
  const { userName, isLoggedIn } = useAuthContext();

  const forProjectSideBar: SidebarConfigItem[] = useMemo(() => {
    let config: SidebarConfigItem[] = [];

    // 1 user = 1 project: Use userName as project ID
    const projectId = project.data?.id || userName;
    const hasValidProject = isLoggedIn && userName && projectId;

    if (hasValidProject) {
      config = [
        {
          title: "Affiliate",
          path: `/projects/affiliate/${projectId}`,
          redirectTo: `/projects/affiliate/${projectId}/kols-matcher`,
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
          path: `/projects/setting/${projectId}`,
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
  }, [project, userName, isLoggedIn]);

  return { sidebar: forProjectSideBar };
}
