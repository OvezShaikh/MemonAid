import React, { useContext, useMemo, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import images from "../../../constants/images";
import Link from "@mui/material/Link";
import Breadcrumbs from "@mui/material/Breadcrumbs";

function Index({ label, heading, titleName, remove }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const title = useMemo(() => {
    let modifiedPathname = pathname
      .replace("%20", "")
      .replace("-", " ")
      .replace("/Home", "Home")
      .replace("CampaignsByCategory", "Campaigns By Category");

    // Check if the 'remove' prop is true and remove the last part of the pathname
    if (remove) {
      modifiedPathname = modifiedPathname.split("/").slice(0, -1).join("/");
    }

    return modifiedPathname;
  }, [pathname, remove]);
  // function handleClick(event, path) {
  //   navigate(`/${path}`);
  //   event.preventDefault();
  //   console.info("You clicked a breadcrumb.");
  // }
  return (
    <div>
      <div
        className="pl-[48px] gap-[48px] max-tablet:gap-[28px] pt-[110px] max-desktop:w-full max-desktop:px-[28px] max-desktop:place-content-center max-tablet:px-[16px]"
        style={{
          width: "100%",
          height: "100%",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",

          display: "inline-flex",
        }}
      >
        <Typography
          variant="h6"
          noWrap
          component="div"
          fontSize={"1rem"}
          color={"black"}
          display="flex"
          flexDirection={"column"}
          alignItems="start"
          className="text-capitalize text-truncate"
          // title={title}
        >
          <div className="text-capitalize text-truncate max-tablet:flex max-tablet:flex-col-reverse max-desktop:flex max-desktop:flex-col-reverse">
            <div
              className=" pb-4 max-desktop:pt-0 max-tablet:pt-0"
              onClick={() => navigate(-1)}
            >
              <img src={images.ArrowBack} alt="" />
            </div>
            <div
              className="flex flex-col text-black/70 max-desktop:pb-0 max-tablet:pb-0 bread-crumbs-div"
              style={{
                fontFamily: "satoshi",
                fontSize: "1.2rem",
                fontWeight: 700,
                paddingBottom: "30px",
              }}
            >
              <Breadcrumbs
                className="breadcrumbs_navigation"
                sx={{
                  color: "#B6BAC3",
                  fontSize: "1rem",
                  fontFamily: "Satoshi",
                  fontWeight: 500,
                }}
                separator="/"
                aria-label="breadcrumb"
              >
                {title?.split("/")?.map((item, i) => {
                  return (
                    <Link
                      underline="hover"
                      style={{ cursor: "pointer" }}
                      key={i}
                      color="inherit"
                      // onClick={(e) => handleClick(e, item)}
                    >
                      {item}
                    </Link>
                  );
                })}
              </Breadcrumbs>
            </div>
          </div>
        </Typography>
      </div>
      <Grid
        className="bg-[#FFF6F5] w-full h-[100px]"
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <h1
          className="max-tablet:text-[24px] max-desktop:text-[34px] font-[satoshi] text-[48px] font-bold desktop:font-black"
          style={{
            background: "linear-gradient(to right, #FF9F0A 0%, #FF375F 62.9%)",
            "-webkit-background-clip": "text",
            "-webkit-text-fill-color": "transparent",
          }}
        >
          {heading}
        </h1>
      </Grid>
    </div>
  );
}

export default Index;
