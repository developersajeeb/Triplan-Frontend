import { useUserInfoQuery } from "@/redux/features/user/user.api";
import type { TRole } from "@/types";
import type { ComponentType } from "react";
import { Navigate, useLocation } from "react-router";

export const withAuth = (Component: ComponentType, requiredRole?: TRole) => {
  return function AuthWrapper() {
    const { data, isLoading } = useUserInfoQuery(undefined);
    const location = useLocation();

    if (isLoading) return null;

    if (!isLoading && !data?.data?.email) {
      const returnTo = `${location.pathname}${location.search ?? ""}${location.hash ?? ""}`;
      const searchParams = new URLSearchParams();
      searchParams.set("returnTo", returnTo);
      return (
        <Navigate
          to={`/login?${searchParams.toString()}`}
          replace
        />
      );
    }

    if (requiredRole && !isLoading && requiredRole !== data?.data?.role) {
      return <Navigate to="/not-found" replace />;
    }

    return <Component />;
  };
};