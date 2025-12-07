import { role } from "@/constants/role";
import { adminSidebarMenus } from "@/routes/adminSidebarMenus";
import { userSidebarMenus } from "@/routes/userSidebarMenus";
import type { TRole } from "@/types";

export const getSidebarMenus = (userRole: TRole) => {
  switch (userRole) {
    case role.superAdmin:
      return [...adminSidebarMenus];
    case role.admin:
      return [...adminSidebarMenus];
    case role.user:
      return [...userSidebarMenus];
    default:
      return [];
  }
};