import React from "react";
import icons from "../../constants/icons";
import images from "../../constants/images";
import { useState, useEffect } from "react";
import { Avatar, Button, LinearProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { RiErrorWarningLine } from "react-icons/ri";
import Profile from "../inputs/AvatarCrop/Profile";
import { toast } from "react-toastify";
import PrimaryButton from "../inputs/PrimaryButton";
import SecondaryButton from "../inputs/secondaryButton";
import { Dialog } from "./dialogBox/dialog";

function Card({
  key,
  username,
  filterName,
  title,
  cardImage,
  goalAmount,
  fundRaised,
  daysLeft,
  userCount,
  userProfile,
  location,
  Profile_pic,
  og_id,
}) {
  // const image = process.env.REACT_APP_API_URL + cardImage;
  // const [campaignData, setCampaignData] = useState([]);
  // const marginBottom = title.length > 41 ? "2.5rem" : "4.3rem";
  // const handleClick = () => {
  //   toast.success("Campaign already completed!", {
  //     position: "top-center",
  //   });
  // };


  const fullNameWords = username?.split(" ");
  const firstLetter = fullNameWords?.[0]?.charAt(0)?.toUpperCase() ?? "";
  return (
    <>
      <div
        key={key}
        className="card rounded-xl font-bold w-[600px] desktop:max-w-[408px] max-desktop:max-w-[355px]"
        style={{ fontFamily: "satoshi" }}
      >
        <Link to={`/campaign-details/${og_id}`}>
          <img
            src={
              cardImage
                ? `${process.env.REACT_APP_API_URL}` + cardImage
                : images.HeaderImage
            }
            className="card-img-top h-80 w-full relative"
            alt="..."
          />
          {goalAmount === fundRaised || goalAmount < fundRaised ? (
            <div className="absolute z-20 top-4 left-4 w-[104px] h-[27px] gap-1 flex justify-center items-center bg-[#1ABD54] rounded">
              <img src={images.CompleteVector} alt="" />
              <p className="font-[satoshi] font-medium text-[#FFFFFF] text-[0.9rem]">
                Completed
              </p>
            </div>
          ) : filterName ? (
            <div className="absolute z-20 top-4 left-4 h-[27px] gap-1 flex justify-center items-center p-2 bg-[#FFFFFF8F] rounded">
              <p className="font-[satoshi] font-medium text-[##25272C] text-[0.9rem] pr-1">
                {(() => {
                  switch (filterName) {
                    case "needs_love":
                      return (
                        <div className="flex gap-1">
                          <img
                            src={images.Heart}
                            alt=""
                            className="text-black"
                          />
                          Needs Love
                        </div>
                      );
                    case "expiring_soon":
                      return (
                        <div className="flex gap-1">
                          <img
                            src={images.Alarm}
                            alt=""
                            className="text-black"
                          />
                          Expiring Soon
                        </div>
                      );
                    case "most_supported":
                      return (
                        <div className="flex gap-1">
                          <img
                            src={images.HandCoins2}
                            alt=""
                            className="text-black"
                          />
                          Most Supported
                        </div>
                      );
                    case "newly_added":
                      return (
                        <div className="flex gap-1 items-center">
                          <RiErrorWarningLine className="text-red-500 size-5" />
                          Newly Added
                        </div>
                      );
                    case "trending":
                      return (
                        <div className="flex gap-1">
                          <img
                            src={images.TrendUp}
                            alt=""
                            className="text-black"
                          />
                          Trending
                        </div>
                      );

                    default:
                      return filterName;
                  }
                })()}
              </p>
            </div>
          ) : (
            ""
          )}
        </Link>
        <div className="card-body">
          <div className="flex items-center">
            <Avatar
              className="desktop:w-[96px] desktop:h-[96px] max-desktop:w-[70px] text-[30px]"
              alt={username}
              src="/static/images/avatar/1.jpg"
              sx={{
                width: "30px",
                height: "30px",
                fontSize: "0.95rem !important",
              }}
            >
              {Profile_pic ? (
                <img
                  src={`${process.env.REACT_APP_BASE_URL}${Profile_pic}`}
                  alt="Profile"
                />
              ) : (
                <span>{firstLetter}</span>
              )}
            </Avatar>{" "}
            <p className="text-black/40 pl-2 text-[1.2rem] max-desktop:text-[0.9rem]">
              {username}
            </p>
          </div>
          <p
            className="card-text w-full pt-2 text-[1.5rem] truncate font-bold max-desktop:text-[1.2rem] max-tablet:text-[1.1rem]"
            style={{ fontWeight: "700", marginBottom: "2rem" }}
          >
            {title}
          </p>
          <p className="text-black/40">
            <span className="font-bold text-black ">₹{fundRaised} </span>
            funded of ₹{goalAmount}
          </p>
          {/* <img className="pt-1 pb-6" src={images?.range2}></img> */}
          <div className="pt-1 pb-4 ">
            <LinearProgress
              variant="determinate"
              sx={{
                height: "10px",
                borderRadius: "16px",
                background: `linear-gradient(to right, #0DC7B1, #0DC7B1 ${(fundRaised / goalAmount) * 100
                  }%, #e0e0e0 ${(fundRaised / goalAmount) * 100}%)`,
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "#0DC7B1 !important  ",
                },
              }}
              value={(fundRaised / goalAmount) * 100}
            />
            {/* <ProgressBar/> */}
          </div>
          <div className="flex justify-center items-center text-center  overflow-hidden w-full max-desktop:flex-col max-desktop:justify-center">
            <div className="flex flex-col w-[65%]">
              <div className="flex pl-1  flex-row max-desktop:justify-center">
                <div className="flex justify-center items-center text-center ">
                  <img className=" pt-2 " src={icons?.UsersThree} alt="" />
                  <p className="text-black/40 pt-2 pl-1 text-[0.95rem]">
                    {userCount}
                  </p>
                </div>
                <div className="flex pl-3 justify-center items-center text-center ">
                  <img className=" pt-2 pl-3  " src={icons?.Clock} alt="" />
                </div>
                <p className="text-black/40 pt-2 pl-1 text-[0.95rem] ">
                  {daysLeft} days left
                </p>
                {/* <p className="text-black/40 pt-1.5 pl-1 text-[0.95rem]">17</p> */}
              </div>
              <div className="flex justify-start items-center max-desktop:justify-center">
                <img className="pt-2 w-7  h-7 " src={images?.MapPin2} alt="" />
                <p className="text-black/40 pt-2  text-[1rem] truncate">
                  {location}
                </p>
                {/* <p className="text-black/40 pt-1.5 pl-1 text-[0.95rem]">Pune,India</p> */}
              </div>
            </div>
            <div className="w-[35%] max-desktop:w-full">
              {/* <Link
                to={fundRaised === goalAmount || fundRaised > goalAmount ? "#" : `/Home/donate/${og_id}`}
              > */}
              <Dialog
                button={
                  <button
                    // onClick={fundRaised === goalAmount ? handleClick : null}
                    className=" border-2   rounded-lg border-red-400 px-2 py-1 max-desktop:w-full max-desktop:mt-[16px]"
                    style={{ backgroundColor: "rgba(255, 246, 245, 1)" }}
                  >
                    <div className="flex pl-1 pr-2 py-1 max-desktop:justify-center">
                      <img className="" src={images?.Coins} alt="" />
                      <p className="pl-1   text-[1.1rem] max-tablet:text-[1rem]">
                        Donate
                      </p>
                    </div>
                  </button>
                }
                title="donate Cause"
              // onClose={() => onClose && onClose()}
              >

                <div className="flex flex-col justify-center items-center gap-2 px-10">

                  <Link to={`/campaign-details/${og_id}`} className="text-primary font-bold font-satoshi">Link to Story</Link>
                  {fundRaised === goalAmount || fundRaised > goalAmount && <p className="text-warning text-bold">Goal has been reached</p>
                  }

                  <p>Bank details for donation are mentioned in the cause itself, please refer the cause to donate the beneficiary directly.
                    Or contact us at
                    <span className="text-primary"> +91 9117 01 9117  memonaidinternational@gmail.com.</span></p>

                </div>
              </Dialog>
              {/* </Link> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
