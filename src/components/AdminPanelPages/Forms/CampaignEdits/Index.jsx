import React from "react";
import InputField from "../../inputs/InputField/index";
import SelectField from "../../inputs/SelectField/index";
import PrimaryButton from "../../inputs/PrimaryButton";
import CheckBox from "../../inputs/checkBox";
import { FormLabel } from "@mui/material";
import { colors } from "../../../constants/theme";
import { Formik, Form, Field, useFormikContext } from "formik";
import ReactQuilTextField from "../../inputs/ReactQuilTextField/Index";
import SuccessButton from "../../inputs/SuccessButton/Index";
import { PiCheckFat } from "react-icons/pi";
import { red } from "@mui/material/colors";
import UploadField from "../../inputs/UploadField/Index";
import RadioGroup from "../../inputs/radioGroup/index";
import ErrorIcon from "@mui/icons-material/Error";
import ImageEditor from "../../layout/ImageEditor/Index";
import { useState } from "react";
import ImageBackgroundWithDeleteButton from "../../layout/CropAddImage/Index";
import Attachments from "../../../layout/Attachments/Index";
import { useGetAll } from "../../../Hooks";

const InputStyle = {
  padding: "20px",
  border: "1px solid #e2e2e2",

  "&:focus-within": {
    boxShadow: `0px 4px 10px 0px rgba(0, 0, 0, 0.15);`,
    borderColor: "black",
  },
};
const InputStyleDate = {
  padding: "12px",
  border: "1px solid #e2e2e2",

  "&:focus-within": {
    boxShadow: `0px 4px 10px 0px rgba(0, 0, 0, 0.15);`,
    borderColor: "black",
  },
};

const initialValues = {
  TitleofCampaign: "",
  document: "",
};

