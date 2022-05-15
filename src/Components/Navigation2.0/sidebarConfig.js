// component
import { Icon } from "@iconify/react";
import accountWrench from "@iconify/icons-mdi/account-wrench";
import accountCog from "@iconify/icons-mdi/account-cog";
import viewDashboard from "@iconify/icons-mdi/view-dashboard";
import accountIcon from "@iconify/icons-mdi/account";
import accountGroup from "@iconify/icons-mdi/account-group";
import videoPlus from "@iconify/icons-mdi/video-plus";
import laptopAccount from "@iconify/icons-mdi/laptop-account";
import squareRoundedBadgeOutline from "@iconify/icons-mdi/square-rounded-badge-outline";
import officeBuildingCog from "@iconify/icons-mdi/office-building-cog";
// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: "Dashboard",
    id: "dashboard",
    path: "/dashboard",
    icon: getIcon(viewDashboard),
  },
  {
    title: "Administration",
    id: "administration",
    path: "/dashboard/administration",
    icon: getIcon(accountWrench),
    children: [
      {
        title: "Organisation",
        path: "/dashboard/administration/organisation",
        icon: getIcon(officeBuildingCog),
      },
      {
        title: "School / College",
        path: "/dashboard/administration/school",
        icon: getIcon(officeBuildingCog),
      },
      {
        title: "Users",
        path: "/dashboard/administration/user",
        icon: getIcon(accountGroup),
      },
    ],
  },
  {
    title: "Create Conversation",
    id: "createConversation",
    path: "/dashboard/create-conversation",
    icon: getIcon(videoPlus),
  },
  {
    title: "Join Conversation",
    id: "joinConversation",
    path: "/dashboard/join-conversation",
    icon: getIcon(laptopAccount),
  },
  {
    title: "Announcements & Notifications",
    id: "announcements",
    path: "/dashboard/announcements",
    icon: getIcon(squareRoundedBadgeOutline),
  },
  {
    title: "Profile",
    id: "profile",
    path: "/dashboard/profile",
    icon: getIcon(accountIcon),
  },
];

export default sidebarConfig;
