import React, { useState } from "react";
import { Form, Formik, useFormik } from "formik";
import DropZone from "../../inputs/dragAndDrop";
import Box from "@mui/material/Box";
import UploadField from "../../inputs/UploadField/Index";
import "./AdminPanelLandingPage.css";
import InputField from "../../inputs/InputField";
import PrimaryButton from "../../inputs/PrimaryButton";
import AdminNavbar from "../../layout/AdminNavbar";
import { useCreateOrUpdate, useGetAll } from "../../../Hooks";

const InputStyle = {
  padding: "0px 16px",
  border: "1px solid #e2e2e2",
  borderRadius: "4px",
  fontSize: "1rem",

  "&:focus-within": {
    boxShadow: `0px 4px 10px 0px rgba(0, 0, 0, 0.15);`,
    borderColor: "black",
  },
};

const LandingPage = () => {
  const [data, setData] = useState({});

  useGetAll({
    key: `/admin-dashboard/landing-page?page=1&limit=4`,
    enabled: true,
    select: (data) => {
      return data.data.rows[0];
    },
    onSuccess: (data) => {
      setData(data);
    },
  });

  const { mutate } = useCreateOrUpdate({
    url: `/admin-dashboard/landing-page`,
  });

  return (
    <>
      <AdminNavbar />
      <div className="admin-panel-landing-page">
        <Formik>
          <Form className="flex flex-col items-center">
            <div className="upload-div flex flex-wrap gap-x-[242px] gap-y-[68px]">
              <div className="single-div">
                <Box>
                  <div className="dropzone-div w-[100px] h-[100px] mx-auto mb-[24px]">
                    <DropZone
                      className="dropzone-div"
                      name="campaign_image"
                      acceptedFiles={{ "file/*": [".png"] }}
                      maxFiles={1}
                    ></DropZone>
                  </div>
                </Box>
                <div className="uploadfield-div w-[238px]">
                  <UploadField
                    label="Logo:"
                    name="document"
                    placeholder="Recommended\n size: 150x50 px (PNG)"
                    sx={{ padding: "20px" }}
                    multiple={false}
                    className="uploadField"
                  />
                </div>
              </div>
              <div className="single-div">
                <Box>
                  <div className="dropzone-div w-[100px] h-[100px] mx-auto mb-[24px]">
                    <DropZone
                      className="dropzone-div"
                      name="campaign_image"
                      acceptedFiles={{ "file/*": [".png"] }}
                      maxFiles={1}
                    ></DropZone>
                  </div>
                </Box>
                <div className="uploadfield-div w-[238px]">
                  <UploadField
                    label="Logo Footer:"
                    name="document"
                    placeholder="Recommended size: 150x50 px (PNG)"
                    sx={{ padding: "20px" }}
                    multiple={false}
                  />
                </div>
              </div>
              <div className="single-div">
                <Box>
                  <div className="dropzone-div w-[100px] h-[100px] mx-auto mb-[24px]">
                    <DropZone
                      className="dropzone-div"
                      name="campaign_image"
                      acceptedFiles={{ "file/*": [".png"] }}
                      maxFiles={1}
                    ></DropZone>
                  </div>
                </Box>
                <div className="uploadfield-div w-[238px]">
                  <UploadField
                    label="Favicon:"
                    name="document"
                    placeholder="Recommended size: 150x50 px (PNG)"
                    sx={{ padding: "20px" }}
                    multiple={false}
                  />
                </div>
              </div>
              <div className="single-div">
                <Box>
                  <div className="dropzone-div w-[100px] h-[100px] mx-auto mb-[24px]">
                    <DropZone
                      className="dropzone-div"
                      name="campaign_image"
                      acceptedFiles={{ "file/*": [".png"] }}
                      maxFiles={1}
                    ></DropZone>
                  </div>
                </Box>
                <div className="uploadfield-div w-[238px]">
                  <UploadField
                    label="Documents:"
                    name="document"
                    placeholder="Recommended size: 150x50 px (PNG)"
                    sx={{ padding: "20px" }}
                    multiple={false}
                  />
                </div>
              </div>
              <div className="single-div">
                <Box>
                  <div className="dropzone-div w-[100px] h-[100px] mx-auto mb-[24px]">
                    <DropZone
                      className="dropzone-div"
                      name="campaign_image"
                      acceptedFiles={{ "file/*": [".png"] }}
                      maxFiles={1}
                    ></DropZone>
                  </div>
                </Box>
                <div className="uploadfield-div w-[238px]">
                  <UploadField
                    label="Documents:"
                    name="document"
                    placeholder="Recommended size: 150x50 px (PNG)"
                    sx={{ padding: "20px" }}
                    multiple={false}
                  />
                </div>
              </div>
              <div className="single-div">
                <Box>
                  <div className="dropzone-div w-[100px] h-[100px] mx-auto mb-[24px]">
                    <DropZone
                      className="dropzone-div"
                      name="campaign_image"
                      acceptedFiles={{ "file/*": [".png"] }}
                      maxFiles={1}
                    ></DropZone>
                  </div>
                </Box>
                <div className="uploadfield-div w-[238px]">
                  <UploadField
                    label="Documents:"
                    name="document"
                    placeholder="Recommended size: 150x50 px (PNG)"
                    sx={{ padding: "20px" }}
                    multiple={false}
                  />
                </div>
              </div>
              <div className="single-div">
                <Box>
                  <div className="dropzone-div w-[100px] h-[100px] mx-auto mb-[24px]">
                    <DropZone
                      className="dropzone-div"
                      name="campaign_image"
                      acceptedFiles={{ "file/*": [".png"] }}
                      maxFiles={1}
                    ></DropZone>
                  </div>
                </Box>
                <div className="uploadfield-div w-[238px]">
                  <UploadField
                    label="Documents:"
                    name="document"
                    placeholder="Recommended size: 150x50 px (PNG)"
                    sx={{ padding: "20px" }}
                    multiple={false}
                  />
                </div>
              </div>
              <div className="single-div">
                <Box>
                  <div className="dropzone-div w-[100px] h-[100px] mx-auto mb-[24px]">
                    <DropZone
                      className="dropzone-div"
                      name="campaign_image"
                      acceptedFiles={{ "file/*": [".png"] }}
                      maxFiles={1}
                    ></DropZone>
                  </div>
                </Box>
                <div className="uploadfield-div w-[238px]">
                  <UploadField
                    label="Documents:"
                    name="document"
                    placeholder="Recommended size: 150x50 px (PNG)"
                    sx={{ padding: "20px" }}
                    multiple={false}
                  />
                </div>
              </div>
            </div>
            <div className="w-full">
              <div className="default-link-div flex items-center w-[30%] pt-4">
                <InputField
                  name="title"
                  sx={InputStyle}
                  label="Default Link Colour"
                  placeholder="Placeholder Text"
                  className="inputField w-full max-w-[510px]"
                />
              </div>
            </div>
            <div className="pt-4">
              <PrimaryButton className="mx-auto">Save</PrimaryButton>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default LandingPage;
