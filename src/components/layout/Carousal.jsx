import { Navigation, Pagination, A11y } from "swiper/modules";
import PrimaryButton from "../inputs/PrimaryButton";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Homestyles.css";
import { Link } from "react-router-dom";
import { useGetAll } from "../../Hooks";
import { useState } from "react";
import images from "../../constants/images";
import removeTags from "../../utils/Removetag";
import { Dialog } from "./dialogBox/dialog";

const style = {
  fontSize: "1.5rem",
  fontWeight: 900,
  fontFamily: "satoshi",
  color: "#FFFFFF",
  padding: "16px 25px",
  borderRadius: "8px",
};
const style1 = {
  fontSize: "1rem",
  fontWeight: 900,
  fontFamily: "satoshi",
  color: "#FFFFFF",
  padding: "12px 20px",
  borderRadius: "8px",
};
const HomeSwiper = () => {
  const [allCards, setAllCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(100);

  useGetAll({
    key: `/campaign/featured-campaign?page=${page}&limit=${perPage}`,
    enabled: true,
    select: (data) => {
      return data?.data?.rows;
    },
    onSuccess: (data) => {
      setAllCards(data);
      setLoading(false);
    },
    onError: () => {
      console.error("Error fetching card data");
      setLoading(false);
      setError(true);
    },
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[753px]">
        <div className="loader"></div>
      </div>
    ); // Show loading indicator
  }

  if (error) {
    return (
      <div className=" flex flex-col items-center ">
        {/* Show classic style error image and message */}
        <img
          className="w-full h-[733px] max-tablet:h-[600px]"
          src={images.NoData}
          alt="Error"
        />
        <p className="text-[2.5rem] font-[satoshi] font-bold max-desktop:text-[1.4rem] max-tablet:text-[0.9rem]">
          Oops! Something went wrong. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <Swiper
      modules={[Navigation, Pagination, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      pagination={{
        el: ".swiper-pagination",
        type: "custom",
        clickable: true,
        renderCustom: function (swiper, current, total) {
          const bullets = [];
          for (let i = 1; i <= total; i++) {
            const isActive = i === current ? "active" : "";
            const bulletContent = isActive ? `${i}/${total}` : "";
            bullets.push(
              `<li class="bullet ${isActive}" data-index="${i}">${bulletContent}</li>`
            );
          }

          return `<ul class="custom-pagination">${bullets.join("")}</ul>`;
        },
      }}
      navigation
      scrollbar={{ draggable: true }}
    // onSwiper={(swiper) => console.log(swiper)}
    // onSlideChange={() => console.log("slide change")}
    >
      {allCards.map((item) => {
        const image = `${process.env.REACT_APP_API_URL}${item?.campaign_image}`;
        return (
          <SwiperSlide key={item.id}>
            <div className="max-w-[1920px] max-desktop:w-full max-tablet:w-full w-full h-[753px] relative max-desktop:hidden max-tablet:hidden">
              <div className="max-w-[1920px] max-desktop:w-full max-desktop:flex  max-tablet:w-full  w-full h-[753px] flex  z-16 top-0 left-0 absolute  ">
                <div
                  className="w-1/2   bg-no-repeat bg-cover "
                  style={{ backgroundImage: `url(${images.HeaderImage2})` }}
                ></div>
                <div
                  className="w-1/2 bg-no-repeat bg-cover "
                  style={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
              </div>

              <div className="max-w-[815px] max-tablet:left-3.5 bg-transparent max-tablet:top-[6%] max-tablet:w-[343px] h-[408px] max-desktop:flex max-desktop:flex-col space-y-6 top-[29%] left-[14rem] max-desktop:top-[5%] max-desktop:left-[4rem] z-20 absolute max-desktop:text-center max-desktop:justify-center">
                <h1 className="text-[3.5rem] font-black font-[satoshi] max-tablet:text-[1.75rem] max-desktop:w-[630px] max-tablet:w-full  text-[#25272C]">
                  {item?.title}
                </h1>
                <p className="text-[1.75rem] font-medium font-[satoshi]  max-tablet:text-[1.1rem]  max-desktop:w-[630px] max-tablet:w-full text-[#8E95A2] max-h-[200px] line-clamp-3 !max-desktop:truncate">
                  {removeTags(item?.summary)}
                </p>
                <div className="">
                  <Dialog
                    button={
                      <PrimaryButton
                        className="hidden max-desktop:block"
                        sx={style}
                      >
                        Donate for the Cause
                      </PrimaryButton>
                    }
                    title="donate Cause"
                  // onClose={() => onClose && onClose()}
                  >

                    <div className="flex flex-col justify-center items-center gap-2 px-10">

                      <Link to={`/campaign-details/${item?.id}`} className="text-primary font-bold font-satoshi">Link to Story</Link>


                      <p>Bank details for donation are mentioned in the cause itself, please refer the cause to donate the beneficiary directly.
                        Or contact us at
                        <span className="text-primary"> +91 9117 01 9117  memonaidinternational@gmail.com.</span></p>

                    </div>
                  </Dialog>
                </div>
              </div>
              <div className="max-w-[1920px] max-desktop:w-full max-tablet:w-full w-full h-[753px]  z-18 absolute top-0 left-0 bg-gradient-to-b from-transparent via-blur-white to-transparent lg:bg-gradient-to-r"></div>
            </div>
            <div className="w-full h-[753px] flex flex-col relative desktop:hidden">
              <div
                className="w-full bg-cover flex-col items-center flex h-[400px]  pt-[120px]"
                style={{ backgroundImage: `url(${images.HeaderImage2})` }}
              >
                <div className="flex flex-col  w-[70%] items-center gap-4 absolute z-50 text-center">
                  <h1 className="text-[3.5em] font-black font-[satoshi] max-tablet:text-[1.75rem]  max-tablet:w-full  text-[#25272C]">
                    {item?.title}
                  </h1>
                  <p className="text-[1.75rem] font-medium font-[satoshi]  max-tablet:text-[1.1rem]  max-tablet:w-full text-[#8E95A2] ">
                    {removeTags(item?.summary)}
                  </p>
                  <div className="max-tablet:hidden">
                    <Dialog
                      button={
                        <PrimaryButton
                          className="hidden max-tablet:block"
                          sx={style}
                        >
                          Donate for the Cause
                        </PrimaryButton>
                      }
                      title="donate Cause"
                    // onClose={() => onClose && onClose()}
                    >

                      <div className="flex flex-col justify-center items-center gap-2 px-10">

                        <Link to={`/campaign-details/${item?.id}`} className="text-primary font-bold font-satoshi">Link to Story</Link>


                        <p>Bank details for donation are mentioned in the cause itself, please refer the cause to donate the beneficiary directly.
                          Or contact us at
                          <span className="text-primary"> +91 9117 01 9117  memonaidinternational@gmail.com.</span></p>

                      </div>
                    </Dialog>
                  </div>
                
                   <Dialog
                      button={
                        <div className="max-tablet:block max-desktop:hidden">
                        <PrimaryButton className="block" sx={style1}>
                          Donate for the Cause
                        </PrimaryButton>
                      </div>
                      }
                      title="donate Cause"
                    // onClose={() => onClose && onClose()}
                    >

                      <div className="flex flex-col justify-center items-center gap-2 px-2">

                        <Link to={`/campaign-details/${item?.id}`} className="text-primary font-bold font-satoshi">Link to Story</Link>


                        <p>Bank details for donation are mentioned in the cause itself, please refer the cause to donate the beneficiary directly.
                          Or contact us at
                          <span className="text-primary"> +91 9117 01 9117  memonaidinternational@gmail.com.</span></p>

                      </div>
                    </Dialog>
                </div>
              </div>
              <div
                className="w-full h-[383px] bg-no-repeat bg-cover"
                style={{
                  backgroundImage: `url(${image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>

              <div className="max-w-[1920px]  max-tablet:w-full w-full h-[753px]  z-18 absolute top-0 left-0 bg-gradient-to-b from-transparent via-blur-white to-transparent "></div>
            </div>{" "}
          </SwiperSlide>
        );
      })}
      <div className="swiper-pagination"></div>
    </Swiper>
  );
};

export default HomeSwiper;
