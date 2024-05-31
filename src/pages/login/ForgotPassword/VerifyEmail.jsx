import React, { useState } from "react";
import PrimaryButton from "../../../components/inputs/PrimaryButton";
import InputField from "../../../components/inputs/InputField";
import { Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useCreateOrUpdate } from "../../../Hooks/useCreateOrUpdate"; // Path to the useCreateOrUpdate hook
import OTPInput, { ResendOTP } from "otp-input-react";

const inputStyle = {
  padding: " 16px 10px 16px var(--Spacing-20, 20px)",
  border: "2px solid var(--Linear-BG, #FF9F0A)",
  borderImage: "linear-gradient(#FF9F0A, red) 20",
  borderStyle: " solid",
  borderRadius: "4px",
};

function VerifyEmail() {
  const [isVerified, setIsVerified] = useState(false);
  const [newPassword, setNewPassword] = useState(false);
  const [otpState, setOtpState] = useState([
    { index: 0, value: "" },
    { index: 1, value: "" },
    { index: 2, value: "" },
    { index: 3, value: "" },
  ]);
  const [backendOTP, setBackendOTP] = useState("");
  const [Email, setEmail] = useState(" ");

  const verifyEmailMutation = useCreateOrUpdate({
    url: "/accounts/forgetpassword/nt/",
    method: "post",
    onSuccess: (values, response) => {
      toast.success(response?.data?.success, {
        position: "top-center",
      });
      setIsVerified(true);
      setBackendOTP(values.data.OTP);
      const key = response.email;
      setEmail(key);
    },
    onerror: (response) => {
      toast.error(response?.data, {
        position: "top-right",
      });
    },
    refetch: null,
  });

  const resetPasswordMutation = useCreateOrUpdate({
    url: "/accounts/reset-pass/nt/",
    method: "post",
    onSuccess: () => {
      toast.success("Password reset successfully", {
        position: "top-center",
        autoClose: 5000,
      });
      setTimeout(() => {
        window.location.href = "/Home";
      }, 1500);
    },
    refetch: null,
  });

  const handleVerifyEmail = (values) => {
    verifyEmailMutation.mutate(values);
  };

  const handleNewPassword = (values) => {
    resetPasswordMutation.mutate(values);
  };

  const getJoinedOTP = () => {
    return otpState.map((i) => i.value).join("");
  };

  const compareOTP = () => {
    if (getJoinedOTP() != backendOTP) {
      toast.error("OTP didn't match", { position: "top-center" });
    } else if (getJoinedOTP() === null) {
      toast.error("please enter otp", { position: "top-center" });
    } else {
      toast.success("OTP verified", { position: "top-center" });
      setNewPassword(true);
    }
  };

  const handleOTPChange = (event, index) => {
    if (event.target.value.length > 1) {
      return;
    }
    setOtpState((prev) => {
      let old = [...prev];
      old[index] = { index, value: event.target.value };

      return old;
    });
    if (index != 3) {
      event.target.nextElementSibling.focus();
    }
  };

  return (
    <div className="flex flex-col gap-2 w-[90%]">
      {!isVerified && (
        <Formik
          initialValues={{ email: "" }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email("Invalid email")
              .required("Email is required"),
          })}
          onSubmit={handleVerifyEmail}
        >
          {(formikProps) => (
            <Form>
              <div className="flex flex-col gap-3">
                <div className="">
                  <h1
                    className="text-[2.8rem] font-bold font-[Epilogue] pb-2"
                    style={{
                      background:
                        "linear-gradient(to right, #FF9F0A 0%, #FF375F 62.9%)",
                      "-webkit-background-clip": "text",
                      "-webkit-text-fill-color": "transparent",
                    }}
                  >
                    Forgot Password?
                  </h1>
                  <hr />
                </div>
                <p className="text-[1.4rem] font-medium font-[satoshi] text-[#717171]">
                  Enter the email address associated with your account.
                </p>
                <div className="pb-4">
                  <InputField
                    name={"email"}
                    label={"Email"}
                    placeholder={"Enter your email"}
                    sx={inputStyle}
                  />
                </div>
                <PrimaryButton
                  sx={{ width: "100%", padding: "12px 40px" }}
                  type="submit"
                >
                  <span
                    className="font-[satoshi]"
                    style={{ fontSize: "1.4rem", fontWeight: 900 }}
                  >
                    {" "}
                    Confirm{" "}
                  </span>
                </PrimaryButton>
              </div>
            </Form>
          )}
        </Formik>
      )}
      {isVerified && !newPassword && (
        <Formik initialValues={{}}>
          {(formikProps) => (
            <Form>
              <div className="flex flex-col gap-3 w-full">
                <div className="">
                  <h1
                    className="text-[2.8rem] font-bold font-[Epilogue] pb-2"
                    style={{
                      background:
                        "linear-gradient(to right, #FF9F0A 0%, #FF375F 62.9%)",
                      "-webkit-background-clip": "text",
                      "-webkit-text-fill-color": "transparent",
                    }}
                  >
                    Verify your Email
                  </h1>
                  <hr />
                </div>
                <p className="text-[1.4rem] font-medium font-[satoshi] text-[#717171]">
                  Enter the 4-digit code sent to your email.
                </p>
                <div className="flex justify-start gap-2 items-center ">
                  {otpState.map((item) => {
                    return (
                      <input
                        className="w-[33px] h-[34px] text-center border rounded-md"
                        onChange={(event) => handleOTPChange(event, item.index)}
                        maxlength="1"
                        value={item.value}
                        autoComplete="one-time-code"
                        maxLength={1}
                      />
                    );
                  })}
                </div>
                <ResendOTP
                  // onResendClick={() => console.log("Resend clicked")}
                  style={{
                    // Inline styles for ResendOTP component
                    color: "#0466C8",
                    fontFamily: "satoshi",
                    cursor: "pointer",
                  }}
                />
                <PrimaryButton
                  sx={{ width: "100%", padding: "12px 40px", marginTop: "8px" }}
                  type="submit"
                  onClick={compareOTP}
                >
                  <span
                    className="font-[satoshi]"
                    style={{ fontSize: "1.4rem", fontWeight: 900 }}
                  >
                    {" "}
                    Verify Email{" "}
                  </span>
                </PrimaryButton>
              </div>
            </Form>
          )}
        </Formik>
      )}
      {newPassword && (
        <Formik
          initialValues={{
            email: Email || "",
            password: "",
            new_password: "",
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string().email("Invalid email"),
            password: Yup.string().required("Password is required"),
            new_password: Yup.string()
              .required("New password is required")
              .oneOf([Yup.ref("password"), null], "Passwords must match"),
          })}
          onSubmit={handleNewPassword}
        >
          {(formikProps) => (
            <Form>
              <div className="flex flex-col gap-3">
                <div className="">
                  <h1
                    className="text-[2.8rem] font-bold font-[Epilogue] pb-2"
                    style={{
                      background:
                        "linear-gradient(to right, #FF9F0A 0%, #FF375F 62.9%)",
                      "-webkit-background-clip": "text",
                      "-webkit-text-fill-color": "transparent",
                    }}
                  >
                    Enter new password
                  </h1>
                  <hr />
                </div>
                <p className="text-[1.4rem] font-medium font-[satoshi] text-[#717171]">
                  Almost done. Enter your new password and you are all set!
                </p>
                <div className="pb-4">
                  <InputField
                    name={"password"}
                    type={"password"}
                    label={"Enter New Password"}
                    placeholder={"***************"}
                    sx={inputStyle}
                  />
                </div>
                <div className="pb-4">
                  <InputField
                    name={"new_password"}
                    type={"password"}
                    label={"Confirm New Password"}
                    placeholder={"***************"}
                    sx={inputStyle}
                  />
                </div>
                <PrimaryButton
                  sx={{ width: "100%", padding: "12px 40px" }}
                  type="submit"
                >
                  <span
                    className="font-[satoshi]"
                    style={{ fontSize: "1.4rem", fontWeight: 900 }}
                  >
                    {" "}
                    Reset Password{" "}
                  </span>
                </PrimaryButton>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}

export default VerifyEmail;
