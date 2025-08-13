import AdminDashboard from "@/pages/admin/admin-dashboard/AdminDashboard";
import Earnings from "@/pages/admin/earnings/Earnings";
import Enquiries from "@/pages/admin/enquiries/Enquiries";
import Reviews from "@/pages/admin/reviews/Reviews";
import Settings from "@/pages/admin/settings/Settings";
import TourGuides from "@/pages/admin/tour-guides/Tour-Guides";
import TourListing from "@/pages/admin/tour-listing/Tour-Listing";
import type { ISidebarItem } from "@/types";

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
                title: "Enquiries",
                url: "/admin/enquiries",
                component: Enquiries
            },
            {
                title: "Reviews",
                url: "/admin/reviews",
                component: Reviews
            },
        ],
    },
    {
        title: "Business",
        items: [
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