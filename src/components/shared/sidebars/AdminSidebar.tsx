import * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Link, useLocation } from "react-router"
import { getSidebarMenus } from "@/utils/getSidebarMenus"
import Logo from '@/assets/triPlan-logo.svg';
import { RiLogoutCircleLine } from "react-icons/ri";
import { authApi, useLogoutMutation } from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hook";
import { useWishlist } from "@/hooks/useWishlist";

const menuItems = {
  navMain: getSidebarMenus("ADMIN"),
}

export function AdminSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { onLogoutCleanup } = useWishlist();
  const location = useLocation();
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await logout(undefined);
    dispatch(authApi.util.resetApiState());
    onLogoutCleanup();
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Link to="/"><img className="w-36 py-3 px-2" src={Logo} alt="" /></Link>
      </SidebarHeader>
      <SidebarContent className="px-2">
        {/* We create a SidebarGroup for each parent. */}
        {menuItems.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => {
                  const isActive = location?.pathname === item?.url;
                  return (
                    (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild className={`${isActive ? "bg-primary-400 text-white" : ""} duration-300 transition-all hover:bg-primary-600 hover:text-white`}>
                          <Link className="font-semibold" to={item?.url}>{item.icon && <item.icon className={item?.iconClassName || ""} size={item?.iconSize} />} {item?.title}</Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="bg-gray-100 px-4 py-4">
        <p className="flex items-center gap-2 font-semibold text-sm cursor-pointer" onClick={handleLogout}><RiLogoutCircleLine size={18} /> <span>Logout</span></p>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
