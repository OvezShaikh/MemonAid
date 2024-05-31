import React from 'react'
import Home from '../Home/Home'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateCampaigns from '../Campaigns/CreateCampaigns/CreateCampaigns'
import AdminPage from '../AdminPanel/AdminPage';

const HomePage = () => {
  return (
   <>
    <Home/>
    </>

  )
}

export default HomePage
