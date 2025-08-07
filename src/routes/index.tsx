import App from "@/App";
import AdminLayout from "@/components/layouts/AdminLayout";
import About from "@/pages/about/About";
import Dashboard from "@/pages/dashboard/Dashboard";
import LoginPage from "@/pages/login/LoginPage";
import RegistrationPage from "@/pages/registration/RegistrationPage";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: About,
        path: "about-us",
      },
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
    Component: AdminLayout,
    path: "admin",
    children: [
      {
        Component: Dashboard,
        path: "dashboard",
      },
    ],
  },
]);