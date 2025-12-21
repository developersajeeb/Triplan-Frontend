import * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link, useLocation } from "react-router"
import { getSidebarMenus } from "@/utils/getSidebarMenus"
import NotUserIcon from "../blocks/NotUserIcon"
import { authApi, useLogoutMutation } from "@/redux/features/auth/auth.api"
import { TbPencilMinus } from "react-icons/tb"
import { Skeleton } from "@/components/ui/skeleton"
import { RiLogoutCircleLine } from "react-icons/ri"
import { useAppDispatch } from "@/redux/hook"
import { useUserInfoQuery } from "@/redux/features/user/user.api"

const menuItems = {
  navMain: getSidebarMenus("USER"),
}

export function UserSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const { data: userData, isLoading: isMenuLoading } = useUserInfoQuery(undefined);

  const handleLogout = async () => {
    await logout(undefined);
    dispatch(authApi.util.resetApiState());
  };

  return (
    <Sidebar {...props} className="relative rounded-xl border border-gray-200 min-w-[305px] w-[305px] h-auto">
      <div className="p-5 border-b border-gray-200 flex gap-2">
        {isMenuLoading ? (
          <Skeleton className="h-12 w-full rounded-xl" />
        ) : (
          <>
            <NotUserIcon minWidth="min-w-11" width="w-11" height="h-11" iconSize={28} />
            <div>
              <h5 className="text-base font-semibold text-gray-800 tracking-tight">{userData?.data?.name}</h5>
              <p className="text-sm text-gray-600 break-all tracking-tight">{userData?.data?.email}</p>
            </div>
            <Link to='/user/settings' className="inline-flex justify-center items-center rounded-full min-w-6 w-6 h-6 bg-gray-200 text-gray-500 hover:text-white hover:bg-primary-500 duration-300 cursor-pointer"><TbPencilMinus size={16} /></Link>
          </>
        )}
      </div>
      <SidebarContent className="mt-2">
        {/* We create a SidebarGroup for each parent. */}
        {menuItems.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => {
                  const isActive = location?.pathname === item?.url;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link
                          className={`${isActive ? "bg-primary-400 !text-white hover:!bg-primary-600" : "text-gray-700"} font-medium duration-300 transition-all hover:bg-primary-600`}
                          to={item.url}>{item.icon && <item.icon className={item?.iconClassName || ""} size={item?.iconSize} />} {item.title}</Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
        <SidebarGroup className="pt-0 -mt-2">
          <SidebarGroupContent>
            <p className="px-[10px] py-[6px] rounded-lg flex items-center gap-2 text-sm font-medium duration-300 transition-all hover:bg-primary-600 hover:text-white cursor-pointer" onClick={handleLogout}><RiLogoutCircleLine size={16} /> <span>Logout</span></p>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