function Index() {
  const imageUrlFromBackend =
    "https://images.pexels.com/photos/20197333/pexels-photo-20197333/free-photo-of-a-man-in-cowboy-hat-riding-a-horse-in-a-field.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load";
  const [documents, setDocuments] = useState([]);
  const [category, setCategory] = useState([]);

  const handleDocumentUpload = (documentUrl) => {
    setDocuments([...documents, documentUrl]);
  };

  const [user, setUser] = useState({});

  const { submitForm } = useFormikContext;

  const [imageUrl, setImageUrl] = useState("");

  const handleDelete = () => {
    setImageUrl("");
  };

  const { data, isSuccess } = useGetAll({
    key: `/admin-dashboard/campaign/16399639-ba2c-44e4-94a6-294e11cb06a3
        `,
    enabled: true,
    select: (data) => {
      return data.data.data;
    },
    onSuccess: (data) => {
      setUser(data);
    },
  });
  const initial_values = {
    title: user.title || "",
    amount: user.goal_amount || "",
    location: user.location || "",
    summary: user.summary || "",
    status: user.status || "",
    image: user.campaign_image || "",
    init_category: user?.category?.name || "",
  };

  if (!isSuccess) {
    return <div>Loading...</div>;
  }

  return (
    <Formik initialValues={initial_values} enableReinitialize={true}>
      {({ values }) => (
        <Form className="flex flex-col items-center">
          <div className="flex w-[100%] mt-2 gap-14 max-tablet:flex-col max-desktop:flex-col">
            <div className="flex flex-col w-[70%] max-tablet:w-[100%] max-desktop:w-[100%] gap-10 items-center">
              <ImageBackgroundWithDeleteButton
                imageUrl={imageUrl}
                onDelete={handleDelete}
              />

              <div className="w-full">
                <InputField
                  value={values?.title}
                  sx={InputStyle}
                  name={"Title of Campaign:"}
                  label={"Title of Campaign:"}
                  required={"true"}
                  placeholder={"Minimum 50 INR"}
                />
              </div>
              <SelectField
                name="category"
                required={true}
                label="Choose a Category:"
                value={values?.init_category}
                options={category.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
              />
              <div className="w-full">
                <InputField
                  value={values?.amount}
                  sx={InputStyle}
                  name={"Amount to be raised:"}
                  label={"Amount to be raised:"}
                  placeholder={"Minimum 50 INR"}
                />
              </div>
              <SelectField
                value={values?.location}
                name={"Location:"}
                label={"Location:"}
              />

              <div className="w-full">
                <FormLabel
                  className="font-medium d-flex align-items-center desktop:text-[20px] max-desktop:text-[16px]"
                  style={{
                    padding: "4px 8px 8px 8px",
                    color: colors.text.main,
                    fontWeight: 700,
                    fontFamily: "satoshi",
                    fontStyle: "normal",
                    fontSize: "1.1rem",
                  }}
                >
                  About the Campaign:
                  <span className="text-red-600">*</span>
                </FormLabel>
                <div className="h-[332px] summary-div">
                  <ReactQuilTextField
                    theme="snow"
                    name="summary"
                    value={values?.summary}
                  />
                </div>
              </div>
              <div className="w-full mt-5">
                <InputField
                  name={"summery"}
                  label={"Summary"}
                  required={"true"}
                  multiline
                  info
                  CustomInfoIcon={
                    <ErrorIcon
                      className="ms-1"
                      style={{
                        color: "red",
                        cursor: "pointer",
                        height: "18px",
                      }}
                    />
                  }
                  infoText={"Please be careful while adding AD Path."}
                  rows={5}
                  placeholder="Placeholder text"
                  sx={{
                    padding: "20px",
                    border: "1px solid #e2e2e2",

                    "&:focus-within": {
                      boxShadow: `0px 4px 10px 0px rgba(0, 0, 0, 0.15);`,
                      borderColor: "black",
                    },
                    "& input": { height: "100px" },
                  }}
                />
              </div>
              <div className="w-full flex flex-col">
                <FormLabel
                  className="font-medium d-flex align-items-center desktop:text-[20px] max-desktop:text-[16px]"
                  style={{
                    padding: "4px 8px 16px 8px",
                    color: colors.text.main,

                    fontWeight: 700,
                    fontFamily: "satoshi",
                    fontStyle: "normal",
                    height: "22px",
                  }}
                >
                  Attachments:
                  <span className="text-red-600">*</span>
                </FormLabel>
                <div className="flex gap-4 max-tablet:flex-col">
                  {img.map((imageUrl, index) => (
                    <Attachments key={index} imageUrl={imageUrl} />
                  ))}
                </div>
              </div>
              <div className="flex max-tablet:flex-col  w-[100%] gap-4">
                <div className="w-[50%] max-tablet:w-full pt-1.5">
                  <InputField
                    type={"date"}
                    sx={InputStyleDate}
                    name={"raised"}
                    label={"Accept Donations until (Select end date):"}
                    placeholder={"Minimum 50 INR"}
                  />
                </div>

                <div className="w-[50%] max-tablet:w-full document-upload-div">
                  <UploadField
                    label="Upload Attachment:"
                    onDocumentUpload={handleDocumentUpload}
                    name="document"
                    placeholder="Upload marksheets, Medical records, Fees Structure etc."
                    sx={{ padding: "20px" }}
                    multiple={false}
                    onChange={(value) =>
                      Formik.setFieldValue("document", value)
                    }
                  />
                </div>
              </div>
              <div className="flex w-[100%] max-tablet:flex-col gap-4">
                <div className="w-[50%] max-tablet:w-full">
                  <SelectField
                    name={"raised"}
                    label={"Status:"}
                    placeholder={"Minimum 50 INR"}
                  />
                </div>
                <div className="w-[50%] checkmark-div max-desktop:w-[46%] max-tablet:w-[100%]">
                  <FormLabel
                    className="text-capitalize mb-4 font-medium d-flex align-items-center"
                    style={{
                      padding: "4px 8px 8px 8px",
                      color: colors.text.main,
                      fontSize: "1.2rem",
                      fontWeight: 700,
                      fontFamily: "satoshi",
                      fontStyle: "normal",
                      height: "22px",
                    }}
                  >
                    Is the Campaign Zakaat eligible?
                    <span className="text-red-600">*</span>
                  </FormLabel>
                  <CheckBox
                    sx={{
                      paddingLeft: "15px",
                      "&.Mui-checked": {
                        color: red[500],
                      },
                    }}
                    name="zakat_eligible"
                    label={"Yes"}
                  />
                </div>
              </div>
              <div className="w-full ">
                <InputField
                  name={"Notes/Comments:"}
                  label={"Notes/Comments:"}
                  required={"true"}
                  multiline
                  rows={5}
                  sx={{
                    padding: "20px",
                    border: "1px solid #e2e2e2",

                    "&:focus-within": {
                      boxShadow: `0px 4px 10px 0px rgba(0, 0, 0, 0.15);`,
                      borderColor: "black",
                    },
                    "& input": { height: "100px" },
                  }}
                />
              </div>
              <div className=" w-full ">
                <RadioGroup
                  name={"New8"}
                  sx={{ flexDirection: "column" }}
                  options={[
                    { label: "On", value: "On" },
                    { label: "Off", value: "Off" },
                  ]}
                  label="Featured:"
                  style={{ fontSize: "18px", fontWeight: 500 }}
                />
              </div>
            </div>
            <div className="w-[30%] max-tablet:w-[100%] max-desktop:w-[100%] flex flex-col max-desktop:items-center  gap-8">
              <div className=" w-[100%] max-desktop:w-[100%]">
                <ImageEditor
                  sx={{ maxWidth: "400px", minHeight: "600px" }}
                  imageUrl={imageUrlFromBackend}
                />
              </div>

              <PrimaryButton sx={{ borderRadius: "12px", width: "90%" }}>
                <h1 className="text-white font-medium py-2.5 text-[18px]   font-[satoshi]">
                  View Revision History
                </h1>
              </PrimaryButton>
            </div>
          </div>
          <div className="flex gap-3 max-tablet:flex-col  max-tablet:items-center pt-5">
            <button
              type="button"
              onClick={() => {}}
              className="w-[69px] content-stretch h-[32px] bg-[#F7F7F7]"
            >
              <h1 className="text-[#000000] font-medium text-[14px] font-[satoshi]">
                Cancel
              </h1>
            </button>
            <SuccessButton
              onClick={() => {}}
              text={"Save & Approve"}
              icon={<PiCheckFat className="w-4 h-4 mt-1" />}
            />
            <PrimaryButton
              onClick={() => {
                submitForm();
              }}
            >
              <h1 className="text-white font-semibold font-[satoshi]">
                Reject Modification Request
              </h1>
            </PrimaryButton>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default Index;
