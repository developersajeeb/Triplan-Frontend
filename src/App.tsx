import { Outlet } from "react-router";
import CommonLayouts from "./components/layouts/CommonLayouts";
import ScrollToTop from "./components/utilities/ScrollToTop";
import ReturnToTracker from "./components/utilities/ReturnToTracker";

const App = () => {
  return (
    <CommonLayouts>
      <ScrollToTop />
      <ReturnToTracker />
      <Outlet />
    </CommonLayouts>
  );
};

export default App;