import React, { useContext, useMemo, useState, useEffect } from "react";
import Footer from "../../../components/layout/Footer";
import Navbar from "../../../components/layout/Navbar";
import images from "../../../constants/images";
import Card from "../../../components/layout/Card";
import Navigation from "../../../components/layout/Navigation/Index";
import UserNavbar from "../../login/UserNavbar";
import axios from "axios";
import ScrollableTabsButtonForce from "../../../components/layout/ScrollableTabsButtonAuto";
import FilterField from "../../../components/inputs/FilterField/Index";
import SelectWithCheckboxes from "../../../components/inputs/FilterField/Index";

function Index() {
  const [userList, setUserList] = useState([]);
  const [visibleCards, setVisibleCards] = useState(8);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [campaignCount, setCampaignCount] = useState(0);

  const [perPage, setPerPage] = useState(100);
  const [categoryDataFromChild, setCategoryDataFromChild] = useState("");
  const [locationDataFromChild, setLocationDataFromChild] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  const [filterName, setFilterName] = useState("");
  const [tabName, setTabName] = useState("newly_added");

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

  const receiveCategoryFromChild = (categoryData) => {
    setCategoryDataFromChild(categoryData);
  };

  const receiveLocationFromChild = (locationData) => {
    setLocationDataFromChild(locationData);
  };

  const filterToggle = () => {
    setShowOptions(!showOptions);
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

  const loadMore = () => {
    setVisibleCards((prevVisibleCards) => prevVisibleCards + 4);

    if (page < totalPages) {
      setPage(page + 1);
    }

    if (visibleCards >= perPage) {
      setPerPage(perPage + 100);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="flex flex-col ">
        <Navigation label={"OnGoingCampaigns"} heading={"Ongoing Campaigns"} />

        <br />
        <br />
        <br />

        <div className="flex flex-col flex-wrap w-full mb-[128px] items-center max-tablet:mb-[48px]">
          <div className="flex  desktop:ml-[-30px] desktop:max-w-[1760px] desktop:w-full desktop:justify-between max-desktop:w-[90%] max-desktop:flex-col max-desktop:items-end max-desktop:gap-y-[48px] max-tablet:mb-[50px] max-tablet:gap-y-[20px] scrollable-tabs-class ">
            <ScrollableTabsButtonForce onTabChange={handleTabChange} />
            <button
              className="flex items-center ml-2 px-3 py-1.5 max-w-[115px] gap-x-[12px] max-desktop:px-[20px] max-desktop:py-[17px] max-tablet:py-[6px]"
              style={{ backgroundColor: "rgba(255, 246, 245, 1)" }}
              onClick={filterToggle}
            >
              <img src={images.Funnel} />
              <p
                className="text-[18px]"
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
            <SelectWithCheckboxes
              sendCategoryToParent={receiveCategoryFromChild}
              sendLocationToParent={receiveLocationFromChild}
            />
          )}
          <div className="desktop:gap-x-[36px] desktop:gap-y-[48px] mt-[48px]  flex flex-wrap w-full justify-center desktop:max-w-[1740px] max-desktop:gap-x-[16px]  max-desktop:gap-y-[24px] max-tablet:gap-y-[48px]">
            {filteredUserList?.slice(0, visibleCards).map((item) => {
              return (
                <Card
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
              background:
                "linear-gradient(to right, #FF9F0A 0%, #FF375F 62.9%)",
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
      </div>
      <Footer />
    </div>
  );
}

export default Index;
