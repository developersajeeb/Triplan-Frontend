import { Outlet } from "react-router";
import CommonLayouts from "./components/layouts/CommonLayouts";
import ScrollToTop from "./components/utilities/ScrollToTop";
import { useUserInfoQuery } from "./redux/features/user/user.api";
import { useHydrateWishlist } from "./hooks/useHydrateWishlist";

const App = () => {
  const { data: userData } = useUserInfoQuery(undefined);
  const isLoggedIn = Boolean(userData?.data?._id);
  const dbWishlist = userData?.data?.wishlist || [];

  useHydrateWishlist(isLoggedIn, dbWishlist);

  return (
    <CommonLayouts>
      <ScrollToTop />
      <Outlet />
    </CommonLayouts>
  );
};

export default App;