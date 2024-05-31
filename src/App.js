import React from "react";
import "./App.css";
import AdminPage from "../src/pages/AdminPanel/AdminPage";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/LandingPage/index";
import CreateCampaigns from "./pages/Campaigns/CreateCampaigns/Index";
import CurrentCampaign from "./pages/Campaigns/CurrentCampaign/Index";
import CampaignsByCategory from "./pages/Campaigns/CampaignsByCategory/Index";
import OnGoingCampaigns from "./pages/Campaigns/OnGoingCampaigns/Index";
import LoginOnSmallScreen from "./pages/login/Login_page/LoginOnSmallScreen";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-image-crop/dist/ReactCrop.css";
import RegisterSmallScreen from "./pages/login/Sign_Up/RegisterSmallScreen";

import "react-toastify/dist/ReactToastify.css";
import ForgotPasswordSmScreen from "./pages/login/ForgotPassword/ForgotPasswordSmScreens";
import Account from "./pages/Account Settings/Index";
import Donate from "./pages/Donate/Index";
import AdminPanelLandingPage from "./components/AdminPanelPages/AdminPanelLandingPage/Index";
import UserPage from "./pages/User Page/User_page";
import AddPages from "./pages/AddPages/Index";
import PageDoesNotExists from "./pages/PageDoesNotExists/NotFoundPage";
import SuccessfulCampaign from "./pages/Campaigns/SuccessfulCampaign/Index";

function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
function App() {
  return (
    <div className="container p-0">
      <BrowserRouter>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          limit={3}
          theme="colored"
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
        />
        <ScrollToTop />
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/Home" element={<HomePage />} />
          <Route path="/Home/Create-Campaign" element={<CreateCampaigns />} />
          <Route path="/Home/OnGoingCampaigns" element={<OnGoingCampaigns />} />
          <Route path="/AdminPanel/*" element={<AdminPage />} />
          <Route path="/User/*" element={<UserPage />} />

          <Route
            path="/Home/CampaignsByCategory/:name"
            element={<CampaignsByCategory />}
          />
          <Route path="/Home/Login" element={<LoginOnSmallScreen />} />
          <Route path="/Home/Register" element={<RegisterSmallScreen />} />

          <Route path="/campaign-details/:id" element={<CurrentCampaign />} />

          <Route
            path="/Home/Password-Reset"
            element={<ForgotPasswordSmScreen />}
          />

          <Route path="/Home/account-settings" element={<Account />} />
          <Route path="/Home/donate" element={<Donate />} />
          <Route path="/Home/donate/:id" element={<Donate />} />

          <Route
            path="/adminpanellandingpage"
            element={<AdminPanelLandingPage />}
          />
          <Route
            path="/Home/Successful-campaign"
            element={<SuccessfulCampaign />}
          />
          <Route path="/Home/:slug" element={<AddPages />} />
          <Route path="*" element={<PageDoesNotExists />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
