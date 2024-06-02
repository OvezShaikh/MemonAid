import React, { useState } from "react";
import Profilepic from "../../assets/account.svg";
import { Avatar, Button } from "@mui/material";
import { styled } from "@mui/system";
import useMediaQuery from "@mui/material/useMediaQuery";

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 56,
  height: 56,
  [theme.breakpoints.down("sm")]: {
    width: "46px",
    height: "46px",
  },
}));

function Donor({ data }) {
  const [showMore, setShowMore] = useState(false);
  const donorsToShow = showMore ? data?.slice(0, 10) : data?.slice(0, 4);

  const handleShowMoreClick = () => {
    setShowMore(true);
  };

  return (
    <div className="max-desktop:w-full">
      {donorsToShow !== null && donorsToShow !== undefined
        ? donorsToShow.map((items, index) => {
            const fullNameWords = items?.full_name?.split(" ");
            let firstLetter = "";
            if (fullNameWords !== undefined) {
              firstLetter = fullNameWords[0].charAt(0).toUpperCase();
            }

            return (
              <div key={index} className="grid grid-cols-10 pt-4">
                <div className="col-span-7 pb-3">
                  <div className="grid grid-cols-7">
                    <StyledAvatar
                      alt={items.full_name}
                      src="/static/images/avatar/1.jpg"
                      sx={{ width: 56, height: 56 }}
                    >
                      {firstLetter}
                    </StyledAvatar>
                    <h1 className="col-span-6 flex items-center pl-2 max-tablet:text-[1.1rem] font-[satoshi] font-semibold text-[1.5rem] max-tablet:pl-5">
                      {items.is_anonymous ?   "Anonymous" : items.full_name}
                    </h1>
                  </div>
                </div>
                <div className="col-span-3">
                  <div className="flex flex-col max-desktop:items-end max-tablet:items-end">
                    <div className="flex">
                      <div className="max-desktop:flex max-tablet:flex flex max-tablet:justify-end ">
                        <h1 className="text-xl font-semibold font-[satoshi] text-[#1ABD54] max-tablet:text-lg max-tablet:mr-2">
                          +
                        </h1>
                        <h1 className="text-xl font-semibold font-[satoshi] text-[#1ABD54] ml-3 max-tablet:ml-1 max-tablet:text-lg max-desktop:text-[1.5rem]">
                          {items?.amount}
                        </h1>
                      </div>
                    </div>
                    <p className="text-black/40 font-[satoshi] col-span-2 ml-1 max-tablet:text-[15px] max-tablet:font-semibold max-desktop:text-[20px]">
                      {items.date}
                    </p>{" "}
                  </div>
                </div>
                <hr className="col-span-10" />
              </div>
            );
          })
        : null}
      {/* Show More Button */}
      {!showMore && data && data.length > 4 && (
        <div className="flex justify-center mt-4 mb-8">
          <button
            className=" max-tablet:pt-[24px]"
            onClick={handleShowMoreClick}
            id="loadmorebutton"
            style={{
              width: "fit-content",
              textAlign: "center",
              color: "#FF9F0A",
              fontSize: 24,
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
            }}
          >
            <p className="gradient-button mb-0">View All Donation</p>
          </button>
        </div>
      )}
    </div>
  );
}

export default Donor;