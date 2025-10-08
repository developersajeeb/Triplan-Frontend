import App from "@/App";
import AdminLayout from "@/components/layouts/AdminLayout";
import About from "@/pages/about/About";
import LoginPage from "@/pages/login/LoginPage";
import RegistrationPage from "@/pages/registration/RegistrationPage";
import VerifyPage from "@/pages/verify/VerifyPage";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarMenus } from "./adminSidebarMenus";
import UserLayout from "@/components/layouts/UserLayout";
import { userSidebarMenus } from "./userSidebarMenus";
import { withAuth } from "@/utils/withAuth";
import type { TRole } from "@/types";
import { role } from "@/constants/role";
import Tours from "@/pages/tours/Tours";
import TourDetails from "@/pages/tour-details/TourDetails";
import Booking from "@/pages/booking/Booking";
import PaymentSuccess from "@/pages/payment/PaymentSuccess";
import PaymentFail from "@/pages/payment/PaymentFail";
import PaymentCancel from "@/pages/payment/PaymentCancel";
import Home from "@/pages/home/Home";

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
        Component: About,
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