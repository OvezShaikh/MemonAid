import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Typography } from "@mui/material";
import images from "../../../constants/images";
import PrimaryButton from "../../inputs/PrimaryButton";
import SecondaryButton from "../../inputs/secondaryButton";
import CompleteKYC from "../../../pages/Campaigns/CreateCampaigns/CreateCampaignsSteppes/CompleteKYC";
import AccountDetails from "../../../pages/Campaigns/CreateCampaigns/CreateCampaignsSteppes/AccountDetails";
import YourStory from "../../../pages/Campaigns/CreateCampaigns/CreateCampaignsSteppes/YourStory";
import CampaignDetails from "../../../pages/Campaigns/CreateCampaigns/CreateCampaignsSteppes/CampaignDetails";
import { useCreateOrUpdate } from "../../../Hooks/useCreateOrUpdate";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import "./Stepper.css";
import { toast } from "react-toastify";
import { positions } from "@mui/system";

const styleStep = {
  "& .MuiStepLabel-label.Mui-active": {
    color: "var(--Cool-Grey-Cool-Grey-10, #383A42)",
    fontFamily: "Satoshi",
    fontSize: "1.5rem",
    fontStyle: "normal",
    fontWeight: 700,
  },
  "& .Mui-disabled": {
    "& .MuiStepIcon-root": {
      color: "white",
      fontWeight: 900,
      border: "1px solid gray",
      borderRadius: "50%",
      "& .MuiStepIcon-text": {
        fill: "#white",
      },
    },
    "& .MuiStepLabel-label": {
      color: "var(--Cool-Grey-Cool-Grey-10, #383A42)",
      fontFamily: "Satoshi",
      fontSize: "1.5rem",
      fontStyle: "normal",
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
      fontSize: "1.5rem",
      fontStyle: "normal",
      fontWeight: 700,
    },
  },
};
const styleSecondaryButton = {
  width: "100%",
  height: "100%",
  padding: "10px",
  fontSize: "1.5rem",
  fontWeight: 700,
  borderRadius: "12px",
};
const stylePrimaryButton = {
  width: "100%",
  height: "100%",
  padding: "10px",
  fontSize: "1.5rem",
  fontWeight: 700,
  borderRadius: "12px",
};
const initialValues = {
  // campaign_image: "",
  title: "",
  goal_amount: "",
  location: "",
  category: "",
  zakat_eligible: false,
  end_date: "",
  story: "",
  summary: "",
  documents: "",
  rasing_for: "",
  account_holder_name: "",
  account_number: "",
  bank_name: "",
  branch_name: "",
  ifsc_code: "",
  passbook_image: "",
  // adhar_card: "",
  // adhar_card_image: "",
  // pan_card: "",
  // pan_card_image: "",
  declaration: false,
};

const validations = [
  yup.object({
    campaign_image: yup
      .mixed()
      .test("fileFormat", "Invalid file format", (value) => {
        if (!value) return true; // Allow empty value
        const acceptedFormats = ["image/jpeg", "image/png", "image/gif"];
        return value && acceptedFormats.includes(value.type);
      })
      .test("fileSize", "File size too large", (value) => {
        if (!value) return true; // Allow empty value
        const maxSize = 5 * 1024 * 1024; // 5 MB in bytes
        return value && value.size <= maxSize;
      }),
    title: yup
      .string()
      .max(250, "Title must be at most 250 characters")
      .required("Title is required"),
    goal_amount: yup.number().required("Amount is required"),
    location: yup.string().required("location is required"),
    category: yup
      .object({
        value: yup.string().required("Category is required!"),
        label: yup.string().required("Category is required!"),
      })
      .nullable()
      .required("Category is required!"),

    end_date: yup.string().required("End date is required"),
  }),
  yup.object({
    story: yup.string().required("Story is required"),
    summary: yup.string().required("Summary is required"),
    // documents: yup.mixed().required("Please upload a file"),
  }),
  yup.object({
    rasing_for: yup.string().required(" is required"),
    account_holder_name: yup
      .string()
      .required("account holder name is required"),
    account_number: yup
      .string()
      .required("Account number is required")
      .min(11)
      .max(16),
    bank_name: yup.string().required("Bank name is required"),
    branch_name: yup.string().required("Branch name is required"),
    ifsc_code: yup.string().required("IFSC Code is required"),
    declaration: yup
      .boolean()
      .oneOf([true], "You must agree to the terms and conditions")
      .required("You must agree to the terms and conditions"),
  }),
  // yup.object({
  //   adhar_card: yup
  //     .string()
  //     .required("Adhar Card number is required")
  //     .max(12, "Maximum 12 Number allowed")
  //     .min(12, "Minimun 12 Number allowed"),

  //   pan_card: yup
  //     .string()
  //     .required("Pan Card number is required")
  //     .max(10, "Maximum 10 Character allowed")
  //     .min(10, "Minimum 10 character allowed"),

  // }),
];

