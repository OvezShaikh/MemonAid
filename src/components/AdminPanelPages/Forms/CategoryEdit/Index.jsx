import { Formik, Form } from "formik";
import React, { useState } from "react";
import InputAdminField from "../../../inputs/InputAdminField/Index";
import AdminUploadField from "../../../inputs/AdminUploadField/Index";
import RadioGroup from "../../../inputs/radioGroupAdminPanel";
import PrimaryButton from "../../../inputs/PrimaryButton";
import { useLocation, useNavigate } from "react-router-dom";
import { useCreateOrUpdate, useGetAll } from "../../../../Hooks";
import { toast } from "react-toastify";
import * as yup from "yup";

function AddNew() {
  let { state } = useLocation();
  let { id } = state;

  const [Category, setCategory] = useState({});

  const navigate = useNavigate();

  useGetAll({
    key: `/admin-dashboard/category/${id}`,
    enabled: true,
    select: (data) => {
  
      return data?.data?.data;
    },
    onSuccess: (data) => {
      setCategory(data);
    },
  });
  const initialValues = {
    name: Category?.name || "",
    slug: Category?.slug || "",
    image: Category?.image || "",
    is_active: Category?.is_active || false,
  };
  const validationSchema = yup.object().shape({
    name: yup.string().required("Title is required"),
    slug: yup
      .string()
      .required("Slug/URL is required")
      .matches(
        /^[^\s_0-9]+$/,
        "Slug/URL cannot contain spaces, underscores, or numbers"
      ),
  });

  const { mutate } = useCreateOrUpdate({
    url: `/admin-dashboard/category/${id}`,
    method: "put",
  });

  const handleSubmit = (values) => {
    const formData = new FormData();
    formData.append("name", values?.name);
    formData.append("slug", values?.slug);
    if (values?.image instanceof File) {
      formData.append("image", values?.image);
    }
    formData.append("is_active", values?.is_active);

    mutate(formData, {
      onSuccess: () => {
        toast.success("Category Updated Successfully ! ", {
          position: "top-right",
        });
        navigate(-1);
      },
      onError: (response) => {
        toast.error(`${response.data}Error`);
      },
    });
  };

  return (
    <Formik
      enableReinitialize={true}
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={(values) => handleSubmit(values)}
    >
      {({ values, setFieldValue, handleChange }) => (
        <Form className="flex flex-col items-center px-4 max-desktop:pt-4 max-tablet:pt-4">
          <div className="flex w-full max-tablet:flex-col gap-4">
            <div className="w-full">
              <InputAdminField
                name={"name"}
                value={values?.name}
                onChange={handleChange}
                label={"Name"}
                placeholder={"Placeholder Text"}
              />
            </div>
            <div className="w-full">
              <InputAdminField
                name={"slug"}
                label={"Slug/URL"}
                value={values?.slug}
                onChange={handleChange}
                placeholder={"Placeholder Text"}
              />
            </div>
          </div>
          <div className="flex w-full mt-8 gap-4 max-tablet:flex-col">
            <div className="w-full " Style>
              <AdminUploadField
                label="Thumbnail (Optional)"
                placeholder="Recommended size: 150x50 px (PNG)"
                sx={{ padding: "20px" }}
                multiple={false}
                name={"image"}
                value={values?.image}
              />
            </div>
            <div className=" w-full ">
              <RadioGroup
                name={"is_active"}
                value={values?.is_active}
                onChange={(e) => {
                  setFieldValue("is_active", e === "true");
                }}
                options={[
                  { label: "Active", value: true },
                  { label: "Inactive", value: false },
                ]}
                label="Status"
              />
            </div>
          </div>
          <div className="flex flex-row gap-4 mt-12">
            <button
              type="button"
              className="w-[69px] h-[32px] bg-[#F7F7F7]"
              onClick={() => {
                navigate(-1);
              }}
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

export default AddNew;
