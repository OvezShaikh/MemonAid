import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import images from "../../../constants/images";
import SuccessFilterField from "./SuccessfulFilterField";
import Card from "../../../components/layout/Card";
import Navbar from "../../../components/layout/Navbar";
import Navigation from "../../../components/layout/Navigation/Index";
import Footer from "../../../components/layout/Footer";

const Index = () => {
  const [userList, setUserList] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [visibleCards, setVisibleCards] = useState(4);
  const [showOptions, setShowOptions] = useState(false);
  const [perPage, setPerPage] = useState(100);
  const [campaignCount, setCampaignCount] = useState(0);

  const [categoryDataFromChild, setCategoryDataFromChild] = useState("");
  const [locationDataFromChild, setLocationDataFromChild] = useState("");

  const receiveCategoryFromChild = (categoryData) => {
    setCategoryDataFromChild(categoryData);
  };

  const receiveLocationFromChild = (locationData) => {
    setLocationDataFromChild(locationData);
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

  const fetchCampaigns = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/campaign/successful-campaign?page=${page}&limit=${perPage}`
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
    <div>
      <Navbar />
      <div className="flex flex-col ">
        <Navigation
          label={"Successful Campaign"}
          heading={"Successful Campaign"}
        />

        <div className="flex flex-col flex-wrap w-full mb-[128px] items-center max-tablet:mb-[48px] mt-[100px] max-tablet:mt-[20px]">
          <div className="w-[90%] flex justify-end successful-filter">
            <SuccessFilterField
              sendCategoryToParent={receiveCategoryFromChild}
              sendLocationToParent={receiveLocationFromChild}
            />
          </div>
          <div className="desktop:gap-x-[36px] desktop:gap-y-[48px] mt-[48px]  flex flex-wrap w-full justify-center desktop:max-w-[1740px] max-desktop:gap-x-[16px]  max-desktop:gap-y-[24px] max-tablet:gap-y-[48px]">
            {filteredUserList?.slice(0, visibleCards).map((item) => {
              return (
                <Card
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
              background:
                "linear-gradient(to right, #FF9F0A 0%, #FF375F 62.9%)",
              "-webkit-background-clip": "text",
              "-webkit-text-fill-color": "transparent",
              textDecoration: "underline",
              display:
                visibleCards >= campaignCount || filteredCardCount < 4
                  ? "none"
                  : "block",
              position: "relative",
            }}
          >
            <p className="gradient-button mb-0">Load More</p>
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