export default function HorizontalLinearStepper() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const getSteps = () => {
    return ["Campaign Details", "Your Story", "Account Details"];
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <CampaignDetails handleBack={handleBack} handleNext={handleNext} />
        );

      case 1:
        return <YourStory handleBack={handleBack} handleNext={handleNext} />;
      case 2:
        return (
          <AccountDetails handleBack={handleBack} handleNext={handleNext} />
        );
      // case 3:
      //   return <CompleteKYC handleBack={handleBack} handleNext={handleNext} />;
      default:
        return "unknown step";
    }
  };
  const steps = getSteps();

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const { mutate } = useCreateOrUpdate({
    url: "/add-campaign",
    onSuccess: async (data, Values) => {
      toast.success(`${data.data.message} `, {
        position: "top-center",
      });
      handleNext();
    },
    onError: (data, Values) => {
      toast.error(`${data.response.data.message} Error !!!!!!!!!!!!!!!!!!`, {
        position: "top-center",
      });
      handleNext();
    },
  });

  const onSubmit = (Values) => {
    const formData = new FormData();
    for (const key in Values) {
      if (key == "category") {
        formData.append("category", Values["category"]["value"]);
      } else {
        formData.append(key, Values[key]);
      }
    }
    mutate(formData);
  };

  return (
    <Box sx={{ width: "100%" }} className="stepper-box">
      <div className="steps-counter-div">
        <StepLabel>
          {activeStep === 3
            ? "All Steps Completed"
            : `${activeStep + 1} of ${steps.length} steps`}
        </StepLabel>
      </div>

      <Stepper activeStep={activeStep} sx={styleStep} className="stepper-div">
        {steps.map((step, index) => {
          const stepProps = {};
          const labelProps = {};

          return (
            <Step {...stepProps} key={index} className="step-div">
              <StepLabel className="step-label" {...labelProps}>
                {step}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography variant="h3" align="center">
            <div className="w-full px-0 py-[89px] flex flex-col justify-center items-center gap-3 max-desktop:px-0">
              <h1 className="text-[#06B217] desktop:text-[3rem] max-desktop:text-[3rem] mb-[35px] font-[satoshi] font-bold max-tablet:text-[1.2rem]">
                Success!
              </h1>
              <img
                className="w-[176px] h-[176px] mb-[35px]"
                src={images.Success}
                alt=""
              />
              <p
                className="text-[1.5rem] font-[satoshi] font-bold mb-[90px] max-tablet:text-[1.2rem] max-tablet:px-[12px]"
                style={{
                  background:
                    "linear-gradient(71deg, #06B217 0%, #FF375F 62.9%)",
                  "-webkit-background-clip": "text",
                  "-webkit-text-fill-color": "transparent",
                }}
              >
                Your Campaign has been submitted for further Approval !
              </p>
            </div>
          </Typography>
          <div className="flex desktop:gap-x-[40px] max-desktop:gap-x-[24px]">
            <SecondaryButton
              disabled={activeStep === 0}
              sx={styleSecondaryButton}
            >
              Back
            </SecondaryButton>
            {/* {isStepOptional(activeStep) && (
                <Button
                  // className={classes.button}
                  variant="contained"
                  color="primary"
                  onClick={handleSkip}
                >
                  skip
                </Button>
              )} */}
            <PrimaryButton sx={stylePrimaryButton} onClick={() => navigate(-1)}>
              Home
            </PrimaryButton>
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Formik
            initialValues={initialValues}
            validationSchema={validations[activeStep]}
            onSubmit={(Values) => onSubmit(Values)}
          >
            <>{getStepContent(activeStep)}</>
          </Formik>
        </React.Fragment>
      )}
    </Box>
  );
}
