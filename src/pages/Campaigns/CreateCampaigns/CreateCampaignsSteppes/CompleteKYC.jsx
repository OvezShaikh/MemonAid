import React from "react";
import { useFormik, useFormikContext } from "formik";
import InputField from "../../../../components/inputs/InputField";
import UploadField from "../../../../components/inputs/UploadField/Index";
import SecondaryButton from "../../../../components/inputs/secondaryButton";
import PrimaryButton from "../../../../components/inputs/PrimaryButton";
import CheckBox from "../../../../components/inputs/checkBox";

const InputStyle = {
  padding: "20px",
  border: "1px solid #e2e2e2",
  "&:focus-within": {
    boxShadow: `0px 4px 10px 0px rgba(0, 0, 0, 0.15);`,
    borderColor: "black",
  },
};

const styleSecondaryButton = {
  width: "100%",
  height: "100%",
  padding: "10px",
  fontSize: "1.5rem",
  fontWeight: 700,
  borderRadius: "12px",
};

const stylePrimaryButton = {
  width: "100%",
  height: "100%",
  padding: "10px",
  fontSize: "1.5rem",
  fontWeight: 700,
  borderRadius: "12px",
};

function CompleteKYC({ handleBack, handleNext }) {
  const { submitForm, setFieldValue, values } = useFormikContext();

  const isFormValid = () => {
    // Check if the required fields are empty
    return (
      !!values.adhar_card &&
      !!values.adhar_card_image &&
      !!values.pan_card &&
      !!values.pan_card_image &&
      !!values.declaration
    );
  };

  return (
    <form>
      <div className="py-10 flex flex-col gap-3">
        <div>
          <InputField
            required
            name="adhar_card"
            label="Enter Aadhar Card Number:"
            type="number"
            placeholder="xxxx xxxx xxxx"
            sx={InputStyle}
          />
        </div>
        <UploadField
          required={"true"}
          name={"adhar_card_image"}
          label="Upload Aadhar Card (Front and Back):"
          placeholder="Allowed format: JPEG, PDF and PNG and Maximum size 5 mb."
          sx={{ padding: "20px" }}
          multiple={false}
          onChange={(value) => setFieldValue("adhar_card_image", value)}
        />
        <div>
          <InputField
            name="pan_card"
            label="Enter PAN Card Number:"
            type="text"
            required
            sx={InputStyle}
            placeholder="xxxxxxxxxxx"
          />
        </div>
        <UploadField
          name={"pan_card_image"}
          required={"true"}
          label="Upload PAN Card:"
          placeholder="Allowed format: JPEG, PDF and PNG and Maximum size 5 mb."
          onChange={(value) => setFieldValue("pan_card_image", value)}
          multiple={false}
        />
        <CheckBox
          sx={{ paddingLeft: "15px" }}
          name="declaration"
          label={"I, hereby declare that I accept the above conditions"}
        />
      </div>
      <div className="flex mt-4 desktop:gap-x-[40px] max-desktop:gap-x-[24px]">
        <SecondaryButton onClick={handleBack} sx={styleSecondaryButton}>
          Back
        </SecondaryButton>
        <PrimaryButton
          sx={stylePrimaryButton}
          onClick={() => {
            if (isFormValid()) {
              submitForm();
            }
          }}
          disabled={!isFormValid()}
        >
          Submit
        </PrimaryButton>
      </div>
    </form>
  );
}

export default CompleteKYC;
