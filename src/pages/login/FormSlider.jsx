import React from "react";
import SideImage from "../../assets/SideImage.jpg";
import SideImage1 from "../../assets/SlideImage1.jpg";
import SideImage2 from "../../assets/SlideImage2.jpg";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import Slider from "react-slick";

const StyledSlider = styled(Slider)({
  width: "100%",
  height: "100%", // Set your desired height here
  position: "relative",
  overflowX: "hidden",
  objectFit: "contain",
  "& .slick-dots": {
    bottom: "5rem", // Adjust dot position if needed
  },
});

const OverlayContainer = styled("div")({
  position: "absolute",
  width: "630px",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-end", // Adjusted to align at the bottom
  zIndex: 1,
});

const OverlayBox = styled("div")({
  width: "80%",
  background:
    "linear-gradient(92deg, rgba(255, 255, 255, 0.27) 0%, rgba(255, 255, 255, 0.16) 100%)",
  color: "#fff",
  padding: "20px",
  textAlign: "center",
  maxWidth: "80%",
  margin: "0 auto",
  backdropFilter: "blur(15px)",
  // zIndex: 1,
});

const FormSlider = ({ isSmallScreen }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      {!isSmallScreen && (
        <div>
          <StyledSlider {...settings}>
            <img src={SideImage1} />
            <img src={SideImage2} />
            <img src={SideImage1} />
            <img src={SideImage2} />
          </StyledSlider>
          <OverlayContainer
            sx={{ bottom: "4rem", right: "1", marginLeft: "60px" }}
          >
            <OverlayBox sx={{ borderRadius: "10px" }}>
              <Typography variant="h6" style={{ color: "#696969" }}>
                "Together To Prosper" <br />
              </Typography>
            </OverlayBox>
          </OverlayContainer>
        </div>
      )}
    </>
  );
};

export default FormSlider;
