import { Form, Formik } from "formik";
import React, { useState } from "react";
import InputField from "../../inputs/InputAdminField/Index";
import SelectField from "../../inputs/AdminSelectField/Index";
import moment from "moment";
import "../../../pages/Campaigns/CreateCampaigns/CreateCampaigns.css";
import { FormLabel } from "@mui/material";
import images from "../../../constants/images";
import { useLocation, useNavigate } from "react-router-dom";
import { useCreateOrUpdate, useGetAll } from "../../../Hooks";
import PrimaryButton from "../../inputs/PrimaryButton";
import { toast } from "react-toastify";

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
  const [Donation, setDonation] = useState(false);

  useGetAll({
    key: `/admin-dashboard/donors/${id}`,
    enabled: true,
    select: (data) => {
      return data?.data?.data;
    },
    onSuccess: (data) => {
      setData(data);
    },
  });

  const initial_values = {
    campaign: data?.campaign || "",
    transaction_id: data?.transaction_id || "",
    full_name: data?.full_name || "",
    email: data?.email || "",
    id: data?.id || "",
    amount: data?.amount || "",
    city: data?.city || "",
    country: data?.country || "",
    pancard: data?.pancard || "",
    donation_type: data?.donation_type || "",
    payment_type: data?.payment_type || "",
    bank_name: data?.bank_name || "",
    other_details: data?.other_details || "",
    comment: data?.comment || "",
    transaction_date: data?.transaction_date || "",
    created_on: data?.created_on || "",
    updated_on: data?.updated_on || "",
  };

  const { mutate } = useCreateOrUpdate({
    url: `/admin-dashboard/donors/${id}`,
    method: "put",
  });

  const handleSubmit = (values) => {
    const formData = new FormData();
    formData.append("campaign", values?.campaign);
    formData.append("transaction_id", values?.transaction_id);
    formData.append("full_name", values?.full_name);
    formData.append("email", values?.email);
    formData.append("id", values?.id);
    formData.append("amount", values?.amount);
    formData.append("city", values?.city);
    formData.append("country", values?.country);
    formData.append("pancard", values?.pancard);
    formData.append("donation_type", values?.donation_type);
    formData.append("payment_type", values?.payment_type);
    formData.append("bank_name", values?.bank_name);
    formData.append("other_details", values?.other_details);
    formData.append("comment", values?.comment);
    formData.append("transaction_date", values?.transaction_date);
    formData.append("created_on", values?.created_on);
    formData.append("updated_on", values?.updated_on);
    {
      Donation === true && formData.append("status", "Approved");
    }
    {
      Donation === false && formData.append("status", "Rejected");
    }

    mutate(formData, {
      onSuccess: (response) => {
        {
          Donation
            ? toast.success("Marked as paid", {
              position: "top-right",
            })
            : toast.error("Marked as Rejected", {
              position: "top-right",
            });
        }

        navigate(-1);
      },
      onError: (response) => {
        toast.error("Ran Into An Error", {
          position: "top-right",
        });
      },
    });
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initial_values}
      onSubmit={(values) => handleSubmit(values)}
    >
      {({ values }) => (
        <Form className="flex flex-col items-center gap-[30px] max-desktop:pt-4 max-tablet:4">
          <div className="flex max-desktop:flex-col max-tablet:flex-col w-full gap-3">
            <div className="flex justify-between w-[50%] max-desktop:w-full max-tablet:flex-col ">
              <div className="w-[49%] max-tablet:w-full">
                <FormLabel sx={styleLabel}>Campaign:</FormLabel>
                <div className="flex  ">
                  <h1 className="text-[16px] font-[satoshi] pt-3   font-medium max-tablet:pl-2 max-tablet:pb-2">
                    {data?.campaign}
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
                  name={"transaction_id"}
                  value={values?.transaction_id}
                  disable={true}
                  label={"Transaction ID:"}
                  placeholder={"Placeholder Text"}
                />
              </div>
            </div>
            <div className="flex justify-between w-[50%] max-desktop:w-full max-tablet:flex-col max-tablet:gap-3">
              <div className="w-[49%] max-tablet:w-full">
                <InputField
                  name={"full_name"}
                  value={values?.full_name}
                  disable={true}
                  label={"Full Name:"}
                  placeholder={"Placeholder Text"}
                />
              </div>
              <div className="w-[49%] max-tablet:w-full">
                <InputField
                  name={"email"}
                  value={values?.email}
                  disable={true}
                  label={"Email:"}
                  placeholder={"Placeholder Text"}
                />
              </div>
            </div>
          </div>
          <div className="flex  w-full max-desktop:flex-col max-tablet:flex-col gap-3">
            <div className="flex justify-between w-[50%]     max-desktop:w-full max-tablet:flex-col max-tablet:gap-3">
              <div className="w-[49%] max-tablet:w-full">
                <InputField
                  name={"id"}
                  value={values?.id}
                  disable={true}
                  label={"ID:"}
                  placeholder={"Placeholder Text"}
                />
              </div>
              <div className="w-[49%] max-tablet:w-full">
                <InputField
                  name={"amount"}
                  value={values?.amount}
                  disable={true}
                  label={"Donation:"}
                  placeholder={"Placeholder Text"}
                />
              </div>
            </div>
            <div className="flex justify-between w-[50%] max-desktop:w-full max-tablet:flex-col max-tablet:gap-3">
              <div className="w-[49%] max-tablet:w-full">
                <SelectField
                  name={"city"}
                  value={values?.city}
                  disable={true}
                  label={"City:"}
                  placeholder={"Placeholder Text"}
                />
              </div>
              <div className="w-[49%] max-tablet:w-full">
                <SelectField
                  name={"country"}
                  value={values?.country}
                  disable={true}
                  label={"Country:"}
                  placeholder={"Placeholder Text"}
                />
              </div>
            </div>
          </div>
          <div className="flex max-desktop:flex-col max-tablet:flex-col  w-full gap-3">
            <div className="flex justify-between w-[50%] max-desktop:w-full max-tablet:flex-col max-tablet:gap-3">
              <div className="w-[49%] max-tablet:w-full">
                <InputField
                  name={"PostalCode"}
                  disable={true}
                  label={"Postal Code:"}
                  placeholder={"Placeholder Text"}
                />
              </div>
              <div className="w-[49%] max-tablet:w-full">
                <InputField
                  name={"pancard"}
                  value={values?.pancard}
                  disable={true}
                  label={"PAN Card:"}
                  placeholder={"Placeholder Text"}
                />
              </div>
            </div>
            <div className="flex justify-between w-[50%] max-desktop:w-full max-tablet:flex-col max-tablet:gap-3">
              <div className="w-[49%] max-tablet:w-full">
                <InputField
                  name={"donation_type"}
                  value={values?.donation_type}
                  disable={true}
                  label={"Donation Type:"}
                  placeholder={"Placeholder Text"}
                />
              </div>
              <div className="w-[49%] max-tablet:w-full">
                <SelectField
                  name={"Payment Gateway:"}
                  disable={true}
                  label={"Payment Gateway:"}
                  placeholder={"Placeholder Text"}
                />
              </div>
            </div>
          </div>
          <div className="flex max-desktop:flex-col max-tablet:flex-col w-full gap-3">
            <div className="flex justify-between w-[50%] max-desktop:w-full max-tablet:flex-col max-tablet:gap-3">
              <div className="w-[49%] max-tablet:w-full">
                <InputField
                  name={"bank_name"}
                  value={values?.bank_name}
                  disable={true}
                  label={"Bank Name:"}
                  placeholder={"Placeholder Text"}
                />
              </div>
              <div className="w-[49%] max-tablet:w-full">
                <InputField
                  name={"other_details"}
                  value={values?.other_details}
                  disable={true}
                  label={"Other Details:"}
                  placeholder={"Placeholder Text"}
                />
              </div>
            </div>
            <div className="flex justify-between w-[50%] max-desktop:w-full max-tablet:flex-col max-tablet:gap-3">
              <div className="w-[49%] max-tablet:w-full">
                <SelectField
                  name={"comment"}
                  value={values?.comment}
                  disable={true}
                  label={"Comments:"}
                  placeholder={"Placeholder Text"}
                />
              </div>
              <div className="w-[49%] max-tablet:w-full">
                <SelectField
                  name={"anonymous"}
                  disable={true}
                  label={"Anonymous:"}
                  placeholder={"Placeholder Text"}
                />
              </div>
            </div>
          </div>

          <div className="flex max-desktop:flex-col max-tablet:flex-col w-full gap-3">
            <div className="flex justify-between w-[50%] max-desktop:w-full max-tablet:flex-col max-tablet:gap-3">
              <div className="w-[49%] max-tablet:w-full">
                <InputField
                  type="date"
                  value={values?.updated_on}
                  name="updated_on"
                  disable={true}
                  label="Transaction Date:"
                />
              </div>
              <div className="w-[49%] max-tablet:w-full">
                <InputField
                  name={"TransactionConfirmation"}
                  disable={true}
                  label={"Transfer Confirmation number:"}
                  placeholder={"Placeholder Text"}
                />
              </div>
            </div>
            <div className="flex  justify-between w-[50%] max-desktop:w-full max-tablet:flex-col max-tablet:gap-3">
              <div className="w-[49%] max-tablet:w-full">
                <InputField
                  name={"Reward"}
                  disable={true}
                  label={"Reward:"}
                  placeholder={"Placeholder Text"}
                />
              </div>
              <div className="w-[49%] max-tablet:w-full">
                <SelectField
                  name={"Preferred"}
                  label={"Preferred Donation City:"}
                  disable={true}
                  placeholder={"Placeholder Text"}
                />
              </div>
            </div>
          </div>
          <div className="flex w-full max-desktop:w-full max-tablet:flex-col  gap-3">
            <div className="w-[25%] max-desktop:w-1/2 max-tablet:w-full">
              <SelectField
                name={"PreferredDonation"}
                disable={true}
                label={"Preferred Donation State:"}
                placeholder={"Placeholder Text"}
              />
            </div>
          </div>
          <div className="flex flex-row gap-4 mt-12">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-[69px] h-[32px] bg-[#F7F7F7]"
            >
              <h1 className="text-[#000000] font-medium text-[14px] font-[satoshi]">
                Go Back
              </h1>
            </button>

            {data?.status === "Pending" && (
              <>
                <PrimaryButton
                  sx={{
                    height: "30px",
                    width: "120px",
                    background: "#219D80",
                    color: "white",
                    "& .MuiButton-root:hover": {
                      background: "yellow",
                    },
                  }}
                  type="submit"
                  onClick={() => setDonation(true)}
                >
                  Mark As Paid
                </PrimaryButton>
                <PrimaryButton type="submit">
                  <h1 className="text-white font-semibold font-[satoshi]">
                    Reject Request
                  </h1>
                </PrimaryButton>
              </>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default Index;
