import UserDashboard from "@/pages/user/UserDashboard/UserDashboard";
import type { ISidebarItem } from "@/types";


export const userSidebarMenus: ISidebarItem[] = [
  {
    title: "Main",
    items: [
      {
        title: "Dashboard",
        url: "/user/dashboard",
        component: UserDashboard,
      },
    ],
  },
];