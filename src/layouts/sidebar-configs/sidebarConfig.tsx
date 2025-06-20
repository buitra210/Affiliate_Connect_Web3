import {
  CampaignIcon,
  DashboardIcon,
  DocumentIcon,
  EngagementIcon,
  GearIcon,
  GlobalIcon,
  IntegrateIcon,
} from "@centic-scoring/icons";

export const notAuthURL = ["", "score-detail", "user-explore", "web3-growth"];

export type SidebarConfigItem = {
  title: string;
  path: string;
  regEx?: RegExp[];
  icon?: any;
  auth: boolean;
  redirect?: boolean;
  redirectTo?: string;
  inactiveHideSubTab?: boolean;
  showId?: boolean;
  disabled?: boolean;
  subTab?: {
    title: string;
    path: string;
    icon?: any;
    auth: boolean;
    redirect?: boolean;
    disabled?: boolean;
    regEx?: RegExp;
  }[];
};

export const sideBarConfig: SidebarConfigItem[] = [
  {
    title: "Web3 Growth",
    path: "/web3-growth",
    icon: GlobalIcon,
    auth: false,
    inactiveHideSubTab: true,
    showId: true,
    subTab: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: DashboardIcon,
        auth: false,
        redirect: false,
      },
      {
        title: "Campaign",
        path: "/campaign",
        icon: CampaignIcon,
        auth: false,
        redirect: false,
      },
      {
        title: "Engagement",
        path: "/engagement",
        icon: EngagementIcon,
        auth: false,
        redirect: false,
      },
      {
        title: "Setting",
        path: "/setting",
        icon: GearIcon,
        auth: false,
        redirect: false,
      },
    ],
  },
  {
    title: "Integration usage",
    path: "/traffic",
    icon: DashboardIcon,
    auth: true,
    showId: true,
  },
  {
    title: "Integration",
    path: "/integration",
    icon: IntegrateIcon,
    auth: true,
    redirect: false,
    showId: true,
  },
  {
    title: "Document",
    path: "https://docs.centic.io/product-and-service-ecosystem/score-marketplace",
    icon: DocumentIcon,
    auth: false,
    redirect: true,
    showId: true,
  },
];

export const web3GrowthSideBar: SidebarConfigItem[] = [
  {
    title: "Web3 Growth",
    path: "/web3-growth",
    icon: GlobalIcon,
    auth: false,
    inactiveHideSubTab: true,
    showId: true,
    subTab: [
      {
        title: "DApp Users",
        path: "/dapp-users",
        auth: false,
        redirect: false,
      },
      {
        title: "Holders",
        path: "/holders",
        auth: false,
        redirect: false,
      },
      {
        title: "Audiences",
        path: "/audiences",
        auth: false,
        redirect: false,
      },
    ],
  },
];
