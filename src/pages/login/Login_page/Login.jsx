import React, { useState } from "react";
import { Formik, Form } from "formik";
import styled from "@emotion/styled";
import CheckBox from "../../../components/inputs/checkBox";
import { Grid, Typography } from "@mui/material";
import InputField from "../../../components/inputs/InputField";
import SecondaryButton from "../../../components/inputs/secondaryButton";
import PrimaryButton from "../../../components/inputs/PrimaryButton";
import UserSignUp_02 from "../Sign_Up/Index";
import { Container } from "@mui/system";
import { Link } from "react-router-dom";
import ForgotPassword from "../ForgotPassword/Index";

const StyledTypography = styled(Typography)({
  background:
    "var(--Linear-BG, linear-gradient(71deg, #FF9F0A 0%, #FF375F 62.9%))",
  WebkitBackgroundClip: "text",
  fontSize: "2.8rem",
  color: "transparent",
  display: "inline-block",
  fontfamily: "Epilogue",
  fontWeight: 700,
  fontStyle: "normal",
});

const Formcom = ({ Initial_value, formValidation, loginData }) => {
  return (
    <div className="w-[65%] ">
      <div className="flex flex-col w-full">
        <StyledTypography
          component="h4"
          variant="h4"
          sx={{
            marginTop: "38px",
            fontFamily: "Epilogue",
          }}
        >
          Login
        </StyledTypography>
        <hr className="text-gray-500  pt-2" />
        <h1
          style={{
            fontSize: "1.2rem",
            fontWeight: 500,
            color: "var(--Neutral-Neutral-7, #717171)",
            fontFamily: "satoshi",
            letterSpacing: "0.88px",
            padding: "10px 0 30px 0",
          }}
        >
          Welcome Back! Please enter you details
        </h1>
      </div>

      <Formik
        initialValues={Initial_value}
        validationSchema={formValidation}
        onSubmit={(values) => {
          loginData(values);
        }}
      >
        <Form>
          <div>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <InputField
                  Size={18}
                  label="Email"
                  name="email"
                  sx={{
                    padding: " 8px 10px 8px var(--Spacing-20, 20px)",
                    border: "2px solid var(--Linear-BG, #FF9F0A)",
                    borderImage: "linear-gradient(#FF9F0A, red) 20",
                    // borderWidth: '3px',
                    borderStyle: " solid",
                    borderRadius: "4px",
                  }}
                  placeholder="enter your email"
                />
              </Grid>
              <Grid item xs={12} className="mt-10">
                <InputField
                  top={"28px"}
                  label="Password"
                  type="password"
                  name="password"
                  Size={18}
                  sx={{
                    padding: " 8px 10px 8px 10px",
                    border: "2px solid var(--Linear-BG, #FF9F0A)",
                    borderImage: "linear-gradient(#FF9F0A, red) 20",
                    // borderWidth: '3px',
                    borderStyle: " solid",
                    borderRadius: "4px",
                  }}
                  placeholder="************"
                />
              </Grid>
              <Grid
                item
                xs={12}
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <CheckBox label="Remember Me" name={"remember_me"} />
                <div style={{ width: "20px" }}></div>
                <h1>
                  <ForgotPassword />
                </h1>
              </Grid>
              <Grid item xs={12}>
                <PrimaryButton
                  sx={{ width: "100%", padding: "12px 40px" }}
                  type="submit"
                >
                  <span style={{ fontSize: "1.4rem", fontWeight: 900 }}>
                    {" "}
                    Sign In{" "}
                  </span>
                </PrimaryButton>
              </Grid>

              <Grid item xs={12}>
                <UserSignUp_02 />
              </Grid>
            </Grid>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Formcom;
