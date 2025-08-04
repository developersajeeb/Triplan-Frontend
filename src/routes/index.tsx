import App from "@/App";
import AdminLayout from "@/components/layouts/AdminLayout";
import About from "@/pages/about/About";
import Dashboard from "@/pages/dashboard/Dashboard";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: About,
        path: "about",
      },
    ],
  },
  {
    Component: AdminLayout,
    path: "/admin",
    children: [
      {
        Component: Dashboard,
        path: "dashboard",
      },
    ],
  },
]);