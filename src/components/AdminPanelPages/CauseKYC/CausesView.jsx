import React, { useState } from "react";
import InputField from "../../inputs/InputAdminField/Index";
import { Form, Formik } from "formik";
import { FormLabel } from "@mui/material";
import UploadField from "../../inputs/AdminUploadField/Index";
import SelectField from "../../inputs/AdminSelectField/Index";
import PrimaryButton from "../../inputs/PrimaryButton";
import { useCreateOrUpdate, useGetAll } from "../../../Hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import RadioGroup from "../../inputs/radioGroupAdminPanel/index";

const InputCampaign = {
  borderRadius: "4px",
  background: "#D8DBDF",
  padding: "10px",
  border: "1px solid #e2e2e2",
  "&:focus-within": {
    boxShadow: `0px 4px 10px 0px rgba(0, 0, 0, 0.15);`,
    borderColor: "black",
  },
  "& .MuiInputBase-input": {
    borderRadius: "3px",
    background: "#D8DBDF !important",
    position: "relative",
    fontSize: "1rem",
    color: "yellow !important",
    width: "100%",
  },
};
function CausesView() {
  let { state } = useLocation();
  let { id } = state;
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const [adhaar_image, setAdhaar_image] = useState("");
  const [pan_image, setPan_image] = useState("");
  const [passbook_image, setPassbook_image] = useState("");

  const initial_values = {
    account_holder_name: data?.bank_kyc?.account_holder_name || "",
    account_number: data?.bank_kyc?.account_number || "",
    bank_data: data?.bank_kyc?.bank_data || "",
    bank_name: data?.bank_kyc?.bank_name || "",
    branch_name: data?.bank_kyc?.branch_name || "",
    title: data?.bank_kyc?.title || "",
    ifsc_code: data?.bank_kyc?.ifsc_code || "",
    status: data?.bank_kyc?.status || "",
    pan_card: data?.bank_kyc?.pan_card || "",
    adhar_card: data?.bank_kyc?.adhar_card || "",
    other: data?.bank_kyc?.other || "",
    rasing_for: data?.bank_kyc?.rasing_for || "",
    adhar_card_image: data?.adhar_card_image || "",
    pan_card_image: data?.pan_card_image || "",
    passbook_image: data?.passbook_image || "",
  };

  useGetAll({
    key: `/admin-dashboard/campaign-kyc/${id}`,
    enabled: true,
    select: (data) => {
      return data.data.data;
    },
    onSuccess: (data) => {
      setData(data);
      const Adhaar = `${process.env.REACT_APP_BASE_URL}${data?.bank_kyc?.adhar_card_image}`;
      setAdhaar_image(Adhaar);
      const Pan = `${process.env.REACT_APP_BASE_URL}${data?.bank_kyc?.pan_card_image}`;
      setPan_image(Pan);
      const Passbook = `${process.env.REACT_APP_BASE_URL}${data?.bank_kyc?.passbook_image}`;
      setPassbook_image(Passbook);
    },
  });

  const { mutate } = useCreateOrUpdate({
    url: `/admin-dashboard/campaign-kyc/${id}`,
    method: "put",
  });

  const handleSubmit = (values) => {
    const formData = new FormData();
    formData.append("account_holder_name", values?.account_holder_name);
    formData.append("account_number", values?.account_number);
    formData.append("bank_name", values?.bank_name);
    formData.append("branch_name", values?.branch_name);
    formData.append("title", values?.title);
    formData.append("ifsc_code", values?.ifsc_code);
    formData.append("status", values?.status?.value);
    formData.append("pan_card", values?.pan_card);
    formData.append("adhar_card", values?.adhar_card);
    formData.append("other", values?.other);
    formData.append("rasing_for", values?.rasing_for);
    if (values?.adhar_card_image instanceof File) {
      formData.append("adhar_card_image", values?.adhar_card_image);
    }
    if (values?.pan_card_image instanceof File) {
      formData.append("pan_card_image", values?.pan_card_image);
    }
    if (values?.passbook_image instanceof File) {
      formData.append("passbook_image", values?.passbook_image);
    }
    formData.append("approve_kyc ", true);

    mutate(
      formData,
      {
        onSuccess: (response) => {
          toast.success(response?.data?.message, {
            position: "top-right",
          });
          navigate(-1);
        },
      },
      {
        onerror: (response) => {
          toast.error(response?.data?.message, {
            position: "top-right",
          });
        },
      }
    );
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initial_values}
      onSubmit={(values) => handleSubmit(values)}
    >
      {({ values, handleChange, setFieldValue }) => (
        <Form>
          <div className="p-4 w-[100%] ">
            <div className="flex flex-col gap-2  w-[70%] max-desktop:w-full max-tablet:w-[100%]">
              <div className="flex flex-col gap-2">
                <div className="w-full">
                  <InputField
                    sx={InputCampaign}
                    disabled={true}
                    label={"Title of Campaign:"}
                    name={"title"}
                    value={values?.title}
                    onChange={handleChange}
                  />
                </div>
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
                    name={"pan_number"}
                    value={values?.pan_card}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full">
                  <InputField
                    label={"Adhar Number:"}
                    name={"adhaar_num"}
                    value={values?.adhar_card}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full">
                  <InputField
                    label={"Other Details (Optional)::"}
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
                      <a href={adhaar_image}>
                        <img
                          alt=""
                          src={adhaar_image}
                          style={{ width: "218px", height: "100px" }}
                        />
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
                      </a>
                    </div>
                    <div className="flex flex-col gap-2">
                      <a href={pan_image}>
                        <img
                          alt=""
                          src={pan_image}
                          style={{ width: "218px", height: "100px" }}
                        />
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
                      </a>
                    </div>
                    <div className="flex flex-col gap-2">
                      <a href={passbook_image}>
                        <img
                          alt=""
                          src={passbook_image}
                          style={{ width: "218px", height: "100px" }}
                        />
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
                      </a>
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <UploadField
                    label="Upload PAN Card Copy:"
                    name={"adhar_card_image"}
                    multiple={false}
                    value={values?.adhar_card_image}
                  />
                </div>
                <div className="w-full">
                  <UploadField
                    label="Upload Aadhar Card Copy:"
                    name={"pan_card_image"}
                    multiple={false}
                    value={values?.pan_card_image}
                  />
                </div>
                <div className="w-full">
                  <UploadField
                    label="Upload Passbook Copy:"
                    name={"passbook_image"}
                    multiple={false}
                    value={values?.passbook_image}
                  />
                </div>
                <div className="w-full">
                  <SelectField
                    label={"Status"}
                    value={values?.status}
                    name={"status"}
                    type="radio"
                    options={[
                      { label: "Approved", value: "Approved" },
                      { label: "Pending", value: "Pending" },
                    ]}
                  />
                </div>
                <RadioGroup
                  onChange={(e) => {
                    setFieldValue("rasing_for", e.target.value);
                  }}
                  name={"rasing_for"}
                  required={true}
                  value={values?.rasing_for}
                  options={[
                    { label: "Self", value: "Self" },
                    { label: "Family/Friends", value: "Family" },
                    { label: "Charity", value: "Charity" },
                  ]}
                  label="Raising this Campaign for:"
                />
                <div className="flex flex-row gap-4 mt-12">
                  <button
                    type="button"
                    className="w-[69px] h-[32px] bg-[#F7F7F7]"
                  >
                    <h1
                      onClick={() => navigate(-1)}
                      className="text-[#000000] font-medium text-[14px] font-[satoshi]"
                    >
                      Cancel
                    </h1>
                  </button>
                  <PrimaryButton type="submit">
                    <h1 className="text-white font-semibold font-[satoshi]">
                      Save
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
