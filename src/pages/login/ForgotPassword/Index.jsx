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
import VerifyEmail from "./VerifyEmail";

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

const UserSignUp_02 = () => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        onClick={handleOpen}
        style={{
          padding: "10px 0",
          display: "inline-block",
          fontFamily: "satoshi",
          fontWeight: 500,
          fontSize: "1rem",
          color: "#0466C8",
          textDecoration: "underline",
        }}
      >
        Forgot Password
      </Button>

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

        <DialogContent style={{ overflowY: "hidden", overflowX: "hidden" }}>
          <Grid container>
            <Grid
              item
              xs={16}
              sm={8}
              md={6}
              className="flex flex-col justify-center items-center"
            >
              <Grid item>
                <VerifyEmail />
              </Grid>
            </Grid>
            {!isSmallScreen && (
              <Grid
                item
                xs={12}
                sm={isSmallScreen ? 12 : 8}
                md={6}
                sx={{ overflowY: "hidden" }}
              >
                <FormSlider />
              </Grid>
            )}
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserSignUp_02;
