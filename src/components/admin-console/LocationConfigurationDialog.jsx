import { Add, Edit } from "@carbon/icons-react";
import { Grid, Box, Button } from "@mui/material";
import React from "react";
import * as yup from "yup";
import { Form, Formik } from "formik";
import { useQueryClient } from "react-query";
import { Dialog } from "../layout/dialogBox/dialog";
import { useCreateOrUpdate, useGetAll } from "../../Hooks";
import PrimaryButton from "../inputs/PrimaryButton";
import SecondaryButton from "../inputs/secondaryButton";
import { colors } from "../../constants/theme";
import InputField from "../inputs/InputField";
import CustomSwitch from "../inputs/customSwitch";
import SelectField from "../inputs/SelectField";
import { toast } from "react-toastify";
import ErrorIcon from "@mui/icons-material/Error";
import InputAdminField from '../inputs/InputAdminField/Index'
import AdminUploadField from "../inputs/AdminUploadField/Index"
import RadioGroup from '../inputs/radioGroupAdminPanel'



const initialValues = {
  name: "",
  url: "",
  thumbnail: "",
  New8: ""
}

export const LocationConfigurationDialog = ({
  isUpdate = false,
  data,
  onEditClick,
  onSuccess,
  onClose,
}) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useCreateOrUpdate({
    url: isUpdate ? `/admin/location/${data?.id}` : "/admin/location",
    method: isUpdate ? "put" : "post",
    onSuccess: () => onSuccess && onSuccess(),
  });

  const { data: countryData } = useGetAll({
    key: `/admin/location/country`,

    enabled: true,
  });

  const { data: PolicyOptions } = useGetAll({
    key: `/admin/policy`,
    enabled: true,
  });

  return (
    <Dialog
      title={`${isUpdate ? "Update" : "Add"}  Category`}
      onClose={() => onClose && onClose()}
      button={
        isUpdate ? (
          <Button
            onClick={() => onEditClick && onEditClick()}
            startIcon={<Edit />}
            className="text-capitalize"
            sx={{
              lineHeight: "18px",
              fontFamily: "FuturaLight",
              fontWeight: "300",
              fontSize: {
                xs: "0.8rem",
                lg: "0.9rem",
              },
            }}
            variant="text"
          >
            View/Edit
          </Button>
        ) : (
          <PrimaryButton
            className="text-capitalize"
            startIcon={<Add size={24} />}
          >
            Add New
          </PrimaryButton>
        )
      }
    >
      {({ onClose }) => (
        <Formik

          initialValues={initialValues}

        >
          <Form className='flex flex-col items-center px-4'>
            <div className='flex w-full gap-4'>
              <div className="w-full">
                <InputAdminField name={"name"} label={"Name"} placeholder={"Placeholder Text"} />
              </div>
              <div className="w-full">
                <InputAdminField name={"url"} label={"Slug/URL"} placeholder={"Placeholder Text"} />
              </div>

            </div>
            <div className="flex w-full mt-8 gap-4">
              <div className="w-full " Style>
                <AdminUploadField name={"thumbnail"} label='Thumbnail (Optainal)' />
              </div>
              <div className=" w-full ">
                <RadioGroup
                  name={"New8"}

                  options={[
                    { label: "Active", value: "Active" },
                    { label: "Inactive", value: "Inactive" },
                  ]}
                  label="Status"
             

                />
              </div>
            </div>
            <div className="flex flex-row gap-4 mt-12">
              <button
              type="button"
                onClick={() => {
                  onClose();
                }}
                className='w-[69px] h-[32px] bg-[#F7F7F7]'>
                <h1 className='text-[#000000] font-medium text-[14px] font-[satoshi]'>Cancel</h1>
              </button>
              <PrimaryButton >
                <h1 className='text-white font-semibold font-[satoshi]'>Save</h1>
              </PrimaryButton>

            </div>
          </Form>
        </Formik>
      )}
    </Dialog>
  );
};