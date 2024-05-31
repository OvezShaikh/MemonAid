import { Form, Formik } from "formik";
import React, { useState } from "react";
import InputField from "../../../inputs/InputAdminField/Index";
import SelectField from "../../../inputs/AdminSelectField/Index";
import moment from "moment";
import "../../../../pages/Campaigns/CreateCampaigns/CreateCampaigns.css";
import { FormLabel } from "@mui/material";
import images from "../../../../constants/images";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetAll } from "../../../../Hooks";
import Attachments from "../../../layout/Attachments/Index";

const styleLabel = {
  fontFamily: "satoshi",
  fontSize: "1rem",
  fontWeight: 700,
  color: "#383A42",
  marginTop: "4px",
  paddingLeft: "5px",
};

function Index() {
  const [data, setData] = useState({});

  let { state } = useLocation();

  let { id } = state;

  const navigate = useNavigate();

  useGetAll({
    key: `/user-dashboard/edit-bankkyc/${id}`,
    enabled: true,
    select: (data) => {
      return data.data.data;
    },
    onSuccess: (data) => {
      setData(data);
    },
  });

  const initial_values = {
    id: data?.id || "",
    account_holder_name: data?.account_holder_name || "",
    account_number: data?.account_number || "",
    bank_name: data?.bank_name || "",
    branch_name: data?.branch_name || "",
    ifsc_code: data?.ifsc_code || "",
    pan_card: data?.pan_card || "",
    adhar_card: data?.adhar_card || "",
    other_details: data?.other_details || "",
    status: data?.status || false,
    updated_on: data?.updated_on || "",
  };

  return (
    <Formik enableReinitialize={true} initialValues={initial_values}>
      {({ values }) => (
        <Form className="flex flex-col items-center gap-[30px] max-desktop:pt-4 max-tablet:4">
          <div className="flex  w-full max-desktop:flex-col max-tablet:flex-col gap-3">
            <div className="flex justify-between w-[50%]     max-desktop:w-full max-tablet:flex-col max-tablet:gap-3">
              <div className="w-[49%] max-tablet:w-full">
                <InputField
                  name={"id"}
                  label={"ID:"}
                  disabled={"true"}
                  values={values?.id}
                  placeholder={"Placeholder Text"}
                />
              </div>
              <div className="w-[49%] max-tablet:w-full">
                <SelectField
                  name={"Donation"}
                  disable
                  label={"Raised for others:"}
                  placeholder={"Placeholder Text"}
                />
              </div>
            </div>
            <div className="flex justify-between w-[50%] max-desktop:w-full max-tablet:flex-col max-tablet:gap-3">
              <div className="w-[49%] max-tablet:w-full">
                <InputField
                  name={"account_holder_name"}
                  disabled={"true"}
                  label={"Beneficiary Name:"}
                  value={values?.account_holder_name}
                  placeholder={"Placeholder Text"}
                />
              </div>
              <div className="w-[49%] max-tablet:w-full">
                <InputField
                  name={"account_number"}
                  disabled={"true"}
                  label={"Account No.:"}
                  value={values?.account_number}
                  placeholder={"Placeholder Text"}
                />
              </div>
            </div>
          </div>
          <div className="flex max-desktop:flex-col max-tablet:flex-col  w-full gap-3">
            <div className="flex justify-between w-[50%] max-desktop:w-full max-tablet:flex-col max-tablet:gap-3">
              <div className="w-[49%] max-tablet:w-full">
                <InputField
                  name={"bank_name"}
                  disabled={"true"}
                  label={"Bank Name:"}
                  value={values?.bank_name}
                  placeholder={"Placeholder Text"}
                />
              </div>
              <div className="w-[49%] max-tablet:w-full">
                <InputField
                  name={"branch_name"}
                  disabled={"true"}
                  label={"Branch Name:"}
                  value={values?.branch_name}
                  placeholder={"Placeholder Text"}
                />
              </div>
            </div>
            <div className="flex justify-between w-[50%] max-desktop:w-full max-tablet:flex-col max-tablet:gap-3">
              <div className="w-[49%] max-tablet:w-full">
                <InputField
                  name={"ifsc_code"}
                  disabled={"true"}
                  label={"IFSC:"}
                  value={values?.ifsc_code}
                  placeholder={"Placeholder Text"}
                />
              </div>
              <div className="w-[49%] max-tablet:w-full">
                <InputField
                  name={"pan_card"}
                  disabled={"true"}
                  label={"PAN Card:"}
                  value={values?.pan_card}
                  placeholder={"Placeholder Text"}
                />
              </div>
            </div>
          </div>

          <div className="flex max-desktop:flex-col max-tablet:flex-col w-full gap-3">
            <div className="flex justify-between w-[50%] max-desktop:w-full max-tablet:flex-col max-tablet:gap-3">
              <div className="w-[49%] max-tablet:w-full">
                <InputField
                  name={"adhar_card"}
                  disabled={"true"}
                  label={"Aadhar Card:"}
                  value={values?.adhar_card}
                  placeholder={"Placeholder Text"}
                />
              </div>
              <div className="w-[49%] max-tablet:w-full">
                <InputField
                  name={"other_details"}
                  disabled={"true"}
                  label={"Other Details"}
                  value={values?.other_details}
                  placeholder={"Placeholder Text"}
                />
              </div>
            </div>
            <div className="flex  justify-between w-[50%] max-desktop:w-full max-tablet:flex-col max-tablet:gap-3">
              <div className="w-[49%] max-tablet:w-full">
                <SelectField
                  name={"status"}
                  disable
                  label={"Status:"}
                  value={values?.status}
                  placeholder={"Placeholder Text"}
                />
              </div>
              <div className="w-[49%] max-tablet:w-full">
                <InputField
                  value={values?.updated_on}
                  type={"date"}
                  disabled={"true"}
                  name={"updated_on"}
                  label="Approval Date:"
                />
              </div>
            </div>
          </div>
          <div className="w-full">
            <FormLabel
              sx={{
                fontSize: "1.2rem",
                fontFamily: "satoshi",
                fontWeight: 700,
                color: "#383A42",
                paddingLeft: "8px",
              }}
            >
              Documents:
            </FormLabel>
            <div className="flex gap-4 pt-2 max-tablet:flex-col ">
              <div className="flex flex-col gap-2">
                <Attachments imageUrl={{}} />
                <FormLabel
                  sx={{
                    fontSize: "1.2rem",
                    fontFamily: "satoshi",
                    fontWeight: 700,
                    color: "#383A42",
                    paddingLeft: "8px",
                  }}
                >
                  PAN Card
                </FormLabel>
              </div>
              <div className="flex flex-col gap-2">
                <Attachments imageUrl={{}} />
                <FormLabel
                  sx={{
                    fontSize: "1.2rem",
                    fontFamily: "satoshi",
                    fontWeight: 700,
                    color: "#383A42",
                    paddingLeft: "8px",
                  }}
                >
                  Adhar Card
                </FormLabel>
              </div>
              <div className="flex flex-col gap-2">
                <Attachments imageUrl={{}} />
                <FormLabel
                  sx={{
                    fontSize: "1.2rem",
                    fontFamily: "satoshi",
                    fontWeight: 700,
                    color: "#383A42",
                    paddingLeft: "8px",
                  }}
                >
                  Passbook
                </FormLabel>
              </div>
            </div>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="w-[69px] h-[32px] bg-[#F7F7F7]"
          >
            <h1 className="text-[#000000] font-medium text-[0.9rem] font-[satoshi]">
              Go Back
            </h1>
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default Index;
