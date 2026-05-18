import App from "@/App";
import AdminLayout from "@/components/layouts/AdminLayout";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarMenus } from "./adminSidebarMenus";
import UserLayout from "@/components/layouts/UserLayout";
import { userSidebarMenus } from "./userSidebarMenus";
import { withAuth, withoutAuth } from "@/utils/withAuth";
import type { TRole } from "@/types";
import { role } from "@/constants/role";
import { lazy } from "react";

const LoginPage = lazy(() => import("@/pages/login"));
const RegistrationPage = lazy(() => import("@/pages/registration"));
const VerifyPage = lazy(() => import("@/pages/verify"));
const TourDetails = lazy(() => import("@/pages/tour-details"));
const Booking = lazy(() => import("@/pages/booking"));
const PaymentSuccess = lazy(() => import("@/pages/payment/PaymentSuccess"));
const PaymentFail = lazy(() => import("@/pages/payment/PaymentFail"));
const PaymentCancel = lazy(() => import("@/pages/payment/PaymentCancel"));
const Home = lazy(() => import("@/pages/home"));
const ContactUs = lazy(() => import("@/pages/contact-us"));
const AboutUs = lazy(() => import("@/pages/about"));
const Tours = lazy(() => import("@/pages/tours"));
const DestinationsPage = lazy(() => import("@/pages/destinations"));
const DestinationDetails = lazy(() => import("@/pages/destinations-details"));
const TourGuiderPage = lazy(() => import("@/pages/tour-guide"));
const NotFoundPage = lazy(() => import("@/pages/not-found"));
const BlogPage = lazy(() => import("@/pages/blog"));
const BlogDetails = lazy(() => import("@/pages/blog-details"));
const PrivacyPolicyPage = lazy(() => import("@/pages/privacy-policy"));
const TermsOfService = lazy(() => import("@/pages/terms-of-service"));
const EditTour = lazy(() => import("@/pages/admin/edit-tour"));
const EditBlog = lazy(() => import("@/pages/admin/edit-blog"));

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
        Component: BlogPage,
        path: "blog",
      },
      {
        Component: BlogDetails,
        path: "blog/:id",
      },
      {
        Component: ContactUs,
        path: "contact-us",
      },
      {
        Component: PrivacyPolicyPage,
        path: "privacy-policy",
      },
      {
        Component: TermsOfService,
        path: "terms-of-service",
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
        { path: "edit-tour/:slug", Component: EditTour },
        { path: "edit-blog/:slug", Component: EditBlog },
      ...generateRoutes(adminSidebarMenus),
    ],
  },

  {
    Component: withoutAuth(LoginPage),
    path: "login"
  },
  {
    Component: withoutAuth(RegistrationPage),
    path: "registration"
  },
  {
    Component: withoutAuth(VerifyPage),
    path: "verify"
  }
]);