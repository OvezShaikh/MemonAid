import React, { useContext, useMemo } from "react";
import images from "../../constants/images";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import InputField from "../../components/inputs/InputField";
import SelectField from "../../components/inputs/SelectField";
import CheckBox from "../../components/inputs/checkBox";
import PrimaryButton from "../../components/inputs/PrimaryButton";
import SecondaryButton from "../../components/inputs/secondaryButton";
import { LinearProgress } from "@mui/material";
import icons from "../../constants/icons";
import Navigation from "../../components/layout/Navigation/Index";
import { Formik, Form } from "formik";
import "./Donate.css";
import * as yup from "yup";

import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Avatar } from "@mui/material";

import moment from "moment";
import CountrySelect from "../../components/inputs/countrySelect";
import { useCreateOrUpdate, useGetAll } from "../../Hooks";
import { toast } from "react-toastify";

const InputStyle = {
  padding: "15px 20px",
  border: "1px solid #e2e2e2",
  // },
  "&:focus-within": {
    boxShadow: `0px 4px 10px 0px rgba(0, 0, 0, 0.15);`,
    borderColor: "black",
  },
};

const SelectStyle = {
  padding: "0px",
  border: "none",
  // },
  "&:focus-within": {
    boxShadow: `none`,
    borderColor: "none",
  },
};

const styleSecondaryButton = {
  width: "30%",
  //   height: "100%",
  padding: "10px",
  fontSize: "1.5rem",
  color: "#000000",
  fontWeight: 700,
  borderRadius: "12px",
};
const stylePrimaryButton = {
  width: "30%",
  //   height: "100%",
  padding: "10px",
  fontSize: "1.5rem",
  fontWeight: 700,
  borderRadius: "12px",
};

