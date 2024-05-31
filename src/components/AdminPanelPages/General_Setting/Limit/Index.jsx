import React, { useState } from "react";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import { FormHelperText } from "@mui/material";
import PrimaryButton from "../../../inputs/PrimaryButton";
import { Form, Formik } from "formik";
import InputAdminField from "../../../inputs/InputAdminField/Index";
import { useCreateOrUpdate, useGetAll } from "../../../../Hooks";
import { toast } from "react-toastify";

const styleLabel = {
  fontFamily: "satoshi",
  fontSize: "1rem",
  fontWeight: 700,
  color: "#383A42",
  padding: "0 0 0 5px",
};

function Limit() {
  const [limit, setLimit] = useState({});

  useGetAll({
    key: `/admin-dashboard/limit`,
    enabled: true,
    select: (data) => {
      return data.data.rows[0];
    },
    onSuccess: (data) => {
      setLimit(data);
    },
  });

  const initialValues = {
    num_campaigns: limit?.num_campaigns || 0,
    max_file_size: limit?.max_file_size || 0,
    donation_min_amount: limit?.donation_min_amount || 0,
    donation_max_amount: limit?.donation_max_amount || 0,
    campaign_min_amount: limit?.campaign_min_amount || 0,
    campaign_max_amount: limit?.campaign_max_amount || 0,
  };

  const { mutate } = useCreateOrUpdate({
    url: `/admin-dashboard/limit`,
    method: "post",
  });

  const handlesubmit = (values) => {
    mutate(values, {
      onSuccess: () => {
        toast.success("Prefernces Saved Successfully !", {
          position: "top-center",
        });
      },
    });
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      onSubmit={(values) => handlesubmit(values)}
    >
      {({ values, handleChange }) => (
        <Form className="flex flex-col justify-center flex-wrap items-center max-desktop:pt-5 max-tablet:pt-5">
          <div className="flex w-full max-desktop:flex-col max-tablet:flex-col gap-4">
            <div className="w-full max-desktop:w-[80%] max-tablet:w-full ">
              <InputAdminField
                style={{ marginBottom: "2rem" }}
                type="number"
                onChange={handleChange}
                value={values?.num_campaigns}
                placeholder={"Placeholder Text"}
                label={"No. of campaigns to show"}
                name={"num_campaigns"}
              />
            </div>
            <div className="w-full max-desktop:w-[80%] max-tablet:w-full ">
              <InputAdminField
                label={"File size allowed"}
                type="number"
                value={values?.max_file_size}
                onChange={handleChange}
                placeholder={"Placeholder Text"}
                name={"max_file_size"}
              />

              <FormHelperText
                sx={{ fontWeight: 500, fontFamily: "satoshi", fontSize: 16 }}
              >
                IMPORTANT: Your Server supports upto{" "}
                <span className="text-[#717171]">100MB</span>
              </FormHelperText>
            </div>
          </div>
          <div className="flex w-full mb-24 max-desktop:flex-col max-tablet:flex-col flex-wrap pt-2 gap-4">
            <div className="w-[40%] max-desktop:w-[80%] max-tablet:w-full">
              <FormLabel style={styleLabel}>Amount for Donations</FormLabel>
              <div className="flex justify-center items-center">
                <InputAdminField
                  label={""}
                  size="lg"
                  value={values?.donation_min_amount}
                  onChange={handleChange}
                  type="number"
                  name={"donation_min_amount"}
                  placeholder="Minimum"
                />
                <h1 className="px-2  " style={styleLabel}>
                  To
                </h1>
                <InputAdminField
                  size="lg"
                  name={"donation_max_amount"}
                  value={values?.donation_max_amount}
                  onChange={handleChange}
                  type="number"
                  placeholder="Maximum"
                />
              </div>
            </div>
            <div className="w-[40%] max-desktop:w-[80%] max-tablet:w-full">
              <FormLabel style={styleLabel}>Amount for Campaigns</FormLabel>
              <div className="flex justify-center items-center">
                <InputAdminField
                  size="lg"
                  type="number"
                  name={"campaign_min_amount"}
                  onChange={handleChange}
                  value={values?.campaign_min_amount}
                  placeholder="Minimum"
                />
                <h1 className="px-2  " style={styleLabel}>
                  To
                </h1>
                <InputAdminField
                  size="lg"
                  type="number"
                  name={"campaign_max_amount"}
                  onChange={handleChange}
                  value={values?.campaign_max_amount}
                  placeholder="Maximum"
                />
              </div>
            </div>
          </div>
          <PrimaryButton type="submit">
            <h1 className="text-white font-semibold font-[satoshi]">Save</h1>
          </PrimaryButton>
        </Form>
      )}
    </Formik>
  );
}

export default Limit;
