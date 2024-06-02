import React, { useEffect } from "react";
import InputField from "../../inputs/InputAdminField/Index";
import SelectField from "../../inputs/AdminSelectField/Index";
import PrimaryButton from "../../inputs/PrimaryButton";
import CheckBox from "../../inputs/checkBox";
import { FormLabel } from "@mui/material";
import { colors } from "../../../constants/theme";
import { Formik, Form } from "formik";
import ReactQuilTextField from "../../inputs/ReactQuilTextField/Index";
import SuccessButton from "../../inputs/SuccessButton/Index";
import { PiCheckFat } from "react-icons/pi";
import { red } from "@mui/material/colors";
import UploadField from "../../inputs/AdminUploadField/Index";
import RadioGroup from "../../inputs/radioGroupAdminPanel/index";
import ErrorIcon from "@mui/icons-material/Error";
import ImageEditor from "../../layout/ImageEditor/Index";
import { useState } from "react";
import Attachments from "../../layout/Attachments/Index";
import { useCreateOrUpdate, useGetAll } from "../../../Hooks";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ImageCropper } from "../../inputs/ImageCropper/ImageCropper";
import { ImagePreviewDialog } from "../../inputs/PreviewImage/PreviewImage";
import DropZone from "../../inputs/ImageCropper/CropDrop";

