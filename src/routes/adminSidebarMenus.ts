// import AdminDashboard from "@/pages/admin/admin-dashboard/AdminDashboard";
import Earnings from "@/pages/admin/earnings/Earnings";
import Enquiries from "@/pages/admin/enquiries/Enquiries";
import Reviews from "@/pages/admin/reviews/Reviews";
import Settings from "@/pages/admin/settings/Settings";
import TourGuides from "@/pages/admin/tour-guides/Tour-Guides";
import TourListing from "@/pages/admin/tour-listing/Tour-Listing";
import TourTypes from "@/pages/admin/tour-type/TourTypes";
import Division from "@/pages/admin/division/Division";
import AddTour from "@/pages/admin/add-tour/AddTour";
import type { ISidebarItem } from "@/types";
import { lazy } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { CiBoxList } from "react-icons/ci";
import { TbArrowGuide } from "react-icons/tb";
import { VscTypeHierarchySuper } from "react-icons/vsc";
import { RiUserStarLine } from "react-icons/ri";
import { LiaUserSecretSolid } from "react-icons/lia";
import { TbMoneybag } from "react-icons/tb";
import { TbSettings } from "react-icons/tb";
import { PiMapPinArea } from "react-icons/pi";
import { MdOutlineAddLocationAlt } from "react-icons/md";

const AdminDashboard = lazy(() => import("@/pages/admin/admin-dashboard/AdminDashboard"));

export const adminSidebarMenus: ISidebarItem[] = [
    {
        title: "Management",
        items: [
            {
                title: "Dashboard",
                url: "/admin/dashboard",
                component: AdminDashboard,
                icon: LuLayoutDashboard,
            },
            {
                title: "Tour Listing",
                url: "/admin/tour-listing",
                component: TourListing,
                icon: CiBoxList,
            },
            {
                title: "Add Tour",
                url: "/admin/add-tour",
                component: AddTour,
                icon: MdOutlineAddLocationAlt,
            },
            {
                title: "Tour Guides",
                url: "/admin/tour-guides",
                component: TourGuides,
                icon: TbArrowGuide,
            },
            {
                title: "Tour Types",
                url: "/admin/tour-types",
                component: TourTypes,
                icon: VscTypeHierarchySuper,
            },
            {
                title: "Division",
                url: "/admin/division",
                component: Division,
                icon: PiMapPinArea,
            },
            {
                title: "Reviews",
                url: "/admin/reviews",
                component: Reviews,
                icon: RiUserStarLine,
            },
            {
                title: "Enquiries",
                url: "/admin/enquiries",
                component: Enquiries,
                icon: LiaUserSecretSolid,
            },
        ],
    },
    {
        title: "Business",
        items: [
            {
                title: "Earnings",
                url: "/admin/earnings",
                component: Earnings,
                icon: TbMoneybag,
            },
        ],
    },
    {
        title: "Profile",
        items: [
            {
                title: "Settings",
                url: "/admin/settings",
                component: Settings,
                icon: TbSettings,
            },
        ],
    },
]