import type { ISidebarItem } from "@/types";
import { lazy } from "react";
import { LuLayoutDashboard, LuNotebookPen } from "react-icons/lu";
import { CiBoxList } from "react-icons/ci";
import { TbArrowGuide } from "react-icons/tb";
import { VscTypeHierarchySuper } from "react-icons/vsc";
import { RiUserStarLine } from "react-icons/ri";
import { LiaUserSecretSolid } from "react-icons/lia";
import { TbMoneybag, TbSettings } from "react-icons/tb";
import { PiMapPinArea } from "react-icons/pi";
import { MdOutlineAddLocationAlt } from "react-icons/md";
import { LuCalendarRange } from "react-icons/lu";
import { LucideUsers2 } from "lucide-react";
import { MdOutlinePostAdd } from "react-icons/md";

const AdminDashboard = lazy(() => import("@/pages/admin/admin-dashboard"));
const AdminBookings = lazy(() => import("@/pages/admin/bookings"));
const AdminUsers = lazy(() => import("@/pages/admin/users"));
const Earnings = lazy(() => import("@/pages/admin/earnings"));
const Blogs = lazy(() => import("@/pages/admin/blogs"));
const AddBlog = lazy(() => import("@/pages/admin/add-blog"));
const Enquiries = lazy(() => import("@/pages/admin/enquiries"));
const Reviews = lazy(() => import("@/pages/admin/reviews"));
const Settings = lazy(() => import("@/pages/admin/settings"));
const TourGuides = lazy(() => import("@/pages/admin/tour-guides"));
const TourListing = lazy(() => import("@/pages/admin/tour-listing"));
const TourTypes = lazy(() => import("@/pages/admin/tour-type"));
const Destination = lazy(() => import("@/pages/admin/destination"));
const AddTour = lazy(() => import("@/pages/admin/add-tour"));

export const adminSidebarMenus: ISidebarItem[] = [
    {
        title: "Overview",
        items: [
            {
                title: "Dashboard",
                url: "/admin/dashboard",
                component: AdminDashboard,
                icon: LuLayoutDashboard,
            },
        ],
    },
    {
        title: "Tours",
        items: [
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
                title: "Destinations",
                url: "/admin/destinations",
                component: Destination,
                icon: PiMapPinArea,
            },
        ],
    },
    {
        title: "Blog",
        items: [
            {
                title: "All Blogs",
                url: "/admin/blogs",
                component: Blogs,
                icon: LuNotebookPen,
            },
            {
                title: "Add Blog",
                url: "/admin/add-blog",
                component: AddBlog,
                icon: MdOutlinePostAdd,
            },
        ],
    },
    {
        title: "Community",
        items: [
            {
                title: "Users",
                url: "/admin/users",
                component: AdminUsers,
                icon: LucideUsers2,
            },
            {
                title: "Bookings",
                url: "/admin/bookings",
                component: AdminBookings,
                icon: LuCalendarRange,
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
        title: "Finance",
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
        title: "System",
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
