import React, { useState } from "react";
import * as Yup from "yup";
import { Typography, Stepper, Step, StepLabel, Box } from "@mui/material";
import { Formik } from "formik";
import styled from "@emotion/styled";
import { useCreateOrUpdate } from "../../../Hooks/useCreateOrUpdate";
import SignUp from "./SignUp";
import Sign_02 from "./Sign_02";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const styleStep = {
  "  .MuiStep-root .MuiStepLabel-root ": {
    flexDirection: "row-reverse",
  },
  "& .MuiStepLabel-label.Mui-active": {
    color: "var(--Cool-Grey-Cool-Grey-10, #383A42)",
    fontFamily: "Satoshi",
    fontSize: "1.2rem",
    fontStyle: "normal",
    paddingRight: "5px",
    fontWeight: 700,
  },
  "& .Mui-disabled": {
    "& .MuiStepIcon-root": {
      color: "white",
      fontWeight: 900,
      border: "1px solid gray",
      borderRadius: "50%",
      // width: '100%',
      "& .MuiStepIcon-text": {
        fill: "#white",
      },
    },
    "& .MuiStepLabel-label": {
      color: "var(--Cool-Grey-Cool-Grey-10, #383A42)",
      fontFamily: "Satoshi",
      fontSize: "1.2rem",
      fontStyle: "normal",
      paddingRight: "5px",
      fontWeight: 700,
    },
  },
  "& .Mui-active": {
    "& .MuiStepIcon-root": {
      color: "#06B217",
      fontWeight: 900,
      padding: "5px",
      border: "1px solid #06B217",
      borderRadius: "50%",
      "& .MuiStepIcon-text": {
        fill: "#06B217",
      },
    },
    "& .MuiStepConnector-line": {
      borderColor: "#06B217",
      paddingLeft: "0px !important",
    },
  },
  "& .Mui-completed": {
    "& .MuiStepIcon-root": {
      color: "#06B217",
    },
    "& .MuiStepConnector-line": {
      borderColor: "#06B217",
    },
    "& .MuiStepLabel-label": {
      color: "var(--Cool-Grey-Cool-Grey-10, #383A42)",
      fontFamily: "Satoshi",
      fontSize: "1.2rem",
      paddingRight: "5px",
      fontStyle: "normal",
      fontWeight: 700,
    },
  },
};
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

const INITIAL_VALUE = {
  email: "",
  username: "",
  mobile_number: "",
  password: "",
  password2: "",
  country: "",
  user_type: "Indivitual",
  profile_pic: "",
};

const formValidation = [
  Yup.object().shape({
    email: Yup.string()
      .email("Invalid Email! please enter correct email ")
      .required("Email is Required!"),
    username: Yup.string().required("Name is Required!"),
    mobile_number: Yup.string()
      .test("is-valid-phone", "Phone number is not valid", (value) => {
        if (!value) return false;
        const phoneRegExp = /^(?![0]+$)(\+[0-9]+)?[0-9]{6,14}$/; // Updated regex for international phone numbers
        return phoneRegExp.test(value);
      })
      .test(
        "not-starts-with-zero",
        "Phone number should not start with zero",
        (value) => {
          if (!value) return true; // Return true if phone number is empty
          return value.charAt(0) !== "0"; // Check if the first character of the phone number is not zero
        }
      )
      .required("Phone number is required")
      .min(10, "Number must be at least 10 characters")
      .max(10, "Number must be at most 10 characters"),
  }),
  Yup.object().shape({
    password: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("password"), null])
      .min(8, "password must be minimum 8 char")
      .matches(/[a-z]/, "password must contain at least one lowercase letter"),
    password2: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must be match")
      .required("Required"),
    policy_privacy: Yup.boolean()
      .oneOf([true], "You must agree to the terms and conditions")
      .required("You must agree to the terms and conditions"),
  }),
];
const getSteps = () => {
  return ["Details", "Information"];
};

const Sign_Stepper = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = getSteps();

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const { mutate } = useCreateOrUpdate({ url: "/accounts/register/nt/" });

  const submitForm = (values) => {
    const formData = new FormData();
    if (activeStep === 1) formData.append("profile_pic", values?.profile_pic);
    formData.append("email", values?.email);
    formData.append("username", values?.username);
    formData.append("password", values?.password);
    formData.append("country", values?.country);
    formData.append("user_type", values?.user_type);
    formData.append("country", values?.country);
    formData.append("mobile_number", values?.mobile_number);

    mutate(formData, {
      onSuccess: (response) => {
        toast.success(response?.data?.message, {
          position: "top-right",
        });
        navigate("/Home");
        window.location.href = "/Home";
      },
      onError: (response) => {
        toast.error(`${response?.response?.data?.email[0]}`, {
          position: "top-right",
        });
        toast.error(`${response?.response?.data?.mobile_number[0]}`, {
          position: "top-right",
        });
      },
    });
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <SignUp handleNext={handleNext} />;

      case 1:
        return <Sign_02 handleBack={handleBack} handleNext={handleNext} />;

      default:
        return "unknown step";
    }
  };
  const navigate = useNavigate();

  return (
    <div className="w-[65%] max-desktop:w-full max-tablet:full">
      <div className="max-desktop:hidden max-tablet:hidden">
        <StyledTypography
          component="h4"
          variant="h4"
          sx={{
            paddingBottom: "10px",
            fontFamily: "Epilogue",
          }}
        >
          Sign Up
        </StyledTypography>
        <hr className="text-gray-500  " />
      </div>
      <Box
        sx={{
          width: "100%",
          justifyContent: "center",
          margin: "auto",
          paddingTop: "20px",
        }}
      >
        <Stepper activeStep={activeStep} sx={styleStep}>
          {steps.map((step, index) => {
            const labelProps = {};
            const stepProps = {};
            return (
              <Step {...stepProps} key={index}>
                <StepLabel {...labelProps}>{step}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Box>
      <Box sx={{ width: "100%", justifyContent: "center", margin: "auto" }}>
        {activeStep === steps.length ? (
          <React.Fragment>
            <div className="flex "></div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Formik
              initialValues={INITIAL_VALUE}
              validationSchema={formValidation[activeStep]}
              onSubmit={(values) => {
                submitForm(values);
              }}
            >
              <>{getStepContent(activeStep)}</>
            </Formik>
          </React.Fragment>
        )}
      </Box>
    </div>
  );
};

export default Sign_Stepper;
