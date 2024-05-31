import React from "react";
import { Formik, Form } from "formik";
import { Container, div, FormLabel } from "@mui/material";
import InputField from "../../../components/inputs/InputField";
import CountrySelect from "../../../components/inputs/countrySelect";
import RadioGroup from "../../../components/inputs/radioGroup";
import CheckBox from "../../../components/inputs/checkBox";
import { useFormikContext } from "formik";
import PrimaryButton from "../../../components/inputs/PrimaryButton";
import SecondaryButton from "../../../components/inputs/secondaryButton";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Sign_02 = ({ handleBack, handleNext }) => {
  const { submitForm, setFieldValue, isValid } = useFormikContext();

  const handleNextClick = () => {
    if (isValid) {
      submitForm();
    } else {
      toast.error("Please fill all required fields.");
    }
  };

  return (
    <Form className="pt-8 px-2">
      <div>
        <div className="flex flex-col gap-3">
          <div>
            <InputField
              required={true}
              label="Password"
              top={"28px"}
              sx={{
                padding: " 8px 10px 8px 10px",
                border: "2px solid var(--Linear-BG, #FF9F0A)",
                borderImage: "linear-gradient(#FF9F0A, red) 20",
                // borderWidth: '3px',
                borderStyle: " solid",
                borderRadius: "4px",
              }}
              name={"password"}
              type="password"
              placeholder="************"
            />
          </div>
          <div>
            <InputField
              required={true}
              label="Confirm Password"
              Size={18}
              sx={{
                padding: " 8px 10px 8px 10px",
                border: "2px solid var(--Linear-BG, #FF9F0A)",
                borderImage: "linear-gradient(#FF9F0A, red) 20",
                // borderWidth: '3px',
                borderStyle: " solid",
                borderRadius: "4px",
              }}
              top={"28px"}
              name={"password2"}
              type="password"
              placeholder="************"
            />
          </div>
          <div>
            <CountrySelect
              size={18}
              label="Select Your Country"
              name={"country"}
              required={true}
            />
          </div>
          <div>
            <RadioGroup
              size={18}
              required={true}
              label={"I want to register as:"}
              onChange={(e) => {
                setFieldValue("user_type", e.target.value);
              }}
              name="user_type"
              sx={{
                "& .MuiTypography-root": {
                  fontSize: "1.2rem",
                },
              }}
              options={[
                { label: "Individual", value: "Individual" },
                { label: "NGO", value: "NGO" },
              ]}
            />
          </div>

          <div className="flex items-center">
            <CheckBox
              label="I agree with the"
              name={"policy_privacy"}
              fontSize={18}
            />
            <Link
              href={"/Home/Privacy-Policy"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FormLabel
                underline="always"
                sx={{
                  width: "fit-content",
                  textAlign: "center",
                  color: "#FF9F0A",
                  fontSize: "1.2rem",
                  fontFamily: "Satoshi",
                  fontWeight: 700,
                  textDecoration: "underline",
                  background:
                    "linear-gradient(to right, #FF9F0A 0%, #FF375F 62.9%)",
                  "-webkit-background-clip": "text",
                  "-webkit-text-fill-color": "transparent",
                  textDecoration: "underline",

                  position: "relative",
                }}
              >
                <p className="gradient-button mb-0">Privacy Policy</p>
              </FormLabel>
            </Link>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "10px",
            }}
          >
            <SecondaryButton
              sx={{ width: "50%", padding: "12px 40px", borderRadius: "4px" }}
              onClick={() => handleBack()}
            >
              <h1 className="text-[1.4rem] font-[satoshi] font-semibold text-black ">
                Back
              </h1>
            </SecondaryButton>

            <PrimaryButton
              sx={{ width: "50%", padding: "12px 40px" }}
              disabled={!isValid}
              onClick={handleNextClick}
            >
              <h1 className="text-[1.4rem] font-[satoshi] font-semibold text-whites ">
                SignUp
              </h1>
            </PrimaryButton>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default Sign_02;
