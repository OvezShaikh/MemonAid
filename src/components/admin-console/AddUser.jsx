import { Add } from "@carbon/icons-react";
import React, { useState } from "react";
import * as yup from "yup";
import { Form, Formik } from "formik";
import { useQueryClient } from "react-query";
import { Dialog } from "../layout/dialogBox/dialog";
import { useCreateOrUpdate } from "../../Hooks/useCreateOrUpdate";
import PrimaryButton from "../inputs/PrimaryButton";
import InputAdminField from "../inputs/InputAdminField/Index";
import RadioGroup from "../inputs/radioGroupAdminPanel";
import { toast } from "react-toastify";
import AdminSelectField from "../inputs/AdminSelectField/Index";
import { useGetAll } from "../../Hooks";
import { Button } from "@mui/material";

export const AddUser = ({
  isUpdate = false,
  data,
  onClick,
  onSuccess,
  onClose,
}) => {
  const queryClient = useQueryClient();
  const [role, setRole] = useState([]);

  const initialValues = {
    username: "",
    mobile_number: "",
    email: "",
    password: "",
    user_role: "",
    user_type:""
  };

  useGetAll({
    key: `/admin-dashboard/user-roles?page=1&limit=10`,
    enabled: true,
    select: (data) => {
      return data.data.rows;
    },
    onSuccess: (data) => {
      setRole(data);
    },
  });

  const validationSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    mobile_number: yup
      .string()
      .min(10, "Enter a valid Mobile Number")
      .required("Mobile number is required"),
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .matches(
        /^(?=.*[A-Z])(?=.*\d).{8,}$/,
        "Password must contain at least one uppercase letter, one number, and be at least 8 characters long"
      )
      .required("Password is required"),
    confirm_password: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"), 
      user_role: yup.object().required("role is required"),
      user_type: yup.string().required("User type is required").oneOf(["Individual", "NGO"], "Invalid user type"),
    })
  

  const { mutate } = useCreateOrUpdate({
    url: `/admin-dashboard/users`,
  });

  return (
    <Dialog
      title={`${isUpdate ? "Update" : "Add"}  New User`}
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
            mutate(
              {
                ...values,
                user_role: values?.user_role?.value,
              },
              {
                onSuccess: (response) => {
                  toast.success(`${response.data?.message}`, {
                    position: "top-right",
                  });
                  queryClient.refetchQueries({
                    queryKey: ["/admin-dashboard/users"],
                    stale: true,
                    exact: false,
                  });
                  onClose();
                },
                onError: (response) => {
                  toast.error(`${response.response?.data?.message}`, {
                    position: "top-right",
                  });
                },
              }
            );
          }}
        >
          {({ setFieldValue, errors, touched }) => (
            <Form className="flex flex-col items-center px-4 pt-2">
              <div className="flex w-full max-desktop:flex-col max-tablet:flex-col  gap-4">
                <div className="w-full">
                  <InputAdminField
                    label={"Name"}
                    name={"username"}
                    placeholder={"Placeholder Text"}
                  />
                </div>
                <div className="w-full">
                  <InputAdminField
                    label={"Email"}
                    name={"email"}
                    placeholder={"Placeholder Text"}
                  />
                </div>
              </div>
              <div className="flex w-full  max-desktop:flex-col max-tablet:flex-col  gap-4 pt-2">
                <div className="w-full">
                  <InputAdminField
                    label={"Mobile"}
                    name={"mobile_number"}
                    placeholder={"Placeholder Text"}
                  />
                </div>
                <div className="w-full">
                  <AdminSelectField
                    label={"Role"}
                    name={"user_role"}
                    placeholder={"Select User Role"}
                    options={role.map((item) => ({
                      label: item.role_name,
                      value: item.id,
                    }))}
                  />
                </div>
              </div>
              <div className="flex w-full  max-desktop:flex-col max-tablet:flex-col  gap-4 pt-2">
                <div className="w-full">
                  <InputAdminField
                    label={"Password"}
                    name={"password"}
                    placeholder={"Placeholder Text"}
                  />
                </div>
                <div className="w-full">
                  <InputAdminField
                    label={"Confirm Password"}
                    name={"confirm_password"}
                    placeholder={"Placeholder Text"}
                  />
                </div>
              </div>
              <div className="flex gap-32 w-full pl-2 pt-8 max-tablet:flex-col max-tablet:gap-4">
                <div className=" lg:w-[25%] ">
                  <RadioGroup
                    name={"user_type"}
                    onChange={(value) => {
                                    setFieldValue("user_type", value);
                    }}
                    options={[
                      { label: "Individual", value: "Individual" },
                      { label: "NGO", value: "NGO" },
                    ]}
                    label="Register as"
                  />
                  {errors.show_navbar && touched.show_navbar && (
                    <div className="error">{errors.show_navbar}</div>
                  )}
                </div>
              </div>

              <div className="flex flex-row gap-4 mt-12">
                <Button
                  sx={{ background: "#F7F7F7", width: "69px", height: "32px" }}
                  className="w-[69px] h-[32px] bg-[#F7F7F7]"
                  onClick={onClose}
                >
                  <h1 className="text-[#000000] font-medium text-[14px] font-[satoshi]">
                    Cancel
                  </h1>
                </Button>
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
