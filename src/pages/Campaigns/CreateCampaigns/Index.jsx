import React from 'react'
import Footer from '../../../components/layout/Footer'
import UserNavbar from '../../login/UserNavbar'
import Navbar from '../../../components/layout/Navbar'
import CreateCampaigns from './CreateCampaigns'
function Index() {
  return (
    <>
      <Navbar />
      <CreateCampaigns />
      <Footer />
    </>
  )
}

export default Index