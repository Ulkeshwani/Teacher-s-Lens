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
// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: "Dashboard",
    path: "/dashboard/app",
    icon: getIcon(viewDashboard),
  },
  {
    title: "Administration",
    path: "/dashboard/admin",
    icon: getIcon(accountWrench),
    children: [
      {
        title: "Roles",
        path: "/dashboard/admin/roles",
        icon: getIcon(accountCog),
      },
      {
        title: "Users",
        path: "/dashboard/admin/user",
        icon: getIcon(accountGroup),
      },
    ],
  },
  {
    title: "Create Conversation",
    path: "/dashboard/create-conversation",
    icon: getIcon(videoPlus),
  },
  {
    title: "Join Conversation",
    path: "/dashboard/join-conversation",
    icon: getIcon(laptopAccount),
  },
  {
    title: "Announcements & Notifications",
    path: "/dashboard/announcements",
    icon: getIcon(squareRoundedBadgeOutline),
  },
  {
    title: "Profile",
    path: "/dashboard/profile",
    icon: getIcon(accountIcon),
  },
];

export default sidebarConfig;
