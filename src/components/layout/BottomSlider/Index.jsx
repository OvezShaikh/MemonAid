import { Navigation, Pagination, A11y, Grid } from "swiper/modules";

import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/grid";

import React, { useState, useEffect } from "react";

import axios from "axios";

import { Link } from "react-router-dom";

const MultipleRows = () => {
  const [sliderData, setSliderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const limit = 20;
  const arrowStyles = { width: "48px", height: "48px" };

  useEffect(() => {
    const fetchSliderData = async () => {
      try {
        const API_ENDPOINT = `${process.env.REACT_APP_API_URL}/campaign/campaign-category?page=${page}&limit=${limit}`;
        const response = await axios.get(API_ENDPOINT);
        setSliderData(response.data.rows);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchSliderData();
  }, []);

  return (
    <Swiper
      // install Swiper modules
      modules={[Grid, Navigation, Pagination, A11y]}
      //spaceBetween={50}

      pagination={{
        el: ".swiper-pagination-bottom",

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

          return `<ul class="custom-pagination-bottom">${bullets.join(
            ""
          )}</ul>`;
        },
      }}
      navigation={{
        nextEl: ".review-swiper-button-next",
        prevEl: ".review-swiper-button-prev",
      }}
      breakpoints={{
        300: {
          slidesPerView: 2,
          grid: {
            rows: 6,

            fill: "row",
          },
          spaceBetween: 16,
        },
        700: {
          slidesPerView: 3,
          grid: {
            rows: 2,

            fill: "row",
          },
          spaceBetween: 40,
        },

        1365: {
          slidesPerView: 6,
          grid: {
            rows: 2,

            fill: "row",
          },
          spaceBetween: 48,
        },
      }}
      scrollbar={{ draggable: true }}
      // onSwiper={(swiper) => console.log(swiper)}
      // onSlideChange={() => console.log("slide change")}
    >
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}

      {!loading &&
        !error &&
        sliderData.map((item, index) => (
          <>
            <SwiperSlide>
              <Link to={`/Home/CampaignsByCategory/${item.name}`}>
                <div className="max-w-[220px]]">
                  <div key={index} className="mb-[20px]">
                    <img
                      style={{
                        width: "100%",

                        aspectRatio: "1/1",
                        background:
                          "linear-gradient(0deg, #EBEBEB 0%, #EBEBEB 100%)",
                        borderRadius: 12,
                      }}
                      src={`${process.env.REACT_APP_API_URL}` + item.image}
                      alt={`Image ${index + 1}`}
                    />
                  </div>
                  <div
                    className="py-2 text-[1.5rem] max-desktop:text-[20px] max-tablet:text-[18px] w-[100%] text-center bottom-slider"
                    style={{
                      fontFamily: "Satoshi",
                      color: "#383A42",
                      fontWeight: "500",
                    }}
                  >
                    <h3>{item.name}</h3>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          </>
        ))}

      <div className="swiper-pagination-bottom"></div>
    </Swiper>
  );
};

export default MultipleRows;

/////////////////////////////////////////////////////////////////
