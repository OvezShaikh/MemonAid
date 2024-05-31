import React from "react";
import AdminNavbar from "../AdminNavbar";
import { SideBar } from "../sideBar";
import { useMediaQuery } from "@mui/material";

const AdminLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = React.useState(true);
  const isMobile = useMediaQuery("(max-width:900px)");

  return (
    <>
      <AdminNavbar />
      <SideBar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}></SideBar>
      <div
        className="main-container transition-all duration-500 ease-in-out max-tablet:pr-0 "
        style={{
          width: isMobile
            ? "100%"
            : mobileOpen
            ? `calc(100vw - 290px)`
            : "100%",
          marginLeft: isMobile ? "0px" : mobileOpen ? "270px" : "0px",
          paddingRight: isMobile ? "2rem" : mobileOpen ? "15px" : "2rem",
        }}
      >
        {children}
      </div>
      <hr className="pb-5" />
    </>
  );
};

export default AdminLayout;
