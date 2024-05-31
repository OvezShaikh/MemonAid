import React, { useContext, useMemo } from "react";
import images from "../../../constants/images";
import { Navbar } from "react-bootstrap";
import {
  Grid,
  IconButton,
  ToggleButton,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import { useLocation, useNavigate } from "react-router-dom";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Link from "@mui/material/Link";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { LuPanelRight } from "react-icons/lu";

const NavbarContainer = ({ handleDrawerToggle, mobileOpen }) => {
  const sideBar = useMediaQuery("(max-width: 600px)");
  const [alignment, setAlignment] = React.useState("web");

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  function handleClick(event, path) {
    navigate(`/${path}`);
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }

  let title = useMemo(
    () =>
      `${pathname
        .split("/")
        .reverse()[0]
        .replace("/", "")
        .replace(/\/*\[[^\]]*]/g, "")
        .replace(/-/g, " ")
        .replace(/\//g, "  ")
        .replace("General Settings", " ")}`,

    [pathname]
  );

  // title = title?.split("AdminPanel").reverse()[0]

  return (
    <Navbar
      className="py-2 transition-all duration-500 ease-in-out"
      variant="light"
      style={{
        display: "inline-block",
        position: "fixed",
        right: 0,
        top: "72px",
        zIndex: "99",
        padding: "16px 16px  ",

        width: `${
          sideBar ? "100vw" : mobileOpen ? "calc(100vw - 273px)" : "100vw"
        }`,
        height: "77px",
        backgroundColor: `${sideBar ? "rgba(255, 235, 209, 1)" : "#fff"}`,
        backgroundColor: "#fff",
        borderBottom: `1px solid #E2E2E2`,
      }}
    >
      <Grid
        container
        className={`${
          sideBar
            ? "d-flex justify-content-between pe-1"
            : "d-flex justify-content-between"
        }`}
      >
        <Grid item xs={9} md={7}>
          <Toolbar
            sx={{ minHeight: "60px !important", width: "100%", padding: 0 }}
          >
            <Box className="d-flex justify-content-between align-items-center w-100 ">
              <Typography
                variant="h6"
                noWrap
                component="div"
                fontSize={"1rem"}
                color={"black"}
                display="flex"
                alignItems="center"
                className="text-capitalize text-truncate"
                title={title}
              >
                <div className="me-3" onClick={() => navigate(-1)}>
                  <img src={images.account} alt="" />
                </div>
                <div
                  className="flex flex-col "
                  style={{
                    fontFamily: "satoshi",
                    fontSize: "1.2rem",
                    fontWeight: 600,
                  }}
                >
                  {title ? <>{title}</> : "dashboard"}
                  <Breadcrumbs
                    className="breadcrumbs_title max-tablet:hidden"
                    sx={{
                      color: "#B6BAC3",
                      fontSize: "0.9rem",
                      fontFamily: "Satoshi",
                      fontWeight: 500,
                    }}
                    separator={<NavigateNextIcon aria-label="breadcrumb" />}
                    aria-label="breadcrumb"
                  >
                    {/* {breadcrumbs} */}
                    {pathname
                      ?.substr(1)
                      ?.split("/")
                      ?.map((item, i) => {
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
              </Typography>
            </Box>
          </Toolbar>
        </Grid>

        <Grid
          item
          display={"flex"}
          justifyContent={"flex-end"}
          alignItems="center"
          marginRight={"1rem"}
          className="max-tablet:mr-0!"
        >
          <ToggleButtonGroup
            size="small"
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
          >
            <ToggleButton
              onClick={handleDrawerToggle}
              value="underlined"
              aria-label="underlined"
            >
              <LuPanelRight style={{ fontSize: 27 }} />
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      </Grid>
    </Navbar>
  );
};

export default NavbarContainer;
