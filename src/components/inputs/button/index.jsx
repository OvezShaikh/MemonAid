import React from "react";
import { Button as MuiButton, CircularProgress } from "@mui/material";

export const Button = ({ isLoading = false, children, ...otherProps }) => {
  return (
    <MuiButton
      disableElevation
      variant={otherProps.variant || "contained"}
      sx={{
        "& .MuiButton-startIcon": {
          marginRight: "2px",
        },
      }}
      disabled={isLoading || otherProps.disabled}
      startIcon={
        (isLoading && <CircularProgress size={"15px"} color="inherit" />) ||
        otherProps.startIcon
      }
      className={`${
        otherProps.className || ""
      }  capitalize xl:text-sm 2xl:text-base`}
      {...otherProps}
    >
      {children}
    </MuiButton>
  );
};
