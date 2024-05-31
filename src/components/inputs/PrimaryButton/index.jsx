import { Button, CircularProgress } from "@mui/material";
import React from "react";

const PrimaryButton = ({ children, sx, isLoading, ...otherProps }) => {
  return (
    <Button
      variant="contained"
      // className="max-tablet:w-full max-tablet:px-[100px]"
      color={"warning"}
      sx={{
        // color: "#fff",
        // boxShadow: "none",
        // height: "36px",
        // fontSize: {
        //   xs: "0.6rem",
        //   md: "0.8rem",
        // },
        background: "linear-gradient(71deg, #FF9F0A 0%, #FF375F 100%)",
        color: "white",
        alignitems: "flex-start",
        textTransform: "none",
        borderRadius: "3px",
        fontStyle: "normal",
        fontFamily: "satoshi",
        boxShadow: "none",
        '&:hover': {
          boxShadow: 'none',
        },
        ...sx,
      }}
      {...otherProps}
    >
      {isLoading && <CircularProgress size={20} className="me-2 text-white " />}
      {children}
    </Button>
  );
};

export default PrimaryButton;
