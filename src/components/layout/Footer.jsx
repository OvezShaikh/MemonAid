import React from "react";
import images from "../../constants/images";
import { TiSocialTwitter } from "react-icons/ti";
import { FiInstagram } from "react-icons/fi";
import { RiYoutubeLine } from "react-icons/ri";
import { FaFacebook } from "react-icons/fa";
import icons from "../../constants/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SecondaryButton from "../inputs/secondaryButton";
import { toast } from "react-toastify";
import UserLogin from "../../pages/login/Login_page/Index";

function Footer() {
  const navigate = useNavigate();
  const navigateToOng = () => {
    navigate("/Home/OnGoingCampaigns");
  };
  return (
    <>
      <div
        className="flex flex-col relative mt-[20rem] desktop:pt-[300px] desktop:px-[90px] max-desktop:pt-[240px] max-desktop:px-[48px] max-tablet:px-[17px] gap-[100px] max-tablet:gap-[20px] max-tablet:pt-[220px] desktop:pb-[60px] max-desktop:pb-[60px] max-tablet:pb-[12px]"
        style={{
          width: "100%",
          height: "100%",

          background: "#22262F",

          fontFamily: "satoshi",
        }}
      >
        <div className="flex mt-[140px] max-desktop:mt-[305px] desktop:max-w-[79%] desktop:w-full justify-center absolute -top-[50%] left-[50%] -translate-x-[50%] max-desktop:w-[81%] max-tablet:mt-[300px]">
          <div className="rounded-[20px] footer text-center desktop:p-[90px] max-desktop:px-[48px] max-desktop:py-[85px] max-tablet:px-[23px] max-tablet:py-[33px]">
            <p
              className="footer_text w-[100%] mx-auto text-[56px] max-desktop:text-[36px] max-tablet:text-[22px]"
              style={{ fontWeight: 700 }}
            >
              Ready to make an Impact? Join thousands of others today
            </p>
            <div className="flex justify-center my-10 mb-0 desktop:mt-[64px] gap-4 max-tablet:flex-col">
              <button
                className="px-[28px] max-desktop:px-[15px]"
                onClick={navigateToOng}
                style={{
                  paddingTop: 16,
                  paddingBottom: 16,
                  background: "rgba(194.44, 51.85, 51.85, 0.90)",
                  borderRadius: 8,
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 10,
                  display: "inline-flex",
                }}
              >
                <div style={{ width: 32, position: "relative" }}>
                  <img src={images.coins2} alt="" />
                </div>
                <div
                  className="text-[20px] max-tablet:text-[16px]"
                  style={{
                    color: "rgba(255, 255, 255, 0.90)",

                    fontFamily: "Satoshi ",
                    fontWeight: "700",
                    wordWrap: "break-word",
                  }}
                >
                  Support a Cause
                </div>
              </button>
              {localStorage.getItem("token") ? (
                <Link
                  to="/Home/Create-Campaign"
                  className="px-3 gap-[10px] max-tablet:gap-[0px]"
                  style={{
                    background:
                      "linear-gradient(93deg, rgba(255, 255, 255, 0.70) 0%, rgba(255, 255, 255, 0.50) 100%)",
                    borderRadius: 8,
                    border: "1px rgba(255, 255, 255, 0.10) solid",
                    backdropFilter: "blur(24px)",
                    justifyContent: "center",
                    alignItems: "center",

                    display: "inline-flex",
                  }}
                >
                  <div style={{ width: 32, height: 32, position: "relative" }}>
                    <img src={images.RocketLaunch2} alt="" />
                  </div>
                  <div
                    className="text-[20px] max-tablet:text-[16px] max-tablet:p-[16px] max-tablet:pl-[10px]"
                    style={{
                      color: "#383A42",

                      fontFamily: "Satoshi",
                      fontWeight: "700",
                      wordWrap: "break-word",
                    }}
                  >
                    Launch a Campaign
                  </div>
                </Link>
              ) : (
                <>
                  <div className=" max-desktop:hidden max-tablet:hidden">
                    <div
                      className=" gap-[10px] py-3  w-full"
                      style={{
                        background:
                          "linear-gradient(93deg, rgba(255, 255, 255, 0.70) 0%, rgba(255, 255, 255, 0.50) 100%)",
                        borderRadius: 8,
                        border: "1px rgba(255, 255, 255, 0.10) solid",
                        backdropFilter: "blur(24px)",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "10px 20px",

                        display: "inline-flex",
                      }}
                    >
                      <div
                        style={{ width: 32, height: 32, position: "relative" }}
                      >
                        <img src={images.RocketLaunch2} alt="" />
                      </div>
                      <div
                        className="text-[20px] "
                        style={{
                          color: "#383A42",

                          fontFamily: "Satoshi",
                          fontWeight: "700",
                          wordWrap: "break-word",
                        }}
                      >
                        <UserLogin
                          text={"Launch Campaign"}
                          fontWeight={700}
                          size={"20px"}
                        />{" "}
                      </div>
                    </div>
                  </div>
                  <div className="desktop:hidden">
                    <Link
                      to="/Home/Login"
                      className="px-3 gap-[10px] max-tablet:gap-[0px] w-full h-full"
                      style={{
                        background:
                          "linear-gradient(93deg, rgba(255, 255, 255, 0.70) 0%, rgba(255, 255, 255, 0.50) 100%)",
                        borderRadius: 8,
                        border: "1px rgba(255, 255, 255, 0.10) solid",
                        backdropFilter: "blur(24px)",
                        justifyContent: "center",
                        alignItems: "center",

                        display: "inline-flex",
                      }}
                    >
                      <div
                        style={{ width: 32, height: 32, position: "relative" }}
                      >
                        <img src={images.RocketLaunch2} alt="" />
                      </div>
                      <div
                        className="text-[20px] max-tablet:text-[16px] max-tablet:p-[16px] max-tablet:pl-[10px] "
                        style={{
                          color: "#383A42",

                          fontFamily: "Satoshi",
                          fontWeight: "700",
                          wordWrap: "break-word",
                        }}
                      >
                        Launch a Campaign
                      </div>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-between max-desktop:flex-wrap max-tablet:justify-start desktop:max-w-[1628px] desktop:m-auto">
          <div className="w-[34%] max-desktop:w-[100%] max-desktop:mb-[48px] max-tablet:mb-[20px] max-tablet:w-[100%] ">
            <img
              className="max-desktop:w-[180px] -m-2 desktop:pb-4 max-desktop:pb-4 max-tablet:pb-4 max-desktop:h-[60px] max-tablet:w-[120px] max-tablet:h-[60px] desktop:w-[180px] desktop:h-auto"
              src={images.Footer_logo}
              alt=""
            />
            <p
              className="desktop:w-[79%] desktop:text-[16px] max-tablet:text-[14px] max-desktop:w-[59%] max-tablet:w-[100%]"
              style={{
                color: "white",

                fontFamily: "Satoshi",
                fontWeight: "500",
                textTransform: "capitalize",
                wordWrap: "break-word",
              }}
            >
              Be it for a personal need, social cause or a creative idea - you
              can count on us for the project that you want to raise funds for.
            </p>
          </div>

          <div className="w-[11%] max-desktop:w-[30%] max-desktop:mb-[48px] max-tablet:w-[36%] max-tablet:mb-[12px]">
            <Link
              className="text-white font-bold"
              style={{
                fontSize: "1rem",
                fontFamily: "Satoshi",
                fontWeight: "700",
              }}
            >
              Quick Link
            </Link>
            <ul className="mt-3">
              <li>
                <Link
                  className="text-white/80"
                  style={{
                    fontFamily: "Satoshi",
                    fontWeight: "400",
                    textTransform: "capitalize",
                  }}
                  to="/Home"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="text-white/80"
                  style={{
                    fontFamily: "Satoshi",
                    fontWeight: "400",
                    textTransform: "capitalize",
                  }}
                  to="/Home/Knowing-MemonAid"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  className="text-white/80"
                  style={{
                    fontFamily: "Satoshi",
                    fontWeight: "400",
                    textTransform: "capitalize",
                  }}
                  to="/Home/Blog-Post"
                >
                  Blog Post
                </Link>
              </li>
              <li>
                <Link
                  className="text-white/80"
                  style={{
                    fontFamily: "Satoshi",
                    fontWeight: "400",
                    textTransform: "capitalize",
                  }}
                  to="/Home/Photo-Gallery"
                >
                  Photo Gallery
                </Link>
              </li>
            </ul>
          </div>

          <div className="w-[11%] max-desktop:w-[30%] max-tablet:w-[36%]">
            <Link
              className="text-white font-bold"
              style={{
                fontSize: "1rem",
                fontFamily: "Satoshi",
                fontWeight: "700",
              }}
            >
              Get In Touch
            </Link>
            <ul className="mt-3">
              <li>
                <Link
                  className="text-white/80"
                  style={{
                    fontFamily: "Satoshi",
                    fontWeight: "400",
                    textTransform: "capitalize",
                  }}
                  to="/Home/Contact-Us"
                >
                  Contact us
                </Link>
              </li>
              <li>
                <Link
                  className="text-white/80"
                  style={{
                    fontFamily: "Satoshi",
                    fontWeight: "400",
                    textTransform: "capitalize",
                  }}
                  to="/Home/Our-Services"
                >
                  Our services
                </Link>
              </li>
            </ul>
          </div>

          <div className="w-[17%] max-desktop:w-[40%] max-tablet:w-[90%] max-tablet:mb-[20px]">
            <Link
              className="text-white font-bold"
              style={{
                fontSize: "1rem",
                fontFamily: "Satoshi",
                fontWeight: "700",
              }}
            >
              Address
            </Link>
            <p
              className="text-white/80 mt-3 w-[70%]"
              style={{
                fontFamily: "Satoshi",
                fontWeight: "400",
                textTransform: "capitalize",
              }}
            >
              A-1 Memon Colony, Dargah Road, Kazi Bagh, Parbhani, Maharashtra India 431 401
            </p>
          </div>

          <div className="flex justify-end w-[24.5%] max-desktop:w-[54%] max-tablet:w-full">
            <div className="w-full ">
              <Link
                className="text-white  font-bold"
                style={{
                  fontSize: "1rem",
                  fontFamily: "Satoshi",
                  fontWeight: "700",
                }}
              >
                Newsletter
              </Link>
              <div className="flex mt-3 flex-row rounded-lg w-full h-[48px]">
                <input
                  className="text-[15px] pl-4 w-full"
                  aria-label="Demo input"
                  multiline={"true"}
                  placeholder="Enter your email"
                />
                <div
                  className="max-w-[122px] w-full"
                  style={{
                    paddingLeft: 24,
                    paddingRight: 24,
                    paddingTop: 1,
                    paddingBottom: 12,
                    background: "#219D80",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 10,
                    display: "inline-flex",
                  }}
                >
                  <button
                    style={{
                      color: "white",
                      fontSize: "1rem",
                      fontFamily: "Satoshi",
                      fontWeight: "700",
                      textTransform: "capitalize",
                      wordWrap: "break-word",
                    }}
                    className="pt-2"
                  >
                    Subscribe
                  </button>
                </div>
              </div>
              <p
                className="text-white/80 mt-2 w-full text-[14px]"
                style={{
                  fontFamily: "Satoshi",
                  fontWeight: "400",
                  textTransform: "capitalize",
                }}
              >
                Your email is safe with us, we don’t spam.
              </p>

              <p
                className="text-white mt-8 font-bold"
                style={{
                  fontSize: "1rem",
                  fontFamily: "Satoshi",
                  fontWeight: "700",
                }}
              >
                Follow Us
              </p>
              <div className="flex mt-2 flex-row">
                <Link
                  className="text-white/80 text-3xl"
                  style={{
                    fontFamily: "Satoshi",
                    fontWeight: "400",
                    textTransform: "capitalize",
                  }}
                  to="https://x.com/memon_aid?t=W__NQrviWkmv06M8Ht6q9Q&s=08"
                  target="_blank"
                >
                  <img src={icons.FooterIconTw} />
                </Link>
                <Link
                  className="text-white/80 ml-3 text-2xl"
                  style={{
                    fontFamily: "Satoshi",
                    fontWeight: "400",
                    textTransform: "capitalize",
                  }}
                  to="https://www.instagram.com/memonaid_?igsh=MXhtaHI4dG1sYmtpcw=="
                  target="_blank"
                >
                  <img src={icons.FooterIconIn} />
                </Link>
                <Link
                  className="text-white/80 ml-3  text-3xl"
                  style={{
                    fontFamily: "Satoshi",
                    fontWeight: "400",
                    textTransform: "capitalize",
                  }}
                  to="https://www.facebook.com/memonaidinternational/"
                  target="_blank"
                >
                  <FaFacebook />
                </Link>
                <Link
                  className="text-white/80 ml-3 text-3xl"
                  style={{
                    fontFamily: "Satoshi",
                    fontWeight: "400",
                    textTransform: "capitalize",
                  }}
                  to="https://www.youtube.com/channel/UCAfC_F7RWTa2hYbJ1f3UQlA"
                  target="_blank"
                >
                  <img src={icons.FooterIconYo} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div>
          <hr className="text-white/50 pb-2"></hr>
          <p className="text-white/40 text-1xl max-tablet:text-center">
          Copyright Memon ID @ 2024 | Crafted by <Link to="https://lowcosys.com/" target="_blank">lowcosys.com</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Footer;
