import App from "@/App";
import AdminLayout from "@/components/layouts/AdminLayout";
import LoginPage from "@/pages/login";
import RegistrationPage from "@/pages/registration";
import VerifyPage from "@/pages/verify";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarMenus } from "./adminSidebarMenus";
import UserLayout from "@/components/layouts/UserLayout";
import { userSidebarMenus } from "./userSidebarMenus";
import { withAuth } from "@/utils/withAuth";
import type { TRole } from "@/types";
import { role } from "@/constants/role";
import TourDetails from "@/pages/tour-details";
import Booking from "@/pages/booking";
import PaymentSuccess from "@/pages/payment/PaymentSuccess";
import PaymentFail from "@/pages/payment/PaymentFail";
import PaymentCancel from "@/pages/payment/PaymentCancel";
import Home from "@/pages/home";
import { lazy } from "react";
import ContactUs from "@/pages/contact-us";

const AboutUs = lazy(() => import("@/pages/about"));
const Tours = lazy(() => import("@/pages/tours"));
const DestinationsPage = lazy(() => import("@/pages/destinations"));
const DestinationDetails = lazy(() => import("@/pages/destinations-details"));
const TourGuiderPage = lazy(() => import("@/pages/tour-guide"));
const NotFoundPage = lazy(() => import("@/pages/not-found"));

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        Component: AboutUs,
        path: "about-us",
      },
      {
        Component: Tours,
        path: "tours",
      },
      {
        Component: TourDetails,
        path: "tours/:slug",
      },
      {
        Component: DestinationsPage,
        path: "destinations",
      },
      {
        Component: DestinationDetails,
        path: "destinations/:slug",
      },
      {
        Component: TourGuiderPage,
        path: "tour-guide",
      },
      {
        Component: withAuth(Booking),
        path: "booking/:slug",
      },
      {
        Component: PaymentSuccess,
        path: "/payment/success",
      },
      {
        Component: PaymentFail,
        path: "/payment/fail",
      },
      {
        Component: PaymentCancel,
        path: "/payment/cancel",
      },
      {
        Component: ContactUs,
        path: "contact-us",
      },
      {
        path: "*",
        Component: NotFoundPage,
      },
    ],
  },

  {
    Component: withAuth(UserLayout, role.user as TRole),
    path: "/user",
    children: [
      { index: true, element: <Navigate to="/user/dashboard" /> },
      ...generateRoutes(userSidebarMenus),
    ],
  },

  {
    Component: withAuth(AdminLayout, role.superAdmin as TRole),
    path: "/admin",
    children: [
      { index: true, element: <Navigate to="/admin/dashboard" /> },
      ...generateRoutes(adminSidebarMenus),
    ],
  },

  {
    Component: LoginPage,
    path: "login"
  },
  {
    Component: RegistrationPage,
    path: "registration"
  },
  {
    Component: VerifyPage,
    path: "verify"
  }
]);