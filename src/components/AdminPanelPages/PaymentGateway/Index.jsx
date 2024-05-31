import { Form, Formik } from "formik";
import React, { useState } from "react";
import InputField from "../../inputs/InputAdminField/Index";
import RadioGroup from "../../inputs/radioGroupAdminPanel/index";
import PrimaryButton from "../../inputs/PrimaryButton";
import { toast } from "react-toastify";
import { useCreateOrUpdate, useGetAll } from "../../../Hooks";

function Index() {
  const [Details, setDetails] = useState({});

  useGetAll({
    key: `/admin-dashboard/phonepay`,
    enabled: true,
    select: (data) => {
      return data?.data?.data[0];
    },
    onSuccess: (data) => {
      setDetails(data);
    },
  });

  const { mutate } = useCreateOrUpdate({
    url: `/admin-dashboard/phonepay`,
    method: "put",
  });

  const initialValues = {
    phonepay_key: Details?.phonepay_key || "",
    phonepay_secret: Details?.phonepay_secret || "",
    fee_percent: Details?.fee_percent || "",
    fee_cents: Details?.fee_cents || "",
    is_enabled: false,
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
      {({ values, setFieldValue }) => (
        <Form className=" p-8 max-tablet:p-0 max-desktop:p-1">
          <div className="flex flex-col gap-7 p-4 items-center max-desktop:p-1 max-tablet:p-0">
            <div className="flex gap-7 w-full max-desktop:flex-col max-tablet:flex-col">
              <div className="w-1/2 max-desktop:w-full max-tablet:w-full">
                <InputField
                  label={"Percentage fee %"}
                  name={"fee_percent"}
                  placeholder={"Placeholder Text"}
                  value={values?.fee_percent}
                />
              </div>
              <div className="w-1/2 max-desktop:w-full max-tablet:w-full">
                <InputField
                  label={"Fee Cents"}
                  name={"fee_cents"}
                  placeholder={"Placeholder Text"}
                  value={values?.fee_cents}
                />
              </div>
            </div>
            <div className="flex gap-7 w-full max-desktop:flex-col max-tablet:flex-col">
              <div className="w-1/2 max-desktop:w-full max-tablet:w-full">
                <InputField
                  label={"Phonepe Key"}
                  name={"phonepay_key"}
                  placeholder={"Placeholder Text"}
                  value={values?.phonepay_key}
                />
              </div>
              <div className="w-1/2 max-desktop:w-full max-tablet:w-full">
                <InputField
                  label={"Phonepe Secret Key"}
                  name={"phonepay_secret"}
                  placeholder={"Placeholder Text"}
                  value={values?.phonepay_secret}
                />
              </div>
            </div>
            <div className=" w-full pl-2 max-desktop:w-full max-tablet:w-full">
              <RadioGroup
                name={"is_enabled"}
                sx={{ fontSize: "1.3rem" }}
                onChange={(e) => {
                  setFieldValue("is_enabled", e === "true");
                }}
                options={[
                  { label: "Active", value: true },
                  { label: "Disable", value: false },
                ]}
                label="Status"
                value={values?.is_enabled}
                // onChange={onChange}
              />
            </div>
            <div className="flex flex-row gap-4 mt-12">
              <button
                // onClick={() => {
                //     onClose();
                // }}
                className="w-[69px] h-[32px] bg-[#F7F7F7]"
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
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default Index;
