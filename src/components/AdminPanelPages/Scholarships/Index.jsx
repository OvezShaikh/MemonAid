import React from "react";
import { IoIosConstruct } from "react-icons/io";

const Scholarship = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="pt-24 flex flex-col justify-center items-center">
        <h1
          className="text-[60px] max-desktop:text-[35px] max-tablet:text-[20px] font-black font-[satoshi]"
          style={{
            background: "linear-gradient(to right, #FF9F0A 0%, #FF375F 62.9%)",
            "-webkit-background-clip": "text",
            "-webkit-text-fill-color": "transparent",
          }}
        >
          Under Development
        </h1>
        <IoIosConstruct
          className="w-[400px] h-[400px] max-desktop:w-[250px] max-desktop:h-[250px] max-tablet:w-[150px] max-tablet:h-[150px]"
          style={{
            color: "#f77440",
          }}
        />
      </div>
    </div>
  );
};

export default Scholarship;
