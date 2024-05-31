import React from "react";

import AdminLayout from "../../components/layout/AdminLayout/Index";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminRoutes from "./AdminRoutes";
import Dashboard from "../../components/AdminPanelPages/Dashboard/Index";
import Donation from "../../components/AdminPanelPages/Donation/Index";
import Categories from "../../components/AdminPanelPages/Categories/Index";
import Pages from "../../components/AdminPanelPages/Pages/Index";
import Campaign from "../../components/AdminPanelPages/Campaign/Campaign";
import ReportedCauses from "../../components/AdminPanelPages/ReportedCauses/index";
import DonationView from "../../components/AdminPanelPages/Donation/DonationView";
import Withdrawals from "../../components/AdminPanelPages/Withdrawals/Index";
import Users from "../../components/AdminPanelPages/Users/Index";
import CategoryEdit from "../../components/AdminPanelPages/Forms/CategoryEdit/Index";
import Scholarship from "../../components/AdminPanelPages/Scholarship Cause/Index";
import RevisionHistory from "../../components/AdminPanelPages/Forms/RevisionHistory/Index";
import Campaign_Kyc from "../../components/AdminPanelPages/Campaign_kyc/Index";
import PagesEdit from "../../components/AdminPanelPages/Forms/PagesEdit/Index";
import UserEdit from "../../components/AdminPanelPages/Forms/UserEdit/Index";
import View from "../../components/AdminPanelPages/Withdrawals/View";
import PaymentGateway from "../../components/AdminPanelPages/PaymentGateway/Index";
import CausesView from "../../components/AdminPanelPages/CauseKYC/CausesView";
import LandingPage from "../../components/AdminPanelPages/AdminPanelLandingPage/Index";
import CauseEdit_Form from "../../components/AdminPanelPages/CauseEditApprovel/CauseEdit";
import CauseEdit from "../../components/AdminPanelPages/CauseEditApprovel/Index";
import Scholarships from "../../components/AdminPanelPages/Scholarships/Index";
import CampaignView from "../../components/AdminPanelPages/Forms/CampaignVeiw/Index";
import PageDoesNotExists from "../../pages/PageDoesNotExists/NotFoundPage";

function AdminPage() {
  return (
    <div className="">
      <Routes>
        <Route
          path="/"
          element={
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          }
        />

        <Route
          path="/General-Settings/*"
          element={
            <AdminLayout>
              <AdminRoutes />
            </AdminLayout>
          }
        />

        <Route
          path="/Dashboard"
          element={
            <AdminLayout>
              <h1>Dashboard</h1>
            </AdminLayout>
          }
        />
        <Route
          path="/Landing-Page"
          element={
            <AdminLayout>
              <LandingPage />
            </AdminLayout>
          }
        />
        <Route
          path="/Categories"
          element={
            <AdminLayout>
              <Categories />
            </AdminLayout>
          }
        />
        <Route
          path="/Categories/Edit"
          element={
            <AdminLayout>
              <CategoryEdit />
            </AdminLayout>
          }
        />
        <Route
          path="/Campaigns"
          element={
            <AdminLayout>
              <Campaign />
            </AdminLayout>
          }
        />
        <Route
          path="/Campaigns/Edit"
          element={
            <AdminLayout>
              <CauseEdit />
            </AdminLayout>
          }
        />
        <Route
          path="/Campaigns/Edit/Revision-History"
          element={
            <AdminLayout>
              <RevisionHistory />
            </AdminLayout>
          }
        />
        <Route
          path="/Causes-Edit-Approval"
          element={
            <AdminLayout>
              <CauseEdit_Form />
            </AdminLayout>
          }
        />
        <Route
          path="/Causes-Edit-Approval/View"
          element={
            <AdminLayout>
              <CampaignView />
            </AdminLayout>
          }
        />
        <Route
          path="/Scholarship-Cause"
          element={
            <AdminLayout>
              <Scholarship />
            </AdminLayout>
          }
        />
        <Route
          path="/Scholarship-Cause/View"
          element={
            <AdminLayout>
              <View />
            </AdminLayout>
          }
        />
        <Route
          path="/Reported-Cause"
          element={
            <AdminLayout>
              <ReportedCauses />
            </AdminLayout>
          }
        />

        <Route
          path="/Withdrawals"
          element={
            <AdminLayout>
              <Withdrawals />
            </AdminLayout>
          }
        />
        <Route
          path="/Withdrawals/View"
          element={
            <AdminLayout>
              <View />
            </AdminLayout>
          }
        />
        <Route
          path="/Cause-KYC"
          element={
            <AdminLayout>
              <Campaign_Kyc />
            </AdminLayout>
          }
        />
        <Route
          path="/Cause-KYC/View"
          element={
            <AdminLayout>
              <CausesView />
            </AdminLayout>
          }
        />
        <Route
          path="/Donations"
          element={
            <AdminLayout>
              <Donation />
            </AdminLayout>
          }
        />
        <Route
          path="/Donations/View"
          element={
            <AdminLayout>
              <DonationView />
            </AdminLayout>
          }
        />
        <Route
          path="/Users"
          element={
            <AdminLayout>
              <Users />
            </AdminLayout>
          }
        />
        <Route
          path="/Users/Edit"
          element={
            <AdminLayout>
              <UserEdit />
            </AdminLayout>
          }
        />
        <Route
          path="/Scholarships"
          element={
            <AdminLayout>
              <Scholarships />
            </AdminLayout>
          }
        />
        <Route
          path="/Scholarships/View"
          element={
            <AdminLayout>
              <View />
            </AdminLayout>
          }
        />
        <Route
          path="/Pages"
          element={
            <AdminLayout>
              <Pages />
            </AdminLayout>
          }
        />
        <Route
          path="/Pages/Edit"
          element={
            <AdminLayout>
              <PagesEdit />
            </AdminLayout>
          }
        />

        <Route
          path="/PG-Setting/PhonePe"
          element={
            <AdminLayout>
              <PaymentGateway />
            </AdminLayout>
          }
        />
        <Route path="*" element={<PageDoesNotExists />} />
      </Routes>
    </div>
  );
}

export default AdminPage;
