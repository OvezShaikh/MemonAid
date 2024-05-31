import React from "react";
import InputLabel from "@mui/material/InputLabel";

const Label = ({ text, className, colorClass, outerClassName }) => {
  return (
    <p className={outerClassName ? outerClassName : "my-0"}>
      <InputLabel
        className={`${colorClass ? colorClass : "text-dark"} ${className} `}
      >
        {text}
      </InputLabel>
    </p>
  );
};

export default Label;
