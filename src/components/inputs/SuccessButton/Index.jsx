import { Button } from "@mui/material";
import React from "react";

function Index({ text, icon, sx, ...otherProps }) {
  return (
    <button
      // variant="text"
      style={{
        padding: "7px",
        borderRadius: "4px",
        background: "#219D80",
        color: "#FFFFFF",
        fontSize: "0.9rem",
        fontFamily: "satoshi",
        fontWeight: 500,
        textTransform: "capitalize",
        display: "flex",
        gap: 4,
        justifyItems: "center",
        justifyContent: "center",
        ...sx,
      }}
      {...otherProps}
    >
      {icon} {text}
    </button>
  );
}

export default Index;
