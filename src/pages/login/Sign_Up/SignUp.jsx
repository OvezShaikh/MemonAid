import React, { useRef, useState } from "react";
import { Form } from "formik";
import InputField from "../../../components/inputs/InputField";
import { useFormikContext } from "formik";
import PrimaryButton from "../../../components/inputs/PrimaryButton";
import Profile from "../../../components/inputs/AvatarCrop/Profile";
import images from "../../../constants/images";

const SignUp = ({ handleNext }) => {
  const imgRef = useRef(null);
  const { isValid, values } = useFormikContext();
  const [srcImg, setSrcImg] = useState(images.Default_Profile_pic);

  const isFormValid = () => {
    return values.username && values.email && values.mobile_number;
  };

  const handleNextClick = () => {
    if (isFormValid()) {
      handleNext();
    } else {
      alert("Please fill in all required fields.");
    }
  };

  return (
    <Form className="px-2  ">
      <div>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col justify-center items-center">
            <div>
              <Profile
                name={"profile_pic"}
                srcImg={srcImg}
                setSrcImg={setSrcImg}
              />
            </div>
            <div className="w-full space-y-4">
              <div>
                <InputField
                  label="Name"
                  required={true}
                  top={"28px"}
                  Size={18}
                  sx={{
                    padding: " 8px 10px 8px 10px",
                    border: "2px solid var(--Linear-BG, #FF9F0A)",
                    borderImage: "linear-gradient(#FF9F0A, red) 20",
                    // borderWidth: '3px',
                    borderStyle: " solid",
                    borderRadius: "4px",
                  }}
                  name={"username"}
                  placeholder="Enter your username"
                />
              </div>

              <div>
                <InputField
                  label="Email"
                  type="email"
                  name={"email"}
                  required={true}
                  Size={18}
                  sx={{
                    padding: " 8px 10px 8px 10px",
                    border: "2px solid var(--Linear-BG, #FF9F0A)",
                    borderImage: "linear-gradient(#FF9F0A, red) 20",
                    // borderWidth: '3px',
                    borderStyle: " solid",
                    borderRadius: "4px",
                  }}
                  placeholder="Enter your username"
                />
              </div>
              <div>
                <InputField
                  label="Mobile Number"
                  required={true}
                  type="number"
                  Size={18}
                  sx={{
                    padding: " 8px 10px 8px 10px",
                    border: "2px solid var(--Linear-BG, #FF9F0A)",
                    borderImage: "linear-gradient(#FF9F0A, red) 20",
                    // borderWidth: '3px',
                    borderStyle: " solid",
                    borderRadius: "4px",
                  }}
                  name={"mobile_number"}
                  fullWidth
                  placeholder="Enter your mobile number"
                />
              </div>
            </div>
          </div>
          <div xs={12}>
            <PrimaryButton
              sx={{
                width: "100%",
                top: "2rem",
                padding: "12px 40px",
                fontSize: "1.4rem",
                fontWeight: 900,
                fontFamily: "satoshi",
              }}
              disabled={!isValid || !isFormValid()}
              onClick={handleNextClick}
            >
              Next
            </PrimaryButton>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default SignUp;
