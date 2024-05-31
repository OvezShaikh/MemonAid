import React, { useState } from "react";
import * as Yup from "yup";
import PrimaryButton from "../../../inputs/PrimaryButton";
import InputAdminField from "../../../inputs/InputAdminField/Index";
import { Form, Formik } from "formik";
import { useCreateOrUpdate, useGetAll } from "../../../../Hooks";
import { toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  instagram_url: Yup.string().url("Invalid Instagram URL").required(),
  facebook_url: Yup.string().url("Invalid Facebook URL").required(),
  twitter_url: Yup.string().url("Invalid Twitter URL").required(),
});

const ProfilesSocial = () => {
  const [socials, setSocials] = useState({});

  useGetAll({
    key: `/admin-dashboard/social-media`,
    enabled: true,
    select: (data) => {
      return data.data.rows[0];
    },
    onSuccess: (data) => {
      setSocials(data);
    },
  });

  const { mutate } = useCreateOrUpdate({
    url: `/admin-dashboard/social-media`,
  });

  const initialValues = {
    instagram_url: socials?.instagram_url || "",
    facebook_url: socials?.facebook_url || "",
    twitter_url: socials?.twitter_url || "",
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        mutate(values, {
          onSuccess: () => {
            toast.success("Socials Saved Successfully !", {
              position: "top-right",
            });
          },
          onerror: () => {
            toast.error("ran into an error !", {
              position: "top-right",
            });
          },
        });
      }}
    >
      {({ values, handleChange }) => (
        <Form className="flex flex-col flex-wrap justify-center items-center">
          <div className="flex  gap-4 w-full mb-24 max-tablet:mt-8 max-desktop:mt-8 mt-4 max-tablet:flex-col max-desktop:flex-col">
            <div className="flex w-full flex-col">
              <InputAdminField
                label={"Facebook"}
                value={values?.facebook_url}
                onChange={handleChange}
                name={"facebook_url"}
                placeholder={"Placeholder text"}
              />
            </div>
            <div className="flex w-full flex-col">
              <InputAdminField
                label={"Twitter"}
                value={values?.twitter_url}
                onChange={handleChange}
                name={"twitter_url"}
                placeholder={"Placeholder text"}
              />
            </div>
            <div className="flex w-full  flex-col">
              <InputAdminField
                label={"Instagram"}
                value={values?.instagram_url}
                onChange={handleChange}
                name={"instagram_url"}
                placeholder={"Placeholder text"}
              />
            </div>
          </div>
          <PrimaryButton type="submit">
            <h1 className="text-white font-semibold font-[satoshi]">Save</h1>
          </PrimaryButton>
        </Form>
      )}
    </Formik>
  );
};

export default ProfilesSocial;
