import React from "react";
import InputField from "../../../inputs/InputAdminField/Index";
import SelectField from "../../../inputs/AdminSelectField/Index";
import PrimaryButton from "../../../inputs/PrimaryButton";
import CheckBox from "../../../inputs/checkBox";
import { FormLabel } from "@mui/material";
import { colors } from "../../../../constants/theme";
import { Formik, Form } from "formik";
import images from "../../../../constants/images";
import ReactQuilTextField from "../../../inputs/ReactQuilTextField/Index";
import SuccessButton from "../../../inputs/SuccessButton/Index";
import { PiCheckFat } from "react-icons/pi";
import { red } from "@mui/material/colors";
import ErrorIcon from "@mui/icons-material/Error";
import ImageEditor from "../../../layout/ImageEditor/Index";
import Attachments from "../../../layout/Attachments/Index";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCreateOrUpdate, useGetAll } from "../../../../Hooks";
import { toast } from "react-toastify";

function Index() {
  let { state } = useLocation();
  let { id } = state;

  const [campaign, setCampaign] = useState({});
  const [Category, setCategory] = useState([]);
  const [approval, setApproval] = useState(false);
  const [campaignData, setCampaignData] = useState({});
  const [Documents, setDocuments] = useState([]);
  const [c_image, setC_image] = useState("");
  const [doc1, setDoc1] = useState("");
  const [doc2, setDoc2] = useState("");
  const [doc3, setDoc3] = useState("");
  const navigate = useNavigate();

  useGetAll({
    key: `/admin-dashboard/category?page=1&limit=10`,
    enabled: true,
    select: (data) => {
      return data.data.rows;
    },
    onSuccess: (data) => {
      setCategory(data);
    },
  });

  useGetAll({
    key: `/admin-dashboard/cause-edit/${id}`,
    enabled: true,
    select: (data) => {
      return data.data.data;
    },
    onSuccess: (data) => {
      setCampaign(data);
      if (data?.campaign_image) {
        const image = `${process.env.REACT_APP_BE_BASE_URL}${data?.campaign_image}`;
        setC_image(image);
      } else {
        const image = `${process.env.REACT_APP_BE_BASE_URL}${
          data?.campaign?.campaign_image || ""
        }`;
        setC_image(image);
      }
      setDocuments(data?.campaign?.documents);
      setCampaignData(data?.campaign_data);
      setDoc1(data?.doc1);
      setDoc2(data?.doc2);
      setDoc3(data?.doc3);
    },
  });

  const { mutate } = useCreateOrUpdate({
    url: `/admin-dashboard/cause-edit/${id}`,
    method: "put",
  });

  const initial_value = {
    title: campaign?.campaign_data?.title || campaign?.campaign?.title || "",
    category:
      campaign?.campaign_data?.category?.name ||
      campaign?.campaign?.category?.name ||
      "",
    goal_amount:
      campaign?.campaign_data?.goal_amount || campaign?.campaign?.goal_amount || "",
    location:
      campaign?.campaign_data?.location || campaign?.campaign?.location || "",
    end_date:
      campaign?.campaign_data?.end_date || campaign?.campaign?.end_date || "",
    summary:
      campaign?.campaign_data?.summary || campaign?.campaign?.summary || "",
    story: campaign?.campaign_data?.story || campaign?.campaign?.story || "",
    campaign_image: c_image || "",
    approval_status:
      campaign?.campaign_data?.approval_status ||
      campaign?.campaign?.approval_status ||
      false,
    is_featured:
      campaign?.campaign_data?.is_featured ||
      campaign?.campaign?.is_featured ||
      false,
    zakat_eligible:
      campaign?.campaign_data?.zakat_eligible ||
      campaign?.campaign?.zakat_eligible ||
      false,
    documents: campaign?.documents || [],
    status: campaign?.campaign_data?.status || campaign?.campaign?.status || "",
  };

  const handleSubmit = (values) => {
    const formData = new FormData();
    formData.append("campaign_image", values?.campaign_image);
    formData.append("title", values?.title);
    formData.append("goal_amount", values?.goal_amount);
    formData.append("location", values?.location);
    formData.append("end_date", values?.end_date);
    formData.append("summary", values?.summary);
    formData.append("story", values?.story);
    formData.append("category", values?.category?.id || campaign?.campaign_data?.category?.id ||  campaign?.campaign?.category?.id );
    formData.append("zakat_eligible", values?.zakat_eligible);
    formData.append("document", values?.documents);
    formData.append("status", values?.status);
    formData.append("approve_campaign", approval);

    mutate(formData, {
      onSuccess: (response) => {
        toast.success(response?.data?.data, {
          position: "top-right",
        });
        navigate(-1);
      },
    });
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initial_value}
      onSubmit={(values) => handleSubmit(values)}
    >
      {({ values, setFieldValue, handleChange }) => (
        <Form className="flex flex-col items-center  max-desktop:pt-6 max-tablet:pt-6">
          <div className="flex w-[100%] mt-2 gap-6 max-desktop:flex-col max-tablet:flex-col">
            <div className="flex flex-col w-[70%] gap-2 items-center max-desktop:w-full max-tablet:w-full">
              <div className="flex flex-col items-center">
                <div className="flex">
                  <h1 className="text-[16px] font-[satoshi] font-medium text-[#000000] underline pr-2">
                    {" "}
                    {values.title}
                  </h1>
                  <a
                    href={`/campaign-details/${campaign?.campaign?.id}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {" "}
                    <img src={images.CausesDetails} alt="" />{" "}
                  </a>
                </div>
                <p className="text-[16px] font-[satoshi] font-medium text-[#000000] ">
                  Note: Labels in red color indicates that the field is changed.{" "}
                </p>
              </div>
              <div className="w-full">
                <InputField
                  color={campaignData?.title ? "red" : undefined}
                  onChange={handleChange}
                  value={values?.title}
                  name={"title"}
                  label={"Title of Campaign:"}
                  placeholder={"Enter the Title"}
                />
              </div>
              <SelectField
                color={campaignData?.category ? "red" : undefined}
                name={"category"}
                label="Choose a Category:"
                value={values?.category}
                options={Category.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
                onChange={(value) => setFieldValue("category", value)}
              />
              <div className="w-full">
                <InputField
                  color={campaignData?.goal_amount ? "red" : undefined}
                  onChange={handleChange}
                  type="number"
                  name={"goal_amount"}
                  value={values?.goal_amount}
                  label={"Amount to be raised:"}
                  placeholder={"Minimum 50 INR"}
                />
              </div>
              <div className="w-full">
                <InputField
                  color={campaignData?.location ? "red" : undefined}
                  name={"location"}
                  onChange={handleChange}
                  value={values?.location}
                  label={"Location:"}
                />
              </div>
              <div className="flex w-[100%] gap-4">
                <div className="w-[50%]">
                  <InputField
                    color={campaignData?.end_date ? "red" : undefined}
                    onChange={handleChange}
                    type={"date"}
                    name={"end_date"}
                    value={values?.end_date}
                    label={"Accept Donations until (Select end date):"}
                    placeholder={"Minimum 50 INR"}
                  />
                </div>
                <div className="w-[50%] pt-3 checkmark-div max-desktop:w-[46%] max-tablet:w-[100%]">
                  <FormLabel
                    className="text-capitalize   font-medium d-flex align-items-center"
                    style={{
                      padding: "4px 8px 8px 8px",
                      color: campaignData?.zakat_eligible
                        ? "red"
                        : colors.text.main,
                      fontSize: "1rem",
                      fontWeight: 700,
                      fontFamily: "satoshi",
                      fontStyle: "normal",
                      height: "22px",
                    }}
                  >
                    Is the Campaign Zakaat eligible?
                  </FormLabel>
                  <CheckBox
                    fontSize={"16px !important"}
                    sx={{
                      paddingLeft: "15px",
                      "&.Mui-checked": {
                        color: red[500],
                      },
                    }}
                    name="zakat_eligible"
                    checked={values?.zakat_eligible}
                    onChange={handleChange}
                    label={"Yes"}
                  />
                </div>
              </div>
              <div className="w-full">
                <FormLabel
                  className="font-medium d-flex align-items-center desktop:text-[20px] max-desktop:text-[16px]"
                  style={{
                    padding: "4px 8px 8px 8px",
                    color: campaignData?.story ? "red" : colors.text.main,

                    fontWeight: 700,
                    fontFamily: "satoshi",
                    fontStyle: "normal",
                    fontSize: "1rem",
                  }}
                >
                  About the Campaign:
                </FormLabel>
                <div className="h-[200px] summary-div">
                  <ReactQuilTextField
                    theme="snow"
                    name="story"
                    value={values?.story}
                    style={{ "& .ql-editor": { minHeight: "50px" } }}
                    onChange={(value) => setFieldValue("story", value)}
                  />
                </div>
              </div>
              <div className="w-full mt-5 max-tablet:pt-12">
                <InputField
                  color={campaignData?.summary ? "red" : undefined}
                  name={"summary"}
                  onChange={handleChange}
                  value={values?.summary}
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
                />
              </div>
              <div className="w-full flex flex-col">
                <FormLabel
                  className="font-medium d-flex align-items-center desktop:text-[20px] max-desktop:text-[16px]"
                  style={{
                    padding: "4px 8px 16px 8px",
                    color:
                      campaign?.doc1 || campaign?.doc2 || campaign?.doc3
                        ? "red"
                        : colors.text.main,
                    fontWeight: 700,
                    fontFamily: "satoshi",
                    fontStyle: "normal",
                    height: "22px",
                    fontSize: "1rem",
                  }}
                >
                  Attachments:
                </FormLabel>
                <div className="flex gap-4 max-tablet:flex-col">
                  {[doc1, doc2, doc3].map((documentUrl, index, imageUrl) => {
                    if (documentUrl) {
                      return (
                        <Attachments
                          iconShow={true}
                          key={index}
                          id={imageUrl?.id}
                          imageUrl={`${process.env.REACT_APP_BE_BASE_URL}${documentUrl}`}
                        />
                      );
                    } else if (Documents && Documents.length > index) {
                      const documentLink = `${process.env.REACT_APP_BE_BASE_URL}${Documents[index].doc_file}`;
                      return (
                        <Attachments
                          key={index}
                          id={Documents[0]?.id}
                          imageUrl={documentLink}
                        />
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            </div>

            <div className="w-[30%] flex max-desktop:w-full max-tablet:w-full justify-center ">
              <ImageEditor
                sx={{ maxWidth: "500px", minHeight: "500px" }}
                dataUrl={c_image}
              />
            </div>
          </div>
          <div className="flex gap-3 pt-5 max-tablet:flex-col max-tablet:items-center">
            {campaign?.campaign?.status === "Active" ? (
              <>
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="w-[69px] content-stretch h-[32px] bg-[#F7F7F7]"
                >
                  <h1 className="text-[#000000] font-medium text-[14px] font-[satoshi]">
                    Cancel
                  </h1>
                </button>
                <SuccessButton
                  type="submit"
                  onClick={() => setApproval(true)}
                  text={"Save & Approve"}
                  icon={<PiCheckFat className="w-4 h-4 mt-1" />}
                />
                <PrimaryButton type="submit">
                  <h1 className="text-white font-semibold font-[satoshi]">
                    Reject Modification Request
                  </h1>
                </PrimaryButton>
              </>
            ) : (
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="w-[69px] content-stretch h-[32px] bg-[#F7F7F7]"
              >
                <h1 className="text-[#000000] font-medium text-[14px] font-[satoshi]">
                  Cancel
                </h1>
              </button>
            )}
            {/* <button
              onClick={() => navigate(-1)}
              className="w-[69px] content-stretch h-[32px] bg-[#F7F7F7]"
            >
              <h1 className="text-[#000000] font-medium text-[14px] font-[satoshi]">
                Cancel
              </h1>
            </button>
            <SuccessButton
              type="submit"
              onClick={() => setApproval(true)}
              text={"Save & Approve"}
              icon={<PiCheckFat className="w-4 h-4 mt-1" />}
            />
            <PrimaryButton type="submit">
              <h1 className="text-white font-semibold font-[satoshi]">
                Reject Modification Request
              </h1>
            </PrimaryButton> */}
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default Index;
