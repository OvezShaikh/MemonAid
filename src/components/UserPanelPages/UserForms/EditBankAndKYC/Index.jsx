import React, { useState } from "react";
import InputField from "../../../inputs/InputAdminField/Index";
import { Form, Formik } from "formik";
import { FormLabel } from "@mui/material";
import UploadField from "../../../inputs/AdminUploadField/Index";
import PrimaryButton from "../../../inputs/PrimaryButton";
import Attachments from "../../../layout/Attachments/Index";
import { useCreateOrUpdate, useGetAll } from "../../../../Hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import RadioGroup from "../../../inputs/radioGroupAdminPanel/index";
import CheckBox from "../../../inputs/checkBox";
import { red } from "@mui/material/colors";
import * as Yup from "yup";

function CausesView() {
  let { state } = useLocation();
  let { id } = state;

  const [data, setData] = useState({});
  const [adhar_card_image, setAdhar_card_image] = useState("");
  const [pan_card_image, setPan_card_image] = useState("");
  const [passbook_image, setPassbook_image] = useState("");

  let navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    declaration: Yup.boolean().test(
      "consent",
      "You must give consent by checking the checkbox",
      (value) => value === true
    ),
  });

  const initial_values = {
    account_holder_name: data?.account_holder_name || "",
    account_number: data?.account_number || "",
    bank_data: data?.bank_data || "",
    bank_name: data?.bank_name || "",
    branch_name: data?.branch_name || "",
    title: data?.campaign?.title || "",
    ifsc_code: data?.ifsc_code || "",
    status: data?.status || false,
    pan_card: data?.pan_card || "",
    adhar_card: data?.adhar_card || "",
    tandc_accept: data?.tandc_accept || "",
    pan_card_image: pan_card_image || "",
    passbook_image: passbook_image || "",
    adhar_card_image: adhar_card_image || "",
    other: data?.other || "",
    rasing_for: data?.rasing_for || "",
  };

  useGetAll({
    key: `/user-dashboard/edit-bankkyc/${id}`,
    enabled: true,
    select: (data) => {
      return data.data.data;
    },
    onSuccess: (data) => {
      setData(data);
      const img1 = `${process.env.REACT_APP_BASE_URL}${data?.adhar_card_image}`;
      setAdhar_card_image(img1);
      const img2 = `${process.env.REACT_APP_BASE_URL}${data?.pan_card_image}`;
      setPan_card_image(img2);
      const img3 = `${process.env.REACT_APP_BASE_URL}${data?.passbook_image}`;
      setPassbook_image(img3);
    },
  });

  const { mutate } = useCreateOrUpdate({
    url: `/user-dashboard/edit-bankkyc/${id}`,
    method: "put",
  });

  const handleSubmit = (values) => {
    const changedValues = Object.keys(values).filter(
      (key) => values[key] !== initial_values[key]
    );

    const payload = {};
    changedValues.forEach((key) => {
      payload[key] = values[key];
    });

    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      formData.append(
        key,
        value instanceof File ? value : JSON.stringify(value)
      );
    });

    mutate(formData, {
      onSuccess: (response) => {
        toast.success(response?.data?.message, {
          position: "top-right",
        });
        navigate(-1);
      },
      onError: (error) => {
        console.error("There was a problem updating the data:", error);
        toast.error(error?.data?.message, {
          position: "top-right",
        });
      },
    });
  };

  return (
    <Formik
      enableReinitialize={true}
      // validationSchema={validationSchema}
      initialValues={initial_values}
      onSubmit={(values) => handleSubmit(values)}
    >
      {({ values, handleChange, setFieldValue }) => (
        <Form>
          <div className="p-4 w-[100%] ">
            <div className="flex flex-col gap-7  w-[70%] max-desktop:w-full max-tablet:w-[100%]">
              <div className="flex flex-col gap-2">
                <div className="w-full">
                  <InputField
                    label={"Aadhar Card:"}
                    name={"adhar_card"}
                    value={values?.adhar_card}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full">
                  <InputField
                    label={"Account Holder Name:"}
                    name={"account_holder_name"}
                    value={values?.account_holder_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full">
                  <InputField
                    label={"Beneficiary Bank Account Number::"}
                    name={"account_number"}
                    value={values?.account_number}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full">
                  <InputField
                    label={"Bank Name:"}
                    name={"bank_name"}
                    value={values?.bank_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full">
                  <InputField
                    label={"Branch Name:"}
                    name={"branch_name"}
                    value={values?.branch_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full">
                  <InputField
                    label={"IFSC Code:"}
                    name={"ifsc_code"}
                    value={values?.ifsc_code}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full">
                  <InputField
                    label={"Pan Card Number:"}
                    name={"pan_card"}
                    value={values?.pan_card}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full">
                  <InputField
                    label={"Adhar Number:"}
                    name={"adhar_card"}
                    value={values?.adhar_card}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full">
                  <InputField
                    label={"Other Details (Optional):"}
                    name={"other"}
                    value={values?.other}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full">
                  <FormLabel
                    sx={{
                      fontSize: "1rem",
                      fontFamily: "satoshi",
                      fontWeight: 700,
                      color: "#383A42",
                      paddingLeft: "8px",
                    }}
                  >
                    Documents:
                  </FormLabel>
                  <div className="flex gap-4 pt-2 max-tablet:flex-col">
                    <div className="flex flex-col gap-2">
                      <Attachments imageUrl={values?.passbook_image} />
                      <FormLabel
                        sx={{
                          fontSize: "1rem",
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
                      <Attachments imageUrl={values?.adhar_card_image} />
                      <FormLabel
                        sx={{
                          fontSize: "1rem",
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
                      <Attachments imageUrl={values?.pan_card_image} />
                      <FormLabel
                        sx={{
                          fontSize: "1rem",
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
                <div className="w-full">
                  <UploadField
                    label="Upload PAN Card Copy:"
                    multiple={false}
                    name={"pan_card_image"}
                  />
                </div>
                <div className="w-full">
                  <UploadField
                    label="Upload Aadhar Card Copy:"
                    multiple={false}
                    name={"adhar_card_image"}
                  />
                </div>
                <div className="w-full">
                  <UploadField
                    label="Upload Passbook Copy:"
                    multiple={false}
                    name={"passbook_image"}
                  />
                </div>
                <RadioGroup
                  onChange={(value) => {
                    setFieldValue("rasing_for", value);
                  }}
                  name="rasing_for"
                  value={values?.rasing_for}
                  required={true}
                  options={[
                    { label: "Self", value: "Self" },
                    { label: "Family/Friends", value: "Family" },
                    { label: "Charity", value: "Charity" },
                  ]}
                  label="Raising this Campaign for:"
                />
                <CheckBox
                  sx={{
                    paddingLeft: "16px !important",
                    "&.Mui-checked": {
                      color: red[500],
                    },
                  }}
                  style={{ fontSize: "0.9rem !important" }}
                  name="tandc_accept"
                  checked={values?.tandc_accept}
                  label={
                    "I give my consent by sharing my Aadhar details with the team for verification"
                  }
                />
                <div className="flex flex-row gap-4 mt-12">
                  <button
                    onClick={() => navigate(-1)}
                    className="w-[69px] h-[32px] bg-[#F7F7F7]"
                  >
                    <h1 className="text-[#000000] font-medium text-[0.9rem] font-[satoshi]">
                      Go Back
                    </h1>
                  </button>
                  <PrimaryButton type="submit">
                    <h1 className="text-white font-semibold font-[satoshi]">
                      Save Edit
                    </h1>
                  </PrimaryButton>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default CausesView;
