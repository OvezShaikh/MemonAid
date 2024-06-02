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
    key: `/user-dashboard/donations/${id}`,
    enabled: true,
    select: (data) => {
      return data.data.rows[0];
    },
    onSuccess: (data) => {
      setData(data);
    },
  });

  const initial_values = {
    campaign: data?.campaign || "",
    transaction_id: data?.transaction_id || "",
    pancard: data?.pancard || "",
    amount: data?.amount || "",
    payment_type: data?.payment_type || "",
    comment: data?.comment || "",
    updated_on: data?.updated_on || "",
    is_anonymous: data?.is_anonymous || "",
    full_name: data?.full_name || "",
  };

  return (
    <Formik enableReinitialize={true} initialValues={initial_values}>
      {({ values }) => (
        <Form className="flex flex-col items-center gap-[30px] max-desktop:pt-4 max-tablet:4 pt-3">
          <div className="flex max-desktop:flex-col max-tablet:flex-col w-full gap-3">
            <div className="flex justify-between w-[50%] max-desktop:w-full max-tablet:flex-col ">
              <div className="w-[49%] max-tablet:w-full">
                <FormLabel sx={styleLabel}>Campaign:</FormLabel>
                <div className="flex">
                  <h1 className="text-[1rem] font-[satoshi] pt-3  font-medium max-tablet:pl-2 max-tablet:pb-2">
                    {values?.campaign}
                  </h1>
                  <a href={`/campaign-details/${data?.campaign}`} target="_blank">
                    <img
                      className="pt-3 pl-2"
                      src={images.CausesDetails}
                      alt=""
                    />
                  </a>
                </div>
              </div>
              <div className="w-[49%] max-tablet:w-full">
                <InputField
                  disable={true}
                  name={"transaction_id"}
                  value={values?.transaction_id}
                  label={"ID:"}
                  placeholder={"Placeholder Text"}
                />
              </div>
            </div>
            <div className="flex justify-between w-[50%] max-desktop:w-full max-tablet:flex-col max-tablet:gap-3">
              <div className="w-[49%] max-tablet:w-full">
                <InputField
                  disable={true}
                  name={"full_name"}
                  value={values?.full_name}
                  label={"Full Name:"}
                  placeholder={"Placeholder Text"}
                />
              </div>
              <div className="w-[49%] max-tablet:w-full">
                <InputField
                  disable={true}
                  name={"pancard"}
                  label={"Pan Card:"}
                  value={values?.pancard}
                  placeholder={"Placeholder Text"}
                />
              </div>
            </div>
          </div>

          <div className="flex max-desktop:flex-col max-tablet:flex-col w-full gap-3">
            <div className="flex justify-between w-[50%] max-desktop:w-full max-tablet:flex-col max-tablet:gap-3">
              <div className="w-[49%] max-tablet:w-full">
                <InputField
                  disable={true}
                  name={"amount"}
                  value={values?.amount}
                  label={"Donation:"}
                  placeholder={"Placeholder Text"}
                />
              </div>
              <div className="w-[49%] max-tablet:w-full">
                <InputField
                  disable={true}
                  name={"payment_type"}
                  value={values?.payment_type}
                  label={"Payment Gateway:"}
                  placeholder={"Placeholder Text"}
                />
              </div>
            </div>
            <div className="flex  justify-between w-[50%] max-desktop:w-full max-tablet:flex-col max-tablet:gap-3">
              <div className="w-[49%] max-tablet:w-full">
                <InputField
                  disable={true}
                  name={"comment"}
                  label={"Comments:"}
                  value={values?.comment}
                  placeholder={"Placeholder Text"}
                />
              </div>
              <div className="w-[49%] max-tablet:w-full">
                <InputField
                  disable={true}
                  type="date"
                  // defaultValue={yesterday}
                  value={values?.updated_on}
                  name="updated_on"
                  inputProps={{ min: moment().format("YYYY-MM-DD") }}
                  required={true}
                  label="Date:"
                />
              </div>
            </div>
          </div>
          <div className="flex w-full max-desktop:w-full max-tablet:flex-col  gap-3">
            <div className="w-[25%] max-desktop:w-1/2 max-tablet:w-full">
              <SelectField
                name={"is_anonymous"}
                disable={true}
                label={"Anonymous:"}
                value={values?.updated_on ? "Yes" : "NO"}
                placeholder={"Placeholder Text"}
              />
            </div>
            <div className="w-[25%] max-desktop:w-1/2 max-tablet:w-full">
              <InputField
                disable={true}
                name={"PreferredDonation"}
                label={"Reward:"}
                placeholder={"Placeholder Text"}
              />
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
