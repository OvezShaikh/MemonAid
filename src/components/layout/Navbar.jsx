import * as React from "react";
import { Fragment, useState } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import PrimaryButton from "../inputs/PrimaryButton";
import Images from "../../constants/images";
import LogoImg from "../../assets/MemonLogo.png";
import UserLogin from "../../pages/login/Login_page/Index";
import { Link, NavLink } from "react-router-dom";
import ProfileAvatar from "../../pages/login/ProfileAvatar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDebounce, useGetAll } from "../../Hooks";
import { useRef } from "react";
import Logout from "@mui/icons-material/Logout";
import { Search } from "../inputs/Search";
import serverAPI from "../../config/serverAPI";
import { SiClubhouse, SiSearxng } from "react-icons/si";
import { useEffect } from "react";
import { Close } from "@mui/icons-material";
const GetInvolved = [
  {
    name: "Associateship",
    href: "/Home/Associateship",
  },
  {
    name: "Partner with us",
    href: "/Home/Partner-with-us",
  },
  {
    name: "Internship",
    href: "/Home/Internship",
  },
  {
    name: "Support a campaign",
    href: "/Home/Support-a-campaign",
  },
  {
    name: "Careers",
    href: "/Home/Careers",
  },
];
const OurImpact = [
  {
    name: "Ongoing Campaigns",
    href: "/Home/OnGoingCampaigns",
  },
  {
    name: "Successful Campaigns",
    href: "/Home/Successful-campaign",
  },
  {
    name: "Stories of Change",
    href: "/Home/Stories-of-Change",
  },
  {
    name: "Reports",
    href: "/Home/Reports",
  },
];
const AboutUs = [
  {
    name: "Knowing MemonAid",
    href: "/Home/Knowing-MemonAid",
  },
  {
    name: "Vision & Mission",
    href: "/Home/Vision-&-Mission",
  },
  {
    name: "Objectives & Values",
    href: "/Home/Objectives-&-values",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const hasToken = !!localStorage.getItem("token");

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user_info");
  window.location.href = "/Home";
  toast.error("Logout Successful !", {
    position: "top-center",
  });
}

export default function Example() {
  const page = 2;
  const perPage = 10;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [allCards, setAllCards] = useState([]);

  let userData = localStorage.getItem("user_info");
  let Data = JSON.parse(userData);
  let role = Data?.user_role;
  let image = Data?.profile_pic;
  let img = `${process.env.REACT_APP_API_URL}` + image;

  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [inputVisible, setInputVisible] = useState(false); // State to control input visibility

  const debouncedQuery = useDebounce(query);

  useEffect(() => {
    if (debouncedQuery) {
      handleSearch();
    } else {
      setSearchResults([]);
      setNotFound(false);
    }
  }, [debouncedQuery]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    setLoading(true);
    serverAPI
      .get(`${process.env.REACT_APP_BASE_URL}/campaign/global-search`)
      .then((response) => {
        if (!response.data.rows) {
          console.error("Invalid response data:", response);
          setLoading(false);
          return;
        }

        // Filter the response data based on the query
        const filteredResults = response.data.rows.filter((result) => {
          if (!result.title) {
            console.warn("Result title is missing:", result);
            return false;
          }
          // Check if any word in the title matches the query
          const title = result.title.toLowerCase();
          const query = debouncedQuery.toLowerCase();
          return title.includes(query);
        });

        // Prepare suggestions with highlighted matching words
        const highlightedResults = filteredResults.map((result) => {
          const title = result.title;
          const query = debouncedQuery;
          const highlightedTitle = title.replace(
            new RegExp(query, "gi"),
            (match) => `<span class="highlight">${match}</span>`
          );
          return { ...result, highlightedTitle };
        });

        setSearchResults(highlightedResults);
        setLoading(false);
        // If no filtered results found, set notFound state to true
        setNotFound(highlightedResults.length === 0);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
        setLoading(false);
      });
  };
  const toggleInputVisibility = () => {
    if (inputVisible === false) {
      setInputVisible((prev) => !prev); // Toggle input visibility
    } else {
      setInputVisible(false); // Toggle input visibility
    }
  };

  useGetAll({
    key: `/campaign/campaign?page=${page}&limit=${perPage}`,
    enabled: true,
    select: (data) => {
      return data?.data?.rows;
    },
    onSuccess: (data) => {
      setAllCards(data);
    },
    onerror: () => {
      console.error("Error fetching card titles:");
    },
  });
  const clearInput = () => {
    setQuery("");
    setSearchResults([]); // Clear search results when input is cleared
  };
  

  return (
    <header
      className="absolute top-0 left-0 right-0 bg-transparent z-10 container"
      style={{
        backgroundColor: "#8EC5FC",
        backdropFilter: "blur(10px)",
      }}
    >
      <nav
        className="mx-auto flex max-w-9xl max-desktop:px-2 max-tablet:px-0  items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex ">
          <NavLink to="/Home">
          <img
              className="max-tablet:w-40 max-tablet:h-9 max-w-36"
              // src={Images.Logo}
              src={LogoImg}
              alt="MemonAid"
              title="MemonAid"
            />
          </NavLink>
        </div>

        <div className=" lg:flex lg:flex-1 lg:justify-end ">
          <div className="flex xl:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <Popover.Group className="max-nav:hidden lg:flex lg:gap-x-12">
            <Popover className="relative mt-1">
              <Popover.Button
                className="flex pt-2 nav_button items-center gap-x-1 text-[1.1rem] font-medium font-[satoshi]  text-[#40444C]"
                onClick="this.style.backgroundColor = (this.style.backgroundColor === '#40444C') ? 'blue' : '#40444C';"
                // style={buttonStyles}
                // onClick={handleButtonClick}
              >
                Get Involved
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                >
                  <path
                    d="M16.6927 8.44219L10.4427 14.6922C10.3846 14.7503 10.3157 14.7964 10.2398 14.8279C10.164 14.8593 10.0826 14.8755 10.0005 14.8755C9.91836 14.8755 9.83703 14.8593 9.76115 14.8279C9.68528 14.7964 9.61635 14.7503 9.5583 14.6922L3.3083 8.44219C3.2208 8.35478 3.16119 8.24337 3.13704 8.12207C3.11288 8.00076 3.12526 7.87502 3.1726 7.76076C3.21995 7.64649 3.30013 7.54884 3.403 7.48017C3.50587 7.41151 3.62681 7.3749 3.75049 7.375H16.2505C16.3742 7.3749 16.4951 7.41151 16.598 7.48017C16.7009 7.54884 16.781 7.64649 16.8284 7.76076C16.8757 7.87502 16.8881 8.00076 16.8639 8.12207C16.8398 8.24337 16.7802 8.35478 16.6927 8.44219Z"
                    fill="url(#paint0_linear_126_1927)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_126_1927"
                      x1="3.125"
                      y1="14.8755"
                      x2="11.5086"
                      y2="9.72552"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#FF9F0A" />
                      <stop offset="1" stop-color="#FF375F" />
                    </linearGradient>
                  </defs>
                </svg>
              </Popover.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-500"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute left-0 top-full z-10 mt-3 w-[250px] max-w-md overflow-hidden rounded bg-white shadow-lg ring-1 ring-gray-900/5">
                  <div className="pl-3 pb-4">
                    {GetInvolved.map((item) => (
                      <div
                        key={item.name}
                        className="group relative flex items-center gap-x-6 pl-4 pt-4 text-[1rem] font-[satoshi] text-[#333] hover:bg-gray-50"
                        style={{ fontWeight: 400 }}
                      >
                        <div className="flex-auto">
                          <NavLink
                            to={item.href}
                            className="block font-semibold text-gray-900"
                          >
                            {item.name}
                            <span className="absolute inset-0" />
                          </NavLink>
                        </div>
                      </div>
                    ))}
                    {hasToken && (
                      <div
                        className="group relative flex items-center gap-x-6 pl-4 pt-4 text-[1rem] font-[satoshi] text-[#333] hover:bg-gray-50"
                        style={{ fontWeight: 400 }}
                      >
                        <div className="flex-auto">
                          <NavLink
                            to="/Home/Create-Campaign"
                            className="block font-semibold text-gray-900"
                          >
                            Create Campaign
                            <span className="absolute inset-0" />
                          </NavLink>
                        </div>
                      </div>
                    )}
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>
            {/*  second button */}

            <Popover className="relative mt-1">
              <Popover.Button className="flex pt-2 items-center gap-x-1 text-[1.1rem] font-medium font-[satoshi] text-[#40444C]">
                Our Impact
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                >
                  <path
                    d="M16.6927 8.44219L10.4427 14.6922C10.3846 14.7503 10.3157 14.7964 10.2398 14.8279C10.164 14.8593 10.0826 14.8755 10.0005 14.8755C9.91836 14.8755 9.83703 14.8593 9.76115 14.8279C9.68528 14.7964 9.61635 14.7503 9.5583 14.6922L3.3083 8.44219C3.2208 8.35478 3.16119 8.24337 3.13704 8.12207C3.11288 8.00076 3.12526 7.87502 3.1726 7.76076C3.21995 7.64649 3.30013 7.54884 3.403 7.48017C3.50587 7.41151 3.62681 7.3749 3.75049 7.375H16.2505C16.3742 7.3749 16.4951 7.41151 16.598 7.48017C16.7009 7.54884 16.781 7.64649 16.8284 7.76076C16.8757 7.87502 16.8881 8.00076 16.8639 8.12207C16.8398 8.24337 16.7802 8.35478 16.6927 8.44219Z"
                    fill="url(#paint0_linear_126_1927)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_126_1927"
                      x1="3.125"
                      y1="14.8755"
                      x2="11.5086"
                      y2="9.72552"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#FF9F0A" />
                      <stop offset="1" stop-color="#FF375F" />
                    </linearGradient>
                  </defs>
                </svg>
              </Popover.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-500"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute left-0 top-full z-10 mt-3 w-[250px] max-w-md overflow-hidden rounded bg-white shadow-lg ring-1 ring-gray-900/5">
                  <div className="pl-3 pb-4">
                    {OurImpact.map((item) => (
                      <div
                        key={item.name}
                        className="group relative flex items-center gap-x-6  pl-4 pt-4 text-[1rem] font-[satoshi] text-[#333] hover:bg-gray-50"
                        style={{ fontWeight: 400 }}
                      >
                        <div className="flex-auto">
                          <NavLink
                            to={item.href}
                            className="block font-semibold text-gray-900"
                          >
                            {item.name}
                            <span className="absolute inset-0" />
                          </NavLink>
                        </div>
                      </div>
                    ))}
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>

            {/* third button */}
            <Popover className="relative mt-1">
              <Popover.Button className="flex pt-2 items-center gap-x-1 text-[1.1rem] font-medium  font-[satoshi] text-[#40444C]">
                About us
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                >
                  <path
                    d="M16.6927 8.44219L10.4427 14.6922C10.3846 14.7503 10.3157 14.7964 10.2398 14.8279C10.164 14.8593 10.0826 14.8755 10.0005 14.8755C9.91836 14.8755 9.83703 14.8593 9.76115 14.8279C9.68528 14.7964 9.61635 14.7503 9.5583 14.6922L3.3083 8.44219C3.2208 8.35478 3.16119 8.24337 3.13704 8.12207C3.11288 8.00076 3.12526 7.87502 3.1726 7.76076C3.21995 7.64649 3.30013 7.54884 3.403 7.48017C3.50587 7.41151 3.62681 7.3749 3.75049 7.375H16.2505C16.3742 7.3749 16.4951 7.41151 16.598 7.48017C16.7009 7.54884 16.781 7.64649 16.8284 7.76076C16.8757 7.87502 16.8881 8.00076 16.8639 8.12207C16.8398 8.24337 16.7802 8.35478 16.6927 8.44219Z"
                    fill="url(#paint0_linear_126_1927)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_126_1927"
                      x1="3.125"
                      y1="14.8755"
                      x2="11.5086"
                      y2="9.72552"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#FF9F0A" />
                      <stop offset="1" stop-color="#FF375F" />
                    </linearGradient>
                  </defs>
                </svg>
              </Popover.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-500"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute left-0 top-full z-10 mt-3 w-[250px] max-w-md overflow-hidden rounded bg-white shadow-lg ring-1 ring-gray-900/5">
                  <div className="pl-3 pb-4">
                    {AboutUs.map((item) => (
                      <div
                        key={item.name}
                        className="group relative flex items-center gap-x-6  pl-4 pt-4 text-[1rem] font-[Satoshi] text-[#333] hover:bg-gray-50"
                        style={{ fontWeight: 400 }}
                      >
                        <div className="flex-auto">
                          <NavLink
                            to={item.href}
                            className="block font-semibold text-gray-900"
                          >
                            {item.name}
                            <span className="absolute inset-0" />
                          </NavLink>
                        </div>
                      </div>
                    ))}
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>
            {/* Fourth button */}

            <button className="font-[satoshi] text-[1.1rem] font-medium text-[#40444C]">
              <Link to="/Home/How-It-Works">How it Works</Link>
            </button>
            {/* Fifth button */}
            {localStorage.getItem("token") ? (
              <PrimaryButton
                sx={{
                  borderRadius: "var(--Pixels-8, 8px)",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  padding: "12px 20px",
                }}
              >
                <NavLink to="/Home/Create-Campaign">Start a Campaign</NavLink>
              </PrimaryButton>
            ) : (
              <PrimaryButton
                sx={{
                  borderRadius: "var(--Pixels-8, 8px)",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  padding: "12px 20px",
                }}
              >
                <UserLogin
                  text={"Start a Campaign"}
                  color={"white"}
                  fontWeight={700}
                />
              </PrimaryButton>
            )}

            <div className="flex space-x-0 items-center ">
              <div className="flex-col relative pr-5 pt-1">
                <div
                  className={`flex items-center flex-col  ${
                    !inputVisible ? " " : "border"
                  } border-gray-300 rounded-md p-2`}
                >
                  <div className="relative flex items-center px-2">
                    {!inputVisible && (
                      <button
                        onClick={toggleInputVisibility}
                        className=" bg-transparent text-white rounded-md"
                      >
                        <SiSearxng className="w-6 h-6 text-black" />
                      </button>
                    )}
                    {inputVisible && (
                      <div className="relative flex items-center ease-in-out duration-500">
                        <input
                          type="text"
                          placeholder="Search Campaign..."
                          value={query}
                          onChange={handleInputChange}
                          className="flex-1 mr-2 border-none outline-none bg-transparent"
                        />
                        {query && ( // Conditionally render clear button
                          <button
                            onClick={clearInput}
                            className="pl-4 bg-transparent text-white rounded-md"
                          >
                            <Close className="w-6 h-6 text-black" />
                          </button>
                        )}
                        <button
                          onClick={toggleInputVisibility}
                          disabled={loading}
                          className="pl-4 bg-transparent text-white rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                          <SiSearxng className="w-6 h-6 text-black" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Conditionally render absolute div */}
                  {query && (
                    <div className="absolute top-14 rounded-lg p-2 left-0 bg-white shadow-lg  w-[270px] max-h-[500px] overflow-scroll overflow-x-hidden">
                      {loading && (
                        <p className="text-gray-500 ml-2">Searching...</p>
                      )}
                      {notFound && !loading && (
                        <p className="text-red-500 ml-2">
                          No results found for "{query}".
                        </p>
                      )}
                      <ul className="ml-2 flex-col space-y-2 items-center ">
                        {searchResults.map((result) => (
                          <div
                            key={result.id}
                            className="flex gap-2 hover:bg-black/10 h-10 rounded-md items-center"
                          >
                            <img
                              src={
                                result.campaign_image
                                  ? `${process.env.REACT_APP_API_URL}${result.campaign_image}`
                                  : Images.HeaderImage
                              }
                              className="size-7 ml-2 rounded-md"
                              alt=""
                            />
                            <Link to={`/campaign-details/${result.id}`}>
                              {/* Render highlighted title */}
                              <li
                                className="cursor-pointer truncate max-w-[190px] hover:text-blue-500"
                                dangerouslySetInnerHTML={{
                                  __html: result.highlightedTitle,
                                }}
                              />
                            </Link>
                          </div>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {localStorage.getItem("token") ? (
                <div className="">
                  <ProfileAvatar />
                </div>
              ) : (
                <button className="font-[satoshi] text-[1.1rem]  font-medium text-[#40444C]">
                  <UserLogin text={"Log in"} />
                </button>
              )}
            </div>
          </Popover.Group>
        </div>
      </nav>
      <Dialog
        as="div"
        className="xl:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="#" className="-m-1.5 p-1.5 outline-none">
              <span className="sr-only">Your Company</span>
              <img className="h-8 w-auto" src={LogoImg} alt="" />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-10 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="flex items-center justify-between flex-col border border-gray-300 rounded-md py-2 !px-0">
                <div className="relative flex flex-row  items-center">
                  <input
                    type="text"
                    placeholder="Search Campaign..."
                    value={query}
                    onChange={handleInputChange}
                    className="flex-1 mr-0 border-none outline-none bg-transparent"
                  />
                  {query && ( // Conditionally render clear button
                    <button
                      onClick={clearInput}
                      className="pl-0 bg-transparent text-white rounded-md"
                    >
                      <Close className="w-6 h-6 text-black  outline-none" />
                    </button>
                  )}
                  <button
                    onClick={handleSearch}
                    disabled={loading}
                    className="pl-4 bg-transparent text-white rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    <SiSearxng className="w-6 h-6 text-black  outline-none" />
                  </button>
                </div>
                {/* Conditionally render absolute div */}
                {query && (
                  <div className="absolute top-[120px] rounded-lg p-2 left-6 bg-white shadow-lg max-h-[500px] overflow-scroll  overflow-x-hidden	 w-[330px]">
                    {loading && (
                      <p className="text-gray-500 ml-2">Searching...</p>
                    )}

                    {notFound && (
                      <p className="text-red-500 ml-2">
                        No results found for "{query}".
                      </p>
                    )}
                    <ul className="ml-2 flex-col space-y-2 items-center ">
                      {searchResults.map((result) => (
                        <div className="flex gap-2 hover:bg-black/10 h-10 rounded-md items-center">
                          <img
                            src={
                              result.campaign_image
                                ? `${process.env.REACT_APP_API_URL}${result.campaign_image}`
                                : Images.HeaderImage
                            }
                            className="size-7 ml-2 rounded-md"
                            alt=""
                          />
                          <Link
                            key={result.id}
                            to={`/campaign-details/${result.id}`}
                          >
                            <li
                              className="cursor-pointer truncate max-w-[250px] hover:text-red-400"
                              dangerouslySetInnerHTML={{
                                __html: result.highlightedTitle,
                              }}
                            />
                          </Link>
                        </div>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <Disclosure.Button
                        className={`flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 max-tablet:text-[1.1rem] max-desktop:text-[1.2rem] max-desktop:font-[satoshi] max-tablet:font-[satoshi] font-semibold leading-7 text-gray-900 hover:bg-gray-50 ${
                          open ? " text-red-400" : ""
                        }`}
                      >
                        Get Involved
                        <ChevronDownIcon
                          className={classNames(
                            open ? "rotate-180" : "",
                            "h-6 w-6 flex-none"
                          )}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 space-y-2">
                        {[...GetInvolved].map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block rounded-lg py-2 pl-6 pr-3 text-lg max-tablet:text-[1rem] font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <Disclosure.Button
                        className={`flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 max-tablet:text-[1.1rem] max-desktop:text-[1.2rem] max-desktop:font-[satoshi] font-semibold leading-7 text-gray-900 hover:bg-gray-50 ${
                          open ? " text-red-400" : ""
                        }`}
                      >
                        Our Impact
                        <ChevronDownIcon
                          className={classNames(
                            open ? "rotate-180" : "",
                            "h-6 w-6 flex-none"
                          )}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 space-y-2">
                        {[...OurImpact].map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block rounded-lg py-2 pl-6 pr-3 text-lg max-tablet:text-[1rem] font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>

                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <Disclosure.Button
                        className={`flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 max-tablet:text-[1.1rem] max-desktop:text-[1.2rem] max-desktop:font-[satoshi] font-semibold leading-7 text-gray-900 hover:bg-gray-50 ${
                          open ? " text-red-400" : ""
                        }`}
                      >
                        About Us
                        <ChevronDownIcon
                          className={classNames(
                            open ? "rotate-180" : "",
                            "h-6 w-6 flex-none"
                          )}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 space-y-2">
                        {[...AboutUs].map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block rounded-lg py-2 pl-6 pr-3 text-lg max-tablet:text-[1rem] font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <Link
                  to={"/Home/How-It-Works"}
                  className="-mx-3 block rounded-lg px-3 py-2 max-desktop:text-[1.2rem]  max-tablet:text-[1.1rem] max-desktop:font-[satoshi] font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  How It works
                </Link>
              </div>
              <div className="py-2 ">
                {localStorage.getItem("token") ? (
                  <div className="space-y-1">
                    {role === "Admin" && (
                      <>
                        <Link
                          className="flex text-[satoshi] text-[1.2rem] items-center max-desktop:font-[satoshi] font-medium text-black"
                          to="/AdminPanel"
                        >
                          AdminPanel
                        </Link>
                      </>
                    )}

                    <Link
                      className="flex text-[satoshi] text-[1.2rem] items-center max-desktop:font-[satoshi] font-medium text-black"
                      to={"/User"}
                    >
                      Dashboard
                    </Link>

                    <Link
                      className="flex text-[satoshi] text-[1.2rem] items-center max-desktop:font-[satoshi] font-medium text-black"
                      to={"/Home/account-settings"}
                    >
                      Settings
                    </Link>
                    <div className="flex items-center">
                      <button
                        className="max-desktop:font-[satoshi] text-[satoshi] text-[1.2rem] font-medium text-black pr-1 "
                        onClick={() => logout()}
                      >
                        Logout
                      </button>
                      <Logout fontSize="small" />
                    </div>
                  </div>
                ) : (
                  <Link to="/Home/Login">
                    <button className="font-[satoshi] text-[1.4rem] font-medium text-[#40444C]">
                      Log In
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}


