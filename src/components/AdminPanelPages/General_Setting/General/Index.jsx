import React, { useState } from "react";
import FormLabel from "@mui/joy/FormLabel";
import InputAdminField from "../../../inputs/InputAdminField/Index";
import RadioGroup from "../../../inputs/radioGroupAdminPanel/index";
import PrimaryButton from "../../../inputs/PrimaryButton";
import ReactQuilTextField from "../../../inputs/ReactQuilTextField/Index.jsx";
import { Form, Formik } from "formik";
import { useCreateOrUpdate } from "../../../../Hooks/useCreateOrUpdate.js";
import { toast } from "react-toastify";
import MultiKeyTextField from "../../../inputs/MultiAddTags/Index.jsx";
import { useGetAll } from "../../../../Hooks/useGetAll.js";
import CustomChipsArray from "../../../inputs/MultiAddTags/Index.jsx";

const styleLabel = {
  fontFamily: "satoshi",
  fontSize: "1rem",
  paddingBottom: "5px",
  paddingLeft: "5px",
  fontWeight: 700,
  color: "#404040",
};
const styleInput = {
  color: "#B6BAC3",
  fontSize: "1rem",
  fontFamily: "Satoshi ",
  fontWeight: "500",
};

function General() {
  const [Details, setDetails] = useState({});
  const [Chips, setChips] = useState([]);

  const { data } = useGetAll({
    key: `/admin-dashboard/gs`,
    enabled: true,
    select: (data) => {
      return data.data.rows[0];
    },
    onSuccess: (data) => {
      setDetails(data);
      setChips(data?.keywords);
    },
  });

  const { mutate } = useCreateOrUpdate({
    url: `/admin-dashboard/gs`,
  });

  const initialValues = {
    namesite: Details?.namesite || "",
    welcome_subtitle: Details?.welcome_subtitle || "",
    welcome_text: Details?.welcome_text || "",
    description: Details?.description || "",
    email_admin: Details?.email_admin || "",
    tandc_url: Details?.tandc_url || "",
    email_no_reply: Details?.email_no_reply || "",
    keywords: Chips || [],
    privacy_policy_url: Details?.privacy_policy_url || "",
    date_time: Details?.date_time || "",
    new_registration_enabled: Details?.new_registration_enabled || false,
    auto_approve_enabled: Details?.auto_approve_enabled || false,
    email_verification_enabled: Details?.email_verification_enabled || false,
    facebook_login_enabled: Details?.facebook_login_enabled || false,
    google_login_enabled: Details?.google_login_enabled || false,
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      onSubmit={(values) => {
        mutate(values, {
          onSuccess: () => {
            toast.success("Prefernces Saved Successfully !", {
              position: "top-center",
            });
          },
          onError: () => {
            toast.error("Could Not Save Preferences !", {
              position: "top-center",
            });
          },
        });
      }}
    >
      {({ values, setFieldValue, handleChange }) => (
        <Form>
          <div className="flex flex-wrap justify-between max-desktop:flex-col max-tablet:flex-col  max-desktop:pt-4 max-tablet:pt-4">
            <div className="w-[24%] max-desktop:w-full max-tablet:w-full">
              <InputAdminField
                label={"Name Site"}
                onChange={handleChange}
                name={"namesite"}
                placeholder={"Placeholder Text"}
                value={values?.namesite}
              />
            </div>
            <div className="w-[24%] max-desktop:w-full max-tablet:w-full">
              <InputAdminField
                label={"Welcome Subtitle "}
                onChange={handleChange}
                name={"welcome_subtitle"}
                placeholder={"Placeholder Text"}
                value={values?.welcome_subtitle}
              />
            </div>
            <div className="w-[24%] max-desktop:w-full max-tablet:w-full">
              <InputAdminField
                label={"Welcome Text"}
                name={"welcome_text"}
                onChange={handleChange}
                placeholder={"Placeholder Text"}
                value={values?.welcome_text}
              />
            </div>
            <div className="w-[24%] max-desktop:w-full max-tablet:w-full">
              <InputAdminField
                label={"Email No-reply"}
                name={"email_no_reply"}
                onChange={handleChange}
                placeholder={"Placeholder Text"}
                value={values?.email_no_reply}
              />
            </div>
          </div>
          <div className="w-[49%] max-desktop:w-full max-tablet:w-full pt-2">
            <CustomChipsArray
              name="keywords"
              label="Keywords"
              sx={styleLabel}
              placeholder="Add Tags"
            />
          </div>
          <div className="pt-7 mb-5 h-[200px]">
            <FormLabel style={styleLabel}>Description</FormLabel>
            <ReactQuilTextField
              theme={"snow"}
              name={"description"}
              value={values?.description}
              placeholder="Summarize in 100 words max."
              style={{ "& .ql-editor": { minHeight: "50px" } }}
              onChange={(value) => setFieldValue("description", value)}
            />
          </div>
          <div className="flex gap-4 pt-8  max-desktop:flex-col max-tablet:flex-col  max-desktop:pt-2 max-tablet:pt-12">
            <div className="w-[25%] max-desktop:w-full max-tablet:w-full">
              <InputAdminField
                label={"Email Admin"}
                onChange={handleChange}
                name={"email_admin"}
                placeholder={"Placeholder Text"}
                value={values?.email_admin}
              />
            </div>
            <div className="w-[25%] max-desktop:w-full max-tablet:w-full">
              <InputAdminField
                label={"Link to terms and conditions"}
                onChange={handleChange}
                name={"tandc_url"}
                placeholder={"Placeholder Text"}
                value={values?.tandc_url}
              />
            </div>
            <div className="w-[25%] max-desktop:w-full max-tablet:w-full">
              <InputAdminField
                label={"Link to privacy policy"}
                name={"privacy_policy_url"}
                onChange={handleChange}
                placeholder={"Placeholder Text"}
                value={values?.privacy_policy_url}
              />
            </div>
            <div className="w-[25%] max-desktop:w-full max-tablet:w-full">
              <InputAdminField
                label={"Date Format"}
                size="lg"
                type="date"
                name={"date_time"}
                value={values?.date_time}
                style={styleInput}
                onChange={handleChange}
                slotProps={{
                  input: {
                    min: "2000-01-01",
                    max: "2024-01-01",
                  },
                }}
              />
            </div>
          </div>
          <div className="flex gap-32 pt-8   max-desktop:gap-4 max-tablet:gap-4 max-desktop:flex max-tablet:flex-col">
            <div className="  lg:w-[25%] max-tablet:w-full max-desktop:w-full">
              <RadioGroup
                name={"new_registration_enabled"}
                value={values?.new_registration_enabled}
                onChange={(e) => {
                  setFieldValue("new_registration_enabled", e === "true");
                }}
                options={[
                  { label: "On", value: true },
                  { label: "Off", value: false },
                ]}
                label="New Registrations"
              />
            </div>
            <div className="lg:w-[25%] max-tablet:w-full max-desktop:w-full">
              <RadioGroup
                name={"auto_approve_enabled"}
                onChange={(e) => {
                  setFieldValue("auto_approve_enabled", e === "true");
                }}
                value={values?.auto_approve_enabled}
                options={[
                  { label: "On", value: true },
                  { label: "Off", value: false },
                ]}
                label="Auto Approve Causes"
              />
            </div>
            <div className=" lg:w-[25%] max-tablet:w-full max-desktop:w-full">
              <RadioGroup
                name={"facebook_login_enabled"}
                value={values?.facebook_login_enabled}
                onChange={(e) => {
                  setFieldValue("facebook_login_enabled", e === "true");
                }}
                options={[
                  { label: "On", value: true },
                  { label: "Off", value: false },
                ]}
                label="Facebook Login"
              />
            </div>
          </div>
          <div className="flex gap-32 pt-7  max-desktop:gap-4 max-tablet:gap-4 max-desktop:flex max-tablet:flex-col">
            <div className=" lg:w-[25%]  max-tablet:w-full max-desktop:w-full">
              <RadioGroup
                name={"google_login_enabled"}
                value={values?.google_login_enabled}
                options={[
                  { label: "On", value: true },
                  { label: "Off", value: false },
                ]}
                label="Google Login"
                onChange={(e) => {
                  setFieldValue("google_login_enabled", e === "true");
                }}
              />
            </div>
            <div className=" lg:w-[25%] max-tablet:w-full max-desktop:w-full">
              <RadioGroup
                name={"New5"}
                options={[
                  { label: "On", value: true },
                  { label: "Off", value: false },
                ]}
                label="Captcha"
                onChange={(e) => {
                  setFieldValue("New5", e === "true");
                }}
              />
            </div>
            <div className=" lg:w-[25%] max-tablet:w-full max-desktop:w-full">
              <RadioGroup
                name={"email_verification_enabled"}
                value={values?.email_verification_enabled}
                options={[
                  { label: "On", value: true },
                  { label: "Off", value: false },
                ]}
                label="Email Verifications"
                onChange={(e) => {
                  setFieldValue("email_verification_enabled", e === "true");
                }}
              />
            </div>
          </div>
          <div className="flex justify-center items-center pt-8 ">
            <PrimaryButton type="submit">
              <h1 className="text-white font-semibold font-[satoshi]">Save</h1>
            </PrimaryButton>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default General;
