import React from "react";
import { Route, Routes } from "react-router-dom";
import UserPanel from "../../components/layout/User Dashboard/Index";
import MyDonation from "../../components/AdminPanelPages/MyDonation/Index";
import Withdrawals from "../../components/UserPanelPages/Withdrawls/Index";
import DonationView from "../../components/UserPanelPages/UserForms/DonationView/Index";
import ViewBankandKYC from "../../components/UserPanelPages/UserForms/ViewBankandKYC/Index";
import EditBankAndKYC from "../../components/UserPanelPages/UserForms/EditBankAndKYC/Index";
import User_Dashboard from "../../pages/User Dashboard/Index";
import User_Campaign from "../../components/UserPanelPages/Campaign/User_Campaign";
import User_Donation from "../../components/UserPanelPages/Donation/User_Donation";
import ScholarshipCause from "../../components/AdminPanelPages/Scholarship Cause/Index";
import EditCampaign from "../../components/UserPanelPages/Campaign/EditCampaign";
import PageDoesNotExists from "../../pages/PageDoesNotExists/NotFoundPage";

function UserPage() {
  return (
    <div className="">
      <Routes>
        <Route
          path="/"
          element={
            <UserPanel>
              <User_Dashboard />
            </UserPanel>
          }
        />

        <Route
          path="/Dashboard"
          element={
            <UserPanel>
              <User_Dashboard />
            </UserPanel>
          }
        />
        <Route
          path="/Campaigns"
          element={
            <UserPanel>
              <User_Campaign />
            </UserPanel>
          }
        />
        <Route
          path="/Campaigns/View"
          element={
            <UserPanel>
              <ViewBankandKYC />
            </UserPanel>
          }
        />
        <Route
          path="/Campaigns/Edit"
          element={
            <UserPanel>
              <EditBankAndKYC />
            </UserPanel>
          }
        />
        <Route
          path="/Campaigns/Edit-Campaign"
          element={
            <UserPanel>
              <EditCampaign />
            </UserPanel>
          }
        />

        <Route
          path="/Donations"
          element={
            <UserPanel>
              <User_Donation />
            </UserPanel>
          }
        />
        <Route
          path="/Donations/View"
          element={
            <UserPanel>
              <DonationView />
            </UserPanel>
          }
        />
        <Route
          path="/My-Donations"
          element={
            <UserPanel>
              <MyDonation />
            </UserPanel>
          }
        />

        <Route
          path="/Withdrawals"
          element={
            <UserPanel>
              <Withdrawals />
            </UserPanel>
          }
        />
        <Route
          path="/Scholarships"
          element={
            <UserPanel>
              <ScholarshipCause />
            </UserPanel>
          }
        />
        <Route path="*" element={<PageDoesNotExists />} />
      </Routes>
    </div>
  );
}

export default UserPage;
