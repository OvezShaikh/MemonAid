import React, { useEffect, useRef, useState } from "react";
import { Formik, Form } from "formik";
import InputField from "../../inputs/InputField";
import CountrySelect from "../../inputs/countrySelect/index";
import { useCreateOrUpdate, useGetAll } from "../../../Hooks";
import { toast } from "react-toastify";
import PrimaryButton from "../../inputs/PrimaryButton";
import Profile from "../../inputs/AvatarCrop/Profile";
import { useNavigate } from "react-router-dom";

const InputStyle = {
  padding: "15px 20px",
  border: "1px solid #e2e2e2",
  // },
  "&:focus-within": {
    boxShadow: `0px 4px 10px 0px rgba(0, 0, 0, 0.15);`,
    borderColor: "black",
  },
};
const SelectStyle = {
  padding: "0px",
  border: "none",
  "&:focus-within": {
    boxShadow: `none`,
    borderColor: "none",
  },
};

let userData = localStorage.getItem("user_info");
let Data = JSON.parse(userData);
let id = Data?.id;

const Account = () => {
  const [Details, setDetails] = useState({});
  const [srcImg, setSrcImg] = useState("");
  const navigate = useNavigate();

  useGetAll({
    key: `/accounts/user/${id}`,
    enabled: true,
    select: (data) => {
      return data?.data?.data;
    },
    onSuccess: (data) => {
      setDetails(data);
    },
  });

  useEffect(() => {
    const img = `${process.env.REACT_APP_BASE_URL}` + Details?.profile_pic;
    setSrcImg(img);
  }, [Details?.profile_pic]);

  const initial_values = {
    username: Details?.username || "",
    email: Details?.email || "",
    mobile_number: Details?.mobile_number || "",
    country: Details?.country || "",
    profile_pic: Details?.profile_pic || "",
  };

  const { mutate } = useCreateOrUpdate({
    url: `/accounts/user/${id}`,
    method: "put",
  });

  const handleSubmit = (values) => {
    const changedValues = Object.keys(values).filter(
      (key) => values[key] !== initial_values[key]
    );

    const payload = {};
    changedValues.forEach((key) => {
      payload[key] = values[key];
    });

    const formData = new FormData();

    Object.entries(payload).forEach(([key, value]) => {
      if (value) {
        if (value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, value);
        }
      }
    });

    mutate(formData, {
      onSuccess: () => {
        toast.success(" Details Updated Successfully !", {
          position: "top-right",
        });
        navigate(-1);
      },
    });
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initial_values}
      onSubmit={(values) => handleSubmit(values)}
    >
      {({ values, handleChange }) => (
        <Form className="space-y-2.5">
          <Profile
            name={"profile_pic"}
            value={values?.profile_pic}
            srcImg={srcImg}
            setSrcImg={setSrcImg}
          />
          <div className="">
            <InputField
              onChange={handleChange}
              value={values?.username}
              name={"username"}
              label={"Full Name:"}
              sx={InputStyle}
            />
          </div>
          <div className="">
            <InputField
              onChange={handleChange}
              value={values?.email}
              name={"email"}
              label={"Email Id:"}
              sx={InputStyle}
            />
          </div>
          <div className="">
            <InputField
              onChange={handleChange}
              value={values?.mobile_number}
              name={"mobile_number"}
              type="number"
              label={"Mobile:"}
              placeholder={"(Optional)"}
              sx={InputStyle}
            />
          </div>

          <div className="country-select-div">
            <CountrySelect
              onChange={handleChange}
              value={values?.country}
              label="Country:"
              name={"country"}
              sx={SelectStyle}
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

export default Account;
