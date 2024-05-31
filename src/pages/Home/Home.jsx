import React from "react";
import "./Home.css";

import button from "../../constants/button";
import Card from "../../components/layout/Card";
import ScrollableTabsButtonForce from "../../components/layout/ScrollableTabsButtonAuto";
import Carousal from "../../components/layout/Carousal";
import Footer from "../../components/layout/Footer";
import Navbar from "../../components/layout/Navbar";
import DashBoard from "../../components/layout/DashBoard";
import PrimaryButton from "../../components/inputs/PrimaryButton";
import { useState, useEffect } from "react";
import axios from "axios";
import UserNavbar from "../login/UserNavbar";

import images from "../../constants/images";
import { color } from "@mui/system";
import { Link } from "react-router-dom";

import BottomSlider from "../../components/layout/BottomSlider/Index";

import FilterField from "../../components/inputs/FilterField/Index";
import UserLogin from "../login/Login_page/Index";

function Home() {
  const [userList, setUserList] = useState([]);

  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [campaignCount, setCampaignCount] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const [perPage, setPerPage] = useState(100);
  const [tabName, setTabName] = useState("newly_added");
  const [categoryDataFromChild, setCategoryDataFromChild] = useState("");
  const [locationDataFromChild, setLocationDataFromChild] = useState("");
  const [filterName, setFilterName] = useState("");

  const [visibleCards, setVisibleCards] = useState(8);

  const receiveCategoryFromChild = (categoryData) => {
    setCategoryDataFromChild(categoryData);
  };

  const receiveLocationFromChild = (locationData) => {
    setLocationDataFromChild(locationData);
  };

  const handleTabChange = (index, label) => {
    switch (label) {
      case "Newly Added":
        setTabName("newly_added");
        break;
      case "Most Supported":
        setTabName("most_supported");
        break;
      case "Needs Love":
        setTabName("needs_love");
        break;
      case "Expiring Soon":
        setTabName("expiring_soon");
        break;
      case "Trending":
        setTabName("trending");
        break;
      default:
        setTabName("");
    }
  };

  const filteredUserList = Array.from(
    new Set(
      userList
        .filter((item) => {
          const isDataMatch =
            (categoryDataFromChild.length === 0 &&
              locationDataFromChild.length === 0) ||
            (categoryDataFromChild.includes(item.category.name) &&
              locationDataFromChild.length === 0) ||
            (locationDataFromChild.includes(item.location) &&
              categoryDataFromChild.length === 0) ||
            (categoryDataFromChild.includes(item.category.name) &&
              locationDataFromChild.includes(item.location));

          return isDataMatch;
        })
        .map((item) => item.id)
    )
  ).map((id) => userList.find((item) => item.id === id));

  const filteredCardCount = filteredUserList.length;

  const filterToggle = () => {
    setShowOptions(!showOptions);
  };

  const loadMore = () => {
    setVisibleCards((prevVisibleCards) => prevVisibleCards + 4);

    if (page < totalPages) {
      setPage(page + 1);
    }

    if (visibleCards >= perPage) {
      setPerPage(perPage + 100);
    }
  };

  const fetchUserListFromTabs = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/campaign/campaign-filter?page=${page}&limit=${perPage}&filter=${tabName}`
      );

      const res = response.data;

      setFilterName(res.filter_key);
      if (Array.isArray(res.rows)) {
        setTotalPages(res.pages_count);
        setUserList(res.rows);
        setCampaignCount(res.count);
      } else {
        console.error("Invalid data structure. Expected an array:", res.data);
      }
    } catch (error) {
      console.error("Error fetching user list:", error);
    }
  };
  useEffect(() => {
    fetchUserListFromTabs();
  }, [tabName]);

  const fetchCampaigns = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/campaign/campaign-filter?page=${page}&limit=${perPage}&filter=${tabName}`
      );
      const res = response.data;
      if (Array.isArray(res.rows)) {
        setTotalPages(res.pages_count);
        setUserList([...userList, ...res.rows]);
        setCampaignCount(res.count);
      } else {
        console.error("Invalid data structure. Expected an array:", res.data);
      }
    } catch (error) {
      console.error("Error fetching user list:", error);
    }
  };
  useEffect(() => {
    fetchCampaigns();
  }, [page]);

  return (
    <>
      <div className="">
        <Navbar />
      </div>
      <div>
        <Carousal />
      </div>
      <div
        className="bg-[#FFF6F5] desktop:justify-between max-desktop:flex-wrap max-desktop:justify-center max-desktop:gap-y-[64px] desktop:px-[48px] desktop:py-[48px] max-desktop:py-[80px] max-tablet:py-[60px] max-tablet:gap-y-[32px]"
        style={{
          width: "100%",
          height: "100%",
          alignItems: "flex-start",
          display: "flex",
        }}
      >
        <DashBoard />
      </div>
      <div className="flex pt-[128px] ">
        <div className="w-full flex-wrap flex flex-col items-center mx-10">
          <h1
            className="font-extrabold pb-[24px] desktop:text-[3rem] max-desktop:text-[2.25rem] max-tablet:text-[1.5rem] max-tablet:pb-[20px]"
            style={{ fontFamily: "Satoshi" }}
          >
            Ongoing Campaigns
          </h1>
          <div className="flex flex-col  text-center text-black/100 mb-[64px] max-tablet:mb-[52px]">
            <Link
              to="/Home/OnGoingCampaigns"
              style={{
                width: "100%",
                textAlign: "center",
                fontSize: "1.5rem",
                fontFamily: "Satoshi",
                fontWeight: "500",
                wordWrap: "break-word",
                background:
                  "linear-gradient(to right, #FF9F0A 0%, #FF375F 62.9%)",
                "-webkit-background-clip": "text",
                "-webkit-text-fill-color": "transparent",
                textDecoration: "underline",
                position: "relative",
              }}
            >
              <p className="gradient-button mb-0 underline max-tablet:text-[1rem]">
                See all {campaignCount} active campaigns
              </p>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-wrap w-full mb-[128px] items-center max-tablet:mb-[48px]">
        <div className="flex  desktop:ml-[-30px] desktop:max-w-[1760px] desktop:w-full desktop:justify-between max-desktop:w-[90%] max-desktop:flex-col max-desktop:items-end max-desktop:gap-y-[48px] max-tablet:mb-[50px] max-tablet:gap-y-[20px] scrollable-tabs-class ">
          <ScrollableTabsButtonForce onTabChange={handleTabChange} />
          <button
            className="flex items-center ml-2 px-3 py-1.5 max-w-[115px] gap-x-[12px] max-desktop:px-[20px] max-desktop:py-[17px] max-tablet:py-[6px]"
            style={{ backgroundColor: "rgba(255, 246, 245, 1)" }}
            onClick={filterToggle}
          >
            <img src={images.Funnel} alt="" />
            <p
              className="text-[1.1rem]"
              style={{
                background:
                  "linear-gradient(to right, #FF9F0A 0%, #FF375F 62.9%)",
                "-webkit-background-clip": "text",
                "-webkit-text-fill-color": "transparent",
                "font-family": "Satoshi",
                "font-weight": "700",
              }}
            >
              Filter
            </p>
          </button>
        </div>
        {showOptions && (
          <FilterField
            sendCategoryToParent={receiveCategoryFromChild}
            sendLocationToParent={receiveLocationFromChild}
          />
        )}
        <div className="desktop:gap-x-[36px] desktop:gap-y-[48px] mt-[48px]  flex flex-wrap w-full justify-center desktop:max-w-[1740px] max-desktop:gap-x-[16px]  max-desktop:gap-y-[24px] max-tablet:gap-y-[48px]">
          {filteredUserList?.slice(0, visibleCards).map((item) => {
            return (
              <Card
                Profile_pic={item?.user?.profile_pic}
                filterName={filterName}
                key={item?.id}
                username={item?.user?.username}
                title={item.title}
                og_id={item.id}
                cardImage={item.campaign_image}
                goalAmount={item.goal_amount}
                fundRaised={item.fund_raised}
                daysLeft={item.days_left}
                userCount={item.donor_count}
                location={item.location}
              />
            );
          })}
        </div>
        <button
          className="pt-[64px] max-tablet:pt-[24px]"
          onClick={() => loadMore()}
          disabled={visibleCards >= campaignCount}
          id="loadmorebutton"
          style={{
            width: "fit-content",
            textAlign: "center",
            color: "#FF9F0A",
            fontSize: "1.5rem",
            fontFamily: "Satoshi",
            fontWeight: "500",
            textDecoration: "underline",
            wordWrap: "break-word",
            background: "linear-gradient(to right, #FF9F0A 0%, #FF375F 62.9%)",
            "-webkit-background-clip": "text",
            "-webkit-text-fill-color": "transparent",
            textDecoration: "underline",
            display:
              visibleCards >= campaignCount || filteredCardCount < 8
                ? "none"
                : "block",
            position: "relative",
          }}
        >
          <p className="gradient-button mb-0">Load More</p>
        </button>
      </div>
      <section className="bg-[#FFF6F5]">
        <div
          className="flex flex-col flex-wrap w-full   desktop:py-[128px] px-7  items-center max-desktop:py-[80px] max-tablet:py-[64px]"
          style={{ backgroundColor: "rgba(255, 246, 245, 1)" }}
        >
          <h1
            className="font-bold pb-[96px] text-[3rem] max-desktop:pb-[48px] max-tablet:pb-[28px] max-tablet:text-[1.5rem]"
            style={{ fontFamily: "Satoshi", fontWeight: 900 }}
          >
            How it Works
          </h1>
          <div className="flex desktop:max-w-[94%] desktop:justify-between mt-0 place-items-center w-full max-desktop:flex-col max-desktop:gap-y-[40px] desktop:mb-[96px] max-desktop:mb-[48px]">
            <div className="place-items-center">
              <div className="max-w-[120px] mx-auto max-tablet:max-w-[75px]">
                <img className="" src={images.person} alt="" />
              </div>
              <div className="flex justify-between mt-[48px] gap-x-[20px]">
                <div>
                  <img className="mr-3 col-span-2" src={images.one} alt="" />
                </div>
                <div className=" ml-2 col-span-10">
                  <h1
                    className="text-[2.25rem] font-black max-tablet:text-[1.5rem] max-tablet:font-bold"
                    style={{
                      color: "#4A4E5A",

                      fontFamily: "Satoshi",

                      wordWrap: "break-word",
                    }}
                  >
                    Create your Profile
                  </h1>
                  <p
                    className="text-[1.5rem] max-tablet:text-[1.1rem] max-tablet:font-normal"
                    style={{
                      width: "100%",
                      color: "#6B7280",

                      fontFamily: "Satoshi",

                      wordWrap: "break-word",
                      marginTop: 6,
                    }}
                  >
                    Start with the basics
                    <br /> Kick things off with your
                    <br /> name and location.
                  </p>
                </div>
              </div>
            </div>
            <img
              className="col-span-1 max-desktop:rotate-90"
              alt=""
              src={images.Arrow}
            />
            <div className="col-span-3 grid grid-cols-1 place-items-center">
              <div className="desktop:max-w-[120px] max-tablet:max-w-[75px]">
                <img className="" src={images.pencicon} alt="" />
              </div>
              <div className="flex justify-between grid-cols-12 mt-[48px] gap-x-[20px]">
                <div>
                  <img className=" mr-3 col-span-2" src={images.two} alt="" />
                </div>
                <div className=" ml-2 col-span-10">
                  <h1
                    className="text-[2.25rem] font-black max-tablet:text-[1.5rem] max-tablet:font-bold"
                    style={{
                      color: "#4A4E5A",

                      fontFamily: "Satoshi ",

                      wordWrap: "break-word",
                    }}
                  >
                    Fill Cause Information
                  </h1>
                  <p
                    className="text-[1.5rem] max-tablet:text-[1.1rem] max-tablet:font-normal"
                    style={{
                      width: "100%",
                      color: "#6B7280",

                      fontFamily: "Satoshi",

                      wordWrap: "break-word",
                      marginTop: 6,
                    }}
                  >
                    Tell your story
                    <br /> We'll guide you with tips
                    <br /> along the way.
                  </p>
                </div>
              </div>
            </div>
            <img
              className="col-span-1 max-desktop:rotate-90"
              alt=""
              src={images.Arrow}
            />
            <div className="col-span-3 grid grid-cols-1  place-items-center">
              <div className="desktop:max-w-[120px] max-tablet:max-w-[75px]">
                <img className="" src={images.Home} alt="" />
              </div>
              <div className="flex justify-between grid-cols-12 mt-[48px] gap-x-[20px]">
                <div className="desktop:max-w-[120px]">
                  <img className="" src={images.three} alt="" />
                </div>
                <div className=" ml-2 col-span-10">
                  <h1
                    className="text-[2.25rem] font-black max-tablet:text-[1.5rem] max-tablet:font-bold"
                    style={{
                      color: "#4A4E5A",

                      fontFamily: "Satoshi",

                      wordWrap: "break-word",
                    }}
                  >
                    Update Acc details
                  </h1>
                  <p
                    className="text-[1.5rem] max-tablet:text-[1.1rem] max-tablet:font-normal"
                    style={{
                      width: "100%",
                      color: "#6B7280",

                      fontFamily: "Satoshi",

                      wordWrap: "break-word",
                      marginTop: 4,
                    }}
                  >
                    Upload ID and a valid
                    <br /> account number. Our team
                    <br /> will verify the same.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {localStorage.getItem("token") ? (
            <>
              <Link to="/Home/Create-Campaign">
                <PrimaryButton
                  sx={{
                    borderRadius: "var(--Pixels-8, 8px)",
                    fontSize: "1.2rem",
                    fontWeight: "900",
                    padding: "15px 28px 15px 28px",
                  }}
                  className="py-[15px] px-[28px] my-10"
                >
                  <div
                    className="mr-2"
                    style={{ width: 32, height: 32, position: "relative" }}
                  >
                    <img src={images.RocketLaunch} alt="" />
                  </div>
                  <div className="max-tablet:text-[1rem]">
                    Launch a Campaign Now !
                  </div>
                </PrimaryButton>
              </Link>
            </>
          ) : (
            <>
              <div className="max-tablet:hidden max-desktop:hidden">
                <PrimaryButton
                  sx={{
                    borderRadius: "var(--Pixels-8, 8px)",
                    fontSize: "1.2rem",
                    fontWeight: "900",
                    padding: "15px 28px 15px 28px",
                  }}
                  className="py-[15px] px-[28px] my-10"
                >
                  <div
                    className="mr-2"
                    style={{ width: 32, height: 32, position: "relative" }}
                  >
                    <img src={images.RocketLaunch} alt="" />
                  </div>
                  <div className="max-tablet:text-[1rem]">
                    <h1
                      style={{
                        color: "var(--Base-Colours-Text-Primary, #25272C)",
                        fontSize: "1.2rem",
                        fontFamily: "Satoshi ",
                        fontWeight: 700,
                        wordWrap: "break-word",
                      }}
                    >
                      <UserLogin
                        text={"Launch a Campaign Now !"}
                        color={"white"}
                        fontWeight={700}
                        size={"20px"}
                      />
                    </h1>
                  </div>
                </PrimaryButton>
              </div>
              <div className="desktop:hidden">
                <Link to="/Home/Login">
                  <PrimaryButton
                    sx={{
                      borderRadius: "var(--Pixels-8, 8px)",
                      fontSize: "1.2rem",
                      fontWeight: "900",
                      padding: "15px 28px 15px 28px",
                    }}
                    className="py-[15px] px-[28px] my-10"
                  >
                    <div
                      className="mr-2"
                      style={{ width: 32, height: 32, position: "relative" }}
                    >
                      <img src={images.RocketLaunch} alt="" />
                    </div>
                    <div className="max-tablet:text-[1rem]">
                      Launch a Campaign Now !
                    </div>
                  </PrimaryButton>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
      <div className="flex-col pt-[60px] pb-[50px] flex-wrap container flex w-full text-center items-center max-tablet:pb-[24px]">
        <h1
          className="desktop:text-[3rem] font-bold max-desktop:text-[2.25rem] max-tablet:text-[1.5rem]"
          style={{ fontFamily: "Satoshi", fontWeight: 900 }}
        >
          Causes by Category
        </h1>
        <p
          className="text-black/60 font-medium mt-3 max-w-[974px] desktop:text-[1.5rem] desktop:font-bold capitalize text-[#8E95A2] max-desktop:text-[1.25rem] max-tablet:text-[1rem] max-tablet:mt-[24px] max-tablet:font-normal"
          style={{ fontFamily: "Satoshi" }}
        >
          Be it for a personal need, social cause or a creative idea - you can
          count on us for the project that you want to raise funds for.
        </p>
      </div>
      <div className="flexDirection:'row' w-full justify-center items-center flex mt-[80px] gap-5 px-[50px] max-desktop:px-0 max-tablet:mt-0">
        <div className="bottom-slider-div">
          <BottomSlider />

          <i className="icon-arrow-long-right review-swiper-button-next"></i>
          <i className="icon-arrow-long-left review-swiper-button-prev"></i>
        </div>
      </div>
      <div className="">
        <Footer />
      </div>
    </>
  );
}

export default Home;
