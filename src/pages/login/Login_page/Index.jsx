import React from "react";
import FormSlider from "../FormSlider";
import {
  Dialog,
  Button,
  Grid,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material/";
import { useState } from "react";
import { createTheme, fontWeight } from "@mui/system";
import useMediaQuery from "@mui/material/useMediaQuery";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import styled from "@emotion/styled";
import useLogin from "../../../Hooks/useLogin";
import Formcom from "./Login";

const StyledTypography = styled(Typography)({
  background:
    "var(--Linear-BG, linear-gradient(71deg, #FF9F0A 0%, #FF375F 62.9%))",
  WebkitBackgroundClip: "text",
  fontSize: "46px",
  color: "transparent",
  display: "inline-block",
  fontfamily: "Epilogue",
  fontWeight: 700,
  fontStyle: "normal",
});

const UserLogin = ({ text, color, fontWeight, size }) => {
  const { Initial_value, formValidation, loginData } = useLogin();

  const theme = createTheme();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const isSmallScreen = useMediaQuery("(max-width:600px)");

  return (
    <>
      <button
        className="font-[satoshi]   "
        style={{
          color: color || "#40444C",
          fontWeight: fontWeight || 500,
          fontSize: size || "1.1rem",
        }}
        onClick={handleClickOpen}
      >
        {text}
      </button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullScreen={isSmallScreen}
        maxWidth="xl"
        TouchRippleProps={{ disableTouchRipple: true }} // Disable touch ripple outside dialog
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 16,
            top: 16,
            zIndex: 1,
            backgroundColor: "#0000001a",
          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent
          style={{
            // overflowY: "hidden",

            overflowX: "hidden",
            padding: "0px",
          }}
        >
          <div className="flex w-full">
            <div className="w-1/2 flex flex-col justify-center  items-center max-desktop:font-[satoshi]">
              <Formcom
                Initial_value={Initial_value}
                formValidation={formValidation}
                loginData={loginData}
              />
            </div>
            {!isSmallScreen && (
              <div className="w-1/2">
                <FormSlider isSmallScreen={isSmallScreen} />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserLogin;
