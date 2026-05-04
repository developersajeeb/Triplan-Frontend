import { Outlet } from "react-router";
import CommonLayouts from "./components/layouts/CommonLayouts";
import ScrollToTop from "./components/utilities/ScrollToTop";
import ReturnToTracker from "./components/utilities/ReturnToTracker";
import RouteProgressBar from "./components/utilities/RouteProgressBar";

const App = () => {
  return (
    <CommonLayouts>
      <RouteProgressBar />
      <ScrollToTop />
      <ReturnToTracker />
      <Outlet />
    </CommonLayouts>
  );
};

export default App;