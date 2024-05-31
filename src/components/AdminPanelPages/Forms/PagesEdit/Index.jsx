import React, { useState } from "react";
import InputAdminField from "../../../inputs/InputAdminField/Index";
import { Form, Formik } from "formik";
import RadioGroup from "../../../inputs/radioGroupAdminPanel";
import ReactQuilTextField from "../../../inputs/ReactQuilTextField/Index";
import { FormLabel } from "@mui/material";
import PrimaryButton from "../../../inputs/PrimaryButton";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetAll } from "../../../../Hooks/useGetAll";
import { useCreateOrUpdate } from "../../../../Hooks/useCreateOrUpdate";
import { toast } from "react-toastify";

const styleLabel = {
  fontFamily: "satoshi",
  fontSize: "1rem",
  fontWeight: 700,
  color: "#383A42",
};

function Index() {
  const [Details, setDetails] = useState({});

  const navigate = useNavigate();
  let { state } = useLocation();
  let { id } = state;
  const initialValues = {
    title: Details?.title || "",
    slug: Details?.slug || "",
    show_navbar: Details?.show_navbar || false,
    show_footer: Details?.show_footer || false,
    show_page: Details?.show_page || false,
    content: Details?.content || "",
  };

  useGetAll({
    key: `admin-dashboard/pages/${id}`,
    enabled: true,
    select: (data) => {
      return data.data.data;
    },
    onSuccess: (data) => {
      setDetails(data);
    },
  });

  const { mutate } = useCreateOrUpdate({
    url: `admin-dashboard/pages/${id}`,
    method: "put",
  });
  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      onSubmit={(values) => {
        mutate(values, {
          onSuccess: (response) => {
            toast.success("Prefernces Saved Successfully !", {
              position: "top-center",
            });
            navigate(-1);
          },
          onError: (response) => {
            toast.error("Could Not Save Preferences !", {
              position: "top-center",
            });
          },
        });
      }}
    >
      {({ handleChange, setFieldValue, values }) => (
        <Form className="flex flex-col items-center">
          <div className="flex w-full max-tablet:flex-col gap-4 max-tablet:pt-4 max-desktop:pt-4">
            <div className="w-full">
              <InputAdminField
                label={"Title"}
                name={"title"}
                placeholder={"Placeholder Text"}
                value={values?.title}
                onChange={handleChange}
              />
            </div>
            <div className="w-full">
              <InputAdminField
                label={"Slug/URL"}
                name={"slug"}
                placeholder={"Placeholder Text"}
                value={values?.slug}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex gap-32 w-full pt-8 max-tablet:flex-col max-tablet:gap-0">
            <div className="  lg:w-[25%] ">
              <RadioGroup
                name={"show_navbar"}
                onChange={(e) => {
                  setFieldValue("show_navbar", e === "true");
                }}
                options={[
                  { label: "On", value: true },
                  { label: "Off", value: false },
                ]}
                label="Show Navbar"
                value={values?.show_navbar}
              />
            </div>
            <div className="lg:w-[25%]">
              <RadioGroup
                name={"show_footer"}
                options={[
                  { label: "On", value: true },
                  { label: "Off", value: false },
                ]}
                label="Show Footer"
                onChange={(e) => {
                  setFieldValue("show_footer", e === "true");
                }}
                value={values?.show_footer}
              />
            </div>
            <div className=" lg:w-[25%] ">
              <RadioGroup
                onChange={(e) => {
                  setFieldValue("show_page", e === "true");
                }}
                name={"show_page"}
                options={[
                  { label: "On", value: true },
                  { label: "Off", value: false },
                ]}
                label="Show Page"
                value={values?.show_page}
              />
            </div>
          </div>
          <div className="pt-7 mb-5 h-[300px] w-full">
            <FormLabel style={styleLabel}>Content:</FormLabel>
            <ReactQuilTextField
              theme="snow"
              name={"content"}
              value={values?.content}
              placeholder="Summarize in 100 words max."
              style={{ "& .ql-editor": { minHeight: "50px" } }}
              onChange={(value) => setFieldValue("content", value)}
            />
          </div>
          <div className="flex flex-row gap-4 mt-12 max-tablet:mt-16">
            <button
              type="button"
              className="w-[69px] h-[32px] bg-[#F7F7F7]"
              onClick={() => navigate(-1)}
            >
              <h1 className="text-[#000000] font-medium text-[14px] font-[satoshi]">
                Cancel
              </h1>
            </button>
            <PrimaryButton type="submit">
              <h1 className="text-white font-semibold font-[satoshi]">Save</h1>
            </PrimaryButton>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default Index;
