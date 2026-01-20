import { useEffect } from "react";
import { useLocation } from "react-router";

const RETURN_TO_KEY = "triplan:returnTo";

// Tracks the last "real" page a guest visited so if they later go to `/login`
// directly, we can still send them back after login.
export default function ReturnToTracker() {
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname || "/";
    const isAuthPage =
      pathname === "/login" ||
      pathname === "/registration" ||
      pathname === "/verify";

    if (isAuthPage) return;

    const returnTo = `${location.pathname}${location.search ?? ""}${location.hash ?? ""}`;
    sessionStorage.setItem(RETURN_TO_KEY, returnTo);
  }, [location.pathname, location.search, location.hash]);

  return null;
}