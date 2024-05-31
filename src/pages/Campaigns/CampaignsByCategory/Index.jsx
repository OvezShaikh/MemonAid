import React, { useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../../../components/layout/Footer";
import Navbar from "../../../components/layout/Navbar";
import images from "../../../constants/images";
import Card from "../../../components/layout/Card";
import Navigation from "../../../components/layout/Navigation/Index";
import axios from "axios";

import NoCampaign from "./NoCampaign";
import FilterField from "../../../components/inputs/FilterField/Index";
import "./CampaignsByCategory.css";
import ScrollableTabsButtonForce from "../../../components/layout/ScrollableTabsButtonAuto";

function Index() {
  const { name } = useParams();
  const [categoryCampaignList, setCategoryCampaignList] = useState([]);
  const [categoryDetail, setCategoryDetail] = useState(null);

  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  const [showOptions, setShowOptions] = useState(false);

  const [categoryDataFromChild, setCategoryDataFromChild] = useState("");
  const [locationDataFromChild, setLocationDataFromChild] = useState("");
  const [tabName, setTabName] = useState("newly_added");
  const [filterName, setFilterName] = useState("");

  const filterToggle = () => {
    setShowOptions(!showOptions);
  };

  const receiveCategoryFromChild = (categoryData) => {
    setCategoryDataFromChild(categoryData);
  };

  const receiveLocationFromChild = (locationData) => {
    setLocationDataFromChild(locationData);
  };

  const filteredUserList = Array.from(
    new Set(
      categoryCampaignList
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
  ).map((id) => categoryCampaignList.find((item) => item.id === id));

  const fetchUserListFromTabs = async () => {
    const perPage = 4;
    const res = await axios.get(
      // `${process.env.REACT_APP_API_URL}/campaign/category?name=${name}&page=${page}&limit=${perPage}`
      `${process.env.REACT_APP_API_URL}/campaign/category-filter?name=${name}&page=${page}&limit=${perPage}&filter=${tabName}`
    );

    setFilterName(res.data?.filter_key);
    if (Array.isArray(res.data.rows)) {
      setTotalPages(res.data.pages_count);

      setCategoryCampaignList(res.data.rows);
      setCategoryDetail(res.data.category_data);
    } else {
      console.error("Invalid data structure. Expected an array:", res.data);
    }

    // setCategoryCampaignList(res.data.rows)
  };
  useEffect(() => {
    fetchUserListFromTabs();
  }, [tabName]);

  const fetchCategoryDetail = async () => {
    const perPage = 4;
    const res = await axios.get(
      // `${process.env.REACT_APP_API_URL}/campaign/category?name=${name}&page=${page}&limit=${perPage}`
      `${process.env.REACT_APP_API_URL}/campaign/category-filter?name=${name}&page=${page}&limit=${perPage}&filter=${tabName}`
    );
    if (Array.isArray(res.data.rows)) {
      setTotalPages(res.data.pages_count);
      setCategoryCampaignList([...categoryCampaignList, ...res.data.rows]);
      setCategoryDetail(res.data.category_data);
    } else {
      console.error("Invalid data structure. Expected an array:", res.data);
    }
  };
  useEffect(() => {
    fetchCategoryDetail();
  }, [page]);

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

  return (
    <div>
      <Navbar />
      <div className="flex flex-col ">
        <Navigation
          label={"ReligiousEducationCampaigns"}
          heading={name}
          remove={"remove"}
        />

        <div className="flex flex-col flex-wrap w-full mb-[128px] items-center max-tablet:mb-[48px]">
          <div className="flex desktop:ml-[-30px] desktop:max-w-[1760px] desktop:w-full desktop:justify-between max-desktop:w-[90%] max-desktop:flex-col max-desktop:items-end max-desktop:gap-y-[48px] max-tablet:mb-[50px] max-tablet:gap-y-[20px] scrollable-tabs-class mt-[50px] ">
            <ScrollableTabsButtonForce onTabChange={handleTabChange} />
            <button
              className="flex items-center ml-2 px-3 py-1.5 max-w-[115px] gap-x-[12px] max-desktop:px-[20px] max-desktop:py-[17px] max-tablet:py-[6px]"
              style={{ backgroundColor: "rgba(255, 246, 245, 1)" }}
              onClick={filterToggle}
            >
              <img src={images.Funnel} alt="" />
              {/* <img src={images.Filter} /> */}
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

          <div className="flex flex-col justify-center  pt-[50px] px-[10px] items-center max-desktop:pt-[20px]">
            {categoryCampaignList?.length > 0 ? (
              <div className="flex flex-col justify-center items-center ">
                <div id="filter-location">
                  {showOptions && (
                    <FilterField
                      sendCategoryToParent={receiveCategoryFromChild}
                      sendLocationToParent={receiveLocationFromChild}
                    />
                  )}
                </div>
                <div className="gap-4 pt-[2rem] flex flex-wrap justify-center desktop:w-[100%]">
                  {filteredUserList?.map((item) => {
                    return (
                      <Card
                        filterName={filterName}
                        key={item?.id}
                        username={item?.user?.username}
                        title={item?.title}
                        og_id={item?.id}
                        cardImage={item?.campaign_image}
                        goalAmount={item?.goal_amount}
                        fundRaised={item?.fund_raised}
                        daysLeft={item?.days_left}
                        userCount={item?.donor_count}
                        location={item?.location}
                      />
                    );
                  })}
                </div>
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page >= totalPages}
                  className="pt-[68px]"
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
                    position: "relative",
                    display: page >= totalPages ? "none" : "block",
                  }}
                >
                  <p className="gradient-button mb-0 align-middle">Load More</p>
                </button>
              </div>
            ) : (
              <div>{<NoCampaign />}</div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Index;