function CauseEdit_Form() {
  let { state } = useLocation();
  let { id } = state;

  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);
  const [Categories, setCategories] = useState([]);

  const handleDocumentUpload = (documentUrl) => {
    setDocuments([...documents, documentUrl]);
  };

  const [user, setUser] = useState({});
  const [srcImg, setSrcImg] = useState("");
  const [openCrop, setOpenCrop] = useState(false);

  useEffect(() => {
    refetch();
    refetchCategories();
  }, []);

  const onChange = (e) => {
    let files;
    if (e) {
      files = e;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setSrcImg(reader.result);
    };
    reader.readAsDataURL(files[0]);
    setOpenCrop(true);
  };

  const { isSuccess, refetch } = useGetAll({
    key: `/admin-dashboard/campaign/${id}`,
    enabled: false,
    select: (data) => {
      return data.data.data;
    },
    onSuccess: (data) => {
      setUser(data);
      const imageUrl = `${process.env.REACT_APP_BE_BASE_URL}${
        data?.campaign_image || ""
      }`;
      setSrcImg(imageUrl);
      setDocuments(data?.documents);
    },
  });

  const { refetch: refetchCategories } = useGetAll({
    key: `/admin-dashboard/category?page=1&limit=10`,
    enabled: false,
    select: (data) => {
      return data?.data?.rows;
    },
    onSuccess: (data) => {
      setCategories(data);
    },
  });

  const { mutate } = useCreateOrUpdate({
    url: `/admin-dashboard/campaign/${id}`,
    method: "put",
    onSuccess: (response) => {
      toast.success(`Update Successfully `);
    },
    onError: (response) => {
      toast.error(`${response.status[0]}error`);
    },
  });

  const initial_values = {
    campaign_image: user.campaign_image || "",
    title: user.title || "",
    amount: user.goal_amount || "",
    location: user.location || "",
    category: user?.category || " ",
    is_featured: user?.is_featured || false,
    summary: user?.summary || "",
    zakat_eligible: user?.zakat_eligible || false,
    end_date: user?.end_date || "",
    status: user?.status || "",
    story: user?.story || "",
    documents: user?.documents || [],
  };

  if (!isSuccess) {
    return <div>Loading...</div>;
  }

  console.log(initial_values , "<------");



  const handleSubmit = (values) => {
    const formData = new FormData();
    if (values?.campaign_image instanceof File) {
      formData.append("campaign_image", values?.campaign_image);
    }
    formData.append("title", values?.title);
    formData.append("amount", values?.amount);
    formData.append("location", values?.location);
    formData.append("end_date", values?.end_date);
    formData.append("summary", values?.summary);
    formData.append("story", values?.story);
    formData.append("category", values?.category?.id);
    formData.append("status", values?.status?.value || user?.status);
    formData.append("zakat_eligible", values?.zakat_eligible);

    mutate(formData, {
      onSuccess: (response) => {
        toast.success(response?.data?.message, {
          position: "top-right",
        });
        navigate(-1);
      },
    });
  };

  return (
    <Formik
      initialValues={initial_values}
      enableReinitialize={true}
      onSubmit={(values) => handleSubmit(values)}
    >
      {({ values, setFieldValue, handleChange }) => (
        <Form className="flex flex-col items-center max-tablet:pt-8 max-desktop:pt-4">
          <div className="flex w-[100%] mt-2 gap-14 max-tablet:flex-col max-desktop:flex-col">
            <div className="flex flex-col w-[70%] max-tablet:w-[100%] max-desktop:w-[100%] gap-2 items-center">
              <div className="desktop:py-[80px] max-desktop:py-[53px] p-0 max-tablet:w-full ">
                <DropZone
                  name="campaign_image"
                  onChange={onChange}
                  initialPreview={srcImg}
                />

                {openCrop && (
                  <>
                    <ImageCropper
                      srcImg={srcImg}
                      setOpenCrop={setOpenCrop}
                      setsrcImg={setSrcImg}
                    />
                  </>
                )}

                {srcImg && <ImagePreviewDialog croppedImage={srcImg} />}
              </div>

              <div className="w-full">
                <InputField
                  value={values?.title}
                  onChange={handleChange}
                  name={"title"}
                  label={"Title of Campaign:"}
                  required={"true"}
                  placeholder={"Minimum 50 INR"}
                />
              </div>

              <SelectField
                name={"category"}
                required={true}
                label="Choose a Category:"
                getOptionLabel={(item) => {
                  return item?.name;
                }}
                value={values?.category}
                options={Categories}
              />
              <div className="w-full">
                <InputField
                  type={"number"}
                  onChange={handleChange}
                  value={values?.amount}
                  name={"amount"}
                  label={"Amount to be raised:"}
                  placeholder={"Minimum 50 INR"}
                />
              </div>

              <div className="w-full">
                <InputField
                  onChange={handleChange}
                  value={values?.location}
                  name={"location"}
                  label={"Location:"}
                />
              </div>
              <div className="w-full">
                <FormLabel
                  className="font-medium d-flex align-items-center desktop:text-[20px] max-desktop:text-[16px]"
                  style={{
                    padding: "4px 8px 8px 8px",
                    color: colors.text.main,
                    fontWeight: 700,
                    fontFamily: "satoshi",
                    fontStyle: "normal",
                    fontSize: "1rem",
                  }}
                >
                  About the Campaign:
                  <span className="text-red-600">*</span>
                </FormLabel>

                <div className="h-[200px] summary-div">
                  <ReactQuilTextField
                    theme="snow"
                    name="story"
                    value={values?.story}
                    onChange={(value) => setFieldValue("story", value)}
                  />
                </div>
              </div>

              <div className="w-full mt-5 max-tablet:pt-10 max-desktop:pt-5">
                <InputField
                  onChange={handleChange}
                  value={values?.summary}
                  name={"summary"}
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
                    color: colors.text.main,
                    fontWeight: 700,
                    fontFamily: "satoshi",
                    fontStyle: "normal",
                    height: "18px",
                  }}
                >
                  Attachments:
                  <span className="text-red-600">*</span>
                </FormLabel>

                <div className="flex gap-4 max-tablet:flex-col">
                  {values?.documents?.map((imageUrl, index) => {
                    const documentLink = `${process.env.REACT_APP_BE_BASE_URL}${imageUrl?.doc_file}`;
                    return (
                      <Attachments
                        key={index}
                        id={imageUrl?.id}
                        imageUrl={documentLink}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="flex max-tablet:flex-col  w-[100%] gap-4">
                <div className="w-[50%] max-tablet:w-full pt-1.5">
                  <InputField
                    value={values?.end_date}
                    type={"date"}
                    name={"end_date"}
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
                    onChange={(value) => setFieldValue("document", value)}
                  />
                </div>
              </div>
              <div className="flex w-[100%] max-tablet:flex-col gap-4">
                <div className="w-[50%] max-tablet:w-full">
                  <SelectField
                    value={values?.status}
                    name={"status"}
                    label={"Status:"}
                    placeholder={""}
                    options={[
                      { label: "Pending", value: "Pending" },
                      { label: "Active", value: "Active" },
                      { label: "Completed", value: "Completed" },
                      { label: "Rejected", value: "Rejected" },
                    ]}
                  />
                </div>

                <div className="w-[50%] pt-3 max-desktop:w-[46%] max-tablet:w-[100%]">
                  <FormLabel
                    className="text-capitalize  font-medium d-flex align-items-center"
                    style={{
                      padding: "4px 8px 8px 8px",
                      color: colors.text.main,
                      fontSize: "1rem",
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
                    checked={values?.zakat_eligible}
                    label={"Yes"}
                  />
                </div>
              </div>
              <div className="w-full ">
                <InputField
                  onChange={handleChange}
                  name={"Notes/Comments:"}
                  label={"Notes/Comments:"}
                  required={"true"}
                  multiline
                  rows={5}
                />
              </div>

              <div className=" w-full ">
                <RadioGroup
                  name={"is_featured"}
                  type="radio"
                  sx={{ flexDirection: "column" }}
                  onChange={(e) => {
                    setFieldValue("is_featured", e === "true");
                  }}
                  options={[
                    { label: "On", value: true },
                    { label: "Off", value: false },
                  ]}
                  value={values?.is_featured}
                  label="Featured:"
                  style={{ fontSize: "18px", fontWeight: 500 }}
                />
              </div>
            </div>
            <div className="w-[30%] max-tablet:w-[100%] max-desktop:w-[100%] flex flex-col  items-center max-desktop:items-center  gap-8">
              <ImageEditor
                sx={{ maxWidth: "400px", minHeight: "400px" }}
                dataUrl={srcImg}
              />

              <Link to={"Revision-History"} state={{ id: user?.id }}>
                <PrimaryButton sx={{ borderRadius: "12px", width: "100%" }}>
                  <h1 className="text-white font-medium py-2.5 text-[18px] font-[satoshi]">
                    View Revision History
                  </h1>
                </PrimaryButton>
              </Link>
            </div>
          </div>

          <div className="flex gap-3 max-tablet:flex-col  max-tablet:items-center pt-5">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-[69px] content-stretch h-[32px] bg-[#F7F7F7]"
            >
              <h1 className="text-[#000000] font-medium text-[14px] font-[satoshi]">
                Cancel
              </h1>
            </button>

            {values?.status === "Rejected" || values?.status === "Completed" ? (
              " "
            ) : (
              <SuccessButton
                type="submit"
                text={"Save"}
                icon={<PiCheckFat className="w-4 h-4 mt-1" />}
              />
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default CauseEdit_Form;