function Index({ goalAmount, fundRaised }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id } = useParams();
  const [cardDetails, setCardDetails] = useState(null);
  const [selectedPaymentGateway, setSelectedPaymentGateway] = useState("");
  const [user, setUser] = useState({});

  let userData = localStorage.getItem("user_info");
  let Data = JSON.parse(userData);
  let user_id = Data?.id;

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BE_BASE_URL}/campaign/campaign-details/${id}`
      )
      .then((res) => {
        setCardDetails(res.data.data);
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  }, [id]);

  const { mutate } = useCreateOrUpdate({
    url: `/donors/donate-money`,
  });

  const handleSubmit = (values) => {
    const formData = new FormData();
    formData.append("donation_type", values?.donation_type.value);
    formData.append("full_name", values?.full_name);
    formData.append("amount", values?.amount);
    formData.append("city", values?.city);
    formData.append("email", values?.email);
    formData.append("pancard", values?.pancard);
    formData.append("country", values?.country);
    formData.append("comment", values?.comment);
    formData.append("payment_type", selectedPaymentGateway);
    formData.append("is_anonymous", values?.is_anonymous);
    formData.append("campaign", cardDetails?.id);
    formData.append("mobile", values?.mobile);
    formData.append("transaction_date ", values?.transaction_date);
    formData.append("bank_name", values?.bank_name);
    {
      localStorage.getItem("token") && formData.append("user", user_id);
    }

    mutate(formData, {
      onSuccess: (response) => {
        if (selectedPaymentGateway === "Bank_Transfer") {
          window.location.href = "/Home";
        } else {
          const url = response?.data?.pay_page_url;
          window.location.href = url;
        }
      },
      onError: (response) => {
        toast.error(`${response?.message}errors`, { position: "top-right" });
      },
    });
  };

  useGetAll({
    key: `/accounts/user/${user_id}`,
    enabled: true,
    select: (data) => {
      return data?.data?.data;
    },
    onSuccess: (data) => {
      setUser(data);
    },
  });

  const inititalValues = {
    user: "",
    campaign: "",
    donation_type: "",
    full_name: user?.username || "",
    amount: "",
    city: user?.city || "",
    email: user?.email || "",
    mobile: user?.mobile_number || "",
    pancard: "",
    country: user?.country || "",
    comment: "",
    payment_type: "",
    is_anonymous: false,
    transaction_date: "",
    bank_name: "",
    other_details: "",
  };
  const validationSchema = yup.object().shape({
    amount: yup
      .number()
      .typeError("Please enter a valid amount")
      .min(50, "Amount must be at least 50 INR")
      .required("Amount is required"),
    donation_type: yup.object().required("Donation Type is required"),
  });

  return (
    <>
      <Navbar />
      <div className="flex flex-col ">
        <Navigation
          remove={"remove"}
          label={"Donate"}
          heading={"Donate"}
          titleName={cardDetails?.user}
        />
        <div className="flex px-20 py-32 gap-32 flex-col max-tablet:px-[16px]">
          <div className="flex  gap-24 max-desktop:flex-col-reverse">
            <div className="w-[65%] donate-div  max-desktop:w-full">
              <Formik
                enableReinitialize={true}
                validationSchema={validationSchema}
                initialValues={inititalValues}
                onSubmit={(values) => handleSubmit(values)}
              >
                <Form>
                  <div className="donation-type-div">
                    <SelectField
                      name={"donation_type"}
                      label={"Donation Type:"}
                      options={[
                        {
                          label: "General Donation",
                          value: "General_Donation",
                        },
                        { label: "Zakat", value: "Zakat" },
                        {
                          label: "Interest Offloading",
                          value: "Interest_Offloading",
                        },
                      ]}
                      sx={SelectStyle}
                    />
                  </div>
                  <InputField
                    label={"Enter your Amount:"}
                    placeholder={"Minimum 50 INR"}
                    name={"amount"}
                    sx={InputStyle}
                    type={"number"}
                  />
                  <InputField
                    label={"Full Name:"}
                    name={"full_name"}
                    sx={InputStyle}
                  />

                  <div className="flex w-full gap-4 p-0 max-tablet:flex-col">
                    <div className="w-[50%] p-0 max-tablet:w-full max-tablet:mb-0 email-country-div">
                      <InputField
                        label={"Email:"}
                        name={"email"}
                        sx={InputStyle}
                      />
                      <div className="donation-type-div country-select">
                        <CountrySelect
                          label="Country:"
                          name={"country"}
                          sx={SelectStyle}
                        />
                      </div>
                    </div>
                    <div className="w-[50%] p-0 max-tablet:w-full max-tablet:mb-0 city-mobile">
                      <InputField
                        label={"City:"}
                        name={"city"}
                        sx={InputStyle}
                      />
                      <div className="w">
                        <InputField
                          label={"Mobile:"}
                          name={"mobile"}
                          sx={InputStyle}
                          className="mobile-input"
                        />
                      </div>
                    </div>
                  </div>

                  <InputField
                    label={"PAN Card:"}
                    placeholder={
                      "Mandatory, if total number donations exceeds 80K INR in one financial year"
                    }
                    name={"pancard"}
                    sx={InputStyle}
                  />

                  <InputField
                    label={"Write a brief comment:"}
                    placeholder={"(Optional)"}
                    name={"comment"}
                    sx={InputStyle}
                  />
                  <div className="donation-type-div">
                    <SelectField
                      label={"Payment Gateway:"}
                      options={[
                        { label: "BANK TRANSFER", value: "Bank_Transfer" },
                        {
                          label:
                            "Pay via Credit Card/Debit Card/Net Banking/UPI /QR Code",
                          value: "UPI",
                        },
                      ]}
                      onChange={(value) =>
                        setSelectedPaymentGateway(value.value)
                      }
                      name={"payment_type"}
                      sx={SelectStyle}
                    />
                  </div>

                  {selectedPaymentGateway === "Bank_Transfer" ? (
                    <div
                      style={{ width: "100%", padding: "0 !important" }}
                      className={
                        selectedPaymentGateway === "Bank_Transfer"
                          ? "show-content"
                          : "hide-content"
                      }
                    >
                      <div
                        className=" w-full min-h-[302px] h-full bg-[#F7FAFF]  border flex flex-col gap-7"
                        style={{ borderRadius: "4px", padding: "8px 16px" }}
                      >
                        <p className="text-[1.25rem] font-medium font-[satoshi] max-desktop:text-[1.12rem] max-tablet:text-[1rem] text-[#00000080]">
                          Bank Name: ICICI BANK
                        </p>
                        <p className="text-[1.25rem] font-medium font-[satoshi] max-desktop:text-[1.12rem] max-tablet:text-[1rem] text-[#00000080]">
                          Branch: Pune
                        </p>
                        <p className="text-[1.25rem] font-medium font-[satoshi] max-desktop:text-[1.12rem] max-tablet:text-[1rem] text-[#00000080]">
                          Name: Fairseed Technology Foundation
                        </p>
                        <p className="text-[1.25rem] font-medium font-[satoshi] max-desktop:text-[1.12rem] max-tablet:text-[1rem] text-[#00000080]">
                          Account Number: 007405011500
                        </p>
                        <p className="text-[1.25rem] font-medium font-[satoshi] max-desktop:text-[1.12rem] max-tablet:text-[1rem] text-[#00000080]">
                          Type: Current Account
                        </p>
                        <p className="text-[1.25rem] font-medium font-[satoshi] max-desktop:text-[1.12rem] max-tablet:text-[1rem] text-[#00000080]">
                          IFSC: ICIC0000074
                        </p>
                      </div>
                      <div className="w-full donate-date-div max-tablet:w-[100%] p-0">
                        <InputField
                          type="date"
                          name={"transaction_date "}
                          sx={InputStyle}
                          inputProps={{ min: moment().format("YYYY-MM-DD") }}
                          required={true}
                          label="Date of Transaction"
                        />
                      </div>
                      <InputField
                        label={"Bank Name:"}
                        name={"bank_name"}
                        sx={InputStyle}
                      />
                      <InputField
                        label={"Transaction ID:"}
                        name={"transaction_ids"}
                        sx={InputStyle}
                      />
                      <InputField
                        label={"Other Details:"}
                        name={"other_details"}
                        sx={InputStyle}
                      />
                    </div>
                  ) : null}
                  <div className="anonymous-donation-div">
                    <CheckBox
                      name={"is_anonymous"}
                      label={"Make Anonymous donation"}
                    />
                  </div>
                  <div className="flex justify-center gap-3">
                    <SecondaryButton
                      onClick={() => navigate(-1)}
                      sx={styleSecondaryButton}
                    >
                      Back
                    </SecondaryButton>
                    <PrimaryButton type="submit" sx={stylePrimaryButton}>
                      Donate
                    </PrimaryButton>
                  </div>
                </Form>
              </Formik>
            </div>
            <div
              className="flex flex-col rounded-3xl justify-center items-center w-[35%] max-desktop:w-full pb-[24px] desktop:px-[26px] desktop:h-[900px] max-desktop:px-[40px] max-tablet:px-[20px]"
              style={{ border: "1px solid red" }}
            >
              <img
                className="desktop:mt-8 max-desktop:mt-8 max-tablet:mt-[24px] max-tablet:w-[94px]"
                src={images.Logo}
                alt="Logo"
              />
              <div
                className="m-10 max-tablet:mt-[24px] max-tablet:mb-[16px]"
                style={{
                  paddingLeft: 12,
                  paddingRight: 12,
                  background: "#FAF7F0",
                  borderRadius: 9,
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: 16,
                  display: "inline-flex",
                }}
              >
                <div style={{ width: 12, height: 12, position: "relative" }}>
                  <div
                    style={{
                      width: 12,
                      height: 12,
                      left: 0,
                      top: 0,
                      position: "absolute",
                      background: "#FF8A00",
                      borderRadius: 5,
                    }}
                  />
                </div>
                <div
                  className="desktop:text-[1.5rem] max-desktop:text-[1.25rem] max-tablet:text-[1.12rem]"
                  style={{
                    color: "#FF8A00",

                    fontFamily: "Satoshi ",
                    fontWeight: "700",
                    wordWrap: "break-word",
                  }}
                >
                  {cardDetails?.status}
                </div>
              </div>
              <h1
                className="desktop:text-[4.5rem] max-desktop:text-[3.37rem] max-tablet:text-[2rem] font-bold"
                style={{ fontFamily: "satoshi" }}
              >
                {cardDetails?.fund_raised}
              </h1>
              <p
                className="m-3 desktop:text-[36px] max-desktop:text-[1.75rem] max-tablet:text-[1.12rem]"
                style={{
                  width: "100%",
                  textAlign: "center",
                  color: "#8E95A2",

                  fontFamily: "Satoshi ",
                  fontWeight: "500",
                }}
              >
                funded of ₹ {cardDetails?.goal_amount}
              </p>
              <div className="desktop:mb-5 max-desktop:mb-5 w-full h-[30px] max-desktop:w-full max-tablet:h-[11px] max-tablet:mb-[15px]">
                {/* <LinearWithValueLabel className='!h-9' height={'30px'} value={30} /> */}
                <LinearProgress
                  style={{ backgroundColor: "#EDEEF1" }}
                  variant="determinate"
                  sx={{
                    height: "100%",
                    borderRadius: "16px",
                    background: `linear-gradient(to right, #0DC7B1, #0DC7B1 ${
                      (fundRaised / goalAmount) * 100
                    }%, #e0e0e0 ${(fundRaised / goalAmount) * 100}%)`,
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: "#0DC7B1 !important",
                    },
                  }}
                  value={
                    (cardDetails?.fund_raised / cardDetails?.goal_amount) * 100
                  }
                />
              </div>
              <div className="flex">
                <img
                  className="w-[32px] h-[32px] mr-[18px] max-tablet:w-[20%]"
                  src={images.SealCheck}
                  alt=""
                />
                <h1
                  className="text-3xl w-[80%] flex justify-items-start  pb-2  "
                  style={{
                    fontFamily: "satoshi",
                    fontWeight: 700,
                    background:
                      "linear-gradient(to right, #FF9F0A 0%, #FF375F 62.9%)",
                    "-webkit-background-clip": "text",
                    "-webkit-text-fill-color": "transparent",
                  }}
                >
                  <p className="text-2xl max-tablet:text-[1.1rem] font-bold">
                    Zakah Eligible !
                  </p>
                </h1>
              </div>
              <div className="flex gap-x-[12px] mt-[46px]">
                <Avatar
                  className="desktop:w-[96px] desktop:h-[96px] max-desktop:w-[70px]"
                  alt="Remy Sharp"
                  src="/static/images/avatar/1.jpg"
                  sx={{ width: "32px", height: "32px" }}
                />
                <span className="font-[satoshi] font-medium text-[1.25rem] text-[#8E95A2]">
                  {cardDetails?.user}
                </span>
              </div>
              <div className="mt-[40px] font-bold font-[satoshi] text-[1.87rem] text-[#383A42]">
                {cardDetails?.title}
              </div>
              <div className="flex flex-wrap justify-center gap-[20px] mt-[50px]">
                <div className="flex">
                  <img
                    alt="icons"
                    className=" w-[28px] h-[26px] mr-[10px]"
                    src={icons?.UsersThree}
                  />
                  <p className="text-[#6B7280] text-[1.25rem]">
                    {cardDetails?.donor_count}
                  </p>
                </div>
                <div className="flex">
                  <img
                    alt="icons"
                    className="w-[24px] h-[27px] mr-[10px]"
                    src={icons?.Clock}
                  />

                  <p className="text-[#6B7280] text-[1.25rem]">
                    {cardDetails?.days_left} days left
                  </p>
                </div>
                <div className="flex">
                  <img
                    alt="icons"
                    className="  w-[20px] h-[36px] mr-[10px]"
                    src={images?.MapPin2}
                  />
                  <p className="text-[#6B7280] text-[1.25rem]">
                    {cardDetails?.location}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Index;
