import React from "react";
import PrimaryButton from "../../components/inputs/PrimaryButton";
import images from "../../constants/images";
import { TbError404 } from "react-icons/tb";

const NotFoundPage = ({ color, background }) => {
  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center bg-no-repeat bg-cover"
      style={{ backgroundImage: background || `url(${images.Bg404})` }}
    >
      <div className=" flex flex-col justify-center items-center">
        <h1
          className="text-[9.37rem] font-black font-[Epilogue] max-tablet:text-[100px]  animate-bounce "
          style={{
            background: "linear-gradient(to right, #FF9F0A 0%, #FF375F 62.9%)",
            "-webkit-background-clip": "text",
            "-webkit-text-fill-color": "transparent",
            textDecoration: "underline",
          }}
        >
          Oops!
        </h1>
        <p
          className={`text-[25px] flex items-center font-bold my-4 ${
            color ? `text-${color}` : "text-[#fff]"
          }`}
        >
          <TbError404 size={50} />
          -PAGE NOT FOUND
        </p>

        <p
          className={`text-lg  w-[60%] text-center  max-tablet:w-[80%] ${
            color ? `text-${color}` : "text-[#fff]"
          }`}
        >
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <a href="/" className=" underline mt-4">
          <PrimaryButton>
            <h1 className=" underline text-xl font-medium capitalize">
              {" "}
              Go back to homepage
            </h1>
          </PrimaryButton>
        </a>
      </div>
    </div>
  );
};

export default NotFoundPage;
