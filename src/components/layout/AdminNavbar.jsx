import React, { useState } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import TuneIcon from "@mui/icons-material/Tune";
import HelpIcon from "@mui/icons-material/Help";
import Images from "../../constants/images";
import LogoImg from "../../assets/MemonLogo.png";
import DropDown from "./navbar/DropDown";
import { useMediaQuery } from "@mui/material";
import Badge from "@mui/material/Badge";

import { Avatar, Grid, Stack } from "@mui/material";
import { Search } from "../inputs/Search";
import { Link } from "react-router-dom";
import { useGetAll } from "../../Hooks";
import ProfileAvatar from "../../pages/login/ProfileAvatar";

const Navbar = () => {
  const isTab = useMediaQuery("(max-width: 1100px)");
  const sideBar = useMediaQuery("(max-width: 900px)");

  let userData = localStorage.getItem("user_info");
  let Data = JSON.parse(userData);
  let username = Data?.username;
  let user_role = Data?.user_role;
  let profile_pic = Data?.profile_pic;

  return (
    <>
      <nav className=" fixed top-0 left-0 right-0 z-10 pl-5 pr-5 bg-white border-b-2 border-[#D8DBDF] max-tablet:pl-2 border-solid justify-between  items-center inline-flex">
        <div className="w-[815.56px] self-stretch pt-2 pb-2 justify-start items-center gap-4 max-tablet:pl-0 flex">
          <div className="w-24 h-9 relative">
            <Link to={"/Home"}>
              <img src={LogoImg} alt="" />
            </Link>
          </div>
        </div>
        <div className="w-auto self-stretch    pb-2 pt-2 rounded justify-start items-center flex">
          <div className="flex-row ps-2 justify-start items-center inline-flex ">
            <Grid
              item
              display={"flex"}
              justifyContent={"flex-end"}
              alignItems="center"
            >
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="flex-end"
                className="font-light "
                style={{
                  fontSize: "0.75rem",
                  marginRight: "10px",
                  color: "#828282",
                  fontWeight: "500",
                  width: `${isTab ? (sideBar ? "" : "130%") : "150%"}`,
                }}
              >
                <p className="text-truncate m-0" style={{ maxWidth: "100%" }}>
                  {username}
                </p>
                <p className="text-truncate m-0" style={{ maxWidth: "100%" }}>
                  {user_role}
                </p>
              </Stack>
              <ProfileAvatar />
            </Grid>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
