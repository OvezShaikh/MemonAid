import React from "react";
import InputField from "../../inputs/InputField";
import { Form, Formik } from "formik";
import { useCreateOrUpdate } from "../../../Hooks";
import PrimaryButton from "../../inputs/PrimaryButton";
import { toast } from "react-toastify";

const InputStyle = {
  padding: "15px 20px",
  border: "1px solid #e2e2e2",
  // },
  "&:focus-within": {
    boxShadow: `0px 4px 10px 0px rgba(0, 0, 0, 0.15);`,
    borderColor: "black",
  },
};

const initial_values = {
  old_password: "",
  new_password: "",
};

const Password = () => {
  const { mutate } = useCreateOrUpdate({
    url: `/accounts/change_password`,
  });

  return (
    <Formik
      initialValues={initial_values}
      onSubmit={(values) => {
        mutate(values, {
          onSuccess: () => {
            toast.success("Password Updated Successfully !", {
              position: "top-right",
            });
          },
        });
      }}
    >
      {({ values, handleChange }) => (
        <Form className="space-y-3">
          <div className="">
            <InputField
              onChange={handleChange}
              value={values?.password}
              name={"old_password"}
              label={"Old Password:"}
              type={"password"}
              sx={InputStyle}
            />
          </div>
          <div className="">
            <InputField
              name={"new_password"}
              label={"New Password:"}
              type={"password"}
              sx={InputStyle}
            />
          </div>
          <div className="mx-auto flex justify-center">
            <PrimaryButton type="submit" className="mx-auto">
              Save Changes
            </PrimaryButton>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Password;
