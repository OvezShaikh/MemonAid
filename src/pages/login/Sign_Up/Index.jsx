import React from "react";
import {
  Dialog,
  Button,
  Grid,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material/";
import { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import FormSlider from "../FormSlider";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import styled from "@emotion/styled";
import Sign_Stepper from "./Stepper";
import SecondaryButton from "../../../components/inputs/secondaryButton";

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

const UserSignUp_02 = ({ size }) => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  return (
    <>
      <SecondaryButton
        onClick={handleOpen}
        type="button"
        sx={{ width: "100%", padding: "10px 40px" }}
      >
        <span
          style={{
            fontSize: size || "1.4rem",
            fontWeight: 500,
            background: "linear-gradient(to right, #FF9F0A 0%, #FF375F 62.9%)",
            "-webkit-background-clip": "text",
            "-webkit-text-fill-color": "transparent",
          }}
        >
          Register
        </span>
      </SecondaryButton>

      <Dialog
        sx={{
          padding: "0px !important",
          "& .MuiDialogContent-root": {
            padding: "0px !important",
          },
        }}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullScreen={isSmallScreen}
        maxWidth="xl"
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

        <DialogContent style={{ overflowX: "hidden" }}>
          <div className="flex w-full">
            <div className="w-1/2 flex flex-col justify-center items-center">
              <Sign_Stepper />
            </div>
            {!isSmallScreen && (
              <div className="w-1/2">
                <FormSlider />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserSignUp_02;
