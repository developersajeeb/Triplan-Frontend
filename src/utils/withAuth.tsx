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
      return (
        <Navigate
          to="/login"
          state={{ from: location }}
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