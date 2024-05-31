import { Add } from "@carbon/icons-react";
import React from "react";
import * as yup from "yup";
import { Form, Formik } from "formik";
import { useQueryClient } from "react-query";
import { Dialog } from "../layout/dialogBox/dialog";
import { useCreateOrUpdate } from "../../Hooks/useCreateOrUpdate";
import PrimaryButton from "../inputs/PrimaryButton";
import InputAdminField from "../inputs/InputAdminField/Index";
import RadioGroup from "../inputs/radioGroupAdminPanel";
import ReactQuilTextField from "../inputs/ReactQuilTextField/Index";
import { FormLabel } from "@mui/material";
import { toast } from "react-toastify";

export const PagesAddNew = ({
  isUpdate = false,
  data,
  onClick,
  onSuccess,
  onClose,
}) => {
  const queryClient = useQueryClient();
  const styleLabel = {
    fontFamily: "satoshi",
    fontSize: "1rem",
    fontWeight: 700,
    color: "#383A42",
  };

  const initialValues = {
    title: "",
    slug: "",
    show_navbar: false,
    show_footer: false,
    show_page: false,
    content: "",
  };
  const validationSchema = yup.object().shape({
    title: yup.string().required("Title is required"),
    slug: yup
      .string()
      .required("Slug/URL is required")
      .matches(
        /^[^\s_0-9]+$/,
        "Slug/URL cannot contain spaces, underscores, or numbers"
      ),
    show_navbar: yup.boolean().required("Show Navbar is required"),
    show_footer: yup.boolean().required("Show Footer is required"),
    show_page: yup.boolean().required("Show Page is required"),
    content: yup.string().required("Content is required"),
  });

  const { mutate } = useCreateOrUpdate({
    url: `/admin-dashboard/pages`,
  });

  return (
    <Dialog
      title={`${isUpdate ? "Update" : "Add"}  New Pages`}
      onClose={() => onClose && onClose()}
      button={
        <PrimaryButton
          className="text-capitalize"
          startIcon={<Add size={24} />}
        >
          Add New
        </PrimaryButton>
      }
    >
      {({ onClose }) => (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            mutate(values, {
              onSuccess: (response) => {
                toast.success("Page create successfully", {
                  position: "top-right",
                });
                queryClient.refetchQueries({
                  queryKey: ["/admin-dashboard/pages"],
                  exact: false,
                });
                onClose();
              },
              onError: (response) => {
                toast.error("Pages with this slug alreay exists", {
                  position: "top-right",
                });
              },
            });
          }}
        >
          {({ setFieldValue, values, errors, touched }) => (
            <Form className="flex flex-col items-center px-4">
              <div className="flex w-full gap-4 max-desktop:flex-col max-tablet:flex-col">
                <div className="w-full">
                  <InputAdminField
                    label={"Title"}
                    name={"title"}
                    placeholder={"Placeholder Text"}
                  />
                </div>
                <div className="w-full">
                  <InputAdminField
                    label={"Slug/URL"}
                    name={"slug"}
                    placeholder={"Placeholder Text"}
                  />
                </div>
              </div>
              <div className="flex gap-32 w-full pt-8 max-tablet:flex-col max-tablet:gap-4">
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
                  />
                  {errors.show_navbar && touched.show_navbar && (
                    <div className="error">{errors.show_navbar}</div>
                  )}
                </div>
                <div className="lg:w-[25%]">
                  <RadioGroup
                    name={"show_footer"}
                    onChange={(e) => {
                      setFieldValue("show_footer", e === "true");
                    }}
                    options={[
                      { label: "On", value: true },
                      { label: "Off", value: false },
                    ]}
                    label="Show Footer"
                  />
                  {errors.show_footer && touched.show_footer && (
                    <div className="error">{errors.show_footer}</div>
                  )}
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
                  />
                  {errors.show_page && touched.show_page && (
                    <div className="error">{errors.show_page}</div>
                  )}
                </div>
              </div>
              <div className="pt-7 mb-5 h-[300px] w-full">
                <FormLabel style={styleLabel}>Content:</FormLabel>
                {/* <TextEditor  /> */}
                <ReactQuilTextField
                  theme="snow"
                  name={"content"}
                  value={values.content}
                  placeholder="Summarize in 100 words max."
                  style={{ "& .ql-editor": { minHeight: "50px" } }}
                  onChange={(value) => setFieldValue("content", value)}
                />
              </div>
              <div className="flex flex-row gap-4 mt-12 max-tablet:mt-16">
                <button
                  type="button"
                  className="w-[69px] h-[32px] bg-[#F7F7F7]"
                  onClick={() => onClose()}
                >
                  <h1 className="text-[#000000] font-medium text-[14px] font-[satoshi]">
                    Cancel
                  </h1>
                </button>
                <PrimaryButton type="submit">
                  <h1 className="text-white font-semibold font-[satoshi]">
                    Save
                  </h1>
                </PrimaryButton>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </Dialog>
  );
};
