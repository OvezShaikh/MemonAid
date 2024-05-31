import React from "react";
import { Form, useFormik, useFormikContext } from "formik";
import InputField from "../../../../components/inputs/InputField";
import UploadField from "../../../../components/inputs/UploadField/Index";
import RadioGroup from "../../../../components/inputs/radioGroup";
import SecondaryButton from "../../../../components/inputs/secondaryButton";
import PrimaryButton from "../../../../components/inputs/PrimaryButton";
import CheckBox from "../../../../components/inputs/checkBox";

const InputStyle = {
  padding: "20px",
  border: "1px solid #e2e2e2",
  // },
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

function AccountDetails({ handleBack, handleNext }) {
  const { submitForm, setFieldValue, values } = useFormikContext();

  const isFormValid = () => {
    // Check if the required fields are empty
    return (
      !!values.rasing_for &&
      !!values.account_holder_name &&
      !!values.account_number &&
      !!values.bank_name &&
      !!values.branch_name &&
      !!values.ifsc_code &&
      !!values.passbook_image &&
      !!values.declaration
    );
  };

  return (
    <Form className="">
      <div className="py-[40px] flex flex-col gap-[15px] ">
        <RadioGroup
          onChange={(e) => {
            setFieldValue("rasing_for", e.target.value);
          }}
          name="rasing_for"
          required={true}
          options={[
            { label: "Self", value: "Self" },
            { label: "Family/Friends", value: "Family" },
            { label: "Charity", value: "Charity" },
          ]}
          label="Raising this Campaign for:"
        />
        <div>
          <InputField
            label="Account holder Name:"
            sx={InputStyle}
            name="account_holder_name"
            type="text"
            required={true}
          />
        </div>
        <div>
          <InputField
            label="Account Number:"
            name="account_number"
            sx={InputStyle}
            type="number"
            required={true}
          />
        </div>
        <div>
          <InputField
            label="Bank Name:"
            name="bank_name"
            sx={InputStyle}
            type="text"
            required={true}
          />
        </div>

        <div>
          <InputField
            label="Branch Name:"
            name="branch_name"
            sx={InputStyle}
            type="text"
            required={true}
          />
        </div>

        <div>
          <InputField
            label="IFSC:"
            name="ifsc_code"
            sx={InputStyle}
            required={true}
          />
        </div>

        <UploadField
          label="Upload Bank Passbook/Cheque:"
          name="passbook_image"
          placeholder="Allowed format: JPEG, PDF and PNG and Maximum size 5 mb."
          onChange={(value) => setFieldValue("passbook_image", value)}
          multiple={false}
          required={"true"}
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
    </Form>
  );
}

export default AccountDetails;
