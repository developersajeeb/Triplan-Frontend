import type { ISidebarItem } from "@/types";
import { lazy } from "react";
import { FaRegHeart, FaStarHalfStroke } from "react-icons/fa6";
import { FiSettings } from "react-icons/fi";
import { LuBellDot, LuCalendarRange, LuLayoutDashboard, LuWalletMinimal } from "react-icons/lu";
import { RiUserLine } from "react-icons/ri";

const UserDashboard = lazy(() => import("@/pages/user/user-dashboard"));
const MyBookings = lazy(() => import("@/pages/user/my-bookings"));
const MyReviews = lazy(() => import("@/pages/user/my-reviews"));
const Wishlist = lazy(() => import("@/pages/user/wishlist"));
const Payments = lazy(() => import("@/pages/user/payments"));
const MyProfile = lazy(() => import("@/pages/user/my-profile"));
const Notifications = lazy(() => import("@/pages/user/notifications"));
const Settings = lazy(() => import("@/pages/user/settings"));

export const userSidebarMenus: ISidebarItem[] = [
  {
    title: "Main",
    items: [
      {
        title: "Dashboard",
        url: "/user/dashboard",
        component: UserDashboard,
        icon: LuLayoutDashboard,
      },
      {
        title: "My Bookings",
        url: "/user/my-bookings",
        component: MyBookings,
        icon: LuCalendarRange,
      },
      {
        title: "My Reviews",
        url: "/user/my-reviews",
        component: MyReviews,
        icon: FaStarHalfStroke,
      },
      {
        title: "Wishlist",
        url: "/user/wishlist",
        component: Wishlist,
        icon: FaRegHeart,
      },
    ],
  },
  {
    title: "Finance",
    items: [
      {
        title: "Payments",
        url: "/user/payments",
        component: Payments,
        icon: LuWalletMinimal,
      },
    ],
  },
  {
    title: "Account",
    items: [
      {
        title: "My Profile",
        url: "/user/my-profile",
        component: MyProfile,
        icon: RiUserLine,
      },
      {
        title: "Notifications",
        url: "/user/notifications",
        component: Notifications,
        icon: LuBellDot,
      },
      {
        title: "Settings",
        url: "/user/settings",
        component: Settings,
        icon: FiSettings,
      },
    ],
  },
];