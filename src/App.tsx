import { Outlet } from "react-router";
import CommonLayouts from "./components/layouts/CommonLayouts";
import ScrollToTop from "./components/utilities/ScrollToTop";

const App = () => {
  return (
    <CommonLayouts>
      <ScrollToTop />
      <Outlet />
    </CommonLayouts>
  );
};

export default App;