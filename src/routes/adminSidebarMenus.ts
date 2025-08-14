// import AdminDashboard from "@/pages/admin/admin-dashboard/AdminDashboard";
import Earnings from "@/pages/admin/earnings/Earnings";
import Enquiries from "@/pages/admin/enquiries/Enquiries";
import Reviews from "@/pages/admin/reviews/Reviews";
import Settings from "@/pages/admin/settings/Settings";
import TourGuides from "@/pages/admin/tour-guides/Tour-Guides";
import TourListing from "@/pages/admin/tour-listing/Tour-Listing";
import TourTypes from "@/pages/admin/tour-type/TourTypes";
import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const AdminDashboard = lazy(() => import("@/pages/admin/admin-dashboard/AdminDashboard"));

export const adminSidebarMenus: ISidebarItem[] = [
    {
        title: "Management",
        items: [
            {
                title: "Dashboard",
                url: "/admin/dashboard",
                component: AdminDashboard
            },
            {
                title: "Tour Listing",
                url: "/admin/tour-listing",
                component: TourListing
            },
            {
                title: "Tour Guides",
                url: "/admin/tour-guides",
                component: TourGuides
            },
            {
                title: "Tour Types",
                url: "/admin/tour-types",
                component: TourTypes
            },
            {
                title: "Reviews",
                url: "/admin/reviews",
                component: Reviews
            },
            {
                title: "Enquiries",
                url: "/admin/enquiries",
                component: Enquiries
            },
        ],
    },
    {
        title: "Business",
        items: [
            {
                title: "Earnings",
                url: "/admin/earnings",
                component: Earnings
            },
        ],
    },
    {
        title: "Profile",
        items: [
            {
                title: "Settings",
                url: "/admin/settings",
                component: Settings
            },
        ],
    },
]