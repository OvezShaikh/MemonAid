import React, { useState } from 'react'
import DashboardActivities from './components/DashboardActivities'
import OngoingCampaigns from './components/OngoingCampaigns'
import MembersByCountries from './components/MembersByCountries'
import DonationInMonths from './components/DonationInMonths'

import { Chart as ChartJs } from "chart.js/auto"
import { donationValues } from "./components/constant/data"
function Dashboard() {
  const funds = donationValues.fundraised_data
  const [userData, setUserData] = useState(
    {
      labels: funds.map(date => date.date),
      datasets: [{
        label: "nos of Amount",
        data: funds.map(date => date.total_amount),
        backgroundColor: ["red", "blue"]
      }],
    });
  return (
    <div className='py-6 px-4 grid grid-cols-2 gap-4  dashboard-div font-[satoshi] max-desktop:grid-cols-1'>
      <DashboardActivities />
      <OngoingCampaigns />
      <MembersByCountries />
      <DonationInMonths />
    </div>
  )
}

export default Dashboard